"use client";

import { useContext } from "react";
import { SideBarContext } from "../SideBar/SideBar";

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

import { Button } from "../Button";

import { LOGOUT_CONFIRM_STRING } from "@/const/const";

import { handleLogout as handleServerLogout } from "@/severActions/serverActions";

export default function Header() {
  const { setIsOpen, isOpen } = useContext(SideBarContext);

  const handleLogout = async () => {
    if (confirm(LOGOUT_CONFIRM_STRING)) {
      await handleServerLogout();
    }
  };

  const headerStyle =
    "w-full h-16 border-b border-gray-200 sticky top-0 z-30 flex items-center px-6 bg-white justify-between";

  return (
    <header className={headerStyle}>
      <Button variant="icon" size="sm" onClick={setIsOpen}>
        {isOpen ? (
          <PanelLeftCloseIcon color="#111" />
        ) : (
          <PanelLeftOpenIcon color="#111" />
        )}
      </Button>
      <div className="flex gap-x-2 items-center">
        <Button size="sm" color="white" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </header>
  );
}
