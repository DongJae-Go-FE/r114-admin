import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  INPUT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
} from "@/const/const";

export const GET_BOARD_NOTICE_SCHEMA = z.object({
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

export const POST_BOARD_NOTICE_SCHEMA = z.object({
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

export const PUT_BOARD_NOTICE_SCHEMA = z.object({
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
