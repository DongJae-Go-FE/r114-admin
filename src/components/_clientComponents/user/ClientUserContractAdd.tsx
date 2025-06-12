"use client";

import { useRouter } from "next/navigation";

import { useState, useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";

import { CommonIndustryDivideOneSelect } from "@/components/Select/CommonSelect/CommonIndustryDivideOneSelect";
import { CommonIndustryDivideTwoSelect } from "@/components/Select/CommonSelect/CommonIndustryDivideTwoSelect";
import { CommonContractStateSelect } from "@/components/Select/CommonSelect/CommonContractStateSelect";

import { DatePicker } from "@/components/DatePicker";
import { Input } from "@/components/Input";
import { FileUpload } from "@/components/FileUpload";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/Form";

import {
  POST_USER_CONTRACT_INDIVIDUAL_SCHEMA,
  POST_USER_CONTRACT_CORPORATION_INDIVIDUAL_SCHEMA,
} from "@/schema/user/contract/schema";

import {
  CONFIRM_ADD_SAVE_STRING,
  COMPLETE_ADD_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  INPUT_MAX_LENGTH,
  INPUT_MIN_LENGTH,
} from "@/const/const";

function ClientUserContractAddIndividual() {
  const { push } = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof POST_USER_CONTRACT_INDIVIDUAL_SCHEMA>>({
    resolver: zodResolver(POST_USER_CONTRACT_INDIVIDUAL_SCHEMA),
    defaultValues: {
      code: "",
      date: "",
      contract: "",
      member: "",
      divide1: "1",
      divide2: "",
    },
  });

  const handleSave = async (
    values: z.infer<typeof POST_USER_CONTRACT_INDIVIDUAL_SCHEMA>
  ) => {
    //TODO - 규칙 미준수 처리

    if (confirm(`${CONFIRM_ADD_SAVE_STRING}`)) {
      try {
        console.log(values);
        startTransition(() => {
          alert(`계약정보가 ${COMPLETE_ADD_STRING} 회원정보랑 연결해주세요`);
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
      push("/user/contract");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-6">
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
          <DescriptionTable>
            <tbody>
              <tr>
                <th colSpan={1}>
                  회원(사업자)명 <span className="attention">*</span>
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
                            minLength={INPUT_MIN_LENGTH}
                            maxLength={INPUT_MAX_LENGTH}
                            placeholder="회원(사업자명)을 입력해주세요."
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
            </tbody>
          </DescriptionTable>
          <div className="btn-area">
            <Button
              type="button"
              color="white"
              onClick={handleCancel}
              disabled={isPending}
            >
              취소
            </Button>
            <Button type="submit" disabled={isPending}>
              등록
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

function ClientUserContractAddCorporation() {
  const { push } = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isOk, setIsOk] = useState(false);

  const form = useForm<
    z.infer<typeof POST_USER_CONTRACT_CORPORATION_INDIVIDUAL_SCHEMA>
  >({
    resolver: zodResolver(POST_USER_CONTRACT_CORPORATION_INDIVIDUAL_SCHEMA),
    defaultValues: {
      code: "",
      date: "",
      contract: "",
      business: "",
      member: "",
      divide1: "1",
      divide2: "",
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

  const handleSave = async (
    values: z.infer<typeof POST_USER_CONTRACT_CORPORATION_INDIVIDUAL_SCHEMA>
  ) => {
    //TODO - 규칙 미준수 처리

    if (confirm(`${CONFIRM_ADD_SAVE_STRING}`)) {
      try {
        console.log(values);
        startTransition(() => {
          alert(`계약정보가 ${COMPLETE_ADD_STRING} 회원정보랑 연결해주세요`);
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
      push("/user/contract");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-6">
          <DescriptionTable>
            <tbody>
              <tr>
                <th colSpan={1}>계약코드</th>
                <td colSpan={5}></td>
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
                            onChangDate={() => ""}
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
                <th colSpan={1}>
                  회원(사업자)명 <span className="attention">*</span>
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
                            placeholder="회원(사업자)명을 입력해주세요."
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
          <div className="btn-area">
            <Button
              type="button"
              color="white"
              disabled={isPending}
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button type="submit" disabled={isPending || !isOk}>
              등록
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}

export { ClientUserContractAddIndividual, ClientUserContractAddCorporation };
