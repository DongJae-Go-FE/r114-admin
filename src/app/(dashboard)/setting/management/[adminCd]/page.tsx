import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientSettingManagementDetail from "@/modules/setting/management/ClientSettingManagementDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ adminCd: string }>;
}) {
  const { adminCd } = await params;

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
            href: `/setting/management/${adminCd}`,
          },
        ]}
      />
      <ClientSettingManagementDetail adminCd={adminCd} />
    </Fragment>
  );
}
