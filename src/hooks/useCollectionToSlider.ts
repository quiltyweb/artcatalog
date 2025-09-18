import { useLayoutConsumer } from "../context/LayoutContext";

export function useCollectionToSlider() {
  const collectionsData = useLayoutConsumer()?.allShopifyCollection.nodes;
  const collectionsTiles = collectionsData?.map((collection) => ({
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    images: collection.products.map((product) => ({
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
