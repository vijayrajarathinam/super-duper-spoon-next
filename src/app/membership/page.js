import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { getProfile } from "@/actions";
import Membership from "@/components/membership/Membership";

export default async function membership() {
  const user = await currentUser();
  const profileInfo = await getProfile({ userId: user?.id });
  if (!profileInfo) redirect("/dashboard");

  return <Membership />;
}
