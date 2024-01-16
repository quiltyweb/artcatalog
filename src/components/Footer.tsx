import * as React from "react";
import {
  Box,
  HStack,
  Heading,
  Icon,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link } from "gatsby";
import styled from "styled-components";

const FooterLink = styled(Link)`
  text-decoration: none;
  color: #585858;
  &:hover {
    color: #6591a2;
  }
`;
const FooterIconLink = styled.a`
  text-decoration: none;
  color: #6591a2;
  &:hover {
    color: #585858;
  }
`;

type FooterProps = {
  legalContentItems: Queries.LayoutPageQuery["adminshopify"]["legalContent"]["nodes"][0]["fields"];
};

const Footer: React.FunctionComponent<FooterProps> = ({
  legalContentItems,
}): React.ReactElement => {
  return (
    <Box bg="white" justifySelf="left" p="4">
      <hr />
      <Heading
        id="quicklinks"
        size="md"
        color="#6591A2"
        as={"h3"}
        padding="2rem 0 2rem 0"
        display="flex"
        justifyContent={["left", "left", "center", "center", "center"]}
      >
        Quick Links
      </Heading>
      <UnorderedList
        display="flex"
        flexDirection={["column", "column", "row", "row", "row"]}
        pt={[4, 4, 4, 4]}
        justifyContent="space-around"
        styleType="none"
        margin={0}
      >
        {legalContentItems.map((item) => (
          <ListItem key={item.key} padding="0 1rem 1rem 0">
            <FooterLink to={`/legal-content/${item.key}`}>
              {item.definition.name}
            </FooterLink>
          </ListItem>
        ))}
        <ListItem key={"contact-page"} padding="0 1rem 1rem 0">
          <FooterLink to="/contact">contact me</FooterLink>
        </ListItem>
      </UnorderedList>

      <HStack spacing="1rem" padding="2rem" justifyContent="center">
        <Box>
          <FooterIconLink
            data-testid="facebook"
            href="https://www.facebook.com/Brushella"
            target="_blank"
          >
            <Icon
              boxSize="1.5rem"
              aria-label="facebook"
              title="facebook"
              as={FaFacebookF}
            />
          </FooterIconLink>
        </Box>
        <Box>
          <FooterIconLink
            aria-label="instagram"
            href="https://www.instagram.com/brushella_brushmaster/"
            target="_blank"
          >
            <Icon
              data-testid="instagram"
              boxSize="1.5rem"
              title="instagram"
              as={FaInstagram}
            />
          </FooterIconLink>
        </Box>
        <Box>
          <FooterIconLink
            data-testid="whatsApp"
            href="https://api.whatsapp.com/send?phone=%2B61487877848&data=ARA2rjgrqD3ei6sgHpFdIxK1uippHhhlEnjcRmjkg3dG11AjZI8ShCbVqQYbVOdnhLfQad5KZQjB6Zogvx5p2r8gv6IgP7Ne4haC1SlM6kKI2H4VPgYdvvoSKUWELTr5rQZJooPwDE1IUpa7DgzMPGgREw&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR0un8_ftxPe1teJyVWm4Fun3pwKs-AjHqz6-AJ1STGxpwGkn6mBLDxMOZM"
            target="_blank"
          >
            <Icon
              boxSize="1.5rem"
              aria-label="whatsApp"
              title="whatsApp"
              as={FaWhatsapp}
            />
          </FooterIconLink>
        </Box>
      </HStack>
      <hr />
      <Text display="flex" justifyContent="center" p={4}>
        © 2024, Brushella Art & Decor
      </Text>
    </Box>
  );
};

export default Footer;
