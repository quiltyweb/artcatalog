import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Footer from "./Footer";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import Nav from "./Nav";
import styled from "styled-components";

type LayoutProps = {
  children: React.ReactNode;
};

const HeaderVisuallyHidden = styled.h1`
  border: 0;
  clip: rect(0 0 0 0);
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}): React.ReactElement => {
  const data = useStaticQuery<Queries.LayoutPageQuery>(graphql`
    query LayoutPage {
      site {
        siteMetadata {
          title
        }
      }
      allShopifyCollection {
        nodes {
          id
          title
          handle
        }
      }
      adminshopify {
        legalContent: metaobjects(first: 10, type: "legal_content") {
          nodes {
            fields {
              key
              definition {
                name
              }
            }
          }
        }
      }
    }
  `);

  return (
    <Grid
      gridTemplateRows={"auto"}
      gridTemplateColumns={"1fr 1fr 1fr 1fr "}
      templateAreas={`"header header header header"
                      "main main main main"
                      "footer footer footer footer"`}
      gap="6"
      gridAutoFlow="row"
      backgroundColor="white"
      color="black"
      fontWeight="normal"
      justifyItems="center"
    >
      <GridItem
        as="nav"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        gap="1rem"
        color="#FFFFFF"
        bg={"blackAlpha.900"}
        area={"header"}
        px={3}
        py={3}
        width="100%"
      >
        <Nav
          title={data.site?.siteMetadata?.title ?? "Brushella"}
          allShopifyCollectionItems={data.allShopifyCollection?.nodes}
        />
      </GridItem>
      <GridItem
        as="main"
        id="main"
        color="#050505"
        bg="white"
        area={"main"}
        w="100%"
        maxWidth="1240px"
        margin="0 auto"
        pl="2"
        pr="2"
      >
        <HeaderVisuallyHidden>Brushella</HeaderVisuallyHidden>
        {children}
      </GridItem>
      <GridItem
        as="footer"
        area={"footer"}
        justifySelf="center"
        width={"100%"}
        maxWidth="1024px"
        marginTop="6"
      >
        <Footer
          legalContentItems={data.adminshopify?.legalContent.nodes[0].fields}
        />
      </GridItem>
    </Grid>
  );
};

export default Layout;
