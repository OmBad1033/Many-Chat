import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  trigger: JSX.Element;
  className?: string;
};

function PopOver({ children, trigger, className }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent
        className={cn("bg-[#1D1D1D] shadow-lg", className)}
        align="end"
        side="bottom"
      >
        {children}
      </PopoverContent>
    </Popover>
  );
}

export default PopOver;
