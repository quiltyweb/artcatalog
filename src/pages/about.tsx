import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Box, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

const AboutPage: React.FunctionComponent = (): React.ReactElement => (
  <Layout helmetPageTitle="About Me">
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
