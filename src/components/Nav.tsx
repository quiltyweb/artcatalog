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
  UseDisclosureProps,
} from "@chakra-ui/react";
import { Link } from "gatsby";
import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../images/svg/brushella-white.svg";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaRegEnvelope,
} from "react-icons/fa";
import styled from "styled-components";

const NavLink = styled(Link)`
  font-family: "Montserrat";
  font-style: normal;
  font-weight: 500;
  line-height: 1.5rem;
  color: #ffffff;
  text-decoration: none;
  text-transform: uppercase;
  &:hover {
    color: #6591a2;
  }
`;
type NavProps = {
  title?: string;
  allShopifyCollectionItems: Queries.LayoutPageQuery["allShopifyCollection"]["nodes"];
};

type CategoriesListMenuProps = {
  allShopifyCollectionItems: Queries.LayoutPageQuery["allShopifyCollection"]["nodes"];
  handleClickOnClose?: UseDisclosureProps["onClose"];
};

const CategoriesListMenu: React.FunctionComponent<CategoriesListMenuProps> = ({
  allShopifyCollectionItems,
  handleClickOnClose,
}): React.ReactElement => {
  return (
    <Stack
      spacing={[10, 10, 10, 5, 7, 7]}
      align="left"
      marginTop={5}
      marginBottom={[5, 5, 5, 0, 0, 0]}
      direction={["column", "column", "column", "row", "row", "row"]}
      fontSize={["1.2rem", "1.2rem", "1.2rem", "0.9rem", "0.9rem", "0.9rem"]}
    >
      {allShopifyCollectionItems &&
        allShopifyCollectionItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/collections/${item.handle}`}
            onClick={handleClickOnClose}
          >
            {item.title}
          </NavLink>
        ))}
      <NavLink key="about-item" to="/about" onClick={handleClickOnClose}>
        about
      </NavLink>
    </Stack>
  );
};

const Nav: React.FunctionComponent<NavProps> = ({
  title,
  allShopifyCollectionItems,
}): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const handleClickOnOpen = () => {
    onOpen();
  };
  const handleClickOnClose = () => {
    onClose();
  };

  // desktop menu
  if (isLargerThan992)
    return (
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Link to="/">
            <Logo
              aria-label={title || "Brushella"}
              alt={title || "Brushella"}
              style={{ maxWidth: "70", maxHeight: "70", filter: "invert(1)" }}
            />
          </Link>
        </Box>

        <CategoriesListMenu
          allShopifyCollectionItems={allShopifyCollectionItems}
        />
      </Box>
    );

  // mobile first menu
  return (
    <>
      <a href="mailto:brushellamaster@gmail.com">
        <Icon boxSize="2rem" aria-label="send a message" as={FaRegEnvelope} />
      </a>
      <Drawer
        id="brushella-mobile-menu"
        onClose={onClose}
        isOpen={isOpen}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent
          data-testid="mobile-menu"
          backgroundColor="#377482"
          color="#FFFFFF"
        >
          <DrawerCloseButton />
          <DrawerHeader width={40}></DrawerHeader>
          <DrawerBody>
            <CategoriesListMenu
              allShopifyCollectionItems={allShopifyCollectionItems}
              handleClickOnClose={handleClickOnClose}
            />
            <HStack spacing="1rem" padding="3rem" justifyContent="center">
              <Box>
                <a href="https://www.facebook.com/Brushella" target="_blank">
                  <Icon
                    boxSize="1.5rem"
                    aria-label="facebook"
                    as={FaFacebookF}
                  />
                </a>
              </Box>
              <Box>
                <a
                  href="https://www.instagram.com/brushella_brushmaster/"
                  target="_blank"
                >
                  <Icon
                    boxSize="1.5rem"
                    aria-label="instagram"
                    as={FaInstagram}
                  />
                </a>
              </Box>
              <Box>
                <a
                  href="https://api.whatsapp.com/send?phone=%2B61487877848&data=ARA2rjgrqD3ei6sgHpFdIxK1uippHhhlEnjcRmjkg3dG11AjZI8ShCbVqQYbVOdnhLfQad5KZQjB6Zogvx5p2r8gv6IgP7Ne4haC1SlM6kKI2H4VPgYdvvoSKUWELTr5rQZJooPwDE1IUpa7DgzMPGgREw&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR0un8_ftxPe1teJyVWm4Fun3pwKs-AjHqz6-AJ1STGxpwGkn6mBLDxMOZM"
                  target="_blank"
                >
                  <Icon
                    boxSize="1.5rem"
                    aria-label="whatsApp"
                    as={FaWhatsapp}
                  />
                </a>
              </Box>
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Box maxWidth={64} margin="0 auto">
        <Link to="/">
          <Logo
            aria-label={title || "Brushella"}
            alt={title || "Brushella"}
            style={{
              width: "56",
              maxWidth: "64",
              maxHeight: "64",
              filter: "invert(1)",
            }}
          />
        </Link>
      </Box>
      <IconButton
        onClick={() => handleClickOnOpen()}
        key={"sm"}
        m={1}
        aria-label="menu"
        title="menu"
        icon={<HamburgerIcon />}
        backgroundColor="#000000"
        color="#FFFFFF"
        fontSize="35px"
      />
    </>
  );
};

export default Nav;
