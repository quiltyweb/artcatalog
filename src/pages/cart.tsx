import * as React from 'react';
import { Text, Button } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useCartContext } from '../context/CartContext';

const CartPage: React.FunctionComponent = (): React.ReactElement => {
  const { cart, deleteItemFromCart } = useCartContext();

  return (
    <Layout>
      {cart.length !== 0 ? (
        <>
          <Text>Your items:</Text>
          <ul>
            {cart.map((item, index) => (
              <li key={`${item.id}-item-${index}`}>
                {`Quantity: ${item.quantity} - Product: ${item.title}`}{' '}
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
        'Your cart is empty'
      )}

      <Button>Go to Checkout</Button>
    </Layout>
  );
};

export const Head = () => (
  <>
  <html lang="en" />
  <meta charSet="utf-8" />
  <title>
    My Cart - Brushella Store
  </title>
  </>)

export default CartPage;
