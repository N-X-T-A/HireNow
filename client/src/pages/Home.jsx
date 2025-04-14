import React from "react";
import Header from "../components/header/header";
import Sub1 from "./HomeComponent/sub1";

import Intro from "./HomeComponent/intro";
import Sub2 from "./HomeComponent/sub2";
import Blog from "./HomeComponent/blog";
import withLayout from "../layout/withLayout";
import Blog_com from "./HomeComponent/blog_com";
const Home = () => {
  return (
    <div>
      <div className="container w-full !max-w-[1700px] p-[10px]  py-2">
        <Intro />
        <Sub1 />
        <Sub2 />
        <Blog_com />
      </div>
    </div>
  );
};

export default withLayout(Home);
