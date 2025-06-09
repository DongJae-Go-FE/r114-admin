"use client";

import { useRouter } from "next/navigation";

import { addDays, format, parse } from "date-fns";

import { useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";

import { CustomSelect } from "@/components/Select";
import { DateRangePicker } from "@/components/DateRangePicker";
import { Input } from "@/components/Input";

import { POST_USER_MEMBER } from "@/schema/user/member/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/Form";

import {
  CONFIRM_ADD_SAVE_STRING,
  COMPLETE_ADD_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  INPUT_MAX_LENGTH,
  INPUT_MIN_LENGTH,
} from "@/const/const";

import { contractType } from "@/const/enum";

function ClientUserMemberAdd() {
  const { push } = useRouter();

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof POST_USER_MEMBER>>({
    resolver: zodResolver(POST_USER_MEMBER),
    defaultValues: {
      idType: "1",
      code: "",
      contractState: "",
      update: "",
      name: "",
      startDate: "",
      endDate: "",
      userId: "",
      email: "",
      phone: "",
      ipCount: "5",
      powerType: "",
    },
  });

  const handleSave = async (values: z.infer<typeof POST_USER_MEMBER>) => {
    //TODO - 규칙 미준수 처리

    if (confirm(`${CONFIRM_ADD_SAVE_STRING}`)) {
      try {
        console.log(values);
        startTransition(() => {
          alert(`계약정보가 ${COMPLETE_ADD_STRING} 회원정보랑 연결해주세요`);
          push("/user/member");
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleCancel = () => {
    if (confirm(CONFIRM_CANCEL_SAVE_STRING)) {
      alert(COMPLETE_CANCEL_STRING);
      push("/user/member");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-6">
          <DescriptionTable>
            <tbody>
              <tr>
                <th colSpan={1}>계정 구분</th>
                <td colSpan={5}>
                  <FormField
                    control={form.control}
                    name="idType"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CustomSelect
                            {...field}
                            options={Object.entries(contractType).map(
                              ([value, title]) => ({
                                value,
                                label: title,
                              })
                            )}
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
                <td colSpan={5}>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            minLength={INPUT_MIN_LENGTH}
                            maxLength={INPUT_MAX_LENGTH}
                            placeholder="검색할 계약 코드를 입력하세요."
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
                <td colSpan={5}></td>
              </tr>
              <tr>
                <th colSpan={1}>최근 계약 일자</th>
                <td colSpan={5}></td>
              </tr>
              <tr>
                <th colSpan={1}>회원명</th>
                <td colSpan={5}></td>
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
                            ? parse(field.value, "yyyy-MM-dd HH:mm", new Date())
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
                <td colSpan={5}>
                  <FormField
                    control={form.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            minLength={INPUT_MIN_LENGTH}
                            maxLength={INPUT_MAX_LENGTH}
                            placeholder="아이디를 입력해주세요."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </td>
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
                            placeholder="이메일을 입력해주세요."
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
                    name="phone"
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
                <th colSpan={1}>IP 발급 개수</th>
                <td colSpan={5}>
                  <FormField
                    control={form.control}
                    name="ipCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            minLength={INPUT_MIN_LENGTH}
                            maxLength={INPUT_MAX_LENGTH}
                            placeholder="아이피 카운트를 입력해주세요"
                          />
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
                          <CustomSelect
                            {...field}
                            options={Object.entries(contractType).map(
                              ([value, title]) => ({
                                value,
                                label: title,
                              })
                            )}
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

export default ClientUserMemberAdd;
