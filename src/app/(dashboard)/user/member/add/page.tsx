import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserMemberAdd from "@/components/_clientComponents/user/ClientUserMemberAdd";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="회원 정보 - 신규 회원 등록"
        items={[
          {
            title: "회원 관리",
            href: "/user/member",
          },
          {
            title: "신규 회원 등록",
            href: `/user/member/add`,
          },
        ]}
      />
      <ClientUserMemberAdd />
    </Fragment>
  );
}
