"use client";

import { useRouter } from "next/navigation";

import { Fragment, useMemo, useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { addDays, format, parse } from "date-fns";

import { Input } from "@/components/Input";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/Button";

import { DataTable } from "@/components/DataTable";
import Filter from "@/components/Filter";

import { CustomSelect } from "@/components/Select";
import { CommonServiceDivideSelect } from "@/components/Select/CommonSelect/CommonServiceDivideSelect";

import AdvertisementAdColumns from "./tableColumns/AdvertisementAdColumns";
import AdvertisementAdChangeOrderModal from "./modal/AdvertisementAdChangeOrderModal";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";
import { useAdvertisementAdDeleteMutation } from "@/lib/network/mutation";

import { GET_ADVERTISEMENT_AD_SCHEMA } from "@/schema/advertisement/ad/schema";
import { GET_ADVERTISEMENT_AD_REQUEST_TYPE } from "@/lib/network/types";

import { GET_ADVERTISEMENT_AD_REQUEST } from "@/lib/network/api";

import {
  COMPLETE_DELETE_STRING,
  CONFIRM_DELETE_SAVE_STRING,
  SELECTED_NOT_CHECKED,
  INPUT_MAX_LENGTH,
} from "@/const/const";

const datas = [
  {
    id: 1,
    service: "1",
    state: "1",
    number: "1",
    title: "광고 제목제목제목제목제목제목제목제목제목제목제목제목",
    startDate: "",
    endDate: "",
    writer: "홍길동",
    date: "2023-10-01",
    order: "",
  },
  {
    id: 2,
    service: "2",
    state: "2",
    number: "2",
    title: "광고 제목제목제목제목제목제목제목제목제목제목제목제목",
    startDate: "",
    endDate: "",
    writer: "홍길동",
    date: "2023-10-01",
    order: "",
  },
];

export default function ClientAdvertisementAd() {
  const { push } = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });

  const { mutateAsync } = useAdvertisementAdDeleteMutation();

  const { filter, handleSubmit, handleReset, setFilter } =
    useFilter<GET_ADVERTISEMENT_AD_REQUEST_TYPE>({
      dateType: "1",
      startDate: "",
      endDate: "",
      service: "",
      state: "",
      order: "",
      searchType: "",
      searchKeyword: "",
    });

  const { data } = useQuery({
    queryKey: ["BOARD_NOTICE_REQUEST"],
    queryFn: () => GET_ADVERTISEMENT_AD_REQUEST({ ...filter }),
  });

  console.log(data);

  useEffect(() => {
    setFilter((prev) => ({ ...prev, searchKeyword: debouncedSearch }));
  }, [debouncedSearch, setFilter]);

  const handleDelete = async () => {
    if (selectedRowIds.length === 0) return alert(SELECTED_NOT_CHECKED);

    if (confirm(`광고를 ${CONFIRM_DELETE_SAVE_STRING}`)) {
      try {
        await Promise.all(
          selectedRowIds.map((id) => mutateAsync(id.toString()))
        );
        alert(`광고 ${COMPLETE_DELETE_STRING}`);
      } catch (e) {
        alert(e);
      }
    }
  };

  const filterItems = useMemo(
    () => [
      {
        title: "등록일자",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.dateType}
                options={[
                  { value: "1", label: "등록 일자" },
                  { value: "2", label: "공지사항 제목" },
                ]}
                className="w-40 bg-white"
                placeholder="전체"
                onChange={(value) =>
                  setFilter((prev) => ({ ...prev, dateType: value }))
                }
              />
            ),
          },
          {
            node: (
              <DateRangePicker
                id="picker"
                initialValue={{
                  from: filter.startDate
                    ? parse(filter.startDate, "yyyy-MM-dd HH:mm", new Date())
                    : new Date(),
                  to: filter.endDate
                    ? parse(filter.endDate, "yyyy-MM-dd HH:mm", new Date())
                    : addDays(new Date(), 31),
                }}
                className="w-full"
                onChangDate={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    startDate: value?.from
                      ? format(value.from, "yyyy-MM-dd HH:mm")
                      : "",
                    endDate: value?.to
                      ? format(value.to, "yyyy-MM-dd HH:mm")
                      : "",
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 2,
      },
      {
        title: "서비스 구분",
        inputs: [
          {
            node: (
              <CommonServiceDivideSelect
                value={filter.service}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) =>
                  setFilter((prev) => ({ ...prev, service: value }))
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
                value={filter.state}
                options={[
                  {
                    label: "대기",
                    value: "0",
                  },
                  {
                    label: "노출중",
                    value: "1",
                  },
                  {
                    label: "기간 만료",
                    value: "2",
                  },
                  {
                    label: "중지",
                    value: "3",
                  },
                  {
                    label: "삭제",
                    value: "4",
                  },
                ]}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) =>
                  setFilter((prev) => ({ ...prev, state: value }))
                }
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "광고 순서",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.order}
                options={[
                  { value: "all", label: "전체" },
                  { value: "1", label: "1" },
                ]}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) =>
                  setFilter((prev) => ({ ...prev, order: value }))
                }
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
                value={filter.searchType}
                options={[
                  { value: "all", label: "전체" },
                  { value: "1", label: "등록자 아이디" },
                  { value: "2", label: "광고 제목" },
                  { value: "3", label: "등록 번호" },
                ]}
                className="w-40 bg-white"
                placeholder="전체"
                onChange={(value) =>
                  setFilter((prev) => ({ ...prev, searchType: value }))
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
                onChange={(e) => setSearchInput(e.target.value)}
              />
            ),
          },
        ],
        ratio: 3,
      },
    ],
    [filter, searchInput, setFilter]
  );

  return (
    <Fragment>
      <div className="mb-4">
        <Filter
          items={filterItems}
          onSubmit={() => handleSubmit(filter)}
          onReset={() => {
            setSearchInput("");
            handleReset();
          }}
        />
      </div>
      <DataTable
        data={datas}
        columns={AdvertisementAdColumns}
        schema={GET_ADVERTISEMENT_AD_SCHEMA}
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
        isDragAndDrop
        onRowSelectionChange={setSelectedRowIds}
      />
    </Fragment>
  );
}
