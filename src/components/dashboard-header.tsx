"use client";

import { AppHeader } from "@/components/app-header";
import { useRouter } from "next/navigation";

type DashboardHeaderProps = {
  children?: React.ReactNode;
};

export const DashboardHeader = (props: DashboardHeaderProps) => {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <AppHeader>
      <span className="text-sm font-medium cursor-pointer" onClick={handleLogoClick}>Logo</span>
      {props.children}
    </AppHeader>
  );
};
