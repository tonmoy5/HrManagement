const InputLabel = ({ label }) => {
  return (
    <label htmlFor={label} className="text-sm block">
      {label}
    </label>
  );
};

export default InputLabel;
