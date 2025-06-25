import Link from "next/link";

import { z } from "zod";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/Checkbox";
import { ArrowUpDown } from "lucide-react";

import { GET_ADVERTISEMENT_AD_SCHEMA } from "@/modules/advertisement/ad/model/schema";

const AdvertisementAdColumns: ColumnDef<
  z.infer<typeof GET_ADVERTISEMENT_AD_SCHEMA>
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
          aria-label={`${row.getValue("advtNm")} 선택`}
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "comCd",
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
      <div className="text-center">
        {row.original.comCd === "001" ? "REPS5.0" : ""}
      </div>
    ),
  },
  // {
  //   accessorKey: "advtNo",
  //   header: () => <div className="text-center">등록 번호</div>,
  //   cell: ({ row }) => <div className="text-center">{row.original.advtNo}</div>,
  //   size: 80,
  // },
  {
    accessorKey: "srvStGb",
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
    cell: ({ row }) => {
      const renderSrvStGb = () => {
        switch (row.original.srvStGb) {
          case "R":
            return "대기";
          case "Y":
            return "노출 중";
          case "N":
            return "기간만료";
          case "P":
            return "광고중지";
          case "D":
            return "삭제";
        }
      };
      return <div className="text-center">{renderSrvStGb()}</div>;
    },
    size: 100,
  },
  {
    accessorKey: "advtNm",
    header: () => <div className="text-center">광고 제목</div>,
    cell: ({ row }) => (
      <Link
        href={`/advertisement/ad-list/${row.original.advtNo}`}
        className="block text-center truncate underline underline-offset-2"
        title={row.original.advtNm}
      >
        {row.original.advtNm}
      </Link>
    ),
    size: 200,
  },
  {
    accessorKey: "advtStartDt",
    header: () => <div className="text-center">광고 기간</div>,
    cell: ({ row }) => (
      <div className="text-center">
        {row.original.advtStartDt} ~ {row.original.advtEndDt}
      </div>
    ),
  },
  {
    accessorKey: "regId",
    header: () => <div className="text-center">등록자</div>,
    cell: ({ row }) => <div className="text-center">{row.original.regId}</div>,
    size: 100,
  },
  {
    accessorKey: "regDtm",
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
  {
    accessorKey: "dispOrdNo",
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
    cell: ({ row }) => (
      <div className="text-center">{row.original.dispOrdNo}</div>
    ),
    size: 80,
  },
];

export default AdvertisementAdColumns;
