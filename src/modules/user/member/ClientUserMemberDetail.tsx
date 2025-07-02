"use client";

import { useRouter } from "next/navigation";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import UserMemberDetailColumns from "./table-columns/UserMemberDetailColumns";

import { GET_USER_MEMBER_DETAIL_LIST_SCHEMA } from "@/modules/user/member/model/schema";

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

export default function ClientUserMemberDetail({ postNo }: { postNo: string }) {
  const { push } = useRouter();

  console.log(postNo);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h4 className="sub-title">회원 정보</h4>
        <DescriptionTable>
          <tbody>
            <tr>
              <th colSpan={1}>회원 상태</th>
              <td colSpan={5}>사용중</td>
            </tr>
            <tr>
              <th colSpan={1}>계정 구분</th>
              <td colSpan={5}>회원</td>
            </tr>
            <tr>
              <th colSpan={1}>계약 코드</th>
              <td colSpan={5}>20240508-C-0001</td>
            </tr>
            <tr>
              <th colSpan={1}>계약 상태</th>
              <td colSpan={5}>계약 대기</td>
            </tr>
            <tr>
              <th colSpan={1}>최근 계약 일자</th>
              <td colSpan={5}>2025-05-10</td>
            </tr>
            <tr>
              <th colSpan={1}>회원명</th>
              <td colSpan={5}>가나다 컴퍼니</td>
            </tr>
            <tr>
              <th colSpan={1}>서비스 사용 기간</th>
              <td colSpan={5}>2025-05-10 ~ 2025-05-10</td>
            </tr>
            <tr>
              <th colSpan={1}>아이디</th>
              <td colSpan={5}>admin</td>
            </tr>
            <tr>
              <th colSpan={1}>이메일 주소</th>
              <td colSpan={5}>masterforce999@hdc-labs.com</td>
            </tr>
            <tr>
              <th colSpan={1}>휴대폰 번호</th>
              <td colSpan={5}>010-1111-0000</td>
            </tr>
            <tr>
              <th colSpan={1}>IP 발급 개수(사용/전체)</th>
              <td colSpan={5}>1/5</td>
            </tr>
            <tr>
              <th colSpan={1}>권한 설정</th>
              <td colSpan={5}>회원1</td>
            </tr>
          </tbody>
        </DescriptionTable>
      </div>

      <div>
        <h4 className="sub-title">업데이트 이력</h4>
        <DataTable
          data={data}
          totalCount={data.length}
          schema={GET_USER_MEMBER_DETAIL_LIST_SCHEMA}
          columns={UserMemberDetailColumns}
          isTableHeader={false}
        />
      </div>
      <div className="btn-area">
        <Button
          type="button"
          color="white"
          onClick={() => push("/user/member")}
        >
          목록
        </Button>
        <Button
          type="button"
          onClick={() => push(`/user/member/${postNo}/edit`)}
        >
          수정
        </Button>
      </div>
    </div>
  );
}
