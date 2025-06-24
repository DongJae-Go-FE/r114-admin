"use client";

import { useRouter } from "next/navigation";

import { useTransition } from "react";

import { addDays, format, parse } from "date-fns";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm, Controller } from "react-hook-form";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import { CommonMemberStateSelect } from "@/components/Select/CommonSelect/CommonMemberStateSelect";
import { CommonIdDivideSelect } from "@/components/Select/CommonSelect/CommonIdDivideSelect";
import { CommonPowerSettingSelect } from "@/components/Select/CommonSelect/CommonPowerSettingSelect";

import { DateRangePicker } from "@/components/DateRangePicker";
import { Input } from "@/components/Input";

import { Textarea } from "@/components/Textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/Form";

import UserContractDetailColumns from "./tableColumns/UserContractDetailColumns";

import {
  GET_USER_MEMBER_DETAIL_LIST_SCHEMA,
  PUT_USER_MEMBER,
} from "@/schema/user/member/schema";

import {
  CONFIRM_EDIT_SAVE_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  COMPLETE_EDIT_STRING,
  INPUT_MAX_LENGTH,
  INPUT_MIN_LENGTH,
  TXT_MAX_LENGTH,
} from "@/const/const";

const data = [
  {
    date: "2026-05-10 08:50",
    update: "계약상태",
    reason: "계약상태 변경",
    id: "admin",
  },
  {
    date: "2026-05-10 08:50",
    update: "계약상태",
    reason: "계약상태 변경",
    id: "admin",
  },
  {
    date: "2026-05-10 08:50",
    update: "계약상태",
    reason: "계약상태 변경",
    id: "admin",
  },
];

export default function ClientUserMemberEdit({ postNo }: { postNo: string }) {
  const { push } = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PUT_USER_MEMBER>>({
    resolver: zodResolver(PUT_USER_MEMBER),
    defaultValues: {
      memberState: "",
      memberType: "",
      startDate: "",
      endDate: "",
      email: "",
      phone: "",
      ipTotal: "",
      powerType: "",
      reason: "",
    },
  });

  const handleEdit = async (values: z.infer<typeof PUT_USER_MEMBER>) => {
    //TODO - 규칙 미준수 처리

    if (confirm(`계약정보를 ${CONFIRM_EDIT_SAVE_STRING}`)) {
      try {
        console.log(values);
        startTransition(() => {
          alert(`계약정보가 ${COMPLETE_EDIT_STRING}`);
          push("/user/contract");
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleCancel = () => {
    if (confirm(CONFIRM_CANCEL_SAVE_STRING)) {
      alert(COMPLETE_CANCEL_STRING);
      push(`/user/contract/${postNo}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEdit)}>
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="sub-title">회원 정보</h4>
            <DescriptionTable>
              <tbody>
                <tr>
                  <th colSpan={1}>회원 상태</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="memberState"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CommonMemberStateSelect
                              {...field}
                              className="bg-white w-full"
                              placeholder="전체"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>계정 구분</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="memberType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CommonIdDivideSelect
                              {...field}
                              className="bg-white w-full"
                              placeholder="전체"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>계약 코드</th>
                  <td colSpan={5}>20240508-C-0001</td>
                </tr>
                <tr>
                  <th colSpan={1}>계약 상태</th>
                  <td colSpan={5}>계약 대기</td>
                </tr>
                <tr>
                  <th colSpan={1}>최근 계약 일자</th>
                  <td colSpan={5}>2025-05-10</td>
                </tr>
                <tr>
                  <th colSpan={1}>회원명</th>
                  <td colSpan={5}>가나다 컴퍼니</td>
                </tr>
                <tr>
                  <th colSpan={1}>서비스 사용 기간</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={() => (
                        <Controller
                          control={form.control}
                          name="startDate"
                          render={({ field }) => {
                            const from = field.value
                              ? parse(
                                  field.value,
                                  "yyyy-MM-dd HH:mm",
                                  new Date()
                                )
                              : new Date();

                            const to = form.watch("endDate")
                              ? parse(
                                  form.watch("endDate"),
                                  "yyyy-MM-dd HH:mm",
                                  new Date()
                                )
                              : addDays(new Date(), 31);

                            return (
                              <DateRangePicker
                                id="picker"
                                initialValue={{ from, to }}
                                className="w-full"
                                onChangDate={(value) => {
                                  field.onChange(
                                    value?.from
                                      ? format(value.from, "yyyy-MM-dd HH:mm")
                                      : ""
                                  );
                                  form.setValue(
                                    "endDate",
                                    value?.to
                                      ? format(value.to, "yyyy-MM-dd HH:mm")
                                      : ""
                                  );
                                }}
                              />
                            );
                          }}
                        />
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>아이디</th>
                  <td colSpan={5}>admin</td>
                </tr>
                <tr>
                  <th colSpan={1}>이메일 주소</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              minLength={INPUT_MIN_LENGTH}
                              maxLength={INPUT_MAX_LENGTH}
                              placeholder="이메일 주소를 입력해주세요."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>휴대폰 번호</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              minLength={INPUT_MIN_LENGTH}
                              maxLength={INPUT_MAX_LENGTH}
                              placeholder="휴대폰 번호를 입력해주세요."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>IP 발급 개수(사용/전체)</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center gap-x-2">
                              <Input
                                type="text"
                                minLength={INPUT_MIN_LENGTH}
                                maxLength={INPUT_MAX_LENGTH}
                                className="w-100"
                                disabled
                              />{" "}
                              /{" "}
                              <Input
                                {...field}
                                type="text"
                                minLength={INPUT_MIN_LENGTH}
                                maxLength={INPUT_MAX_LENGTH}
                                className="w-100"
                                placeholder="최대 카운트를 입력해주세요"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>권한 설정</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="powerType"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CommonPowerSettingSelect
                              {...field}
                              className="bg-white w-full"
                              placeholder="전체"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </DescriptionTable>
          </div>
          <div>
            <h4 className="sub-title">업데이트 이력</h4>
            <DataTable
              data={data}
              totalCount={data.length}
              schema={GET_USER_MEMBER_DETAIL_LIST_SCHEMA}
              columns={UserContractDetailColumns}
              isTableHeader={false}
            />
          </div>
          <div>
            <h4 className="sub-title">
              업데이트 사유 <span className="attention">*</span>
            </h4>
            <FormField
              control={form.control}
              name="reason"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      maxLength={TXT_MAX_LENGTH}
                      placeholder="20자 내외로 입력하세요."
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="btn-area">
            <Button type="submit" color="red" className="mr-auto">
              비밀번호 초기화
            </Button>
            <Button
              type="button"
              color="white"
              onClick={handleCancel}
              disabled={isPending}
            >
              최소
            </Button>
            <Button type="submit" disabled={isPending}>
              저장
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
