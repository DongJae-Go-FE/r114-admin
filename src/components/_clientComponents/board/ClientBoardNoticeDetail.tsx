"use client";

import dynamic from "next/dynamic";

import { useRouter } from "next/navigation";

import { Button } from "@/components/Button";
import Spinner from "@/components/Spinner";

import { useQuery } from "@tanstack/react-query";
import { useBoardDeleteMutation } from "@/lib/network/mutation";

import {
  GET_BOARD_NOTICE_DETAIL_REQUEST,
  GET_BOARD_NOTICE_DETAIL_FILE_DOWNLOAD_REQUEST,
} from "@/lib/network/api";

import {
  CONFIRM_DELETE_SAVE_STRING,
  COMPLETE_DELETE_STRING,
} from "@/const/const";

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

  const { data: downloadData, isLoading: downloadDataIsLoading } = useQuery({
    queryKey: ["BOARD_NOTICE_DETAIL_FILE_DOWNLOAD_REQUEST"],
    queryFn: () =>
      GET_BOARD_NOTICE_DETAIL_FILE_DOWNLOAD_REQUEST({
        attachNo: data?.data.attachments[0].attachNo.toString() || "",
      }),
    enabled: !!data,
  });

  console.log(isLoading, downloadData, downloadDataIsLoading);

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
        <h3 className="heading04m">제목</h3>
        <hr className="my-3 border-gray-200" />
        <div className="flex justify-between items-center">
          <p className="body02m">전성현</p>
          <p className="body02m">2024-11-20 08:51:29</p>
        </div>
      </div>
    );
  };

  const renderDetailBody = () => {
    return (
      <div className="flex flex-col w-full my-6 h-[calc(100%-120px)] overflow-y-auto relative">
        <SafeHtml
          html={`
  <h2>안전한 제목</h2>
  <p>이건 <strong>굵은 텍스트</strong>입니다.</p>
  <script>alert('XSS');</script>
`}
        />
        <ul className="mt-auto flex flex-col">
          <li className="w-full px-3 py-2 bg-white border border-gray-200 rounded-[6px] flex items-center gap-x-2">
            <div className="p-3 border border-gray-200 rounded-[6px] flex justify-center items-center">
              {fileIcon()}
            </div>
            <a
              href="#"
              download
              className="w-[calc(100%-70px)] truncate body02m"
              title="asd"
            >
              asd
            </a>
          </li>
        </ul>
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
              >
                수정
              </Button>
            </li>
            <li>
              <Button
                type="button"
                color="red"
                disabled={isPending}
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
