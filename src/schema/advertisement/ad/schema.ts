import { z } from "zod";

import {
  INPUT_MIN_LENGTH,
  INPUT_MAX_LENGTH,
  REQUIRED_FIELD_MESSAGE,
} from "@/const/const";

export const GET_ADVERTISEMENT_AD_SCHEMA = z.object({
  id: z.number(),
  service: z.string(),
  number: z.string(),
  state: z.string(),
  title: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  writer: z.string(),
  date: z.string(),
  order: z.string(),
});

export const GET_ADVERTISEMENT_AD_CHANGE_ORDER_SCHEMA = z.object({
  id: z.number(),
  order: z.string(),
  state: z.string(),
  title: z.string(),
});

export const POST_ADVERTISEMENT_AD_SCHEMA = z.object({
  title: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  date: z.string(),
  writer: z.string(),
  isOpen: z.boolean(),
  file: z.string(),
  link: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  service: z.string(),
  isStop: z.boolean(),
  order: z.string().optional(),
});

export const PUT_ADVERTISEMENT_AD_SCHEMA = z.object({
  title: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  date: z.string(),
  writer: z.string(),
  isOpen: z.boolean(),
  file: z.string(),
  link: z
    .string()
    .nonempty({ message: REQUIRED_FIELD_MESSAGE })
    .min(INPUT_MIN_LENGTH, {
      message: `최소 ${INPUT_MIN_LENGTH}글자 이상 입력해주세요`,
    })
    .max(INPUT_MAX_LENGTH, {
      message: `최대 ${INPUT_MAX_LENGTH}글자 이하로 입력해주세요`,
    }),
  service: z.string(),
  isStop: z.boolean(),
  order: z.string().optional(),
});
