/** 광고 리스트 컬럼 타입 */
export type GET_ADVERTISEMENT_AD_COLUMNS_TYPE = {
  id: number;
  comCd: string;
  advtNo: number;
  srvStGb: "R" | "Y" | "N" | "P" | "D";
  advtNm: string;
  advtStartDt: string;
  regId: string;
  regDtm: string;
  dispOrdNo: number;
};

/** 광고 리스트 요청 타입 */
export type GET_ADVERTISEMENT_AD_REQUEST_TYPE = {
  comCd: string;
  regStartDtm: string;
  regEndDtm: string;
  advtStartDt: string;
  advtEndDt: string;
  srvStGb: "R" | "Y" | "N" | "P" | "D" | "";
  searchType: "all" | "title" | "regId";
  searchKeyword: string;
  pageSize: number;
  pageIndex: number;
  pageOrder: "ASC" | "DESC";
};

/** 광고 리스트 응답 타입 */
export type GET_ADVERTISEMENT_AD_RESPONSE_TYPE = {
  totalCount: number;
  item: {
    advtNo: number;
    comTypCd: string;
    comCd: string;
    advtStartDt: string;
    advtEndDt: string;
    advtNm: string;
    imgOrgName: string;
    imgPath: string;
    imgFileName: string;
    fileSize: number | null;
    advtLink: string | null;
    newWinYn: "" | "Y" | "N" | "R" | null; //TODO. R이랑 null
    advtYn: "Y" | "N" | null;
    srvStGb: "R" | "Y" | "N" | "P" | "D" | "";
    dispOrdNo: number | null;
    regId: string;
    regDtm: string;
    modId: string | null;
    modDtm: string | null;
  }[];
};

/** 광고 상세 음답 타입 */
export type GET_ADVERTISEMENT_AD_DETAIL_RESPONSE_TYPE = {
  advtNo: number;
  advtNm: string;
  imgOrgName: string;
  imgPath: string;
  imgFileName: string;
  fileSize: number | null;
  advtLink: string;
  newWinYn: "" | "Y" | "N" | "R" | null; //TODO. R이랑 null
  advtYn: "Y" | "N" | null;
  srvStGb: "Y" | "N" | "R" | "P" | "D";
  advtStartDt: string;
  advtEndDt: string;
  dispOrdNo: number;
  regId: string;
  regDtm: string;
};

/** 광고 등록 응답 타입 */
export type POST_ADVERTISEMENT_AD_RESPONSE_TYPE = {
  data: {
    advtNo: number;
  };
};

/** 광고 상세 수정 응답 타입 */
export type PUT_ADVERTISEMENT_AD_RESPONSE_TYPE = {
  data: {
    advtNo: number;
  };
};

/** 광고 상세 파일 업로드 응답 타입 */
export type POST_ADVERTISEMENT_AD_FILE_RESPONSE_TYPE = {
  imgFileName: string;
  imgOrgName: string;
  fileSize: number;
};
