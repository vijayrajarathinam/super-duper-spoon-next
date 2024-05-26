import {
  getAllJobsForCandidate,
  getAllJobsForRecruiter,
  getProfile,
} from "@/actions";
import Listing from "@/components/jobs/Listing";
import { currentUser } from "@clerk/nextjs/server";

export default async function JobPage(props) {
  const user = await currentUser();
  const profileInfo = await getProfile({ userId: user?.id });
  const jobsList = await getAllJobsForRecruiter(user?.id);

  // profileInfo === "recruiter"
  // : await getAllJobsForCandidate(user?.id);
  return (
    <Listing
      jobsList={jobsList}
      profileInfo={profileInfo}
      user={JSON.parse(JSON.stringify(user))}
    />
  );
}
