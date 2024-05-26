import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <div className="clerk-box flex flex-col items-center justify-center">
      <SignIn path="/sign-in" />
    </div>
  );
}
