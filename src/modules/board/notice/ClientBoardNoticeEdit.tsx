"use client";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

import { parse, format } from "date-fns";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import TextEditor from "@/components/TextEditor";
import { FileUpload } from "@/components/FileUpload";
import { DatePicker } from "@/components/DatePicker";

import { CustomSelect } from "@/components/Select";
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
  useBoardEditMutation,
  useBoardDetailFileUploadMutation,
} from "./model/mutation";

import { CommonResponse } from "@/lib/network/HttpRequest";

import { GET_BOARD_NOTICE_DETAIL_RESPONSE_TYPE } from "@/modules/board/notice/model/types";
import { GET_BOARD_NOTICE_DETAIL_REQUEST } from "./model/api";
import { PUT_BOARD_NOTICE_SCHEMA } from "@/modules/board/notice/model/schema";

import {
  CONFIRM_EDIT_SAVE_STRING,
  COMPLETE_EDIT_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  INPUT_MAX_LENGTH,
  INPUT_MIN_LENGTH,
} from "@/lib/const";

export default function ClientBoardNoticeEdit({ postNo }: { postNo: string }) {
  const { push } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isTime, setIsTime] = useState([
    format(new Date(), "yyyy-MM-dd"),
    "00",
    "00",
  ]);

  const [currentFiles, setCurrentFiles] = useState<
    Array<{
      attachNo: number;
      attachFileName: string;
      attachOrgName: string;
      fileSize: number;
    }>
  >([]);

  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["BOARD_NOTICE_DETAIL_REQUEST", postNo],
    queryFn: () => GET_BOARD_NOTICE_DETAIL_REQUEST({ postNo }),
    initialData: () =>
      qc.getQueryData<CommonResponse<GET_BOARD_NOTICE_DETAIL_RESPONSE_TYPE>>([
        "BOARD_NOTICE_DETAIL_REQUEST",
        postNo,
      ]),
  });

  const { mutateAsync, isPending } = useBoardEditMutation();
  const { mutateAsync: fileMutateAsync, isPending: isUploadPending } =
    useBoardDetailFileUploadMutation();

  const form = useForm<z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>>({
    resolver: zodResolver(PUT_BOARD_NOTICE_SCHEMA),
    defaultValues: {
      postNo: Number(postNo),
      comCd: "001",
      postTitle: data?.data.postTitle || "",
      postContent: data?.data.postContent || "",
      boardAttList: data?.data.attachments || [],
      reservePostDtm: data?.data.reservePostDtm || null,
    },
  });

  const handleUpload = async (files: File[]) => {
    const formData = new FormData();

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기가 너무 큽니다. (최대 10MB)");
        return;
      }

      formData.append("files", file);
    }

    try {
      const res = await fileMutateAsync(formData);

      const newFiles = res.data.map((value, index) => ({
        attachNo: value.attachNo,
        attachFileName: value.attachFileName,
        attachOrgName: value.attachOrgName,
        fileSize: files[index].size,
      }));

      const combinedFiles = [
        ...currentFiles,
        ...newFiles.filter(
          (newFile) =>
            !currentFiles.some(
              (existFile) => existFile.attachOrgName === newFile.attachOrgName
            )
        ),
      ];

      setCurrentFiles(combinedFiles);

      form.setValue("boardAttList", combinedFiles);
    } catch (error) {
      alert(`업로드 실패: ${error}`);
      console.error("업로드 실패", error);
    }
  };

  const handleDelete = (fileName: string) => {
    const filtered = currentFiles.filter((f) => f.attachOrgName !== fileName);

    setCurrentFiles(filtered);

    form.setValue("boardAttList", filtered);
  };

  const handleEdit = async (
    values: z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>
  ) => {
    if (confirm(`공지사항을 ${CONFIRM_EDIT_SAVE_STRING}`)) {
      try {
        const updatedValues = {
          ...values,
          boardAttList: currentFiles,
        };

        await mutateAsync({ values: updatedValues, postNo });
        alert(`공지사항을 ${COMPLETE_EDIT_STRING}`);
        push(`/board/notice/${postNo}`);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleCancel = () => {
    if (confirm(CONFIRM_CANCEL_SAVE_STRING)) {
      alert(COMPLETE_CANCEL_STRING);
      push(`/board/notice/${postNo}`);
    }
  };

  const handleUptime = (newTime: [string, string, string]) => {
    setIsTime(newTime);
    form.setValue(
      "reservePostDtm",
      `${newTime[0]} ${newTime[1]}:${newTime[2]}`
    );
  };

  useEffect(() => {
    if (data?.data && !isLoading) {
      const resetData = {
        postNo: Number(postNo),
        comCd: "001",
        postTitle: data.data.postTitle || "",
        postContent: data.data.postContent || "",
        boardAttList: data.data.attachments || [],
        reservePostDtm: data.data.reservePostDtm || null,
      };

      if (form.getValues("postContent") !== resetData.postContent) {
        form.reset(resetData);
      }

      setCurrentFiles(data.data.attachments || []);

      if (!!form.watch("reservePostDtm")) {
        setIsOpen(true);
        const [date, hour, minute] =
          form
            .getValues("reservePostDtm")
            ?.match(/(\d{4}-\d{2}-\d{2})\s+(\d{2}):(\d{2})/)
            ?.slice(1) ?? [];
        setIsTime([date, hour, minute]);
      }
    }
  }, [data, isLoading, form, postNo]);

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const val = String(i).padStart(2, "0");
    return { value: val, label: `${val}시` };
  });

  const minuteOptions = Array.from({ length: 60 }, (_, i) => {
    const val = String(i).padStart(2, "0");
    return { value: val, label: `${val}분` };
  });

  const isDisable = isLoading || isPending;
  const isDisableUploading = isLoading || isPending || isUploadPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-8">
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
                  disabled={isDisable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                제목 <span className="attention">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="제목을 입력해주세요."
                  minLength={INPUT_MIN_LENGTH}
                  maxLength={INPUT_MAX_LENGTH}
                  disabled={isDisable}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postContent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <TextEditor
                  value={field.value}
                  defaultValue={field.value}
                  onChange={field.onChange}
                  disabled={isDisable}
                />
              </FormControl>
              <FormMessage className="mt-3" />
            </FormItem>
          )}
        />

        <div>
          <FormLabel>
            파일 첨부
            <span className="attention">
              <span>*</span> 파일은 최대 5개, 50MB까지 가능합니다.
            </span>
          </FormLabel>
          <FileUpload
            dragAreaPlaceholder="이곳을 클릭하거나 파일을 드롭하세요."
            multiple
            limit={5}
            upload={handleUpload}
            initialFiles={currentFiles.map(({ attachOrgName, fileSize }) => {
              return {
                name: attachOrgName,
                size: fileSize,
                lastModified: Date.now(),
              };
            })}
            onDeleteClick={(file) => {
              handleDelete(file.name);
            }}
            disabled={isDisableUploading}
            isLoading={isDisableUploading}
            onLimitOver={() => alert("파일은 최대 5개까지 첨부 가능합니다.")}
          />
        </div>

        <FormField
          control={form.control}
          name="reservePostDtm"
          render={() => (
            <FormItem>
              <FormLabel>
                <Checkbox
                  id="reservation"
                  checked={isOpen}
                  className="mr-1 relative top-0.5"
                  disabled={isDisable}
                  onCheckedChange={(checked) => {
                    setIsOpen(checked as boolean);
                    if (!checked) {
                      form.setValue("reservePostDtm", null);
                      setIsTime([format(new Date(), "yyyy-MM-dd"), "00", "00"]);
                    } else {
                      handleUptime([isTime[0], isTime[1], isTime[2]]);
                    }
                  }}
                />
                <label htmlFor="reservation">예약 등록</label>
                <span className="attention">
                  <span>*</span> 설정한 시간대로 예약됩니다.
                </span>
              </FormLabel>
              <FormControl>
                {isOpen && (
                  <div className="flex gap-2">
                    <DatePicker
                      id="reservePostDtm"
                      initialValue={
                        isTime[0]
                          ? parse(isTime[0], "yyyy-MM-dd", new Date())
                          : new Date()
                      }
                      onChangDate={(date) =>
                        handleUptime([
                          format(date, "yyyy-MM-dd"),
                          isTime[1],
                          isTime[2],
                        ])
                      }
                    />
                    <CustomSelect
                      options={hourOptions}
                      value={isTime[1]}
                      disabled={isDisable}
                      onChange={(val) =>
                        handleUptime([isTime[0], val, isTime[2]])
                      }
                    />
                    <CustomSelect
                      options={minuteOptions}
                      value={isTime[2]}
                      disabled={isDisable}
                      onChange={(val) =>
                        handleUptime([isTime[0], isTime[1], val])
                      }
                    />
                  </div>
                )}
              </FormControl>
            </FormItem>
          )}
        />

        <div className="btn-area">
          <Button type="button" onClick={handleCancel} color="white">
            취소
          </Button>
          <Button type="submit" disabled={isPending}>
            수정
          </Button>
        </div>
      </form>
    </Form>
  );
}
