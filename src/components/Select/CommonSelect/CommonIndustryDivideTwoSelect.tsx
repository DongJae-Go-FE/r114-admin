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

interface CommonIndustryDivideTwoSelectProps {
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  size?: "xs" | "sm" | "md" | "lg";
  label?: string;
  disabled?: boolean;
  prevValue?: string;
}

export const businessSubType = {
  "1": {
    "1": "시공사",
    "2": "시행사",
    "3": "분양대행사",
    "4": "감정평가사",
  },
  "2": {
    "1": "은행",
    "2": "증권사",
    "3": "자산운용사",
    "4": "보험사",
    "5": "신탁사",
  },
  "3": {
    "1": "공공기관",
    "2": "공기업",
  },
  "4": {
    "1": "회계/세무",
    "2": "광고 대행사",
    "3": "기타",
  },
};

export function CommonIndustryDivideTwoSelect({
  value,
  onChange,
  className,
  placeholder = "",
  size = "md",
  label,
  disabled,
  prevValue,
}: CommonIndustryDivideTwoSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      {label && <SelectLabel>{label}</SelectLabel>}
      <SelectTrigger size={size} aria-label="셀렉트 박스" className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className="max-h-60 overflow-y-auto">
        <SelectScrollUpButton />
        {Object.entries(
          businessSubType[prevValue as keyof typeof businessSubType] || {}
        ).map(([value, title]) => {
          return (
            <SelectItem key={value} value={value}>
              {title}
            </SelectItem>
          );
        })}
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}
