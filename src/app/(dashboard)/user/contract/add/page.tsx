import { Fragment } from "react";

import PageHeader from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/Tab";
import {
  ClientUserContractAddIndividual,
  ClientUserContractAddCorporation,
} from "@/components/_clientComponents/user/ClientUserContractAdd";

export default async function Page() {
  return (
    <Fragment>
      <PageHeader
        title="회원 정보 - 신규 계약 등록"
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
            title: "신규 등록",
            href: "/user/contract/add",
          },
        ]}
      />
      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="individual" className="flex-1">
            개인 일반
          </TabsTrigger>
          <TabsTrigger value="corporation" className="flex-1">
            법인/개인 사업자
          </TabsTrigger>
        </TabsList>
        <TabsContent value="individual">
          <ClientUserContractAddIndividual />
        </TabsContent>
        <TabsContent value="corporation">
          <ClientUserContractAddCorporation />
        </TabsContent>
      </Tabs>
    </Fragment>
  );
}
