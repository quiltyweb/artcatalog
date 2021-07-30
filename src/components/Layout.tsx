import * as React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import { Icon, Container, Flex, Box, Heading, Spacer, Text, Stack } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';

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
        <Stack
          spacing={8}
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <Link to="/">
            <Text display="block">Home</Text>
          </Link>
          <Link to="/about">
            <Text display="block">About</Text>
          </Link>
          <Link to="/products">
            <Text display="block">Products</Text>
          </Link>
          <Link to="/#">
            <Text display="block">
              <Icon as={FaShoppingBag} />
            </Text>
          </Link>
        </Stack>
      </Flex>
      {children}
    </Container>
  );
};

export default Layout;
