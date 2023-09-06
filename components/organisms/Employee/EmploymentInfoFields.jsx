import React, { useEffect, useState } from "react";
import {
  getDepartmentsData,
  getDesignationsData,
} from "../../../utils/api/general";
import LabeledInput from "../../molecules/LabeledInput";

const EmploymentInfoFields = React.memo(({ formData, setFormData }) => {
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);

  // Fetch designations and departments data
  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const data = await getDesignationsData();
        setDesignations(data.data);
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    const fetchDepartments = async () => {
      try {
        const data = await getDepartmentsData();
        setDepartments(data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDesignations();
    fetchDepartments();
  }, []);

  return (
    <div className="mb-5 rounded-md border border-[#ebedf2] bg-white p-4 gap-5 ">
      <h6 className="text-xl mb-5">Employment Information</h6>
      <div className="flex flex-col sm:flex-row">
        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
          <LabeledInput
            label="Designation *"
            id="designation"
            type="select"
            value={formData.designation?._id}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                designation: { ...p.designation, _id: e.target.value },
              }))
            }
          >
            <option value="">Select Designation</option>
            {designations.map((designation) => (
              <option key={designation._id} value={designation._id}>
                {designation.title}
              </option>
            ))}
          </LabeledInput>
          <LabeledInput
            label="Department *"
            id="department"
            type="select"
            value={formData.department._id}
            onChange={(e) =>
              setFormData((p) => ({
                ...p,
                department: { ...p.department, _id: e.target.value },
              }))
            }
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </LabeledInput>
          <LabeledInput
            label="Joining Date *"
            id="joiningDate"
            type="date"
            value={formData.joiningDate}
            onChange={(e) =>
              setFormData((p) => ({ ...p, joiningDate: e.target.value }))
            }
          />
          <LabeledInput
            label="Status *"
            id="status"
            type="select"
            value={formData.status}
            onChange={(e) =>
              setFormData((p) => ({ ...p, status: e.target.value }))
            }
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="other">Other</option>
          </LabeledInput>
        </div>
      </div>
    </div>
  );
});

export default EmploymentInfoFields;
