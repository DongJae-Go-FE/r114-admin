import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/Checkbox";
import { ArrowUpDown } from "lucide-react";
import { GET_BOARD_NOTICE_COLUMNS_TYPE } from "@/modules/board/notice/model/types";

export const BoardNoticeColumns = (
  totalCount: number,
  page: number,
  pageSize: number
): ColumnDef<GET_BOARD_NOTICE_COLUMNS_TYPE>[] => [
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
          aria-label={`${row.getValue("postTitle")} 선택`}
        />
      </div>
    ),
    size: 30,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "postNo",
    size: 50,
    header: () => <div className="text-center">번호</div>,
    cell: ({ row }) => {
      const number = totalCount - (page - 1) * pageSize - row.index;

      return <div className="text-center">{number}</div>;
    },
  },
  {
    accessorKey: "comCd",
    size: 60,
    header: () => <div className="text-center">서비스 구분</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.comCd === "001" ? "REPS5.0" : ""}
      </div>
    ),
  },
  {
    accessorKey: "postTitle",
    header: () => <div className="text-center">제목</div>,
    cell: ({ row }) => (
      <Link
        href={`/board/notice/${row.original.postNo}`}
        className="block text-center truncate underline underline-offset-2"
        title={row.original.postTitle}
      >
        {row.original.postTitle}
      </Link>
    ),
  },
  {
    accessorKey: "regNm",
    size: 100,
    header: () => <div className="text-center">등록자</div>,
    cell: ({ row }) => (
      <Link
        href=""
        className="block text-center truncate underline underline-offset-2"
        title={row.original.regNm}
      >
        {row.original.regNm}({row.original.regId})
      </Link>
    ),
  },
  {
    accessorKey: "regDtm",
    size: 100,
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
    cell: ({ row }) => <div className="text-center">{row.original.regDtm}</div>,
  },
];
