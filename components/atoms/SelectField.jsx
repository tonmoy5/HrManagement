const SelectInput = ({ id, children, value, onChange }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="border-gray-400 rounded shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs py-2 px-2 border w-full"
    >
      {children}
    </select>
  );
};

export default SelectInput;
