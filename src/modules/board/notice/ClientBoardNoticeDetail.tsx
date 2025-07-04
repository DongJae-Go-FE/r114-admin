"use client";

import dynamic from "next/dynamic";

import { useRouter } from "next/navigation";

import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/Button";
import Spinner from "@/components/Spinner";

import { Skeleton } from "@/components/Skeleton";

import { useBoardDeleteMutation } from "./model/mutation";

import { GET_BOARD_NOTICE_DETAIL_REQUEST } from "./model/api";

import {
  CONFIRM_DELETE_SAVE_STRING,
  COMPLETE_DELETE_STRING,
} from "@/lib/const";

const SafeHtml = dynamic(() => import("@/components/SafeHtml"), {
  ssr: false,
  loading: () => <Spinner />,
});

const fileIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 1.99935C0 1.26297 0.596954 0.666016 1.33333 0.666016H8C8.36819 0.666016 8.66667 0.964492 8.66667 1.33268V3.99935H11.3333C11.7015 3.99935 12 4.29783 12 4.66602V13.9993C12 14.7357 11.403 15.3327 10.6667 15.3327H1.33333C0.596954 15.3327 0 14.7357 0 13.9993V1.99935ZM7.33333 1.99935L1.33333 1.99935V13.9993H10.6667V5.33268H8C7.63181 5.33268 7.33333 5.03421 7.33333 4.66602V1.99935Z"
        fill="#111111"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5312 0.861278C7.79155 0.600928 8.21366 0.600928 8.47401 0.861278L11.8073 4.19461C12.0677 4.45496 12.0677 4.87707 11.8073 5.13742C11.547 5.39777 11.1249 5.39777 10.8645 5.13742L7.5312 1.80409C7.27085 1.54374 7.27085 1.12163 7.5312 0.861278Z"
        fill="#111111"
      />
    </svg>
  );
};

export default function ClientBoardNoticeDetail({
  postNo,
}: {
  postNo: string;
}) {
  const { push } = useRouter();

  const { mutateAsync, isPending } = useBoardDeleteMutation();

  const { data, isLoading } = useQuery({
    queryKey: ["BOARD_NOTICE_DETAIL_REQUEST", postNo],
    queryFn: () => GET_BOARD_NOTICE_DETAIL_REQUEST({ postNo }),
  });

  const handleDelete = async () => {
    if (confirm(`공지사항을 ${CONFIRM_DELETE_SAVE_STRING}`)) {
      try {
        await mutateAsync(postNo);

        alert(`공지사항을 ${COMPLETE_DELETE_STRING}`);

        push("/board/notice");
      } catch (e) {
        alert(e);
      }
    }
  };

  const renderDetailHeader = () => {
    return (
      <div className="w-full">
        <h3 className="heading04m">
          {data?.data.postTitle ? (
            data?.data.postTitle
          ) : (
            <Skeleton className="w-50 h-7.5" />
          )}
        </h3>
        <hr className="my-3 border-gray-200" />
        <div className="flex justify-between items-center">
          {data?.data.regNm ? (
            <p className="body02m">
              {data.data.regNm}({data.data.regId})
            </p>
          ) : (
            <Skeleton className="w-30 h-[21px]" />
          )}
          {data?.data.regDtm ? (
            <p className="body02m">{data.data.regDtm}</p>
          ) : (
            <Skeleton className="w-30 h-[21px]" />
          )}
        </div>
      </div>
    );
  };

  const renderDetailBody = () => {
    return (
      <div className="flex flex-col w-full my-6 h-[calc(100%-120px)] overflow-y-auto relative">
        <SafeHtml html={`${data?.data.postContent}`} />
        {!!data?.data.attachments && data?.data.attachments.length > 0 && (
          <ul className="mt-auto flex flex-col gap-y-2">
            {data.data.attachments.map(
              ({ attachOrgName, attachNo, fileSize }) => {
                return (
                  <li
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded-[6px] flex items-center gap-x-2"
                    key={attachNo}
                  >
                    <div className="p-3 border border-gray-200 rounded-[6px] flex justify-center items-center">
                      {fileIcon()}
                    </div>
                    <div className="flex flex-col w-[calc(100%-70px)] ">
                      <a
                        href={`${process.env.NEXT_PUBLIC_BACKEND_SERVER_API_URL}/api/v1/board/download/${attachNo}`}
                        className="truncate body02m"
                        title={attachOrgName}
                        target="_blank"
                        download
                      >
                        {attachOrgName}
                      </a>
                      <p className="body03r text-gray-500">
                        {(fileSize / (1024 * 1024)).toFixed(2)}MB
                      </p>
                    </div>
                  </li>
                );
              }
            )}
          </ul>
        )}
      </div>
    );
  };

  const renderDetailFooter = () => {
    return (
      <div className="w-full mt-auto">
        <hr className="my-3 border-gray-200" />
        <div className="flex justify-between">
          <ul className="flex gap-x-2">
            <li>
              <Button
                type="button"
                onClick={() => {
                  push(`/board/notice/${postNo}/edit`);
                }}
                disabled={isLoading}
              >
                수정
              </Button>
            </li>
            <li>
              <Button
                type="button"
                color="red"
                disabled={isLoading || isPending}
                onClick={handleDelete}
              >
                삭제
              </Button>
            </li>
          </ul>

          <Button
            type="button"
            color="white"
            onClick={() => {
              push("/board/notice");
            }}
          >
            목록
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col w-full h-[calc(100%-120px)] px-2">
      {renderDetailHeader()}
      {renderDetailBody()}
      {renderDetailFooter()}
    </div>
  );
}
