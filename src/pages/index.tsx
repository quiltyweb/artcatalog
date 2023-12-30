import * as React from "react";
import SEO from "../components/SEO";
import { graphql, PageProps } from "gatsby";
import { Box, Text } from "@chakra-ui/react";
import { StaticImage } from "gatsby-plugin-image";

// WIP Imports
// import Carousel from "../components/Carousel";
// import TileList from "../components/TileList";

// WIP index
// const IndexPage: React.FunctionComponent<PageProps<Queries.IndexPageQuery>> = ({
//   data,
// }): React.ReactElement => (
//   <>
//     <Carousel title={`${data.site?.siteMetadata?.title} collection heart`} />
//     <TileList />
//   </>
// );

// production index
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
    <Box p={4}>
      <StaticImage
        alt={`"After Grief" from Human Nature Collection`}
        src="../images/presentation-card/welcome-brushella.jpg"
        layout="constrained"
        width={800}
        imgStyle={{
          transform: "scaleX(-1)",
        }}
      />
      <Text p={4} fontSize="sm" align="center" fontStyle="bold">
        "After Grief" from Human Nature Collection
      </Text>
      <Text fontSize="sm" align="center" fontStyle="bold">
        {data.site?.siteMetadata?.title}
      </Text>
    </Box>
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
