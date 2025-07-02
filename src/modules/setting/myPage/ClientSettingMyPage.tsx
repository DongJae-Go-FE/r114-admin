"use client";

import { useRouter } from "next/navigation";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import SettingMyPagePasswordChangeModal from "./ui-modal/SettingMyPagePasswordChangeModal";

import SettingMyPageListColumns from "./table-columns/SettingMyPageListColumns";

import { GET_SETTING_MY_PAGE_SCHEMA } from "@/modules/setting/myPage/schema";

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

export default function ClientSettingMyPage() {
  const { back } = useRouter();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="sub-title">나의정보</h4>
        <DescriptionTable>
          <tbody>
            <tr>
              <th colSpan={1}>상태</th>
              <td colSpan={5}>사용중</td>
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
            <td colSpan={5}>HDC LABS</td>
          </tr>
          <tr>
            <th colSpan={1}>사번</th>
            <td colSpan={5}>12345</td>
          </tr>
          <tr>
            <th colSpan={1}>이름</th>
            <td colSpan={5}>이름입니다.</td>
          </tr>
          <tr>
            <th colSpan={1}>소속팀/부서</th>
            <td colSpan={5}>R UNIT</td>
          </tr>
          <tr>
            <th colSpan={1}>이메일 주소</th>
            <td colSpan={5}>R114@hdc-labs.com</td>
          </tr>
        </tbody>
      </DescriptionTable>
      <div>
        <h4 className="sub-title">업데이트 이력</h4>
        <DataTable
          data={data}
          totalCount={data.length}
          schema={GET_SETTING_MY_PAGE_SCHEMA}
          columns={SettingMyPageListColumns}
        />
      </div>
      <div className="btn-area">
        <SettingMyPagePasswordChangeModal />
        <Button
          type="button"
          onClick={() => {
            back();
          }}
        >
          확인
        </Button>
      </div>
    </div>
  );
}
