import { useLayoutData } from "../context/LayoutContext";

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
};

// TODO: make this helper reduceMetaobjectsToSliderItems, and change order of images based on admin setting (add order field in metafield)
export function useMetaobjectToHeroSlider() {
  const mainSliderImages =
    useLayoutData()?.storefrontshopify.metaobjects.nodes?.map(
      (currentItem, currentIndex, arr) => {
        const flattenedFields = currentItem.fields.reduce(
          (acc, field, index, arr) => {
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
  return mainSliderImages;
}
