"use client";

import * as React from "react";
import type { Session } from "@/lib/auth";

const SessionContext = React.createContext<Session | null>(null);

type SessionProviderProps = {
  session: Session;
  children: React.ReactNode;
};

export const SessionProvider = (props: SessionProviderProps) => {
  return (
    <SessionContext.Provider value={props.session}>
      {props.children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within SessionProvider");
  }
  return context;
};
