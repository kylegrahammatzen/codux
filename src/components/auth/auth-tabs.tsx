"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AuthTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab = pathname === "/login" ? "login" : "signup";

  const handleTabChange = (value: string) => {
    router.push(`/${value}`);
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="login" className="flex-1">Login</TabsTrigger>
        <TabsTrigger value="signup" className="flex-1">Sign up</TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
