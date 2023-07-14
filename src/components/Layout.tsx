import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import {
  Grid,
  GridItem,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import Nav from "./Nav";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useCartContext } from "../context/CartContext";
import Footer from "./Footer";
import LogoImage from "../images/svg/logo-black-brushella.svg";

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
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };
  const { cart } = useCartContext();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

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
        justifyContent={"space-between"}
        alignItems={"center"}
        color="black"
        bg="#F4F4F4"
        area={"header"}
      >
        <IconButton
          onClick={() => handleClick()}
          key={"xs"}
          m={4}
          aria-label="menu"
          icon={<HamburgerIcon />}
        />
        <Drawer onClose={onClose} isOpen={isOpen} size={"xs"}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <LogoImage
                alt={data.site.siteMetadata.title + " logo"}
                title={data.site.siteMetadata.title + " logo"}
              />
            </DrawerHeader>
            <DrawerBody>
              <Nav />
            </DrawerBody>
          </DrawerContent>
        </Drawer>

        <Link to="/">
          <LogoImage
            alt={data.site.siteMetadata.title + " logo"}
            title={data.site.siteMetadata.title + " logo"}
          />
        </Link>

        <Link to="/cart" aria-label="cart">
          <Text display="block">
            <Icon
              viewBox="0 0 25 29"
              color="black"
              width="25"
              height="29"
              fill="none"
            >
              <path
                fill="#000"
                d="M24 7.143h-4.857V6.57A6.572 6.572 0 0 0 6 6.571v.572H1.143C.51 7.143 0 7.653 0 8.286v19.143c0 .632.51 1.142 1.143 1.142H24c.632 0 1.143-.51 1.143-1.142V8.286c0-.632-.51-1.143-1.143-1.143ZM8.571 6.57c0-2.21 1.79-4 4-4 2.211 0 4 1.79 4 4v.572h-8V6.57Zm14 19.429h-20V9.714H6v3.143c0 .157.129.286.286.286h2a.287.287 0 0 0 .285-.286V9.714h8v3.143c0 .157.129.286.286.286h2a.287.287 0 0 0 .286-.286V9.714h3.428V26Z"
              />
            </Icon>
            {`(${cartCount})`}
          </Text>
        </Link>
      </GridItem>

      <GridItem
        as="main"
        color="black"
        bg="white"
        area={"main"}
        justifySelf="center"
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
