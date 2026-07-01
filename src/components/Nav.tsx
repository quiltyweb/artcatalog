import * as React from "react";
import { Box, Icon, Link, Text, Flex, useDisclosure, Select } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import LogoSVG from "../images/svg/brushella-black-bg.svg";
import { useLineItemsCount } from "../context/StoreContext";
import { useMarket } from "../context/MarketContext";
import { getCurrencySymbol } from "../utils/formatPrice";
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
    <Flex as="nav" aria-label="main navigation" alignItems="center" justify={["space-between", "space-between", "space-between", "flex-start", "flex-start"]}>
      <Link
        as={GatsbyLink}
        to="/"
        order={[2, 2, 2, 1, 1]}
        mx={[4, 4, 4, 0, 0]}
        display={["none", "none", "none", "block", "block"]}
      >
        <LogoSVG
          id="top-logo"
          aria-label={
            site?.siteMetadata?.title
              ? `${site.siteMetadata.title} home`
              : "Brushella home"
          }
          style={{
            maxWidth: "clamp(40px, 8vw, 60px)",
            maxHeight: "clamp(40px, 8vw, 60px)",
          }}
        />
      </Link>
      <Box order={[1, 1, 1, 2, 2]} flex={[1, 1, 1, 0, 0]} ml={[0, 0, 0, "auto", "auto"]}>
        <ResponsiveMenu
          allShopifyCollectionNodes={allShopifyCollection?.nodes}
          giftCardUrl={giftCardUrl}
          isOpen={isOpen}
          handleClickOnOpen={handleClickOnOpen}
          handleClickOnClose={handleClickOnClose}
        />
      </Box>
      <Link
        as={GatsbyLink}
        to="/"
        order={[2, 2, 2, 1, 1]}
        mx={[4, 4, 4, 0, 0]}
        display={["block", "block", "block", "none", "none"]}
        aria-hidden="true"
        tabIndex={-1}
      >
        <LogoSVG
          aria-hidden="true"
          style={{
            maxWidth: "clamp(40px, 8vw, 60px)",
            maxHeight: "clamp(40px, 8vw, 60px)",
          }}
        />
      </Link>
      <Flex flexDirection="row" alignItems="center" order={[3, 3, 3, 3, 3]} flex={[1, 1, 1, 0, 0]} justifyContent={["flex-end", "flex-end", "flex-end", "flex-end", "flex-end"]} ml={[0, 0, 0, 8, 8]}>
        {marketOptions.length > 1 && (
          <Box display={["none", "flex", "flex", "flex", "flex"]} alignItems="center" marginEnd={3}>
            <Select
              aria-label="Select currency"
              size="xs"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              variant="filled"
              w="5rem"
              bg="whiteAlpha.200"
              borderColor="whiteAlpha.400"
              iconColor="white"
              _hover={{ bg: "whiteAlpha.300" }}
              cursor="pointer"
              sx={{ color: "white" }}
            >
              {marketOptions.map((opt) => (
                <option key={opt.countryCode} value={opt.countryCode} style={{ color: "black" }}>
                  {opt.currencyCode} {getCurrencySymbol(opt.currencyCode)}
                </option>
              ))}
            </Select>
          </Box>
        )}
        <Link
          id="cart-link"
          as={GatsbyLink}
          to="/basket"
          display="flex"
          alignItems="baseline"
          justifyContent="center"
          gap="0"
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
