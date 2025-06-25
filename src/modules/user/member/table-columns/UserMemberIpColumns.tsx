import Link from "next/link";

import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/Checkbox";
import UserMemberIpModal from "../ui-modal/UserMemberIpModal";

import { ArrowUpDown } from "lucide-react";

import { GET_USER_MEMBER_IP_SCHEMA } from "@/modules/user/member/model/schema";

const UserMemberIpColumns: ColumnDef<
  z.infer<typeof GET_USER_MEMBER_IP_SCHEMA>
>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="전체 선택"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />
      </div>
    ),
    size: 30,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "idType",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        계정 구분
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.idType}</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="w-full text-center">회원명</div>,
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "userId",
    header: () => <div className="w-full text-center">아이디</div>,
    cell: ({ row }) => (
      <Link
        href={`/user/member/${row.original.id}`}
        className="w-full text-center block underline underline-offset-2"
      >
        {row.original.userId}
      </Link>
    ),
  },
  {
    accessorKey: "region",
    header: () => <div className="w-full text-center">접속지역</div>,
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.region}</div>
    ),
  },
  {
    accessorKey: "ip",
    header: () => <div className="w-full text-center">아이피</div>,
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.ip}</div>
    ),
  },
  {
    accessorKey: "memberType",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        회원 상태
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.memberType}</div>
    ),
  },
  {
    accessorKey: "updateDate",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        등록 일시
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.updateDate}</div>
    ),
  },
  {
    id: "info",
    header: () => <div className="w-full text-center">접속 정보</div>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <UserMemberIpModal id={row.original.id} />
      </div>
    ),
  },
];

export default UserMemberIpColumns;
