import React from "react";
import { Outlet } from "react-router-dom";
import withLayout from "../../layout/withLayout";
const UserManager = () => {
  return (
    <>
      <div className=" flex justify-center items-center">
        <div className=" w-full !max-w-[1700px]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default withLayout(UserManager);
