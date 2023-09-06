import React from "react";
import LabeledInput from "../../molecules/LabeledInput";

const CompensationInfoFields = React.memo(({ formData, setFormData }) => {
  return (
    <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 ">
      <h6 className="text-xl mb-5">Compensation Information</h6>
      <div className="flex flex-col sm:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <LabeledInput
            label="Salary *"
            id="salary"
            type="number"
            placeholder="Enter salary amount"
            value={formData.salary}
            onChange={(e) =>
              setFormData((p) => ({ ...p, salary: e.target.value }))
            }
          />
          <LabeledInput
            label="Tax Information *"
            id="taxInformation"
            type="text"
            placeholder="Enter tax information"
            value={formData.taxInformation}
            onChange={(e) =>
              setFormData((p) => ({ ...p, taxInformation: e.target.value }))
            }
          />
          <LabeledInput
            label="Allowances *"
            id="allowances"
            type="number"
            placeholder="Enter allowances amount"
            value={formData.allowances}
            onChange={(e) =>
              setFormData((p) => ({ ...p, allowances: e.target.value }))
            }
          />
          <LabeledInput
            label="Overtime Rate *"
            id="overtimeRate"
            type="number"
            placeholder="Enter overtime rate"
            value={formData.overtimeRate}
            onChange={(e) =>
              setFormData((p) => ({ ...p, overtimeRate: e.target.value }))
            }
          />
        </div>
      </div>
    </div>
  );
});

export default CompensationInfoFields;
