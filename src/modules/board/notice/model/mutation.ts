import { useMutation, useQueryClient } from "@tanstack/react-query";

import { z } from "zod";

import {
  DELETE_BOARD_NOTICE_REQUEST,
  POST_BOARD_NOTICE_REQUEST,
  PUT_BOARD_NOTICE_REQUEST,
  POST_BOARD_DETAIL_FILE_UPLOAD_REQUEST,
} from "./api";

import { POST_BOARD_NOTICE_SCHEMA, PUT_BOARD_NOTICE_SCHEMA } from "./schema";

export function useBoardDeleteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postNo: string) => DELETE_BOARD_NOTICE_REQUEST({ postNo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BOARD_NOTICE_REQUEST"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useBoardPostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: z.infer<typeof POST_BOARD_NOTICE_SCHEMA>) =>
      POST_BOARD_NOTICE_REQUEST({ values }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["BOARD_NOTICE_REQUEST"] });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useBoardEditMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      values,
      postNo,
    }: {
      values: z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>;
      postNo: string;
    }) => PUT_BOARD_NOTICE_REQUEST({ values, postNo }),
    onSuccess: (_, variables) => {
      const { postNo } = variables;
      queryClient.invalidateQueries({
        queryKey: ["BOARD_NOTICE_DETAIL_REQUEST", postNo],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}

export function useBoardDetailFileUploadMutation() {
  return useMutation({
    mutationFn: (values: FormData) =>
      POST_BOARD_DETAIL_FILE_UPLOAD_REQUEST({ values }),
    onError: (error: string) => {
      console.error(error);
    },
  });
}
