import { hasSession } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard-layout";

export default async function Home() {
  const session = await hasSession();

  return (
    <DashboardLayout user={session.user}>
      <h1>Hello @{session.user.username}</h1>
    </DashboardLayout>
  );
}
