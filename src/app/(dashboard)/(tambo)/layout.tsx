import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ConditionalTamboWrapper } from "./conditional-tambo-wrapper";

type HomeLayoutProps = {
  children: React.ReactNode;
};

export default async function HomeLayout(props: HomeLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ConditionalTamboWrapper userToken={session?.session.token}>
      {props.children}
    </ConditionalTamboWrapper>
  );
}
