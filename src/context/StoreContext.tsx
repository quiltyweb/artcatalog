import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Client from "shopify-buy";

// create the client
const client = Client.buildClient({
  apiVersion: "2023-10",
  domain: `${process.env.SHOPIFY_STORE_NAME}.myshopify.com`,
  storefrontAccessToken: `${process.env.SHOPIFY_STOREFRONT_PASSWORD}`,
});

interface StoreContextProps {
  store: {
    client: Client;
    isAdding: boolean;
    checkout: { lineItems: Array<Client.CheckoutLineItem> };
  };
  setStore: Dispatch<SetStateAction<StoreContextProps["store"]>>;
}

const initialStoreState = {
  client: client,
  isAdding: false,
  checkout: { lineItems: [] },
};

const StoreContext = React.createContext<StoreContextProps>({
  store: initialStoreState,
  setStore: () => null,
});

const StoreContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [store, setStore] =
    useState<StoreContextProps["store"]>(initialStoreState);

  useEffect(() => {
    client.checkout.create().then((checkout) => {
      setStore((prevState) => {
        return { ...prevState, checkout };
      });
    });
  }, []);

  return (
    <StoreContext.Provider value={{ store, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContextProvider };
