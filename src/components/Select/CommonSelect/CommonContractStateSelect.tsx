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

interface CommonContractStateSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
}

export function CommonContractStateSelect({
  value,
  onChange,
  className,
  placeholder = "선택하세요",
  size = "md",
  label,
  disabled,
}: CommonContractStateSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectTrigger size={size} aria-label="셀렉트 박스" className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectScrollUpButton />
        <SelectItem value="0">신규계약</SelectItem>
        <SelectItem value="1">재계약</SelectItem>
        <SelectItem value="2">계약만료</SelectItem>
        <SelectItem value="3">계약해지</SelectItem>
        <SelectItem value="4">계약대기</SelectItem>
        <SelectItem value="5">계약연장</SelectItem>
        <SelectItem value="6">계약보류</SelectItem>
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}
