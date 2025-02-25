import React from "react";
import Header from "../../components/header/header";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import NavigateBtn from "./NavigateBtn";
const UserManager = () => {
  return (
    <>
      <div className="fixed bottom-[10%] right-[-30px] transform -translate-x-1/2 -translate-y-1/2">
        <NavigateBtn />
      </div>

      <div className="">
        <Header />
        <Outlet />
      </div>
    </>
  );
};

export default UserManager;
