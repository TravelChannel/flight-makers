import { createContext, useState, useContext } from 'react';

const ItemsToShowContext = createContext();

export function useItemsToShow() {
  return useContext(ItemsToShowContext);
}

export function ItemsToShowProvider({ children, totalResults, apiData, searchDataArr, filterDataArr }) {
  // Determine the initial value for itemsToShow
  const initialItemsToShow = totalResults < 20 ? totalResults : 20;
  const [itemsToShow, setItemsToShow] = useState(initialItemsToShow);

  const selectedStops = filterDataArr && filterDataArr.selectStops ? filterDataArr.selectStops : [];
  const selectedDepTimings = filterDataArr && filterDataArr.selectDepartureTime ? filterDataArr.selectDepartureTime : [];
  const selectedAriTimings = filterDataArr && filterDataArr.selectArrivalTime ? filterDataArr.selectArrivalTime : [];
  const selectedAirlines = filterDataArr && filterDataArr.selectAirlines ? filterDataArr.selectAirlines : [];

  let filteredApiData = [];

  if (
    selectedStops.length === 0 &&
    selectedDepTimings.length === 0 &&
    selectedAriTimings.length === 0 &&
    selectedAirlines.length === 0
  ) {
    filteredApiData = apiData;
  } else {
    filteredApiData = apiData.filter(data =>
      data.schedualDetGet.some(itemArray =>
        (selectedStops.length === 0 || selectedStops.includes(itemArray.length.toString())) &&
        (selectedDepTimings.length === 0 || checkFilterTiming(itemArray[0].departure.time, selectedDepTimings)) &&
        (selectedAriTimings.length === 0 || checkFilterTiming(itemArray[itemArray.length - 1].arrival.time, selectedAriTimings)) &&
        (selectedAirlines.length === 0 || selectedAirlines.includes(itemArray[0].carrier.marketing))
      )
    );
  }
  if (filteredApiData.length === 0) {
    filteredApiData = apiData;
  }

  // console.log(filterDataArr);
  // console.log(apiData);

  function checkFilterTiming(arrivalTime, selectedTimings) {
    const timeMatch = arrivalTime.match(/(\d{2}):(\d{2})/);
    if (!timeMatch) {
      return false; // Invalid arrivalTime format
    }

    const hour = parseInt(timeMatch[1]);
    const minute = parseInt(timeMatch[2]);

    const timeInMinutes = hour * 60 + minute;

    return selectedTimings.some(selectedTiming => {
      const [start, end] = getTimingRange(selectedTiming);
      if (start <= end) {
        return timeInMinutes >= start && timeInMinutes <= end;
      } else {
        return timeInMinutes >= start || timeInMinutes <= end;
      }
    });
  }

  function getTimingRange(selectedTiming) {
    switch (selectedTiming) {
      case '1':
        return [240, 480]; // 04:00 to 08:00
      case '2':
        return [480, 720]; // 08:00 to 12:00
      case '3':
        return [720, 960]; // 12:00 to 16:00
      case '4':
        return [960, 1200]; // 16:00 to 20:00
      case '5':
        return [1200, 240]; // 20:00 to 04:00
      default:
        return [0, 0];      // Default range (to handle unexpected cases)
    }
  }
  apiData = filteredApiData;
  totalResults = apiData.length;

  return (
    <ItemsToShowContext.Provider value={{ itemsToShow, setItemsToShow, totalResults, apiData, searchDataArr }}>
      {children}
    </ItemsToShowContext.Provider>
  );
}
