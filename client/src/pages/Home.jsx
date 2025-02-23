import React from "react";
import Header from "../components/header/header";
import Sub1 from "./HomeComponent/sub1";

import Intro from "./HomeComponent/intro";
import Sub2 from "./HomeComponent/sub2";
export default function Home() {
  return (
    <div>
      <Header />
      <div className="container w-full !max-w-[1700px] p-[10px]  py-8">
        <Intro />
        <Sub1 />
        <Sub2 />
      </div>
    </div>
  );
}
