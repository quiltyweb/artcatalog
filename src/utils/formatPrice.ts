type formatPriceType = {
  currency?: string;
  value: number;
};
export const formatPrice = ({ currency, value }: formatPriceType): string =>
  Intl.NumberFormat("en-AU", {
    currency,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(value);
