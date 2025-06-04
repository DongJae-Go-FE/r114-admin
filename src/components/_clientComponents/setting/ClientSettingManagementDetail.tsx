"use client";

import { useRouter } from "next/navigation";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import { SettingManagementDetailListSchema } from "@/schema/schema";
import SettingManagementDetailColumns from "./tableColumns/SettingManagementDetailColumns";

const data = [
  {
    date: "2026-05-10 08:50",
    update: "계약상태",
    reason: "계약상태 변경",
    id: "admin",
  },
  {
    date: "2026-05-10 08:50",
    update: "계약상태",
    reason: "계약상태 변경",
    id: "admin",
  },
  {
    date: "2026-05-10 08:50",
    update: "계약상태",
    reason: "계약상태 변경",
    id: "admin",
  },
];

export default function ClientSettingManagementDetail({
  postNo,
}: {
  postNo: string;
}) {
  const { push } = useRouter();

  console.log(postNo);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="sub-title">관리자 정보</h4>
        <DescriptionTable>
          <tbody>
            <tr>
              <th colSpan={1}>상태</th>
              <td colSpan={5}>사용 중</td>
            </tr>
            <tr>
              <th colSpan={1}>관리자 권한</th>
              <td colSpan={5}>하급 관리자</td>
            </tr>
          </tbody>
        </DescriptionTable>
      </div>

      <DescriptionTable>
        <tbody>
          <tr>
            <th colSpan={1}>아이디</th>
            <td colSpan={5}>masterforce999</td>
          </tr>
          <tr>
            <th colSpan={1}>사번</th>
            <td colSpan={5}>123456</td>
          </tr>
          <tr>
            <th colSpan={1}>이름</th>
            <td colSpan={5}>가포스</td>
          </tr>
          <tr>
            <th colSpan={1}>이메일</th>
            <td colSpan={5}>masterforce999@hihi.com</td>
          </tr>
        </tbody>
      </DescriptionTable>
      <div>
        <h4 className="sub-title">업데이트 이력</h4>
        <DataTable
          data={data}
          schema={SettingManagementDetailListSchema}
          columns={SettingManagementDetailColumns}
          isTableHeader={false}
        />
      </div>
      <div className="btn-area">
        <Button
          type="button"
          color="white"
          onClick={() => push("/setting/management")}
        >
          목록
        </Button>
        <Button
          type="button"
          onClick={() => push(`/setting/management/${postNo}/edit`)}
        >
          수정
        </Button>
      </div>
    </div>
  );
}
