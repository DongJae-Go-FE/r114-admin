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

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import {
  COMPLETE_DELETE_STRING,
  CONFIRM_DELETE_SAVE_STRING,
  INPUT_MIN_LENGTH,
  TXT_MAX_LENGTH,
} from "@/const/const";

export default function SettingManagementOkModal({
  selectedValueArr,
  open,
  onOpenChange,
}: {
  selectedValueArr: {
    userId: string;
    id: string | number;
  }[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [reason, setReason] = useState("");
  const [isPending, startTransition] = useTransition();

  console.log(selectedValueArr);

  const handleChange = async () => {
    if (
      confirm(
        `${
          selectedValueArr.length > 1
            ? `${selectedValueArr.length}개의`
            : "아이디"
        } 계정을 ${CONFIRM_DELETE_SAVE_STRING}`
      )
    ) {
      try {
        startTransition(() => {
          alert(
            `${
              selectedValueArr.length > 1
                ? `${selectedValueArr.length}개의`
                : "아이디"
            } 계정을 ${COMPLETE_DELETE_STRING}`
          );
        });
      } catch (e) {
        alert(e);
      } finally {
        setReason("");
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button type="button" size="sm" color="white">
          관리자 승인
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>관리자 승인</DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          <p className="mb-2">
            <b>
              [상태: 상태값] 계정에 대한 관리자 승인 변경 사유를 기재해주세요
            </b>
            <span className="text-red-500 mb-2">
              <span className="attention">* </span>
              사유(필수)
            </span>
          </p>

          <Input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            disabled={isPending}
            minLength={INPUT_MIN_LENGTH}
            maxLength={TXT_MAX_LENGTH}
            placeholder="사유를 입력해주세요. (20자 이내)"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            color="white"
            disabled={isPending}
            onClick={() => {
              setReason("");
              onOpenChange(false);
            }}
          >
            취소
          </Button>
          <Button
            type="button"
            disabled={isPending || reason.length > 20 || reason.length < 1}
            onClick={handleChange}
          >
            승인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
