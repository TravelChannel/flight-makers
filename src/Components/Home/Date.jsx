// import { Select, Spin } from 'antd';
// import debounce from 'lodash/debounce';
// import React, { useMemo, useRef, useState } from 'react';

// function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
//   const [fetching, setFetching] = useState(false);
//   const [options, setOptions] = useState([]);
//   const [searchValue, setSearchValue] = useState('');
//   const fetchRef = useRef(0);

//   const debounceFetcher = useMemo(() => {
//     const loadOptions = (value) => {
//       fetchRef.current += 1;
//       const fetchId = fetchRef.current;
//       setOptions([]);
//       setFetching(true);

//       fetchOptions(value).then((newOptions) => {
//         if (fetchId !== fetchRef.current) {
//           // for fetch callback order
//           return;
//         }

//         setOptions(newOptions);
//         setFetching(false);
//       });
//     };

//     return debounce(loadOptions, debounceTimeout);
//   }, [fetchOptions, debounceTimeout]);

//   return (
//     <Select
//       showSearch
//       filterOption={false}
//       onSearch={(value) => {
//         setSearchValue(value);
//         debounceFetcher(value);
//       }}
//       notFoundContent={fetching ? <Spin size="small" /> : (searchValue && options.length === 0 ? 'No results found' : null)}
//       {...props}
//       options={options}
//       allowClear // Enable clear option
//     />
//   );
// }

// const App = () => {
//   const [departure, setDeparture] = useState(null);
//   const [arrival, setArrival] = useState(null);
//   const [fetching, setFetching] = useState(false);

//   function searchOptions(searchTerm) {
//     setFetching(true);
  
