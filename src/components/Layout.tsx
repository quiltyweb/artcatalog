import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Footer from "./Footer";

import { Grid, GridItem } from "@chakra-ui/react";
import Nav from "./Nav";

type LayoutProps = {
  children: React.ReactNode;
};

// TODO: make LayoutPure componenet passing the data and test that, instead of the componenet that
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
        <Nav title={data.site.siteMetadata.title} />
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
        <Footer />
      </GridItem>
    </Grid>
  );
};

export default Layout;
