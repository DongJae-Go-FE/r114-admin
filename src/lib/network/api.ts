import HttpRequest from "./HttpRequest";

import { z } from "zod";

import { GET_USER_CORPORATION_REQUEST_TYPE } from "@/types/common";

import {
  POST_ADVERTISEMENT_AD_SCHEMA,
  PUT_ADVERTISEMENT_AD_SCHEMA,
  GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA,
  PATCH_ADVERTISEMENT_AD_ORDER_CHANGE_SCHEMA,
} from "@/schema/advertisement/ad/schema";

import {
  POST_BOARD_NOTICE_SCHEMA,
  PUT_BOARD_NOTICE_SCHEMA,
} from "@/schema/board/notice/schema";

import {
  GET_BOARD_NOTICE_REQUEST_TYPE,
  GET_BOARD_NOTICE_RESPONSE_TYPE,
  POST_BOARD_NOTICE_RESPONSE_TYPE,
  PUT_BOARD_NOTICE_RESPONSE_TYPE,
  GET_BOARD_NOTICE_DETAIL_RESPONSE_TYPE,
  POST_BOARD_NOTICE_FILE_RESPONSE_TYPE,
} from "@/types/board/notice/types";

import {
  GET_ADVERTISEMENT_AD_REQUEST_TYPE,
  GET_ADVERTISEMENT_AD_RESPONSE_TYPE,
  GET_ADVERTISEMENT_AD_DETAIL_RESPONSE_TYPE,
  POST_ADVERTISEMENT_AD_RESPONSE_TYPE,
  PUT_ADVERTISEMENT_AD_RESPONSE_TYPE,
  POST_ADVERTISEMENT_AD_FILE_RESPONSE_TYPE,
} from "@/types/advertisement/ad/types";

import { GET_USER_MEMBER_REQUEST_TYPE } from "@/types/user/member/types";
import { GET_USER_POWER_REQUEST_TYPE } from "@/types/user/power/types";
import { GET_USER_CONTRACT_REQUEST_TYPE } from "@/types/user/contract/types";
import { GET_SETTING_MANAGEMENT_REQUEST_TYPE } from "@/types/setting/management/types";

export enum QueryKey {
  USER_CORPORATION_REQUEST,
  USER_MEMBER_REQUEST,
  USER_CONTRACT_REQUEST,
  USER_POWER_REQUEST,
  BOARD_NOTICE_REQUEST,
  BOARD_NOTICE_DETAIL_REQUEST,
  BOARD_NOTICE_DETAIL_FILE_DOWNLOAD_REQUEST,
  ADVERTISEMENT_AD_REQUEST,
  SETTING_MANAGEMENT_REQUEST,
}

export enum MutationKey {}

/** 수정 예정 */
export async function GET_USER_CORPORATION_REQUEST(
  queryString: GET_USER_CORPORATION_REQUEST_TYPE
) {
  return await HttpRequest.get<unknown, GET_USER_CORPORATION_REQUEST_TYPE>(
    "/api/v1/추가예정",
    queryString
  );
}

/** 수정 예정 */
export async function GET_USER_MEMBER_REQUEST(
  queryString: GET_USER_MEMBER_REQUEST_TYPE
) {
  return await HttpRequest.get<unknown, GET_USER_MEMBER_REQUEST_TYPE>(
    "/api/v1/추가예정",
    queryString
  );
}

/** 수정 예정 */
export async function GET_USER_CONTRACT_REQUEST(
  queryString: GET_USER_CONTRACT_REQUEST_TYPE
) {
  return await HttpRequest.get<unknown, GET_USER_CONTRACT_REQUEST_TYPE>(
    "/api/v1/추가예정",
    queryString
  );
}

/** 수정 예정 */
export async function GET_USER_POWER_REQUEST(
  queryString: GET_USER_POWER_REQUEST_TYPE
) {
  return await HttpRequest.get<unknown, GET_USER_POWER_REQUEST_TYPE>(
    "/api/v1/추가예정",
    queryString
  );
}

/** 공지사항 목록 및 총 건수 조회 */
export async function GET_BOARD_NOTICE_REQUEST(
  queryString: GET_BOARD_NOTICE_REQUEST_TYPE
) {
  return await HttpRequest.get<
    GET_BOARD_NOTICE_RESPONSE_TYPE,
    GET_BOARD_NOTICE_REQUEST_TYPE
  >("/api/v1/board/list", queryString, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  });
}

/** 공지사항 삭제 */
export async function DELETE_BOARD_NOTICE_REQUEST({
  postNo,
}: {
  postNo: string;
}) {
  return await HttpRequest.set("DELETE", `/api/v1/board/${postNo}`);
}

/** 공지사항 등록 */
export async function POST_BOARD_NOTICE_REQUEST({
  values,
}: {
  values: z.infer<typeof POST_BOARD_NOTICE_SCHEMA>;
}) {
  return await HttpRequest.set<
    POST_BOARD_NOTICE_RESPONSE_TYPE,
    z.infer<typeof POST_BOARD_NOTICE_SCHEMA>
  >("POST", `/api/v1/board/`, values, {
    "Content-Type": "application/json",
  });
}

/** 공지사항 수정 */
export async function PUT_BOARD_NOTICE_REQUEST({
  values,
  postNo,
}: {
  values: z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>;
  postNo: string;
}) {
  return await HttpRequest.set<
    PUT_BOARD_NOTICE_RESPONSE_TYPE,
    z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>
  >("PUT", `/api/v1/board/${postNo}`, values, {
    "Content-Type": "application/json",
  });
}

/** 공지사항 상세 조회 및 첨부파일 목록 조회 */
export async function GET_BOARD_NOTICE_DETAIL_REQUEST({
  postNo,
}: {
  postNo: string;
}) {
  return await HttpRequest.get<GET_BOARD_NOTICE_DETAIL_RESPONSE_TYPE>(
    `/api/v1/board/${postNo}`,
    "",
    {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    }
  );
}

/** 공지사항 상세 조회 파일 다운로드 */
export async function GET_BOARD_NOTICE_DETAIL_FILE_DOWNLOAD_REQUEST({
  attachNo,
}: {
  attachNo: string;
}) {
  return await HttpRequest.get(`/api/v1/board/download/${attachNo}`);
}

/** 공지사항 파일 업로드 */
export async function POST_BOARD_DETAIL_FILE_UPLOAD_REQUEST({
  values,
}: {
  values: FormData;
}) {
  return await HttpRequest.upload<POST_BOARD_NOTICE_FILE_RESPONSE_TYPE>(
    values,
    { uri: "/api/v1/board/uploadFile" }
  );
}

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

/** 수정 예정 */
export async function GET_SETTING_MANAGEMENT_REQUEST(
  queryString: GET_SETTING_MANAGEMENT_REQUEST_TYPE
) {
  return await HttpRequest.get<unknown, GET_SETTING_MANAGEMENT_REQUEST_TYPE>(
    "/api/v1/추가예정",
    queryString
  );
}
