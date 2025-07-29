import * as React from "react";
import Footer from "./Footer";
import { Grid, GridItem } from "@chakra-ui/react";
import Nav from "./Nav";
import styled from "styled-components";
import { useLayoutData } from "../context/LayoutContext";

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
  const layoutData = useLayoutData();
  return (
    <Grid
      gridTemplateRows={"auto"}
      gridTemplateColumns={"1fr 1fr 1fr 1fr "}
      templateAreas={`"banner banner banner banner"
                      "header header header header"
                      "main main main main"
                      "footer footer footer footer"`}
      gridAutoFlow="row"
      backgroundColor="white"
      color="black"
      fontWeight="normal"
      justifyItems="center"
    >
      <GridItem
        as="nav"
        gap="1rem"
        color="#FFFFFF"
        bg={"blackAlpha.900"}
        area={"header"}
        px={7}
        py={3}
        width="100%"
      >
        <Nav
          site={layoutData?.site}
          allShopifyCollection={layoutData?.allShopifyCollection}
        />
      </GridItem>
      <GridItem
        id="main"
        as="main"
        color="#050505"
        bg="white"
        area={"main"}
        w="100%"
        margin="0 auto"
      >
        <HeaderVisuallyHidden>Brushella</HeaderVisuallyHidden>
        {children}
      </GridItem>
      <GridItem
        as="footer"
        area={"footer"}
        justifySelf="center"
        width={"100%"}
        maxWidth="1200px"
        marginTop="6"
      >
        <Footer legalContent={layoutData?.adminshopify.legalContent} />
      </GridItem>
    </Grid>
  );
};

export default Layout;
