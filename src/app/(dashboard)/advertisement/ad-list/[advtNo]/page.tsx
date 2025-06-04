import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientAdvertisementAdDetail from "@/components/_clientComponents/advertisement/ClientAdvertisementAdDetail";

export default async function Page({
  params,
}: {
  params: Promise<{ advtNo: string }>;
}) {
  const { advtNo } = await params;

  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 광고 상세"
        items={[
          {
            title: "광고 관리",
            href: "/advertisement/ad-list",
          },
          {
            title: "광고 목록",
            href: "/advertisement/ad-list",
          },
          {
            title: "광고 상세",
            href: `/advertisement/ad-list/${advtNo}`,
          },
        ]}
      />
      <ClientAdvertisementAdDetail advtNo={advtNo} />
    </Fragment>
  );
}
