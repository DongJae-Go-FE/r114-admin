export type CommonResponse<T = unknown> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
};

export type POST_ADMIN_ADD_REQUEST_TYPE = {
  id: string;
  identification: string;
  name: string;
  team: string;
  email: string;
};

export type POST_ADMIN_PASSWORD_CHANGE_REQUEST_TYPE = {
  pw: string;
  newPw: string;
  newPwCheck: string;
};

export type GET_USER_CORPORATION_REQUEST_TYPE = {
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

export type GET_USER_MEMBER_REQUEST_TYPE = {
  startDate: string;
  endDate: string;
  idType: string;
  memberType: string;
  group: string;
  searchKeyword: string;
  searchType: string;
};

export type GET_MEMBER_IP_REQUEST_TYPE = {
  startDate: string;
  endDate: string;
  idType: string;
  memberType: string;
  searchKeyword: string;
  searchType: string;
};

export type GET_USER_CONTRACT_REQUEST_TYPE = {
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

export type GET_USER_POWER_REQUEST_TYPE = {
  startDate: string;
  endDate: string;
  power: string;
  menuType: string;
  dataPowerType: string;
  excelType: string;
};

export type GET_BOARD_NOTICE_REQUEST_TYPE = {
  comCd: string;
  searchKeyword: string;
  searchType?: string;
  searchStartRegDtm: string;
  searchEndRegDtm: string;
  modId: string;
  pageSize: number;
  pageIndex: number;
  pageOrder: string;
};

export type GET_BOARD_NOTICE_RESPONSE_TYPE = {
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

export type POST_BOARD_NOTICE_DETAIL_RESPONSE_TYPE = {
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

export type POST_BOARD_NOTICE_REQUEST_TYPE = {
  comCd: string;
  postTitle: string;
  postContent: string;
  reservePostDtm: string;
  boardAttList: {
    attachNo: number;
  }[];
};

export type PUT_BOARD_NOTICE_REQUEST_TYPE = {
  comCd: string;
  postTitle: string;
  postContent: string;
  reservePostDtm: string;
  boardAttList: {
    attachNo: number;
  }[];
};

export type GET_ADVERTISEMENT_AD_REQUEST_TYPE = {
  dateType: string;
  startDate: string;
  endDate: string;
  service: string;
  state: string;
  order: string;
  searchType: string;
  searchKeyword: string;
};

export type GET_SETTING_MANAGEMENT_REQUEST_TYPE = {
  startDate: string;
  endDate: string;
  adMgmt: string;
  state: string;
  searchType: string;
  search: string;
};
