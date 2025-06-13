"use client";

import { useRouter } from "next/navigation";

import { Fragment, useMemo, useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { addDays, format, parse } from "date-fns";

import { Input } from "@/components/Input";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/Button";

import Filter from "@/components/Filter";
import { DataTable } from "@/components/DataTable";

import { CustomSelect } from "@/components/Select";
import { CommonServiceDivideSelect } from "@/components/Select/CommonSelect/CommonServiceDivideSelect";

import BoardNoticeColumns from "./tableColumns/BoardNoticeColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

import { useBoardDeleteMutation } from "@/lib/network/mutation";

import { GET_BOARD_NOTICE_SCHEMA } from "@/schema/board/notice/schema";
import { GET_BOARD_NOTICE_REQUEST_TYPE } from "@/lib/network/types";
import { GET_BOARD_NOTICE_REQUEST } from "@/lib/network/api";

import {
  COMPLETE_DELETE_STRING,
  CONFIRM_DELETE_SAVE_STRING,
  SELECTED_NOT_CHECKED,
  INPUT_MAX_LENGTH,
} from "@/const/const";

const datas = [
  {
    postNo: 489,
    boardId: "notice",
    parentPostNo: 0,
    firstPostNo: 0,
    postLevel: 1,
    postTitle: "[빈출문의] 실거래통계는 어떤 메뉴인가요?",
    postContent: "",
    reservePostDtm: "",
    postStartDtm: "",
    postEndDtm: "",
    topFixYn: "N",
    firstYn: "N",
    delYn: "",
    delDtm: "",
    blockYn: "",
    blockReason: "",
    blockDtm: "",
    readCnt: 0,
    modCnt: 0,
    ipAddr: "",
    attr: "{}",
    regId: "teamgod7min",
    regMenuId: "",
    regDtm: "2023-07-21 09:26:04",
    modId: "",
    modMenuId: "",
    modDtm: "",
    nowDtm: "2025-05-20 08:54",
    regNm: "민상준",
    dispRegDtm: "2023-07-21 09:26:04",
  },
];

export default function ClientBoardNotice() {
  const { push } = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const debouncedSearch = useDebounce({ value: searchInput, delay: 300 });
  const { mutateAsync } = useBoardDeleteMutation();

  const { filter, handleSubmit, handleReset, setFilter } =
    useFilter<GET_BOARD_NOTICE_REQUEST_TYPE>({
      comCd: "001",
      searchKeyword: "",
      searchStartRegDtm: "2023-01-01",
      searchEndRegDtm: "2025-12-31",
      modId: "teamgod7min",
      pageSize: 20,
      pageIndex: 1,
      pageOrder: "DESC",
      searchType: "",
    });

  const { data } = useQuery({
    queryKey: ["BOARD_NOTICE_REQUEST"],
    queryFn: () => GET_BOARD_NOTICE_REQUEST({ ...filter }),
  });

  console.log(data);

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      searchKeyword: debouncedSearch,
    }));
  }, [debouncedSearch, setFilter]);

  const handleDelete = async () => {
    if (selectedRowIds.length === 0) {
      alert(SELECTED_NOT_CHECKED);
      return;
    }

    if (confirm(`공지사항을 ${CONFIRM_DELETE_SAVE_STRING}`)) {
      try {
        await Promise.all(
          selectedRowIds.map((id) => mutateAsync(id.toString()))
        );
        alert(`공지사항이 ${COMPLETE_DELETE_STRING}`);
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
              <DateRangePicker
                id="picker"
                initialValue={{
                  from: filter.searchStartRegDtm
                    ? parse(filter.searchStartRegDtm, "yyyy-MM-dd", new Date())
                    : new Date(),
                  to: filter.searchEndRegDtm
                    ? parse(filter.searchEndRegDtm, "yyyy-MM-dd", new Date())
                    : addDays(new Date(), 31),
                }}
                className="w-full"
                onChangDate={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    startDate: value?.from
                      ? format(value.from, "yyyy-MM-dd")
                      : "",
                    endDate: value?.to ? format(value.to, "yyyy-MM-dd") : "",
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
                  setFilter((prev) => ({ ...prev, service: value }))
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
                  { value: "2", label: "공지사항 제목" },
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

  const transformedData = datas.map((item) => ({
    id: item.postNo,
    ...item,
  }));

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
        data={transformedData}
        columns={BoardNoticeColumns}
        schema={GET_BOARD_NOTICE_SCHEMA}
        btnArea={{
          primary: (
            <Button size="sm" color="red" onClick={handleDelete}>
              삭제
            </Button>
          ),
          secondary: (
            <Button
              size="sm"
              color="white"
              onClick={() => push("/board/notice/add")}
            >
              신규 등록
            </Button>
          ),
        }}
        isTableHeader
        onRowSelectionChange={setSelectedRowIds}
      />
    </Fragment>
  );
}
