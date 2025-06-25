import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  INPUT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
  ESSENTIAL_REQUIRED_FIELD_MESSAGE,
} from "@/lib/const";

export const GET_ADVERTISEMENT_AD_SCHEMA = z.object({
  id: z.number(),
  advtNo: z.number(),
  comTypCd: z.string(),
  comCd: z.string(),
  advtStartDt: z.string(),
  advtEndDt: z.string(),
  advtNm: z.string(),
  imgOrgName: z.string(),
  imgPath: z.string(),
  imgFileName: z.string(),
  fileSize: z.nullable(z.number()),
  advtLink: z.string().nullable(),
  newWinYn: z
    .union([z.literal(""), z.literal("Y"), z.literal("N"), z.literal("R")])
    .nullable(),
  //TODO. R이랑 nullable DBA 처리 요청
  advtYn: z.union([z.literal("Y"), z.literal("N")]).nullable(),
  srvStGb: z.union([
    z.literal(""),
    z.literal("Y"),
    z.literal("N"),
    z.literal("R"),
    z.literal("P"),
    z.literal("D"),
  ]),
  dispOrdNo: z.number().nullable(),
  regId: z.string(),
  regDtm: z.string(),
  modId: z.string().nullable(),
  modDtm: z.string().nullable(),
});

export const GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA = z.object({
  id: z.number(),
  advtNo: z.number(),
  advtNm: z.string(),
  srvStGb: z.union([
    z.literal(""),
    z.literal("Y"),
    z.literal("N"),
    z.literal("R"),
    z.literal("P"),
    z.literal("D"),
  ]),
  srvStGbNm: z.string(),
  dispOrdNo: z.number(),
});

export const POST_ADVERTISEMENT_AD_SCHEMA = z.object({
  comCd: z.string(),
  advtStartDt: z.string(),
  advtEndDt: z.string(),
  advtNm: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  imgOrgName: z.string(),
  imgFileName: z
    .string()
    .nonempty({ message: ESSENTIAL_REQUIRED_FIELD_MESSAGE }),
  fileSize: z.number(),
  advtLink: z.string().nonempty({ message: REQUIRED_FIELD_MESSAGE }),
  newWinYn: z
    .union([z.literal(""), z.literal("Y"), z.literal("N"), z.literal("R")])
    .nullable(),
  advtYn: z.union([z.literal("Y"), z.literal("N")]).nullable(),
  srvStGb: z.union([
    z.literal(""),
    z.literal("Y"),
    z.literal("N"),
    z.literal("R"),
    z.literal("P"),
    z.literal("D"),
  ]),
  dispOrdNo: z.number().nullable(),
  regId: z.string(),
  modId: z.string(),
});

export const PUT_ADVERTISEMENT_AD_SCHEMA = z.object({
  comCd: z.string(),
  advtNo: z.number(),
  advtNm: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  imgOrgName: z.string(),
  imgFileName: z
    .string()
    .nonempty({ message: ESSENTIAL_REQUIRED_FIELD_MESSAGE }),
  fileSize: z.number(),
  advtLink: z.string().nonempty({ message: REQUIRED_FIELD_MESSAGE }),
  newWinYn: z
    .union([z.literal(""), z.literal("Y"), z.literal("N"), z.literal("R")])
    .nullable(),
  advtYn: z.union([z.literal("Y"), z.literal("N")]).nullable(),
  srvStGb: z.union([
    z.literal(""),
    z.literal("Y"),
    z.literal("N"),
    z.literal("R"),
    z.literal("P"),
    z.literal("D"),
  ]),
  advtStartDt: z.string(),
  advtEndDt: z.string(),
  regId: z.string(),
  modId: z.string(),
});

export const PATCH_ADVERTISEMENT_AD_ORDER_CHANGE_SCHEMA = z.object({
  advtNo: z.number(),
  targetAdvtNo: z.number(),
  modId: z.string(),
});
