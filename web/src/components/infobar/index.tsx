"use client";
import React, { useEffect } from "react";
import { ModeToggle } from "../global/mode-toggle";
import { Book, Headphones, Search } from "lucide-react";
import Templates from "../icons/cloud_download";
import { Input } from "@/components/ui/input";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserButton } from "@clerk/nextjs";
import MobileSideBar from "../sidebar/MobileSideBar";
import { useBilling } from "../providers/billing-provider";
import { onPaymentDetails } from "@/app/(main)/(pages)/billing/_actions/payment-connecetions";

type Props = {};

const InfoBar = (props: Props) => {
  const { credits, tier, setCredits, setTier } = useBilling();

  const onGetPayment = async () => {
    const response = await onPaymentDetails();
    console.log(response);

    if (response) {
      setTier(response.tier!);
      setCredits(response.credits.toString());
    }
  };

  useEffect(() => {
    console.log("HELLO");

    onGetPayment();
  }, []);

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-4 py-4 w-full dark:bg-black ">
      <MobileSideBar />
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light text-gray-300">Credits</p>
        {tier == "Unlimited" ? (
          <span>Unlimited</span>
        ) : (
          <span>
            {credits}/{tier == "Free" ? "10" : tier == "Pro" && "100"}
          </span>
        )}
      </span>
      <span className="flex items-center rounded-full bg-muted px-4">
        <Search />
        <Input
          placeholder="Quick Search"
          className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </span>
      <div className="hidden md:block flex items-center space-x-3">
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Headphones />
            </TooltipTrigger>
            <TooltipContent className=" bg-[#F1F1F1] text-black dark:bg-black dark:text-white">
              <p>Contact Support</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Book />
            </TooltipTrigger>
            <TooltipContent className=" bg-[#F1F1F1] text-black dark:bg-black dark:text-white">
              <p>Guide</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <UserButton />
    </div>
  );
};

export default InfoBar;
