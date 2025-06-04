import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserContract from "@/components/_clientComponents/user/ClientUserContract";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="RPES/RCS 통합 계약 목록"
        items={[
          {
            title: "회원 관리",
            href: "/user/member",
          },
          {
            title: "계약 관리",
            href: "/user/contract",
          },
        ]}
      />
      <ClientUserContract />
    </Fragment>
  );
}
