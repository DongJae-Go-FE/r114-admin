import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserMember from "@/modules/user/member/ClientUserMember";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 회원 목록"
        items={[
          {
            title: "회원 관리",
            href: "/user/member",
          },
          {
            title: "회원 목록",
            href: "/user/member",
          },
        ]}
      />
      <ClientUserMember />
    </Fragment>
  );
}
