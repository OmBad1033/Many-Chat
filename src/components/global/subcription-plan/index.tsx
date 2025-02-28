import { useQueryUser } from "@/hooks/use-queries";
import React from "react";

type Props = {
  children: React.ReactNode;
};

function SubcriptionPlan({ children }: Props) {
  const { data } = useQueryUser();
  return data?.data?.subscription?.plan === "FREE"? children : null;
}

export default SubcriptionPlan;
