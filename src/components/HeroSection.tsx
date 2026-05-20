import * as React from "react";
import {
  Card,
  CardBody,
  Container,
  Heading,
  Stack,
  Text,
  CardHeader,
  useMediaQuery,
} from "@chakra-ui/react";
import CallToActionButton from "./CallToActionButton";
import { motion, useReducedMotion } from "motion/react";

const HeaderCallToAction: React.FunctionComponent = (): React.ReactElement => {
  return (
    <CardHeader>
      <Heading
        as="h2"
        color="gray.900"
        textAlign="center"
        fontWeight="extrabold"
        letterSpacing="0"
      >
        Welcome to Brushella's <br />
        Art Store
      </Heading>
      <Text
        fontSize="1.13rem"
        color="gray.800"
        marginY="1rem"
        textAlign="center"
        fontWeight="bold"
      >
        Where craftsmanship meets creativity!
      </Text>
      <CallToActionButton
        title="Explore the Collection"
        link="#all-categories-title"
      />
    </CardHeader>
  );
};

const HeroSection: React.FunctionComponent = (): React.ReactElement => {
  const [isDektop] = useMediaQuery("(min-width: 992px)");
  const reduceMotion = useReducedMotion();
  return (
    <Container as="section" maxW="1200px" padding={"4rem 0"}>
      <Card
        align="left"
        variant="outline"
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        overflow="hidden"
      >
        {!isDektop && <HeaderCallToAction />}
        <motion.img
          src={
            "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/web-asset-author.jpg?v=1729679585"
          }
          initial={reduceMotion ? undefined : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, transition: { duration: 2 } }}
          transition={{ duration: 2 }}
          width={500}
          height={667}
          loading="lazy"
          className="mx-auto max-w-full min-[992px]:max-w-[50%] object-contain min-[992px]:object-cover"
          alt="Black and white portrait of Gabriela Ugalde, author of Brushella's art store, holding a brush and painting a colorful stroke across her face."
        ></motion.img>
        <Stack
          padding={{
            base: "1rem",
            sm: "2rem",
            md: "2.5rem",
            lg: "3rem",
            xl: "4rem",
          }}
        >
          {isDektop && <HeaderCallToAction />}
          <CardBody p="0">
            <Text
              fontSize="1.13rem"
              lineHeight="1.7rem"
              className="mx-auto max-w-full max-w-[500px] min-[992px]:max-w-[100%] text-center"
            >
              Immerse yourself into a world of materialised creations flowing
              from the one human mind, and brought to life with the one pair of
              human hands. The collection you will find in this space has been
              meaningfully created, drawing upon Gabriella's deepest raw
              feelings, expansive visions, and life experiences, transformed
              into something beautiful and full of life. Discover everything
              from unique treasures and household items designed to bring the
              magical into your home, to a range of original artworks and
              prints. Hand-knitted goodies and resin little trinkets, all
              infused with a touch of love and awareness, from Gabriella's heart
              to yours.
            </Text>
            <Text
              fontSize="1.13rem"
              color="gray.800"
              marginY="3rem"
              textAlign="center"
              fontWeight="bold"
            >
              Embrace the beauty of handmade artistry with Brushella, <br />
              where every piece tells a story!
            </Text>
          </CardBody>
        </Stack>
      </Card>
    </Container>
  );
};

export default HeroSection;
