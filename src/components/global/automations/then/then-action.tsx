import { useListener } from "@/hooks/use-automations";
import React from "react";
import TriggerButton from "../trigger-button";
import { AUTOMATION_LISTENERS } from "@/constants/automation";
import SubcriptionPlan from "../../subcription-plan";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "../../loader";

type Props = {
  id: string;
};

function ThenAction({ id }: Props) {
  const {
    errors,
    onFormSubmit,
    register,
    watch,
    reset,
    isPending,
    onSetListener,
    listener: Listener,
  } = useListener(id);
  return (
    <TriggerButton label="Trigger">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_LISTENERS.map((listener) =>
          listener.type === "SMARTAI" ? (
            <SubcriptionPlan key={listener.type} type="PRO">
              <div
                className={cn(
                  Listener === listener.type
                    ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                    : "bg-background-80",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
                )}
                onClick={() => onSetListener(listener.type)}
                key={listener.id}
              >
                <div className="flex gap-x-2 items-center">
                  {listener.icon}
                  <p>{listener.label}</p>
                </div>
                <p>{listener.description}</p>
              </div>
            </SubcriptionPlan>
          ) : (
            <div
              className={cn(
                Listener === listener.type
                  ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]"
                  : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
              onClick={() => onSetListener(listener.type)}
              key={listener.id}
            >
              <div className="flex gap-x-2 items-center">
                {listener.icon}
                <p>{listener.label}</p>
              </div>
              <p>{listener.description}</p>
            </div>
          )
        )}
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-2">
          <Textarea 
            placeholder={
              Listener === "SMARTAI" ?
                "Enter your prompt" :
                "Enter your message"
            }
            {...register("prompt")}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input 
            {...register("reply")}
            placeholder="Enter your reply for a comment (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button className='bg-gradient-to-br from-[#3352CC] to-[#1C2D70] w-full font-medium text-white'>
            <Loader state={isPending}>Add Listener</Loader>
          </Button>

        </form>
      </div>
    </TriggerButton>
  );
}

export default ThenAction;
