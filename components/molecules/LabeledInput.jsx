import InputField from "@components/atoms/InputField";
import InputLabel from "@components/atoms/InputLabel";
import SelectInput from "@components/atoms/SelectField";

const LabeledInput = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  readOnly,
  children,
}) => {
  return (
    <div className="mb-2">
      <InputLabel label={label} />
      {type === "select" ? (
        <SelectInput children={children} value={value} onChange={onChange} />
      ) : (
        <InputField
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default LabeledInput;
