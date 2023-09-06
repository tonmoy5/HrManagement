import React, { useState } from "react";
import Button from "../../../components/atoms/Button";
import LabeledInput from "../../../components/molecules/LabeledInput";
import AddButton from "../../atoms/AddButton";

const AccountCredentialsFields = React.memo(({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateRandomPassword = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    setFormData((prevData) => ({ ...prevData, password: randomPassword }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setCopied(false);
  };

  const copyPasswordToClipboard = () => {
    navigator.clipboard.writeText(formData.password);
    setCopied(true);
  };

  return (
    <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 ">
      <h6 className="text-xl mb-5">Account Credentials</h6>
      <div className="flex flex-col sm:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <LabeledInput
            label="Email *"
            id="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData((p) => ({ ...p, email: e.target.value }))
            }
          />
          <LabeledInput
            label="Username *"
            id="username"
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={(e) =>
              setFormData((p) => ({ ...p, username: e.target.value }))
            }
          />
          <LabeledInput
            label="Password *"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData((p) => ({ ...p, password: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3">
        <AddButton onClick={generateRandomPassword}>
          Generate Random Password
        </AddButton>
        <Button onClick={togglePasswordVisibility}>
          {showPassword ? "Hide" : "Show"} Password
        </Button>
        <Button onClick={copyPasswordToClipboard}>
          {copied ? "Copied" : "Copy"} Password
        </Button>
      </div>
    </div>
  );
});

export default AccountCredentialsFields;
