"use client";

import { usePathname } from "next/navigation";
import { ClientLayout } from "./client-layout";

type ConditionalTamboWrapperProps = {
  children: React.ReactNode;
  userToken?: string;
};

/**
 * Conditionally wraps children with ClientLayout/TamboProvider
 * Project pages have their own ProjectTamboProvider, so we skip wrapping for them
 */
export const ConditionalTamboWrapper = (props: ConditionalTamboWrapperProps) => {
  const pathname = usePathname();

  // Skip ClientLayout for project pages - they have their own ProjectTamboProvider with tools
  if (pathname?.startsWith("/project/")) {
    return <>{props.children}</>;
  }

  // Use ClientLayout for home and projects list pages
  return <ClientLayout userToken={props.userToken}>{props.children}</ClientLayout>;
};
