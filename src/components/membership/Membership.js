"use client";
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { UserIcon, Users2Icon, Building2Icon } from "lucide-react";
import { Button } from "../ui/button";
import createStripePayment, { createPriceId } from "@/actions";
import { loadStripe } from "@stripe/stripe-js";

export const membershipPlans = [
  { heading: "Tier 1", price: 199, type: "basic", Icon: UserIcon },
  { heading: "Tier 2", price: 599, type: "teams", Icon: Users2Icon },
  { heading: "Tier 3", price: 999, type: "enterprise", Icon: Building2Icon },
];
const stripePromise = loadStripe("Public_secret_key");

export default function Membership() {
  async function handlePayment(currentPlan) {
    const stripe = await stripePromise;
    const extractPriceId = await createPriceId({
      amount: Number(currentPlan?.price),
    });
    if (extractPriceId) {
      sessionStorage.setItem("currentPlan", JSON.stringify(currentPlan));
      const result = await createStripePayment({
        lineItems: [{ price: extractPriceId?.id, quantity: 1 }],
      });

      await stripe.redirectToCheckout({ sessionId: result?.id });
    }
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24 ">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          Choose your best plan
        </h1>
      </div>
      <div className="py-20 pb-24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {membershipPlans.map((plan) => {
              return (
                <Card className="flex bg-gray-100 flex-col gap-6 rounded-2xl p-8 transition duration-300 hover:bg-white hover:shadow-2xl hover:shadow-gray-600/10 cursor-pointer ">
                  <CardHeader className="p-0 ">
                    <div className="flex justify-between">
                      <div className="font-bold text-2xl">{plan.heading}</div>
                      <div className="pr-3">
                        <plan.Icon />
                      </div>
                    </div>
                    <CardTitle className="text-lg text-ellipsis overflow-hidden whitespace-nowrap font-semibold text-gray-950 flex items-center justify-between">
                      <span>$ {plan.price} /yr</span>
                      <span className="text-gray-600">{plan.type}</span>
                    </CardTitle>
                    {/* <CardDescription >
                    </CardDescription> */}
                  </CardHeader>
                  <CardFooter className="p-0 w-full items-end justify-center">
                    <Button
                      onClick={() => handlePayment(plan)}
                      // onClick={() => setShowJobDetails(false)}

                      size="sm"
                    >
                      Get {plan.heading}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
