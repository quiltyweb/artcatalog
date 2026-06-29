const mockValidate = jest.fn();

jest.mock("@shopify/shopify-api/adapters/web-api", () => ({}));
jest.mock("@shopify/shopify-api", () => ({
  shopifyApi: () => ({ webhooks: { validate: mockValidate } }),
  ApiVersion: { January26: "January26" },
  LogSeverity: { Warning: 0 },
}));

// Required lazily (not `import`ed) so `mockValidate` is initialized before the
// module under test pulls in the mocked Shopify SDK at load time.
// eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
const handler = require("../shopify-inventory-levels-update").default;

const makeRequest = (body = "raw-body") =>
  new Request("http://localhost/webhooks/shopify/inventory-levels/update", {
    method: "POST",
    body,
  });

let fetchSpy: jest.SpyInstance;
let logSpy: jest.SpyInstance;
let warnSpy: jest.SpyInstance;
let errorSpy: jest.SpyInstance;
const ORIGINAL_ENV = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  process.env = { ...ORIGINAL_ENV, SHOPIFY_WEBHOOK_SECRET: "test-secret" };
  fetchSpy = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(new Response("ok", { status: 200 }));
  logSpy = jest.spyOn(console, "log").mockImplementation();
  warnSpy = jest.spyOn(console, "warn").mockImplementation();
  errorSpy = jest.spyOn(console, "error").mockImplementation();
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
  jest.restoreAllMocks();
});

describe("shopify-inventory-levels-update", () => {
  it("returns 401, logs the rejection, and does not trigger a build when the webhook signature is invalid", async () => {
    mockValidate.mockResolvedValueOnce({ valid: false });

    const res = await handler(makeRequest());

    expect(res.status).toBe(401);
    await expect(res.text()).resolves.toBe("unauthorized");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalledWith(
      "rejected webhook: invalid signature",
      expect.any(String)
    );
  });

  it("returns 500 and does not validate or build when SHOPIFY_WEBHOOK_SECRET is not set", async () => {
    delete process.env.SHOPIFY_WEBHOOK_SECRET;

    const res = await handler(makeRequest());

    expect(res.status).toBe(500);
    await expect(res.text()).resolves.toBe("server misconfigured");
    expect(mockValidate).not.toHaveBeenCalled();
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });

  it("returns 400 and does not trigger a build when validation throws", async () => {
    const error = new Error("boom");
    mockValidate.mockRejectedValueOnce(error);

    const res = await handler(makeRequest());

    expect(res.status).toBe(400);
    await expect(res.text()).resolves.toBe("bad request");
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalledWith("webhook validation error:", error);
  });

  it("triggers the build hook and returns 200 when the webhook is valid", async () => {
    mockValidate.mockResolvedValueOnce({ valid: true });
    process.env.NETLIFY_BUILD_HOOK_URL = "https://hook.example/build";

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    await expect(res.text()).resolves.toBe("ok");
    expect(fetchSpy).toHaveBeenCalledWith("https://hook.example/build", {
      method: "POST",
    });
    expect(logSpy).toHaveBeenCalledWith("build triggered");
  });

  it("returns 200 and logs a failure when the build hook responds with an error status", async () => {
    mockValidate.mockResolvedValueOnce({ valid: true });
    process.env.NETLIFY_BUILD_HOOK_URL = "https://hook.example/build";
    fetchSpy.mockResolvedValueOnce(new Response("", { status: 500 }));

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    expect(logSpy).toHaveBeenCalledWith("build hook failed:", 500);
  });

  it("returns 200 and logs an error when the build hook fetch throws", async () => {
    mockValidate.mockResolvedValueOnce({ valid: true });
    process.env.NETLIFY_BUILD_HOOK_URL = "https://hook.example/build";
    const error = new Error("boom");
    fetchSpy.mockRejectedValueOnce(error);

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    expect(logSpy).toHaveBeenCalledWith("build hook error:", error);
  });

  it("returns 200 and skips the build trigger when NETLIFY_BUILD_HOOK_URL is not set", async () => {
    mockValidate.mockResolvedValueOnce({ valid: true });
    delete process.env.NETLIFY_BUILD_HOOK_URL;

    const res = await handler(makeRequest());

    expect(res.status).toBe(200);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(
      "NETLIFY_BUILD_HOOK_URL not set; skipping build trigger"
    );
  });

  it("validates the webhook using the raw body and request", async () => {
    mockValidate.mockResolvedValueOnce({ valid: true });
    const req = makeRequest("raw-body");

    await handler(req);

    expect(mockValidate).toHaveBeenCalledWith({
      rawBody: "raw-body",
      rawRequest: req,
    });
  });
});
