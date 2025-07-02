"use client";

import {
  Fragment,
  useMemo,
  useState,
  useId,
  useEffect,
  useRef,
  CSSProperties,
} from "react";

import { Button } from "../Button";
import Spinner from "../Spinner";

import CloseIcon from "./icons/CloseIcon";
import ErrorIcon from "./icons/ErrorIcon";
import FileIcon from "./icons/FileIcon";
import UploadIcon from "./icons/UploadIcon";

import { FileUploadProps, FileType } from "./type";

import { MAX_FILE_SIZE, test, convertByteToString } from "./const";

import { useCount } from "@/hooks/useCount";

export default function FileUpload({
  accept,
  multiple,
  buttonText = "Upload",
  dragAreaPlaceholder = "Click or drag file to this area to upload",
  upload = test,
  onDeleteClick,
  initialFiles = [],
  disabled,
  isLoading,
  isError,
  limit,
  onLimitOver,
}: FileUploadProps) {
  const componentId = useId();
  const hasInitialized = useRef(false);
  const prevInitialFilesRef = useRef<
    (File | { name: string; size: number; lastModified: number })[]
  >([]);

  const [fileStates, setFileStates] = useState<FileType[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [isFail, setIsFail] = useState(false);

  const handleChange = async (files: FileList) => {
    const fileArray = Array.from(files);

    if (limit && fileStates.length + fileArray.length > limit) {
      onLimitOver?.();
      return;
    }

    const oversizedFiles = fileArray.filter(
      (file) => file.size > MAX_FILE_SIZE
    );
    if (oversizedFiles.length > 0) {
      alert(`파일 갯수 초과 하였습니다.\n 갯수를 확인해주세요`);
      return;
    }

    const newStates = fileArray.map((file, index) => ({
      key: `${Date.now()}-${index}`,
      file,
      isLoading: true,
      isSuccess: false,
      fileSize: file.size,
    }));

    setFileStates((prev) => [...prev, ...newStates]);
    setIsFinished(false);

    try {
      await upload?.(fileArray);
      setFileStates((prev) =>
        prev.map((item) => {
          if (newStates.find((n) => n.key === item.key)) {
            return { ...item, isLoading: false, isSuccess: true };
          }
          return item;
        })
      );
      setIsFail(false);
    } catch {
      setFileStates((prev) =>
        prev.map((item) => {
          if (newStates.find((n) => n.key === item.key)) {
            return { ...item, isLoading: false, isSuccess: false };
          }
          return item;
        })
      );
      setIsFail(true);
    }

    setIsFinished(true);
  };

  const handleDeleteClick = (key: string) => {
    if (fileStates.every(({ isLoading }) => !isLoading)) {
      const target = fileStates.find((item) => item.key === key);
      if (!target) return;

      setFileStates((prev) => prev.filter((item) => item.key !== key));

      if (onDeleteClick) {
        onDeleteClick(target.file);
      }
    }
  };

  useEffect(() => {
    const hasChanged =
      JSON.stringify(prevInitialFilesRef.current) !==
      JSON.stringify(initialFiles);

    if (!initialFiles || (!hasChanged && hasInitialized.current)) return;

    const newFileStates = initialFiles.map((item, index) => {
      const isRealFile = item instanceof File;
      const file = isRealFile
        ? item
        : new File([""], item.name, {
            type: "application/octet-stream",
            lastModified: item.lastModified,
          });

      return {
        key: `initial-${index}`,
        file,
        isLoading: false,
        isSuccess: true,
        fileSize: isRealFile ? item.size : item.size,
      };
    });

    setFileStates(newFileStates);
    hasInitialized.current = true;
    prevInitialFilesRef.current = initialFiles;
  }, [initialFiles]);

  const progress = useMemo(() => {
    if (fileStates.length === 0) return 0;
    return Math.round(
      (fileStates.filter(({ isLoading }) => !isLoading).length /
        fileStates.length) *
        100
    );
  }, [fileStates]);

  const { count } = useCount(progress, {
    speed: 20,
    step: Math.ceil(10 / fileStates.length),
    enable: fileStates.some(({ isLoading }) => isLoading),
  });

  const successFiles = fileStates.filter(
    ({ isLoading, isSuccess }) => !isLoading && isSuccess
  );
  const failFiles = fileStates.filter(
    ({ isLoading, isSuccess }) => !isLoading && !isSuccess
  );

  const hasFail = failFiles.length > 0;

  const dragAreaStyle = `w-full p-8 flex flex-col items-center justify-center border border-dashed rounded-[6px] ${
    isError ? "border-red-500" : "border-gray-200"
  }  text-gray-500 body02m relative h-[147px]`;
  const labelStyle =
    "relative inline-flex cursor-pointer after:content-[''] after:absolute after:inset-0";
  const progressStyle =
    "progress relative w-full h-2 bg-gray-200 rounded-full overflow-hidden after:absolute after:top-0 after:left-0 after:h-full after:bg-gray-900 after:transition-all";

  const progressAddStyle: CSSProperties & { [key: string]: string } = {
    "--progress-width": `${progress}%`,
    "--progress-bg-color": isFail ? "#ff3b30" : "#111111",
  };

  return (
    <div className="flex flex-col gap-1">
      <input
        id={componentId}
        type="file"
        hidden
        accept={accept}
        disabled={disabled || isLoading}
        multiple={multiple}
        onChange={({ target: { files } }) => {
          if (files) {
            handleChange(files);
          }
        }}
      />
      <div
        className={dragAreaStyle}
        onDragStart={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDragEnd={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.files) {
            if ((!multiple && e.dataTransfer.files.length === 1) || multiple) {
              handleChange(e.dataTransfer.files);
            }
          }
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Fragment>
            <UploadIcon />
            <span className="text-center block mt-1 mb-2">
              {dragAreaPlaceholder}
            </span>

            <label htmlFor={componentId} className={labelStyle}>
              <Button color="white" size="xs">
                {buttonText}
              </Button>
            </label>
          </Fragment>
        )}
      </div>
      {fileStates.length > 0 && (
        <Fragment>
          <div className="flex flex-col gap-2 m-[8px 0 16px]">
            <div className="flex justify-between items-center">
              <span className="text-gray-900 body02m">
                {successFiles.length} / {fileStates.length}개 업로드
                {isFinished && hasFail && (
                  <span className="text-red-500">{` (${failFiles.length}개 실패)`}</span>
                )}
              </span>
              <span
                className={`body04r ${
                  isFinished ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {count}%
              </span>
            </div>
            <div className={progressStyle} style={progressAddStyle}>
              <style>
                {`
            .progress::after {
              content: '';
              width: var(--progress-width);
              background-color: var(--progress-bg-color);
            }
            `}
              </style>
            </div>
          </div>
          <ul className="flex flex-col gap-y-2 m-0 p-0">
            {fileStates.map(({ key, file, isLoading, isSuccess, fileSize }) => {
              let stateIcon = null;
              if (isLoading) {
                stateIcon = <FileIcon />;
              } else if (isSuccess) {
                stateIcon = <FileIcon />;
              } else {
                stateIcon = <ErrorIcon />;
              }
              return (
                <li className="flex w-full" key={key}>
                  <div className="w-10 h-10 rounded-[6px] flex shrink-0 items-center justify-center bg-white border mr-2 relative">
                    {isLoading ? (
                      <Spinner className="w-4.5 h-4.5" />
                    ) : (
                      stateIcon
                    )}
                  </div>
                  <div className="flex flex-col w-[calc(100%-64px)]">
                    <span
                      className={`truncate body02m ${
                        !isLoading && !isSuccess
                          ? "text-red-500"
                          : "text-gray-900"
                      }`}
                    >
                      {file.name}
                    </span>
                    <span className="truncate body04r text-gray-500">
                      {convertByteToString(fileSize)}
                    </span>
                  </div>

                  <Button
                    variant="icon"
                    size="xs"
                    color="white"
                    disabled={isLoading}
                    title="파일 삭제"
                    onClick={() => handleDeleteClick(key)}
                  >
                    <CloseIcon />
                  </Button>
                </li>
              );
            })}
          </ul>
        </Fragment>
      )}
    </div>
  );
}
