import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserContractEdit from "@/modules/user/contract/ClientUserContractEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ postNo: string }>;
}) {
  const { postNo } = await params;

  return (
    <Fragment>
      <PageHeader
        title="회원 정보"
        items={[
          {
            title: "회원 관리",
            href: "/user/member",
          },
          {
            title: "계약 관리",
            href: "/user/contract",
          },
          {
            title: "계약 수정",
            href: `/user/contract/${postNo}/edit`,
          },
        ]}
      />
      <ClientUserContractEdit postNo={postNo} />
    </Fragment>
  );
}
