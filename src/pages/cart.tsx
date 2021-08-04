import * as React from 'react';
import { Text } from '@chakra-ui/react';
import Layout from '../components/Layout';
import { useCartContext } from '../context/CartContext';

const CartPage: React.FunctionComponent = (): React.ReactElement => {
  const { cart } = useCartContext();
  return (
    <Layout helmetPageTitle="Cart">
      {cart.length !== 0 ? (
        <>
          <Text>Your items:</Text>
          <ul>
            {cart.map((item, index) => (
              <li key={`${item.id}-item-${index}`}>{`Quantity: ${item.quantity} - Product: ${item.title}`}</li>
            ))}
          </ul>
        </>
      ) : (
        'Your cart is empty'
      )}
    </Layout>
  );
};

export default CartPage;
