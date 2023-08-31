const InputTextArea = ({ label, value, onChange, placeholder }) => {
  return (
    <textarea
      className="border-gray-400 rounded shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs py-2 px-2 border w-full"
      rows={3}
      id={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    ></textarea>
  );
};

export default InputTextArea;
