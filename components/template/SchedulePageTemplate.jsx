"use client";
import { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { useUserContext } from "../../context/UserContext";

const SchedulePageTemplate = () => {
  const [weekendDays, setWeekendDays] = useState([]);
  const [workHours, setWorkHours] = useState({
    startTime: "10:00",
    endTime: "19:00",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUserContext();

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch("/api/schedule");
        const data = await response.json();

        setWeekendDays(data.schedule.weekend.days);
        setWorkHours(data.schedule.workHours);
      } catch (error) {
        console.error(error);
      }
    };

    fetchScheduleData();
  }, []);

  const handleUpdateWeekendDay = async (day) => {
    const updatedWeekendDays = weekendDays.includes(day)
      ? weekendDays.filter((d) => d !== day)
      : [...weekendDays, day];

    const response = await fetch("/api/schedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        weekend: { days: updatedWeekendDays },
        workHours,
      }),
    });

    if (response.ok) {
      setWeekendDays(updatedWeekendDays);
    } else {
      console.log("Failed to update weekend days");
    }
  };

  const handleUpdateWorkHours = async () => {
    setIsLoading(true);
    const response = await fetch("/api/schedule", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weekend: { days: weekendDays }, workHours }),
    });

    if (response.ok) {
      console.log("Work hours updated successfully");
    } else {
      console.log("Failed to update work hours");
    }
    setIsLoading(false);
  };

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const daysOfTheWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="">
      <h1 className="font-bold text-lg blue_gradient w-max">Weekend Days</h1>
      <div className="flex items-center gap-3 mt-5">
        {weekendDays.map((day) => (
          <div
            key={day}
            className="flex items-center justify-between px-4 py-2 bg-white rounded-md shadow-md w-max"
          >
            <span>{day}</span>
          </div>
        ))}
        {user.role === "admin" ? (
          <button
            className="px-4 py-2 btn_blue text-white rounded-md shadow-md hover:bg-blue-700"
            onClick={handleToggleEdit}
          >
            <BiSolidEdit />
          </button>
        ) : null}
      </div>
      <div className="flex gap-3 mt-5">
        {isEditing &&
          daysOfTheWeek.map((day) => (
            <div
              key={day}
              className="flex items-center justify-between px-4 py-2 bg-white rounded-md shadow-md w-max gap-2"
            >
              <span>{day}</span>

              <input
                type="checkbox"
                checked={weekendDays.includes(day)}
                onChange={() => handleUpdateWeekendDay(day)}
              />
            </div>
          ))}
      </div>

      <div className="mt-5">
        <h1 className="font-bold text-lg blue_gradient w-max">Work Hours</h1>
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center justify-between px-4 py-2 bg-white rounded-md shadow-md w-max gap-2">
            <span>Start Time</span>
            <input
              type="time"
              value={workHours?.startTime}
              onChange={(e) =>
                setWorkHours({ ...workHours, startTime: e.target.value })
              }
              disabled={user.role !== "admin"}
            />
          </div>
          <div className="flex items-center justify-between px-4 py-2 bg-white rounded-md shadow-md w-max gap-2">
            <span>End Time</span>
            <input
              type="time"
              value={workHours?.endTime}
              onChange={(e) =>
                setWorkHours({ ...workHours, endTime: e.target.value })
              }
              disabled={user.role !== "admin"}
            />
          </div>
        </div>
        {user.role !== "admin" ? null : (
          <button
            className="px-4 py-2 btn_blue text-white rounded-md shadow-md hover:bg-blue-700 mt-3 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpdateWorkHours}
            disabled={isLoading}
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default SchedulePageTemplate;
