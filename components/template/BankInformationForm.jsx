import Button from "@components/atoms/Button";
import LabeledInput from "@components/molecules/LabeledInput";
import { useState } from "react";

const BankInformationForm = ({ onSubmit }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [branch, setBranch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { accountNumber, accountName, branch };
    onSubmit(formData);
  };

  return (
    <form
      className="md:w-3/4 w-full mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 "
      onSubmit={handleSubmit}
    >
      <h6 className="text-xl mb-5">Bank Information</h6>
      <LabeledInput
        label="Account Number"
        id="accountNumber"
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <LabeledInput
        label="Account Name"
        id="accountName"
        type="text"
        placeholder="Account Name"
        value={accountName}
        onChange={(e) => setAccountName(e.target.value)}
      />
      <LabeledInput
        label="Branch"
        id="branch"
        type="text"
        placeholder="Branch"
        value={branch}
        onChange={(e) => setBranch(e.target.value)}
      />
      <div className="mt-5">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default BankInformationForm;
