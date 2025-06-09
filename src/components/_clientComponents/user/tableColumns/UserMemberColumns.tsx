import Link from "next/link";

import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { GET_USER_MEMBER_SCHEMA } from "@/schema/user/member/schema";

import { ArrowUpDown } from "lucide-react";

const UserMemberColumns: ColumnDef<z.infer<typeof GET_USER_MEMBER_SCHEMA>>[] = [
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
    accessorKey: "code",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        계약 코드
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <Link
        href={`/user/contract/${row.original.id}`}
        className="w-full text-center block underline underline-offset-2"
      >
        {row.original.code}
      </Link>
    ),
  },
  {
    accessorKey: "serviceDate",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        서비스 이용 기간
        <ArrowUpDown />
      </button>
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="text-center">{row.original.serviceDate}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">회원 명</div>,
    cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
  },
  {
    accessorKey: "userId",
    header: () => <div className="text-center">아이디</div>,
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
    accessorKey: "ipCount",
    header: () => <div className="text-center">IP개수(사용/전체)</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.ipCount}/5</div>
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
    accessorKey: "group",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        권한 그룹
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.group}</div>,
  },
  {
    accessorKey: "upDate",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        최근 업데이트 일시
        <ArrowUpDown />
      </button>
    ),
    size: 200,
    cell: ({ row }) => (
      <div className="text-center">{row.original.updateDate}</div>
    ),
  },
];

export default UserMemberColumns;
