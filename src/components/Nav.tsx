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

type NavProps = {
  title: string;
  productCategoriesItems: Queries.LayoutPageQuery["adminshopify"]["productCategories"]["nodes"][0]["fields"];
};

const ListMenu = (): React.ReactElement => {
  return (
    <Stack
      spacing={8}
      align="center"
      direction={["column", "column", "column", "column", "row"]}
      pt={[4, 4, 4, 4]}
    >
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/prints">Prints</Link>
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

            <Stack
              spacing={8}
              align="center"
              direction={["column", "column", "column", "column", "row"]}
              pt={[4, 4, 4, 4]}
            >
              {productCategoriesItems.map((item) => (
                <Link
                  key={item.key}
                  style={{ textDecoration: "underline" }}
                  to={`/product-categories/${item.key}`}
                >
                  {item.definition.name}
                </Link>
              ))}
            </Stack>

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
