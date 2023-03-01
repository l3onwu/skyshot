import { useState } from "react";

export default function useInterfaceSettings() {
  const [tempUnit, setTempUnit] = useState(
    localStorage.getItem("tempUnit") || "C"
  );
  const [timeUnit, setTimeUnit] = useState(
    localStorage.getItem("timeUnit") || "12"
  );

  return {
    tempUnit,
    setTempUnit,
    timeUnit,
    setTimeUnit,
  };
}
