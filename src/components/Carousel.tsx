import * as React from "react";
import { Box, Button } from "@chakra-ui/react";
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

type CarouselProps = {
  title: string;
};

const Carousel: React.FunctionComponent<CarouselProps> = ({
  title,
}): React.ReactElement => {
  return (
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
      <StaticImage alt={title} src="../images/slider/slider1.png" />
      <Button as="div" m="6" backgroundColor={"#2A5F71"} color="white">
        <Link to="/collections/">explore all collections</Link>
      </Button>
    </Box>
  );
};

export default Carousel;
