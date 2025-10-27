import { Card } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout(props: AuthLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:2rem_2rem]">
      <Card className="w-full max-w-96">
        {props.children}
      </Card>
    </div>
  );
}
