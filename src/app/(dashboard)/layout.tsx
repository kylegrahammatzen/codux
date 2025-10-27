import { hasSession } from "@/lib/auth";
import { checkOnboardingCompleted } from "@/actions/onboarding";
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
        <div className="bg-background h-full flex flex-col overflow-hidden">
            {props.children}
        </div>
    );
} 