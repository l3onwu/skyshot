import { useState } from "react";

export default function useInterfaceSettings() {
  const [mode, setMode] = useState("Rain");
  const [numberMode, setNumberMode] = useState(false);
  const [tempUnit, setTempUnit] = useState(
    localStorage.getItem("tempUnit") || "C"
  );
  const [timeUnit, setTimeUnit] = useState(
    localStorage.getItem("timeUnit") || "12"
  );
  const [startHour, setStartHour] = useState(
    localStorage.getItem("startHour") || "0:00"
  );
  const [endHour, setEndHour] = useState(
    localStorage.getItem("endHour") || "23:00"
  );

  return {
    mode,
    setMode,
    numberMode,
    setNumberMode,
    tempUnit,
    setTempUnit,
    timeUnit,
    setTimeUnit,
    startHour,
    setStartHour,
    endHour,
    setEndHour,
  };
}
