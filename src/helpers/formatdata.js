import cities from "../Constant/airport";

export const elapsedTimeFunct = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}hr ${remainingMinutes}min`;

}
// -----------------my functions for Amadeous--------------------------

// format Amadeous elapsedTIme
export function AmadeuselapsedTime(time) {
  let hours = parseInt(time.substring(0, 2), 10);
  let minutes = parseInt(time.substring(2, 4), 10);
  return `${hours}hr ${minutes}min`;
}

// amadeus function to Calculate total flight Time
// export const calculateTotalTime = (flightTimes) => {
//   return flightTimes.map(times => {
//       let totalHours = 0, totalMinutes = 0;

//       times.forEach(time => {
//           let hours = parseInt(time.substring(0, 2)); // Extract hours
//           let minutes = parseInt(time.substring(2, 4)); // Extract minutes

//           totalHours += hours;
//           totalMinutes += minutes;
//       });

//       // Convert excess minutes into hours
//       totalHours += Math.floor(totalMinutes / 60);
//       totalMinutes = totalMinutes % 60;

//       // Format as HHMM
//       return `${totalHours} hr ${totalMinutes} min`;
//   });
// };
// ----------------------------Temporary Disabled-----------------
// export const calculateTotalTime = (flightTimes) => {
//   return flightTimes.map(flightSegments => { 
//       let totalHours = 0, totalMinutes = 0;
//       flightSegments.flat().forEach(time => {
//           let hours = parseInt(time.substring(0, 2), 10) || 0; 
//           let minutes = parseInt(time.substring(2, 4), 10) || 0; 

//           totalHours += hours;
//           totalMinutes += minutes;
//       });
//       totalHours += Math.floor(totalMinutes / 60);
//       totalMinutes = totalMinutes % 60;

//       return `${totalHours} hr ${totalMinutes} min`;
//   });
// };

export const calculateTotalTime = (flightTimes) => {
  return flightTimes.map((flightSegments) => {
    let totalHours = 0;
    let totalMinutes = 0;

    flightSegments.forEach((time) => {
      const hours = parseInt(time.substring(0, 2), 10) || 0;
      const minutes = parseInt(time.substring(2, 4), 10) || 0;

      totalHours += hours;
      totalMinutes += minutes;
    });

    // Convert extra minutes into hours
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return `${totalHours} hr ${totalMinutes} min`;
  });
};


export const convertTimeFormat = (time) => {
  if (!time) {
    return "Invalid time";
  }
  const timeString = time.toString().padStart(4, '0');
  const hours = timeString.slice(0, 2);
  const minutes = timeString.slice(2, 4);
  return `${hours}:${minutes}`;
};

export const convertDateFormat = (date) => {
  const dateString = date.toString();
  const day = dateString.slice(0, 2);
  const month = dateString.slice(2, 4) - 1;
  const year = "20" + dateString.slice(4, 6);
  const dateObject = new Date(year, month, day);
  const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
  return dateObject.toLocaleDateString('en-US', options);
};

export const EuropianDateFormat = (dateStr) => {
  if (dateStr.length !== 6) return 'Invalid Date';

  const month = dateStr.substring(0, 2);
  const day = dateStr.substring(2, 4);
  const year = `20${dateStr.substring(4, 6)}`;  

  return `${month}-${day}-${year}`;
};

export const formatCustomDate = (dateStr) => {
  // Assuming dateStr is in "DDMMYY" format
  const day = dateStr.slice(0, 2);
  const month = dateStr.slice(2, 4);
  const year = '20' + dateStr.slice(4, 6);
  return `${year}-${month}-${day}`;
};

export const  calculateLayoverTime = (arrivalTime, departureTime) =>{
    if (!arrivalTime || !departureTime) return null;
  
    // Convert time strings to date objects (assuming HHMM format)
    const arrHours = parseInt(arrivalTime.substring(0, 2), 10);
    const arrMinutes = parseInt(arrivalTime.substring(2), 10);
  
    const depHours = parseInt(departureTime.substring(0, 2), 10);
    const depMinutes = parseInt(departureTime.substring(2), 10);
  
    // Convert everything to minutes
    const arrTotalMinutes = arrHours * 60 + arrMinutes;
    const depTotalMinutes = depHours * 60 + depMinutes;
  
    let layoverMinutes = depTotalMinutes - arrTotalMinutes;
    if (layoverMinutes < 0) layoverMinutes += 24 * 60; // Adjust for overnight layovers
  
    // Convert minutes to hours + minutes format
    const hours = Math.floor(layoverMinutes / 60);
    const minutes = layoverMinutes % 60;
  
    return `${hours}h ${minutes}m`;
  }

// ---------------------------end --------------------------------------
export const airportNameFunct = cities.reduce((airport, city) => {
    airport[city.iata_code] = city.Name;
    return airport;
}, {});

export const cityNameFunct = cities.reduce((iatac, city) => {
    iatac[city.iata_code] = city.municipality;
    return iatac;
}, {});
export const formatDateToISO = (dateString) => {
  const months = {
    Jan: "01", Feb: "02", Mar: "03", Apr: "04",
    May: "05", Jun: "06", Jul: "07", Aug: "08",
    Sep: "09", Oct: "10", Nov: "11", Dec: "12"
  };

  const parts = dateString.split(", ");
  const month = months[parts[1].split(" ")[0]];
  const day = parts[1].split(" ")[1].padStart(2, "0");
  const year = parts[2];

  return `${year}-${month}-${day}`;
};

export const calculateDuration = (startTime, endTime) => {
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);
  
    const start = new Date(0, 0, 0, startHour, startMinute);
    const end = new Date(0, 0, 0, endHour, endMinute);
  
    let diffInMinutes = (end - start) / 60000; // Difference in minutes
    if (diffInMinutes < 0) {
      // If the next flight is on the next day, add 24 hours to the difference
      diffInMinutes += 24 * 60;
    }
  
    const hours = Math.floor(diffInMinutes / 60);
    const remainingMinutes = diffInMinutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };
export const formatCompleteDate = (dateValue) => {
    const dateObject = new Date(dateValue);
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: "numeric"
    };
    // console.log("date1",dateObject);
    return dateObject.toLocaleString('en-US', options);
};

export const formatDate = (dateValue) => {
  const dateObject = new Date(dateValue);
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return dateObject.toLocaleString('en-US', options);
};

export const addTimeToPreviousDate = (previousDate, time1, time2) => {
  // console.log(previousDate, time1, time2);
  // previousDate= "2023-08-12" ;
  // time1= "20:05";
  // time2= "00:15";

  const [hour1, minute1] = time1.split(":").map(Number);
  const [hour2, minute2] = time2.split(":").map(Number);

  // Convert time1 and time2 into minutes since midnight
  const totalMinutes1 = hour1 * 60 + minute1;
  const totalMinutes2 = hour2 * 60 + minute2;

  // Calculate the time difference between time2 and time1
  let totalMinutesDiff = totalMinutes2 - totalMinutes1;

  const dateObject = new Date(previousDate);
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: "numeric"
  };

  // If the total minutes difference is negative and time2 is on the next day
  if (totalMinutesDiff < 0 && hour2 < hour1) {
    dateObject.setDate(dateObject.getDate() + 1);
  }

  // If time2 is greater than 23:59 or less than 01:00, change the date
  if (totalMinutes2 >= 1440 || totalMinutes2 < 60) {
    dateObject.setDate(dateObject.getDate() + 1);
  }

  // Adjust the time
  const newHour = Math.floor(totalMinutesDiff / 60);
  const newMinute = totalMinutesDiff % 60;
  dateObject.setHours(hour1 + newHour, minute1 + newMinute);
// console.log("date2",dateObject);
  return dateObject.toLocaleString('en-US', options);
};

export const addTimeToPreviousDepartDate = (previousDate, time1, time2) => {
  const [hour1, minute1] = time1.split(":").map(Number);
  const [hour2, minute2] = time2.split(":").map(Number);

  // Convert time1 and time2 into minutes since midnight
  const totalMinutes1 = hour1 * 60 + minute1;
  const totalMinutes2 = hour2 * 60 + minute2;

  // Calculate the time difference between time2 and time1
  let totalMinutesDiff = totalMinutes2 - totalMinutes1;

  const dateObject = new Date(previousDate);

  // If the total minutes difference is negative and time2 is on the next day
  if (totalMinutesDiff < 0 && hour2 < hour1) {
    dateObject.setDate(dateObject.getDate() + 1);
  }

  // If time2 is greater than 23:59 or less than 01:00, change the date
  if (totalMinutes2 >= 1440 || totalMinutes2 < 60) {
    dateObject.setDate(dateObject.getDate() + 1);
  }

  // Adjust the time
  const newHour = Math.floor(totalMinutesDiff / 60);
  const newMinute = totalMinutesDiff % 60;
  dateObject.setHours(hour1 + newHour, minute1 + newMinute);

  // Format the date as "YYYY-MM-DD"
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const convertTimeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(' ');

  const hoursInMinutes = parseInt(hours) * 60;
  const minutesAsNumber = parseInt(minutes);

  const totalMinutes = hoursInMinutes + minutesAsNumber;
  return totalMinutes;
}

export const checkTimeToNextDate = (previousDate, time1, time2) => {
  const [hour1, minute1] = time1.split(":").map(Number);
  const [hour2, minute2] = time2.split(":").map(Number);

  const totalMinutes1 = hour1 * 60 + minute1;
  const totalMinutes2 = hour2 * 60 + minute2;

  let totalMinutesDiff = totalMinutes2 - totalMinutes1;

  const dateObject = new Date(previousDate);

  if (totalMinutesDiff < 0 && hour2 < hour1) {
    dateObject.setDate(dateObject.getDate() + 1);
  }

  if (totalMinutes2 >= 1440 || totalMinutes2 < 60) {
    dateObject.setDate(dateObject.getDate() + 1);
  }

  const newHour = Math.floor(totalMinutesDiff / 60);
  const newMinute = totalMinutesDiff % 60;
  dateObject.setHours(hour1 + newHour, minute1 + newMinute);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0');
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


// ------------------------

export const changeDateFormat = (inputDate) =>{
  const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}