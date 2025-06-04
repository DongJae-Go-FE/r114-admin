"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/Dialog";

import ClientSettingMyPage from "../ClientSettingMyPage";

export default function SettingMyPageModal() {
  const { back } = useRouter();
  const [open, setOpen] = useState(true);

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          back();
        }
        setOpen(isOpen);
      }}
    >
      <DialogContent className="max-w-[60%] overflow-auto">
        <DialogHeader>
          <DialogTitle>나의정보</DialogTitle>
        </DialogHeader>
        <ClientSettingMyPage />
      </DialogContent>
    </Dialog>
  );
}
 