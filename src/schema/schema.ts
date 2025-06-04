/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  UserCorporationGetRequestType,
  UserMemberGetRequestType,
  UserContractGetRequestType,
  BoardNoticeRequestType,
  AdvertisementAdGetRequestType,
} from "@/lib/network/types";
/* eslint-enable @typescript-eslint/no-unused-vars */

import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  INPUT_MAX_LENGTH,
  TXT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/const/const";

//TODO. 추후 주석 작업 필요

/**
 * @description /login - 로그인
 */
export const LoginSchema = z.object({
  id: z.string().min(6).max(22),
  password: z.string().min(6).max(22),
  isIdSave: z.boolean({ coerce: false }),
});

export const LoginMemberAddSchema = z.object({
  id: z.string().min(6).max(22),
  identification: z.string().min(6).max(22),
  name: z.string().min(6).max(22),
  team: z.string().min(6).max(22),
  email: z.string().min(6).max(22),
});

/**
 * @description /user/corporation - 회원 관리 / 법인 목록
 * @see UserCorporationGetRequestType - Type
 */
export const UserCorporationSchema = z.object({
  /**
   * 고유 아이디
   * @description 고유 아이디
   */
  id: z.number(),

  /**
   * 계약 코드
   * @description 계약 코드
   */
  code: z.string(),

  /**
   * 사업자 구분
   * @description 사업자 구분
   */
  business: z.string(),

  /**
   * 회원 구분
   * @description 회원 구분
   */
  member: z.string(),

  /**
   * 계약 구분
   * @description 계약 구분
   */
  contract: z.string(),

  /**
   * 계약 구분
   * @description 계약 구분
   */
  name: z.string(),

  /**
   * 업종 구분1
   * @description 업종 구분1
   */
  industry1: z.string(),

  /**
   * 업종 구분2
   * @description 업종 구분2
   */
  industry2: z.string(),
});

/**
 * @description /user/member - 회원 관리 / 회원 목록
 * @see UserMemberGetRequestType - type
 */
export const UserMemberSchema = z.object({
  id: z.string(),
  state: z.string(),
  name: z.string(),
  region: z.string(),
  ip: z.string(),
  date: z.string(),
  managing: z.string(),
});

/**
 * @description /user/member - 회원 관리 / 회원 목록 / 확인 버튼
 * @see UserMemberGetRequestType - type
 */
export const UserMemberModalSchema = z.object({
  id: z.string(),
  loginData: z.string(),
  date: z.string(),
});

/**
 * @description /user/contract - 회원 관리 / 회원 관리
 * @see UserContractGetRequestType - type
 */
export const UserContractSchema = z.object({
  id: z.number(),
  code: z.string(),
  memberType: z.string(),
  contractType: z.string(),
  name: z.string(),
  industry1: z.string(),
  industry2: z.string(),
  contractState: z.string(),
  date: z.string(),
});

/**
 * @description /user/contract/add - 회원 관리 / 회원 관리 / 사용자 등록, 수정
 */
export const UserContractIndividualAdd = z.object({
  code: z.string(),
  date: z.string(),
  contract: z.string(),
  member: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  divide1: z.string(),
  divide2: z.string(),
});

export const UserContractCorporationIndividualAdd = z.object({
  code: z.string(),
  date: z.string(),
  contract: z.string(),
  business: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  member: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  divide1: z.string(),
  divide2: z.string(),
  file: z.string().nonempty({ message: REQUIRED_FIELD_MESSAGE }),
});

export const UserContractDetailList = z.object({
  date: z.string(),
  update: z.string(),
  reason: z.string(),
  id: z.string(),
});

