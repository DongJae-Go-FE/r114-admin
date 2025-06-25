/** 공지사항 리스트 컬럼 타입 */
export type GET_BOARD_NOTICE_COLUMNS_TYPE = {
  id: number;
  postNo: number;
  comCd: string;
  postTitle: string;
  regNm: string;
  regId: string;
  regDtm: string;
};

/** 공지사항 리스트 요청 타입 */
export type GET_BOARD_NOTICE_REQUEST_TYPE = {
  comCd: string;
  searchType: "all" | "title" | "regId";
  searchKeyword: string;
  searchStartRegDtm: string;
  searchEndRegDtm: string;
  modId: string;
  pageSize: number;
  pageIndex: number;
  pageOrder: string;
};

/** 공지사항 리스트 응답 타입 */
export type GET_BOARD_NOTICE_RESPONSE_TYPE = {
  totalCount: number;
  items: {
    postNo: number;
    boardId: string;
    comTypCd: string;
    comCd: string;
    postLevel?: number | null;
    postTitle: string;
    postContent?: string | null;
    reservePostDtm?: string | null;
    topFixYn: string;
    firstYn: string;
    delYn?: string | null;
    delDtm?: string | null;
    blockYn?: string | null;
    readCnt?: number | null;
    modCnt?: number | null;
    ipAddr?: string | null;
    attr?: string | null;
    regId: string;
    regNm: string;
    regDtm: string;
    modId?: string | null;
    modDtm?: string | null;
    nowDtm: string;
    attachCnt: string;
  }[];
};

/** 공지사항 상세 응답 타입 */
export type GET_BOARD_NOTICE_DETAIL_RESPONSE_TYPE = {
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

/** 공지사항 등록 응답 타입 */
export type POST_BOARD_NOTICE_RESPONSE_TYPE = {
  data: {
    postNo: number;
  };
};

/** 공지사항 수정 응답 타입 */
export type PUT_BOARD_NOTICE_RESPONSE_TYPE = {
  data: {
    postNo: number;
  };
};

/** 공지사항 상세 파일 업로드 응답 타입 */
export type POST_BOARD_NOTICE_FILE_RESPONSE_TYPE = {
  attachNo: number;
  attachFileName: string;
  attachOrgName: string;
}[];
