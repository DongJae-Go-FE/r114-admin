import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientSettingMyPage from "@/modules/setting/myPage/ClientSettingMyPage";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="나의 정보"
        items={[
          {
            title: "설정",
            href: "/setting/management",
          },
          {
            title: "마이페이지",
            href: "/setting/myPage",
          },
        ]}
      />
      <ClientSettingMyPage />
    </Fragment>
  );
}
