import LabeledInput from "@components/molecules/LabeledInput";
import React from "react";

const BankInfoFields = React.memo(({ formData, setFormData }) => {
  return (
    <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 ">
      <h6 className="text-xl mb-5">Bank Account Information</h6>
      <div className="flex flex-col sm:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <LabeledInput
            label="Bank Name"
            id="bankName"
            type="text"
            placeholder="Bank Name"
            value={formData.bankAccount.bankName}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                bankAccount: {
                  ...p.bankAccount,
                  bankName: e.target.value,
                },
              }))
            }
          />
          <LabeledInput
            label="Account Name"
            id="accountName"
            type="text"
            placeholder="Account Name"
            value={formData.bankAccount.accountName}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                bankAccount: {
                  ...p.bankAccount,
                  accountName: e.target.value,
                },
              }))
            }
          />
          <LabeledInput
            label="Account Number"
            id="accountNumber"
            type="text"
            placeholder="Account Number"
            value={formData.bankAccount.accountNumber}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                bankAccount: {
                  ...p.bankAccount,
                  accountNumber: e.target.value,
                },
              }))
            }
          />
          <LabeledInput
            label="Branch Info"
            id="branchInfo"
            type="text"
            placeholder="Branch Info"
            value={formData.bankAccount.branchInfo}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                bankAccount: {
                  ...p.bankAccount,
                  branchInfo: e.target.value,
                },
              }))
            }
          />
        </div>
      </div>
    </div>
  );
});

export default BankInfoFields;
