import { useEffect, useState } from "react";
import CustomSelect from "../../components/atoms/CustomSelect";
import { useUserContext } from "../../context/UserContext";
import { getEmployeesData } from "../../utils/api/employee";

const EmployeeSelect = ({ onChange }) => {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState({
    value: "",
    label: (
      <div className="flex flex-col items-start text-xs gap-1">
        <span className="font-bold">All</span>
        <span>Filter by employee</span>
      </div>
    ),
  });

  const { user } = useUserContext();

  useEffect(() => {
    fetchEmployees();
  }, [user]);

  const fetchEmployees = async () => {
    if (!user) return;
    if (user.role === "employee") {
      setEmployees([user]);
      const selectedField = {
        value: user._id,
        label: (
          <div className="flex flex-col items-start text-xs gap-1">
            <span className="font-bold">{user.fullName}</span>
            <span>{user.email}</span>
          </div>
        ),
      };
      setSelected(selectedField);
      onChange(selectedField);
      return;
    }
    try {
      const employeesData = await getEmployeesData();
      setEmployees([
        { _id: "", fullName: "All", email: "Filter by employee" },
        ...employeesData.data,
      ]);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleOnChange = (employee) => {
    setSelected(employee);
    onChange(employee);
  };

  return (
    <CustomSelect
      options={employees.map((employee) => ({
        value: employee._id || "",
        label: (
          <div className="flex flex-col items-start text-xs gap-1">
            <span className="font-bold">{employee.fullName}</span>
            <span>{employee.email}</span>
          </div>
        ),
      }))}
      selected={selected}
      onChange={handleOnChange}
    />
  );
};

export default EmployeeSelect;
