"use client";

import { useRouter } from "next/navigation";

import { Fragment, useState, useEffect, useMemo } from "react";

import { addDays, format, parse } from "date-fns";

import { DateRangePicker } from "@/components/DateRangePicker";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";

import { CustomSelect } from "@/components/Select";
import { CommonMemberStateSelect } from "@/components/Select/CommonSelect/CommonMemberStateSelect";
import { CommonIdDivideSelect } from "@/components/Select/CommonSelect/CommonIdDivideSelect";
import { CommonPowerGroupSelect } from "@/components/Select/CommonSelect/CommonPowerGroupSelect";

import Filter from "@/components/Filter";
import { DataTable } from "@/components/DataTable";

import UserMemberColumns from "./table-columns/UserMemberColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

import { GET_USER_MEMBER_SCHEMA } from "@/modules/user/member/model/schema";
import { GET_USER_MEMBER_REQUEST_TYPE } from "@/modules/user/member/model/types";

import { INPUT_MAX_LENGTH } from "@/lib/const";

const data = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  idType: ["일반", "관리자", "게스트"][i % 3],
  code: `CONTRACT-${1000 + i}`,
  serviceDate: `2023-0${(i % 9) + 1}-01 ~ 2024-0${(i % 9) + 1}-01`,
  name: `회원${i + 1}`,
  userId: `asdasdasd`,
  ipCount: `${i % 6}`,
  memberType: ["정상", "휴면", "탈퇴"][i % 3],
  group: ["GUEST", "USER", "ADMIN", "SUPERADMIN"][i % 4],
  updateDate: `2024-06-${((i % 28) + 1).toString().padStart(2, "0")} 13:00:00`,
}));

export default function ClientUserMember() {
  const { push } = useRouter();

  const [searchInput, setSearchInput] = useState("");
  console.log("searchInput", searchInput);
  const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });

  const { filter, setFilter, handleSubmit, handleReset } =
    useFilter<GET_USER_MEMBER_REQUEST_TYPE>({
      startDate: "",
      endDate: "",
      idType: "all",
      memberType: "all",
      group: "all",
      searchType: "all",
      searchKeyword: "",
    });

  const handleFilterSubmit = () => {
    handleSubmit({
      ...filter,
      searchKeyword: searchInput,
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
        title: "계정 구분",
        inputs: [
          {
            node: (
              <CommonIdDivideSelect
                value={filter.idType}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    idType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "회원 상태",
        inputs: [
          {
            node: (
              <CommonMemberStateSelect
                value={filter.memberType}
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
        title: "권한 그룹",
        inputs: [
          {
            node: (
              <CommonPowerGroupSelect
                value={filter.group}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    group: value,
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
                onChange={(e) => setSearchInput(() => e.target.value)}
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
      filter.idType,
      filter.group,
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
        totalCount={data.length}
        columns={UserMemberColumns}
        schema={GET_USER_MEMBER_SCHEMA}
        btnArea={{
          primary: (
            <Button
              size="sm"
              color="white"
              onClick={() => push("/user/member/ip")}
            >
              IP 이용 내역
            </Button>
          ),
          secondary: (
            <Button
              size="sm"
              color="white"
              onClick={() => push("/user/member/add")}
            >
              신규 등록
            </Button>
          ),
        }}
        isTableHeader
      />
    </Fragment>
  );
}
