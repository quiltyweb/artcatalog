import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import ShopifyBuy from "shopify-buy";
import Client from "shopify-buy";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
const SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY = "shopify_checkout_id";

const storefrontClient = createStorefrontApiClient({
  storeDomain: "brushellashop.myshopify.com",
  apiVersion: "2024-04",
  publicAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_PASSWORD,
});

const client = Client.buildClient({
  apiVersion: "2024-04",
  domain: "brushellashop.myshopify.com",
  storefrontAccessToken: process.env.GATSBY_SHOPIFY_STOREFRONT_PASSWORD || "",
});

interface StoreContextProps {
  store: {
    client: Client;
    isAdding: boolean;
    isLoading: boolean;
    checkout: {
      id: Client.ID;
      webUrl: ShopifyBuy.Checkout["webUrl"];
      subtotalPrice: ShopifyBuy.Checkout["subtotalPrice"];
      lineItems: Array<ShopifyBuy.CheckoutLineItem>;
      ready: ShopifyBuy.Checkout["ready"];
    };
  };
  setStore: Dispatch<SetStateAction<StoreContextProps["store"]>>;
}

type AddItemsToCartArgs = {
  variantId: ShopifyBuy.ID;
  quantity: number;
};

const initialStoreState = {
  client: client,
  isAdding: false,
  isLoading: false,
  checkout: {
    id: "",
    webUrl: "",
    lineItems: [],
    subtotalPrice: { amount: 0, currencyCode: "AUD" },
    ready: false,
  },
};

const StoreContext = React.createContext<StoreContextProps>({
  store: initialStoreState,
  setStore: () => null,
});

const useAddItemToCart = () => {
  const {
    store: { client, checkout },
    setStore,
  } = useContext(StoreContext);

  const addItemToCart = ({ variantId, quantity }: AddItemsToCartArgs) => {
    setStore((prevState) => {
      return {
        ...prevState,
        isLoading: true,
        isAdding: true,
      };
    });
    client.checkout
      .addLineItems(checkout.id, [
        {
          variantId,
          quantity,
        },
      ])
      .then((updatedCheckout) => {
        setStore((prevState) => {
          return {
            ...prevState,
            isLoading: false,
            isAdding: false,
            checkout: updatedCheckout,
          };
        });
      });
  };
  return addItemToCart;
};

const useRemoveItemFromCart = () => {
  const {
    store: { client, checkout },
    setStore,
  } = useContext(StoreContext);

  const removeItemFromCart = (itemId: string) => {
    setStore((prevState) => {
      return { ...prevState, isLoading: true };
    });
    client.checkout
      .removeLineItems(checkout.id, [itemId])
      .then((updatedCheckout) => {
        setStore((prevState) => {
          return { ...prevState, isLoading: false, checkout: updatedCheckout };
        });
      });
  };
  return removeItemFromCart;
};

const useIsCartLoading = () => {
  const {
    store: { isLoading },
  } = useContext(StoreContext);
  return isLoading;
};

const useIsCheckoutReady = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  return checkout.ready;
};

const useLineItemsCount = () => {
  const {
    store: {
      checkout: { lineItems },
    },
  } = useContext(StoreContext);

  const lineItemsCount = lineItems.reduce((total, currentItem) => {
    return total + currentItem.quantity;
  }, 0);
  return lineItemsCount;
};

const useCheckoutLineItems = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  return checkout.lineItems;
};

const useCartTotals = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);

  return checkout.subtotalPrice;
};

const useCheckout = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext);
  return () => {
    window.open(checkout.webUrl);
  };
};

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] =
    useState<StoreContextProps["store"]>(initialStoreState);

  useEffect(() => {
    const isBrowser = typeof window !== undefined;
    const existingCheckoutId = isBrowser
      ? localStorage.getItem(SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY)
      : null;

    setStore((prevState) => {
      return { ...prevState, isLoading: true };
    });

    if (existingCheckoutId) {
      client.checkout
        .fetch(existingCheckoutId)
        .then((checkout) => {
          if (!checkout.completedAt) {
            if (isBrowser) {
              localStorage.setItem(
                SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY,
                checkout.id
              );
            }

            setStore((prevState) => {
              return { ...prevState, isLoading: false, checkout };
            });

            return;
          }
        })
        .catch((e) => {
          localStorage.remove(SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY);
        });
    } else {
      setStore((prevState) => {
        return { ...prevState, isLoading: true };
      });

      client.checkout.create().then((checkout) => {
        if (isBrowser) {
          localStorage.setItem(SHOPIFY_CHECKOUT_LOCAL_STORAGE_KEY, checkout.id);
        }
        setStore((prevState) => {
          return { ...prevState, isLoading: false, checkout };
        });
      });
    }
  }, []);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export {
  StoreContext,
  StoreContextProvider,
  useLineItemsCount,
  useAddItemToCart,
  useRemoveItemFromCart,
  useCheckoutLineItems,
  useCartTotals,
  useCheckout,
  useIsCartLoading,
  useIsCheckoutReady,
};
