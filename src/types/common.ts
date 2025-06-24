export type CommonResponse<T = unknown> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
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
