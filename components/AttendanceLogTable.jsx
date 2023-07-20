import Table from "./Table";

const AttendanceLogTable = ({ data }) => {
  const headers = [
    "Employee Name",
    // "Date",
    "Check In Time",
    "Check Out Time",
    "Total Work Hours",
  ];
  // Get the unique dates in the data for filtering
  const uniqueDates = Array.from(
    new Set(data.map((log) => new Date(log.date).toDateString()))
  );

  // Filter the attendance data for each date range
  const filtered = uniqueDates.map((unique) => {
    return {
      label: unique,
      data: data.filter((log) => {
        const logDate = new Date(log.date);
        return unique === logDate.toDateString();
      }),
    };
  });

  return filtered.length > 0 ? (
    filtered.map(({ label, data }, index) => (
      <div key={index} className="mb-5 border md:w-full">
        <h3 className="text-center py-2 bg-blue-100 text-sm ">
          Attendance History of <span className="font-bold">{label}</span>
        </h3>
        <Table headers={headers} data={getTableData(data)} />
      </div>
    ))
  ) : (
    <p>No logs found</p>
  );
};

export default AttendanceLogTable;

const calculateTotalWorkHours = (checkInTime, checkOutTime) => {
  if (!checkInTime || !checkOutTime) return null; // Return null if either time is not available

  const timeDifference = checkOutTime - checkInTime;
  const totalWorkHours = timeDifference / (1000 * 60 * 60); // Calculate the difference in hours
  return totalWorkHours;
};

const getTableData = (dataArr) => {
  return dataArr.map((d) => {
    const checkInTime = d.checkInTime ? new Date(d.checkInTime) : null;
    const checkOutTime = d.checkOutTime ? new Date(d.checkOutTime) : null;
    const totalWorkHours = calculateTotalWorkHours(checkInTime, checkOutTime);

    return {
      employeeName: d.employee?.fullName,
      // date: new Date(d.date).toLocaleDateString(),
      checkInTime: checkInTime
        ? checkInTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
          })
        : "Not Available",
      checkOutTime: checkOutTime
        ? checkOutTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
          })
        : "Not Available",
      totalWorkHours:
        totalWorkHours !== null ? totalWorkHours.toFixed(2) : "Not Available",
    };
  });
};
