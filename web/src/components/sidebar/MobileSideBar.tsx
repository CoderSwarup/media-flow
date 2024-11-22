import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import MenuOptions from ".";
import { Menu } from "lucide-react";

export default function MobileSideBar() {
  return (
    <div className="block md:hidden mr-auto">
      <Sheet>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side={"left"} className="w-[100px] p-0 m-0">
          <MenuOptions />
        </SheetContent>
      </Sheet>
    </div>
  );
}
