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
    </Stack>
  );
};

const Nav = ({ title }: { title: string }): React.ReactElement => {
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
        title="menu"
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
                    title="facebook"
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
                    title="instagram"
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
                    title="whatsApp"
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
        <Icon
          boxSize="2rem"
          title="send a message"
          aria-label="send a message"
          as={FaRegEnvelope}
        />
      </a>
    </>
  );
};

export default Nav;
