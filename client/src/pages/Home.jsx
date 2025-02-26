import React from "react";
import Header from "../components/header/header";
import Sub1 from "./HomeComponent/sub1";

import Intro from "./HomeComponent/intro";
import Sub2 from "./HomeComponent/sub2";
import Blog from "./HomeComponent/blog";
import withLayout from "../layout/withLayout";
const Home = () => {
  return (
    <div>
      <div className="container w-full !max-w-[1700px] p-[10px]  py-2">
        <Intro />
        <Sub1 />
        <Sub2 />
        <Blog />
      </div>
    </div>
  );
};

export default withLayout(Home);
