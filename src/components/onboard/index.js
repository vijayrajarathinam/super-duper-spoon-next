"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CommonForm from "../commonForm";
import { useUser } from "@clerk/nextjs";
import { createProfile } from "@/actions";

const recruiterFormControl = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Company Name",
    name: "companyName",
    placeholder: "Enter your company ",
    componentType: "input",
  },
  {
    label: "Company Role",
    name: "companyRole",
    placeholder: "Enter your role",
    componentType: "input",
  },
];

const candidateFormControl = [
  {
    label: "Name",
    name: "name",
    placeholder: "Enter your name",
    componentType: "input",
  },
  {
    label: "Current Company Name",
    name: "companyName",
    placeholder: "Enter your current company ",
    componentType: "input",
  },
  {
    label: "Current Job Location",
    name: "jobLocation",
    placeholder: "Enter your current job location",
    componentType: "input",
  },

  {
    label: "Current Salary",
    name: "currentSalary",
    placeholder: "Enter your current Salary",
    componentType: "input",
  },

  {
    label: "Notice Period",
    name: "noticePeriod",
    placeholder: "Enter your notice period",
    componentType: "input",
  },

  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
  },

  {
    label: "Total Experience",
    name: "totalYearsOfExperience",
    placeholder: "Enter your total experience",
    componentType: "input",
  },
];

export default function OnboardComponent() {
  const currentUser = useUser();
  const { user } = currentUser;
  const [currentTab, setCurrentTab] = useState("candidate");
  const handleTabChange = (value) => setCurrentTab(value);
  const [recruiterFormData, setRecruiterFormData] = useState({
    name: "",
    companyName: "",
    companyRole: "",
  });
  const [candidateFormData, setCandidateFormData] = useState({
    resume: "",
    name: "",
    name: "",
    companyName: "",
    jobLocation: "",
    currentSalary: "",
    noticePeriod: "",
    skills: "",
    totalYearsOfExperience: "",
    isPremiumUser: false,
  });

  function handleRecruiterFormValidation() {
    return (
      recruiterFormData &&
      recruiterFormData.name.trim() !== "" &&
      recruiterFormData.companyName.trim() !== "" &&
      recruiterFormData.companyRole.trim() !== ""
    );
  }

  async function createProfileAction() {
    const data = {
      recruiterInfo: recruiterFormData,
      role: "recruiter",
      isPremiumUser: false,
      userId: user?.id,
      email: user?.primaryEmailAddress?.emailAddress,
    };

    await createProfile(data, "/onboard");
  }

  return (
    <div className="bg-white">
      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <div className="w-full">
          <div className="flex items-baseline justify-between border-b pb-6 pt-24 ">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 ">
              Welcome to onboarding
            </h1>
            <TabsList>
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>
          </div>
        </div>
        <TabsContent value="candidate">
          <CommonForm
            controls={candidateFormControl}
            formData={candidateFormData}
            setFormData={setCandidateFormData}
            buttonText="Create as Candidate"
          />
        </TabsContent>
        <TabsContent value="recruiter">
          <CommonForm
            action={createProfileAction}
            controls={recruiterFormControl}
            formData={recruiterFormData}
            setFormData={setRecruiterFormData}
            buttonText="Create as Recruiter"
            isButtonDisabled={!handleRecruiterFormValidation()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
