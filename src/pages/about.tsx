import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Heading, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";

const AboutPage: React.FunctionComponent = (): React.ReactElement => (
  <>
    <Box p={8}>
      <Heading>
        Hi! <br /> I'm Gabriela
      </Heading>
      <Text fontSize="md" margin="4">
        Iam a Chilean painter and makeup artist actually living in Sydney,
        Australia. You can learn more about my work on my facebook page, visit:
        facebook.com/brushella For business inquiries, please email:
        brushellamaster@gmail.com.
      </Text>
      <Heading>
        Hola! <br /> Soy Gabriela
      </Heading>
      <Text fontSize="md" margin="4">
        Pintora y maquilladora profesional Chilena actualmente viviendo en
        Sydney, Australia. Puedes conocer mas de mi trabajo visitando mi pagina
        de Facebook facebook.com/brushella. Para consultas envíame un email a
        brushellamaster@gmail.com.
      </Text>
    </Box>
    <Box display={"flex"} justifyContent={"center"}>
      <StaticImage
        style={{
          filter: "grayscale(1)",
          transform: "scaleX(-1)",
          maxWidth: "800px",
        }}
        alt="Painter Gabriela painting on a canvas"
        src="../images/about/author.jpg"
      />
    </Box>
  </>
);

export default AboutPage;

export const Head = ({ location }: PageProps): React.ReactElement => (
  <SEO>
    <title id="title">About Me: Brushella</title>
    <meta
      id="about-page"
      name="AboutPage"
      content="About me Page, The author of Brushella art"
    />
    <meta
      id="twitter-og"
      name="twitter:url"
      content={`https://www.brushella.art/${location.pathname}`}
    />
  </SEO>
);
