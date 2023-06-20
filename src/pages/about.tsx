import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Box, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';

const AboutPage: React.FunctionComponent = (): React.ReactElement => (
  <Layout>
    <Box p={8}>
      <Text fontSize="sm">About me page is Work in progress</Text>
    </Box>
    <StaticImage
      style={{ filter: 'grayscale(1)' }}
      alt="Painter Gabriela painting on a canvas"
      src="../images/brushella-author.jpg"
    />
  </Layout>
);

export default AboutPage;

export const Head = ({ location }) => (
  <SEO>
    <title id="title">About Me - Brushella</title>
    <meta id="description" name="description" content="About me Page, The author of Brushella art" />
    <meta id="twitter-og" name="twitter:url" content={`https://www.brushella.com.au/${location.pathname}`}/>
  </SEO>
);