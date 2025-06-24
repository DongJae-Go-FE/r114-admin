"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Dialog";

import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import AdvertisementAdChangeOrderColumns from "@/components/_clientComponents/advertisement/tableColumns/AdvertisementAdChangeOrderColumns";

import { GET_ADVERTISEMENT_AD_ACTIVE_LIST_REQUEST } from "@/lib/network/api";
import { GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA } from "@/schema/advertisement/ad/schema";

import { useAdvertisementAdListPatchMutation } from "@/lib/network/mutation";

export default function AdvertisementAdChangeOrderModal() {
  const { data, isLoading } = useQuery({
    queryKey: ["ADVERTISEMENT_AD_ACTIVE_LIST_REQUEST"],
    queryFn: () => GET_ADVERTISEMENT_AD_ACTIVE_LIST_REQUEST({ comCd: "001" }),
  });

  const qc = useQueryClient();

  const { mutateAsync } = useAdvertisementAdListPatchMutation();

  const handleDragComplete = async (oldIndex: number, newIndex: number) => {
    try {
      await mutateAsync({
        advtNo: data?.data[oldIndex].advtNo || 0,
        targetAdvtNo: data?.data[newIndex].advtNo || 0,
        modId: "webmaster",
      });
      qc.refetchQueries({
        queryKey: ["ADVERTISEMENT_AD_REQUEST"],
      });
    } catch (e) {
      alert(e);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" size="sm">
          광고 순서 변경
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>광고 순서 변경</DialogTitle>
        </DialogHeader>
        <DataTable
          data={
            data?.data.map((item) => ({
              ...item,
              id: item.advtNo,
            })) || []
          }
          totalCount={data?.data.length || 0}
          columns={AdvertisementAdChangeOrderColumns}
          schema={GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA}
          isLoading={isLoading}
          isDragAndDrop
          onDragEnd={handleDragComplete}
        />
      </DialogContent>
    </Dialog>
  );
}
