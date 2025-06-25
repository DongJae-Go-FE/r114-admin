import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserPower from "@/modules/user/power/ClientUserPower";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 권한 목록"
        items={[
          {
            title: "회원 관리",
            href: "/user/member",
          },
          {
            title: "권한 관리",
            href: "/user/power",
          },
        ]}
      />
      <ClientUserPower />
    </Fragment>
  );
}
