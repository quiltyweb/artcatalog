import * as React from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const TileList: React.FunctionComponent = (): React.ReactElement => {
  return (
    <>
      <Heading
        as="h2"
        size="md"
        textAlign={"center"}
        marginTop={9}
        marginBottom={9}
      >
        Featured Categories
      </Heading>

      <Stack
        spacing={[10, 10, 10, 10, 10]}
        align="center"
        marginTop={9}
        marginBottom={9}
        direction={["column", "column", "row", "row", "row"]}
        fontSize={["1rem", "1rem", "0.9rem", "0.9rem", "1rem"]}
        fontWeight="600"
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
              as="h4"
              p="4"
              noOfLines={1}
              color="white"
              backgroundColor="#86548A"
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
              as="h4"
              p="4"
              fontWeight="600"
              lineHeight="normal"
              noOfLines={1}
              color="white"
              backgroundColor="#86548A"
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
              as="h4"
              p="4"
              fontWeight="600"
              lineHeight="normal"
              noOfLines={1}
              color="white"
              backgroundColor="#86548A"
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
