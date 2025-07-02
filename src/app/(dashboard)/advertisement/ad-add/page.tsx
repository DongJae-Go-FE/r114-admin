import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import ClientAdvertisementAdAdd from "@/modules/advertisement/ad/ClientAdvertisementAdAdd";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="REPS/RCS 통합 광고 등록"
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
            title: "광고 신규 등록",
            href: "/advertisement/ad-list/add",
          },
        ]}
      />
      <ClientAdvertisementAdAdd />
    </Fragment>
  );
}
