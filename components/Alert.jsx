import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";

const Alert = ({ className, message, handleClose, isAlertOpen }) => {
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timeoutId = setTimeout(handleClose, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isHovered, handleClose]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className={`md:min-w-[300px] md:w-max w-full flex items-center justify-between gap-3 p-3.5 rounded ${className} fixed top-5 right-5 z-50 shadow-xl`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="ltr:pr-2 rtl:pl-2">{message}</span>
      <button
        type="button"
        className="ltr:ml-auto rtl:mr-auto hover:opacity-80"
        onClick={handleClose}
      >
        <TfiClose />
      </button>
    </motion.div>
  );
};

export default React.memo(Alert);
