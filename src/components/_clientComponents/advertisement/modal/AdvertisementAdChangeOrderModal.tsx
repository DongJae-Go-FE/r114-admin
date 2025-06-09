"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";

import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";
import AdvertisementAdChangeOrderColumns from "@/components/_clientComponents/advertisement/tableColumns/AdvertisementAdChangeOrderColumns";
import { GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA } from "@/schema/advertisement/ad/schema";
import { COMPLETE_EDIT_STRING } from "@/const/const";

const data = [
  {
    id: 1,
    order: "1",
    state: "노출중",
    title: "제목1",
  },
  {
    id: 2,
    order: "2",
    state: "미노출",
    title: "제목2",
  },
  {
    id: 3,
    order: "3",
    state: "미노출",
    title: "제목3",
  },
  {
    id: 4,
    order: "4",
    state: "미노출",
    title: "제목4",
  },
  {
    id: 5,
    order: "5",
    state: "미노출",
    title: "제목5",
  },
];

export default function AdvertisementAdChangeOrderModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async () => {
    if (confirm("광고 순서를 변경하시겠습니까?")) {
      try {
        alert(COMPLETE_EDIT_STRING);
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
        <Button type="button" size="sm">
          광고 순서 변경
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>광고 순서 변경</DialogTitle>
        </DialogHeader>
        <DataTable
          data={data}
          columns={AdvertisementAdChangeOrderColumns}
          schema={GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA}
          isDragAndDrop
        />
        <DialogFooter>
          <Button type="button" color="white" onClick={handleSave}>
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
