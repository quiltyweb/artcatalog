import * as React from "react";
import { Icon, Link, Text, Flex, useDisclosure } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import LogoSVG from "../images/svg/brushella-black-bg.svg";
import { useLineItemsCount } from "../context/StoreContext";
import ResponsiveMenu from "./ResponsiveMenu";
import { FaShoppingBag } from "react-icons/fa";

export type NavProps = {
  allShopifyCollection?: Queries.LayoutGlobalDataQuery["allShopifyCollection"];
  site?: Queries.LayoutGlobalDataQuery["site"];
};

const Nav: React.FunctionComponent<NavProps> = ({
  site,
  allShopifyCollection,
}): React.ReactElement => {
  const lineItemsCount = useLineItemsCount();
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
    <Flex gap="4" alignItems="center" justify="space-between">
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
        <Link
          as={GatsbyLink}
          to="/basket"
          display="flex"
          alignItems="baseline"
          justifyContent="center"
          gap="0"
          marginEnd={4}
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
        <ResponsiveMenu
          allShopifyCollectionNodes={allShopifyCollection?.nodes}
          isOpen={isOpen}
          handleClickOnOpen={handleClickOnOpen}
          handleClickOnClose={handleClickOnClose}
        />
      </Flex>
    </Flex>
  );
};

export default Nav;
