import React from "react";
import PopOver from "../../popover";
import { BlueAddIcon } from "@/icons";

type Props = {
  label: string;
  children: React.ReactNode;
};

function TriggerButton({ label, children }: Props) {
  return (
    <PopOver
      className="w-[400px]"
      trigger={
        <div
          className="border-2 border-dashed w-full border-[#3352CC] 
          hover:opacity-80 transition duration-100 
          flex justify-center items-center rounded-xl gap-x-2 p-5 mt-4 "
        >
          <BlueAddIcon/>
          <p className="text-[#768BDD] font-bold">{label}</p>
        </div>
      }
    >
      {children}
    </PopOver>
  );
}

export default TriggerButton;
