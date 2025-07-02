import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { z } from "zod";

import {
  POST_SETTING_MANAGEMENT_REQUEST,
  PATCH_SETTING_MANAGEMENT_ID_APPROVE_REQUEST,
  PUT_SETTING_MANAGEMENT_PASSWORD_RESET_REQUEST,
  PATCH_SETTING_MANAGEMENT_REQUEST,
  DELETE_SETTING_MANAGEMENT_REQUEST,
  PATCH_SETTING_MANAGEMENT_AUTH_REQUEST,
  PUT_SETTING_MANAGEMENT_RESET_PASSWORD_REQUEST,
} from "./api";

export function useSettingManagementDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => DELETE_SETTING_MANAGEMENT_REQUEST(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SETTING_MANAGEMENT_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useSettingManagementPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: unknown) =>
      POST_SETTING_MANAGEMENT_REQUEST({ values }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SETTING_MANAGEMENT_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useSettingManagementPatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: unknown) =>
      PATCH_SETTING_MANAGEMENT_REQUEST({ values }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SETTING_MANAGEMENT_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useSettingManagementIdApprovePatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: unknown) =>
      PATCH_SETTING_MANAGEMENT_ID_APPROVE_REQUEST({ values }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SETTING_MANAGEMENT_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useSettingManagementPasswordResetPutMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (adminCd: string) =>
      PUT_SETTING_MANAGEMENT_PASSWORD_RESET_REQUEST(adminCd),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SETTING_MANAGEMENT_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useSettingManagementAuthPatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: unknown) =>
      PATCH_SETTING_MANAGEMENT_AUTH_REQUEST({ values }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SETTING_MANAGEMENT_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useSettingManagementResetPasswordPatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ adminCd, values }: { adminCd: string; values: unknown }) =>
      PUT_SETTING_MANAGEMENT_RESET_PASSWORD_REQUEST({ adminCd, values }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["SETTING_MANAGEMENT_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}
