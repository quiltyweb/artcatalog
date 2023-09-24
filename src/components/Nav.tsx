import * as React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  Stack,
  useDisclosure,
  useMediaQuery,
  Box,
  HStack,
} from "@chakra-ui/react";
import { Link } from "gatsby";
// import { useCartContext } from "../context/CartContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import LogoImage from "../images/svg/brushella-white.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaRegEnvelope,
} from "react-icons/fa";

const ListMenu = (): React.ReactElement => {
  return (
    <Stack
      spacing={8}
      align="center"
      direction={["column", "column", "column", "column", "row"]}
      pt={[4, 4, 4, 4]}
    >
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      {/* <Link to="/collections">collections</Link>
      <Link to="/products">products</Link>
      <Link to="/cart" aria-label="cart">
        {`my cart (${cartCount} ${cartCount > 1 ? "items" : "item"})`}
      </Link> */}
    </Stack>
  );
};

const Nav = ({ title }: { title: string }): React.ReactElement => {
  // const { cart } = useCartContext();
  // const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");

  const handleClick = () => {
    onOpen();
  };

  // desktop menu
  if (isLargerThan1280)
    return (
      <Box display="flex" flexDir="column" alignItems="center">
        <Box maxWidth={80}>
          <Link to="/">
            <LogoImage
              alt={title + " logo"}
              title={title + " logo"}
              style={{ maxWidth: "80", maxHeight: "80", filter: "invert(1)" }}
            />
          </Link>
        </Box>
        <ListMenu />
      </Box>
    );

  // mobile first menu
  return (
    <>
      <IconButton
        onClick={() => handleClick()}
        key={"sm"}
        m={1}
        aria-label="menu"
        icon={<HamburgerIcon />}
        backgroundColor="#000000"
        color="#FFFFFF"
        fontSize="35px"
      />

      <Drawer onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent backgroundColor="#377482" color="#FFFFFF">
          <DrawerCloseButton />
          <DrawerHeader width={40}></DrawerHeader>
          <DrawerBody>
            <ListMenu />
            <HStack spacing="1rem" padding="3rem" justifyContent="center">
              <Box>
                <Link to="https://www.facebook.com/Brushella" target="_blank">
                  <Icon
                    boxSize="1.5rem"
                    aria-label="facebook"
                    as={FaFacebookF}
                  />
                </Link>
              </Box>
              <Box>
                <Link
                  to="https://www.instagram.com/brushella_brushmaster/"
                  target="_blank"
                >
                  <Icon
                    boxSize="1.5rem"
                    aria-label="instagram"
                    as={FaInstagram}
                  />
                </Link>
              </Box>
              <Box>
                <Link
                  to="https://api.whatsapp.com/send?phone=%2B61487877848&data=ARA2rjgrqD3ei6sgHpFdIxK1uippHhhlEnjcRmjkg3dG11AjZI8ShCbVqQYbVOdnhLfQad5KZQjB6Zogvx5p2r8gv6IgP7Ne4haC1SlM6kKI2H4VPgYdvvoSKUWELTr5rQZJooPwDE1IUpa7DgzMPGgREw&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR0un8_ftxPe1teJyVWm4Fun3pwKs-AjHqz6-AJ1STGxpwGkn6mBLDxMOZM"
                  target="_blank"
                >
                  <Icon
                    boxSize="1.5rem"
                    aria-label="whatsApp"
                    as={FaWhatsapp}
                  />
                </Link>
              </Box>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box maxWidth={64} margin="0 auto">
        <Link to="/">
          <LogoImage
            alt={title + " logo"}
            title={title + " logo"}
            style={{ maxWidth: "64", maxHeight: "64", filter: "invert(1)" }}
          />
        </Link>
      </Box>
      <a href="mailto:meligatt@gmail.com">
        <Icon boxSize="2rem" aria-label="send a message" as={FaRegEnvelope} />
      </a>
      {/* <Link to="/cart" aria-label="cart">
        <Box display={"flex"} alignItems={"center"}>
          <Icon viewBox="0 0 25 29" width="25" height="29" fill="none">
            <path
              fill="#fff"
              d="M24 7.143h-4.857V6.57A6.572 6.572 0 0 0 6 6.571v.572H1.143C.51 7.143 0 7.653 0 8.286v19.143c0 .632.51 1.142 1.143 1.142H24c.632 0 1.143-.51 1.143-1.142V8.286c0-.632-.51-1.143-1.143-1.143ZM8.571 6.57c0-2.21 1.79-4 4-4 2.211 0 4 1.79 4 4v.572h-8V6.57Zm14 19.429h-20V9.714H6v3.143c0 .157.129.286.286.286h2a.287.287 0 0 0 .285-.286V9.714h8v3.143c0 .157.129.286.286.286h2a.287.287 0 0 0 .286-.286V9.714h3.428V26Z"
            />
          </Icon>
          <Text padding={2}>{`(${cartCount})`}</Text>
        </Box>
      </Link> */}
    </>
  );
};

export default Nav;
