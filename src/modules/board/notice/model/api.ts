import { z } from "zod";

import HttpRequest from "@/lib/network/HttpRequest";

import {
  POST_BOARD_NOTICE_SCHEMA,
  PUT_BOARD_NOTICE_SCHEMA,
} from "@/modules/board/notice/model/schema";

import {
  GET_BOARD_NOTICE_REQUEST_TYPE,
  GET_BOARD_NOTICE_RESPONSE_TYPE,
  POST_BOARD_NOTICE_RESPONSE_TYPE,
  PUT_BOARD_NOTICE_RESPONSE_TYPE,
  GET_BOARD_NOTICE_DETAIL_RESPONSE_TYPE,
  POST_BOARD_NOTICE_FILE_RESPONSE_TYPE,
} from "@/modules/board/notice/model/types";

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
    `/api/v1/board/${postNo}`
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
