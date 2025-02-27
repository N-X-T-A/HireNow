import React from "react";
import { NavLink } from "react-router-dom";
import { menuUserSidebar } from "../../data/data";

const NavigateBtn = () => {
  return (
    <div>
      {menuUserSidebar.map((item) => {
        return (
          <NavLink
            className={
              "flex flex-col gap-3 no-underline text-[black] hover:text-gray-700"
            }
            key={item.id}
            to={item?.path}
          >
            {item.text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavigateBtn;
