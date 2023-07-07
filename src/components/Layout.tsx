import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { Heading, Spacer, Grid, GridItem } from "@chakra-ui/react";
import Nav from "./Nav";

type LayoutProps = {
  children: React.ReactNode;
};

// make LayoutPure componenet passing the data and test that, instead of the componenet that
const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
}): React.ReactElement => {
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
    <Grid
      gridTemplateRows={"auto"}
      gridTemplateColumns={"1fr 1fr 1fr 1fr"}
      templateAreas={`"header header header header"
                      "main main main main"
                      "footer footer footer footer"`}
      gap="1"
      backgroundColor={"white"}
      color="black"
      fontWeight="normal"
    >
      <GridItem color="black" pl="2" bg="#F4F4F4" area={"header"}>
        <Heading as="h1" size="md">
          {data.site.siteMetadata.title}
        </Heading>
        <Spacer />
        <Nav />
      </GridItem>

      <GridItem as="main" color="black" pl="2" bg="white" area={"main"}>
        {children}
      </GridItem>

      <GridItem as="footer" color="black" pl="2" bg="white" area={"footer"}>
        Refunds & Returns | Privacy Policy | Terms Of Service | FAQs
        <Spacer />
        © 2023, Brushella Art & decor Powered by Shopify
        <Spacer />
        Facebook | Instagram | WhatsApp
      </GridItem>
    </Grid>
  );
};

export default Layout;
