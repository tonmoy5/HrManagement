import { useEffect, useState } from "react";
import { GoEye, GoPencil } from "react-icons/go";
import { useUserContext } from "../context/UserContext";
import Modal from "./Modal";
import Table from "./Table";

const AttendanceLogTable = ({ data: d }) => {
  const [data, setData] = useState(d);
  const [viewModalOpen, settViewModalOpen] = useState(false);
  const [selectedLog, setSelectedLog] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedOvertime, setEditedOvertime] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    setData(d);
  }, [d]);

  const headers = [
    "Employee",
    "Check In",
    "Check Out",
    "Work Hours",
    "Status",
    "Overtime",
  ];

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

  const actionButtons =
    user.role === "admin"
      ? [
          {
            label: <GoPencil className="text-xl" />,
            onClick: (row) => {
              setSelectedLog(data ? data.find((d) => d._id === row._id) : {});
              setEditedOvertime(row.overtime);
              setEditModalOpen(true);
            },
            title: "Edit",
          },
          {
            label: <GoEye className="text-xl" />,
            onClick: (row) => {
              setSelectedLog(data ? data.find((d) => d._id === row._id) : {});
              settViewModalOpen(true);
            },
            title: "Snapshot",
          },
        ]
      : null;

  const handleEditOvertime = async () => {
    try {
      setEditLoading(true);

      const response = await fetch(`/api/attendance?id=${selectedLog._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overtimeHour: editedOvertime }),
      });

      if (response.ok) {
        setEditLoading(false);
        setEditModalOpen(false);
        setData((d) =>
          d.map((log) =>
            log._id === selectedLog._id
              ? { ...log, overtimeHour: editedOvertime }
              : log
          )
        );
      } else {
        setEditLoading(false);
        console.error("Failed to update overtime.");
      }
    } catch (error) {
      setEditLoading(false);
      console.error("Network error:", error);
    }
  };

  return filtered.length > 0 ? (
    filtered.map(({ label, data }, index) => (
      <div key={index} className="mb-5 border md:w-full">
        <h3 className="text-center py-2 bg-blue-100 text-sm ">
          Attendance History of <span className="font-bold">{label}</span>
        </h3>
        <Table
          headers={headers}
          data={getTableData(data)}
          actionButtons={actionButtons}
        />
        <Modal
          isOpen={viewModalOpen}
          onClose={() => settViewModalOpen(false)}
          title={"Snapshots"}
        >
          <span>Check in Snapshot</span>
          <img src={selectedLog?.checkInSnapShoot} alt="Snapshot" />
          {selectedLog?.checkOutSnapShoot ? (
            <>
              <span>Check in Snapshot</span>
              <img src={selectedLog?.checkOutSnapShoot} alt="Snapshot" />
            </>
          ) : null}
        </Modal>
        <Modal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          title={"Edit Overtime"}
        >
          <div className="flex flex-col items-end gap-3">
            <input
              type="number"
              value={editedOvertime}
              onChange={(e) => setEditedOvertime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-700 rounded-md outline-none "
            />
            <div className="flex gap-3">
              <button
                className="btn_red"
                onClick={() => setEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                disabled={editLoading}
                className="btn_blue disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleEditOvertime}
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </Modal>
      </div>
    ))
  ) : (
    <p>No logs found</p>
  );
};

export default AttendanceLogTable;

const calculateTotalWorkHours = (checkInTime, checkOutTime) => {
  if (!checkInTime || !checkOutTime) return null;

  const timeDifference = checkOutTime - checkInTime;
  const totalWorkHours = timeDifference / (1000 * 60 * 60);
  return totalWorkHours;
};

const getTableData = (dataArr) => {
  return dataArr.map((d) => {
    const checkInTime = d.checkInTime ? new Date(d.checkInTime) : null;
    const checkOutTime = d.checkOutTime ? new Date(d.checkOutTime) : null;
    const totalWorkHours = calculateTotalWorkHours(checkInTime, checkOutTime);

    return {
      _id: d._id,
      employeeName: d.employee?.fullName,
      checkInTime: checkInTime
        ? checkInTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
          })
        : "N/A",
      checkOutTime: checkOutTime
        ? checkOutTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "UTC",
          })
        : "N/A",
      totalWorkHours:
        totalWorkHours !== null ? totalWorkHours.toFixed(2) : "N/A",
      status:
        d.isLate === true ? (
          <p className="text-red-500">Late</p>
        ) : (
          <p className="text-green-500">On Time</p>
        ),
      overtime: d.overtimeHour ? d.overtimeHour : "N/A",
    };
  });
};
