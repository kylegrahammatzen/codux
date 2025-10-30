"use client";

import { TamboProvider } from "@tambo-ai/react";
import { env } from "@/env";
import { FileUploadProvider } from "@/contexts/file-upload-context";

type ClientLayoutProps = {
  children: React.ReactNode;
  userToken?: string;
};

export const ClientLayout = (props: ClientLayoutProps) => {
  return (
    <FileUploadProvider>
      <TamboProvider apiKey={env.NEXT_PUBLIC_TAMBO_API_KEY} userToken={props.userToken}>
        {props.children}
      </TamboProvider>
    </FileUploadProvider>
  );
};
