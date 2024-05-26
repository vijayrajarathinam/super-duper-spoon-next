import { currentUser } from "@clerk/nextjs/server";
import OnboardComponent from "@/components/onboard";
import { getProfile } from "@/actions";
import { redirect } from "next/navigation";

export default async function OnboardPage({ props }) {
  const user = await currentUser();
  const profileInfo = await getProfile({ userId: user?.id });

  if (profileInfo?._id) {
    if (profileInfo?.role === "recruiter" && !profileInfo?.isPremiumUser)
      redirect("/membership");
    else redirect("/");
  }

  return <OnboardComponent />;
}
