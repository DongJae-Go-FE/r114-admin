"use client";

import { Fragment, useMemo, useState, useEffect } from "react";

import { addDays, format, parse } from "date-fns";

import { DateRangePicker } from "@/components/DateRangePicker";
import { Input } from "@/components/Input";
import Filter from "@/components/Filter";
import { DataTable } from "@/components/DataTable";

import { CustomSelect } from "@/components/Select";
import { CommonAdminPowerSelect } from "@/components/Select/CommonSelect/CommonAdminPowerSelect";
import { CommonStateSelect } from "@/components/Select/CommonSelect/CommonStateSelect";

import SettingManagementOkModal from "./modal/SettingManagementOkModal";

import SettingManagementColumns from "./tableColumns/SettingManagementColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

import { GET_SETTING_MANAGEMENT_SCHEMA } from "@/schema/setting/management/schema";
import { GET_SETTING_MANAGEMENT_REQUEST_TYPE } from "@/types/setting/management/types";

import { SELECTED_NOT_CHECKED, INPUT_MAX_LENGTH } from "@/const/const";

const data = [
  {
    id: 1,
    memberId: "user001",
    name: "홍길동",
    team: "마케팅팀",
    adMgmt: "캠페인A",
    state: "활성",
    date: "2025-05-01",
  },
  {
    id: 2,
    memberId: "user002",
    name: "김영희",
    team: "개발팀",
    adMgmt: "광고B",
    state: "비활성",
    date: "2025-05-15",
  },
  {
    id: 3,
    memberId: "user003",
    name: "이철수",
    team: "디자인팀",
    adMgmt: "배너C",
    state: "활성",
    date: "2025-05-20",
  },
  {
    id: 4,
    memberId: "user004",
    name: "박지민",
    team: "영업팀",
    adMgmt: "프로모션D",
    state: "대기",
    date: "2025-05-25",
  },
];

export default function ClientSettingManagement() {
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });

  const { filter, setFilter, handleSubmit, handleReset } =
    useFilter<GET_SETTING_MANAGEMENT_REQUEST_TYPE>({
      startDate: "",
      endDate: "",
      adMgmt: "",
      state: "",
      search: "",
      searchType: "",
    });

  const selectedValueArr = useMemo(() => {
    return selectedRowIds.map((value) => {
      return {
        userId: "",
        id: value,
      };
    });
  }, [selectedRowIds]);

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
        title: "관리자 권한",
        inputs: [
          {
            node: (
              <CommonAdminPowerSelect
                value={filter.adMgmt}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    adMgmt: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "상태",
        inputs: [
          {
            node: (
              <CommonStateSelect
                value={filter.state}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    state: value,
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
                  { value: "1", label: "아이디" },
                  { value: "2", label: "이름" },
                  { value: "3", label: "소속팀" },
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
        ratio: 4,
      },
    ],
    [
      filter.startDate,
      filter.endDate,
      filter.adMgmt,
      filter.state,
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

  const handleFilterSubmit = () => {
    handleSubmit({
      ...filter,
      search: searchInput,
    });
  };

  const handleFilterReset = () => {
    handleReset();
  };

  const handleTriggerClick = (open: boolean) => {
    if (!selectedValueArr || selectedValueArr.length === 0) {
      alert(SELECTED_NOT_CHECKED);
      return;
    }
    setIsOpen(open);
  };

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
        columns={SettingManagementColumns}
        schema={GET_SETTING_MANAGEMENT_SCHEMA}
        totalCount={data.length}
        btnArea={{
          primary: (
            <SettingManagementOkModal
              open={isOpen}
              onOpenChange={handleTriggerClick}
              selectedValueArr={selectedValueArr}
            />
          ),
        }}
        onRowSelectionChange={setSelectedRowIds}
        isTableHeader
        isDragAndDrop
      />
    </Fragment>
  );
}
