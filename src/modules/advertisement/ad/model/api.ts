import { z } from "zod";

import HttpRequest from "@/lib/network/HttpRequest";

import {
  POST_ADVERTISEMENT_AD_SCHEMA,
  PUT_ADVERTISEMENT_AD_SCHEMA,
  GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA,
  PATCH_ADVERTISEMENT_AD_ORDER_CHANGE_SCHEMA,
} from "./schema";

import {
  GET_ADVERTISEMENT_AD_REQUEST_TYPE,
  GET_ADVERTISEMENT_AD_RESPONSE_TYPE,
  GET_ADVERTISEMENT_AD_DETAIL_RESPONSE_TYPE,
  POST_ADVERTISEMENT_AD_RESPONSE_TYPE,
  PUT_ADVERTISEMENT_AD_RESPONSE_TYPE,
  POST_ADVERTISEMENT_AD_FILE_RESPONSE_TYPE,
} from "./types";

/** 광고 목록 조회 및 총 건수  */
export async function GET_ADVERTISEMENT_AD_REQUEST(
  queryString: GET_ADVERTISEMENT_AD_REQUEST_TYPE
) {
  return await HttpRequest.get<
    GET_ADVERTISEMENT_AD_RESPONSE_TYPE,
    GET_ADVERTISEMENT_AD_REQUEST_TYPE
  >("/api/v1/advertise/list", queryString);
}

/** 광고 상세 조회 */
export async function GET_ADVERTISEMENT_AD_DETAIL_REQUEST({
  advtNo,
}: {
  advtNo: string;
}) {
  return await HttpRequest.get<GET_ADVERTISEMENT_AD_DETAIL_RESPONSE_TYPE>(
    `/api/v1/advertise/${advtNo}`
  );
}

/** 현재 노출중인 광고 목록 조회 */
export async function GET_ADVERTISEMENT_AD_ACTIVE_LIST_REQUEST({
  comCd,
}: {
  comCd: string;
}) {
  return await HttpRequest.get<
    z.infer<typeof GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA>[]
  >(`/api/v1/advertise/active/${comCd}`);
}

/** 광고 삭제 */
export async function DELETE_ADVERTISEMENT_AD_REQUEST({
  advtNo,
}: {
  advtNo: string;
}) {
  return await HttpRequest.set("DELETE", `/api/v1/advertise/${advtNo}`, {
    "Content-Type": "application/json",
  });
}

/** 광고 등록  */
export async function POST_ADVERTISEMENT_AD_REQUEST({
  values,
}: {
  values: z.infer<typeof POST_ADVERTISEMENT_AD_SCHEMA>;
}) {
  return await HttpRequest.set<
    POST_ADVERTISEMENT_AD_RESPONSE_TYPE,
    z.infer<typeof POST_ADVERTISEMENT_AD_SCHEMA>
  >("POST", `/api/v1/advertise/`, values, {
    "Content-Type": "application/json",
  });
}

/** 광고 파일 업로드 */
export async function POST_ADVERTISEMENT_AD_DETAIL_FILE_UPLOAD_REQUEST({
  values,
}: {
  values: FormData;
}) {
  return await HttpRequest.upload<POST_ADVERTISEMENT_AD_FILE_RESPONSE_TYPE>(
    values,
    { uri: "/api/v1/advertise/uploadFile" }
  );
}

/** 광고 수정 */
export async function PUT_ADVERTISEMENT_AD_REQUEST({
  values,
  advtNo,
}: {
  values: z.infer<typeof PUT_ADVERTISEMENT_AD_SCHEMA>;
  advtNo: string;
}) {
  return await HttpRequest.set<
    PUT_ADVERTISEMENT_AD_RESPONSE_TYPE,
    z.infer<typeof PUT_ADVERTISEMENT_AD_SCHEMA>
  >("PUT", `/api/v1/advertise/${advtNo}`, values, {
    "Content-Type": "application/json",
  });
}

/** 광고 순서 변경 */
export async function PATCH_ADVERTISEMENT_AD_REQUEST(
  value: z.infer<typeof PATCH_ADVERTISEMENT_AD_ORDER_CHANGE_SCHEMA>
) {
  return await HttpRequest.set<
    z.infer<typeof PATCH_ADVERTISEMENT_AD_ORDER_CHANGE_SCHEMA>
  >("PATCH", `/api/v1/advertise/changeDisOrdNo`, value, {
    "Content-Type": "application/json",
  });
}
