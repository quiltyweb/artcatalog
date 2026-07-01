type formatPriceType = {
  currency: string;
  value: number;
};

const LOCALE_BY_CURRENCY: Record<string, string> = {
  CLP: "es-CL",
};

export const getCurrencySymbol = (currencyCode: string): string => {
  const locale = LOCALE_BY_CURRENCY[currencyCode] ?? "en-AU";
  return (
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    })
      .formatToParts(0)
      .find((p) => p.type === "currency")?.value ?? currencyCode
  );
};

export const formatPrice = ({
  currency = "AUD",
  value,
}: formatPriceType): string => {
  const locale = LOCALE_BY_CURRENCY[currency] ?? "en-AU";
  const isZeroDecimalCurrency = currency === "CLP";
  return new Intl.NumberFormat(locale, {
    currency,
    style: "currency",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: isZeroDecimalCurrency ? 0 : 2,
    maximumFractionDigits: isZeroDecimalCurrency ? 0 : 2,
  }).format(value);
};
