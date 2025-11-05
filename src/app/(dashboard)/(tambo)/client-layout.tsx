"use client";

import { TamboProvider } from "@tambo-ai/react";
import { env } from "@/env";
import { FileUploadProvider } from "@/contexts/file-upload-context";
import { useContextKey } from "@/hooks/use-context-key";

type ClientLayoutProps = {
  children: React.ReactNode;
  userToken?: string;
};

export const ClientLayout = (props: ClientLayoutProps) => {
  const contextKey = useContextKey();

  return (
    <FileUploadProvider>
      <TamboProvider
        apiKey={env.NEXT_PUBLIC_TAMBO_API_KEY}
        userToken={props.userToken}
        contextKey={contextKey || undefined}
      >
        {props.children}
      </TamboProvider>
    </FileUploadProvider>
  );
};
