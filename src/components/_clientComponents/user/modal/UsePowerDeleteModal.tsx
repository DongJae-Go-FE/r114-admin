"use client";

import { useState, useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/Dialog";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

import {
  COMPLETE_DELETE_STRING,
  CONFIRM_DELETE_SAVE_STRING,
  TXT_MAX_LENGTH,
  INPUT_MIN_LENGTH,
} from "@/const/const";

export default function UsePowerDeleteModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [deleteReason, setDeleteReason] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (confirm(`{권한 그룹명} 권한을 ${CONFIRM_DELETE_SAVE_STRING}`)) {
      try {
        startTransition(() => {
          alert(COMPLETE_DELETE_STRING);
        });
      } catch (e) {
        alert(e);
      } finally {
        setDeleteReason("");
        onOpenChange(false);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>권한 삭제</DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          <p className="mb-2">
            권한을 삭제하시겠습니까?{" "}
            <span className="text-red-500 mb-2">
              <span className="attention">* </span>
              삭제 사유(필수)
            </span>
          </p>
          <Input
            type="text"
            value={deleteReason}
            onChange={(e) => setDeleteReason(e.target.value)}
            disabled={isPending}
            minLength={INPUT_MIN_LENGTH}
            maxLength={TXT_MAX_LENGTH}
            placeholder="삭제 사유를 입력해주세요. (20자 이내)"
          />
        </div>

        <DialogFooter>
          <Button
            type="button"
            color="white"
            disabled={isPending}
            onClick={() => {
              setDeleteReason("");
              onOpenChange(false);
            }}
          >
            취소
          </Button>
          <Button
            type="button"
            color="red"
            disabled={isPending || deleteReason.length > 20}
            onClick={handleDelete}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
