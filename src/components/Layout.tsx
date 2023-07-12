import * as React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import {
  Spacer,
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
import LogoImage from "../images/svg/logo-black-brushella.svg";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useCartContext } from "../context/CartContext";

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
                title={data.site.siteMetadata.title}
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
            title={data.site.siteMetadata.title}
          />
        </Link>

        <Link to="/cart">
          <Text display="block">
            <Icon
              viewBox="0 0 25 29"
              color="black"
              width="25"
              height="29"
              fill="none"
              aria-label="cart"
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

      <GridItem
        as="footer"
        color="black"
        bg="white"
        area={"footer"}
        justifySelf="center"
      >
        <Link to="/about">Refunds & Returns</Link>|
        <Link to="/about">Privacy Policy</Link>|
        <Link to="/about">Terms Of Service</Link>|<Link to="/about">FAQs</Link>
        |
        <Spacer />
        <Link to="https://www.facebook.com/Brushella" target="_blank">
          Facebook
        </Link>
        |
        <Link
          to="https://www.instagram.com/brushella_brushmaster/"
          target="_blank"
        >
          Instagram
        </Link>
        <Link
          to="https://api.whatsapp.com/send?phone=%2B61487877848&data=ARA2rjgrqD3ei6sgHpFdIxK1uippHhhlEnjcRmjkg3dG11AjZI8ShCbVqQYbVOdnhLfQad5KZQjB6Zogvx5p2r8gv6IgP7Ne4haC1SlM6kKI2H4VPgYdvvoSKUWELTr5rQZJooPwDE1IUpa7DgzMPGgREw&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR0un8_ftxPe1teJyVWm4Fun3pwKs-AjHqz6-AJ1STGxpwGkn6mBLDxMOZM"
          target="_blank"
        >
          WhatsApp
        </Link>
        <Spacer />© 2023, Brushella Art & decor Powered by Shopify
      </GridItem>
    </Grid>
  );
};

export default Layout;
