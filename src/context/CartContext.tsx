import * as React from 'react';

type IncrementCartProps = {
  quantity: number;
};

type CartItemProps = {
  quantity: number;
  id: number;
  title: string;
};

interface CartContextProps {
  cartCount?: number;
  cart: Array<CartItemProps>;
  incrementCart?: (item: IncrementCartProps) => void;
  addItemToCart?: (item: CartItemProps) => void;
}

const defaultContextState = {
  cartCount: 0,
  cart: [],
  incrementCart: () => {},
  addItemToCart: () => {},
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
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export const useCartContext = (): CartContextProps => React.useContext(CartContext);

export { CartProvider };
