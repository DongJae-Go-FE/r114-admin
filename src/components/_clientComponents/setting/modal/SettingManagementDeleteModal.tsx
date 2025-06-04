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

export default function SettingManagementDeleteModal({ id }: { id: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteReason, setDeleteReason] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    setDeleteReason("");
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (confirm(`{아이디} 계정을 ${CONFIRM_DELETE_SAVE_STRING}`)) {
      try {
        startTransition(() => {
          console.log(id);
          alert(`{아이디} 계정 ${COMPLETE_DELETE_STRING}`);
        });
      } catch (e) {
        alert(e);
      } finally {
        handleCancel();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" size="xs" color="red">
          계정 삭제
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>계정 삭제</DialogTitle>
        </DialogHeader>
        <div className="text-sm">
          <p className="mb-2">
            계정을 삭제하시겠습니까?{" "}
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
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            type="button"
            color="red"
            disabled={
              isPending || deleteReason.length > 20 || deleteReason.length < 1
            }
            onClick={handleDelete}
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
