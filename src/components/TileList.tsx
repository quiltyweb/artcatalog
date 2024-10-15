import * as React from "react";
import { Box, Container, Heading, SimpleGrid } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const TileList: React.FunctionComponent = (): React.ReactElement => {
  return (
    <Container as="section" maxW={"1200px"} padding={"4rem 0.5rem"}>
      <Heading as="h2" color="teal.500" mb="2.4rem">
        Featured Categories
      </Heading>
      <SimpleGrid columns={[1, 1, 2, 3]} justifyItems="center" gap={4}>
        <Box
          maxW="xs"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          marginBottom={5}
        >
          <StaticImage
            alt="original paintings"
            src="../images/thumbnail-originals.png"
            style={{
              filter: "grayscale(1)",
            }}
          />
          <Box
            as="h3"
            fontSize="xl"
            p="4"
            noOfLines={1}
            color="white"
            backgroundColor="pink.800"
          >
            <Link to="/collections/originals/">Original Paintings</Link>
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
            src="../images/thumbnail-prints.png"
            style={{ filter: "grayscale(1)" }}
          />
          <Box
            as="h3"
            fontSize="xl"
            p="4"
            noOfLines={1}
            color="white"
            backgroundColor="pink.800"
          >
            <Link to="/collections/prints">Prints</Link>
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
            src="../images/thumbnail-homedecor.png"
            style={{ filter: "grayscale(1)" }}
          />
          <Box
            as="h3"
            fontSize="xl"
            p="4"
            noOfLines={1}
            color="white"
            backgroundColor="pink.800"
          >
            <Link to="/collections/decor">Home Decor</Link>
          </Box>
        </Box>
      </SimpleGrid>
    </Container>
  );
};

export default TileList;
