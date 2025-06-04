import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Checkbox } from "@/components/Checkbox";

import { UserPowerSchema } from "@/schema/schema";
import Link from "next/link";

const UserContractColumns: ColumnDef<z.infer<typeof UserPowerSchema>>[] = [
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "power",
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
    cell: ({ row }) => (
      <Link
        className="text-center block underline underline-offset-2"
        href={`/user/power/${row.original.id}`}
      >
        {row.original.power}
      </Link>
    ),
  },
  {
    accessorKey: "menuType",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        메뉴별 접근 권한
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.menuType}</div>
    ),
  },
  {
    accessorKey: "dataPowerType",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        데이터 복사 권한
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.dataPowerType}</div>
    ),
  },
  {
    accessorKey: "excelType",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        엑셀 다운로드 권한
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.excelType}</div>
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
