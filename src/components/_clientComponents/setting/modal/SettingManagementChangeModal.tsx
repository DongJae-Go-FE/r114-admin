"use client";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/Dialog";

import { CustomSelect } from "@/components/Select";

import { Button } from "@/components/Button";

import { adminPermissionType } from "@/const/enum";

export default function SettingManagementChangeModal({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleChange = async () => {
    if (confirm(`{아이디} 계정에 대한 권한을 변경하시겠습니까?`)) {
      try {
        startTransition(() => {
          console.log(id);
          alert(`{아이디} 계정 권한이 변경되었습니다.`);
        });
      } catch (e) {
        alert(e);
      } finally {
        setIsOpen(false);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="xs" color="white">
          권한 변경
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>권한 변경</DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          <p className="mb-2">아이디 계정에 대한 권한을 변경하시겠습니까?</p>
        </div>
        <CustomSelect
          value={value}
          options={Object.entries(adminPermissionType).map(
            ([value, title]) => ({
              value,
              label: title,
            })
          )}
          className="w-full bg-white"
          placeholder="전체"
          disabled={isPending}
          onChange={setValue}
        />

        <DialogFooter>
          <Button
            type="button"
            color="white"
            disabled={isPending}
            onClick={() => {
              setIsOpen(false);
            }}
          >
            취소
          </Button>
          <Button type="button" disabled={isPending} onClick={handleChange}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
