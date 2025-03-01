import React from "react";
import Header from "../../components/header/header";
import { Outlet, useLocation, Navigate } from "react-router-dom";
import withLayout from "../../layout/withLayout";
const UserManager = () => {
  const API_URL = "https://your-api.com/auth/login";
  //email, password có thể xài form -> formData để sellect value cho dễ

  return (
    <>
      <div className="h-[5000px] max-h-[1025px] flex justify-center ">
        <div className=" w-full !max-w-[1700px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default withLayout(UserManager);
