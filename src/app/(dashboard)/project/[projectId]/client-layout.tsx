"use client";

import { TamboProvider } from "@tambo-ai/react";
import { env } from "@/env";

type ProjectClientLayoutProps = {
  children: React.ReactNode;
  userToken?: string;
};

export const ProjectClientLayout = (props: ProjectClientLayoutProps) => {
  return (
    <TamboProvider apiKey={env.NEXT_PUBLIC_TAMBO_API_KEY} userToken={props.userToken}>
      {props.children}
    </TamboProvider>
  );
};
