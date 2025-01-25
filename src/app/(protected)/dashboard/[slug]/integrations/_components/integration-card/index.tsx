import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  strategy: "INSTAGRAM" | "CRM";
};

export default function IntegrationCard({
  title,
  description,
  icon,
  strategy,
}: Props) {
  //WIP wire up fetching data and also get the integration from the DB
  return (
    <div className="border-2 border-[#212c58] rounded-2xl gap-x-5 flex items-center p-5">
      {icon}
      <div className="flex flex-col flex-1">
        <h3 className="text-xl">{title}</h3>
        <p className="text-[#9B9CA0] text-base w-full md:w-10/12 xl:w-8/12 2xl:w-6/12">
          {description}
        </p>
      </div>
      <Button 
        className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] text-white rounded-full font-medium hover:opacity-70 transition duration-100"
        // onClick={onInstaOAuth}
        // disabled={integrated?.name === strategy}
        >
            {/* {integrated?.name === strategy ? "Connected" : "Connect"} */}
            Connect

      </Button>
    </div>
  );
}