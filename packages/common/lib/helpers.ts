// Check if a given date object is equal to the current day+hour
export const checkNow = (givenDate: Date) => {
  let today = new Date();
  if (givenDate.getHours() === today.getHours()) {
    if (givenDate.getDay() === today.getDay()) {
      return true;
    }
  }
  return false;
};

// Takes a day's index, and returns the English day name
export const dayToDay = (dayIndex: number) => {
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return DAYS[dayIndex % 7];
};

export const allHours = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23,
];

// Filter hours to times between start/end
// Formats to correct format
// Takes input of start/end hours, and 12/24 time setting
export const parseStart = (startHour, endHour, timeUnit) => {
  let times = [];
  for (
    let i = parseInt(startHour.split(":")[0]);
    i <= parseInt(endHour.split(":")[0]);
    i++
  ) {
    if (timeUnit === "12") {
      if (i < 12) {
        times.push(`${i}am`);
      }
      if (i === 12) {
        times.push(`${i}pm`);
      }
      if (i > 12) {
        times.push(`${i % 12}pm`);
      }
      continue;
    }
    times.push(`${i}:00`);
  }
  return times;
};

// Return color based on view mode, and temperature data
// Takes input, view mode and hour weather data
export const chooseBG = (datapoint, mode) => {
  // Rain + Snow mode
  if (mode === "Rain") {
    if (datapoint["snowfall"] >= 2) {
      return "#ffffff";
    } else if (datapoint["snowfall"] >= 1) {
      return "#e2e2e2";
    } else if (datapoint["snowfall"] > 0) {
      return "#b6b4b4";
    } else if (datapoint["rain"] < 0.01) {
      return "gray.800";
    } else if (datapoint["rain"] < 0.5) {
      return "blue.800";
    } else {
      return "blue.500";
    }
  }
  // Temperature mode
  else {
    if (datapoint["temperature"] < -4) {
      return "#48486b";
    } else if (datapoint["temperature"] < 4) {
      return "#0000FF";
    } else if (datapoint["temperature"] < 12) {
      return "#6100ff";
    } else if (datapoint["temperature"] < 20) {
      return "#c300ff";
    } else if (datapoint["temperature"] < 30) {
      return "#ed5a00";
    } else if (datapoint["temperature"] < 40) {
      return "#FF0000";
    } else {
      return "#7a0c0c";
    }
  }
};
