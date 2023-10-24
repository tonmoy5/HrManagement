"use client";
import { useEffect, useState } from "react";
import Table from "../../components/Table";
import TableLoader from "../../components/TableLoader";
import AddButton from "../../components/atoms/AddButton";
import Button from "../../components/atoms/Button";

const Payroll = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [payrollData, setPayrollData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const headers = [
    "Employee Name",
    "Salary",
    "Allowances",
    "Overtime Rate",
    "Overtime Hours",
    "Net Salary",
    "Status",
  ];

  const handleGeneratePayroll = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/payroll?month=${selectedMonth}`, {
        cache: "no-store",
      });
      if (response.ok) {
        const data = await response.json();
        setPayrollData(data.data || []);
      } else {
        console.error(
          "Error generating payroll:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error generating payroll:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveAll = async () => {
    setSubmitting(true);
    try {
      const approvedData = payrollData.map((d) => ({
        ...d,
        status: "approved",
      }));
      const response = await fetch(`/api/payroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(approvedData),
      });
      if (response.ok) {
        const data = await response.json();
        setPayrollData(approvedData);
      } else {
        console.error(
          "Error approving payroll:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error approving payroll:", error);
    } finally {
      setSubmitting(false);
    }
  };

  console.log(payrollData);

  useEffect(() => {
    // Load initial payroll data when the component mounts
    handleGeneratePayroll();
  }, []);

  return (
    <section className="p-5 bg-white rounded shadow">
      <h1 className="font-bold text-lg blue_gradient w-max">Payroll</h1>
      <div className="flex flex-col items-start gap-3 my-5">
        <label htmlFor="salaryMonth">Salary Month</label>
        <div className="flex gap-5">
          <input
            type="month"
            id="salaryMonth"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="outline-none border-gray-400 rounded shadow-sm py-2 px-2 text-gray-600 text-sm border"
          />
          <AddButton onClick={handleGeneratePayroll} label="Show Payroll" />
          <Button onClick={handleApproveAll} disabled={submitting}>
            {submitting ? "Submitting" : "Approve"}
          </Button>
        </div>
      </div>

      {loading ? (
        <TableLoader headers={headers} rows={4} />
      ) : (
        <Table
          headers={headers}
          data={payrollData.map((d) => ({
            _id: d._id,
            employee: d.employeeName,
            basicSalary: d.salary,
            allowances: d.allowances,
            overtimeRate: d.overtimeRate,
            overtimeHours: d.overtimeHours,
            netSalary: d.netSalary,
            status: d.status,
          }))}
        />
      )}
    </section>
  );
};

export default Payroll;
