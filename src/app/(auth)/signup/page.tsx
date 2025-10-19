import Link from "next/link";
import { SignupForm } from "@/components/auth/signup-form";
import { CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>Sign up to create an account</CardDescription>
      </CardHeader>
      <SignupForm />
      <CardFooter className="justify-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/login" className="underline ml-1">
          Log in
        </Link>
      </CardFooter>
    </>
  );
}
