import { createContext, useContext } from 'react';

interface CartContextProps {
  cartCount?: number;
}

const CartContext = createContext<CartContextProps>({});

export const useCartContext = (): CartContextProps => useContext(CartContext);

export default CartContext;
