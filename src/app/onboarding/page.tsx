import { hasSession } from "@/lib/auth";

export default async function OnboardingPage() {
  const session = await hasSession();

  return (
    <div>
      <h1>Welcome, {session.user.name}!</h1>
      <p>Let&apos;s set up your username to get started.</p>
    </div>
  );
}
