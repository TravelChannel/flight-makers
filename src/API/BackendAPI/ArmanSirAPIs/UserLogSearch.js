export const saveFlightSearchLogs = async (raw) => {
  try {
    const { adults, children, infants, classtype, tripType, departure, arrival, date } = raw;
   
      const departureStr = JSON.stringify(departure);
      const arrivalStr = JSON.stringify(arrival);
      const dateStr = JSON.stringify(date);
  
      const encodedDeparture = encodeURIComponent(departureStr);
      const encodedArrival = encodeURIComponent(arrivalStr);
      const encodedDate = encodeURIComponent(dateStr);
      const url = `https://fmcrm.azurewebsites.net/Handlers/FMConnectApis.ashx?type=97&tripType=${tripType}&adults=${adults}&children=${children}&infants=${infants}&classtype=${classtype}&departure=${encodedDeparture}&arrival=${encodedArrival}&date=${encodedDate}`;


      console.log("api-url",url);
      
      const response = await fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
          redirect: 'follow'
      });

      if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Success:', result);
      return result;
  } catch (error) {
      console.error('Error:', error);
      throw error;
  }
};
