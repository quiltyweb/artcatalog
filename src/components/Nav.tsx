import * as React from "react";
import { Icon, Link, Text, Flex, useDisclosure, Select } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import LogoSVG from "../images/svg/brushella-black-bg.svg";
import { useLineItemsCount } from "../context/StoreContext";
import { useMarket } from "../context/MarketContext";
import ResponsiveMenu from "./ResponsiveMenu";
import { FaShoppingBag } from "react-icons/fa";

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

export type NavProps = {
  allShopifyCollection?: Queries.LayoutGlobalDataQuery["allShopifyCollection"];
  site?: Queries.LayoutGlobalDataQuery["site"];
  markets?: ReadonlyArray<ShopifyMarket> | null;
};

const Nav: React.FunctionComponent<NavProps> = ({
  site,
  allShopifyCollection,
  markets,
}): React.ReactElement => {
  const lineItemsCount = useLineItemsCount();
  const { countryCode, setCountryCode } = useMarket();

  const marketOptions = (markets ?? [])
    .filter((m) => m.status === "ACTIVE" && m.type === "REGION")
    .flatMap((m) =>
      (m.conditions?.regionsCondition?.regions?.nodes ?? [])
        .filter((r): r is MarketRegionCountry => "code" in r)
        .slice(0, 1)
        .map((r) => ({ countryCode: r.code, currencyCode: r.currency.currencyCode })),
    )
    .filter(
      (opt, index, arr) =>
        arr.findIndex((o) => o.countryCode === opt.countryCode) === index,
    );

  const giftCardUrl = (() => {
    for (const node of allShopifyCollection?.nodes ?? []) {
      const giftCard = node.products?.find((p) => p.isGiftCard);
      if (giftCard) return `/collections/${node.handle}/${giftCard.handle}`;
    }
    return null;
  })();

  const counterLabel =
    lineItemsCount === 0
      ? `no items in shopping cart`
      : lineItemsCount === 1
      ? `${lineItemsCount} item in shopping cart`
      : `${lineItemsCount} items in shopping cart`;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClickOnOpen = () => {
    onOpen();
  };
  const handleClickOnClose = () => {
    onClose();
  };

  return (
    <Flex as="nav" aria-label="main navigation" gap="4" alignItems="center" justify="space-between">
      <Link as={GatsbyLink} to="/" marginEnd="auto">
        <LogoSVG
          id="top-logo"
          aria-label={
            site?.siteMetadata?.title
              ? `${site.siteMetadata.title} home`
              : "Brushella home"
          }
          style={{
            maxWidth: "60",
            maxHeight: "60",
          }}
        />
      </Link>
      <Flex flexDirection={"row"} alignItems="center">
        <Select
          aria-label="Select currency"
          size="xs"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          variant="filled"
          w="auto"
          marginEnd={2}
          bg="whiteAlpha.200"
          color="white"
          borderColor="whiteAlpha.400"
          _hover={{ bg: "whiteAlpha.300" }}
          cursor="pointer"
        >
          {marketOptions.map((opt) => (
            <option key={opt.countryCode} value={opt.countryCode} style={{ color: "black" }}>
              {opt.currencyCode}
            </option>
          ))}
        </Select>
        <ResponsiveMenu
          allShopifyCollectionNodes={allShopifyCollection?.nodes}
          giftCardUrl={giftCardUrl}
          isOpen={isOpen}
          handleClickOnOpen={handleClickOnOpen}
          handleClickOnClose={handleClickOnClose}
        />
        <Link
          id="cart-link"
          as={GatsbyLink}
          to="/basket"
          display="flex"
          alignItems="baseline"
          justifyContent="center"
          gap="0"
          marginStart={4}
          aria-labelledby="cartCounter"
          aria-live="polite"
        >
          <Icon id="cartIcon" boxSize="1.5rem" as={FaShoppingBag} />
          <Text
            id="cartCounter"
            aria-label={counterLabel}
            color="white"
            fontWeight="extrabold"
          >
            {lineItemsCount}
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Nav;
