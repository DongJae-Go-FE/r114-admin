import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { GET_USER_MEMBER_IP_MODAL_SCHEMA } from "@/modules/user/member/model/schema";

const UserMemberIpModalColumns: ColumnDef<
  z.infer<typeof GET_USER_MEMBER_IP_MODAL_SCHEMA>
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

export default UserMemberIpModalColumns;
