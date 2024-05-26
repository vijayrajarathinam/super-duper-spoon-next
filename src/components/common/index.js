import { currentUser } from "@clerk/nextjs/server";
import Header from "./Header";
import { getProfile } from "@/actions";

export default async function CommonLayout({ children }) {
  const user = await currentUser();
  const profileInfo = await getProfile({ userId: user?.id });
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header */}
      <Header
        profileInfo={profileInfo}
        user={JSON.parse(JSON.stringify(user))}
      />
      {/* Header */}

      {/* main content */}
      <main>{children}</main>
      {/* main content */}
    </div>
  );
}
