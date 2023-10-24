export const generateSearchData = (tripActiveTab, departure, arrival, selectedDates, additionalFields,activeClassTab,adultQuant,childQuant,infantsQuant) => {
    const searchDataArr = {
      adults: adultQuant,
      children: childQuant,
      infants: infantsQuant,
      classtype: activeClassTab,
    };
  
    if (tripActiveTab === 1) {
      searchDataArr.tripType = 'Round';
      searchDataArr.departure = [departure, arrival];
      searchDataArr.arrival = [arrival, departure];
      searchDataArr.date = [selectedDates[0].format('YYYY-MM-DD'), selectedDates[1].format('YYYY-MM-DD')];
    } else if (tripActiveTab === 2) {
      searchDataArr.tripType = 'OneWay';
      searchDataArr.departure = [departure];
      searchDataArr.arrival = [arrival];
      searchDataArr.date = [selectedDates.format('YYYY-MM-DD')];
    } else if (tripActiveTab === 3) {
      const validFields = additionalFields.filter((field) => field.departure && field.arrival && field.date);
      searchDataArr.tripType = 'MultiCity';
      searchDataArr.departure = validFields.map((field) => field.departure);
      searchDataArr.arrival = validFields.map((field) => field.arrival);
      searchDataArr.date = validFields.map((field) => field.date.format('YYYY-MM-DD'));
    }
  
    return searchDataArr;
  };