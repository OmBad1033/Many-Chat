"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import Loader from "../loader";
import { ActiveAutomation } from "@/icons/active-automation";
import { useQueryAutomation } from "@/hooks/use-queries";
import { useMutationData } from "@/hooks/use-mutation";
import { activateAutomation } from "@/actions/automations";
import { Loader2 } from "lucide-react";

type Props = {
  id: string;
};

export default function ActiveAutomationButton({ id }: Props) {
  const { data } = useQueryAutomation(id);
  const { mutate, isPending } = useMutationData(
    ["activate"],
    (data: { state: boolean }) => activateAutomation(id, data.state),
    "automation-info"
  );
  return (
    <Button
      disabled={isPending}
      onClick={() => mutate({ state: !data?.data?.active })}
      className="lg:px-10 bg-gradient-to-br from-[#3352CC] to-[#1C2D70] hover:opacity-80 text-white rounded-full font-medium ml-4"
    >
      {isPending ? <Loader2 className="animate-spin" /> : <ActiveAutomation />}
      <p className="lg:inline hidden">
        {data?.data?.active ? "Disable" : "Activate"}
      </p>
    </Button>
  );
}
