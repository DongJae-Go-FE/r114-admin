"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";

import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import { UserMemberModalSchema } from "@/schema/schema";

import UserMemberModalColumns from "../tableColumns/UserMemberModalColumns";

const data = [
  {
    id: "1",
    loginData: "로그인",
    date: "2023-10-01",
  },
  {
    id: "2",
    loginData: "로그인",
    date: "2023-10-02",
  },
];

export default function UserMemberModal({ id }: { id: string | number }) {
  console.log(id);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size="xs" color="white">
          확인
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto ">
        <DialogHeader>
          <DialogTitle>사용이력</DialogTitle>
        </DialogHeader>

        <DataTable
          data={data}
          columns={UserMemberModalColumns}
          schema={UserMemberModalSchema}
        />
      </DialogContent>
    </Dialog>
  );
}
