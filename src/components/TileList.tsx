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
import tilePlaceholder from "../images/web-asset-noimg.jpg";
import commisionsCategory from "../images/homepage-categories/commissions.jpg";
import homedecorCategory from "../images/homepage-categories/home-decor.jpg";
import muralsAndSignWritingCategory from "../images/homepage-categories/murals-and-sign-writing.jpg";
import originalPaintingsCategory from "../images/homepage-categories/original-paintings.jpg";
import resinAndPigmentsArtCategory from "../images/homepage-categories/resin-and-pigments-art.jpg";
import stickersCategory from "../images/homepage-categories/stickers.jpg";
import wearableArtCategory from "../images/homepage-categories/wearable-art.jpg";
import prints from "../images/homepage-categories/prints.jpg";

const TileList: React.FunctionComponent = (): React.ReactElement => {
  const categories = [
    {
      name: "Original Paintings",
      src: originalPaintingsCategory,
      alt: "Collage depicting products of Original Paintings category",
      to: "/collections/originals/",
    },
    {
      name: "Home Decor",
      src: homedecorCategory,
      alt: "Collage depicting products of Home Decor category",
      to: "/collections/decor/",
    },
    {
      name: "Commissions",
      src: commisionsCategory,
      alt: "Collage depicting products of Commissions category",
      to: "/collections/commissions/",
    },
    {
      name: "Murals & Sign Writing",
      src: muralsAndSignWritingCategory,
      alt: "Collage depicting products of Murals & Sign Writing category",
      to: "/collections/murals/",
    },
    {
      name: "Prints",
      src: prints,
      alt: "",
      to: "/collections/prints/",
    },
    {
      name: "Resin & Pigment Art",
      src: resinAndPigmentsArtCategory,
      alt: "",
      to: "/collections/resin-and-pigment-art/",
    },
    {
      name: "Wearable Art",
      src: wearableArtCategory,
      alt: "",
      to: "/collections/wearable-art/",
    },
    {
      name: "Stickers",
      src: stickersCategory,
      alt: "",
      to: "/collections/stickers/",
    },
  ];
  return (
    <Container as="section" maxW="1200px" paddingBottom={"4rem"}>
      <Heading as="h2" color="pink.800" mb="2.4rem" textAlign="left">
        Browse Brushella’s World
      </Heading>
      <SimpleGrid role="list" columns={[1, 2, 3, 4]} spacing={[4, 5, 10, 10]}>
        {categories.map((category, index) => {
          return (
            <Card
              key={category.name + index}
              role="listitem"
              maxW="sm"
              variant="unstyled"
            >
              <CardBody>
                <Link to={category.to}>
                  <Image
                    src={category.src}
                    alt={category.alt}
                    borderRadius="sm"
                    minH={200}
                    _hover={{ filter: "brightness(1.3)" }}
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
