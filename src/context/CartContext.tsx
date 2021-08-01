// import { Component, createContext, useContext } from 'react';
import * as React from 'react';

type IncrementCartProps = {
  quantity: number;
};

interface CartContextProps {
  cartCount?: number;
  incrementCart?: (item: IncrementCartProps) => void;
}

const defaultState = {
  cartCount: 0,
  incrementCart: () => {},
};

const CartContext = React.createContext<CartContextProps>(defaultState);

interface Props {
  children: React.ReactNode;
}

interface State {
  cartCount: number;
}

class CartProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { cartCount: 0 };
  }

  incrementCart = ({ quantity }: { quantity: number }) => {
    const { cartCount } = this.state;
    this.setState({ cartCount: cartCount + quantity });
  };

  render() {
    const { children } = this.props;
    const { cartCount } = this.state;
    return (
      <CartContext.Provider
        value={{
          cartCount,
          incrementCart: this.incrementCart,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}

export const useCartContext = (): CartContextProps => React.useContext(CartContext);

export { CartProvider };
