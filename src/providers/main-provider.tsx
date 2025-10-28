"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useMobile } from "@/hooks/use-mobile";

type MainContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  isMobile: boolean;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

type MainProviderProps = {
  children: ReactNode;
};

export const MainProvider = (props: MainProviderProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMobile(1280);

  return (
    <MainContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        isMobile,
      }}
    >
      {props.children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => {
  const context = useContext(MainContext);
  if (context === undefined) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
