import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Box, Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

const AboutPage: React.FunctionComponent = (): React.ReactElement => (
  <Layout helmetPageTitle="About Me">
    <Box p={8}>
      <Text fontSize="sm">About me page is Work in progress</Text>
    </Box>
    <StaticImage alt="paint brushes" src="https://brushella.files.wordpress.com/2014/10/dsc04429.jpg" />
  </Layout>
);

export default AboutPage;