//     // Simulating an asynchronous search operation
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const searchResults = cities.filter((city) =>
//           city.toLowerCase().includes(searchTerm.toLowerCase())
//         );
  
//         let options = [];
  
//         if (searchTerm === '') {
//           // Show Lahore, Karachi, Multan, Islamabad, and Faisalabad as initial results
//           options = ['Lahore', 'Karachi', 'Multan', 'Islamabad', 'Faisalabad'].map((option) => ({
//             label: option,
//             value: option,
//           }));
//         } else {
//           // Exclude the current value of the other field from the search results
//           const filteredResults = searchResults.filter(
//             (result) => result !== (departure || arrival)
//           );
  
//           options = filteredResults.map((option) => ({
//             label: option,
//             value: option,
//           }));
//         }
  
//         setFetching(false);
//         resolve(options);
//       }, 1000); // Simulating a delay of 1 second
//     });
//   }

//   const cities = [
//     'Ferozewala',
//     'Chakwal',
//     'Guiranwala Cantonment',
//     'Kamalia',
//     'Ahmedpur East',
//     'Kot Addu',
//     'Wazirabad',
//     'Layyah',
//     'Taxila',
//     'Khushab',
//     'Mianwali',
//     'Lodhran',
//     'Hasilpur',
//     'Bhakkar',
//     'Arif Wala',
//     'Sambrial',
//     'Jatoi',
//     'Haroonabad',
//     'Narowal',
//     'Bhalwal',
//     'Lahore',
//     'Faisalabad',
//     'Rawalpindi',
//     'Guiranwala',
//     'Multan',
//     'Bahawalpur',
//     'Sargodha',
//     'Sialkot',
//     'Sheikhupura',
//     'Rahim Yar Khan',
//     'Jhang',
//     'Dera Ghazi Khan',
//     'Guirat',
//     'Sahiwal',
//     'Wah Cantonment',
//     'Kasur',
//     'Okara',
//     'Chiniot',
//     'Kamoke',
//     'Hafizabad',
//     'Sadigabad',
//   ];


//   const handleDepartureSelect = (selectedValue) => {
//     setDeparture(selectedValue);
//   };

//   const handleArrivalSelect = (selectedValue) => {
//     setArrival(selectedValue);
//   };

//   return (
//     <div className="d-flex justify-content-between">
//       <DebounceSelect
//         value={departure}
//         placeholder="Leaving From"
//         fetchOptions={searchOptions}
//         onChange={setDeparture}
//         onSelect={handleDepartureSelect}
//         onClear={() => {
//           setDeparture(null);
//         }}
//         className="inputDeprturFlight"
//         showArrow
//         showSearch
//         allowClear
//       />
//       <DebounceSelect
//         value={arrival}
//         placeholder="Going To"
//         fetchOptions={searchOptions}
//         onChange={setArrival}
//         onSelect={handleArrivalSelect}
//         onClear={() => {
//           setArrival(null);
//         }}
//         className="inputArrivalFlight"
//         showArrow
//         showSearch
//         allowClear
//       />
//     </div>
//   );
// };

// export default App;
// -----------------------------------------------------------------------------------------------------------------------------------
// import React, { useState } from 'react';
// import { Select } from 'antd';

// const { Option } = Select;

// const App = () => {
//   const [departure, setDeparture] = useState(null);
//   const [arrival, setArrival] = useState(null);
//   const [searchResults, setSearchResults] = useState([]);
//   const cities = [
//     'Ferozewala FER',
//     'Chakwal',
//     'Guiranwala Cantonment',
//     'Kamalia',
//     'Ahmedpur East',
//     'Kot Addu',
//     'Wazirabad',
//     'Layyah',
//     'Taxila',
//     'Khushab',
//     'Mianwali',
//     'Lodhran',
//     'Hasilpur',
//     'Bhakkar',
//     'Arif Wala',
//     'Sambrial',
//     'Jatoi',
//     'Haroonabad',
//     'Narowal',
//     'Bhalwal',
//     'Lahore LHE',
//     'Faisalabad',
//     'Rawalpindi',
//     'Guiranwala',
//     'Multan',
//     'Bahawalpur',
//     'Sargodha',
//     'Sialkot',
//     'Sheikhupura',
//     'Rahim Yar Khan',
//     'Jhang',
//     'Dera Ghazi Khan',
//     'Guirat',
//     'Sahiwal',
//     'Wah Cantonment',
//     'Kasur',
//     'Okara',
//     'Chiniot',
//     'Kamoke',
//     'Hafizabad',
//     'Sadigabad',
//   ];

//   const handleDepartureSearch = (value) => {
//     const filteredCities = value.length >= 3 ? cities.filter((city) => city.toLowerCase().includes(value.toLowerCase())) : [];
//     setSearchResults(filteredCities);
//   };
  
//   const handleArrivalSearch = (value) => {
//     const filteredCities = value.length >= 3 ? cities.filter((city) => city.toLowerCase().includes(value.toLowerCase()) && city !== departure) : [];
//     setSearchResults(filteredCities);
//   };

//   const handleDepartureSelect = (selectedValue) => {
//     setDeparture(selectedValue);
//     if (selectedValue === arrival) {
//       setArrival(null);
//     }
//   };
  
//   const handleArrivalSelect = (selectedValue) => {
//     setArrival(selectedValue);
//     if (selectedValue === departure) {
//       setDeparture(null);
//     }
//   };

//   return (
//     <div className="d-flex justify-content-between">
//       <Select
//         value={departure}
//         placeholder="Leaving From"
//         onChange={handleDepartureSelect}
//         onSearch={handleDepartureSearch}
//         className="inputDeprturFlight"
//         showSearch
//         showArrow
//         allowClear
//       >
//         {searchResults.map((city) => (
//           <Option key={city} value={city}>
//             {city}
//           </Option>
//         ))}
//       </Select>
//       <Select
//         value={arrival}
//         placeholder="Going To"
//         onChange={handleArrivalSelect}
//         onSearch={handleArrivalSearch}
//         className="inputArrivalFlight"
//         showSearch
//         showArrow
//         allowClear
//       >
//         {searchResults.map((city) => (
//           <Option key={city} value={city}>
//             {city}
//           </Option>
//         ))}
//       </Select>
//     </div>
//   );
// };

// export default App;

// ---------------------------------------------------------------------------------------------------------------------------------------------------
import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';
import moment from 'moment';

const priceArray = [789, 841, 392, 336, 540, 393, 560, 958, 574, 595, 125, 570, 343, 898, 251, 846, 108, 312, 131, 551, 648, 262, 610, 182, 286, 668, 693, 956, 707, 1050, 177, 397, 792, 189, 352, 952, 201, 812, 530, 676, 1026, 555, 865, 271, 354];

const App = () => {
  const [selectedDates, setSelectedDates] = useState([]);

  const handleDateChange = (dates, dateStrings) => {
    setSelectedDates(dates);

    const startDate = moment();
    const endDate = moment().add(90, 'days');

    const priceIndices = [];
    const prices = [];

    for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, 'day')) {
      const priceIndex = date.diff(startDate, 'days');
      const price = priceArray[priceIndex];
      priceIndices.push(priceIndex);
      prices.push(price);
    }
  };

  const renderDateCell = (date) => {
    const startDate = moment();
    const priceIndex = date.diff(startDate, 'days');
    const price = priceArray[priceIndex];
    const isCurrentDate = date.isSame(moment(), 'day');

    return (
      <div className={isCurrentDate ? 'current-date' : ''}>
        <div>{date.date()}</div>
        {price && <div style={{ fontSize: '10px', color: 'green' }}>${price}</div>}
      </div>
    );
  };

  return (
    <Space direction="vertical" className="w-100">
      <DatePicker.RangePicker
        onChange={handleDateChange}
        dateRender={renderDateCell}
        picker="date"
        className="custom-datepicker"
      />
      {selectedDates.length > 0 && (
        <div>
          Selected Dates:
          {selectedDates.map((date, index) => (
            <div key={index}>{date.format('YYYY-MM-DD')}</div>
          ))}
        </div>
      )}
    </Space>
  );
};

export default App;




