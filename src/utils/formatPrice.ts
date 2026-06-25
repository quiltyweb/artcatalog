type formatPriceType = {
  currency: string;
  value: number;
};

const LOCALE_BY_CURRENCY: Record<string, string> = {
  CLP: "es-CL",
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
    minimumFractionDigits: isZeroDecimalCurrency ? 0 : 2,
    maximumFractionDigits: isZeroDecimalCurrency ? 0 : 2,
  }).format(value);
};
