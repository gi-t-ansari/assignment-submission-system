import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[#f7f7f7]  scroll-smooth flex flex-col font-nunito">
      <Navbar />
      <div className="flex-1 w-full p-6 overflow-y-auto scroll-smooth">
        {children}
      </div>
    </div>
  );
};

export default Layout;
