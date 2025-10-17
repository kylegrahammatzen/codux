"use client";

import { createContext, useContext, ReactNode } from "react";
import { useMobile } from "@/hooks/use-mobile";

type AppContextType = {
  isMobile: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = (props: AppProviderProps) => {
  const isMobile = useMobile(1280); // Use xl breakpoint

  return (
    <AppContext.Provider
      value={{ isMobile }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
