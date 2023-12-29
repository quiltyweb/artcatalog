import * as React from "react";
import {
  Box,
  HStack,
  Icon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "gatsby";

type FooterProps = {
  legalContentItems: Queries.LayoutPageQuery["adminshopify"]["legalContent"]["nodes"][0]["fields"];
};

const Footer: React.FunctionComponent<FooterProps> = ({
  legalContentItems,
}): React.ReactElement => {
  return (
    <Box color="black" bg="white" justifySelf="center" p="4">
      <HStack spacing="1rem" marginBottom="3rem" justifyContent="center">
        <Box>
          <Link
            data-testid="facebook"
            to="https://www.facebook.com/Brushella"
            target="_blank"
          >
            <Icon
              boxSize="1.5rem"
              aria-label="facebook"
              title="facebook"
              as={FaFacebookF}
            />
          </Link>
        </Box>
        <Box>
          <Link
            aria-label="instagram"
            to="https://www.instagram.com/brushella_brushmaster/"
            target="_blank"
          >
            <Icon
              data-testid="instagram"
              boxSize="1.5rem"
              title="instagram"
              as={FaInstagram}
            />
          </Link>
        </Box>
        <Box>
          <Link
            data-testid="whatsApp"
            to="https://api.whatsapp.com/send?phone=%2B61487877848&data=ARA2rjgrqD3ei6sgHpFdIxK1uippHhhlEnjcRmjkg3dG11AjZI8ShCbVqQYbVOdnhLfQad5KZQjB6Zogvx5p2r8gv6IgP7Ne4haC1SlM6kKI2H4VPgYdvvoSKUWELTr5rQZJooPwDE1IUpa7DgzMPGgREw&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR0un8_ftxPe1teJyVWm4Fun3pwKs-AjHqz6-AJ1STGxpwGkn6mBLDxMOZM"
            target="_blank"
          >
            <Icon
              boxSize="1.5rem"
              aria-label="whatsApp"
              title="whatsApp"
              as={FaWhatsapp}
            />
          </Link>
        </Box>
      </HStack>

      <UnorderedList
        display="flex"
        justifyContent="space-around"
        styleType="none"
        marginBottom="3rem"
      >
        {legalContentItems.map((item) => (
          <ListItem key={item.key} padding="1rem">
            <Link
              style={{ textDecoration: "underline" }}
              to={`/legal-content/${item.key}`}
            >
              {item.definition.name}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>

      <Text p={4}>© 2023, Brushella Art & Decor</Text>
    </Box>
  );
};

export default Footer;
