import { z } from "zod";

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

