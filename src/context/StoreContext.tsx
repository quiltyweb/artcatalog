import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import ShopifyBuy from "shopify-buy";
import Client from "shopify-buy";
const SHOPIFY_CHECKOUT_STORAGE_KEY = "shopify_checkout_id";

const client = Client.buildClient({
  apiVersion: "2023-10",
  domain: `${process.env.GATSBY_SHOPIFY_STORE_URL}`,
  storefrontAccessToken: `${process.env.GATSBY_SHOPIFY_STOREFRONT_PASSWORD}`,
});

interface StoreContextProps {
  store: {
    client: Client;
    isAdding: boolean;
    checkout: { id: Client.ID; lineItems: Array<Client.CheckoutLineItem> };
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
  checkout: { id: "", lineItems: [] },
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
      return { ...prevState, isAdding: true };
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
          return { ...prevState, checkout: updatedCheckout, isAdding: false };
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
    client.checkout
      .removeLineItems(checkout.id, [itemId])
      .then((updatedCheckout) => {
        setStore((prevState) => {
          return { ...prevState, checkout: updatedCheckout };
        });
      });
  };
  return removeItemFromCart;
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

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] =
    useState<StoreContextProps["store"]>(initialStoreState);

  useEffect(() => {
    const isBrowser = typeof window !== undefined;
    const existingCheckoutId = isBrowser
      ? localStorage.getItem(SHOPIFY_CHECKOUT_STORAGE_KEY)
      : null;

    if (existingCheckoutId) {
      client.checkout
        .fetch(existingCheckoutId)
        .then((checkout) => {
          if (!checkout.completedAt) {
            if (isBrowser) {
              localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id);
            }
            setStore((prevState) => {
              return { ...prevState, checkout };
            });

            return;
          }
        })
        .catch((e) => {
          localStorage.remove(SHOPIFY_CHECKOUT_STORAGE_KEY);
        });
    } else {
      client.checkout.create().then((checkout) => {
        if (isBrowser) {
          localStorage.setItem(SHOPIFY_CHECKOUT_STORAGE_KEY, checkout.id);
        }
        setStore((prevState) => {
          return { ...prevState, checkout };
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
};
