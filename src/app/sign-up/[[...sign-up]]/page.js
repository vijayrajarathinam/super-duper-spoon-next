import { SignUp } from "@clerk/nextjs";
// import { currentUser } from "@clerk/nextjs";

export default async function Page() {
  return (
    <div className="clerk-box flex flex-col items-center justify-center">
      <SignUp path="/sign-up" />
    </div>
  );
}
