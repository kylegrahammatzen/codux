import { Card } from "@/components/ui/card";

type AuthLayoutProps = {
  children: React.ReactNode;
};

export default function AuthLayout(props: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:32px_32px]">
      <Card className="w-full max-w-96 shadow-sm">
        {props.children}
      </Card>
    </div>
  );
}
