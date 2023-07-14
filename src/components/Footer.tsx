import * as React from "react";
import {
  Box,
  HStack,
  Heading,
  Icon,
  ListItem,
  UnorderedList,
  Text,
} from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "gatsby";

const Footer: React.FunctionComponent = (): React.ReactElement => {
  return (
    <Box as="footer" color="black" bg="white" justifySelf="center">
      <Heading as="h5">quick links</Heading>
      <UnorderedList styleType="none" marginBottom="3rem" marginLeft={0}>
        <ListItem>
          <Link to="/about">Refunds & Returns</Link>
        </ListItem>
        <ListItem>
          <Link to="/about">Privacy Policy</Link>
        </ListItem>
        <ListItem>
          <Link to="/about">Terms Of Service</Link>
        </ListItem>
        <ListItem>
          <Link to="/about">FAQs</Link>
        </ListItem>
      </UnorderedList>
      <HStack spacing="1rem" marginBottom="3rem">
        <Box>
          <Link to="https://www.facebook.com/Brushella" target="_blank">
            <Icon boxSize="1.5rem" aria-label="facebook" as={FaFacebookF} />
          </Link>
        </Box>
        <Box>
          <Link
            to="https://www.instagram.com/brushella_brushmaster/"
            target="_blank"
          >
            <Icon boxSize="1.5rem" aria-label="instagram" as={FaInstagram} />
          </Link>
        </Box>
        <Box>
          <Link
            to="https://api.whatsapp.com/send?phone=%2B61487877848&data=ARA2rjgrqD3ei6sgHpFdIxK1uippHhhlEnjcRmjkg3dG11AjZI8ShCbVqQYbVOdnhLfQad5KZQjB6Zogvx5p2r8gv6IgP7Ne4haC1SlM6kKI2H4VPgYdvvoSKUWELTr5rQZJooPwDE1IUpa7DgzMPGgREw&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR0un8_ftxPe1teJyVWm4Fun3pwKs-AjHqz6-AJ1STGxpwGkn6mBLDxMOZM"
            target="_blank"
          >
            <Icon boxSize="1.5rem" aria-label="whatsApp" as={FaWhatsapp} />
          </Link>
        </Box>
      </HStack>
      <Text>© 2023, Brushella Art & decor Powered by Shopify</Text>
    </Box>
  );
};

export default Footer;
