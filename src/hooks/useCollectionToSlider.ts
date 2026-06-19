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
    images: collection.products.filter((product) => !product.isGiftCard).map((product) => ({
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
