import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";

import {
  DELETE_ADVERTISEMENT_AD_REQUEST,
  POST_ADVERTISEMENT_AD_REQUEST,
  PUT_ADVERTISEMENT_AD_REQUEST,
  PATCH_ADVERTISEMENT_AD_REQUEST,
  POST_ADVERTISEMENT_AD_DETAIL_FILE_UPLOAD_REQUEST,
} from "./api";

import {
  POST_ADVERTISEMENT_AD_SCHEMA,
  PUT_ADVERTISEMENT_AD_SCHEMA,
  PATCH_ADVERTISEMENT_AD_ORDER_CHANGE_SCHEMA,
} from "./schema";

export function useAdvertisementAdDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (advtNo: string) => DELETE_ADVERTISEMENT_AD_REQUEST({ advtNo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADVERTISEMENT_AD_REQUEST"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useAdvertisementAdPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof POST_ADVERTISEMENT_AD_SCHEMA>) =>
      POST_ADVERTISEMENT_AD_REQUEST({ values }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ADVERTISEMENT_AD_REQUEST"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useAdvertisementAdFileUploadMutation() {
  return useMutation({
    mutationFn: (values: FormData) =>
      POST_ADVERTISEMENT_AD_DETAIL_FILE_UPLOAD_REQUEST({ values }),
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useAdvertisementAdEditMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      values,
      advtNo,
    }: {
      values: z.infer<typeof PUT_ADVERTISEMENT_AD_SCHEMA>;
      advtNo: string;
    }) => PUT_ADVERTISEMENT_AD_REQUEST({ values, advtNo }),
    onSuccess: (_, variables) => {
      const { advtNo } = variables;
      queryClient.invalidateQueries({
        queryKey: ["ADVERTISEMENT_AD_REQUEST", advtNo],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useAdvertisementAdListPatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      values: z.infer<typeof PATCH_ADVERTISEMENT_AD_ORDER_CHANGE_SCHEMA>
    ) => PATCH_ADVERTISEMENT_AD_REQUEST(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ADVERTISEMENT_AD_ACTIVE_LIST_REQUEST"],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}
