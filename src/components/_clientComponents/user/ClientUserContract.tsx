"use client";

import { useRouter } from "next/navigation";

import { addDays, format, parse } from "date-fns";

import { Fragment, useState, useEffect, useMemo } from "react";

import { DateRangePicker } from "@/components/DateRangePicker";
import { Input } from "@/components/Input";
import { CustomSelect } from "@/components/Select";

import { Button } from "@/components/Button";

import Filter from "@/components/Filter";

import { DataTable } from "@/components/DataTable";

import { UserContractSchema } from "@/schema/schema";
import { UserContractGetRequestType } from "@/lib/network/types";

import UserContractColumns from "./tableColumns/UserContractColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

import { INPUT_MAX_LENGTH } from "@/const/const";

import {
  userType,
  businessType,
  contractType,
  businessMainType,
  businessSubType,
} from "@/const/enum";

import data from "@/dummy/data.json";

export default function ClientUserContract() {
  const { push } = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });

  const { filter, setFilter, handleSubmit, handleReset } =
    useFilter<UserContractGetRequestType>({
      startDate: "",
      endDate: "",
      memberType: "all",
      corporationType: "all",
      contractType: "all",
      industry1: "all",
      industry2: "all",
      searchType: "all",
      searchKeyword: "",
    });

  const handleFilterSubmit = () => {
    handleSubmit({
      ...filter,
    });
  };

  const handleFilterReset = () => {
    handleReset();
  };

  const filterItems = useMemo(
    () => [
      {
        title: "최근 업데이트 일자",
        inputs: [
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
        title: "회원 구분",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.memberType}
                options={Object.entries(userType).map(([value, title]) => ({
                  value,
                  label: title,
                }))}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    memberType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "사업자 구분",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.corporationType}
                options={Object.entries(businessType).map(([value, title]) => ({
                  value,
                  label: title,
                }))}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    corporationType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "계약 구분",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.contractType}
                options={Object.entries(contractType).map(([value, title]) => ({
                  value,
                  label: title,
                }))}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    contractType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "업종 구분1",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.industry1}
                options={Object.entries(businessMainType).map(
                  ([value, title]) => ({
                    value,
                    label: title,
                  })
                )}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    industry1: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "업종 구분2",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.industry2}
                options={Object.entries(
                  businessSubType[
                    filter.industry1 as keyof typeof businessSubType
                  ] || {}
                ).map(([value, title]) => ({
                  value,
                  label: title,
                }))}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    industry2: value,
                  }));
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
                value={filter.searchType}
                options={[
                  { value: "all", label: "전체" },
                  { value: "1", label: "계약코드" },
                  { value: "2", label: "회원명" },
                ]}
                className="w-40 bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    searchType: value,
                  }));
                }}
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
    [
      filter.startDate,
      filter.endDate,
      filter.memberType,
      filter.corporationType,
      filter.contractType,
      filter.industry1,
      filter.industry2,
      filter.searchType,
      searchInput,
      setFilter,
    ]
  );

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      searchKeyword: debouncedSearch,
    }));
  }, [debouncedSearch, setFilter]);

  return (
    <Fragment>
      <div className="mb-4">
        <Filter
          items={filterItems}
          onSubmit={handleFilterSubmit}
          onReset={handleFilterReset}
        />
      </div>
      <DataTable
        data={data}
        columns={UserContractColumns}
        schema={UserContractSchema}
        btnArea={{
          primary: (
            <Button
              size="sm"
              color="white"
              onClick={() => push("/user/contract/add")}
            >
              사용자 등록
            </Button>
          ),
        }}
        isTableHeader
        isDragAndDrop
      />
    </Fragment>
  );
}
