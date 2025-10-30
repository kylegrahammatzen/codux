import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ClientLayout } from "./client-layout";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default async function HomeLayout(props: HomeLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ClientLayout userToken={session?.session.token}>
      {props.children}
    </ClientLayout>
  );
}
