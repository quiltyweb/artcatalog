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
  CartLineUpdateInput,
  CartWarning,
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
  hasResponseError: boolean;
  cart?: Maybe<Cart>;
}

interface StoreContextType {
  store: {
    client: typeof clientV2;
    isLoading: boolean;
    hasResponseError: boolean;
    cart?: Maybe<Cart>;
  };
  setStore: Dispatch<SetStateAction<StoreStateType>>;
}

type AddItemsToCartArgs = {
  variantId: Cart["lines"]["nodes"]["0"]["merchandise"]["id"];
  quantity: Cart["lines"]["nodes"]["0"]["quantity"];
};

type UpdateItemsToCartArgs = {
  lines: Array<CartLineUpdateInput>;
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
            product {
              availableForSale
              title
            }
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
      warnings {
        code
        target
        message
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
        message
        code
        field
      }
      warnings {
        code
        target
        message
      }
    }
  }
`;

const cartLinesUpdateMutation = gql`
  ${cartFieldsFragment}
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        message
        code
        field
      }
      warnings {
        code
        target
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
        message
        code
        field
      }
      warnings {
        code
        target
        message
      }
    }
  }
`;
// ********************************

const storeInitialValues = {
  client: clientV2,
  isLoading: false,
  hasResponseError: false,
};

const StoreContext = React.createContext<StoreContextType>({
  store: storeInitialValues,
  setStore: () => null,
});

const StoreApp = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] = useState<StoreStateType>(storeInitialValues);

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
        .request<QueryRoot>(print(cartQuery), {
          variables: {
            id: existingCheckoutId,
          },
        })
        .then(({ data, errors }) => {
          if (errors) {
            setStore((prevState) => {
              return { ...prevState, isLoading: false, hasResponseError: true };
            });
            return;
          }

          if (data && data.cart) {
            localStorage.setItem(
              SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY,
              data.cart.id
            );
            setStore((prevState) => {
              return {
                ...prevState,
                isLoading: false,
                cart: data.cart,
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
        .then(({ data, errors }) => {
          if (errors) {
            setStore((prevState) => {
              return { ...prevState, isLoading: false, hasResponseError: true };
            });
            return;
          }
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
  const [addItemToCartLoading, setAddItemToCartLoading] = useState(false);
  const [addItemToCartWarnings, setAddItemToCartWarnings] = useState<
    Array<CartWarning>
  >([]);

  const addItemToCart = ({ variantId, quantity }: AddItemsToCartArgs) => {
    setStore((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });
    setAddItemToCartLoading(true);

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
      .then(({ data, errors }) => {
        if (errors) {
          setStore((prevState) => {
            return { ...prevState, isLoading: false, hasResponseError: true };
          });
          return;
        }
        setStore((prevState) => ({
          ...prevState,
          isLoading: false,
          cart: data?.cartLinesAdd?.cart,
        }));
        setAddItemToCartLoading(false);
        setAddItemToCartWarnings(data?.cartLinesAdd?.warnings ?? []);
      });
  };

  return {
    addItemToCart,
    addItemToCartLoading,
    addItemToCartWarnings,
    setAddItemToCartWarnings,
  };
}

function useCartLinesUpdate() {
  const {
    store: { client, cart },
    setStore,
  } = useContext(StoreContext);
  const [updateItemsToCartLoading, setUpdateItemsToCartLoading] =
    useState(false);
  const [updateItemsToCartWarnings, setUpdateItemsToCartWarnings] = useState<
    Array<CartWarning>
  >([]);

  const updateItemsToCart = ({ lines }: UpdateItemsToCartArgs) => {
    setStore((prevState) => {
      return {
        ...prevState,
        isLoading: true,
      };
    });
    setUpdateItemsToCartLoading(true);
    client
      .request<Mutation>(print(cartLinesUpdateMutation), {
        variables: {
          cartId: cart?.id,
          lines: lines,
        },
      })
      .then(({ data, errors }) => {
        if (errors) {
          setStore((prevState) => {
            return { ...prevState, isLoading: false, hasResponseError: true };
          });
          return;
        }
        setStore((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            cart: data?.cartLinesUpdate?.cart,
          };
        });

        setUpdateItemsToCartLoading(false);
        setUpdateItemsToCartWarnings(data?.cartLinesUpdate?.warnings ?? []);
      });
  };

  return {
    updateItemsToCart,
    updateItemsToCartLoading,
    updateItemsToCartWarnings,
    setUpdateItemsToCartWarnings,
  };
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

const useCheckoutUrl = () => {
  const {
    store: { cart },
  } = useContext(StoreContext);
  if (!cart) {
    return;
  }
  const openCheckoutUrl = () => {
    window.open(cart.checkoutUrl);
  };
  return openCheckoutUrl;
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
          lineIds: [itemId],
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
  return cart.totalQuantity;
};

const useIsCartLoading = () => {
  const {
    store: { isLoading },
  } = useContext(StoreContext);

  return isLoading;
};

const useHasResponseError = () => {
  const {
    store: { hasResponseError },
  } = useContext(StoreContext);
  return hasResponseError;
};

export {
  StoreContext,
  StoreApp,
  useLineItemsCount,
  useAddItemToCart,
  useCartLinesUpdate,
  useRemoveItemFromCart,
  useCheckoutLineItems,
  useCartTotals,
  useCheckoutUrl,
  useIsCartLoading,
  useHasResponseError,
};
