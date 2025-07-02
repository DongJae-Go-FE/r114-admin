import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import DragHandle from "@/components/DataTable/DragHandle";

import { GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA } from "@/modules/advertisement/ad/model/schema";

const AdvertisementAdChangeOrderColumns: ColumnDef<
  z.infer<typeof GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA>
>[] = [
  {
    accessorKey: "dispOrdNo",
    header: () => <div className="text-center">현재 순서</div>,
    size: 50,
    cell: ({ row }) => (
      <div className="text-center">{row.original.dispOrdNo}</div>
    ),
  },
  {
    accessorKey: "srvStGbNm",
    header: () => <div className="text-center">광고 상태</div>,
    size: 50,
    cell: ({ row }) => (
      <div className="text-center">{row.original.srvStGbNm}</div>
    ),
  },
  {
    accessorKey: "advtNm",
    header: () => <div className="text-center">광고 제목</div>,
    size: 160,
    cell: ({ row }) => (
      <div className="text-center truncate" title={row.original.advtNm}>
        {row.original.advtNm}
      </div>
    ),
  },
  {
    id: "drag",
    header: () => <div className="text-center">순서 변경</div>,
    size: 50,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DragHandle id={row.original.id} />
      </div>
    ),
  },
];

export default AdvertisementAdChangeOrderColumns;
