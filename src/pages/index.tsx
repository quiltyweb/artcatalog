import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Text } from '@chakra-ui/react';
import Layout from '../components/Layout';

const IndexPage: React.FunctionComponent = (): React.ReactElement => (
  <Layout>
    <Text>Home Page is Work in progress</Text>
    <StaticImage style={{ filter: 'grayscale(1)' }} alt="acrylic paint texture" src="../images/brushella-texture.jpg" />
  </Layout>
);

export default IndexPage;

export const Head = () => (
<>
<html lang="en" />
<meta charSet="utf-8" />
<title>
  Welcome to Brushella - All things ART! Murals, Canvas painting, Crafts, Face and Bodypainting
</title>
</>)
