import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Heading, Button, Box } from "@chakra-ui/react";
import SEO from "../components/SEO";

const IndexPage: React.FunctionComponent = (): React.ReactElement => (
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
        alt="brushella collection heart"
        src="../images/slider/slider1.png"
      />
      <Button m="6" backgroundColor={"#2A5F71"} color="white">
        explore all collections
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
    </Box>

    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      marginBottom={5}
    >
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
    </Box>

    <Box
      maxW="xs"
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      marginBottom={5}
    >
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
    </Box>
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
