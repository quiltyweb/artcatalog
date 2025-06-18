import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import {
  Icon,
  useMediaQuery,
  Link,
  Text,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import LogoSVG from "../images/svg/brushella-black-bg.svg";
import { useLineItemsCount } from "../context/StoreContext";
import ResponsiveMenu from "./ResponsiveMenu";
import { FaShoppingBag } from "react-icons/fa";

const Nav: React.FunctionComponent = (): React.ReactElement => {
  const { site, allShopifyCollection } =
    useStaticQuery<Queries.NavigationQuery>(graphql`
      query Navigation {
        site {
          siteMetadata {
            title
          }
        }
        allShopifyCollection(
          filter: { handle: { in: ["prints", "original-paintings"] } }
        ) {
          nodes {
            id
            title
            handle
          }
        }
      }
    `);

  const lineItemsCount = useLineItemsCount();
  const [isDektop] = useMediaQuery("(min-width: 929px)");
  const counterLabel =
    lineItemsCount === 1 ? `${lineItemsCount} item` : `${lineItemsCount} items`;

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
              ? `${site?.siteMetadata?.title} home`
              : "Brushella home"
          }
          style={{
            maxWidth: "60",
            maxHeight: "60",
          }}
        />
      </Link>
      <Flex
        flexDirection={isDektop ? "row-reverse" : "row"}
        alignItems="center"
      >
        <Link
          as={GatsbyLink}
          to="/basket"
          display="flex"
          alignItems="baseline"
          justifyContent="center"
          gap="0"
          aria-labelledby="cartIcon cartCounter"
        >
          <Icon
            id="cartIcon"
            aria-label="Shopping cart"
            boxSize="1.5rem"
            as={FaShoppingBag}
          />
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
          isDektop={isDektop}
          allShopifyCollectionNodes={allShopifyCollection.nodes}
          isOpen={isOpen}
          handleClickOnOpen={handleClickOnOpen}
          handleClickOnClose={handleClickOnClose}
        />
      </Flex>
    </Flex>
  );
};

export default Nav;
