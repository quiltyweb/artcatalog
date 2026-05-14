import React from "react";
import { IconButton } from "@chakra-ui/react";
import { TbAugmentedReality as ARIcon } from "react-icons/tb";
import { useIsAndroid } from "../hooks/useIsAndroid";

interface ARButtonProps {
  glbUrl: string;
  productTitle: string;
  browserFallbackUrl: string;
}

const ARButton: React.FC<ARButtonProps> = ({
  glbUrl,
  productTitle,
  browserFallbackUrl,
}) => {
  const isAndroid = useIsAndroid();

  // SSR / non-Android => render nothing
  if (!isAndroid) return null;

  // Documentation: https://developers.google.com/ar/develop/scene-viewer#supported_intent_parameters
  const intentLinkParams = new URLSearchParams({
    file: glbUrl,
    mode: "ar_only",
    title: productTitle,
    link: browserFallbackUrl,
    resizable: "false",
    enable_vertical_placement: "true",
  });

  const intentUrl =
    `intent://arvr.google.com/scene-viewer/1.1?${intentLinkParams.toString()}` +
    `#Intent;scheme=https;package=com.google.android.googlequicksearchbox;` +
    `action=android.intent.action.VIEW;` +
    `S.browser_fallback_url=${encodeURIComponent(browserFallbackUrl)};end;`;

  return (
    <IconButton
      as="a"
      title="View AR"
      href={intentUrl}
      rel="ar"
      aria-label="View AR"
      bgColor="#702459"
      icon={<ARIcon size={25} color="#fff" aria-hidden />}
      fontSize={"xs"}
      color="#fff"
      borderRadius="md"
      _hover={{ bgColor: "#319795" }}
    />
  );
};

export default ARButton;
