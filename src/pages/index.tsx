import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Heading, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";

const IndexPage: React.FunctionComponent = (): React.ReactElement => (
  <>
    <Text>Home Page is Work in progress</Text>
    <StaticImage
      alt="brushella collection heart"
      src="../images/slider/slider-item-1.png"
    />
    <Heading as="h1" size="md">
      Featured Works
    </Heading>
    <Text>image 1</Text>
    <Text>image 2</Text>
    <Text>image 3</Text>
  </>
);

export default IndexPage;

export const Head = ({ location }) => (
  <SEO>
    <title id="title">Welcome to Brushella - Homepage</title>
    <meta
      id="description"
      name="description"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting"
    />
    <meta
      id="twitter-og"
      name="twitter:url"
      content={`https://www.brushella.com.au/${location.pathname}`}
    />
  </SEO>
);
