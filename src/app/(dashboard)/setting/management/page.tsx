import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientSettingManagement from "@/components/_clientComponents/setting/ClientSettingManagement";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 관리자 목록"
        items={[
          {
            title: "설정",
            href: "/setting/management",
          },
          {
            title: "관리자 계정/권한 관리",
            href: "/setting/management",
          },
        ]}
      />
      <ClientSettingManagement />
    </Fragment>
  );
}
