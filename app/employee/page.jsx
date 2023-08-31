"use client";
import Modal from "@components/Modal";
import Table from "@components/Table";
import TableLoader from "@components/TableLoader";
import AddButton from "@components/atoms/AddButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { FiEye } from "react-icons/fi";
import { GoPencil } from "react-icons/go";

const Employees = () => {
  const headers = ["Full Name", "Email", "Designation"];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/employee");
        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  // Function to handle the "View Details" button click
  const handleViewDetails = (employee) => {
    setSelectedEmployeeId(employee._id);
  };

  const actionButtons = [
    {
      label: <FiEye className="text-xl" />,
      onClick: handleViewDetails,
      title: "Details",
    },
    {
      label: <BiUser className="text-xl" />,
      onClick: (row) => {
        router.push(`/profile?email=${row.email}`);
      },
      title: "Profile",
    },
    {
      label: <GoPencil className="text-xl" />,
      onClick: (row) => {
        router.push(`/employee/edit/${row._id}`);
      },
      title: "Edit",
    },
  ];

  return (
    <section className="p-5 bg-white rounded shadow">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-5">
        <h1 className="font-bold text-lg blue_gradient w-max">Employees</h1>
        <Link href={"/employee/add"}>
          <AddButton label="Add Employee" />
        </Link>
      </div>

      {loading ? (
        <TableLoader headers={headers} rows={4} actionButtons={actionButtons} />
      ) : (
        <Table
          headers={headers}
          data={data?.map((d) => {
            return {
              _id: d._id,
              fullName: d.fullName,
              email: d.email,
              designation: d.designation?.title || "N/A",
            };
          })}
          actionButtons={actionButtons}
        />
      )}

      <Modal
        isOpen={selectedEmployeeId !== null}
        onClose={() => setSelectedEmployeeId(null)}
        title="Employee Details"
      >
        {selectedEmployeeId && (
          <EmployeeDetails employeeId={selectedEmployeeId} />
        )}
      </Modal>
    </section>
  );
};

export default Employees;

const EmployeeDetails = ({ employeeId }) => {
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`/api/employee/${employeeId}`);
        const json = await response.json();
        setEmployeeData(json.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
    fetchEmployeeData();
  }, [employeeId]);

  if (!employeeData) {
    return <div>Loading...</div>;
  }

  const {
    fullName,
    email,
    designation,
    department,
    joiningDate,
    salary,
    bankAccount,
    taxInformation,
    allowances,
    address,
  } = employeeData;

  return (
    <div className="bg-white rounded-lg">
      <p>
        <span className="font-semibold">Full Name:</span> {fullName}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {email}
      </p>
      <p>
        <span className="font-semibold">Designation:</span>{" "}
        {designation?.title || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Department:</span>{" "}
        {department?.name || "N/A"}
      </p>
      <p>
        <span className="font-semibold">Joining Date:</span>{" "}
        {new Date(joiningDate).toLocaleDateString()}
      </p>
      <p>
        <span className="font-semibold">Salary:</span> ${salary}
      </p>
      <p>
        <span className="font-semibold">Bank Account Number:</span>{" "}
        {bankAccount.accountNumber}
      </p>
      <p>
        <span className="font-semibold">Bank Account Name:</span>{" "}
        {bankAccount.accountName}
      </p>
      <p>
        <span className="font-semibold">Branch:</span> {bankAccount.branch}
      </p>
      <p>
        <span className="font-semibold">Tax Information:</span> {taxInformation}
      </p>
      <p>
        <span className="font-semibold">Allowances:</span> ${allowances}
      </p>
      <p>
        <span className="font-semibold">Address:</span> {address}
      </p>
      {/* Display other employee details here */}
    </div>
  );
};
