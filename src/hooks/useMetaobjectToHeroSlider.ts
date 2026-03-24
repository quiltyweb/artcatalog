import { useLayoutConsumer } from "../context/LayoutContext";

type FlattenedImage = {
  image: string;
  reference: {
    image: {
      url: string;
    };
  };
  alt_text: string;
  link: {
    text: string;
    url: string;
  };
  title: string;
  caption: string;
  category: string;
  order?: string;
};

export function useMetaobjectToHeroSlider() {
  const mainSliderImages =
    useLayoutConsumer()?.storefrontshopify.metaobjects.nodes?.map(
      (currentItem) => {
        const flattenedFields = currentItem.fields.reduce(
          (acc, field) => {
            if (field.key === "image" && field.reference !== null) {
              acc[field.key] = field.value;
              acc["reference"] = field.reference;
              return acc;
            }
            if (field.key === "link") {
              acc["link"] = JSON.parse(field.value || "#");
              return acc;
            }
            acc[field.key] = field.value;
            return acc;
          },
          {} as Record<string, any>
        );
        return { ...flattenedFields } as FlattenedImage;
      }
    );

  if (!mainSliderImages) return mainSliderImages;

  const hasOrder = mainSliderImages.some((item) => item.order !== undefined);
  if (!hasOrder) return mainSliderImages;

  return [...mainSliderImages].sort(
    (a, b) => parseInt(a.order ?? "0") - parseInt(b.order ?? "0")
  );
}
