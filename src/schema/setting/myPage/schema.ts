import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  TXT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
} from "@/const/const";

export const GET_SETTING_MY_PAGE_SCHEMA = z.object({
  date: z.string(),
  update: z.string(),
  reason: z.string(),
  id: z.string(),
});

export const POST_SETTING_MY_PAGE_ID_CHANGE_SCHEMA = z
  .object({
    pw: z
      .string()
      .nonempty({ message: REQUIRED_FIELD_MESSAGE })
      .min(PASSWORD_MIN_LENGTH, {
        message: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}이상 입력해주세요.`,
      })
      .max(PASSWORD_MAX_LENGTH, {
        message: `최대 ${PASSWORD_MAX_LENGTH}글자 이하로 입력해주세요`,
      }),
    newPw: z
      .string()
      .nonempty({ message: REQUIRED_FIELD_MESSAGE })
      .min(INPUT_MIN_LENGTH, {
        message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
      })
      .max(TXT_MAX_LENGTH, {
        message: `최대 ${TXT_MAX_LENGTH}글자 이하로 입력해주세요`,
      }),
    newPwCheck: z
      .string()
      .nonempty({ message: REQUIRED_FIELD_MESSAGE })
      .min(INPUT_MIN_LENGTH, {
        message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
      })
      .max(TXT_MAX_LENGTH, {
        message: `최대 ${TXT_MAX_LENGTH}글자 이하로 입력해주세요`,
      }),
  })
  .superRefine((data, ctx) => {
    if (data.newPw !== data.newPwCheck) {
      ctx.addIssue({
        path: ["newPwCheck"],
        code: z.ZodIssueCode.custom,
        message: "변경 비밀번호가 일치하지 않습니다.",
      });
    }
  });
