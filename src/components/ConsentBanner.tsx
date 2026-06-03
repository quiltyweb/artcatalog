import * as React from "react";
import { Box, Button, HStack, Link, Stack, Text } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { useConsent } from "../hooks/useConsent";

const HERO_ANIMATION_EVENT = "brushella:hero-animation-complete";

const ConsentBanner: React.FunctionComponent = (): React.ReactElement | null => {
  const { consent, accept, decline } = useConsent();
  const [ready, setReady] = React.useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname !== "/";
  });

  React.useEffect(() => {
    if (ready) return;
    const handler = () => setReady(true);
    window.addEventListener(HERO_ANIMATION_EVENT, handler);
    return () => window.removeEventListener(HERO_ANIMATION_EVENT, handler);
  }, [ready]);

  if (consent !== null) return null;
  if (!ready) return null;

  return (
    <Box
      role="dialog"
      aria-label="Cookie consent"
      data-testid="consent-banner"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex={1000}
      bg="white"
      borderTopWidth="1px"
      borderColor="gray.200"
      boxShadow="0 -2px 10px rgba(0,0,0,0.08)"
      p={4}
    >
      <Stack
        direction={["column", "column", "row"]}
        maxWidth="1200px"
        margin="0 auto"
        align="center"
        spacing={4}
      >
        <Text fontSize="sm" color="gray.700">
          We use Google Analytics cookies to understand how visitors use our
          site. See our{" "}
          <Link
            as={GatsbyLink}
            to="/legal-content/privacy-policy"
            color="teal.600"
            textDecoration="underline"
          >
            Privacy Policy
          </Link>
          .
        </Text>
        <HStack spacing={3} flexShrink={0}>
          <Button
            onClick={decline}
            variant="outline"
            colorScheme="teal"
            size="sm"
          >
            Decline
          </Button>
          <Button onClick={accept} colorScheme="teal" size="sm">
            Accept
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default ConsentBanner;
