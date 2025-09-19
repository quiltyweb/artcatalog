import * as React from "react";
import {
  Box,
  HStack,
  Icon,
  ListItem,
  Text,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";
import { kebabCase } from "lodash";

type FooterProps = {
  legalContent?: Queries.LayoutGlobalDataQuery["adminshopify"]["legalContent"];
};

const FooterLink = styled(GatsbyLink)`
  text-decoration: none;
  color: #2b2b35;
  &:hover {
    color: #6591a2;
  }
`;
const FooterIconLink = styled.a`
  text-decoration: none;
  color: #2b2b35;
  &:hover {
    color: #585858;
  }
`;

const Footer: React.FunctionComponent<FooterProps> = ({
  legalContent,
}): React.ReactElement => {
  return (
    <Box data-testid="footer">
      <Box p="4">
        <hr />
        <Text
          as={"h4"}
          id="quicklinks"
          size="lg"
          fontWeight="bold"
          color="teal.600"
          textAlign={["left", "left", "center", "center", "center"]}
          pt="8"
          pb="8"
          pl="4"
        >
          Quick Links
        </Text>
        <UnorderedList
          display="flex"
          flexDirection={["column", "column", "row", "row", "row"]}
          justifyContent="space-around"
          styleType="none"
          fontSize="md"
          fontWeight="medium"
          textTransform="capitalize"
        >
          {legalContent &&
            legalContent.nodes[0].fields.map((item) => {
              const fieldKey = `${kebabCase(item.key)}`;

              return (
                <ListItem key={item.key} p="0 1rem 1rem 0">
                  <FooterLink to={`/legal-content/${fieldKey}`}>
                    {item.definition.name}
                  </FooterLink>
                </ListItem>
              );
            })}
          <ListItem key={"contact-page"} p="0 1rem 1rem 0">
            <FooterLink to="/contact">contact me</FooterLink>
          </ListItem>
          <ListItem key={"about-page"} p="0 1rem 1rem 0">
            <FooterLink to="/about">about me</FooterLink>
          </ListItem>
          <ListItem key={"all-products"} p="0 1rem 1rem 0">
            <FooterLink to="/collections">All Categories</FooterLink>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box p="4">
        <hr />
        <HStack
          display="flex"
          flexDirection={["column", "row", "row", "row", "row"]}
          justifyContent="space-between"
          p="8"
          fontSize="md"
        >
          <HStack spacing="1rem">
            <FooterIconLink
              data-testid="facebook"
              href="https://www.facebook.com/Brushella"
              target="_blank"
            >
              <Icon
                boxSize="1rem"
                aria-label="facebook"
                title="facebook"
                color="teal.500"
                as={FaFacebookF}
              />
            </FooterIconLink>

            <FooterIconLink
              aria-label="instagram"
              href="https://www.instagram.com/brushella_brushmaster/"
              target="_blank"
            >
              <Icon
                data-testid="instagram"
                boxSize="1rem"
                title="instagram"
                color="teal.500"
                as={FaInstagram}
              />
            </FooterIconLink>

            <FooterIconLink
              data-testid="whatsApp"
              href="https://api.whatsapp.com/send?phone=%2B61487877848&data=ARA2rjgrqD3ei6sgHpFdIxK1uippHhhlEnjcRmjkg3dG11AjZI8ShCbVqQYbVOdnhLfQad5KZQjB6Zogvx5p2r8gv6IgP7Ne4haC1SlM6kKI2H4VPgYdvvoSKUWELTr5rQZJooPwDE1IUpa7DgzMPGgREw&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwAR0un8_ftxPe1teJyVWm4Fun3pwKs-AjHqz6-AJ1STGxpwGkn6mBLDxMOZM"
              target="_blank"
            >
              <Icon
                boxSize="1rem"
                aria-label="whatsApp"
                title="whatsApp"
                color="teal.500"
                as={FaWhatsapp}
              />
            </FooterIconLink>
          </HStack>
          <Text display="flex" justifyContent="center" color="gray.600">
            © 2024, Brushella Art & Decor
          </Text>
          <Link href="#top-logo" textDecoration="underline" color="gray.600">
            Go to top
          </Link>
        </HStack>
      </Box>
    </Box>
  );
};

export default Footer;
