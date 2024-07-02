import * as React from "react";

type DeleteItemFromCartProps = {
  id: string;
};

type CartItemProps = {
  id: string;
  product: Queries.CollectionsAndProductsIntoPagesQuery["allShopifyCollection"]["nodes"][0]["products"][0];
  quantity: number;
};

interface CartContextProps {
  cart: Array<CartItemProps>;
  addItemToCart?: (item: CartItemProps) => void;
  deleteItemFromCart?: (item: DeleteItemFromCartProps) => void;
}

const defaultContextState = {
  cart: [],
  addItemToCart: () => null,
  deleteItemFromCart: () => null,
};

const CartContext = React.createContext<CartContextProps>(defaultContextState);

interface Props {
  children: React.ReactNode;
}

interface State {
  cart: Array<CartItemProps>;
}
const useCartContext = (): CartContextProps => React.useContext(CartContext);

class CartProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { cart: [] };
  }

  addItemToCart = ({ id, product, quantity }: CartItemProps) => {
    this.setState((state) => {
      const currentCart = [...state.cart];
      const isItemInCart = currentCart.some((item) => item.id === id);
      if (isItemInCart) {
        const cartWithUpdatedItem = currentCart.map((cartItem) =>
          cartItem.id === id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
        return { cart: cartWithUpdatedItem };
      }
      const newItem = { id, product, quantity };
      const cartWithNewItem = [...state.cart, newItem];
      return {
        cart: cartWithNewItem,
      };
    });
  };

  deleteItemFromCart = ({ id }: DeleteItemFromCartProps): void => {
    if (id) {
      this.setState((state) => {
        const filteredCart = state.cart.filter((item) => id !== item.id);
        return {
          cart: filteredCart,
        };
      });
    }
  };

  render() {
    const { children } = this.props;
    const { cart } = this.state;
    return (
      <CartContext.Provider
        value={{
          cart,
          addItemToCart: this.addItemToCart,
          deleteItemFromCart: this.deleteItemFromCart,
        }}
      >
        {children}
      </CartContext.Provider>
    );
  }
}
export { CartProvider, useCartContext };
export default CartContext;
