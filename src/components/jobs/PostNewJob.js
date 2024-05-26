"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CommonForm from "../commonForm";
import { createJob } from "@/actions";

const postNewJobFormControls = [
  {
    label: "Comapny Name",
    name: "companyName",
    placeholder: "Enter your company name",
    componentType: "input",
    disabled: true,
  },
  {
    label: "Job Title",
    name: "title",
    placeholder: "Enter your Job Title",
    componentType: "input",
    disabled: false,
  },

  {
    label: "Job Description",
    name: "description",
    placeholder: "Enter your Job Description",
    componentType: "input",
    disabled: false,
  },
  {
    label: "Job Type",
    name: "type",
    placeholder: "Enter your Job type",
    componentType: "input",
    disabled: false,
  },
  {
    label: "Location",
    name: "location",
    placeholder: "Enter your Job location",
    componentType: "input",
    disabled: false,
  },
  {
    label: "Experience",
    name: "experience",
    placeholder: "Enter your Job experience",
    componentType: "input",
    disabled: false,
  },
  {
    label: "Skills",
    name: "skills",
    placeholder: "Enter your skills",
    componentType: "input",
    disabled: false,
  },
];

const initialJobInfo = {
  companyName: "",
  title: "",
  type: "",
  location: "",
  experience: "",
  description: "",
  skills: "",
};

export default function PostNewJob({ user, profileInfo }) {
  const [newJobFormData, setNewJobFormData] = useState({
    ...initialJobInfo,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });
  const [showJobDialog, setShowJobDialog] = useState(false);

  async function postNewJobAction() {
    await createJob(
      {
        ...newJobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );
  }

  const handlePostNewBtnValid = () => {
    return Object.keys(newJobFormData).every((control) => {
      newJobFormData[control].trim() !== "";
    });
  };
  return (
    <div>
      <Button
        onClick={() => setShowJobDialog(true)}
        className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
      >
        Post a job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false);
          setNewJobFormData({
            ...initialJobInfo,
            companyName: profileInfo?.recruiterInfo?.companyName,
          });
        }}
      >
        <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post new job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                action={postNewJobAction}
                setFormData={setNewJobFormData}
                controls={postNewJobFormControls}
                isButtonDisabled={handlePostNewBtnValid}
                formData={newJobFormData}
                buttonText="Add"
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
