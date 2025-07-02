import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientBoardNotice from "@/modules/board/notice/ClientBoardNotice";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 공지사항 목록 "
        items={[
          {
            title: "게시판 관리",
            href: "/board/notice",
          },
          {
            title: "공지사항 관리",
            href: "/board/notice",
          },
        ]}
      />
      <ClientBoardNotice />
    </Fragment>
  );
}
