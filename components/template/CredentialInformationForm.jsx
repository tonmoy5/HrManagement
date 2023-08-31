import Button from "@components/atoms/Button";
import LabeledInput from "@components/molecules/LabeledInput";
import { useState } from "react";

const CredentialInformationForm = ({
  userInfo,
  handleChangePassword,
  loading,
}) => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const { username } = userInfo;
  const handleSubmit = (e) => {
    e.preventDefault();

    handleChangePassword(password);
  };

  return (
    <form
      className="md:w-3/4 w-full mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 "
      onSubmit={handleSubmit}
    >
      <h6 className="text-xl mb-5">Change Password</h6>

      <LabeledInput
        label="Username"
        id="username"
        type="text"
        placeholder="Username"
        value={username}
        readOnly={true}
      />
      <LabeledInput
        label="Old Password"
        id="password"
        type="password"
        placeholder="Old Password"
        value={password.currentPassword}
        onChange={(e) =>
          setPassword((p) => ({ ...p, currentPassword: e.target.value }))
        }
      />
      <LabeledInput
        label="New Password"
        id="newPassword"
        type="password"
        placeholder="New Password"
        value={password.newPassword}
        onChange={(e) =>
          setPassword((p) => ({ ...p, newPassword: e.target.value }))
        }
      />
      <LabeledInput
        label="Confirm Password"
        id="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={password.confirmPassword}
        onChange={(e) =>
          setPassword((p) => ({ ...p, confirmPassword: e.target.value }))
        }
      />

      <div className="mt-5">
        <Button disabled={loading} type="submit">
          {loading ? "Loading..." : "Confirm"}
        </Button>
      </div>
    </form>
  );
};

export default CredentialInformationForm;
