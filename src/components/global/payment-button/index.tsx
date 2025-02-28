'use client'
import { useSubscription } from "@/hooks/use-subscription";
import { CreditCardIcon, Loader2 } from "lucide-react";
import React from "react";

type Props = {};

function PaymentButton({}: Props) {
  const {onSubscribe, isProcessing} = useSubscription();
  return (
    <button disabled={isProcessing} onClick={onSubscribe} className="bg-gradient-to-br from-[#9685DB] via-[#9434E6] to-[#cc3bd4] text-white rounded-full p-1 font-bold flex justify-center items-center">
      {isProcessing? <Loader2 className="animate-spin" /> : <CreditCardIcon/>}
      Upgrade
    </button>
  );
}

export default PaymentButton;
