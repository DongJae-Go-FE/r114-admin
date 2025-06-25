import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  INPUT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
} from "@/lib/const";

export const GET_USER_POWER_SCHEMA = z.object({
  id: z.number(),
  power: z.string(),
  dataPowerType: z.string(),
  menuType: z.string(),
  excelType: z.string(),
  date: z.string(),
});

export const POST_USER_POWER_SCHEMA = z.object({
  name: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  menu: z.string(),
  data: z.string(),
  excel: z.string(),
  menuPower: z.array(z.string()).optional(),
});

export const PUT_USER_POWER_SCHEMA = z.object({
  name: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  menu: z.string(),
  data: z.string(),
  excel: z.string(),
  menuPower: z.array(z.string()).optional(),
});
