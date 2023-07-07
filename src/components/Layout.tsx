import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import {
  Container,
  Flex,
  Box,
  Heading,
  Spacer,
  Grid,
  GridItem,
} from "@chakra-ui/react";
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
        <Nav />
      </GridItem>

      <GridItem color="black" pl="2" bg="white" area={"main"}>
        {children}
      </GridItem>

      <GridItem color="black" pl="2" bg="white" area={"footer"}>
        Footer Footer Footer Footer
      </GridItem>
    </Grid>
  );
};

export default Layout;
