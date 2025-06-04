import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DELETE_BOARD_NOTICE_REQUEST,
  POST_BOARD_NOTICE_REQUEST,
  EDIT_BOARD_NOTICE_REQUEST,
} from "./api";
import { z } from "zod";

import { BoardNoticeAddEditSchema } from "@/schema/schema";

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
    mutationFn: (values: z.infer<typeof BoardNoticeAddEditSchema>) =>
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
      values: z.infer<typeof BoardNoticeAddEditSchema>;
      postNo: string;
    }) => EDIT_BOARD_NOTICE_REQUEST({ values, postNo }),
    onSuccess: (_, variables) => {
      const { postNo } = variables;
      queryClient.invalidateQueries({
        queryKey: ["BOARD_NOTICE_REQUEST", postNo],
      });
    },
    onError: (error: string) => {
      console.error(error);
    },
  });
}
