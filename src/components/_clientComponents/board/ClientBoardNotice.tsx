"use client";

import { useRouter } from "next/navigation";

import { Fragment, useState } from "react";

import { useQuery } from "@tanstack/react-query";

import { addDays, format, parse } from "date-fns";

import { Input } from "@/components/Input";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/Button";

import Filter from "@/components/Filter";
import { DataTable } from "@/components/DataTable";

import { CustomSelect } from "@/components/Select";
import { CommonServiceDivideSelect } from "@/components/Select/CommonSelect/CommonServiceDivideSelect";

import { BoardNoticeColumns } from "./tableColumns/BoardNoticeColumns";

import { useFilter } from "@/hooks/useFilter";

import { useBoardDeleteMutation } from "@/lib/network/mutation";

import { GET_BOARD_NOTICE_SCHEMA } from "@/schema/board/notice/schema";
import { GET_BOARD_NOTICE_REQUEST_TYPE } from "@/types/board/notice/types";
import { GET_BOARD_NOTICE_REQUEST } from "@/lib/network/api";

import {
  COMPLETE_DELETE_STRING,
  CONFIRM_DELETE_SAVE_STRING,
  SELECTED_NOT_CHECKED,
  INPUT_MAX_LENGTH,
} from "@/const/const";

export default function ClientBoardNotice() {
  const { push } = useRouter();
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);

  const { mutateAsync } = useBoardDeleteMutation();

  const { filter, handleSubmit, handleReset, setFilter, query } =
    useFilter<GET_BOARD_NOTICE_REQUEST_TYPE>({
      comCd: "001",
      searchType: "all",
      searchKeyword: "",
      searchStartRegDtm: "2023-01-01",
      searchEndRegDtm: "2025-12-31",
      modId: "teamgod7min",
      pageSize: 10,
      pageIndex: 1,
      pageOrder: "DESC",
    });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["BOARD_NOTICE_REQUEST", query],
    queryFn: () => GET_BOARD_NOTICE_REQUEST({ ...filter }),
  });

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
        alert(
          `공지사항 ${selectedRowIds.length}개를 ${COMPLETE_DELETE_STRING}`
        );
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
    });
  };

  return (
    <Fragment>
      <div className="mb-4">
        <Filter
          items={[
            {
              title: "등록일자",
              inputs: [
                {
                  node: (
                    <DateRangePicker
                      id="picker"
                      initialValue={{
                        from: filter.searchStartRegDtm
                          ? parse(
                              filter.searchStartRegDtm,
                              "yyyy-MM-dd",
                              new Date()
                            )
                          : new Date(),
                        to: filter.searchEndRegDtm
                          ? parse(
                              filter.searchEndRegDtm,
                              "yyyy-MM-dd",
                              new Date()
                            )
                          : addDays(new Date(), 31),
                      }}
                      className="w-full"
                      disabled={isLoading}
                      onChangDate={(value) => {
                        setFilter((prev) => ({
                          ...prev,
                          searchStartRegDtm: value?.from
                            ? format(value.from, "yyyy-MM-dd")
                            : "",
                          searchEndRegDtm: value?.to
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
                      disabled={isLoading}
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
                        { value: "title", label: "공지사항 제목" },
                        { value: "regId", label: "등록자 아이디" },
                      ]}
                      className="w-40 bg-white"
                      placeholder="전체"
                      disabled={isLoading}
                      onChange={(value) =>
                        setFilter((prev) => ({
                          ...prev,
                          searchType: value as "all" | "title" | "regId",
                        }))
                      }
                    />
                  ),
                },
                {
                  node: (
                    <Input
                      type="search"
                      value={filter.searchKeyword}
                      placeholder="검색어를 입력해주세요."
                      disabled={isLoading}
                      maxLength={INPUT_MAX_LENGTH}
                      onChange={(e) =>
                        setFilter((prev) => ({
                          ...prev,
                          searchKeyword: e.target.value,
                        }))
                      }
                    />
                  ),
                },
              ],
              ratio: 3,
            },
          ]}
          onSubmit={handleFilterSubmit}
          onReset={() => {
            handleReset();
          }}
        />
      </div>
      <DataTable
        data={
          data?.data.items?.map((item) => ({
            id: item.postNo,
            ...item,
          })) || []
        }
        columns={BoardNoticeColumns(
          data?.data.totalCount || 0,
          filter.pageIndex,
          filter.pageSize
        )}
        schema={GET_BOARD_NOTICE_SCHEMA}
        btnArea={{
          primary: (
            <Button
              size="sm"
              color="red"
              onClick={handleDelete}
              disabled={isLoading}
            >
              삭제
            </Button>
          ),
          secondary: (
            <Button
              size="sm"
              color="white"
              onClick={() => push("/board/notice/add")}
              disabled={isLoading}
            >
              신규 등록
            </Button>
          ),
        }}
        key={data?.data.totalCount}
        page={filter.pageIndex}
        pageSize={filter.pageSize}
        totalCount={data?.data.totalCount || 0}
        onPageChange={(value) => {
          handleSubmit({
            ...filter,
            pageIndex: value,
          });
        }}
        isTableHeader
        isLoading={isLoading}
        onRowSelectionChange={setSelectedRowIds}
      />
    </Fragment>
  );
}
