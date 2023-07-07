import * as React from "react";
import { Text, Button } from "@chakra-ui/react";
import { useCartContext } from "../context/CartContext";
import SEO from "../components/SEO";

const CartPage: React.FunctionComponent = (): React.ReactElement => {
  const { cart, deleteItemFromCart } = useCartContext();

  return (
    <>
      {cart.length !== 0 ? (
        <>
          <Text>Your items:</Text>
          <ul>
            {cart.map((item, index) => (
              <li key={`${item.id}-item-${index}`}>
                {`Quantity: ${item.quantity} - Product: ${item.title}`}{" "}
                <Button
                  onClick={() => {
                    deleteItemFromCart({ id: item.id });
                  }}
                >
                  delete
                </Button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        "Your cart is empty"
      )}

      <Button>Go to Checkout</Button>
    </>
  );
};

export default CartPage;

export const Head = () => (
  <SEO>
    <title id="title">My Cart - Brushella</title>
    <meta
      id="description"
      name="description"
      content="Brushella shopping cart"
    />
  </SEO>
);
