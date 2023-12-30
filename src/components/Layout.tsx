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
  const data = useStaticQuery(graphql`
    query LayoutPage {
      site {
        siteMetadata {
          title
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
        productCategories: metaobjects(first: 10, type: "product_categories") {
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
      gridTemplateColumns={"1fr 1fr 1fr 1fr"}
      templateAreas={`"header header header header"
                      "main main main main"
                      "footer footer footer footer"`}
      gap="10px"
      gridAutoFlow="row"
      backgroundColor="white"
      color="black"
      fontWeight="normal"
    >
      <GridItem
        as="nav"
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        color="#FFFFFF"
        bg="#000000"
        area={"header"}
        padding={4}
      >
        <Nav
          title={data.site.siteMetadata.title}
          productCategoriesItems={
            data.adminshopify?.productCategories.nodes[0].fields
          }
        />
      </GridItem>
      <GridItem
        as="main"
        color="black"
        bg="white"
        area={"main"}
        justifySelf="center"
        maxWidth={"60rem"}
      >
        {children}
      </GridItem>
      <GridItem as="footer" area={"footer"} justifySelf="center">
        <Footer
          legalContentItems={data.adminshopify?.legalContent.nodes[0].fields}
        />
      </GridItem>
    </Grid>
  );
};

export default Layout;
