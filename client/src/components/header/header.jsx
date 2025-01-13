import React from "react";
import "../header/header.css";
import "../../assets/home/logo.png";
const Header = () => {
  return (
    <>
      <header>
        <div className="container-fluid flex justify-center">
          <div className="row h-24 w-11/12">
            {/* logo */}
            <div className="col-lg-2 flex items-center justify-center">
              <img
                className="max-w-28 w-full "
                src="/src/assets/home/logo.png"
                alt=""
              />
            </div>
            {/* right item */}
            <div className=" col-lg-10 "></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
