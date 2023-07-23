import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";

const AboutPage: React.FunctionComponent = (): React.ReactElement => (
  <>
    <Box p={8}>
      <Text fontSize="sm">About me page is Work in progress</Text>
    </Box>
    <StaticImage
      style={{ filter: "grayscale(1)" }}
      alt="Painter Gabriela painting on a canvas"
      src="../images/brushella-author.jpg"
    />
  </>
);

export default AboutPage;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">About Me - Brushella</title>
    <meta
      id="about-page"
      name="AboutPage"
      content="About me Page, The author of Brushella art"
    />
    <meta
      id="twitter-og"
      name="twitter:url"
      content={`https://www.brushella.art/${location.pathname}`}
    />
  </SEO>
);
