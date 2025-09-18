import React, { createContext, useContext } from "react";
import { useStaticQueryLayoutData } from "../hooks/useStaticQueryLayoutData";

type LayoutDataProviderProps = {
  children: React.ReactNode;
};

const LayoutContext = createContext<Queries.LayoutGlobalDataQuery | null>(null);

export const LayoutDataProvider: React.FunctionComponent<
  LayoutDataProviderProps
> = ({ children }) => {
  // ############################################
  // TODO: find another way to mock context for E2E tests
  // Note: For E2E testing purposes. Do not remove.
  if (typeof window !== "undefined" && (window as any).__mockLayoutGlobalData) {
    return (
      <LayoutContext.Provider value={(window as any).__mockLayoutGlobalData}>
        {children}
      </LayoutContext.Provider>
    );
  }
  // ############################################
  const data = useStaticQueryLayoutData();

  return (
    <LayoutContext.Provider value={data}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutConsumer = () => useContext(LayoutContext);
