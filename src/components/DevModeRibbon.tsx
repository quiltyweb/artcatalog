import * as React from "react";
import { Box } from "@chakra-ui/react";

const DevModeRibbon: React.FunctionComponent = (): React.ReactElement | null => {
  if (process.env.NODE_ENV !== "development") return null;
  if (typeof window !== "undefined" && (window as { Cypress?: unknown }).Cypress)
    return null;
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex={2000}
      bg="orange.500"
      color="white"
      textAlign="center"
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="wider"
      py="1"
      textTransform="uppercase"
      pointerEvents="none"
      opacity={0.5}
    >
      Dev store — {process.env.GATSBY_SHOPIFY_STORE_DOMAIN}
    </Box>
  );
};

export default DevModeRibbon;
