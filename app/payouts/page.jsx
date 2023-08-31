"use client";
import Table from "@components/Table";
import TableLoader from "@components/TableLoader";
import AddButton from "@components/atoms/AddButton";
import { useState } from "react";

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = [
    "Employee Name",
    "Basic Salary",
    "Overtime Hours",
    "Overtime Rate",
    "Gross Salary",
    "Deductions Tax (0.05%)",
    "Allowances",
    "Net Salary",
  ];

  const handleGeneratePayroll = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/payroll/new?month=${selectedMonth.toISOString()}`
      );
      const json = await response.json();
      console.log(
        "🚀 ~ file: page.jsx:30 ~ handleGeneratePayroll ~ json:",
        json
      );

      setData(json.data || []);
    } catch (error) {
      console.error("Error generating payroll:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="p-5 bg-white rounded shadow">
      <h1 className="font-bold text-lg blue_gradient w-max">Payroll</h1>
      <div className="flex flex-col items-start gap-3 my-5">
        <label htmlFor="">Salary Month</label>
        <div className="flex gap-5">
          <input
            type="month"
            value={selectedMonth.toISOString().slice(0, 7)}
            onChange={(e) => setSelectedMonth(new Date(e.target.value))}
            className="outline-none border-gray-400 rounded shadow-sm py-2 px-2 text-gray-600 text-sm border "
          />
          <AddButton onClick={handleGeneratePayroll} label="Generate" />
        </div>
      </div>

      {loading ? (
        <TableLoader headers={headers} rows={4} />
      ) : (
        <Table
          headers={headers}
          data={data?.map((d, index) => ({
            _id: d._id,
            employee: d.employee.fullName,
            basicSalary: d.basicSalary,
            overtimeHours: d.overtimeHours,
            overtimeRate: d.overtimeRate,
            grossSalary: d.grossSalary,
            deductions: d.deductions,
            allowances: d.allowances,
            netSalary: d.netSalary,
          }))}
        />
      )}
    </section>
  );
};

export default Payroll;
