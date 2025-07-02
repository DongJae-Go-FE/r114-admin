import HttpRequest from "@/lib/network/HttpRequest";

import { GET_USER_MEMBER_REQUEST_TYPE } from "./types";

/** 수정 예정 */
export async function GET_USER_MEMBER_REQUEST(
  queryString: GET_USER_MEMBER_REQUEST_TYPE
) {
  return await HttpRequest.get<unknown, GET_USER_MEMBER_REQUEST_TYPE>(
    "/api/v1/추가예정",
    queryString
  );
}
