"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useMobile } from "@/hooks/use-mobile";

type AppContextType = {
  isChatPanelVisible: boolean;
  toggleChatPanel: () => void;
  isMobile: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = (props: AppProviderProps) => {
  const [isChatPanelVisible, setIsChatPanelVisible] = useState(true);
  const isMobile = useMobile();

  const toggleChatPanel = () => {
    setIsChatPanelVisible((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{ isChatPanelVisible, toggleChatPanel, isMobile }}
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
