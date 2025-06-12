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

import { useBoardEditMutation } from "@/lib/network/mutation";

import { PUT_BOARD_NOTICE_SCHEMA } from "@/schema/board/notice/schema";

import {
  CONFIRM_EDIT_SAVE_STRING,
  COMPLETE_EDIT_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  INPUT_MAX_LENGTH,
  INPUT_MIN_LENGTH,
} from "@/const/const";

export default function ClientBoardNoticeEdit({ postNo }: { postNo: string }) {
  const { push } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isTime, setIsTime] = useState(["", "00", "00"]);

  const { mutateAsync, isPending } = useBoardEditMutation();

  const form = useForm<z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>>({
    resolver: zodResolver(PUT_BOARD_NOTICE_SCHEMA),
    defaultValues: {
      date: "",
      writer: "가동재",
      service: "1",
      title: "",
      content: "",
      file: "",
      reservation: false,
      time: "",
    },
  });

  const handleEdit = async (
    values: z.infer<typeof PUT_BOARD_NOTICE_SCHEMA>
  ) => {
    if (confirm(`공지사항을 ${CONFIRM_EDIT_SAVE_STRING}`)) {
      try {
        await mutateAsync({ values, postNo });
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

  const updateTime = (newTime: [string, string, string]) => {
    setIsTime(newTime);
    form.setValue("time", `${newTime[0]} ${newTime[1]}:${newTime[2]}`);
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
      <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-8">
        <FormField
          control={form.control}
          name="service"
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
          name="title"
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
          name="content"
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
          name="file"
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
          name="time"
          render={() => (
            <FormItem>
              <FormLabel>
                <Checkbox
                  id="reservation"
                  checked={isOpen}
                  className="mr-1 relative top-0.5"
                  onCheckedChange={(checked) => {
                    setIsOpen(checked as boolean);
                    if (!checked) {
                      form.setValue("time", "");
                      setIsTime(["", "00", "00"]);
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
                      id="time"
                      initialValue={
                        isTime[0]
                          ? parse(isTime[0], "yyyy-MM-dd", new Date())
                          : new Date()
                      }
                      onChangDate={(date) =>
                        updateTime([
                          format(date, "yyyy-MM-dd"),
                          isTime[1],
                          isTime[2],
                        ])
                      }
                    />
                    <CustomSelect
                      options={hourOptions}
                      value={isTime[1]}
                      onChange={(val) =>
                        updateTime([isTime[0], val, isTime[2]])
                      }
                    />
                    <CustomSelect
                      options={minuteOptions}
                      value={isTime[2]}
                      onChange={(val) =>
                        updateTime([isTime[0], isTime[1], val])
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
