import { Select, Spin } from 'antd';
import debounce from 'lodash/debounce';
import React, { Fragment, useMemo, useRef, useState } from 'react';

function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  return (
    <Select
      showSearch
      filterOption={false}
      onSearch={(value) => {
        setSearchValue(value);
        debounceFetcher(value);
      }}
      notFoundContent={fetching ? <Spin size="small" /> : (searchValue && options.length === 0 ? 'No results found' : null)}
      {...props}
      options={options}
      allowClear // Enable clear option
    />
  );
}

const App = ({ oncahngeValueSend }) => {
  const [departure, setDeparture] = useState(null);
  const [arrival, setArrival] = useState(null);
  const [fetching, setFetching] = useState(false);

  function searchOptions(searchTerm) {
    setFetching(true);
  
    // Simulating an asynchronous search operation
    return new Promise((resolve) => {
      setTimeout(() => {
        let searchResults = [];
  
        if (!searchTerm) {
          // Display the first five cities as options when search input is empty
          searchResults = cities.slice(0, 5);
        } else {
          // Filter cities based on search term
          searchResults = cities.filter((city) =>
            city.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
  
        // Exclude the current value of the other field from the search results
        const filteredResults = searchResults.filter(
          (result) => result !== (departure || arrival)
        );
  
        const options = filteredResults.map((option) => ({
          label: option,
          value: option,
        }));
  
        setFetching(false);
        resolve(options);
      }, 1000); // Simulating a delay of 1 second
    });
  }


  const cities = [
    'Ferozewala',
    'Chakwal',
    'Guiranwala Cantonment',
    'Kamalia',
    'Ahmedpur East',
    'Kot Addu',
    'Wazirabad',
    'Layyah',
    'Taxila',
    'Khushab',
    'Mianwali',
    'Lodhran',
    'Hasilpur',
    'Bhakkar',
    'Arif Wala',
    'Sambrial',
    'Jatoi',
    'Haroonabad',
    'Narowal',
    'Bhalwal',
    'Lahore',
    'Faisalabad',
    'Rawalpindi',
    'Guiranwala',
    'Multan',
    'Bahawalpur',
    'Sargodha',
    'Sialkot',
    'Sheikhupura',
    'Rahim Yar Khan',
    'Jhang',
    'Dera Ghazi Khan',
    'Guirat',
    'Sahiwal',
    'Wah Cantonment',
    'Kasur',
    'Okara',
    'Chiniot',
    'Kamoke',
    'Hafizabad',
    'Sadigabad',
  ];
  const handleSwapCity = () => {
    setDeparture(arrival);
    setArrival(departure);
  };

  const handleDepartureSelect = (selectedValue) => {
    setDeparture(selectedValue);
  };

  const handleArrivalSelect = (selectedValue) => {
    setArrival(selectedValue);
  };

  const handleEventAndSendValues = () => {
    // Prepare the values to send
    const valuesToSend = {
      arrival: arrival,
      departure: departure,
    };
    // Call the function provided by the parent component
    oncahngeValueSend(valuesToSend);
  };
  
  return (
    <Fragment>
      <div className="d-flex justify-content-between searchFlightField">
        <DebounceSelect
            value={departure}
            placeholder="Leaving From"
            fetchOptions={searchOptions}
            onChange={setDeparture}
            onSelect={handleDepartureSelect}
            onClear={() => {
            setDeparture(null);
            }}
            className="inputDeprturFlight"
            showArrow
            showSearch
            allowClear
            onBlur={handleEventAndSendValues}
        />
            <span  >
                <svg className="swipCircle" onClick={handleSwapCity}><path d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z"></path></svg>
            </span>
        <DebounceSelect
            value={arrival}
            placeholder="Going To"
            fetchOptions={searchOptions}
            onChange={setArrival}
            onSelect={handleArrivalSelect}
            onClear={() => {
            setArrival(null);
            }}
            className="inputArrivalFlight"
            showArrow
            showSearch
            allowClear
            onBlur={handleEventAndSendValues}
        />
      </div>
    </Fragment>
  );
};

export default App;
