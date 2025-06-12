"use client";

import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectLabel,
} from "../Select";

interface CommonPowerGroupSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
}

export function CommonPowerGroupSelect({
  value,
  onChange,
  className,
  placeholder = "선택하세요",
  size = "md",
  label,
  disabled,
}: CommonPowerGroupSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectTrigger size={size} aria-label="셀렉트 박스" className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectScrollUpButton />
        <SelectItem value="0">전체</SelectItem>
        <SelectItem value="1">회원1</SelectItem>
        <SelectItem value="2">회원2</SelectItem>
        <SelectItem value="3">회원3</SelectItem>
        <SelectItem value="4">테스트(시연)</SelectItem>
        <SelectItem value="5">테스트(검수)</SelectItem>
        <SelectItem value="6">관리자</SelectItem>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}
