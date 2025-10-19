import { SignupForm } from "@/components/auth/signup-form";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up to create an account</CardDescription>
      </CardHeader>
      <SignupForm />
    </>
  );
}
