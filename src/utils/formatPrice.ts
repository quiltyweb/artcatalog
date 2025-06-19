type formatPriceType = {
  currency: string;
  value: number;
};
export const formatPrice = ({
  currency = "AUD",
  value,
}: formatPriceType): string =>
  new Intl.NumberFormat("en-AU", {
    currency,
    style: "currency",
    minimumFractionDigits: 2,
  }).format(value);
