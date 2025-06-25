import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { z } from "zod";

import { PATCH_SETTING_MANAGEMENT_CHANGE_MY_PASSWORD_REQUEST } from "./api";

export function useSettingManagementChangeMyPasswordPatchMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: unknown) =>
      PATCH_SETTING_MANAGEMENT_CHANGE_MY_PASSWORD_REQUEST({ values }),
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
