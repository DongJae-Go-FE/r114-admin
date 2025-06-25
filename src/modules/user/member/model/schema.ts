import { TXT_MAX_LENGTH, REQUIRED_FIELD_MESSAGE } from "@/lib/const";

import { z } from "zod";

export const GET_USER_MEMBER_SCHEMA = z.object({
  idType: z.string(),
  code: z.string(),
  serviceDate: z.string(),
  name: z.string(),
  id: z.string(),
  userId: z.string(),
  ipCount: z.string(),
  memberType: z.string(),
  group: z.string(),
  updateDate: z.string(),
});

export const GET_USER_MEMBER_IP_SCHEMA = z.object({
  idType: z.string(),
  name: z.string(),
  userId: z.string(),
  region: z.string(),
  id: z.string(),
  ip: z.string(),
  memberType: z.string(),
  updateDate: z.string(),
});

export const GET_USER_MEMBER_IP_MODAL_SCHEMA = z.object({
  id: z.string(),
  loginData: z.string(),
  date: z.string(),
});

export const GET_USER_MEMBER_DETAIL_LIST_SCHEMA = z.object({
  date: z.string(),
  update: z.string(),
  reason: z.string(),
  id: z.string(),
});

export const POST_USER_MEMBER = z
  .object({
    idType: z.string(),
    code: z.string().optional(),
    contractState: z.string().optional(),
    update: z.string().optional(),
    name: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    userId: z
      .string()
      .nonempty({ message: REQUIRED_FIELD_MESSAGE })
      .min(4, {
        message: `최소 4글자 이상 입력해주세요`,
      })
      .max(TXT_MAX_LENGTH, {
        message: `최대 ${TXT_MAX_LENGTH}글자 이하로 입력해주세요`,
      })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: "아이디는 알파벳 또는 알파벳+숫자 조합만 입력 가능합니다.",
      }),
    email: z.string().optional(),
    phone: z.string().optional(),
    ipCount: z.string().optional(),
    powerType: z.string(),
  })
  .superRefine((data, ctx) => {
    const { idType, code, email, phone, ipCount } = data;

    if (idType === "1") {
      if (!code) {
        ctx.addIssue({
          path: ["code"],
          code: z.ZodIssueCode.custom,
          message: "idType이 1일 경우 계약 코드는 필수입니다.",
        });
      }
      if (!email) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "idType이 1일 경우 이메일은 필수입니다.",
        });
      }
      if (!phone) {
        ctx.addIssue({
          path: ["phone"],
          code: z.ZodIssueCode.custom,
          message: "idType이 1일 경우 전화번호는 필수입니다.",
        });
      }
      if (!ipCount) {
        ctx.addIssue({
          path: ["ipCount"],
          code: z.ZodIssueCode.custom,
          message: "idType이 1일 경우 IP 개수는 필수입니다.",
        });
      }
    }

    if (idType === "2") {
      if (!ipCount) {
        ctx.addIssue({
          path: ["ipCount"],
          code: z.ZodIssueCode.custom,
          message: "idType이 2일 경우 IP 개수는 필수입니다.",
        });
      }
    }

    if (idType === "4") {
      if (!email) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "idType이 4일 경우 이메일은 필수입니다.",
        });
      }
    }
  });

export const PUT_USER_MEMBER = z.object({
  memberState: z.string(),
  memberType: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  email: z.string(),
  phone: z.string(),
  ipTotal: z.string(),
  powerType: z.string(),
  reason: z.string(),
});
