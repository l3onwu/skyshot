import { useState } from "react";

export interface InterfaceHookType {
  viewsList: ViewObjectType[];
  addViewToList: Function;
}

export interface ViewObjectType {
  componentName: string;
  days: number;
  startHour: number;
  endHour: number;
}

export default function useInterfaceSettings() {
  // TODO: Try to get viewList from asyncStorage first
  const [viewsList, setViewsList] = useState([]);

  // const [mode, setMode] = useState("Temp");
  // const [numberMode, setNumberMode] = useState(true);
  // const [tempUnit, setTempUnit] = useState(
  //   localStorage.getItem("tempUnit") || "C"
  // );
  // const [timeUnit, setTimeUnit] = useState(
  //   localStorage.getItem("timeUnit") || "12"
  // );
  // const [startHour, setStartHour] = useState(
  //   localStorage.getItem("startHour") || "0:00"
  // );
  // const [endHour, setEndHour] = useState(
  //   localStorage.getItem("endHour") || "23:00"
  // );

  // Functions
  const addViewToList = (newViewObject) => {
    setViewsList([...viewsList, newViewObject]);

    // TODO Add to async
  };

  return {
    viewsList,
    addViewToList,
    // mode,
    // setMode,
    // numberMode,
    // setNumberMode,
    // tempUnit,
    // setTempUnit,
    // timeUnit,
    // setTimeUnit,
    // startHour,
    // setStartHour,
    // endHour,
    // setEndHour,
  };
}
