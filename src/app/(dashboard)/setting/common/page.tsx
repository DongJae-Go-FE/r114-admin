import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="사이트 기본 설정"
        items={[
          {
            title: "설정",
            href: "/setting/management",
          },
          {
            title: "사이트 기본 설정",
            href: "/setting/common",
          },
        ]}
      />
    </Fragment>
  );
}
