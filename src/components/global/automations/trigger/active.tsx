import { InstagramBlue, PlaneBlue } from "@/icons";
import React from "react";

type Props = {
  type: string;
  keywords: {
    id: string;
    word: string;
    automationId: string | null;
  }[];
};

function ActiveTrigger({ keywords, type }: Props) {
  return (
    <div className="bg-background-80 p-3 rounded-xl w-full">
      <div className="flex gap-x-2 items-center">
        {type === "COMMENT" ? <InstagramBlue /> : <PlaneBlue />}
        <p className="text-lg">
          {type === "COMMENT"
            ? "User comments on my post"
            : "User sends me a Direct Message"}
        </p>
      </div>
      <p className="text-text-secondary">
        <p className="text-lg">
          {type === "COMMENT"
            ? "If the user comments on the post that is setup to listen, the automation will be triggered "
            : "If the user direct messages for your account that is setup to listen, the automation will be triggered"}
        </p>
      </p>
      <div className="flex gap-2 mt-5 flex-wrap">
        {keywords.map((keyword) => (
          <div
            key={keyword.id}
            className="bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full"
          >
            {keyword.word}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveTrigger;
