"use client";

import dayjs from "dayjs";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFingerprint } from "react-icons/bs";
import AttendanceCapture from "../components/molecules/AttendanceCapture";
import { useUserContext } from "../context/UserContext";
import Alert from "./Alert";
import Modal from "./Modal";

const AttendanceForm = ({ employees, setAttendanceData }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isOnLeave, setIsOnLeave] = useState(false);
  const { user } = useUserContext();

  const [webcamRef, setWebcamRef] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const [showCamera, setShowCamera] = useState(false);
  const [fingerPrintModal, setFingerPrintModal] = useState(false);

  const handleOpenCamera = () => {
    setShowCamera(true);
  };

  const [toast, setToast] = useState({
    active: false,
    message: "",
    className: "",
  });

  const currentDate = new Date();
  const currentDateISOString = new Date(
    currentDate - currentDate.getTimezoneOffset() * 60000
  ).toISOString();

  const [formData, setFormData] = useState({
    employeeId: user?.role === "employee" ? user._id : "",
    punchType: "",
    date: currentDateISOString.slice(0, 10),
    time: dayjs(new Date()).format("hh:mm"),
    checkInSnapShoot: null,
    checkOutSnapShoot: null,
  });

  useEffect(() => {
    // Check if the selected employee is on leave for the selected date
    if (formData.employeeId && formData.date) {
      checkLeave(formData.employeeId, formData.date);
    }
  }, [formData.employeeId, formData.date]);

  const checkLeave = async (employeeId, date) => {
    try {
      const response = await fetch(
        `/api/employee/check-leave?employeeId=${employeeId}&date=${date}`,
        { cache: "no-store" }
      );
      const responseData = await response.json();

      setIsOnLeave(responseData.onLeave); // Update the state based on the API response
    } catch (error) {
      console.error("Error checking leave:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    const punchType = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      punchType: punchType,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageSrc;
    let uploadedImage;

    setIsLoading(true);

    try {
      const { employeeId, punchType, date, time } = formData;

      if (webcamRef) {
        imageSrc = webcamRef.getScreenshot();
        setCapturedImage(imageSrc);

        const blob = await fetch(imageSrc).then((res) => res.blob());

        const imgFormData = new FormData();
        imgFormData.append("file", blob, "screenshot555.jpg");

        const fileRes = await fetch("/api/upload", {
          method: "POST",
          body: imgFormData,
        });

        const fileData = await fileRes.json();
        uploadedImage = fileData.url;

        if (!fileRes.ok) {
          return new Error("Upload snapshot failed");
        }
      }
      const data = { employeeId, date };

      if (punchType === "punchIn") {
        data.checkInTime = new Date(`${date}T${time}:00Z`);
        data.checkInSnapShoot = uploadedImage;
      } else if (punchType === "punchOut") {
        data.checkOutTime = new Date(`${date}T${time}:00Z`);
        data.checkOutSnapShoot = uploadedImage;
      }

      const response = await fetch(
        `/api/attendance/${punchType === "punchIn" ? "check-in" : "check-out"}`,
        {
          method: punchType === "punchIn" ? "POST" : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      if (punchType === "punchIn") {
        setAttendanceData((prev) => [responseData.data, ...prev]);
      } else {
        setAttendanceData((prev) =>
          prev.map((d) => {
            if (d._id === responseData.data._id) {
              return { ...d, checkOutTime: responseData.data.checkOutTime };
            }
            return d;
          })
        );
      }

      setToast({
        active: true,
        message: `${
          punchType === "punchIn" ? "Punch In " : "Punch Out"
        } Success`,
        className: "bg_green_gradient text-white",
      });

      // Reset the form fields
      setFormData({
        employeeId: "",
        punchType: "",
        date: currentDateISOString.slice(0, 10),
        time: dayjs(new Date()).format("hh:mm"),
      });
      // router.refresh();
    } catch (error) {
      console.error(
        `Error performing attendance ${
          formData.punchType === "punchIn" ? "check in" : "check out"
        }:`,
        error
      );

      await fetch("/api/upload", {
        method: "DELETE",
        body: JSON.stringify({
          fileUrl: uploadedImage,
          uploadKey: process.env.UPLOAD_KEY,
        }),
      });

      setToast({
        active: true,
        message: error.message,
        className: "bg-red-100 text-red-500",
      });
    } finally {
      setIsLoading(false);
      setCapturedImage(null);
      setShowCamera(false);
      setFingerPrintModal(false);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {toast.active && (
          <Alert
            className={toast.className}
            handleClose={() => setToast({ active: false, message: "" })}
            isAlertOpen={toast.active}
            message={toast.message}
          />
        )}
      </AnimatePresence>
      <form>
        <div className="md:flex gap-10 md:space-y-0 space-y-4">
          <div className="space-y-4 md:w-1/2 w-full order-1">
            <div>
              <label htmlFor="employee" className="text-gray-700 font-medium">
                Employee:
              </label>
              <select
                id="employeeId"
                name="employeeId"
                value={
                  user?.role === "employee" ? user._id : formData.employeeId
                }
                onChange={handleChange}
                required
                disabled={user.role === "employee"}
                className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
              >
                {user.role === "employee" ? null : (
                  <option value="">Select Employee</option>
                )}
                {employees.map((employee) => (
                  <option key={employee._id} value={employee?._id}>
                    {employee?.fullName} ({employee?.designation?.title})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-gray-700 font-medium">Punch Type:</label>
              <div className="flex space-x-4">
                <div>
                  <input
                    type="radio"
                    id="punchIn"
                    name="punchType"
                    value="punchIn"
                    checked={formData.punchType === "punchIn"}
                    onChange={handleRadioChange}
                    required
                  />
                  <label htmlFor="punchIn" className="ml-2">
                    Punch In
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="punchOut"
                    name="punchType"
                    value="punchOut"
                    checked={formData.punchType === "punchOut"}
                    onChange={handleRadioChange}
                    required
                  />
                  <label htmlFor="punchOut" className="ml-2">
                    Punch Out
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="date" className="text-gray-700 font-medium">
                Date:
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                disabled={user.role === "employee"}
                required
                className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
              />
            </div>
            <div>
              <label htmlFor="time" className="text-gray-700 font-medium">
                Time:
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                disabled={user.role === "employee"}
                required
                className="block w-full border-gray-400 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm py-2 px-2 border"
              />
            </div>
          </div>
          <div className="order-2 flex-1">
            <AttendanceCapture
              capturedImage={capturedImage}
              setWebcamRef={setWebcamRef}
              showCamera={showCamera}
              handleOpenCamera={handleOpenCamera}
            />
          </div>
        </div>
        {isOnLeave && (
          <p className="text-red-500 py-2">This employee is on leave</p>
        )}
        <div className="flex justify-end mt-5">
          <button
            type="button"
            className="btn_blue text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || isOnLeave || !showCamera}
            onClick={() => setFingerPrintModal(true)}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>

      <Modal
        isOpen={fingerPrintModal}
        onClose={() => setFingerPrintModal(false)}
        title="Input Fingerprint"
      >
        {/* {selectedEmployeeId && (
          <EmployeeDetails employeeId={selectedEmployeeId} />
        )} */}

        <BsFingerprint className="text-6xl" />

        <div className="flex justify-end mt-5 gap-4">
          <button
            type="button"
            className="btn_danger text-sm"
            onClick={() => setFingerPrintModal(false)}
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="btn_blue text-sm disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Submitted" : "Submit"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AttendanceForm;
