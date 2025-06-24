import { InputHTMLAttributes } from "react";

interface FileUploadProps
  extends Pick<
    InputHTMLAttributes<HTMLInputElement>,
    "accept" | "multiple" | "style"
  > {
  size?: "small" | "medium";
  buttonText?: string;
  dragAreaPlaceholder?: string;
  upload?: (files: File[]) => Promise<unknown>;
  onDeleteClick?: (file: File) => void;
  initialFiles?: (
    | File
    | { name: string; size: number; lastModified: number }
  )[];
  limit?: number;
  disabled?: boolean;
  isLoading?: boolean;
  onLimitOver?: () => void;
}

type FileType = {
  key: string;
  file: File;
  isLoading: boolean;
  isSuccess: boolean;
  fileSize: number;
};

export type { FileUploadProps, FileType };
