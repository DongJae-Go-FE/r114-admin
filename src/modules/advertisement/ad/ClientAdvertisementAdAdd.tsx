"use client";

import { useRouter } from "next/navigation";

import { useRef } from "react";

import { addDays, format, parse } from "date-fns";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Input } from "@/components/Input";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { FileUpload } from "@/components/FileUpload";
import { CommonOnOffSelect } from "@/components/Select/CommonSelect/CommonAllOnOffSelect";
import { CommonServiceDivideSelect } from "@/components/Select/CommonSelect/CommonServiceDivideSelect";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";

import {
  useAdvertisementAdPostMutation,
  useAdvertisementAdFileUploadMutation,
} from "./model/mutation";

import { POST_ADVERTISEMENT_AD_SCHEMA } from "@/modules/advertisement/ad/model/schema";

import {
  CONFIRM_ADD_SAVE_STRING,
  COMPLETE_ADD_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  INPUT_MAX_LENGTH,
} from "@/lib/const";

export default function ClientAdvertisementAdAdd() {
  const { push } = useRouter();

  const { mutateAsync, isPending } = useAdvertisementAdPostMutation();
  const { mutateAsync: fileMutateAsync, isPending: isUploadPending } =
    useAdvertisementAdFileUploadMutation();

  const form = useForm<z.infer<typeof POST_ADVERTISEMENT_AD_SCHEMA>>({
    resolver: zodResolver(POST_ADVERTISEMENT_AD_SCHEMA),
    defaultValues: {
      comCd: "001",
      advtNm: "",
      imgOrgName: "",
      imgFileName: "",
      fileSize: 0,
      advtLink: "",
      newWinYn: "N",
      advtYn: "N",
      srvStGb: "R",
      dispOrdNo: null,
      advtStartDt: format(new Date(), "yyyy-MM-dd"),
      advtEndDt: format(addDays(new Date(), 31), "yyyy-MM-dd"),
      regId: "webmaster",
      modId: "webmaster",
    },
  });

  const fileRef = useRef<
    (File | { name: string; size: number; lastModified: number })[]
  >([]);

  const handleAdd = async (
    values: z.infer<typeof POST_ADVERTISEMENT_AD_SCHEMA>
  ) => {
    if (confirm(`광고를 ${CONFIRM_ADD_SAVE_STRING}`)) {
      try {
        await mutateAsync(values);
        alert(`광고를 ${COMPLETE_ADD_STRING}`);
        push("/advertisement/ad-list");
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleCancel = () => {
    if (confirm(CONFIRM_CANCEL_SAVE_STRING)) {
      alert(COMPLETE_CANCEL_STRING);
      push("/advertisement/ad-list");
    }
  };

  const handleUpload = async (files: File[]) => {
    const file = files[0];

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기가 너무 큽니다. (최대 10MB)");
      return;
    }
    const formData = new FormData();

    formData.append("file", files[0]);

    try {
      const res = await fileMutateAsync(formData);

      form.setValue("imgFileName", res.data.imgFileName, {
        shouldValidate: true,
      });
      form.setValue("imgOrgName", res.data.imgOrgName, {
        shouldValidate: true,
      });
      form.setValue("fileSize", res.data.fileSize);
    } catch (error) {
      alert(`업로드 실패: ${error}`);
      console.error("업로드 실패", error);
    }
  };

  const handleDelete = () => {
    fileRef.current = [];

    form.setValue("imgFileName", "");
    form.setValue("imgOrgName", "");
    form.setValue("fileSize", 0);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-8">
        <FormField
          control={form.control}
          name="comCd"
          render={({ field }) => (
            <FormItem>
              <FormLabel>서비스명</FormLabel>
              <FormControl>
                <CommonServiceDivideSelect
                  {...field}
                  className="w-full bg-white"
                  placeholder="전체"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="advtNm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                광고명 <span className="attention">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="광고명을 입력해주세요."
                  maxLength={INPUT_MAX_LENGTH}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="advtLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                연결 URL 링크
                <span className="attention">*</span>
                <Checkbox
                  id="reservation"
                  className="ml-2 mr-1 relative top-0.5"
                  checked={form.watch("newWinYn") === "Y" ? true : false}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      form.setValue("newWinYn", "Y");
                    } else {
                      form.setValue("newWinYn", "N");
                    }
                  }}
                  disabled={isPending}
                />
                <label htmlFor="reservation" className="text-black">
                  새창에서 열기
                </label>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="URL을 입력해주세요."
                  maxLength={INPUT_MAX_LENGTH}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imgFileName"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>
                파일 첨부
                <span className="attention">
                  <span>*</span> 10MB 이하의 이미지 파일(jpg, jpeg, png 권장)만
                  등록 가능합니다.
                </span>
              </FormLabel>
              <FormControl>
                <FileUpload
                  {...field}
                  dragAreaPlaceholder="이곳을 클릭하거나 파일을 드롭하세요."
                  limit={1}
                  disabled={isPending || isUploadPending}
                  isLoading={isPending || isUploadPending}
                  accept="image/png, image/jpeg, img/jpg"
                  initialFiles={fileRef.current}
                  isError={!!fieldState.error}
                  upload={handleUpload}
                  onDeleteClick={handleDelete}
                  onLimitOver={() =>
                    alert("파일은 최대 1개까지 첨부 가능합니다.")
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="advtYn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>광고 여부</FormLabel>
              <FormControl>
                <CommonOnOffSelect
                  {...field}
                  value={field.value ?? undefined}
                  className="w-full bg-white"
                  placeholder="on"
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="advtStartDt"
          render={() => (
            <FormItem>
              <FormLabel>
                광고 기간{" "}
                <Checkbox
                  id="reservation2"
                  className="ml-2 mr-1 relative top-0.5"
                  disabled={isPending}
                />
                <label htmlFor="reservation2">광고 중지</label>
              </FormLabel>
              <FormControl>
                <DateRangePicker
                  id="picker"
                  initialValue={{
                    from: form.watch("advtStartDt")
                      ? parse(
                          form.watch("advtStartDt"),
                          "yyyy-MM-dd",
                          new Date()
                        )
                      : new Date(),
                    to: form.watch("advtEndDt")
                      ? parse(form.watch("advtEndDt"), "yyyy-MM-dd", new Date())
                      : addDays(new Date(), 31),
                  }}
                  className="w-full"
                  disabled={isPending}
                  onChangDate={(value) => {
                    const from = value?.from
                      ? format(value.from, "yyyy-MM-dd")
                      : "";
                    const to = value?.to ? format(value.to, "yyyy-MM-dd") : "";

                    form.setValue("advtStartDt", from);
                    form.setValue("advtEndDt", to);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="btn-area">
          <Button
            type="button"
            onClick={handleCancel}
            color="white"
            disabled={isPending}
          >
            취소
          </Button>
          <Button type="submit" disabled={isPending}>
            등록
          </Button>
        </div>
      </form>
    </Form>
  );
}
