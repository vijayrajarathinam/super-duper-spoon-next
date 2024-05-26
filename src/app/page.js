import { getProfile } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  const profileInfo = await getProfile({ userId: user?.id });

  if (user && !profileInfo?._id) redirect("/onboard");

  return <section>Main content</section>;
}
