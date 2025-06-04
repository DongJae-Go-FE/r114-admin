import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";
import { UserMemberModalSchema } from "@/schema/schema";

const UserMemberModalColumns: ColumnDef<
  z.infer<typeof UserMemberModalSchema>
>[] = [
  {
    accessorKey: "loginData",
    header: "로그인/로그아웃",
    cell: ({ row }) => <div>{row.original.loginData}</div>,
  },
  {
    accessorKey: "date",
    header: "발생일시",
    cell: ({ row }) => <div>{row.original.date}</div>,
  },
];

export default UserMemberModalColumns;
