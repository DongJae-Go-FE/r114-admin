import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserMemberIp from "@/modules/user/member/ClientUserMemberIp";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 회원 IP 이용 내역"
        items={[
          {
            title: "회원 관리",
            href: "/user/member",
          },
          {
            title: "회원 목록",
            href: "/user/member",
          },
          {
            title: "IP 이용 내역",
            href: "/user/member/ip",
          },
        ]}
      />
      <ClientUserMemberIp />
    </Fragment>
  );
}
