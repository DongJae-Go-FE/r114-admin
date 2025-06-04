"use client";

import { useRouter } from "next/navigation";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import { UserContractDetailList } from "@/schema/schema";
import UserContractDetailColumns from "./tableColumns/UserContractDetailColumns";

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

export default function ClientUserContractDetail({
  postNo,
}: {
  postNo: string;
}) {
  const { push } = useRouter();

  console.log(postNo);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="sub-title">계약정보</h4>
        <DescriptionTable>
          <tbody>
            <tr>
              <th colSpan={1}>계약코드</th>
              <td colSpan={5}>자동입력</td>
            </tr>
            <tr>
              <th colSpan={1}>최근 계약 일자</th>
              <td colSpan={5}></td>
            </tr>
            <tr>
              <th colSpan={1}>계약 상태</th>
              <td colSpan={5}></td>
            </tr>
          </tbody>
        </DescriptionTable>
      </div>

      <DescriptionTable>
        <tbody>
          <tr>
            <th colSpan={1}>사업자 등록번호</th>
            <td colSpan={5}></td>
          </tr>
          <tr>
            <th colSpan={1}>사업자 구분</th>
            <td colSpan={5}></td>
          </tr>
          <tr>
            <th colSpan={1}>사업자 명</th>
            <td colSpan={5}></td>
          </tr>
          <tr>
            <th colSpan={1}>업종 구분1</th>
            <td colSpan={2}></td>
            <th colSpan={1}>업종 구분2</th>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <th colSpan={1}>사업자 등록증</th>
            <td colSpan={5}>
              <a download>파일</a>
            </td>
          </tr>
        </tbody>
      </DescriptionTable>
      <div>
        <h4 className="sub-title">업데이트 이력</h4>
        <DataTable
          data={data}
          schema={UserContractDetailList}
          columns={UserContractDetailColumns}
          isTableHeader={false}
        />
      </div>
      <div className="btn-area">
        <Button
          type="button"
          color="white"
          onClick={() => push("/user/contract")}
        >
          목록
        </Button>
        <Button
          type="button"
          onClick={() => push(`/user/contract/${postNo}/edit`)}
        >
          수정
        </Button>
      </div>
    </div>
  );
}
