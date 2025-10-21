import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default async function AuthLayout(props: AuthLayoutProps) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) redirect("/");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:32px_32px]">
      <Card className="w-full max-w-96 shadow-sm">
        {props.children}
      </Card>
    </div>
  );
}
