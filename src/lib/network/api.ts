import HttpRequest from "./HttpRequest";

import { z } from "zod";

import {
  BoardNoticeAddEditSchema,
  AdvertisementAdListAddAndEditSchema,
} from "@/schema/schema";

import {
  UserCorporationGetRequestType,
  UserMemberGetRequestType,
  UserContractGetRequestType,
  UserPowerGetRequestType,
  BoardNoticeRequestType,
  BoardNoticeResponseType,
  BoardNoticePostAndPutType,
  BoardNoticeDetailResponseType,
  AdvertisementAdGetRequestType,
  SettingManagementGetRequestType,
} from "./types";

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
  queryString: UserCorporationGetRequestType
) {
  return await HttpRequest.get<unknown, UserCorporationGetRequestType>(
    "/v1/api/추가예정",
    queryString
  );
}

/** 수정 예정 */
export async function GET_USER_MEMBER_REQUEST(
  queryString: UserMemberGetRequestType
) {
  return await HttpRequest.get<unknown, UserMemberGetRequestType>(
    "/v1/api/추가예정",
    queryString
  );
}

/** 수정 예정 */
export async function GET_USER_CONTRACT_REQUEST(
  queryString: UserContractGetRequestType
) {
  return await HttpRequest.get<unknown, UserContractGetRequestType>(
    "/v1/api/추가예정",
    queryString
  );
}

/** 수정 예정 */
export async function GET_USER_POWER_REQUEST(
  queryString: UserPowerGetRequestType
) {
  return await HttpRequest.get<unknown, UserPowerGetRequestType>(
    "/v1/api/추가예정",
    queryString
  );
}

/** 공지사항 목록 및 총 건수 조회 */
export async function GET_BOARD_NOTICE_REQUEST(
  queryString: BoardNoticeRequestType
) {
  return await HttpRequest.get<BoardNoticeResponseType, BoardNoticeRequestType>(
    "/v1/api/board/list",
    queryString
  );
}

/** 공지사항 삭제 */
export async function DELETE_BOARD_NOTICE_REQUEST({
  postNo,
}: {
  postNo: string;
}) {
  return await HttpRequest.set("DELETE", `/api/v1/board/${postNo}`, {
    "Content-Type": "application/json",
  });
}

/** 공지사항 등록 */
export async function POST_BOARD_NOTICE_REQUEST({
  values,
}: {
  values: z.infer<typeof BoardNoticeAddEditSchema>;
}) {
  return await HttpRequest.set<BoardNoticePostAndPutType>(
    "POST",
    `/api/v1/board`,
    JSON.stringify(values),
    {
      "Content-Type": "application/json",
    }
  );
}

/** 공지사항 수정 */
export async function PUT_BOARD_NOTICE_REQUEST({
  values,
  postNo,
}: {
  values: z.infer<typeof BoardNoticeAddEditSchema>;
  postNo: string;
}) {
  return await HttpRequest.set<BoardNoticePostAndPutType>(
    "PUT",
    `/api/v1/board/${postNo}`,
    JSON.stringify(values),
    {
      "Content-Type": "application/json",
    }
  );
}

/** 공지사항 상세 조회 및 첨부파일 목록 조회 */
export async function GET_BOARD_NOTICE_DETAIL_REQUEST({
  postNo,
}: {
  postNo: string;
}) {
  return await HttpRequest.get<BoardNoticeDetailResponseType>(
    `/v1/api/board/${postNo}`
  );
}

/** 공지사항 상세 조회 파일 다운로드 */
export async function GET_BOARD_NOTICE_DETAIL_FILE_DOWNLOAD_REQUEST({
  attachNo,
}: {
  attachNo: string;
}) {
  return await HttpRequest.get(`/v1/api/board/download/${attachNo}`);
}

/** 공지사항 상세 조회 파일 업로드 TODO.타입 수정헤야함 */
export async function GET_BOARD_NOTICE_FILE_UPLOAD_REQUEST({
  attachNo,
}: {
  attachNo: string;
}) {
  return await HttpRequest.get(`/v1/api/board/download/${attachNo}`);
}

/** 광고 목록 조회 및 총 건수 조회 TODO.타입 수정헤야함 */
export async function GET_ADVERTISEMENT_AD_REQUEST(
  queryString: AdvertisementAdGetRequestType
) {
  return await HttpRequest.get<unknown, AdvertisementAdGetRequestType>(
    "/v1/api/advertise/list",
    queryString
  );
}

/** 광고 상세 조회 TODO.타입 수정헤야함 */
export async function GET_ADVERTISEMENT_AD_DETAIL_REQUEST({
  advtNo,
}: {
  advtNo: string;
}) {
  return await HttpRequest.get<unknown>(`/v1/api/advertise/${advtNo}`);
}

/** 현재 노출중인 광고 목록 조회 TODO.타입 수정헤야함 */
export async function GET_ADVERTISEMENT_AD_ACTIVE_LIST_REQUEST({
  comCd,
}: {
  comCd: string;
}) {
  return await HttpRequest.get<unknown>(`/v1/api/advertise/active/${comCd}`);
}

/** 광고 삭제 TODO.타입 수정헤야함 */
export async function DELETE_ADVERTISEMENT_AD_REQUEST({
  advtNo,
}: {
  advtNo: string;
}) {
  return await HttpRequest.set("DELETE", `/api/v1/advertise/${advtNo}`, {
    "Content-Type": "application/json",
  });
}

/** 광고 등록 TODO.타입 수정헤야함 */
export async function POST_ADVERTISEMENT_AD_REQUEST({
  values,
}: {
  values: z.infer<typeof AdvertisementAdListAddAndEditSchema>;
}) {
  return await HttpRequest.set<unknown>(
    "POST",
    `/api/v1/advertise`,
    JSON.stringify(values),
    {
      "Content-Type": "application/json",
    }
  );
}

/** 공지사항 수정 TODO.타입 수정헤야함 */
export async function PUT_ADVERTISEMENT_AD_REQUEST({
  values,
  advtNo,
}: {
  values: z.infer<typeof AdvertisementAdListAddAndEditSchema>;
  advtNo: string;
}) {
  return await HttpRequest.set<unknown>(
    "PUT",
    `/api/v1/advertise/${advtNo}`,
    JSON.stringify(values),
    {
      "Content-Type": "application/json",
    }
  );
}

/** 광고 순서 변경 TODO.타입 수정헤야함 */
export async function PATCH_ADVERTISEMENT_AD_REQUEST() {
  return await HttpRequest.set<unknown>(
    "PATCH",
    `/api/v1/advertise/changeDisOrdNo`,
    {
      "Content-Type": "application/json",
    }
  );
}

/** 수정 예정 */
export async function GET_SETTING_MANAGEMENT_REQUEST(
  queryString: SettingManagementGetRequestType
) {
  return await HttpRequest.get<unknown, SettingManagementGetRequestType>(
    "/v1/api/추가예정",
    queryString
  );
}
