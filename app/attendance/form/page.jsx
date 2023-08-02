import AttendanceForm from "@components/AttendanceForm";
import AttendanceLogTable from "@components/AttendanceLogTable";
import Attendance from "@models/attendance";

export const metadata = {
  title: "Attendance Form",
};

const AttendanceFormPage = async () => {
  const res = await import("../../api/employee/route");
  const employeesData = await (await res.GET()).json();

  const attendanceData = await Attendance.find({})
    .populate("employee")
    .limit(10)
    .sort({ date: "desc" });

  return (
    <section className="p-5 bg-white rounded shadow">
      <h1 className="font-bold text-lg mb-3 blue_gradient w-max">
        Attendance Form
      </h1>
      <AttendanceForm employees={employeesData.data} />
      <h3 className="text-lg font-bold mt-5 mb-3">Attendance Log</h3>
      <AttendanceLogTable data={attendanceData} />
    </section>
  );
};

export default AttendanceFormPage;
