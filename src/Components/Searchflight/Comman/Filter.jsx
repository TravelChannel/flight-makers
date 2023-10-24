
import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import airlinesData from '../../../Constant/airlineName';
import CheckBoxComp from "./CheckBoxComp";
import { useItemsToShow } from './../Comman/Context.js';
import { setFilterData } from '../../../Store/action/index';
import { useDispatch } from "react-redux";
import HelpLineCard from '../../Commom/HelpLineCard';

const Filters = () => {
    const [stops, setStops] = useState(true);
    const [departureTimeSchdl, setTimings] = useState(true);
    const [arrivalTimings, setArrivalTimings] = useState(true);
    const [AirLine, setAirLine] = useState(true);
    const [isIconRotated, setIconRotated] = useState(false);
    const [isTimingIconRotated, setTimingIconRotated] = useState(false);
    const [isArrivalIconRotated, setArrivalIconRotated] = useState(false);
    const [isAirLineIcon, setAirLineIcon] = useState(false);
    const [checkState, setCheckState] = useState(true);

    const [selectedStops, setSelectedStops] = useState([]);
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selecteddepartureTimeSchdl, setSelecteddepartureTimeSchdl] = useState([]);
    const [selectedArrivalTimings, setSelectedArrivalTimings] = useState([]);
    const { itemsToShow, totalResults, apiData } = useItemsToShow();
    const [filteredApiData, setFilteredApiData] = useState([]);
    const dispatch = useDispatch();
    // Callback function to update selected stops
    const handleStopsChange = (label, isChecked) => {
        setSelectedStops((prevSelectedStops) => {
            if (isChecked) {
                if (!prevSelectedStops.includes(label)) {
                    return [...prevSelectedStops, label];
                }
            } else {
                return prevSelectedStops.filter((value) => value !== label);
            }
            return prevSelectedStops.filter((value) => value !== label);
        });
    };

    // Callback function to update selected departure timings
    const handledepartureTimeSchdlChange = (label, isChecked) => {
        setSelecteddepartureTimeSchdl((prevSelecteddepartureTimeSchdl) => {
            if (isChecked) {
                if (!prevSelecteddepartureTimeSchdl.includes(label)) {
                    return [...prevSelecteddepartureTimeSchdl, label];
                }
            } else {
                return prevSelecteddepartureTimeSchdl.filter((value) => value !== label);
            }
            return prevSelecteddepartureTimeSchdl.filter((value) => value !== label);
        });
    };

    // Callback function to update selected departure timings
    const handleArrivalTimingsChange = (label, isChecked) => {
        setSelectedArrivalTimings((prevSelectedArrivalTimings) => {
            if (isChecked) {
                if (!prevSelectedArrivalTimings.includes(label)) {
                    return [...prevSelectedArrivalTimings, label];
                }
            } else {
                return prevSelectedArrivalTimings.filter((value) => value !== label);
            }
            return prevSelectedArrivalTimings.filter((value) => value !== label);
        });
    };


    // Callback function to update selected departure timings
    const handleAirlineChange = (label, isChecked) => {
        setSelectedAirlines((prevSelectedAirlines) => {
            if (isChecked) {
                if (!prevSelectedAirlines.includes(label)) {
                    return [...prevSelectedAirlines, label];
                }
            } else {
                return prevSelectedAirlines.filter((value) => value !== label);
            }
            return prevSelectedAirlines.filter((value) => value !== label);
        });
    };
    const generateCheckboxes = (timings, selectedTimings, handleTimingChange) => {
        return timings.map((timing, index) => (
          <CheckBoxComp
            key={index}
            label1={timing.label1}
            label2={timing.label2}
            onChange={(isChecked) => handleTimingChange(timing.id, isChecked)}
            checked={selectedTimings.includes(timing.id)}
          />
        ));
      };
    const arrivalTimeSchdle = [
        { id: '1', label1: 'Early Morning', label2: '04:00 - 08:00' },
        { id: '2', label1: 'Morning', label2: '08:00 - 12:00' },
        { id: '3', label1: 'Afternoon', label2: '12:00 - 16:00' },
        { id: '4', label1: 'Evening', label2: '16:00 - 20:00' },
        { id: '5', label1: 'Night', label2: '20:00 - 04:00' },
      ];
    const departureTimeSchdle = [
        { id: '1', label1: 'Early Morning', label2: '04:00 - 08:00' },
        { id: '2', label1: 'Morning', label2: '08:00 - 12:00' },
        { id: '3', label1: 'Afternoon', label2: '12:00 - 16:00' },
        { id: '4', label1: 'Evening', label2: '16:00 - 20:00' },
        { id: '5', label1: 'Night', label2: '20:00 - 04:00' },
      ];
    useEffect(() => {
        if (checkState) {
            const uniqueAirlineNames = new Set();
            const filteredData = apiData.filter(item => {
                const airlineName = item.schedualDetGet[0][0].carrier.marketing;
                if (!uniqueAirlineNames.has(airlineName)) {
                    uniqueAirlineNames.add(airlineName);
                    return true;
                }
                return false;
            });
            setFilteredApiData(filteredData);
            setCheckState(false);
        }
        const resultObject = {
            selectStops: selectedStops,
            selectAirlines: selectedAirlines,
            selectDepartureTime: selecteddepartureTimeSchdl,
            selectArrivalTime: selectedArrivalTimings
        };
        dispatch(setFilterData(resultObject));
    }, [selectedStops, selectedAirlines, selecteddepartureTimeSchdl, selectedArrivalTimings, dispatch]);

    const displayStops = () => {
        setStops(!stops);
        setIconRotated(!isIconRotated);
    };
    const displayTimings = () => {
        setTimings(!departureTimeSchdl);

        setTimingIconRotated(!isTimingIconRotated);
    };
    const displayArrivalTimings = () => {
        setArrivalTimings(!arrivalTimings);
        setArrivalIconRotated(!isArrivalIconRotated);
    };
    const AirLineDisplay = () => {
        setAirLine(!AirLine);
        setAirLineIcon(!isAirLineIcon);
    }
    return (
        <div className="pl-0 pr-0 ">
            <aside className="search_bar_background">
                <div className="flight_count d-flex justify-content-between">
                    <h2>Flights Results</h2>
                    <h2>{itemsToShow} of {totalResults}</h2>
                </div>
                <div className="search_bar_components d-flex justify-content-between">
                    <p><b>Stops</b></p>
                    <div
                        className={`rotate-icon ${isIconRotated ? 'rotated' : ''}`}
                        onClick={displayStops}
                    >
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                {stops && (
                    <div className="stops_ul">
                        <CheckBoxComp
                            label1="Non-Stop"
                            onChange={(isChecked) => handleStopsChange('1', isChecked)}
                            checked={selectedStops.includes('1')}
                        />
                        <CheckBoxComp
                            label1="1 Stop"
                            onChange={(isChecked) => handleStopsChange('2', isChecked)}
                            checked={selectedStops.includes('2')}
                        />
                        <CheckBoxComp
                            label1="2 Stop"
                            onChange={(isChecked) => handleStopsChange('3', isChecked)}
                            checked={selectedStops.includes('3')}
                        />
                    </div>
                )}

                <div className="search_bar_components d-flex justify-content-between">
                    <p><b>Departure Time</b></p>
                    <div
                        className={`rotate-icon ${isTimingIconRotated ? 'rotated' : ''}`}
                        onClick={displayTimings}
                    >
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                {departureTimeSchdl && (
                    <div className="stops_ul">
                      {generateCheckboxes(departureTimeSchdle, selecteddepartureTimeSchdl, handledepartureTimeSchdlChange)}
                    </div>
                  )}
                <div className="search_bar_components d-flex justify-content-between">
                    <p><b>Arrival Time</b></p>
                    <div
                        className={`rotate-icon ${isArrivalIconRotated ? 'rotated' : ''}`}
                        onClick={displayArrivalTimings}
                    >
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                {arrivalTimings && (
                    <div className="stops_ul">
                      {generateCheckboxes(arrivalTimeSchdle, selectedArrivalTimings, handleArrivalTimingsChange)}
                    </div>
                  )}
                <div className="search_bar_components d-flex justify-content-between">
                    <p><b>AirLines</b></p>
                    <div
                        className={`rotate-icon ${isAirLineIcon ? 'rotated' : ''}`}
                        onClick={AirLineDisplay}
                    >
                        <KeyboardArrowDownIcon />
                    </div>
                </div>
                {AirLine && (
                    <div className="">
                        <div className="stops_ul">
                            {filteredApiData.map((item, index) => {
                                const airlineName = item.schedualDetGet[0][0].carrier.marketing;
                                const matchedAirline = airlinesData.find(airline => airline.id === airlineName);
                                return (
                                    <CheckBoxComp
                                        key={index}
                                        label1={matchedAirline ? matchedAirline.name : airlineName}
                                        imageFlight={matchedAirline ? matchedAirline.logo : airlineName}
                                        onChange={isChecked => handleAirlineChange(airlineName, isChecked)}
                                        checked={selectedAirlines.includes(airlineName)}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
                <HelpLineCard />
            </aside>
        </div>
    )
}

export default Filters;