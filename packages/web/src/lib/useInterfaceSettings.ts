import { useState } from "react";

export default function useInterfaceSettings() {
  const [mode, setMode] = useState("Calendar");
  const [calendarMode, setCalendarMode] = useState("Temp");
  const [numberMode, setNumberMode] = useState(true);

  const [tempUnit, setTempUnit] = useState(
    localStorage.getItem("tempUnit") || "C"
  );
  const [timeUnit, setTimeUnit] = useState(
    localStorage.getItem("timeUnit") || "12"
  );

  return {
    mode,
    setMode,
    calendarMode,
    setCalendarMode,
    numberMode,
    setNumberMode,
    tempUnit,
    setTempUnit,
    timeUnit,
    setTimeUnit,
  };
}
