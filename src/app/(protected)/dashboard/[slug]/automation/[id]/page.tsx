import React from "react";
import AutomationBreadCrumb from "@/components/global/bread-crumbs/automations";
import { Warning } from "@/icons";
import Trigger from "@/components/global/automations/trigger";
import { getAutomationInfo } from "@/actions/automations";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { PrefetchUserAutomation } from "@/react-query/prefetch";
import ThenNode from "@/components/global/automations/then/node";
import PostNode from "@/components/global/automations/post/node";

type Props = {
  params: { id: string };
};

//WIP: Set some metadata
export async function generateMetaData({ params }: Props) {
  const info = await getAutomationInfo(params.id);
  console.log(info);
  return {
    title: info.data,
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  //WIP: PreFetch user automation data
  const query = new QueryClient();
  await PrefetchUserAutomation(query, params.id);
  // const data = await generateMetaData({params});
  return (
    <HydrationBoundary state={dehydrate(query)}>
      <div className="flex flex-col items-center gap-y-20">
        <AutomationBreadCrumb id={params.id} />
        <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
          <div className="flex gap-x-2">
            <Warning />
            When....
          </div>
          <Trigger id={params.id} />
        </div>
        <ThenNode id={params.id} />
        <PostNode id={params.id}/>
      </div>
    </HydrationBoundary>
  );
}
