import Link from "next/link";

import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/Checkbox";
import { ArrowUpDown } from "lucide-react";

import { AdvertisementAdSchema } from "@/schema/schema";

const AdvertisementAdColumns: ColumnDef<
  z.infer<typeof AdvertisementAdSchema>
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
          aria-label={`${row.getValue("title")} 선택`}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "service",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        서비스 구분
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-center">{row.original.service}</div>
    ),
  },
  {
    accessorKey: "state",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        광고 상태
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.state}</div>,
  },
  {
    accessorKey: "title",
    header: () => <div className="text-center">광고 제목</div>,
    cell: ({ row }) => (
      <Link
        href={`/advertisement/ad-list/${row.original.id}`}
        className="block text-center truncate underline underline-offset-2"
        title={row.original.title}
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "startDate",
    header: () => <div className="text-center">광고 기간</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.startDate} ~ {row.original.endDate}
      </div>
    ),
  },
  {
    accessorKey: "writer",
    header: () => <div className="text-center">등록자</div>,
    cell: ({ row }) => <div className="text-center">{row.original.writer}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        광고 일시
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.date}</div>,
  },
  {
    accessorKey: "order",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        광고 순서
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => <div className="text-center">{row.original.order}</div>,
  },
];

export default AdvertisementAdColumns;
