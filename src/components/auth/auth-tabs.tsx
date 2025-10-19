import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type AuthTabsProps = {
  currentTab: "login" | "signup";
};

export const AuthTabs = (props: AuthTabsProps) => {
  return (
    <Tabs value={props.currentTab} className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="login" className="flex-1" render={<Link href="/login" />}>
          Login
        </TabsTrigger>
        <TabsTrigger value="signup" className="flex-1" render={<Link href="/signup" />}>
          Sign up
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};
