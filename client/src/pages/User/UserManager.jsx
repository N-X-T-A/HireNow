import React from "react";
import Header from "../../components/header/header";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import NavigateBtn from "./NavigateBtn";
import withLayout from "../../layout/withLayout";
const UserManager = () => {
  return (
    <>
      <div className="h-[1000px] max-h-[600px] flex justify-center ">
        <div className=" w-full !max-w-[1700px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default withLayout(UserManager);
