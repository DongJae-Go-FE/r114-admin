"use client";

import { useRouter } from "next/navigation";

import { Fragment, useState, useEffect, useMemo } from "react";

import { addDays, format, parse } from "date-fns";

import { DateRangePicker } from "@/components/DateRangePicker";
import { Input } from "@/components/Input";

import { CustomSelect } from "@/components/Select";
import { CommonBusinessDivideSelect } from "@/components/Select/CommonSelect/CommonBusinessDivideSelect";
import { CommonIndustryDivideOneSelect } from "@/components/Select/CommonSelect/CommonIndustryDivideOneSelect";
import { CommonIndustryDivideTwoSelect } from "@/components/Select/CommonSelect/CommonIndustryDivideTwoSelect";

import { Button } from "@/components/Button";

import Filter from "@/components/Filter";

import { DataTable } from "@/components/DataTable";

import UserContractColumns from "./table-columns/UserContractColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

import { GET_USER_CONTRACT_SCHEMA } from "@/modules/user/contract/model/schema";
import { GET_USER_CONTRACT_REQUEST_TYPE } from "@/modules/user/contract/model/types";

import { INPUT_MAX_LENGTH } from "@/lib/const";

const data = [
  {
    id: 1,
    code: "20240508-C-0001",
    memberType: "사업자",
    contractType: "법인",
    name: "가나다 컴퍼니",
    industry1: "마케팅",
    industry2: "디지털 광고",
    contractState: "대기 중",
    date: "2025-05-17",
  },
  {
    id: 2,
    code: "20240508-C-0002",
    memberType: "일반",
    contractType: "개인",
    name: "이순신 디자인",
    industry1: "디자인",
    industry2: "브랜딩",
    contractState: "진행 중",
    date: "2025-05-12",
  },
  {
    id: 3,
    code: "20240508-C-0003",
    memberType: "사업자",
    contractType: "법인",
    name: "홍길동 테크",
    industry1: "IT",
    industry2: "웹 개발",
    contractState: "완료",
    date: "2025-04-30",
  },
  {
    id: 4,
    code: "20240508-C-0004",
    memberType: "일반",
    contractType: "개인",
    name: "김영희 마켓",
    industry1: "유통",
    industry2: "이커머스",
    contractState: "취소됨",
    date: "2025-04-15",
  },
  {
    id: 5,
    code: "20240508-C-0005",
    memberType: "사업자",
    contractType: "법인",
    name: "드림소프트",
    industry1: "소프트웨어",
    industry2: "SaaS",
    contractState: "진행 중",
    date: "2025-03-20",
  },
  {
    id: 6,
    code: "20240508-C-0006",
    memberType: "일반",
    contractType: "개인",
    name: "정우영 콘텐츠",
    industry1: "미디어",
    industry2: "콘텐츠 제작",
    contractState: "완료",
    date: "2025-02-28",
  },
  {
    id: 7,
    code: "20240508-C-0007",
    memberType: "사업자",
    contractType: "법인",
    name: "에코그린",
    industry1: "환경",
    industry2: "재활용",
    contractState: "대기 중",
    date: "2025-05-01",
  },
  {
    id: 8,
    code: "20240508-C-0008",
    memberType: "일반",
    contractType: "개인",
    name: "윤슬 교육",
    industry1: "교육",
    industry2: "온라인 강의",
    contractState: "진행 중",
    date: "2025-04-10",
  },
  {
    id: 9,
    code: "20240508-C-0009",
    memberType: "사업자",
    contractType: "법인",
    name: "넥스트모션",
    industry1: "엔터테인먼트",
    industry2: "영상 제작",
    contractState: "완료",
    date: "2025-03-05",
  },
  {
    id: 10,
    code: "20240508-C-0010",
    memberType: "일반",
    contractType: "개인",
    name: "유진헬스",
    industry1: "헬스케어",
    industry2: "피트니스",
    contractState: "진행 중",
    date: "2025-05-18",
  },
];

export default function ClientUserContract() {
  const { push } = useRouter();

  const [searchInput, setSearchInput] = useState("");
  const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });

  const { filter, setFilter, handleSubmit, handleReset } =
    useFilter<GET_USER_CONTRACT_REQUEST_TYPE>({
      startDate: "",
      endDate: "",
      memberType: "all",
      corporationType: "all",
      contractType: "all",
      industry1: "0",
      industry2: "1",
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
        title: "회원 구분",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.memberType}
                options={[
                  {
                    label: "전체",
                    value: "0",
                  },
                  {
                    label: "개인",
                    value: "1",
                  },
                  {
                    label: "법인",
                    value: "2",
                  },
                ]}
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
              <CommonBusinessDivideSelect
                value={filter.corporationType}
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
                options={[
                  {
                    label: "전체",
                    value: "0",
                  },
                  {
                    label: "신규 계약",
                    value: "1",
                  },
                  {
                    label: "재계약",
                    value: "2",
                  },
                  {
                    label: "계약만료",
                    value: "3",
                  },
                  {
                    label: "계약해지",
                    value: "4",
                  },
                  {
                    label: "계약대기",
                    value: "5",
                  },
                  {
                    label: "계약연장",
                    value: "6",
                  },
                  {
                    label: "계약보류",
                    value: "7",
                  },
                ]}
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
              <CommonIndustryDivideOneSelect
                value={filter.industry1}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    industry1: value,
                    industry2: "1",
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
              <CommonIndustryDivideTwoSelect
                value={filter.industry2}
                className="w-full bg-white"
                prevValue={filter.industry1}
                disabled={filter.industry1 === "0"}
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
        totalCount={data.length}
        columns={UserContractColumns}
        schema={GET_USER_CONTRACT_SCHEMA}
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
