import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleRight,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { homeImages } from "../../data/data";
import { useLanguage } from "../../hooks/useLanguage";

const Sub1 = () => {
  const { translations } = useLanguage();

  const sliderData = [
    { src: "/src/assets/home/asian.webp", label: translations["employee"] },
    { src: "/src/assets/home/high.webp", label: translations["employee"] },
    { src: "/src/assets/home/porttrail.webp", label: translations["employee"] },
  ];

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    centerMode: false,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  return (
    <div className="w-full bg-white flex flex-col  gap-2 mt-[100px] items-center justify-items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
        className="w-[60%] flex flex-col gap-[20px] items-center justify-items-center justify-between"
      >
        <p className="!mb-0 text-[40px] font-[700] text-center">
          {translations["howBuilt"]}
        </p>
        <p className="!mb-0 text-[15px] font-[300] text-center">
          {translations["howBuiltDesc"]}
        </p>
        <div className="flex items-center justify-items-center justify-center gap-3">
          <button className="transition ease-in-out duration-300 transform hover:-translate-y-[5px] flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] bg-black rounded-[20px] text-white">
            {translations["findJob"]} <FontAwesomeIcon icon={faCircleRight} />
          </button>
          <button className="transition ease-in-out duration-300 transform hover:-translate-y-[5px] flex items-center justify-items-center justify-center gap-3 px-[20px] py-[10px] border-2 rounded-[20px] text-black">
            {translations["contactNow"]}{" "}
            <FontAwesomeIcon icon={faCircleRight} />
          </button>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative w-full mt-[30px]"
      >
        <img
          className=" w-full object-cover rounded-[30px]"
          src="/src/assets/home/Frame.png"
          alt=""
          style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
        />
        <div className="absolute inset-0 w-[700px] bg-gradient-to-r from-black to-transparent rounded-[30px]"></div>

        <div className="absolute bottom-[20%] left-6 flex flex-col gap-2 max-w-[600px]">
          <p className="!mb-0 text-[40px] font-[600] text-white ">
            {translations["candidateExperienceTitle"]}
          </p>
          <p className="!mb-0 text-[15px] font-[400] text-white text-justify">
            {translations["candidateExperienceDesc"]}
          </p>
          <button className="relative w-[50%] px-[20px] py-[10px] border-2 border-white rounded-[20px] text-white mt-3 overflow-hidden transition-all duration-500 ease-in-out group transform hover:-translate-y-[5px]">
            <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
              {translations["joinNow"]}
            </span>
          </button>
        </div>
      </motion.div>
      <div className="pt-[60px] w-full flex gap-3 items-center justify-items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex-1 flex flex-col gap-6"
        >
          <p className="!mb-0 text-[40px] max-w-[600px] font-[500]">
            {translations["expandTeamTitle"]}
          </p>
          <p className="!mb-0 text-[15px] max-w-[500px] font-[400] ">
            {translations["expandTeamDesc"]}
          </p>
          <div className="pt-[40px] max-w-[600px] w-full flex gap-4 items-center justify-items-center">
            <div className=" flex-1 flex flex-col gap-2 w-[300px] h-[300px] p-[20px] rounded-[10px] bg-gray-100">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex-1"
              >
                <i className=" w-[50%]  py-[8px] rounded-[20px] ">
                  {translations["employee"]}
                </i>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex-1"
              >
                <img
                  className="max-w-[200px] flex-1"
                  src="/src/assets/home/GroupContact.png"
                  alt=""
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                className="flex-1 flex items-center justify-items-center justify-between"
              >
                <p className="!mb-0 max-w-[150px] text-[20px]">
                  {translations["startHiring"]}
                </p>
                <FontAwesomeIcon
                  className="!text-[40px]"
                  icon={faCircleRight}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-[300px] h-[300px] flex-1 rounded-[10px]"
            >
              <Slider {...settings}>
                {sliderData.map((item, index) => (
                  <div key={index} className="relative min-h-[300px]">
                    <img
                      className="w-full h-full rounded-[10px] object-cover min-h-[300px] max-h-[300px]"
                      src={item.src}
                      alt={item.label}
                    />
                    <i className=" absolute top-5 left-5 w-[50%]  py-[8px] rounded-[20px]  text-white">
                      {item.label}
                    </i>
                  </div>
                ))}
              </Slider>
            </motion.div>
          </div>
        </motion.div>
        <div className="flex-1 flex items-center justify-items-center gap-3">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 bg-white rounded-[20px] p-6 shadow-md"
          >
            <h2 className="text-black text-[24px] font-[500]">
              {translations["expandTeam"]}
            </h2>
            <p className="text-gray-600 text-[15]">
              {translations["expandTeamSub"]}
            </p>
            <div className="mt-4">
              <p className="font-semibold text-lg">
                {translations["candidatesPerDay"]}
              </p>
              <p className="text-gray-500 text-sm">
                {translations["candidatesLabel"]}
              </p>
            </div>
            <div className="mt-2">
              <p className="font-semibold text-lg">
                {translations["satisfactionRate"]}
              </p>
              <p className="text-gray-500 text-sm">
                {translations["satisfactionLabel"]}
              </p>
            </div>
            <ul className="mt-4 text-black text-sm font-semibold">
              <li>
                <FontAwesomeIcon icon={faShieldHalved} />{" "}
                {translations["benefit1"]}
              </li>
              <li>
                <FontAwesomeIcon icon={faShieldHalved} />{" "}
                {translations["benefit2"]}
              </li>
              <li>
                <FontAwesomeIcon icon={faShieldHalved} />{" "}
                {translations["benefit3"]}
              </li>
              <li>
                <FontAwesomeIcon icon={faShieldHalved} />{" "}
                {translations["benefit4"]}
              </li>
            </ul>
            <h3 className="mt-4 text-gray-400 font-semibold text-lg">
              {translations["reason"]}
            </h3>
            <h2 className="text-black text-xl font-bold">
              {translations["optimizeHiring"]}
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex-1 flex flex-col gap-2 max-h-[518px] overflow-y-auto"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {homeImages.map((image, index) => (
              <motion.img
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true, amount: 0.3 }}
                key={index}
                className="w-full h-full max-h-[255px] max-w-[383px] object-cover rounded-[20px]"
                src={image}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Sub1;
