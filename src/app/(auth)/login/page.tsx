import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <>
      <CardHeader>
        <CardTitle>Log in</CardTitle>
        <CardDescription>Log in to your account to continue</CardDescription>
      </CardHeader>
      <LoginForm />
      <CardFooter className="justify-center text-sm text-muted-foreground">
        Don't have an account yet?{" "}
        <Link href="/signup" className="underline">
          Sign up
        </Link>
      </CardFooter>
    </>
  );
}
