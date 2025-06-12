import Link from "next/link";

import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { GET_SETTING_MY_PAGE_SCHEMA } from "@/schema/setting/myPage/schema";

const SettingMyPageListColumns: ColumnDef<
  z.infer<typeof GET_SETTING_MY_PAGE_SCHEMA>
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
      <div className="w-full text-center underline underline-offset-2">
        <Link href="">{row.original.id}</Link>
      </div>
    ),
  },
];

export default SettingMyPageListColumns;
