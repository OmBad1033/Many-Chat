import React from "react";
import { cn } from "@/lib/utils";
import { PLANS } from "@/constants/pages";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  label: string;
  current: "PRO" | "FREE";
  landing?: boolean;
};

export default function PaymentCard({ label, current, landing }: Props) {
  return (
    <div
      className={cn(
        label !== current
          ? "bg-in-active"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        "p-[1px] rounded-xl overflow-hidden"
      )}
    >
      <div
        className={cn(
          landing && "radial--gradient--pink",
          "flex flex-col rounded-xl p-5 bg-background-90 w-full h-full"
        )}
      >
        {landing ? (
          <h2 className="text-2xl">
            {label === "PRO" && "Premium Plan"}
            {label === "FREE" && "Standard"}
          </h2>
        ) : (
          <h2 className="text-2xl">
            {label === current
              ? "Your current Plan"
              : current === "PRO"
              ? "Downgrade"
              : "Upgrade"}
          </h2>
        )}

        <p className="text-text-secondary txt-sm mb-2">
          Focus on the content creation and lus take care of the rest!
        </p>

        {label === "PRO" ? (
          <span className="bg-gradient-to-r text-3xl from-indigo-500 via-purple-500 to-pink-500 font-bold bg-clip-text text-transparent">
            {" "}
            Smart AI
          </span>
        ) : (
          <p className="font-bold mt-2 text-text-secondary"> Standard</p>
        )}

        {label === "PRO" ? (
          <p className="mb-2">
            <b className="text-xl">$99</b>
          </p>
        ) : (
          <p className="text-xl mb-2">Free</p>
        )}

        {PLANS[label === "PRO" ? 1 : 0].features.map((i) => (
          <p className="mt-2 text-muted-foreground flex gap-2">
            <CircleCheck className="text-green-500" />
            {i}
          </p>
        ))}
        {landing ? (
          <Button
            className={cn(
              "rounded-full mt-5",
              label === "PRO"
                ? "bg-gradient-to-r form-indigo-500 via-purple-500 to-pink-500"
                : "bg-background-80 text-white hover:text-background-80"
            )}
          >
            {label === current
              ? "Get Started"
              : current === "PRO"
              ? "Free"
              : "Get Started"}
          </Button>
        ) : (
          <Button
            className="rounded-full mt-5 bg-background-80 text-white hover:text-backgound-80"
            disabled={label === current}
          >
            {label === current
              ? "Active"
              : current === "PRO"
              ? "Downgrade"
              : "Upgrade"}
          </Button>
        )}
      </div>
    </div>
  );
}
