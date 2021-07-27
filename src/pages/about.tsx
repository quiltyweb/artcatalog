import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Box, Text } from '@chakra-ui/react';
import Layout from '../components/layout';

const AboutPage: React.FunctionComponent = (): React.ReactElement => (
  <Layout helmetPageTitle="About Me">
    <Box p={8}>
      <Text fontSize="xl">Hi there! I'm the proud creator of this site, which I built with Gatsby.</Text>
    </Box>
    <StaticImage alt="paint brushes" src="https://brushella.files.wordpress.com/2014/10/dsc04429.jpg" />
  </Layout>
);

export default AboutPage;
