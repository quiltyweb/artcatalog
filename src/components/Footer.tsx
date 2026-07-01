import * as React from "react";
import {
  Box,
  HStack,
  Icon,
  ListItem,
  Select,
  Text,
  UnorderedList,
  Link,
} from "@chakra-ui/react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";
import { kebabCase } from "lodash";
import { useConsent } from "../hooks/useConsent";
import { useMarket } from "../context/MarketContext";
import { getCurrencySymbol } from "../utils/formatPrice";

type MarketRegionCountry = {
  code: string;
  currency: { currencyCode: string };
};

type ShopifyMarket = {
  name: string;
  status: string;
  type: string;
  conditions: {
    regionsCondition: {
      regions: { nodes: ReadonlyArray<MarketRegionCountry | Record<string, never>> };
    } | null;
  } | null;
};

type FooterProps = {
  legalContent?: Queries.LayoutGlobalDataQuery["adminshopify"]["legalContent"];
  markets?: ReadonlyArray<ShopifyMarket> | null;
};

const FooterLink = styled(GatsbyLink)`
  text-decoration: none;
  color: #2b2b35;
  &:hover {
    color: #6591a2;
    text-decoration: underline;
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
  markets,
}): React.ReactElement => {
  const year = new Date().getFullYear();
  const { reset: resetConsent } = useConsent();
  const { countryCode, setCountryCode } = useMarket();

  const marketOptions = (markets ?? [])
    .filter((m) => m.status === "ACTIVE" && m.type === "REGION")
    .flatMap((m) =>
      (m.conditions?.regionsCondition?.regions?.nodes ?? [])
        .filter((r): r is MarketRegionCountry => "code" in r)
        .slice(0, 1)
        .map((r) => ({ countryCode: r.code, currencyCode: r.currency.currencyCode })),
    )
    .filter((opt, index, arr) => arr.findIndex((o) => o.countryCode === opt.countryCode) === index);

  return (
    <Box data-testid="footer">
      <Box as="section" p="4" aria-labelledby="quicklinks">
        <hr />
        <Text
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
            <FooterLink to="/contact">Contact Me</FooterLink>
          </ListItem>
          <ListItem key={"about-page"} p="0 1rem 1rem 0">
            <FooterLink to="/about">About Me</FooterLink>
          </ListItem>
          <ListItem key={"all-products"} p="0 1rem 1rem 0">
            <FooterLink to="/collections">All Categories</FooterLink>
          </ListItem>
          <ListItem key={"cookie-settings"} p="0 1rem 1rem 0">
            <Link
              as="button"
              type="button"
              onClick={resetConsent}
              color="#2b2b35"
              fontWeight="medium"
              textTransform="capitalize"
              _hover={{ color: "#6591a2", textDecoration: "underline" }}
            >
              Cookie Settings
            </Link>
          </ListItem>
        </UnorderedList>
      </Box>
      <Box as="section" p="4">
        <hr />
        <HStack
          display="flex"
          flexDirection={["column", "row", "row", "row", "row"]}
          justifyContent="space-between"
          p="8"
          fontSize="md"
        >
          <HStack spacing="1rem" alignItems="center">
            <FooterIconLink
              data-testid="facebook"
              href="https://www.facebook.com/Brushella"
              target="_blank"
            >
              <Icon
                boxSize="1rem"
                aria-label="facebook"
                title="facebook"
                color="teal.600"
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
                color="teal.600"
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
                color="teal.600"
                as={FaWhatsapp}
              />
            </FooterIconLink>
          </HStack>
          {marketOptions.length > 1 && (
            <HStack spacing="2" alignItems="center">
              <Text as="label" htmlFor="footer-currency-select" fontSize="sm" color="gray.600" fontWeight="medium">
                Select currency
              </Text>
              <Select
                id="footer-currency-select"
                size="sm"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                variant="outline"
                w="auto"
                borderColor="gray.300"
                color="gray.700"
                cursor="pointer"
              >
                {marketOptions.map((opt) => (
                  <option key={opt.countryCode} value={opt.countryCode}>
                    {opt.currencyCode} {getCurrencySymbol(opt.currencyCode)}
                  </option>
                ))}
              </Select>
            </HStack>
          )}
          <Link href="#top-logo" textDecoration="underline" color="gray.600">
            Go to top
          </Link>
        </HStack>
        <Text display="flex" justifyContent="center" color="gray.600" fontSize="md" pb="2">
          © {year}, Brushella Art & Home décor. All rights reserved.
        </Text>
        <Text
          display="flex"
          justifyContent="center"
          color="gray.600"
          fontSize="sm"
          pb="4"
        >
          Design and Development by quiltyweb.com.au
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
