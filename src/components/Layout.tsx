import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Container, Flex, Box, Heading, Spacer } from '@chakra-ui/react';
import { CartProvider } from '../context/CartContext';
import Nav from './Nav';

type LayoutProps = {
  helmetPageTitle?: string;
  children: React.ReactNode;
};
// make LayoutPure componenet passing the data and test that, instead of the componenet that
const Layout: React.FunctionComponent<LayoutProps> = ({ helmetPageTitle, children }): React.ReactElement => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <CartProvider>
      <Container as="main" maxW="container.lg">
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <title>
            {helmetPageTitle} | {data.site.siteMetadata.title}
          </title>
        </Helmet>
        <Flex as="nav" align="center" justify="space-between" wrap="wrap" w="100%" mb={8} p={8}>
          <Box p="2">
            <Heading as="h1" size="md">
              {data.site.siteMetadata.title}
            </Heading>
          </Box>
          <Spacer />
          <Nav />
        </Flex>
        {children}
      </Container>
    </CartProvider>
  );
};

export default Layout;
