import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserPowerAdd from "@/modules/user/power/ClientUserPowerAdd";

export default async function Page() {
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
            title: "권한 신규 등록",
            href: "/user/power/add",
          },
        ]}
      />
      <ClientUserPowerAdd />
    </Fragment>
  );
}
