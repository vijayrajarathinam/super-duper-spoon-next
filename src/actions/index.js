"use server";

import { revalidatePath } from "next/cache";

import connectToDb from "@/database";
import Profile from "@/database/models/profile";
import Job from "@/database/models/job";

const stripe = require("stripe")("Server_Secret_key");

export async function createProfile(formData, pathToRevalidate) {
  await connectToDb();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function getProfile({ userId }) {
  await connectToDb();
  const result = await Profile.findOne({ userId });

  return JSON.parse(JSON.stringify(result));
}

export async function createJob(formData, pathToRevalidate) {
  console.log("formData", formData);
  await connectToDb();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
}

export async function getAllJobsForRecruiter(id) {
  await connectToDb();
  const results = await Job.find({ recruiterId: id });

  return JSON.parse(JSON.stringify(results));
}

export async function getAllJobsForCandidate(id) {
  await connectToDb();

  return [];
}

export async function createPriceId(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });

  return {
    success: true,
    id: session.id,
  };
}

export default async function createStripePayment(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    // best practice is to create a one time - uuid for both events and trigger it with url
    success_url: "http://localhost:3000/membership" + `?status=success`,
    cancel_url: "http://localhost:3000/membership" + `?status=cancel`,
  });

  return {
    success: true,
    id: session?._id,
  };
}
