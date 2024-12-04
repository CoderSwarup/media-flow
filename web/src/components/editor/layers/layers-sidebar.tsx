import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuOptions from ".";
import { Menu } from "lucide-react";
import Layers from "./index";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

export default function LayersSideBar() {
  return (
    <div className="block md:hidden ml-auto mr-5 mb-5 mt-5">
      <Sheet>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <SheetTrigger asChild>
                <Menu />
              </SheetTrigger>
              <SheetContent
                side={"right"}
                className=" p-0 m-0 overflow-y-scroll"
              >
                <Layers />
              </SheetContent>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Open Layers</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Sheet>
    </div>
  );
}
