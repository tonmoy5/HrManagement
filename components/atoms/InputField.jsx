const InputField = ({
  type,
  label,
  value,
  onChange,
  placeholder,
  readOnly,
}) => {
  return (
    <input
      type={type}
      id={label}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border-gray-400 rounded shadow-sm outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xs py-2 px-2 border w-full"
      readOnly={readOnly}
    />
  );
};

export default InputField;
