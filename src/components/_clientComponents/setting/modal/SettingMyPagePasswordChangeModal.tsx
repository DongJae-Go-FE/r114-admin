"use client";

import { useState, useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/Dialog";

import { Button } from "@/components/Button";

import { Input } from "@/components/Input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/Form";

import { POST_SETTING_MY_PAGE_ID_CHANGE_SCHEMA } from "@/schema/setting/myPage/schema";

import {
  handleLogout,
  handlePasswordChange,
} from "@/severActions/serverActions";

const MIN = 8;
const MAX = 20;

export default function SettingMyPagePasswordChangeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof POST_SETTING_MY_PAGE_ID_CHANGE_SCHEMA>>({
    resolver: zodResolver(POST_SETTING_MY_PAGE_ID_CHANGE_SCHEMA),
    defaultValues: {
      pw: "",
      newPw: "",
      newPwCheck: "",
    },
  });

  const handleEdit = async (
    values: z.infer<typeof POST_SETTING_MY_PAGE_ID_CHANGE_SCHEMA>
  ) => {
    if (confirm("비밀번호를 변경하겠습니까?")) {
      try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
          formData.append(key, value);
        }
        await handlePasswordChange(formData);
        startTransition(() => {
          alert("비밀번호 변경이 완료 되었습니다.");
        });
      } catch (e) {
        alert(e);
      } finally {
        setIsOpen(false);
        form.reset();
        await handleLogout();
      }
    }
  };

  const formValues = form.watch();
  const isDisabled =
    isPending || !formValues.pw || !formValues.newPw || !formValues.newPwCheck;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" color="white">
          비밀번호 변경
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-8">
            <FormField
              control={form.control}
              name="pw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>기존 비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      minLength={MIN}
                      maxLength={MAX}
                      disabled={isPending}
                      placeholder="기존 비밀번호를 입력해주세요."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPw"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>변경 비밀번호</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      minLength={MIN}
                      maxLength={MAX}
                      disabled={isPending}
                      placeholder="변경할 비밀번호를 입력해주세요."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPwCheck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>변경 비밀번호 확인</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      minLength={MIN}
                      maxLength={MAX}
                      disabled={isPending}
                      placeholder="변경할 비밀번호를 다시 한번 입력해주세요."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                color="white"
                disabled={isPending}
                onClick={() => {
                  setIsOpen(false);
                  form.reset();
                }}
              >
                취소
              </Button>
              <Button type="submit" color="black" disabled={isDisabled}>
                비밀번호 변경
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
