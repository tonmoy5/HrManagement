"use client";
import Alert from "@components/Alert";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditEmployee = () => {
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    designation: "",
    department: "",
    joiningDate: "",
    salary: "",
    bankAccount: {
      accountNumber: "",
      accountName: "",
      branch: "",
    },
    taxInformation: "",
    allowances: "",
    address: "",
  });

  const [toast, setToast] = useState({
    active: false,
    message: "",
    className: "",
  });

  const [designation, setDesignation] = useState([]);
  const [department, setDepartment] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const employeeResponse = await fetch(`/api/employee/${id}`);
        const employeeData = await employeeResponse.json();

        setFormData(employeeData.data);

        const designationResponse = await fetch("/api/designation");
        const designationData = await designationResponse.json();
        setDesignation(designationData.data);

        const departmentResponse = await fetch("/api/department");
        const departmentData = await departmentResponse.json();
        setDepartment(departmentData.data);
      } catch (error) {
        console.error("Error loading data:", error);
        // Display an error message or perform error handling
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBankAccountChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      bankAccount: {
        ...prevData.bankAccount,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Make a PUT request to the backend API
      const response = await fetch(`/api/employee/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data.");
      }

      setToast({
        active: true,
        message: "Employee successfully updated!",
        className: "bg-green-100 text-green-500",
      });

      router.push("/employee");

      // Display a success message or perform any other necessary actions
      console.log("Form data submitted successfully!");
    } catch (error) {
      console.error("Error submitting form data:", error);
      // Display an error message or perform error handling
      setToast({
        active: true,
        message: "Something went wrong!",
        className: "bg-red-100 text-red-500",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <Alert
        className={toast.className}
        handleClose={() => setToast({ active: false, message: "" })}
        isAlertOpen={toast.active}
        message={toast.message}
      />
      <h1 className="font-bold text-lg mb-3 blue_gradient w-max">
        Update Employee
      </h1>
      <form onSubmit={handleSubmit} className=" mb-4">
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name:
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="designation"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Designation:
          </label>
          <select
            id="designation"
            name="designation"
            value={formData.designation?._id}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Designation</option>
            {/* Add the options for the designations */}
            {designation.map((item) => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="department"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Department:
          </label>
          <select
            id="department"
            name="department"
            value={formData.department?._id}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select Department</option>
            {/* Add the options for the departments */}
            {department.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="joiningDate"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Joining Date:
          </label>
          <input
            type="date"
            id="joiningDate"
            name="joiningDate"
            value={
              formData.joiningDate
                ? new Date(formData.joiningDate).toISOString().split("T")[0]
                : ""
            }
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="salary"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Salary:
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="accountNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Bank Account Number:
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            value={formData.bankAccount.accountNumber}
            onChange={handleBankAccountChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="accountName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Bank Account Name:
          </label>
          <input
            type="text"
            id="accountName"
            name="accountName"
            value={formData.bankAccount.accountName}
            onChange={handleBankAccountChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="branch"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Bank Branch:
          </label>
          <input
            type="text"
            id="branch"
            name="branch"
            value={formData.bankAccount.branch}
            onChange={handleBankAccountChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="taxInformation"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tax Information:
          </label>
          <input
            type="text"
            id="taxInformation"
            name="taxInformation"
            value={formData.taxInformation}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="allowances"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Allowances:
          </label>
          <input
            type="number"
            id="allowances"
            name="allowances"
            value={formData.allowances}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`btn_blue text-sm ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
