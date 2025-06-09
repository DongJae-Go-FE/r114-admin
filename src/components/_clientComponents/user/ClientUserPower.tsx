"use client";

import { useRouter } from "next/navigation";

import { addDays, format, parse } from "date-fns";

import { Fragment, useMemo, useState } from "react";

import { DateRangePicker } from "@/components/DateRangePicker";
import { CustomSelect } from "@/components/Select";

import { Button } from "@/components/Button";

import Filter from "@/components/Filter";

import { DataTable } from "@/components/DataTable";

import { GET_USER_POWER_SCHEMA } from "@/schema/user/power/schema";
import { GET_USER_POWER_REQUEST_TYPE } from "@/lib/network/types";

import UserPowerColumns from "./tableColumns/UserPowerColumns";

import { useFilter } from "@/hooks/useFilter";

import {
  CONFIRM_DELETE_SAVE_STRING,
  SELECTED_NOT_CHECKED,
} from "@/const/const";

import UsePowerDeleteModal from "./modal/UsePowerDeleteModal";

import {
  permissionGroupType,
  menuAccessType,
  dataCopyType,
  excelDownloadType,
} from "@/const/enum";

const data = [
  {
    id: 1,
    power: "High",
    dataPowerType: "Electric",
    menuType: "Standard",
    excelType: "XLSX",
    date: "2025-05-27",
  },
  {
    id: 2,
    power: "Low",
    dataPowerType: "Solar",
    menuType: "Advanced",
    excelType: "CSV",
    date: "2025-05-26",
  },
  {
    id: 3,
    power: "Medium",
    dataPowerType: "Wind",
    menuType: "Custom",
    excelType: "XLS",
    date: "2025-05-25",
  },
];

export default function ClientUserPower() {
  const { push } = useRouter();
  const [selectedRowIds, setSelectedRowIds] = useState<(string | number)[]>([]);
  const [isDelete, setIsDelete] = useState(false);

  const { filter, setFilter, handleSubmit, handleReset } =
    useFilter<GET_USER_POWER_REQUEST_TYPE>({
      startDate: "",
      endDate: "",
      power: "",
      menuType: "",
      dataPowerType: "",
      excelType: "",
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

    if (confirm(`권한을 ${CONFIRM_DELETE_SAVE_STRING}`)) {
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
          setIsDelete(true);
        }
        // alert(`권한이 ${COMPLETE_DELETE_STRING}`);
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
        title: "권한 그룹",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.power}
                options={Object.entries(permissionGroupType).map(
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
                    power: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "메뉴별 접근",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.menuType}
                options={Object.entries(menuAccessType).map(
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
                    menuType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "데이터 복사",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.dataPowerType}
                options={Object.entries(dataCopyType).map(([value, title]) => ({
                  value,
                  label: title,
                }))}
                className="w-full bg-white"
                placeholder="전체"
                onChange={(value) => {
                  setFilter((prev) => ({
                    ...prev,
                    dataPowerType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
      {
        title: "엑셀 다운로드",
        inputs: [
          {
            node: (
              <CustomSelect
                value={filter.excelType}
                options={Object.entries(excelDownloadType).map(
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
                    excelType: value,
                  }));
                }}
              />
            ),
          },
        ],
        ratio: 1,
      },
    ],
    [
      filter.startDate,
      filter.endDate,
      filter.power,
      filter.menuType,
      filter.dataPowerType,
      filter.excelType,
      setFilter,
    ]
  );

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
        columns={UserPowerColumns}
        schema={GET_USER_POWER_SCHEMA}
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
              onClick={() => push("/user/power/add")}
            >
              신규 등록
            </Button>
          ),
        }}
        isTableHeader
        isDragAndDrop
        onRowSelectionChange={setSelectedRowIds}
      />
      <UsePowerDeleteModal open={isDelete} onOpenChange={setIsDelete} />
    </Fragment>
  );
}
