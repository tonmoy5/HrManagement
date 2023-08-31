const TabButton = ({ isActive, onClick, children }) => {
  return (
    <button
      className={`flex gap-2 border-b border-transparent p-4 hover:border-blue-500 hover:text-blue-500 ${
        isActive ? "!border-blue-500 text-blue-500" : ""
      }`}
      onClick={onClick}
    >
     {children}
    </button>
  );
};

export default TabButton;
