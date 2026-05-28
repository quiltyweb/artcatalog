import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { TbAugmentedReality as ARIcon } from "react-icons/tb";
import { useIsAndroid } from "../hooks/useIsAndroid";
import { useIsIOS } from "../hooks/useIsIOS";

interface ARButtonProps {
  /** The Shopify Android 3D model URL */
  glbUrl: string;
  /** The Shopify iOS 3D model URL. Sourced via Digital Ocean CDN. */
  usdzUrl?: string;
  productTitle: string;
  browserFallbackUrl: string;
}

const ARButton: React.FC<ARButtonProps> = ({
  glbUrl,
  usdzUrl,
  productTitle,
  browserFallbackUrl,
}) => {
  const isAndroid = useIsAndroid();
  const isIOS = useIsIOS();

  if (isIOS && usdzUrl) {
    return (
      <Box
        as="a"
        href={usdzUrl}
        rel="ar"
        aria-label="View AR"
        title="View AR"
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        bgColor="#702459"
        color="#fff"
        borderRadius="md"
        w="10"
        h="10"
        _hover={{ bgColor: "#319795" }}
      >
        {/* AR Quick Look requires <img> as the direct first child of <a rel="ar"> */}
        <img src="" alt="" style={{ display: "none" }} />
        <ARIcon size={25} color="#fff" aria-hidden />
      </Box>
    );
  }

  // SSR / non-Android => render nothing
  if (!isAndroid) return null;

  // Documentation: https://developers.google.com/ar/develop/scene-viewer#supported_intent_parameters
  const intentLinkParams = new URLSearchParams({
    file: glbUrl,
    mode: "3d_preferred",
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
      color="#fff"
      borderRadius="md"
      _hover={{ bgColor: "#319795" }}
    />
  );
};

export default ARButton;
