import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Text } from "@chakra-ui/react";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

const IndexPage: React.FunctionComponent = (): React.ReactElement => (
  <Layout>
    <Text>Home Page is Work in progress</Text>
    <StaticImage
      style={{ filter: "grayscale(1)" }}
      alt="acrylic paint texture"
      src="../images/brushella-texture.jpg"
    />
  </Layout>
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
