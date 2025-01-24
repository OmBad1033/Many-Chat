import React from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

type Props = {
  state: boolean;
  className?: string;
  children: React.ReactNode;
  color?: string;
};

function Loader({ state, className, children, color }: Props) {
  return state ? (
    <div className={cn(className)}>
      <Spinner color={color} />
    </div>
  ) : (
    children
  );
}

export default Loader;
