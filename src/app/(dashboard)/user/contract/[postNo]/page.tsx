import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientUserContractDetail from "@/modules/user/contract/ClientUserContractDetail";

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
            title: "계약 상세",
            href: `/user/contract/${postNo}`,
          },
        ]}
      />
      <ClientUserContractDetail postNo={postNo} />
    </Fragment>
  );
}
