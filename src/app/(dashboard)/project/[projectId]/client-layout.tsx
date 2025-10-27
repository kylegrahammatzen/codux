"use client";

import { TamboProvider } from "@tambo-ai/react";

type ProjectClientLayoutProps = {
  children: React.ReactNode;
  userToken?: string;
};

export const ProjectClientLayout = (props: ProjectClientLayoutProps) => {
  return <TamboProvider userToken={props.userToken}>{props.children}</TamboProvider>;
};
