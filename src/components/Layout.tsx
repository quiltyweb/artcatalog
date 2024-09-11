import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Footer from "./Footer";
import { Grid, GridItem } from "@chakra-ui/react";
import Nav from "./Nav";

type LayoutProps = {
  children: React.ReactNode;
};

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
        color="#050505"
        bg="white"
        area={"main"}
        w="100%"
        maxWidth="1240px"
        margin="0 auto"
      >
        {children}
      </GridItem>
      <GridItem
        as="footer"
        area={"footer"}
        justifySelf="center"
        width={"100%"}
        maxWidth="1024px"
        marginTop="2rem"
      >
        <Footer
          legalContentItems={data.adminshopify?.legalContent.nodes[0].fields}
        />
      </GridItem>
    </Grid>
  );
};

export default Layout;
