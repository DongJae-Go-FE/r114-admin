import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/Button";

import UserMemberModal from "../modal/UserMemberModal";

import { UserMemberSchema } from "@/schema/schema";

import {
  CONFIRM_DELETE_SAVE_STRING,
  COMPLETE_DELETE_STRING,
} from "@/const/const";

const UserMemberColumns: ColumnDef<z.infer<typeof UserMemberSchema>>[] = [
  {
    accessorKey: "state",
    header: () => <div className="text-center">상태</div>,
    cell: ({ row }) => <div className="text-center">{row.original.state}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">아이디</div>,
    cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
  },
  {
    accessorKey: "region",
    header: () => <div className="text-center">지역</div>,
    cell: ({ row }) => <div className="text-center">{row.original.region}</div>,
  },
  {
    accessorKey: "ip",
    header: () => <div className="text-center">IP</div>,
    cell: ({ row }) => <div className="text-center">{row.original.ip}</div>,
  },
  {
    accessorKey: "date",
    header: () => <div className="text-center">등록일시</div>,
    cell: ({ row }) => <div className="text-center">{row.original.date}</div>,
  },

  {
    accessorKey: "id",
    header: () => <div className="text-center">접속정보</div>,
    cell: ({ row }) => (
      <div className="w-full flex justify-center">
        <UserMemberModal id={row.original.id} />
      </div>
    ),
  },

  {
    header: () => <div className="text-center">관리</div>,
    accessorKey: "managing",
    cell: ({ row }) => {
      const handleDelete = async () => {
        if (confirm(CONFIRM_DELETE_SAVE_STRING)) {
          try {
            console.log(row.original.id);
            alert(COMPLETE_DELETE_STRING);
          } catch (e) {
            alert(e);
          }
        }
      };

      return row.original.managing ? (
        <div className="flex justify-center">
          <Button type="button" size="xs" color="red" onClick={handleDelete}>
            삭제
          </Button>
        </div>
      ) : (
        ""
      );
    },
  },
];

export default UserMemberColumns;
