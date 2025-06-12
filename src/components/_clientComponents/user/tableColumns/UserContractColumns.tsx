import Link from "next/link";

import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { GET_USER_CONTRACT_SCHEMA } from "@/schema/user/contract/schema";

const UserContractColumns: ColumnDef<
  z.infer<typeof GET_USER_CONTRACT_SCHEMA>
>[] = [
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
        className="text-center block underline underline-offset-2"
        href={`/user/contract/${row.original.id}`}
      >
        {row.original.code}
      </Link>
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
        회원 구분
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.memberType}</div>
    ),
  },
  {
    accessorKey: "contractType",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        사업자 구분
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.contractState}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">회원 명</div>,
    cell: ({ row }) => <div className="text-center">{row.original.name}</div>,
  },
  {
    accessorKey: "industry1",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        업종 구분1
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.industry1}</div>
    ),
  },
  {
    accessorKey: "industry2",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        업종 구분2
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.industry2}</div>
    ),
  },
  {
    accessorKey: "date",
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
    cell: ({ row }) => <div className="text-center">{row.original.date}</div>,
  },
];

export default UserContractColumns;
