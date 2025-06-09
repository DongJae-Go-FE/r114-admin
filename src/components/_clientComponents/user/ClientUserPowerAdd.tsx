"use client";

import { useRouter } from "next/navigation";

import { useMemo, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import DescriptionTable from "@/components/DescriptionTable/DescriptionTable";
import { Input } from "@/components/Input";
import { CustomSelect } from "@/components/Select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tab";
import { Checkbox } from "@/components/Checkbox";
import { Button } from "@/components/Button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/Form";

import { POST_USER_POWER_SCHEMA } from "@/schema/user/power/schema";

import {
  CONFIRM_ADD_SAVE_STRING,
  COMPLETE_SAVE_STRING,
  CONFIRM_CANCEL_SAVE_STRING,
  COMPLETE_CANCEL_STRING,
  INPUT_MAX_LENGTH,
  INPUT_MIN_LENGTH,
} from "@/const/const";

import data from "./app-sidebar-menu-list";

import { menuAccessType, dataCopyType, excelDownloadType } from "@/const/enum";

type TMenu = {
  title: string;
  href?: string;
  items?: TMenu[];
  children?: TMenu[];
};

type MenuRow = {
  depth: string[];
  key: string;
};

export default function ClientUserPowerAdd() {
  const { push } = useRouter();

  const [isPending, startTransition] = useTransition();
  const [checkedRows, setCheckedRows] = useState<string[]>([]);

  const form = useForm<z.infer<typeof POST_USER_POWER_SCHEMA>>({
    resolver: zodResolver(POST_USER_POWER_SCHEMA),
    mode: "onChange",
    defaultValues: {
      name: "",
      menu: "1",
      data: "",
      excel: "",
      menuPower: [],
    },
  });

  const rows = useMemo(() => flattenMenus(data), []);

  const rowspanMaps = useMemo(
    () => [0, 1, 2, 3].map((i) => getRowspanInfo(rows, i)),
    [rows]
  );

  const allKeys = useMemo(() => rows.map((row) => row.key), [rows]);

  const isAllChecked = useMemo(
    () => allKeys.every((key) => checkedRows.includes(key)),
    [allKeys, checkedRows]
  );

  const handleToggleAll = (checked: boolean) => {
    setCheckedRows(checked ? allKeys : []);
  };

  const handleToggle = (key: string, checked: boolean) => {
    setCheckedRows((prev) => {
      const exists = prev.includes(key);
      if (checked && !exists) return [...prev, key];
      if (!checked && exists) return prev.filter((k) => k !== key);
      return prev;
    });
  };

  const handleSave = async (values: z.infer<typeof POST_USER_POWER_SCHEMA>) => {
    //TODO - 규칙 미준수 처리

    if (confirm(`권한 정보를 ${CONFIRM_ADD_SAVE_STRING}`)) {
      try {
        console.log(values);
        startTransition(() => {
          alert(`권한 정보 ${COMPLETE_SAVE_STRING}`);
          push("/user/power");
        });
      } catch (e) {
        alert(e);
      }
    }
  };

  const handleCancel = () => {
    if (confirm(CONFIRM_CANCEL_SAVE_STRING)) {
      alert(COMPLETE_CANCEL_STRING);
      push("/user/power");
    }
  };

  const renderReps5 = () => {
    return (
      <DescriptionTable>
        <colgroup>
          <col width="22%" />
          <col width="22%" />
          <col width="22%" />
          <col width="22%" />
          <col width="12%" />
        </colgroup>
        <thead>
          <tr>
            <th>메뉴1</th>
            <th>메뉴2</th>
            <th>메뉴3</th>
            <th>메뉴4</th>
            <th>
              <Checkbox
                checked={isAllChecked}
                onCheckedChange={(checked) => handleToggleAll(Boolean(checked))}
                className="bg-white relative top-0.5"
                id="all"
              />
              <label htmlFor="all" hidden>
                전체선택
              </label>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ depth, key }, rowIndex) => (
            <tr key={key}>
              {depth.map((col, depthIndex) => {
                if (depthIndex === 3) {
                  return (
                    <td key={depthIndex} className="border px-2 py-1 align-top">
                      {col}
                    </td>
                  );
                }

                const rowspan = rowspanMaps[depthIndex][rowIndex];

                if (rowspan) {
                  return (
                    <td
                      key={depthIndex}
                      rowSpan={rowspan}
                      className="border px-2 py-1 align-top"
                    >
                      {col}
                    </td>
                  );
                }
                return col === "" ? (
                  <td key={depthIndex} className="border px-2 py-1 align-top" />
                ) : null;
              })}
              <td className="text-center border">
                <Checkbox
                  id={`checkbox-${key}`}
                  className="relative top-0.5"
                  checked={checkedRows.includes(key)}
                  disabled={isPending}
                  onCheckedChange={(checked) =>
                    handleToggle(key, Boolean(checked))
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </DescriptionTable>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSave)}>
        <div className="flex flex-col gap-6">
          <div>
            <h4 className="sub-title">권한 그룹 명</h4>
            <DescriptionTable>
              <tbody>
                <tr>
                  <th>
                    권한 그룹 명 <span className="attention">*</span>
                  </th>
                  <td colSpan={5}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              type="text"
                              placeholder="권한, 그룹명을 입력해주세요."
                              disabled={isPending}
                              minLength={INPUT_MIN_LENGTH}
                              maxLength={INPUT_MAX_LENGTH}
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
            <h4 className="sub-title">권한 목록</h4>
            <DescriptionTable>
              <tbody>
                <tr>
                  <th>메뉴별 접근 권한</th>
                  <td>
                    <FormField
                      control={form.control}
                      name="menu"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CustomSelect
                              {...field}
                              options={Object.entries(menuAccessType).map(
                                ([value, title]) => ({
                                  value,
                                  label: title,
                                })
                              )}
                              className="w-full bg-white"
                              placeholder="On"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <th>데이터 복사 권한</th>
                  <td>
                    <FormField
                      control={form.control}
                      name="data"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CustomSelect
                              {...field}
                              options={Object.entries(dataCopyType).map(
                                ([value, title]) => ({
                                  value,
                                  label: title,
                                })
                              )}
                              className="w-full bg-white"
                              placeholder="전체 데이터 복사"
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </td>
                  <th>엑셀 다운로드 권한</th>
                  <td>
                    <FormField
                      control={form.control}
                      name="excel"
                      render={({ field }) => (
                        <FormControl>
                          <CustomSelect
                            {...field}
                            options={Object.entries(excelDownloadType).map(
                              ([value, title]) => ({
                                value,
                                label: title,
                              })
                            )}
                            className="w-full bg-white"
                            placeholder="전체 정보 다운로드"
                            disabled={isPending}
                          />
                        </FormControl>
                      )}
                    />
                  </td>
                </tr>
              </tbody>
            </DescriptionTable>
          </div>
          <div>
            <h4 className="sub-title flex justify-between">메뉴 목록</h4>
            <Tabs defaultValue="reps5.0" className="w-full">
              <TabsList>
                <TabsTrigger value="reps5.0">REPS 5.0</TabsTrigger>
                <TabsTrigger value="1">솔루션명</TabsTrigger>
              </TabsList>
              <TabsContent value="reps5.0">{renderReps5()}</TabsContent>
              <TabsContent value="1">솔루션 추가예정</TabsContent>
            </Tabs>
          </div>
          <div className="btn-area">
            <Button
              type="button"
              color="white"
              disabled={isPending}
              onClick={handleCancel}
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

function flattenMenus(menus: TMenu[], parents: string[] = []): MenuRow[] {
  let result: MenuRow[] = [];

  for (const menu of menus) {
    const path = [...parents, menu.title];

    if (menu.items?.length) {
      result = result.concat(flattenMenus(menu.items, path));
    } else if (menu.children?.length) {
      result = result.concat(flattenMenus(menu.children, path));
    } else {
      result.push({
        depth: [...path, "", "", ""].slice(0, 4),
        key: path.join(" > "),
      });
    }
  }

  return result;
}

function getRowspanInfo(rows: MenuRow[], depthIndex: number) {
  const rowspanMap: { [rowIndex: number]: number } = {};
  let prev = "";
  let count = 0;
  let startIndex = 0;

  rows.forEach((row, i) => {
    const curr = row.depth[depthIndex];
    if (curr === "") {
      prev = "";
      count = 0;
      return;
    }

    if (curr === prev) {
      count++;
    } else {
      if (count > 0) {
        rowspanMap[startIndex] = count;
      }
      count = 1;
      prev = curr;
      startIndex = i;
    }
  });

  if (count > 0) {
    rowspanMap[startIndex] = count;
  }

  return rowspanMap;
}
