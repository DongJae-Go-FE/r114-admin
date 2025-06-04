import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientSettingManagementDetail from "@/components/_clientComponents/setting/ClientSettingManagementDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ postNo: string }>;
}) {
  const { postNo } = await params;

  return (
    <Fragment>
      <PageHeader
        title="관리자 정보"
        items={[
          {
            title: "설정",
            href: "/setting/management",
          },
          {
            title: "관리자 계정/권한 관리",
            href: `/setting/management`,
          },
          {
            title: "관리자 정보 상세",
            href: `/setting/management/${postNo}`,
          },
        ]}
      />
      <ClientSettingManagementDetail postNo={postNo} />
    </Fragment>
  );
}
