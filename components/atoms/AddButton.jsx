import { IoMdAdd } from "react-icons/io";

const AddButton = ({ onClick, children, label, disabled }) => {
  return (
    <button
      className="btn_green text-sm flex items-center gap-2 disabled:bg-opacity-60 disabled:cursor-not-allowed"
      onClick={onClick}
      disabled={disabled}
    >
      <IoMdAdd className="font-bold" />
      {label || children}
    </button>
  );
};

export default AddButton;
