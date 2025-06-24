"use client";

import { Fragment, useState, useEffect, useMemo } from "react";

import { addDays, format, parse } from "date-fns";

import { DateRangePicker } from "@/components/DateRangePicker";
import { Input } from "@/components/Input";
import { CustomSelect } from "@/components/Select";

import { CommonIdDivideSelect } from "@/components/Select/CommonSelect/CommonIdDivideSelect";
import { CommonMemberStateSelect } from "@/components/Select/CommonSelect/CommonMemberStateSelect";

import { Button } from "@/components/Button";
import Filter from "@/components/Filter";

import { DataTable } from "@/components/DataTable";

import UserMemberIpColumns from "./tableColumns/UserMemberIpColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

import { GET_USER_MEMBER_IP_SCHEMA } from "@/schema/user/member/schema";
import { GET_MEMBER_IP_REQUEST_TYPE } from "@/types/user/member/types";

import {
  INPUT_MAX_LENGTH,
  CONFIRM_DELETE_SAVE_STRING,
  SELECTED_NOT_CHECKED,
  COMPLETE_DELETE_STRING,
} from "@/const/const";

const data = [
  {
    id: "1",
    idType: "관리자",
    name: "홍길동",
    userId: "admin01",
    region: "서울특별시",
    ip: "192.168.0.1",
    memberType: "정상",
    updateDate: "2024-06-01 10:00:00",
  },
  {
    id: "2",
    idType: "일반",
    name: "김영희",
    userId: "user99",
    region: "부산광역시",
    ip: "172.16.0.8",
    memberType: "휴면",
    updateDate: "2024-05-28 14:30:00",
  },
  {
    id: "3",
    idType: "게스트",
    name: "이철수",
    userId: "guest123",
    region: "대전광역시",
    ip: "10.0.0.77",
    memberType: "탈퇴",
    updateDate: "2024-06-05 09:15:00",
  },
];

export default function ClientUserMemberIp() {
  const [searchInput, setSearchInput] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });

  const { filter, setFilter, handleSubmit, handleReset } =
    useFilter<GET_MEMBER_IP_REQUEST_TYPE>({
      startDate: "",
      endDate: "",
      idType: "all",
      memberType: "all",
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

  const handleDelete = async () => {
    if (selectedRowIds.length === 0) {
      alert(SELECTED_NOT_CHECKED);
      return;
    }

    if (confirm(`IP 이용내역을 ${CONFIRM_DELETE_SAVE_STRING}`)) {
      try {
        for (const id of selectedRowIds) {
          console.log(id);
          // if (id === "1") {
          //   alert(
          //     "${권한그룹}권한을 삭제할 수 없습니다. ${권한그룹}권한을 가진 회원 정보를 먼저 수정해주세요"
          //   );
          //   return;
          // } else {
          //   setIsDelete(true);
          // }
        }
        alert(`IP 이용내역을 ${COMPLETE_DELETE_STRING}`);
      } catch (e) {
        alert(e);
      }
    }
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
        columns={UserMemberIpColumns}
        schema={GET_USER_MEMBER_IP_SCHEMA}
        btnArea={{
          primary: (
            <Button size="sm" color="red" onClick={handleDelete}>
              삭제
            </Button>
          ),
        }}
        isTableHeader
        onRowSelectionChange={setSelectedRowIds}
      />
    </Fragment>
  );
}
