import { z } from "zod";

import { ColumnDef } from "@tanstack/react-table";

import { GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA } from "@/schema/advertisement/ad/schema";
import DragHandle from "@/components/DataTable/DragHandle";

const AdvertisementAdChangeOrderColumns: ColumnDef<
  z.infer<typeof GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA>
>[] = [
  {
    accessorKey: "order",
    header: () => <div className="text-center">현재 순서</div>,
    size: 90,
    cell: ({ row }) => <div className="text-center">{row.original.order}</div>,
  },
  {
    accessorKey: "state",
    header: () => <div className="text-center">광고 상태</div>,
    size: 90,
    cell: ({ row }) => <div className="text-center">{row.original.state}</div>,
  },
  {
    accessorKey: "title",
    header: () => <div className="text-center">광고 제목</div>,
    size: 90,
    cell: ({ row }) => <div className="text-center">{row.original.title}</div>,
  },
  {
    id: "drag",
    header: () => <div className="text-center">순서 변경</div>,
    size: 90,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <DragHandle id={row.original.id} />
      </div>
    ),
  },
];

export default AdvertisementAdChangeOrderColumns;
