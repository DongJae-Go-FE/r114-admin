"use client";

import dynamic from "next/dynamic";

import Spinner from "@/components/Spinner";

import { cn } from "@/lib/utils";

const TextEditorNoSSR = dynamic(() => import("./QuillEditor"), {
  ssr: false,
  loading: () => <Spinner />,
});

export default function TextEditor({
  value,
  onChange,
  defaultValue = "",
  disabled,
  isError,
}: {
  value?: string;
  onChange?: (val: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  isError?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative min-h-[244.86px] border border-gray-200 rounded-sm",
        isError && "border-red-500"
      )}
    >
      <TextEditorNoSSR
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}
