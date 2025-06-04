import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientBoardNoticeEdit from "@/components/_clientComponents/board/ClientBoardNoticeEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ postNo: string }>;
}) {
  const { postNo } = await params;

  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 공지사항 수정"
        items={[
          {
            title: "공지사항 관리",
            href: "/board/notice",
          },
          {
            title: "공지사항 관리 상세",
            href: `/board/notice/${postNo}`,
          },
          {
            title: "공지사항 관리 수정",
            href: `/board/notice/${postNo}/edit`,
          },
        ]}
      />
      <ClientBoardNoticeEdit postNo={postNo} />
    </Fragment>
  );
}
