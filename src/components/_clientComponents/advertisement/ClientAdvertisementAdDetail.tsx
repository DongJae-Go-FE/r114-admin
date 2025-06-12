"use client";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { Checkbox } from "@/components/Checkbox";
import { FileUpload } from "@/components/FileUpload";

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

import { useAdvertisementAdEditMutation } from "@/lib/network/mutation";

import { PUT_ADVERTISEMENT_AD_SCHEMA } from "@/schema/advertisement/ad/schema";

import {
  CONFIRM_SAVE_STRING,
  COMPLETE_SAVE_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  INPUT_MIN_LENGTH,
  INPUT_MAX_LENGTH,
} from "@/const/const";

export default function ClientAdvertisementAdDetail({
  advtNo,
}: {
  advtNo: string;
}) {
  const { push } = useRouter();
  const { mutateAsync, isPending } = useAdvertisementAdEditMutation();

  const form = useForm<z.infer<typeof PUT_ADVERTISEMENT_AD_SCHEMA>>({
    resolver: zodResolver(PUT_ADVERTISEMENT_AD_SCHEMA),
    defaultValues: {
      title: "",
      date: "123123123",
      writer: "이름",
      file: "",
      link: "",
      service: "",
      isOpen: false,
      isStop: false,
      order: "",
    },
  });

  const handleEdit = async (
    values: z.infer<typeof PUT_ADVERTISEMENT_AD_SCHEMA>
  ) => {
    if (confirm(`광고를 ${CONFIRM_SAVE_STRING}`)) {
      try {
        await mutateAsync({ values, advtNo });
        alert(`광고 ${COMPLETE_SAVE_STRING}`);
        push(`/advertisement/ad-list/${advtNo}`);
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
                광고명 <span className="attention">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="광고명을 입력해주세요."
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
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                연결 URL 링크
                <span className="attention">*</span>
                <Checkbox
                  id="reservation"
                  className="ml-2 mr-1 relative top-0.5"
                  checked={form.watch("isOpen")}
                  onCheckedChange={(checked) => {
                    form.setValue("isOpen", checked === true);
                  }}
                  disabled={isPending}
                />
                <label htmlFor="reservation">새창에서 열기</label>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="URL을 입력해주세요."
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
          name="file"
          render={({ field }) => (
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
                  multiple
                  limit={5}
                  accept="image/png, image/jpeg, img/jpg"
                  onLimitOver={() =>
                    alert("파일은 최대 5개까지 첨부 가능합니다.")
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>광고 여부</FormLabel>
              <FormControl>
                <CustomSelect
                  {...field}
                  options={[
                    { value: "on", label: "true" },
                    { value: "off", label: "false" },
                  ]}
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
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>광고 순서</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  placeholder="제목을 입력해주세요."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                광고 기간{" "}
                <Checkbox
                  id="reservation2"
                  className="ml-2 mr-1 relative top-0.5"
                  checked={form.watch("isStop")}
                  onCheckedChange={(checked) => {
                    form.setValue("isStop", checked === true);
                  }}
                  disabled={isPending}
                />
                <label htmlFor="reservation2">광고 중지</label>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="광고기간을 입력해주세요 EX) YYYY.MM.DD~YYYY.MM.DD"
                  minLength={INPUT_MIN_LENGTH}
                  maxLength={INPUT_MAX_LENGTH}
                  disabled={isPending}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="btn-area">
          <Button type="button" onClick={handleCancel} color="white">
            취소
          </Button>
          <Button type="submit" disabled={isPending}>
            저장
          </Button>
        </div>
      </form>
    </Form>
  );
}
