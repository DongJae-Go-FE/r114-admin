/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  UserCorporationSchema,
  UserMemberSchema,
  UserContractSchema,
  BoardNoticeSchema,
  AdvertisementAdSchema,
} from "@/schema/schema";
/* eslint-enable @typescript-eslint/no-unused-vars */

export type CommonResponse<T = unknown> = {
  success: boolean;
  code: string;
  message: string;
  data: T;
};

export type AdminAddType = {
  id: string;
  identification: string;
  name: string;
  team: string;
  email: string;
};

export type PasswordChangeType = {
  pw: string;
  newPw: string;
  newPwCheck: string;
};

/**
 * @description /user/corporation - 회원 관리 / 법인 목록
 * @see UserCorporationSchema - Schema
 */
export type UserCorporationGetRequestType = {
  /**
   * 최근 업데이트 시작 일자
   * @description 최근 업데이트 시작 일자
   */
  startDate: string;

  /**
   * 최근 업데이트 종료 일자
   * @description 최근 업데이트 종료 일자
   */
  endDate: string;

  /**
   * 사업자 구분
   * @description 사업자 구분
   */
  business: string;

  /**
   * 회원 구분
   * @description 회원 구분
   */
  member: string;

  /**
   * 계약 구분
   * @description 계약 구분
   */
  contract: string;

  /**
   * 업종 구분1
   * @description 업종 구분1
   */
  industry1: string;

  /**
   * 업종 구분2
   * @description 업종 구분2
   */
  industry2: string;

  /**
   * 계약 코드
   * @description 계약 코드
   */
  code: string;
};

/**
 * @description /user/member - 회원 관리 / 회원 목록
 * @see UserMemberSchema - Schema
 */
export type UserMemberGetRequestType = {
  /**
   * 아이디
   * @description 아이디
   */
  id: string;
};

/**
 * @description /user/contract - 회원 관리 / 회원 관리
 * @see UserContractSchema - Schema
 */
export type UserContractGetRequestType = {
  startDate: string;
  endDate: string;
  memberType: string;
  corporationType: string;
  contractType: string;
  industry1: string;
  industry2: string;
  searchType: string;
  searchKeyword: string;
};

/**
 * @description /user/power - 회원 관리 / 권한 관리
 * @see UserPowerSchema - Schema
 */
export type UserPowerGetRequestType = {
  startDate: string;
  endDate: string;
  power: string;
  menuType: string;
  dataPowerType: string;
  excelType: string;
};

/**
 * @description /board/notice - 게시판 관리 / 공지사항 관리
 * @see BoardNoticeSchema - Schema
 */
export type BoardNoticeRequestType = {
  comCd: string;
  searchKeyword: string;
  searchType: string;
  searchStartRegDtm: string;
  searchEndRegDtm: string;
  modId: string;
  pageSize: string;
  pageIndex: string;
  pageOrder: string;
};

export type BoardNoticeResponseType = {
  totalCount: number;
  items: {
    postNo: number;
    boardId: string;
    comTypeCd?: string;
    comCd: string;
    postLevel?: number;
    postTitle: string;
    postContent?: string;
    reservePostDtm?: string;
    topFixYn: "Y" | "N";
    firstYn: "Y" | "N";
    delYn?: string;
    delDtm?: string;
    blockYn?: string;
    readCnt?: number;
    modCnt?: number;
    ipAddr?: string;
    attr?: string;
    regId: string;
    regDtm: string;
    modId?: string;
    modDtm?: string;
    nowDtm: string;
    attachCnt: string;
  }[];
};

export type BoardNoticeDetailResponseType = {
  postNo: number;
  boardId: string;
  postTitle: string;
  postContent: string;
  reservePostDtm?: string;
  nowDtm: string;
  regId: string;
  regNm: string;
  dispRegDtm: string;
  regDtm: string;
  attachments: {
    attachNo: number;
    attachType: string;
    attachOrgName: string;
    attachPath?: string;
    attachFileName: string;
    fileExt: string;
    fileSize: number;
  }[];
};
export type BoardNoticePostAndPutType = {
  comCd: string;
  postTitle: string;
  postContent: string;
  reservePostDtm: string;
  boardAttList: {
    attachNo: number;
  }[];
};

/**
 * @description /advertisement/ad-list - 광고 관리 / 광고 목록
 * @see AdvertisementAdSchema - Schema
 */
export type AdvertisementAdGetRequestType = {
  dateType: string;
  startDate: string;
  endDate: string;
  service: string;
  state: string;
  order: string;
  searchType: string;
  searchKeyword: string;
};

export type SettingManagementGetRequestType = {
  startDate: string;
  endDate: string;
  adMgmt: string;
  state: string;
  searchType: string;
  search: string;
};
