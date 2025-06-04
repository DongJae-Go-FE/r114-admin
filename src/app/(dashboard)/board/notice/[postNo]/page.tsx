import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientBoardNoticeDetail from "@/components/_clientComponents/board/ClientBoardNoticeDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ postNo: string }>;
}) {
  const { postNo } = await params;

  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 공지사항 상세"
        items={[
          {
            title: "게시판 관리",
            href: "/board/notice",
          },
          {
            title: "공지사항 관리",
            href: "/board/notice",
          },
          {
            title: "공지사항 관리 상세",
            href: `/board/notice/${postNo}`,
          },
        ]}
      />
      <ClientBoardNoticeDetail postNo={postNo} />
    </Fragment>
  );
}
