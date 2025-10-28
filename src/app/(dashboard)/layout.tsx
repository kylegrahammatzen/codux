import { hasSession } from "@/lib/auth";
import { checkOnboardingCompleted } from "@/actions/onboarding";
import { SessionProvider } from "@/providers/session-provider";
import { redirect } from "next/navigation";

type DashboardLayoutProps = {
    children: React.ReactNode;
};

export default async function DashboardLayout(props: DashboardLayoutProps) {
    const session = await hasSession();
    const onboardingCompleted = await checkOnboardingCompleted(session.user.id);

    if (!onboardingCompleted) {
        redirect("/onboarding");
    }

    return (
        <SessionProvider session={session}>
            <div className="bg-background h-full flex flex-col overflow-hidden root">
                {props.children}
            </div>
        </SessionProvider>
    );
} 