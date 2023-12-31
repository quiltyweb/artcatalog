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
  title: string;
  productCategoriesItems: Queries.LayoutPageQuery["adminshopify"]["productCategories"]["nodes"][0]["fields"];
};

type ListMenuProps = {
  productCategoriesItems: Queries.LayoutPageQuery["adminshopify"]["productCategories"]["nodes"][0]["fields"];
};

const ListMenu: React.FunctionComponent<ListMenuProps> = ({
  productCategoriesItems,
}): React.ReactElement => {
  return (
    <Stack
      spacing={[10, 10, 10, 10, 7]}
      align="left"
      marginTop={5}
      marginBottom={5}
      direction={["column", "column", "column", "column", "row"]}
      fontSize={["1.2rem", "1.2rem", "1.2rem", "1.2rem", "0.9rem"]}
    >
      {productCategoriesItems.map((item) => (
        <NavLink key={item.key} to={`/product-categories/${item.key}`}>
          {item.definition.name}
        </NavLink>
      ))}
      <NavLink to="/about">about</NavLink>
    </Stack>
  );
};

const Nav: React.FunctionComponent<NavProps> = ({
  title,
  productCategoriesItems,
}): React.ReactElement => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const handleClick = () => {
    onOpen();
  };

  // desktop menu
  if (isLargerThan1280)
    return (
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Link to="/">
            <LogoImage
              alt={title + " logo"}
              title={title + " logo"}
              style={{ maxWidth: "70", maxHeight: "70", filter: "invert(1)" }}
            />
          </Link>
        </Box>
        <ListMenu productCategoriesItems={productCategoriesItems} />
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
            <ListMenu productCategoriesItems={productCategoriesItems} />
            <HStack spacing="1rem" padding="3rem" justifyContent="center">
              <Box>
                <a href="https://www.facebook.com/Brushella" target="_blank">
                  <Icon
                    boxSize="1.5rem"
                    aria-label="facebook"
                    as={FaFacebookF}
                    title="facebook"
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
                    title="instagram"
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
                    title="whatsApp"
                  />
                </a>
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
            style={{
              width: "56",
              maxWidth: "64",
              maxHeight: "64",
              filter: "invert(1)",
            }}
          />
        </Link>
      </Box>
      <a href="mailto:brushellamaster@gmail.com">
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
