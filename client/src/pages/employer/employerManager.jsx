import React from "react";
import { Outlet } from "react-router-dom";
import withLayout from "../../layout/withLayout";
const EmployerManager = () => {
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

export default withLayout(EmployerManager);
