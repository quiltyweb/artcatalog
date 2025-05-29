import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import gql from "graphql-tag";
import { print } from "graphql";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import type {
  Cart,
  Maybe,
  Mutation,
  QueryRoot,
} from "@shopify/hydrogen-react/storefront-api-types";
import { formatPrice } from "../utils/formatPrice";
const SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY = "shopify_checkout_id";

const clientV2 = createStorefrontApiClient({
  storeDomain: "brushellashop.myshopify.com",
  apiVersion: "2025-01",
  publicAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_PASSWORD,
});

// ***********************
// TYPES:
// ***********************
interface StoreStateType {
  client: typeof clientV2;
  isLoading: boolean;
  cart?: Maybe<Cart>;
}

interface StoreContextType {
  store: {
    client: typeof clientV2;
    isLoading: boolean;
    cart?: Maybe<Cart>;
  };
  setStore: Dispatch<SetStateAction<StoreStateType>>;
}

type AddItemsToCartArgs = {
  variantId: Cart["lines"]["nodes"]["0"]["merchandise"]["id"];
  quantity: Cart["lines"]["nodes"]["0"]["quantity"];
};

// ***********************
// QUERIES AND MUTATIONS:
// ***********************

export const cartFieldsFragment = gql`
  fragment CartFields on Cart {
    id
    createdAt
    updatedAt
    checkoutUrl
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      subtotalAmountEstimated
      totalAmount {
        amount
        currencyCode
      }
      totalAmountEstimated
    }
    totalQuantity
    lines(first: 10) {
      nodes {
        id
        quantity
        merchandise {
          __typename
          ... on ProductVariant {
            id
            title
            image {
              id
              url
              altText
              height
              width
            }
            price {
              amount
              currencyCode
            }
            unitPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

const cartQuery = gql`
  ${cartFieldsFragment}
  query Cart($id: ID!) {
    cart(id: $id) {
      ...CartFields
    }
  }
`;

const createCartMutation = gql`
  ${cartFieldsFragment}
  mutation CreateCart($cartInput: CartInput) {
    cartCreate(input: $cartInput) {
      cart {
        ...CartFields
      }
      userErrors {
        message
        code
        field
      }
    }
  }
`;

const cartLinesAddMutation = gql`
  ${cartFieldsFragment}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const cartLinesRemoveMutation = gql`
  ${cartFieldsFragment}
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;
// ********************************

const storeDefaultValues = {
  client: clientV2,
  isLoading: false,
};

const StoreContext = React.createContext<StoreContextType>({
  store: storeDefaultValues,
  setStore: () => null,
});

const StoreApp = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<StoreStateType>(storeDefaultValues);

  const existingCheckoutId = localStorage.getItem(
    SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY
  );

  useEffect(() => {
    if (existingCheckoutId) {
      // retrieve existing cart
      setStore((prevState) => {
        return { ...prevState, isLoading: true };
      });

      store.client
        .request<Cart>(print(cartQuery), {
          variables: {
            id: existingCheckoutId,
          },
        })
        .then(({ data }) => {
          if (data && data.id) {
            localStorage.setItem(SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY, data.id);
            setStore((prevState) => {
              return {
                ...prevState,
                isLoading: false,
                cart: { ...data },
              };
            });
          }
        });
    }

    if (!existingCheckoutId) {
      setStore((prevState) => {
        return { ...prevState, isLoading: true };
      });
      store.client
        .request<Mutation>(print(createCartMutation), {
          variables: {
            input: {},
          },
        })
        .then(({ data }) => {
          if (data && data.cartCreate && data.cartCreate.cart) {
            localStorage.setItem(
              SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY,
              data.cartCreate.cart.id
            );
            setStore((prevState) => {
              return {
                ...prevState,
                isLoading: false,
                cart: data.cartCreate?.cart,
              };
            });
          }
        });
    }
  }, []);

  if (store.isLoading) {
    return <>loading ...loading...</>;
  }

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

function useAddItemToCart() {
  const {
    store: { client, cart },
    setStore,
  } = useContext(StoreContext);

  const addItemToCart = ({ variantId, quantity }: AddItemsToCartArgs) => {
    setStore((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });

    //add the new item.
    client
      .request<Mutation>(print(cartLinesAddMutation), {
        variables: {
          cartId: cart?.id,
          lines: [
            {
              merchandiseId: variantId,
              quantity: quantity,
            },
          ],
        },
      })
      .then(({ data }) => {
        setStore((prevState) => ({
          ...prevState,
          isLoading: false,
          cart: data?.cartLinesAdd?.cart,
        }));
      });
  };
  return addItemToCart;
}

const useCheckoutLineItems = () => {
  const {
    store: { cart },
  } = useContext(StoreContext);
  if (!cart) {
    return [];
  }
  return cart.lines.nodes;
};

const useCartTotals = () => {
  const {
    store: { cart },
  } = useContext(StoreContext);
  if (!cart?.cost) {
    return;
  }
  const currencyCode = cart.cost.subtotalAmount?.currencyCode ?? "xxx";
  const cartSubtotalPriceWithFormat = formatPrice({
    currency: cart.cost.subtotalAmount.currencyCode,
    value: parseFloat(cart.cost.subtotalAmount.amount),
  });

  return { currencyCode, cartSubtotalPriceWithFormat };
};

const useCheckout = () => {
  const {
    store: { cart },
  } = useContext(StoreContext);
  if (!cart) {
    return;
  }
  return () => {
    window.open(cart?.checkoutUrl);
  };
};

const useRemoveItemFromCart = () => {
  const {
    store: { client, cart },
    setStore,
  } = useContext(StoreContext);

  const removeItemFromCart = (itemId: string) => {
    setStore((prevState) => {
      return { ...prevState, isLoading: true };
    });

    client
      .request<Mutation>(print(cartLinesRemoveMutation), {
        variables: {
          cartId: cart?.id,
          lines: [
            {
              itemId,
            },
          ],
        },
      })
      .then(({ data }) => {
        setStore((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            cart: data?.cartLinesRemove?.cart,
          };
        });
      });
  };
  return removeItemFromCart;
};

const useLineItemsCount = () => {
  const {
    store: { cart },
  } = useContext(StoreContext);
  if (!cart) {
    return 0;
  }
  const lineItemsCount = cart.lines.nodes.reduce((prevValue, currentItem) => {
    return prevValue + currentItem.quantity;
  }, 0);

  return lineItemsCount;
};

//  TODO: add operation: cartLinesUpdate
// function useCartLinesUpdate() {
//   const cartLinesUpdate = () => null;
//   return updateItemToCart;
// }

export {
  StoreContext,
  StoreApp,
  useLineItemsCount,
  useAddItemToCart,
  useRemoveItemFromCart,
  useCheckoutLineItems,
  useCartTotals,
  useCheckout,
};
