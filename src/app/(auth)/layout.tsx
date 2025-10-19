import { headers } from "next/headers";
import { Card, CardHeader } from "@/components/ui/card";
import { AuthTabs } from "@/components/auth/auth-tabs";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout(props: AuthLayoutProps) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const currentTab = pathname.includes("/login") ? "login" : "signup";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:32px_32px]">
      <Card className="w-full max-w-96 shadow-sm">
        <CardHeader className="space-y-2">
          <AuthTabs currentTab={currentTab} />
        </CardHeader>
        {props.children}
      </Card>
    </div>
  );
}
