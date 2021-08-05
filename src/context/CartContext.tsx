import * as React from 'react';

type IncrementCartProps = {
  quantity: number;
};

type DeleteItemFromCartProps = {
  id: number;
  position: number;
};

type CartItemProps = {
  id: string;
  title: string;
  quantity: number;
};

interface CartContextProps {
  cartCount?: number;
  cart: Array<CartItemProps>;
  incrementCart?: (item: IncrementCartProps) => void;
  addItemToCart?: (item: CartItemProps) => void;
  deleteItemFromCart?: (item: DeleteItemFromCartProps) => void;
}

const defaultContextState = {
  cartCount: 0,
  cart: [],
  incrementCart: () => {},
  addItemToCart: () => {},
  deleteItemFromCart: () => {},
};

const CartContext = React.createContext<CartContextProps>(defaultContextState);

interface Props {
  children: React.ReactNode;
}

interface State {
  cartCount: number;
  cart: Array<CartItemProps>;
}

class CartProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { cartCount: 0, cart: [] };
  }

  incrementCart = ({ quantity }: IncrementCartProps) => {
    const { cartCount } = this.state;
    this.setState({ cartCount: cartCount + quantity });
  };

  addItemToCart = ({ id, title, quantity }: CartItemProps) => {
    const newItem = { id, title, quantity };
    this.setState((state) => {
      const updatedCart = [...state.cart, newItem];
      return {
        cartCount: updatedCart.length,
        cart: updatedCart,
      };
    });
  };

  deleteItemFromCart = ({ id, position }: DeleteItemFromCartProps) => {
    this.setState((state) => {
      const filteredCart = state.cart.filter((item, i) => position !== i);
      return {
        cartCount: filteredCart.length,
        cart: filteredCart,
      };
    });
  };

  render() {
    const { children } = this.props;
    const { cartCount, cart } = this.state;
    return (
      <CartContext.Provider
        value={{
          cartCount,
          cart,
          incrementCart: this.incrementCart,
          addItemToCart: this.addItemToCart,
          deleteItemFromCart: this.deleteItemFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export const useCartContext = (): CartContextProps => React.useContext(CartContext);

export { CartProvider };
export default CartContext;
