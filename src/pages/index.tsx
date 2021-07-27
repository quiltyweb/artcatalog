import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '../components/layout';

const IndexPage: React.FunctionComponent = (): React.ReactElement => (
  <Layout helmetPageTitle="Welcome">
    <p>~ Work in progress ~</p>
    <StaticImage alt="acrylic paint texture" src="../images/brushella-texture.jpg" />
  </Layout>
);

export default IndexPage;
