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
const ORIGINAL_ENV = process.env;

beforeEach(() => {
  jest.clearAllMocks();
  process.env = { ...ORIGINAL_ENV };
  fetchSpy = jest
    .spyOn(global, "fetch")
    .mockResolvedValue(new Response("ok", { status: 200 }));
  logSpy = jest.spyOn(console, "log").mockImplementation();
});

afterEach(() => {
  process.env = ORIGINAL_ENV;
  jest.restoreAllMocks();
});

describe("shopify-inventory-levels-update", () => {
  it("returns 401 and does not trigger a build when the webhook signature is invalid", async () => {
    mockValidate.mockResolvedValueOnce({ valid: false });

    const res = await handler(makeRequest());

    expect(res.status).toBe(401);
    await expect(res.text()).resolves.toBe("unauthorized");
    expect(fetchSpy).not.toHaveBeenCalled();
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
});
