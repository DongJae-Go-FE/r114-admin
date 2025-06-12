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

interface CommonAdminPowerSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
}

export function CommonAdminPowerSelect({
  value,
  onChange,
  className,
  placeholder = "선택하세요",
  size = "md",
  label,
  disabled,
}: CommonAdminPowerSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectTrigger size={size} aria-label="셀렉트 박스" className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectScrollUpButton />
        <SelectItem value="0">전체</SelectItem>
        <SelectItem value="1">최고</SelectItem>
        <SelectItem value="2">상급</SelectItem>
        <SelectItem value="3">하급</SelectItem>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}
