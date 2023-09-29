import * as React from "react";
import { StaticImage } from "gatsby-plugin-image";
import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import SEO from "../components/SEO";
import { PageProps } from "gatsby";

const AboutPage: React.FunctionComponent = (): React.ReactElement => (
  <>
    <Stack direction={["column", "column", "row", "row", "row"]} p={4}>
      <Box>
        <Heading as="h1" size="xl" marginBottom={4}>
          About
        </Heading>
        <Heading as="h2" size="lg" marginBottom={4}>
          The hands behind <i>Brushella</i>
        </Heading>
        <Text fontSize="md">
          Gabriella is a Chilean artist living and creating on Dharawal land,
          Wollongong NSW, Australia. Her artwork combines realistic nature
          elements in a fantasy context, exploring the infinity of colours and
          imagination. Also, she is an all-rounder craftswomen and mixed media
          artist, using many different materials and mediums as hollow bones
          through where she expresses her soul. From hand knitting to resin art,
          from wood work to sewing and everything in between, Brushella's world
          of creations is full of shapes, animals and bright saturated colours.
          She is also a writer an muralist. Inspired by nature, fueled by
          motherhood and self awareness, her art invites you to immerse yourself
          into your own fantasy world, your mind and your heart.
        </Text>
      </Box>
      <StaticImage
        style={{
          filter: "grayscale(1)",
          transform: "scaleX(-1)",
          borderRadius: "6px",
        }}
        alt="Painter Gabriela painting on a canvas"
        src="../images/about/author.jpg"
      />
    </Stack>
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
