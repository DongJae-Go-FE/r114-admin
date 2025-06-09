import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  INPUT_MAX_LENGTH,
  TXT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
} from "@/const/const";

export const GET_USER_CONTRACT_SCHEMA = z.object({
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

export const POST_USER_CONTRACT_INDIVIDUAL_SCHEMA = z.object({
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

export const POST_USER_CONTRACT_CORPORATION_INDIVIDUAL_SCHEMA = z.object({
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

export const GET_USER_CONTRACT_DETAIL_LIST_SCHEMA = z.object({
  date: z.string(),
  update: z.string(),
  reason: z.string(),
  id: z.string(),
});

export const PUT_USER_CONTRACT = z.object({
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
