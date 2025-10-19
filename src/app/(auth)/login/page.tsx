import { LoginForm } from "@/components/auth/login-form";
import { AuthTabs } from "@/components/auth/auth-tabs";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <CardHeader className="space-y-2">
        <AuthTabs currentTab="login" />
      </CardHeader>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account to continue</CardDescription>
      </CardHeader>
      <LoginForm />
    </>
  );
}
