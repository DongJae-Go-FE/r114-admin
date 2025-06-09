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

import { GET_USER_MEMBER_SCHEMA } from "@/schema/user/member/schema";
import { GET_USER_MEMBER_REQUEST_TYPE } from "@/lib/network/types";

import UserMemberColumns from "./tableColumns/UserMemberColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

import { INPUT_MAX_LENGTH } from "@/const/const";

import { userType, businessType, contractType } from "@/const/enum";

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
              <CustomSelect
                value={filter.idType}
                options={Object.entries(userType).map(([value, title]) => ({
                  value,
                  label: title,
                }))}
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
              <CustomSelect
                value={filter.memberType}
                options={Object.entries(businessType).map(([value, title]) => ({
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
        title: "권한 그룹",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.group}
                options={Object.entries(contractType).map(([value, title]) => ({
                  value,
                  label: title,
                }))}
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
