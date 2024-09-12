import * as React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const TileList: React.FunctionComponent = (): React.ReactElement => {
  return (
    <>
      <Heading
        as={"h2"}
        size="lg"
        color="teal.500"
        textAlign={"center"}
        marginTop={9}
        marginBottom={9}
      >
        Featured Categories
      </Heading>
      <Stack
        spacing={[2, 2, 2, 2, 2]}
        align="center"
        direction={["column", "column", "row", "row", "row"]}
        justifyContent="center"
        fontSize={"1.2rem"}
        fontWeight="500"
        lineHeight="normal"
      >
        <Box
          maxW="xs"
          borderWidth="1px"
          borderRadius="md"
          overflow="hidden"
          marginBottom={5}
        >
          <Link to="/collections/originals/">
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
              Original Paintings
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
              Prints
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
          <Link to="/collections/decor">
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
              Home Decor
            </Box>
          </Link>
        </Box>
      </Stack>
    </>
  );
};

export default TileList;