export const UserContractEdit = z.object({
  code: z.string(),
  date: z.string(),
  contract: z.string(),
  business: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  member: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  divide1: z.string(),
  divide2: z.string(),
  file: z.string().nonempty({ message: REQUIRED_FIELD_MESSAGE }),
  reason: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(TXT_MAX_LENGTH, {
      message: `최대 ${TXT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
});

/**
 * @description /user/power - 회원 관리 / 권한 관리
 * @see UserPowerGetRequestType - type
 */
export const UserPowerSchema = z.object({
  id: z.number(),
  power: z.string(),
  dataPowerType: z.string(),
  menuType: z.string(),
  excelType: z.string(),
  date: z.string(),
});

export const UserPowerAddAndEditSchema = z.object({
  name: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  menu: z.string(),
  data: z.string(),
  excel: z.string(),
  menuPower: z.array(z.string()).optional(),
});

/**
 * @description /user/mgmt - 회원 관리 / 회원 관리 / 수정 / 수정이력 보기
 */
export const UserMgmtEditHistoryModalSchema = z.object({
  id: z.number(),
  date: z.string(),
  item: z.string(),
  name: z.string(),
  person: z.string(),
});

/**
 * @description /user/mgmt - 회원 관리 / 회원 관리 / 사용이력
 */
export const UserMgmtModalMenuSchema = z.object({
  id: z.number(),
  menu: z.string(),
  count: z.string(),
});

/**
 * @description /user/mgmt - 회원 관리 / 회원 관리 / 사용이력
 */
export const UserMgmtModalDaySchema = z.object({
  id: z.number(),
  menu: z.string(),
  date: z.string(),
});

/**
 * @description /board/notice - 게시판 관리 / 공지사항 관리
 * @see BoardNoticeRequestType - type
 */
export const BoardNoticeSchema = z.object({
  id: z.number(),
  postNo: z.number(),
  boardId: z.string(),
  parentPostNo: z.number(),
  firstPostNo: z.number(),
  postLevel: z.number(),
  postTitle: z.string(),
  postContent: z.string().optional(),
  reservePostDtm: z.string().optional(),
  postStartDtm: z.string().optional(),
  postEndDtm: z.string().optional(),
  topFixYn: z.string(),
  firstYn: z.string(),
  delYn: z.string().optional(),
  delDtm: z.string().optional(),
  blockYn: z.string().optional(),
  blockReason: z.string().optional(),
  blockDtm: z.string().optional(),
  readCnt: z.number(),
  modCnt: z.number(),
  ipAddr: z.string().optional(),
  attr: z.string(),
  regId: z.string(),
  regMenuId: z.string().optional(),
  regDtm: z.string(),
  modId: z.string().optional(),
  modMenuId: z.string().optional(),
  modDtm: z.string().optional(),
  nowDtm: z.string(),
  regNm: z.string(),
  dispRegDtm: z.string(),
});

/**
 * @description /board/notice - 게시판 관리 / 공지사항 관리 / 글쓰기
 */
export const BoardNoticeAddEditSchema = z.object({
  date: z.string(),
  writer: z.string(),
  service: z.string(),
  title: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  content: z.string().nonempty({ message: REQUIRED_FIELD_MESSAGE }),
  file: z.string().optional(),
  reservation: z.boolean(),
  time: z.string().optional(),
});

/**
 * @description /advertisement/ad-list - 광고 관리 / 광고 목록
 * @see AdvertisementAdGetRequestType - type
 */
export const AdvertisementAdSchema = z.object({
  id: z.number(),
  service: z.string(),
  number: z.string(),
  state: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  writer: z.string(),
  date: z.string(),
  order: z.string(),
});

/**
 * @description /advertisement/ad-list - 광고 관리 / 광고 순서 변경
 */
export const AdvertisementAdChangeOrderSchema = z.object({
  id: z.number(),
  order: z.string(),
  state: z.string(),
  title: z.string(),
});

/**
 * @description /advertisement/ad-list - 광고 관리 / 광고 목록 / 등록, 수정
 */
export const AdvertisementAdListAddAndEditSchema = z.object({
  title: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  date: z.string(),
  writer: z.string(),
  isOpen: z.boolean(),
  file: z.string(),
  link: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  service: z.string(),
  isStop: z.boolean(),
  order: z.string().optional(),
});

export const SettingManagementSchema = z.object({
  id: z.number(),
  memberId: z.string(),
  name: z.string(),
  team: z.string(),
  adMgmt: z.string(),
  state: z.string(),
  date: z.string(),
});

export const SettingManagementDetailListSchema = z.object({
  date: z.string(),
  update: z.string(),
  reason: z.string(),
  id: z.string(),
});

export const SettingManagementEditSchema = z.object({
  state: z.string(),
  adMgmt: z.string(),
  content: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(TXT_MAX_LENGTH, {
      message: `최대 ${TXT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
});

export const SettingMyPageListSchema = z.object({
  date: z.string(),
  update: z.string(),
  reason: z.string(),
  id: z.string(),
});

export const SettingMyPageIdChangeSchema = z
  .object({
    pw: z
      .string()
      .nonempty({ message: REQUIRED_FIELD_MESSAGE })
      .min(PASSWORD_MIN_LENGTH, {
        message: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}이상 입력해주세요.`,
      })
      .max(PASSWORD_MAX_LENGTH, {
        message: `최대 ${PASSWORD_MAX_LENGTH}글자 이하로 입력해주세요`,
      }),
    newPw: z
      .string()
      .nonempty({ message: REQUIRED_FIELD_MESSAGE })
      .min(INPUT_MIN_LENGTH, {
        message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
      })
      .max(TXT_MAX_LENGTH, {
        message: `최대 ${TXT_MAX_LENGTH}글자 이하로 입력해주세요`,
      }),
    newPwCheck: z
      .string()
      .nonempty({ message: REQUIRED_FIELD_MESSAGE })
      .min(INPUT_MIN_LENGTH, {
        message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
      })
      .max(TXT_MAX_LENGTH, {
        message: `최대 ${TXT_MAX_LENGTH}글자 이하로 입력해주세요`,
      }),
  })
  .superRefine((data, ctx) => {
    if (data.newPw !== data.newPwCheck) {
      ctx.addIssue({
        path: ["newPwCheck"],
        code: z.ZodIssueCode.custom,
        message: "변경 비밀번호가 일치하지 않습니다.",
      });
    }
  });

/** 백업 */
export const MgmtMainSchema2 = z.object({
  id: z.number(),
  status: z.boolean(),
  corporation: z.string(),
  name: z.string(),
  loginCount: z.string(),
  connection: z.string().optional(),
  contract: z.string(),
  contractStart: z.string(),
  contractEnd: z.string(),
  ipCount: z.string(),
  ipLimit: z.string(),
  contractDivision: z.string(),
  authority: z.string(),
  connectionCount: z.string(),
});
