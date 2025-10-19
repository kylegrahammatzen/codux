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
        <div className="flex items-center gap-1">
          <span>Already have an account?</span>
          <Link href="/login" className="underline">
            Log in
          </Link>
        </div>
      </CardFooter>
    </>
  );
}
