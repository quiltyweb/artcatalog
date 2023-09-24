import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";

const AboutPage: React.FunctionComponent = (): React.ReactElement => (
  <>
    <Box p={8}>
      <Text fontSize="md" margin="4">
        Hello! Thanks for visiting mi website. I am Gabriela Ugalde, Chilean
        painter and makeup artist actually living in Sydney, Australia. You can
        learn more about my work on my facebook page, visit:
        facebook.com/brushella For business inquiries, please email:
        brushellamaster@gmail.com Visit my shop: www.brushella.art
      </Text>
      <Text fontSize="md" margin="4">
        Hola! Gracias por visitar mi sitio web. Soy Gabriela Ugalde, pintora y
        maquilladora profesional Chilena actualmente viviendo en Sydney,
        Australia. Mi Facebook page, visita: facebook.com/brushella Para
        consultas envíame un email a: brushellamaster@gmail.com Visita mi tienda
        online: www.brushella.art
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
    <title id="title">About Me - Brushella</title>
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
