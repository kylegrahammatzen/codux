import { hasSession } from "@/lib/auth";
import { HomeProvider } from "@/components/home-context";
import { HomeLayout } from "@/components/home-layout";
import { DashboardHeader } from "@/components/dashboard-header";
import { headers } from "next/headers";

export default async function Home() {
  const session = await hasSession();
  const headersList = await headers();
  const pathname = headersList.get("x-request-path") || "/";

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const userFirstName = session.user.name?.split(' ')[0];
  const greeting = userFirstName ? `${getGreeting()}, ${userFirstName}!` : `${getGreeting()}!`;

  return (
    <HomeProvider>
      <HomeLayout
        pathname={pathname}
        greeting={
          <>
            <h1 className="text-2xl font-semibold text-foreground">{greeting}</h1>
            <p className="text-xl font-semibold text-muted-foreground/70">Ready to assign your task?</p>
          </>
        }
      >
        <DashboardHeader user={session.user} />
      </HomeLayout>
    </HomeProvider>
  );
}
