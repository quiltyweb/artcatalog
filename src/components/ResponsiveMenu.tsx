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
  Box,
  HStack,
  UseDisclosureProps,
  Link,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaBars } from "react-icons/fa";

type CategoriesListMenuProps = {
  allShopifyCollectionNodes?: Queries.LayoutGlobalDataQuery["allShopifyCollection"]["nodes"];
  handleClickOnClose: UseDisclosureProps["onClose"];
};

type StaticLinksMenuProps = {
  handleClickOnClose: UseDisclosureProps["onClose"];
};

type ResponsiveMenuProps = {
  isOpen: boolean;
  allShopifyCollectionNodes?: Queries.LayoutGlobalDataQuery["allShopifyCollection"]["nodes"];
  handleClickOnOpen: () => void;
  handleClickOnClose: () => void;
};

const SocialLinksMenu: React.FunctionComponent = (): React.ReactElement => {
  return (
    <HStack spacing="1rem" pl="0" mt="8" justifyContent="left">
      <Box>
        <a href="https://www.facebook.com/Brushella" target="_blank">
          <Icon boxSize="1rem" aria-label="facebook" as={FaFacebookF} />
        </a>
      </Box>
      <Box>
        <a
          href="https://www.instagram.com/brushella_brushmaster/"
          target="_blank"
        >
          <Icon boxSize="1rem" aria-label="instagram" as={FaInstagram} />
        </a>
      </Box>
      <Box>
        <a
          href="https://api.whatsapp.com/send?phone=%2B61487877848&data=ARA2rjgrqD3ei6sgHpFdIxK1uippHhhlEnjcRmjkg3dG11AjZI8ShCbVqQYbVOdnhLfQad5KZQjB6Zogvx5p2r8gv6IgP7Ne4haC1SlM6kKI2H4VPgYdvvoSKUWELTr5rQZJooPwDE1IUpa7DgzMPGgREw&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR0un8_ftxPe1teJyVWm4Fun3pwKs-AjHqz6-AJ1STGxpwGkn6mBLDxMOZM"
          target="_blank"
        >
          <Icon boxSize="1rem" aria-label="whatsApp" as={FaWhatsapp} />
        </a>
      </Box>
    </HStack>
  );
};

const StaticLinksMenu: React.FunctionComponent<StaticLinksMenuProps> = ({
  handleClickOnClose,
}): React.ReactElement => {
  return (
    <Stack spacing="6" align="left" px={0} mt={6} direction={"column"}>
      <Link
        fontSize="md"
        textTransform="uppercase"
        fontWeight="bold"
        as={GatsbyLink}
        key="about-item"
        to="/about"
        onClick={handleClickOnClose}
      >
        About Me
      </Link>
      <Link
        fontSize="md"
        textTransform="uppercase"
        fontWeight="bold"
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
  allShopifyCollectionNodes,
  handleClickOnClose,
}): React.ReactElement => {
  return (
    <Stack
      direction={["column", "column", "column", "row"]}
      spacing={["7"]}
      align="left"
      px={0}
      mx={0}
      textAlign={["left"]}
    >
      <Link
        fontSize={["md"]}
        textTransform="uppercase"
        fontWeight="bold"
        as={GatsbyLink}
        key={"item-home"}
        to="/"
        onClick={handleClickOnClose}
      >
        Home
      </Link>
      {allShopifyCollectionNodes &&
        allShopifyCollectionNodes.map((item) => (
          <Link
            fontSize={["md"]}
            textTransform="uppercase"
            fontWeight="bold"
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

const ResponsiveMenu: React.FunctionComponent<ResponsiveMenuProps> = ({
  allShopifyCollectionNodes,
  isOpen,
  handleClickOnOpen,
  handleClickOnClose,
}): React.ReactElement => {
  return (
    <>
      <Box
        id="desktop-list"
        display={["none", "none", "none", "block", "block", "block", "block"]}
      >
        <CategoriesListMenu
          allShopifyCollectionNodes={allShopifyCollectionNodes}
          handleClickOnClose={handleClickOnClose}
        />
      </Box>

      <Box
        id="mobile-list"
        display={["block", "block", "block", "none", "none", "none", "none"]}
      >
        <Drawer
          id="brushella-mobile-menu"
          data-testid="mobile-drawer"
          isOpen={isOpen}
          onClose={handleClickOnClose}
          size={"xs"}
        >
          <DrawerOverlay />
          <DrawerContent
            data-testid="mobile-drawer-content"
            backgroundColor="teal.600"
            color="white"
          >
            <DrawerCloseButton />
            <DrawerHeader width={40}></DrawerHeader>
            <DrawerBody>
              <CategoriesListMenu
                allShopifyCollectionNodes={allShopifyCollectionNodes}
                handleClickOnClose={handleClickOnClose}
              />
              <StaticLinksMenu handleClickOnClose={handleClickOnClose} />
              <SocialLinksMenu />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>

      <IconButton
        display={["block", "block", "block", "none", "none", "none", "none"]}
        onClick={handleClickOnOpen}
        aria-label="menu"
        title="menu"
        icon={<FaBars />}
        backgroundColor="transparent"
        color="#FFFFFF"
        fontSize="30px"
      />
    </>
  );
};

export default ResponsiveMenu;
