// Atom: Checkbox
const Checkbox = () => {
  return (
    <label className="inline-flex cursor-pointer">
      <input type="checkbox" className="form-checkbox" />
      <span className="relative text-white-dark checked:bg-none">
        Make this my default address
      </span>
    </label>
  );
};

export default Checkbox;
