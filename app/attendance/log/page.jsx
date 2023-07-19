import Table from "@components/Table";
import Attendance from "@models/attendance";

const AttendanceLog = async () => {
  const data = await Attendance.find({});
  console.log(data);
  const headers = ["Employee Name", "Date", "Check In Time", "Check Out Time"];
  return (
    <div className="p-5 bg-white rounded shadow">
      <h1 className="font-bold text-lg mb-3 blue_gradient w-max">
        Attendance Log
      </h1>
      {data.length > 0 ? (
        <Table
          headers={headers}
          data={data.map((d) => {
            return {
              employeeName: d.employee?.username,
              date: d.date,
              checkInTime: d.checkInTime,
              checkInTime: d.checkInTime,
            };
          })}
        />
      ) : (
        <p>No logs found</p>
      )}
    </div>
  );
};

export default AttendanceLog;
