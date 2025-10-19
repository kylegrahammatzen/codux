import { SignupForm } from "@/components/auth/signup-form";
import { AuthTabs } from "@/components/auth/auth-tabs";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <>
      <CardHeader className="space-y-2">
        <AuthTabs />
      </CardHeader>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up to create an account</CardDescription>
      </CardHeader>
      <SignupForm />
    </>
  );
}
