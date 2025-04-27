import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { slidesCEO } from "../../data/data";
import { useLanguage } from "../../hooks/useLanguage";

const Sub2 = () => {
  const [currentCEO, setCurrentCEO] = useState(2);
  const { translations } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCEO((prev) => (prev >= slidesCEO.length - 3 ? 2 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white flex flex-col gap-2 mt-[100px] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, amount: 0.3 }}
        className="mt-[100px] flex flex-col items-center gap-2"
      >
        <p className="!mb-0 text-[15px] font-[300] bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-transparent bg-clip-text">
          {translations["ceoSubtitle"]}
        </p>
        <h1 className="!mb-0 text-[45px] font-[500] max-w-[900px] text-center">
          {translations["ceoTitle"]}
        </h1>
      </motion.div>

      <div className="flex justify-center items-center overflow-hidden w-full h-[700px] relative">
        {slidesCEO.map((slide, index) => {
          const offset = index - currentCEO;

          return (
            <motion.div
              key={slide.id}
              className="absolute w-[450px] h-[650px] rounded-xl overflow-hidden"
              animate={{
                x: offset * 260,
                scale: Math.max(0.8, 1 - Math.abs(offset) * 0.2),
                rotateY: Math.abs(offset) <= 1 ? offset * -20 : 0,
                opacity: Math.abs(offset) > 2 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <img
                src={slide.image}
                className="w-full h-full object-cover"
                alt="slide"
              />
              <div className="absolute bottom-0 bg-black/50 text-white w-full text-center p-2">
                <p className="text-lg">{slide.quote}</p>
                <p className="text-sm">{slide.author}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Sub2;
