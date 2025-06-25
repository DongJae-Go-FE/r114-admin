"use client";

import { useRouter } from "next/navigation";

import { Fragment, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { addDays, format, parse } from "date-fns";

import { Input } from "@/components/Input";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/Button";

import { DataTable } from "@/components/DataTable";
import Filter from "@/components/Filter";

import { CustomSelect } from "@/components/Select";
import { CommonServiceDivideSelect } from "@/components/Select/CommonSelect/CommonServiceDivideSelect";

import AdvertisementAdColumns from "./table-columns/AdvertisementAdColumns";
import AdvertisementAdChangeOrderModal from "./ui-modal/AdvertisementAdChangeOrderModal";

import { useFilter } from "@/hooks/useFilter";

import { useAdvertisementAdDeleteMutation } from "./model/mutation";

import { GET_ADVERTISEMENT_AD_SCHEMA } from "@/modules/advertisement/ad/model/schema";
import { GET_ADVERTISEMENT_AD_REQUEST_TYPE } from "@/modules/advertisement/ad/model/types";

import { GET_ADVERTISEMENT_AD_REQUEST } from "./model/api";

import {
  COMPLETE_DELETE_STRING,
  CONFIRM_DELETE_SAVE_STRING,
  SELECTED_NOT_CHECKED,
  INPUT_MAX_LENGTH,
} from "@/lib/const";

export default function ClientAdvertisementAd() {
  const { push } = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  const { mutateAsync } = useAdvertisementAdDeleteMutation();

  const { filter, handleSubmit, handleReset, setFilter, query } =
    useFilter<GET_ADVERTISEMENT_AD_REQUEST_TYPE>({
      comCd: "001",
      regStartDtm: "2023-01-01",
      regEndDtm: "2025-12-31",
      advtStartDt: "2023-01-01",
      advtEndDt: "2025-12-31",
      srvStGb: "Y",
      searchType: "all",
      searchKeyword: "",
      pageSize: 10,
      pageIndex: 1,
      pageOrder: "DESC",
    });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ADVERTISEMENT_AD_REQUEST", query],
    queryFn: () => GET_ADVERTISEMENT_AD_REQUEST({ ...filter }),
  });

  const handleDelete = async () => {
    if (selectedRowIds.length === 0) return alert(SELECTED_NOT_CHECKED);

    if (confirm(`광고를 ${CONFIRM_DELETE_SAVE_STRING}`)) {
      try {
        await Promise.all(
          selectedRowIds.map((id) => mutateAsync(id.toString()))
        );
        alert(`광고 ${COMPLETE_DELETE_STRING}`);
        setSelectedRowIds([]);
        refetch();
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleFilterSubmit = () => {
    handleSubmit({
      ...filter,
      searchKeyword: searchInput,
    });
  };

  return (
    <Fragment>
      <div className="mb-4">
        <Filter
          items={[
            {
              title: "광고기간",
              inputs: [
                {
                  node: (
                    <DateRangePicker
                      id="picker"
                      initialValue={{
                        from: filter.advtStartDt
                          ? parse(filter.advtStartDt, "yyyy-MM-dd", new Date())
                          : new Date(),
                        to: filter.advtEndDt
                          ? parse(filter.advtEndDt, "yyyy-MM-dd", new Date())
                          : addDays(new Date(), 31),
                      }}
                      className="w-full"
                      onChangDate={(value) => {
                        setFilter((prev) => ({
                          ...prev,
                          advtStartDt: value?.from
                            ? format(value.from, "yyyy-MM-dd")
                            : "",
                          advtEndDt: value?.to
                            ? format(value.to, "yyyy-MM-dd")
                            : "",
                        }));
                      }}
                    />
                  ),
                },
              ],
              ratio: 1,
            },
            {
              title: "등록일자",
              inputs: [
                {
                  node: (
                    <DateRangePicker
                      id="picker"
                      initialValue={{
                        from: filter.regStartDtm
                          ? parse(filter.regStartDtm, "yyyy-MM-dd", new Date())
                          : new Date(),
                        to: filter.regEndDtm
                          ? parse(filter.regEndDtm, "yyyy-MM-dd", new Date())
                          : addDays(new Date(), 31),
                      }}
                      className="w-full"
                      onChangDate={(value) => {
                        setFilter((prev) => ({
                          ...prev,
                          regStartDtm: value?.from
                            ? format(value.from, "yyyy-MM-dd")
                            : "",
                          regEndDtm: value?.to
                            ? format(value.to, "yyyy-MM-dd")
                            : "",
                        }));
                      }}
                    />
                  ),
                },
              ],
              ratio: 1,
            },
            {
              title: "서비스 구분",
              inputs: [
                {
                  node: (
                    <CommonServiceDivideSelect
                      value={filter.comCd}
                      className="w-full bg-white"
                      placeholder="전체"
                      onChange={(value) =>
                        setFilter((prev) => ({ ...prev, comCd: value }))
                      }
                    />
                  ),
                },
              ],
              ratio: 1,
            },
            {
              title: "광고 상태",
              inputs: [
                {
                  node: (
                    <CustomSelect
                      value={filter.srvStGb}
                      placeholder="전체"
                      options={[
                        {
                          label: "전체",
                          value: "all",
                        },
                        {
                          label: "대기",
                          value: "R",
                        },
                        {
                          label: "노출 중",
                          value: "Y",
                        },
                        {
                          label: "기간 만료",
                          value: "N",
                        },
                        {
                          label: "중지",
                          value: "P",
                        },
                        {
                          label: "삭제",
                          value: "D",
                        },
                      ]}
                      className="w-full bg-white"
                      onChange={(value) => {
                        if (value === "all") {
                          setFilter((prev) => ({
                            ...prev,
                            srvStGb: "",
                          }));
                        } else {
                          setFilter((prev) => ({
                            ...prev,
                            srvStGb: value as "" | "R" | "Y" | "N" | "P" | "D",
                          }));
                        }
                      }}
                    />
                  ),
                },
              ],
              ratio: 1,
            },
            {
              title: "검색",
              inputs: [
                {
                  node: (
                    <CustomSelect
                      value={filter.searchKeyword}
                      options={[
                        { value: "all", label: "전체" },
                        { value: "title", label: "광고 제목" },
                        { value: "regId", label: "등록자 아이디" },
                      ]}
                      className="w-40 bg-white"
                      placeholder="전체"
                      onChange={(value) =>
                        setFilter((prev) => ({ ...prev, searchKeyword: value }))
                      }
                    />
                  ),
                },
                {
                  node: (
                    <Input
                      type="search"
                      value={searchInput}
                      placeholder="검색어를 입력해주세요."
                      maxLength={INPUT_MAX_LENGTH}
                      onChange={(e) => setSearchInput(() => e.target.value)}
                    />
                  ),
                },
              ],
              ratio: 3,
            },
          ]}
          onSubmit={handleFilterSubmit}
          onReset={() => {
            setSearchInput("");
            handleReset();
          }}
        />
      </div>
      <DataTable
        data={
          data?.data.item?.map((item) => ({
            id: item.advtNo,
            ...item,
          })) || []
        }
        key={data?.data.totalCount}
        columns={AdvertisementAdColumns}
        schema={GET_ADVERTISEMENT_AD_SCHEMA}
        page={filter.pageIndex}
        pageSize={filter.pageSize}
        totalCount={data?.data.totalCount || 0}
        btnArea={{
          primary: <AdvertisementAdChangeOrderModal />,
          secondary: (
            <div className="flex gap-x-1">
              <Button size="sm" color="red" onClick={handleDelete}>
                삭제
              </Button>
              <Button
                size="sm"
                color="white"
                onClick={() => push("/advertisement/ad-add")}
              >
                신규 등록
              </Button>
            </div>
          ),
        }}
        isTableHeader
        isLoading={isLoading}
        onRowSelectionChange={setSelectedRowIds}
        onPageChange={(value) => {
          handleSubmit({
            ...filter,
            pageIndex: value,
          });
        }}
      />
    </Fragment>
  );
}
