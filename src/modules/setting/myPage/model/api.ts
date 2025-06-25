import HttpRequest from "@/lib/network/HttpRequest";

/** 관리자 계정/권한 관리 계정 상태 비밀번호 초기화 TODO. 수정 예정 */
export async function PUT_SETTING_MANAGEMENT_RESET_PASSWORD_REQUEST({
  adminCd,
  values,
}: {
  adminCd: string;
  values: unknown;
}) {
  return await HttpRequest.set<unknown, unknown>(
    "PUT",
    `/api/v1/admin/reset-password/${adminCd}`,
    values,
    {
      "Content-Type": "application/json",
    }
  );
}

/** 관리자 계정/권한 관리 계정 상태 비밀번호 변경 TODO. 수정 예정 */
export async function PATCH_SETTING_MANAGEMENT_CHANGE_PASSWORD_REQUEST({
  values,
}: {
  values: unknown;
}) {
  return await HttpRequest.set<unknown, unknown>(
    "PUT",
    `/api/v1/admin/me/password`,
    values,
    {
      "Content-Type": "application/json",
    }
  );
}
