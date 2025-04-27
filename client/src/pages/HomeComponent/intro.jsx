import React, { useState, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { introData } from "../../data/data";
import RotatingText from "../../components/text/RoatingText";
import { useLanguage } from "../../hooks/useLanguage";

const Intro = memo(() => {
  const [open, setOpen] = useState(false);
  const { translations } = useLanguage();
  const { leftImage, logo, socialIcons, article, rightImage } = introData;

  const texts = [
    translations["intro.dreamJob"],
    translations["intro.highPayingJob"],
    translations["intro.remoteJob"],
    translations["intro.stableJob"],
    translations["intro.perfectJob"],
  ];

  return (
    <div className="w-full bg-white flex rounded-[10px] gap-2">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="respon-l flex-1 max-w-[800px] w-full rounded-[10px]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <img
          loading="lazy"
          className="w-full max-h-[750px] object-cover rounded-[10px]"
          src={leftImage}
          alt=""
        />
      </motion.div>

      {/* Center Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="respon-m flex-1 max-w-[370px] w-full p-[10px] rounded-[10px]"
        style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
      >
        <div className="flex flex-col w-full h-full items-center justify-between">
          <div className="w-full flex justify-between px-[25px]">
            <div>
              <p className="!m-0 text-[20px] font-[700]">
                {translations["intro.service"]}
              </p>
              <p className="!m-0 text-[18px] font-[600] underline">
                {translations["intro.faqs"]}
              </p>
            </div>
            <img className="max-w-28 w-full" src={logo} alt="Logo" />
          </div>
          <div className="w-full px-[25px]">
            <h3 className="my-0 mx-2">
              <span className="inline whitespace-pre-line">
                {translations["findWithHireNow"]}
              </span>
              <span className="inline-flex">
                <RotatingText
                  texts={texts}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-[#1E90FF] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg mx-2"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={3000}
                />
              </span>
            </h3>
          </div>
          <div className="w-full px-[25px] mb-[20px]">
            <p className="!m-0 text-[15px] font-[400]">
              {translations["intro.connectWithUs"]}
            </p>
            <div className="flex gap-3 text-[30px] pt-[10px] cursor-pointer">
              {socialIcons.map((item, index) => (
                <FontAwesomeIcon key={index} icon={eval(item.icon)} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Section */}
      <div className="respon-m flex-1 w-full max-h-[750px] rounded-[10px]">
        <div className="flex flex-col w-full h-full items-center gap-2">
          {/* Clickable Article */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            viewport={{ once: true }}
            layoutId="article-card"
            onClick={() => setOpen(!open)}
            className={`card w-full rounded-[10px] relative overflow-hidden cursor-pointer transition ease-in-out duration-300 transform hover:-translate-y-[5px] ${
              open ? "border-0" : "border-[2px] border-gray-300"
            }`}
            style={{
              boxShadow: open ? "none" : "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            <motion.img
              layoutId="article-image"
              className="w-full min-h-[375px] object-cover rounded-[10px]"
              src={article.image}
              alt=""
            />
            <motion.p
              layoutId="article-text"
              className="!mb-0 absolute bottom-0 left-0 bg-gradient-to-t from-black to-transparent p-[20px] w-full text-white"
            >
              {article.title}
            </motion.p>
          </motion.div>

          {/* Modal */}
          {open && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-[2] w-full h-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
            >
              <div className="w-[1000px] h-[80%] bg-black rounded-[10px] shadow-lg overflow-hidden">
                <motion.img
                  layoutId="article-image"
                  src={article.image}
                  className="w-full max-h-[300px] object-cover rounded-t-[10px]"
                />
                <motion.p
                  layoutId="article-text"
                  className="text-white text-[30px] p-[10px]"
                >
                  {article.title}
                </motion.p>
                <motion.div
                  className="text-white text-[15px] p-[10px] max-h-[300px] overflow-y-auto text-justify"
                  style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                  }}
                >
                  {article.content}
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Right Image */}
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            viewport={{ once: true }}
            className="w-full max-h-[375px] object-cover rounded-[10px]"
            src={rightImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
});

export default Intro;
