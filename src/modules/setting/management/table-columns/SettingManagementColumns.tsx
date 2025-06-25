import Link from "next/link";

import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/Checkbox";

import SettingManagementChangeModal from "../ui-modal/SettingManagementChangeModal";
import SettingManagementDeleteModal from "../ui-modal/SettingManagementDeleteModal";

import { ArrowUpDown } from "lucide-react";

import { GET_SETTING_MANAGEMENT_SCHEMA } from "@/modules/setting/management/model/schema";

const SettingManagementColumns: ColumnDef<
  z.infer<typeof GET_SETTING_MANAGEMENT_SCHEMA>
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
    size: 30,
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`${row.getValue("memberId")} 선택`}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "memberId",
    header: () => <div className="w-full text-center">아이디</div>,
    cell: ({ row }) => (
      <Link
        href={`/setting/management/${row.original.id}`}
        className="w-full text-center block underline underline-offset-2"
      >
        {row.original.memberId}
      </Link>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="w-full text-center">이름</div>,
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.name}</div>
    ),
  },
  {
    accessorKey: "team",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        소속 팀/부서
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.team}</div>
    ),
  },
  {
    accessorKey: "adMgmt",
    header: ({ column }) => (
      <button
        type="button"
        className="table-header-button"
        onClick={() => column.toggleSorting()}
      >
        관리자 권한
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.adMgmt}</div>
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
        상태
        <ArrowUpDown />
      </button>
    ),
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.state}</div>
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
    cell: ({ row }) => (
      <div className="w-full text-center">{row.original.date}</div>
    ),
  },
  {
    accessorKey: "id",
    header: () => <div className="w-full text-center">아이디 상태 관리</div>,
    cell: ({ row }) => (
      <ul className="flex gap-x-1 justify-center">
        <li>
          <SettingManagementDeleteModal id={row.original.id} />
        </li>

        <li>
          <SettingManagementChangeModal id={row.original.id} />
        </li>
      </ul>
    ),
  },
];

export default SettingManagementColumns;
