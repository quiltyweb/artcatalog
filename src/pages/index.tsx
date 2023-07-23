import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Heading, Button, Box } from "@chakra-ui/react";
import SEO from "../components/SEO";
import { graphql, Link, PageProps } from "gatsby";

const IndexPage: React.FunctionComponent<PageProps<Queries.IndexPageQuery>> = ({
  data,
}): React.ReactElement => (
  <>
    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      marginBottom={5}
      display={"flex"}
      flexFlow={"column"}
      alignContent={"center"}
    >
      <StaticImage
        alt={`${data.site?.siteMetadata?.title} collection heart`}
        src="../images/slider/slider1.png"
      />
      <Button as="div" m="6" backgroundColor={"#2A5F71"} color="white">
        <Link to="/collections/">explore all collections</Link>
      </Button>
    </Box>

    <Heading as="h1" size="md">
      featured collections
    </Heading>

    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      marginBottom={5}
    >
      <Link to="/collections/original-paintings">
        <StaticImage
          alt="original paintings"
          src="../images/collections-thumbnail/originals.png"
          objectFit="fill"
          imgStyle={{ filter: "grayscale(1)" }}
        />
        <Box
          as="h4"
          p="7"
          fontSize={"1.2rem"}
          fontWeight="medium"
          lineHeight="normal"
          noOfLines={1}
          color="white"
          backgroundColor="#86548A"
        >
          original paintings
        </Box>
      </Link>
    </Box>

    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      marginBottom={5}
    >
      <Link to="/collections/prints">
        <StaticImage
          alt="prints"
          src="../images/collections-thumbnail/prints.png"
          objectFit="fill"
          imgStyle={{ filter: "grayscale(1)" }}
        />
        <Box
          as="h4"
          p="7"
          fontSize={"1.2rem"}
          fontWeight="medium"
          lineHeight="normal"
          noOfLines={1}
          color="white"
          backgroundColor="#86548A"
        >
          prints
        </Box>
      </Link>
    </Box>

    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      marginBottom={5}
    >
      <Link to="/collections/home-decor">
        <StaticImage
          alt="home decor"
          src="../images/collections-thumbnail/homedecor.png"
          objectFit="fill"
          imgStyle={{ filter: "grayscale(1)" }}
        />
        <Box
          as="h4"
          p="7"
          fontSize={"1.2rem"}
          fontWeight="medium"
          lineHeight="normal"
          noOfLines={1}
          color="white"
          backgroundColor="#86548A"
        >
          home decor
        </Box>
      </Link>
    </Box>
  </>
);

export default IndexPage;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">Welcome to Brushella - Homepage</title>
    <meta
      id="index-page"
      name="home page"
      content="All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting"
    />
    <meta
      id="twitter-og"
      name="twitter:url"
      content={`https://www.brushella.art/${location.pathname}`}
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
