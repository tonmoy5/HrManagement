const { motion } = require("framer-motion");

const Tooltip = ({ title }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: -30 }}
      exit={{ opacity: 0, y: -50 }}
      className="absolute bg-gray-800 text-white px-2 py-1 rounded-md text-sm "
    >
      {title}
    </motion.div>
  );
};

export default Tooltip;
