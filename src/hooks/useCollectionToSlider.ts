import { useLayoutConsumer } from "../context/LayoutContext";

export function useCollectionToSlider() {
  const collectionsData = useLayoutConsumer()?.allShopifyCollection.nodes;
  const sorted = collectionsData
    ? [...collectionsData].sort((a, b) => {
        if (a.handle === "digital") return 1;
        if (b.handle === "digital") return -1;
        return 0;
      })
    : collectionsData;
  const collectionsTiles = sorted?.map((collection) => ({
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    images: [...collection.products]
      .sort((a, b) => {
        const isSold = (p: typeof a) =>
          p.variants.length > 0 &&
          p.variants.every((v) => v.availableForSale === false);
        if (a.isGiftCard !== b.isGiftCard) return a.isGiftCard ? 1 : -1;
        if (isSold(a) !== isSold(b)) return isSold(a) ? 1 : -1;
        return 0;
      })
      .map((product) => ({
        productTitle: product.title,
        src:
          product.featuredImage?.gridCategorySlider ||
          product.featuredImage?.originalSrc ||
          "",
        alt: product.featuredImage?.altText || product.title || "",
        href: `/collections/${collection.handle}/${product.handle}`,
      })),
  }));
  return collectionsTiles;
}
