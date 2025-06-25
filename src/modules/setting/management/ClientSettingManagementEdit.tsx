"use client";

import { useRouter } from "next/navigation";

import { useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Button } from "@/components/Button";
import { DataTable } from "@/components/DataTable";

import { CommonAdminPowerSelect } from "@/components/Select/CommonSelect/CommonAdminPowerSelect";
import { CommonStateSelect } from "@/components/Select/CommonSelect/CommonStateSelect";

import { Textarea } from "@/components/Textarea";

import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from "@/components/Form";

import SettingManagementDetailColumns from "./table-columns/SettingManagementDetailColumns";

import {
  GET_SETTING_MANAGEMENT_DETAIL_LIST_SCHEMA,
  PUT_SETTING_MANAGEMENT_SCHEMA,
} from "@/modules/setting/management/model/schema";

import {
  CONFIRM_EDIT_SAVE_STRING,
  COMPLETE_EDIT_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  TXT_MAX_LENGTH,
} from "@/lib/const";

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

export default function ClientSettingManagementEdit({
  adminCd,
}: {
  adminCd: string;
}) {
  const { push } = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof PUT_SETTING_MANAGEMENT_SCHEMA>>({
    resolver: zodResolver(PUT_SETTING_MANAGEMENT_SCHEMA),
    defaultValues: {
      state: "",
      adMgmt: "",
      content: "",
    },
  });

  const handleEdit = async () => {
    if (confirm(`관리자 정보 내용을 ${CONFIRM_EDIT_SAVE_STRING}`)) {
      try {
        startTransition(() => {
          alert(`관리자 정보 내용이 ${COMPLETE_EDIT_STRING}`);
          push(`/setting/management/${adminCd}`);
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleCancel = () => {
    if (confirm(CONFIRM_CANCEL_SAVE_STRING)) {
      alert(COMPLETE_CANCEL_STRING);
      push(`/setting/management/${adminCd}`);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-8">
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="sub-title">관리자 정보</h4>
            <DescriptionTable>
              <tbody>
                <tr>
                  <th colSpan={1}>상태</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CommonStateSelect
                              {...field}
                              className="w-[400px] bg-white mb-0"
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
                  <th colSpan={1}>관리자 권한</th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CommonAdminPowerSelect
                              {...field}
                              className="w-[400px] bg-white mb-0"
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
              </tbody>
            </DescriptionTable>
          </div>

          <DescriptionTable>
            <tbody>
              <tr>
                <th colSpan={1}>아이디</th>
                <td colSpan={5}>masterforce999</td>
              </tr>
              <tr>
                <th colSpan={1}>사번</th>
                <td colSpan={5}>123456</td>
              </tr>
              <tr>
                <th colSpan={1}>이름</th>
                <td colSpan={5}>가포스</td>
              </tr>
              <tr>
                <th colSpan={1}>이메일</th>
                <td colSpan={5}>masterforce999@hihi.com</td>
              </tr>
            </tbody>
          </DescriptionTable>
          <div>
            <h4 className="sub-title">업데이트 이력</h4>
            <DataTable
              data={data}
              totalCount={data.length}
              schema={GET_SETTING_MANAGEMENT_DETAIL_LIST_SCHEMA}
              columns={SettingManagementDetailColumns}
              isTableHeader={false}
            />
          </div>
          <div>
            <h4 className="sub-title">
              업데이트 사유 <span className="attention">*</span>
            </h4>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="w-full bg-white mb-0"
                      placeholder="20자 내외로 입력하세요."
                      disabled={isPending}
                      maxLength={TXT_MAX_LENGTH}
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
              취소
            </Button>
            <Button type="button" disabled={isPending} onClick={handleEdit}>
              저장
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
