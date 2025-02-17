"use client";

import React from "react";
import PostNewJob from "./PostNewJob";
import RecruiterJobCard from "./RecruiterJobCard";

export default function Listing({ jobsList, user, profileInfo }) {
  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-10">
          <h4 className="text-4xl font-bold tracking-tight text-gray-900 py-0">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h4>
          <div className="flex items-center">
            {profileInfo?.role === "candidate" ? (
              <p>Filter</p>
            ) : (
              <PostNewJob user={user} profileInfo={profileInfo} />
            )}
          </div>
        </div>
        <div className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3 ">
            <div className="lg:col-span-4">
              <div className="container mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                  {jobsList &&
                    jobsList?.length > 0 &&
                    jobsList.map((jobItem) => {
                      return profileInfo.role === "candidate" ? (
                        <p>Candidate</p>
                      ) : (
                        <RecruiterJobCard jobItem={jobItem} />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
