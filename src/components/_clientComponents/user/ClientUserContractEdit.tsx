"use client";

import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import { CommonBusinessDivideSelect } from "@/components/Select/CommonSelect/CommonBusinessDivideSelect";
import { CommonIndustryDivideOneSelect } from "@/components/Select/CommonSelect/CommonIndustryDivideOneSelect";
import { CommonIndustryDivideTwoSelect } from "@/components/Select/CommonSelect/CommonIndustryDivideTwoSelect";
import { CommonContractStateSelect } from "@/components/Select/CommonSelect/CommonContractStateSelect";

import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/Input";
import { FileUpload } from "@/components/FileUpload";

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
  GET_USER_CONTRACT_DETAIL_LIST_SCHEMA,
  PUT_USER_CONTRACT,
} from "@/schema/user/contract/schema";

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

export default function ClientUserContractEdit({ postNo }: { postNo: string }) {
  const { push } = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isOk, setIsOk] = useState(false);

  const form = useForm<z.infer<typeof PUT_USER_CONTRACT>>({
    resolver: zodResolver(PUT_USER_CONTRACT),
    defaultValues: {
      code: "",
      date: "",
      contract: "",
      business: "",

      member: "",
      divide1: "",
      divide2: "",
      reason: "",
      file: "",
    },
  });

  const businessValue = form.watch("business");

  const handleValid = async () => {
    if (businessValue) {
      try {
        setIsOk(true);
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleEdit = async (values: z.infer<typeof PUT_USER_CONTRACT>) => {
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
            <h4 className="sub-title">계약정보</h4>
            <DescriptionTable>
              <tbody>
                <tr>
                  <th colSpan={1}>계약코드</th>
                  <td colSpan={5}>자동입력</td>
                </tr>
                <tr>
                  <th colSpan={1}>
                    최근 계약 일자 <span className="attention">*</span>
                  </th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <DatePicker
                              {...field}
                              id="time"
                              initialValue={new Date()}
                              onChangDate={() => {}}
                              className="bg-white w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                </tr>
                <tr>
                  <th colSpan={1}>계약 상태</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="contract"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CommonContractStateSelect
                              {...field}
                              className="bg-white w-full"
                              placeholder="전체"
                              disabled={isPending}
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
          <DescriptionTable>
            <tbody>
              <tr>
                <th colSpan={1}>
                  사업자 등록번호 <span className="attention">*</span>
                </th>
                <td colSpan={5}>
                  <div className="flex gap-x-2">
                    <FormField
                      control={form.control}
                      name="business"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex w-full gap-x-1">
                              <Input
                                {...field}
                                type="text"
                                disabled={isOk}
                                placeholder="사업자 등록 번호를 입력해주세요."
                                minLength={INPUT_MIN_LENGTH}
                                maxLength={INPUT_MAX_LENGTH}
                                className="w-[400px]"
                              />
                              <Button
                                type="button"
                                color="white"
                                disabled={
                                  businessValue.length === 0 || !businessValue
                                }
                                onClick={handleValid}
                              >
                                유효성 검증
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <th colSpan={1}>사업자 구분</th>
                <td colSpan={5}>
                  <FormField
                    control={form.control}
                    name="divide1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommonBusinessDivideSelect
                            {...field}
                            className="bg-white w-full"
                            disabled={isPending}
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
                <th colSpan={1}>
                  사업자 명 <span className="attention">*</span>
                </th>
                <td colSpan={5}>
                  <FormField
                    control={form.control}
                    name="member"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="사업자 명을 입력해주세요."
                            minLength={INPUT_MIN_LENGTH}
                            maxLength={INPUT_MAX_LENGTH}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  업종 구분1 <span className="attention">*</span>
                </th>
                <td colSpan={2}>
                  <FormField
                    control={form.control}
                    name="divide1"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommonIndustryDivideOneSelect
                            {...field}
                            className="bg-white w-full"
                            disabled={isPending}
                            onChange={(value) => {
                              field.onChange(value);
                              form.setValue("divide2", "0");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
                <th colSpan={1}>
                  업종 구분2 <span className="attention">*</span>
                </th>
                <td colSpan={2}>
                  <FormField
                    control={form.control}
                    name="divide2"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CommonIndustryDivideTwoSelect
                            {...field}
                            className="bg-white w-full"
                            disabled={
                              isPending ||
                              !form.watch("divide1") ||
                              form.watch("divide1").length === 0
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
              </tr>
              <tr>
                <th colSpan={1}>
                  사업자 등록증 <span className="attention">*</span>
                </th>
                <td colSpan={5}>
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            {...field}
                            dragAreaPlaceholder="이곳을 클릭하거나 파일을 드롭하세요."
                            multiple
                            limit={5}
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
          <div>
            <h4 className="sub-title">업데이트 이력</h4>
            <DataTable
              data={data}
              schema={GET_USER_CONTRACT_DETAIL_LIST_SCHEMA}
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
