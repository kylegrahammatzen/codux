import { hasSession } from "@/lib/auth";
import { HomeProvider } from "@/components/home-context";
import { HomeLayout } from "@/components/home-layout";
import { DashboardHeader } from "@/components/dashboard-header";
import { headers } from "next/headers";

export default async function Home() {
  const session = await hasSession();
  const headersList = await headers();
  const pathname = headersList.get("x-request-path") || "/";

  return (
    <HomeProvider>
      <HomeLayout pathname={pathname} userFirstName={session.user.name?.split(' ')[0]}>
        <DashboardHeader user={session.user} />
      </HomeLayout>
    </HomeProvider>
  );
}
