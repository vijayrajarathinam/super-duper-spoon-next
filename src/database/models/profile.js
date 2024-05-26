const { default: mongoose } = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: String,
  role: String,
  email: String,
  isPremiumUser: Boolean,
  membershipType: String,
  recruiterInfo: {
    name: String,
    companyName: String,
    companyrole: String,
  },
  candidateInfo: {
    name: String,
    companyName: String,
    jobLocation: String,
    currentSalary: String,
    noticePeriod: String,
    skills: String,
    totalYearsOfExperience: String,
    resume: String,
  },
});

const Profile =
  mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);

export default Profile;
