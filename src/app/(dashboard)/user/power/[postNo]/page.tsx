import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserPowerDetail from "@/modules/user/power/ClientUserPowerDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ postNo: string }>;
}) {
  const { postNo } = await params;

  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 권한 정보"
        items={[
          {
            title: "회원 관리",
            href: "/user/member",
          },
          {
            title: "권한 관리",
            href: "/user/power",
          },
          {
            title: "권한 상세/수정",
            href: `/user/power/${postNo}`,
          },
        ]}
      />
      <ClientUserPowerDetail postNo={postNo} />
    </Fragment>
  );
}
