"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useMobile } from "@/hooks/use-mobile";

type HomeContextType = {
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
  isMobile: boolean;
};

const HomeContext = createContext<HomeContextType | undefined>(undefined);

type HomeProviderProps = {
  children: ReactNode;
};

export const HomeProvider = (props: HomeProviderProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMobile(1280);

  return (
    <HomeContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        isMobile,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
};

export const useHomeContext = () => {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
