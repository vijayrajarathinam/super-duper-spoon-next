"use client";
import React, { useState } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { WormIcon, MapPinIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

export const CommonCard = ({ icon, title, description, footerContent }) => {
  return (
    <Card className="flex bg-gray-100 flex-col gap-6 rounded-2xl p-8 transition duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer ">
      <CardHeader className="p-0 ">
        {icon ? icon : null}
        {title ? (
          <CardTitle className="text-xl max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950">
            {title}
          </CardTitle>
        ) : null}
        {description ? (
          <CardDescription className="mt-3 text-gray-600">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardFooter className="p-0">{footerContent}</CardFooter>
    </Card>
  );
};

export default function RecruiterJobCard({ jobItem }) {
  const [showJobDetails, setShowJobDetails] = useState(false);

  return (
    <Drawer open={showJobDetails} onOpenChange={setShowJobDetails}>
      <CommonCard
        icon={<WormIcon />}
        {...jobItem}
        footerContent={
          <DrawerTrigger>
            <div className="flex h-9 items-center justify-center bg-black rounded-md text-white px-6 py-4">
              View Details
            </div>
          </DrawerTrigger>
        }
      />
      <DrawerContent className="p-6 mx-4">
        <DrawerHeader className="px-0">
          <div className="flex justify-between">
            <DrawerTitle className="flex justify-center items-center mt-1 gap-3 text-4xl font-extrabold text-gray-800">
              {jobItem?.title}
              <span className="w-fit bg-black rounded px-2 text-sm font-normal text-white capitalize">
                {jobItem?.type}
              </span>
            </DrawerTitle>
            <div className="flex gap-3 ">
              <Button className="flex h-11 items-center justify-center px-5">
                Apply
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowJobDetails(false)}
                className="flex h-11 items-center justify-center px-5"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DrawerHeader>
        <DrawerDescription className="text-2xl font-medium text-gray-600 ">
          {jobItem?.description}
        </DrawerDescription>
        <span className="text-xl font-normal text-gray-500 mt-1 flex items-center justify-start">
          <MapPinIcon className="h-8 mr-1" /> {jobItem?.location}
        </span>
        <span className="flex justify-center items-center w-fit rounded mt-1 gap-1">
          <p className="text-sm font-normal text-gray-700">skills: </p>
          {jobItem?.skills.split(",").map((skill) => (
            <span className="flex justify-center items-center w-fit bg-black rounded px-2">
              <span className="text-sm font-normal text-white ">{skill}</span>
            </span>
          ))}
        </span>
      </DrawerContent>
    </Drawer>
  );
}
