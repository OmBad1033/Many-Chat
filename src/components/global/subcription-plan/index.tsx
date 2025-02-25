import { useQueryUser } from "@/hooks/use-queries";
import React from "react";

type Props = {
  type: "FREE" | "PRO";
  children: React.ReactNode;
};

function SubcriptionPlan({ children, type }: Props) {
  const { data } = useQueryUser();
  return data?.data?.subscription?.plan === type && type ? children : null;
}

export default SubcriptionPlan;
