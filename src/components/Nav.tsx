import * as React from 'react';
import { Icon, Text, Stack } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'gatsby';
import { useCartContext } from '../context/CartContext';

const Nav: React.FunctionComponent = (): React.ReactElement => {
  const { cart } = useCartContext();
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return (
    <Stack
      spacing={8}
      align="center"
      justify={['center', 'space-between', 'flex-end', 'flex-end']}
      direction={['column', 'row', 'row', 'row']}
      pt={[4, 4, 0, 0]}
    >
      <Link to="/">
        <Text display="block">Home</Text>
      </Link>
      <Link to="/about">
        <Text display="block">About</Text>
      </Link>
      <Link to="/products">
        <Text display="block">Products</Text>
      </Link>
      <Link to="/cart">
        <Text display="block">
          <Icon as={FaShoppingBag} />
          {`My Cart (${cartCount} ${cartCount > 1 ? 'items' : 'item'})`}
        </Text>
      </Link>
    </Stack>
  );
};

export default Nav;
