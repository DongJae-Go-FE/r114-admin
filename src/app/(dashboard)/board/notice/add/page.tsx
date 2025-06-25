import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientBoardNoticeAdd from "@/modules/board/notice/ClientBoardNoticeAdd";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 공지사항 등록"
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
            title: "공지사항 신규 등록",
            href: "/board/notice/add",
          },
        ]}
      />
      <ClientBoardNoticeAdd />
    </Fragment>
  );
}
