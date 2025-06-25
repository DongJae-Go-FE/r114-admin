import HttpRequest from "@/lib/network/HttpRequest";

import { GET_SETTING_MANAGEMENT_REQUEST_TYPE } from "./types";

/** 관리자 계정/권한 관리 목록 조회 TODO. 수정 예정 */
export async function GET_SETTING_MANAGEMENT_REQUEST(
  queryString: GET_SETTING_MANAGEMENT_REQUEST_TYPE
) {
  return await HttpRequest.get<unknown, GET_SETTING_MANAGEMENT_REQUEST_TYPE>(
    "/api/v1/admin/list",
    queryString
  );
}

/** 관리자 계정/권한 관리 상세 조회 TODO. 수정 예정 */
export async function GET_SETTING_MANAGEMENT_DETAIL_REQUEST({
  adminCd,
}: {
  adminCd: string;
}) {
  return await HttpRequest.get<unknown>(`/api/v1/admin/${adminCd}`);
}

/** 관리자 계정/권한 관리 등록 TODO. 수정 예정 */
export async function POST_SETTING_MANAGEMENT_REQUEST({
  values,
}: {
  values: unknown;
}) {
  return await HttpRequest.set<unknown, unknown>(
    "POST",
    `/api/v1/admin/`,
    values,
    {
      "Content-Type": "application/json",
    }
  );
}

/** 관리자 계정/권한 관리 계정 중복 여부 조회 TODO. 수정 예정 */
export async function GET_SETTING_MANAGEMENT_DUPLICATE_REQUEST(id: string) {
  return await HttpRequest.get<unknown, unknown>(
    `/api/v1/admin/duplicate-id/${id}`
  );
}

/** 관리자 계정/권한 관리 계정 승인 TODO. 수정 예정 */
export async function PATCH_SETTING_MANAGEMENT_ID_APPROVE_REQUEST({
  values,
}: {
  values: unknown;
}) {
  return await HttpRequest.set<unknown, unknown>(
    "PATCH",
    `/api/v1/admin/approve`,
    values,
    {
      "Content-Type": "application/json",
    }
  );
}

/** 관리자 계정/권한 관리 비빌번호 초기화 TODO. 수정 예정 */
export async function PUT_SETTING_MANAGEMENT_PASSWORD_RESET_REQUEST(
  adminCd: string
) {
  return await HttpRequest.set<unknown, unknown>(
    "PUT",
    `/api/v1/admin/reset-password/${adminCd}`,
    {
      "Content-Type": "application/json",
    }
  );
}

/** 관리자 계정/권한 관리 계정 수정 TODO. 수정 예정 */
export async function PATCH_SETTING_MANAGEMENT_REQUEST({
  values,
}: {
  values: unknown;
}) {
  return await HttpRequest.set<unknown, unknown>(
    "PATCH",
    `/api/v1/admin`,
    values,
    {
      "Content-Type": "application/json",
    }
  );
}

/** 관리자 계정/권한 관리 계정 삭제 TODO. 수정 예정 */
export async function DELETE_SETTING_MANAGEMENT_REQUEST({
  values,
}: {
  values: unknown;
}) {
  return await HttpRequest.set<unknown, unknown>(
    "DELETE",
    `/api/v1/admin`,
    values,
    {
      "Content-Type": "application/json",
    }
  );
}

/** 관리자 계정/권한 관리 계정 권한 변경 TODO. 수정 예정 */
export async function PATCH_SETTING_MANAGEMENT_AUTH_REQUEST({
  values,
}: {
  values: unknown;
}) {
  return await HttpRequest.set<unknown, unknown>(
    "PATCH",
    `/api/v1/admin`,
    values,
    {
      "Content-Type": "application/json",
    }
  );
}

/** 관리자 계정/권한 관리 계정 업데이트 이력 조회 TODO. 수정 예정 */
export async function GET_SETTING_MANAGEMENT_LOG_REQUEST(adminCd: string) {
  return await HttpRequest.get<unknown, unknown>(
    `/api/v1/admin/log/${adminCd}`
  );
}

/** 관리자 계정/권한 관리 계정 상태 / 권한 목록 조회 TODO. 수정 예정 */
export async function GET_SETTING_MANAGEMENT_CODE_REQUEST() {
  return await HttpRequest.get<unknown, unknown>(`/api/v1/admin/code`);
}
