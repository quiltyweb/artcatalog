import React, { createContext, useContext, useState } from "react";

const MARKET_STORAGE_KEY = "brushella_country_code";
const DEFAULT_COUNTRY_CODE = "AU";

type MarketContextType = {
  countryCode: string;
  setCountryCode: (code: string) => void;
};

const MarketContext = createContext<MarketContextType>({
  countryCode: DEFAULT_COUNTRY_CODE,
  setCountryCode: () => null,
});

const MarketProvider = ({ children }: { children: React.ReactNode }) => {
  const [countryCode, setCountryCodeState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_COUNTRY_CODE;
    return localStorage.getItem(MARKET_STORAGE_KEY) ?? DEFAULT_COUNTRY_CODE;
  });

  const setCountryCode = (code: string) => {
    localStorage.setItem(MARKET_STORAGE_KEY, code);
    setCountryCodeState(code);
  };

  return (
    <MarketContext.Provider value={{ countryCode, setCountryCode }}>
      {children}
    </MarketContext.Provider>
  );
};

const useMarket = () => useContext(MarketContext);

export { MarketContext, MarketProvider, useMarket };
