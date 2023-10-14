import PropTypes from "prop-types";
import React from "react";

const AttendanceTable = ({ attendance }) => {
  return (
    <table className="table-auto">
      <thead>
        <tr>
          <th className="px-4 py-2">Date</th>
          <th className="px-4 py-2">Check-in Time</th>
          <th className="px-4 py-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {attendance.map((item) => (
          <tr key={item.id}>
            <td className="border px-4 py-2">{item.date}</td>
            <td className="border px-4 py-2">{item.checkInTime}</td>
            <td className="border px-4 py-2">
              {item.isLate ? "Late" : "On Time"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

AttendanceTable.propTypes = {
  attendance: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      checkInTime: PropTypes.string.isRequired,
      isLate: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default AttendanceTable;
