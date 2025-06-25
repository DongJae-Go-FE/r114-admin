import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  INPUT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
} from "@/lib/const";

export const GET_BOARD_NOTICE_SCHEMA = z.object({
  id: z.number(),
  postNo: z.number(),
  boardId: z.string(),
  comTypCd: z.string(),
  comCd: z.string(),
  postLevel: z.number().nullable().optional().default(1),
  postTitle: z.string(),
  postContent: z.string().nullable().optional(),
  reservePostDtm: z.string().nullable().optional(),
  topFixYn: z.string().default("N"),
  firstYn: z.string().default("N"),
  delYn: z.string().nullable().default("N"),
  delDtm: z.string().nullable().optional(),
  blockYn: z.string().nullable().default("N"),
  readCnt: z.number().nullable().optional(),
  modCnt: z.number().nullable().optional(),
  ipAddr: z.string().nullable().optional(),
  attr: z.string().nullable().optional(),
  regId: z.string(),
  regNm: z.string(),
  regDtm: z.string(),
  modId: z.string().nullable().optional(),
  modDtm: z.string().nullable().optional(),
  nowDtm: z.string(),
  attachCnt: z.string(),
});

export const POST_BOARD_NOTICE_SCHEMA = z.object({
  comCd: z.string(),
  postTitle: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  postContent: z.string().nonempty({ message: REQUIRED_FIELD_MESSAGE }),
  boardAttList: z
    .array(
      z.object({
        attachNo: z.number(),
        attachFileName: z.string(),
        attachOrgName: z.string(),
      })
    )
    .optional(),
  reservePostDtm: z.string().nullable(),
});

export const PUT_BOARD_NOTICE_SCHEMA = z.object({
  postNo: z.number(),
  comCd: z.string(),
  postTitle: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  postContent: z.string().nonempty({ message: REQUIRED_FIELD_MESSAGE }),
  boardAttList: z
    .array(
      z.object({
        attachNo: z.number(),
        attachFileName: z.string(),
        attachOrgName: z.string(),
      })
    )
    .optional(),
  reservePostDtm: z.string().nullable(),
});
