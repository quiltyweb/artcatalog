import * as React from "react";
import {
  Card,
  CardBody,
  Container,
  Heading,
  Stack,
  Text,
  Image,
  CardHeader,
  useMediaQuery,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

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
        Your one-stop online shop where craftsmanship meets creativity!
      </Text>
      <LinkBox
        as="div"
        maxW="max-content"
        color="white"
        backgroundColor="gray.800"
        fontWeight="bold"
        boxShadow="sm"
        borderRadius="5px"
        fontSize="1.13rem"
        p="0.4rem 1rem"
        margin="2rem auto 0.5rem"
        textAlign="center"
      >
        <LinkOverlay href="#browse-categories">Shop now</LinkOverlay>
      </LinkBox>
    </CardHeader>
  );
};

const HeroSection: React.FunctionComponent = (): React.ReactElement => {
  const [isDektop] = useMediaQuery("(min-width: 992px)");
  return (
    <Container as="section" maxW="1200px" padding={"4rem 0"}>
      <Card
        align="left"
        variant="outline"
        direction={{ base: "column", sm: "column", md: "column", lg: "row" }}
        overflow="hidden"
      >
        {!isDektop && <HeaderCallToAction />}

        <Image
          src={
            "https://cdn.shopify.com/s/files/1/0586/9892/4240/files/web-asset-author.jpg?v=1729679585"
          }
          alt="Black and white portrait of Gabriela Ugalde, author of Brushella's art store, holding a brush and painting a colorful stroke across her face."
          objectFit="cover"
          maxW={{ base: "100%", sm: "100%", md: "100%", lg: "50%" }}
        />
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
              textAlign="left"
              lineHeight="1.7rem"
              fontWeight="300"
            >
              A curated collection boasts an array of charming products, all
              featuring designs sourced from Brushella's original paintings,
              that will elevate your home and lifestyle. Discover delightful tea
              towels, perfect for adding a splash of personality to your
              kitchen, or cozy up with plush blankets and neck warmers "Warmies"
              that promise warmth and comfort. Sip your favorite beverage from
              Brushella's enchanting magic mugs, and let your personality shine
              through unique "Scoodies" and stylish pillowcases. <br />
              For those looking to adorn their spaces with a unique, intricate,
              and original piece of art, browse Brushella's original paintings
              that encapsulate the essence of art colorfully and vibrantly,
              bringing joy and happiness to your life. Brushella prides on her
              handcrafted creations, each infused with love and attention to
              detail. <br />
              She also offers Exclusive Commission Services, including Stunning
              Murals, Sign Writing, and High-Quality Archival Prints of her
              original paintings to bring your vision to life.
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
