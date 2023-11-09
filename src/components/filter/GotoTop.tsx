import { useEffect, useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { motion } from "framer-motion";
const GotoTop = () => {
  const [isShowGotoTopBtn, setIsShowGotoTopBtn] = useState<boolean>(false);

  useEffect(() => {
    const scrollTop = () => {
      if (window.scrollY > 300) {
        setIsShowGotoTopBtn(true);
      } else {
        setIsShowGotoTopBtn(false);
      }
    };

    document.addEventListener("scroll", scrollTop);
    return () => {
      document.removeEventListener("scroll", scrollTop);
    };
  }, []);

  const handleGotoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isShowGotoTopBtn && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ rotate: 180, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          onClick={handleGotoTop}
          className="fixed bottom-10 right-10 rounded-full bg-greenbtn p-5 text-white cursor-pointer"
        >
          <span className="rotate-90">
            <FaAngleDoubleDown />
          </span>
        </motion.div>
      )}
    </>
  );
};

export default GotoTop;
