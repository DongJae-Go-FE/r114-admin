import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  TXT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
} from "@/const/const";

export const GET_SETTING_MANAGEMENT_SCHEMA = z.object({
  id: z.number(),
  memberId: z.string(),
  name: z.string(),
  team: z.string(),
  adMgmt: z.string(),
  state: z.string(),
  date: z.string(),
});

export const GET_SETTING_MANAGEMENT_DETAIL_LIST_SCHEMA = z.object({
  date: z.string(),
  update: z.string(),
  reason: z.string(),
  id: z.string(),
});

export const PUT_SETTING_MANAGEMENT_SCHEMA = z.object({
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
