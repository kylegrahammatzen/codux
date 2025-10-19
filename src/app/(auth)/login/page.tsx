import { LoginForm } from "@/components/auth/login-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to your account to continue</CardDescription>
      </CardHeader>
      <LoginForm />
    </>
  );
}
