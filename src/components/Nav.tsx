import * as React from "react";
import { Icon, Stack } from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "gatsby";
import { useCartContext } from "../context/CartContext";

const Nav: React.FunctionComponent = (): React.ReactElement => {
  const { cart } = useCartContext();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Stack
      spacing={8}
      align="center"
      justify={["center", "space-between", "flex-end", "flex-end"]}
      direction={["column", "row", "row", "row"]}
      pt={[4, 4, 0, 0]}
    >
      <Link to="/">home</Link>
      <Link to="/about">about</Link>
      <Link to="/products">products</Link>
      <Link to="/cart" aria-label="cart">
        <Icon as={FaShoppingBag} />
        {`my cart (${cartCount} ${cartCount > 1 ? "items" : "item"})`}
      </Link>
    </Stack>
  );
};

export default Nav;
