import * as React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const TileList: React.FunctionComponent = (): React.ReactElement => {
  return (
    <>
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
};

export default TileList;
