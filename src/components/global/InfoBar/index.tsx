"use client";
import { PAGE_BREAD_CRUMBS } from "@/constants/pages";
import { usePath } from "@/hooks/user-nav";
import React from "react";
import Sheet from "@/components/global/sheet";
import { Menu } from "lucide-react";
import Sidebar from "../sidebar";
import { Logo } from "@/svgs/logo";
import Items from "../sidebar/items";
import { Separator } from "@/components/ui/separator";
import CLerkAuthState from "../clerk-auth-state";
import { HelpDuoToneWhite } from "@/icons";
import SubcriptionPlan from "../subcription-plan";
import UpgradeCard from "../sidebar/upgrade";
import CreateAutomation from "../create-automation";
import Search from "../search";
import Notifications from "../notifications";
import MainBreadCrumb from "../main-bread-crumb";

type Props = {
  slug: string;
};

function InfoBar({ slug }: Props) {
  const { page } = usePath();

  console.log("slug page", slug, page);
  const currentPage = PAGE_BREAD_CRUMBS.includes(page) || page == slug;
  return (
    true && (
      <div className="flex flex-col">
        <div className="flex gap-x-3 lg:gap-x-5 justify-end">
          <span className="lg:hidden flex items-center flex-1 gap-x-2">
            <Sheet trigger={<Menu />} className="lg:hidden" side='left'>
              <div className="w-full h-full flex flex-col">
                <div className="flex gap-x-2 items-center p-5 justify-center">
                  <Logo />
                </div>
                <div className="flex flex-col py-3">
                  <Items page={page} slug={slug} />
                </div>
                <div className="px-16">
                  <Separator
                    orientation="horizontal"
                    className="bg-[#535355]"
                  />
                </div>
                <div className="px-3 flex flex-col gap-y-5">
                  <div className="flex gap-x-2">
                    <CLerkAuthState />
                    <p className="text-[#9B9CA0]">Profile</p>
                  </div>
                  <div className="flex gap-x-3">
                    <HelpDuoToneWhite />
                    <p className="text-[#9B9CA0]">Help</p>
                  </div>
                </div>
                <SubcriptionPlan type={"PRO"}>
                  <div className="flex-1 flex flex-col justify-end">
                    <UpgradeCard />
                  </div>
                </SubcriptionPlan>
              </div>
            </Sheet>
          </span>
          <Search />
          <CreateAutomation />
          <Notifications />
        </div>
        <MainBreadCrumb 
          page={page === slug ? 'Home' : page}
          slug={slug}
        />
      </div>
    )
  );
}

export default InfoBar;
