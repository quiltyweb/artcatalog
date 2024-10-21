import * as React from "react";
import {
  Card,
  CardBody,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import { Link } from "gatsby";
import tilePlaceholder from "../images/noimg.jpg";
import commisionsCategory from "../images/homepage-categories/comissions.jpg";
import homedecorCategory from "../images/homepage-categories/homedecor.jpg";
import muralsAndSignWritingCategory from "../images/homepage-categories/murals-and-sign-writing.jpg";
import originalPaintingsCategory from "../images/homepage-categories/original-paintings.jpg";

const TileList: React.FunctionComponent = (): React.ReactElement => {
  const categories = [
    {
      name: "Original Paintings",
      src: originalPaintingsCategory,
      alt: "Collage depicting products of Original Paintings category",
    },
    {
      name: "Home Decor",
      src: homedecorCategory,
      alt: "Collage depicting products of Home Decor category",
    },
    {
      name: "Commissions",
      src: commisionsCategory,
      alt: "Collage depicting products of Commissions category",
    },
    {
      name: "Murals & Sign Writing",
      src: muralsAndSignWritingCategory,
      alt: "Collage depicting products of Murals & Sign Writing category",
    },
    { name: "Prints", src: tilePlaceholder, alt: "" },
    { name: "Resin & Pigment Art", src: tilePlaceholder, alt: "" },
    { name: "Wearable Art", src: tilePlaceholder, alt: "" },
    { name: "Stickers", src: tilePlaceholder, alt: "" },
  ];
  return (
    <Container as="section" maxW="1200px" paddingBottom={"4rem"}>
      <Heading as="h2" color="pink.800" mb="2.4rem" textAlign="left">
        Browse Brushella’s World
      </Heading>
      <SimpleGrid role="list" columns={[1, 2, 3, 4]} spacing={[1, 2, 3, 4]}>
        {categories.map((category, index) => {
          return (
            <Card
              key={category.name + index}
              role="listitem"
              maxW="sm"
              variant="unstyled"
            >
              <CardBody>
                <Link to="/collections/originals/">
                  <Image
                    src={category.src}
                    alt={category.alt}
                    borderRadius="sm"
                    minH={250}
                  />
                  <Stack mt="2" spacing="3">
                    <Text
                      size="md"
                      color={"pink.800"}
                      fontWeight="semibold"
                      fontSize="1.13rem"
                    >
                      {category.name}
                    </Text>
                  </Stack>
                </Link>
              </CardBody>
            </Card>
          );
        })}
      </SimpleGrid>
    </Container>
  );
};

export default TileList;
