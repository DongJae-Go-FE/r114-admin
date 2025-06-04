import Link from "next/link";

import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";
import { UserContractDetailList } from "@/schema/schema";

const UserContractDetailColumns: ColumnDef<
  z.infer<typeof UserContractDetailList>
>[] = [
  {
    accessorKey: "date",
    header: () => <div className="w-full text-center">최근 업데이트 일시</div>,
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.date}</div>
    ),
  },
  {
    accessorKey: "update",
    header: () => <div className="w-full text-center">업데이트 항목</div>,
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.update}</div>
    ),
  },
  {
    accessorKey: "reason",
    header: () => <div className="w-full text-center">업데이트 사유</div>,
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.reason}</div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="w-full text-center">업데이트한 계정</div>,
    cell: ({ row }) => (
      <div className="w-full text-center">
        <Link
          href={`/user/contract/${row.original.id}}`}
          className="underline underline-offset-2"
        >
          {row.original.id}
        </Link>
      </div>
    ),
  },
];

export default UserContractDetailColumns;
