"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
  useBoardPostMutation,
  useBoardDetailFileUploadMutation,
} from "./model/mutation";

import { POST_BOARD_NOTICE_SCHEMA } from "@/modules/board/notice/model/schema";

import {
  CONFIRM_ADD_SAVE_STRING,
  COMPLETE_ADD_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  INPUT_MAX_LENGTH,
  INPUT_MIN_LENGTH,
} from "@/lib/const";

export default function ClientBoardNoticeAdd() {
  const { push } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isTime, setIsTime] = useState([
    format(new Date(), "yyyy-MM-dd"),
    "00",
    "00",
  ]);

  const { mutateAsync, isPending } = useBoardPostMutation();
  const { mutateAsync: fileMutateAsync, isPending: isUploadPending } =
    useBoardDetailFileUploadMutation();

  const form = useForm<z.infer<typeof POST_BOARD_NOTICE_SCHEMA>>({
    resolver: zodResolver(POST_BOARD_NOTICE_SCHEMA),
    defaultValues: {
      comCd: "001",
      postTitle: "",
      postContent: "",
      boardAttList: [],
      reservePostDtm: null,
    },
  });

  const handleSave = async (
    values: z.infer<typeof POST_BOARD_NOTICE_SCHEMA>
  ) => {
    if (confirm(`공지사항${CONFIRM_ADD_SAVE_STRING}`)) {
      try {
        await mutateAsync(values);

        alert(`공지사항 ${COMPLETE_ADD_STRING}`);

        push("/board/notice");
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleDelete = (fileName: string) => {
    const current = form.getValues("boardAttList");
    const filtered = current?.filter((f) => f.attachOrgName !== fileName);
    form.setValue("boardAttList", filtered);
  };

  const handleCancel = () => {
    if (confirm(CONFIRM_CANCEL_SAVE_STRING)) {
      alert(COMPLETE_CANCEL_STRING);
      push("/board/notice");
    }
  };

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
      const existingFiles = form.getValues("boardAttList") ?? [];

      const newFiles = res.data.map((value) => ({
        attachNo: value.attachNo,
        attachFileName: value.attachFileName,
        attachOrgName: value.attachOrgName,
      }));

      const combinedFiles = [
        ...existingFiles,
        ...newFiles.filter(
          (newFile) =>
            !existingFiles.some(
              (existFile) => existFile.attachOrgName === newFile.attachOrgName
            )
        ),
      ];

      form.setValue("boardAttList", combinedFiles);
    } catch (error) {
      alert(`업로드 실패: ${error}`);
      console.error("업로드 실패", error);
    }
  };

  const handleUptime = (newTime: [string, string, string]) => {
    setIsTime(newTime);
    form.setValue(
      "reservePostDtm",
      `${newTime[0]} ${newTime[1]}:${newTime[2]}`
    );
  };

  const hourOptions = Array.from({ length: 24 }, (_, i) => {
    const val = String(i).padStart(2, "0");
    return { value: val, label: `${val}시` };
  });

  const minuteOptions = Array.from({ length: 60 }, (_, i) => {
    const val = String(i).padStart(2, "0");
    return { value: val, label: `${val}분` };
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)} className="space-y-8">
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
                  disabled={isPending}
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
                  onChange={field.onChange}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage className="mt-3" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="boardAttList"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                파일 첨부
                <span className="attention">
                  <span>*</span> 파일은 최대 5개, 50MB까지 가능합니다.
                </span>
              </FormLabel>
              <FormControl>
                <FileUpload
                  {...field}
                  dragAreaPlaceholder="이곳을 클릭하거나 파일을 드롭하세요."
                  multiple
                  limit={5}
                  upload={handleUpload}
                  disabled={isUploadPending || isPending}
                  isLoading={isUploadPending || isPending}
                  onDeleteClick={(file) => {
                    handleDelete(file.name);
                  }}
                  onLimitOver={() =>
                    alert("파일은 최대 5개까지 첨부 가능합니다.")
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="reservePostDtm"
          render={() => (
            <FormItem>
              <FormLabel>
                <Checkbox
                  checked={isOpen}
                  className="mr-1 relative top-0.5"
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
                      disabled={isPending}
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
                      disabled={isPending}
                      value={isTime[1]}
                      onChange={(val) =>
                        handleUptime([isTime[0], val, isTime[2]])
                      }
                    />
                    <CustomSelect
                      options={minuteOptions}
                      disabled={isPending}
                      value={isTime[2]}
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
            등록
          </Button>
        </div>
      </form>
    </Form>
  );
}
