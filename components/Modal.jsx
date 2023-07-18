import { AnimatePresence, motion } from "framer-motion";
import { TfiClose } from "react-icons/tfi";

const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/4 p-4 rounded-lg shadow-lg relative z-10 mx-3"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl">{title}</h2>
              <button onClick={onClose} className="text_color">
                <TfiClose />
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-black"
            onClick={onClose}
          ></motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
