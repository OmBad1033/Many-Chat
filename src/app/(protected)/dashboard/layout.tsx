import React from "react";
import Sidebar from "@/components/global/sidebar";
import Navbar from "@/components/global/navbar";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

const layout = ({ children, params }: Props) => {
  //WIP: Query client and fetch data
  return (
    <div className="p-3">
      <Sidebar slug={params.slug} />
      {/* <Navbar/> */}
      <div
        className="lg:ml-[250px] lg:pl-10 lg:py-5 
          flex flex-col overflow-auto"
      >
        <Navbar slug={params.slug}/>
  
      </div>
      {children}
    </div>
  );
};

export default layout;
