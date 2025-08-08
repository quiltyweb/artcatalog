import { graphql, useStaticQuery } from "gatsby";
import React, { createContext, useContext } from "react";
import { useLayoutGlobalData } from "../hooks/useLayoutGlobalData";

const LayoutContext = createContext<Queries.LayoutGlobalDataQuery | null>(null);

type LayoutDataProviderProps = {
  children: React.ReactNode;
};

export const LayoutDataProvider: React.FunctionComponent<
  LayoutDataProviderProps
> = ({ children }) => {
  const data = useLayoutGlobalData();

  return (
    <LayoutContext.Provider value={data}>{children}</LayoutContext.Provider>
  );
};

export const useLayoutData = () => useContext(LayoutContext);
