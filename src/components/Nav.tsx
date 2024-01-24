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
  Link,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";

import { HamburgerIcon } from "@chakra-ui/icons";
import Logo from "../images/svg/brushella-white.svg";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaRegEnvelope,
} from "react-icons/fa";

type NavProps = {
  title?: string;
  allShopifyCollectionItems: Queries.LayoutPageQuery["allShopifyCollection"]["nodes"];
};

type CategoriesListMenuProps = {
  allShopifyCollectionItems: Queries.LayoutPageQuery["allShopifyCollection"]["nodes"];
  handleClickOnClose?: UseDisclosureProps["onClose"];
};
type StaticLinksMenuProps = {
  handleClickOnClose?: UseDisclosureProps["onClose"];
};

const StaticLinksMenu: React.FunctionComponent<StaticLinksMenuProps> = ({
  handleClickOnClose,
}): React.ReactElement => {
  return (
    <Stack
      spacing={[10, 10, 10, 5, 7, 7]}
      align="left"
      marginTop={2}
      padding={3}
      direction={["column", "column", "column", "row", "row", "row"]}
    >
      <Link
        fontSize="xl"
        textTransform="capitalize"
        as={GatsbyLink}
        key="about-item"
        to="/about"
        onClick={handleClickOnClose}
      >
        about me
      </Link>
      <Link
        fontSize="xl"
        textTransform="capitalize"
        as={GatsbyLink}
        key="contact-item"
        to="/contact"
        onClick={handleClickOnClose}
      >
        contact
      </Link>
    </Stack>
  );
};
const CategoriesListMenu: React.FunctionComponent<CategoriesListMenuProps> = ({
  allShopifyCollectionItems,
  handleClickOnClose,
}): React.ReactElement => {
  return (
    <Stack
      spacing={[10, 10, 10, 5, 7, 7]}
      align="left"
      padding={3}
      direction={["column", "column", "column", "row", "row", "row"]}
    >
      {allShopifyCollectionItems &&
        allShopifyCollectionItems.length > 0 &&
        allShopifyCollectionItems.map((item) => (
          <Link
            fontSize="xl"
            textTransform="capitalize"
            as={GatsbyLink}
            key={item.id}
            to={`/collections/${item.handle}`}
            onClick={handleClickOnClose}
          >
            {item.title}
          </Link>
        ))}
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
        <Box padding={3}>
          <Link as={GatsbyLink} to="/">
            <Logo
              id="top-logo"
              aria-label={title || "Brushella"}
              alt={title || "Brushella"}
              style={{
                maxWidth: "80",
                maxHeight: "80",
                filter: "invert(1)",
              }}
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
      <Link as={GatsbyLink} to="/contact">
        <Icon boxSize="2rem" aria-label="send a message" as={FaRegEnvelope} />
      </Link>
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
            <StaticLinksMenu handleClickOnClose={handleClickOnClose} />
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
        <Link as={GatsbyLink} to="/">
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
