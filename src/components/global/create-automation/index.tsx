'use client'
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { AutomationDuoToneWhite } from "@/icons";
import Loader from "../loader";
import { useCreateAutomation } from "@/hooks/use-createAutomation";
import { v4 } from "uuid";

type Props = {};

function CreateAutomation({}: Props) {
  const mutationId = useMemo(()=> v4(),[])
  const { isPending, mutate } = useCreateAutomation(mutationId);

 
  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] hover:opacity-80 text-white rounded-full font-medium"
      onClick={() => mutate({ name: "Untitled", id: mutationId, createdAt: new Date(), keywords:[] })}
    >
      <Loader state={isPending}>
        <AutomationDuoToneWhite />
        <p className="lg:inline hidden">Create Automation</p>
      </Loader>
    </Button>
  );
}

export default CreateAutomation;
