import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserMemberEdit from "@/components/_clientComponents/user/ClientUserMemberEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ postNo: string }>;
}) {
  const { postNo } = await params;

  return (
    <Fragment>
      <PageHeader
        title="회원 정보"
        items={[
          {
            title: "회원 관리",
            href: "/user/member",
          },
          {
            title: "회원 상세 수정",
            href: `/user/member/${postNo}/edit`,
          },
        ]}
      />
      <ClientUserMemberEdit postNo={postNo} />
    </Fragment>
  );
}
