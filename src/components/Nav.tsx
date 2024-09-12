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
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import Logo from "../images/svg/brushella-black-bg.svg";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaRegEnvelope,
  FaShoppingBag,
  FaBars,
} from "react-icons/fa";
import { useLineItemsCount } from "../context/StoreContext";

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
      spacing="6"
      align="left"
      px={3}
      mt={6}
      direction={["column", "column", "column", "row", "row", "row"]}
    >
      <Link
        fontSize="lg"
        textTransform="capitalize"
        as={GatsbyLink}
        key="about-item"
        to="/about"
        onClick={handleClickOnClose}
      >
        about me
      </Link>
      <Link
        fontSize="lg"
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
      spacing="6"
      align="left"
      px={3}
      direction={["column", "column", "column", "row", "row", "row"]}
    >
      {allShopifyCollectionItems &&
        allShopifyCollectionItems.length > 0 &&
        allShopifyCollectionItems.map((item) => (
          <Link
            fontSize="lg"
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
  const lineItemsCount = useLineItemsCount();
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
      <Grid
        width="100%"
        gridGap="1rem"
        alignItems="center"
        gridTemplateColumns={"1fr 1fr 1fr "}
        templateAreas={`"left-icon    logo     icons "
                        "navigation navigation navigation"`}
      >
        <GridItem area={"left-icon"} justifySelf="left" px="3rem">
          <Link
            as={GatsbyLink}
            to="/contact"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="0.5rem"
          >
            <Icon boxSize="1.5rem" as={FaRegEnvelope} />
            Contact me
          </Link>
        </GridItem>
        <GridItem area={"logo"} justifySelf="center">
          <Link as={GatsbyLink} to="/">
            <Logo
              id="top-logo"
              aria-label={title || "Brushella"}
              alt={title || "Brushella"}
              style={{
                maxWidth: "70",
                maxHeight: "70",
              }}
            />
          </Link>
        </GridItem>
        <GridItem area={"icons"} justifySelf="right" px="3rem">
          <Link
            as={GatsbyLink}
            to="/basket"
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="0.5rem"
          >
            <Icon boxSize="1.5rem" as={FaShoppingBag} />
            {`My shopping cart (${lineItemsCount} ${
              lineItemsCount > 1 ? "items" : "item"
            })`}
          </Link>
        </GridItem>
        <GridItem area={"navigation"} justifySelf="center">
          <CategoriesListMenu
            allShopifyCollectionItems={allShopifyCollectionItems}
          />
        </GridItem>
      </Grid>
    );

  // mobile first menu
  return (
    <>
      <Link as={GatsbyLink} to="/contact">
        <Icon boxSize="1.8rem" aria-label="send a message" as={FaRegEnvelope} />
      </Link>
      <Link as={GatsbyLink} to="/basket" display="flex" alignItems="baseline">
        <Icon
          boxSize="1.8rem"
          aria-label="go to shopping bag"
          as={FaShoppingBag}
        />
        <Text color="white" fontWeight="extrabold">
          {lineItemsCount}
        </Text>
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
            <CategoriesListMenu
              allShopifyCollectionItems={allShopifyCollectionItems}
              handleClickOnClose={handleClickOnClose}
            />

            <StaticLinksMenu handleClickOnClose={handleClickOnClose} />

            <HStack spacing="1rem" pl="2" mt="8" justifyContent="left">
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
                  <Icon
                    boxSize="1rem"
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
                  <Icon boxSize="1rem" aria-label="whatsApp" as={FaWhatsapp} />
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
            }}
          />
        </Link>
      </Box>
      <IconButton
        onClick={() => handleClickOnOpen()}
        key={"bars-menu-button"}
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

export default Nav;
