import * as React from "react";
import SEO from "../components/SEO";
import { graphql, PageProps } from "gatsby";
import { Box, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";
import TileList from "../components/TileList";

const IndexPage: React.FunctionComponent<PageProps<Queries.IndexPageQuery>> = ({
  data,
}): React.ReactElement => (
  <>
    <Box p={4}>
      <Text fontSize="xl" align="center" fontStyle="bold">
        Featuring: Human Nature at{" "}
        <a
          href="https://www.instagram.com/p/CwyZ2QIsaOR/?utm_source=ig_web_button_share_sheet&igshid=MzRlODBiNWFlZA=="
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          Bad News Gallery
        </a>
      </Text>
    </Box>
    <Box>
      <StaticImage
        alt={`original artwork called After Grief from Human Nature Collection by Brushella`}
        src="../images/welcome-brushella.jpg"
        layout="constrained"
        width={800}
        style={{
          transform: "scaleX(-1)",
        }}
      />
      <Text p={4} fontSize="sm" align="center" fontStyle="bold">
        "After Grief" from Human Nature Collection
      </Text>
      <Text fontSize="sm" align="center" fontWeight="600">
        {data.site?.siteMetadata?.title}
      </Text>
    </Box>
    <TileList />
  </>
);

export default IndexPage;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">{`Welcome to Brushella - All things ART! ${location.pathname}`}</title>
    <meta
      id="index-page"
      name="home page"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting"
    />
  </SEO>
);

export const query = graphql`
  query IndexPage {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
