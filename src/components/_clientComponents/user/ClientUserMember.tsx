"use client";

import { Fragment } from "react";

import { Input } from "@/components/Input";

import Filter from "@/components/Filter";

import { DataTable } from "@/components/DataTable";

import { UserMemberSchema } from "@/schema/schema";
import { UserMemberGetRequestType } from "@/lib/network/types";

import UserMemberColumns from "./tableColumns/UserMemberColumns";

import { useFilter } from "@/hooks/useFilter";
import useDebounce from "@/hooks/useDebounce";

const data = [
  {
    id: "1",
    name: "114CEO",
    region: "서울",
    ip: "222.112.162.211",
    date: "2023-10-01",
    state: "use",
    managing: "true",
  },
];

export default function ClientUserMember() {
  const { filter, handleSubmit, handleReset } =
    useFilter<UserMemberGetRequestType>({
      id: "",
    });

  const debouncedIdValue = useDebounce({
    value: filter.id,
    delay: 10,
  });

  console.log(debouncedIdValue);

  const handleFilterSubmit = () => {
    handleSubmit({
      ...filter,
    });
  };

  const handleFilterReset = () => {
    handleReset();
  };

  return (
    <Fragment>
      <div className="mb-4">
        <Filter
          items={[
            {
              title: "아이디",
              inputs: [
                {
                  node: (
                    <Input type="text" placeholder="아이디을 입력해주세요." />
                  ),
                },
              ],
              ratio: 1,
            },
          ]}
          onSubmit={handleFilterSubmit}
          onReset={handleFilterReset}
        />
      </div>
      <DataTable
        data={data}
        columns={UserMemberColumns}
        schema={UserMemberSchema}
        btnArea={{
          primary: "IP등록정보",
        }}
        isExcelDown
        isTableHeader
      />
    </Fragment>
  );
}
