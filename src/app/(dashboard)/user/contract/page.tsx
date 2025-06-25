import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserContract from "@/modules/user/contract/ClientUserContract";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 계약 목록"
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
