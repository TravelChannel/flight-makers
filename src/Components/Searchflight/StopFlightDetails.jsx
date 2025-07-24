import React, { Fragment, useState, useEffect } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import {
  airportNameFunct,
  cityNameFunct,
  convertDateFormat,
  convertTimeFormat,
  calculateLayoverTime,
  AmadeuselapsedTime,
} from "../../helpers/formatdata";
import { useItemsToShow } from "./Comman/Context";
import airlinesData from "../../Constant/airlineName";

const StopFlightDetails = (props) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 860);
  const { searchDataArr } = useItemsToShow();
  const { classtype } = searchDataArr;
  const { activeFlightDet, refFlag } = props;

  const fetchDiscription = activeFlightDet?.groupDescription;

  // const fetchTicketType =
  //   activeFlightDet?.recommendation?.paxFareProduct?.fare[0]?.pricingMessage
  //     ?.description || "";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 860);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const airlineName = activeFlightDet?.groupDescription?.map(
    (items) => items.marketingCarrier
  );
  const matchedAirline = airlineName?.map((id) =>
    airlinesData.find((airline) => airline.id === id)
  );
  return (
    <Fragment>
      {fetchDiscription?.map((item, index) => (
        <div className="fd_more_detail pb-4" key={index}>
          <div className="d-flex justify-content-between text-center bg-lighterBlue p-1">
            <div className="d-flex justify-content-start">
              <p className="fd_more_detail_size">{`${
                cityNameFunct[item?.departure]
              } → ${cityNameFunct[item?.arrival]}`}</p>
              <p className="fd_more_detail_date">
                {convertDateFormat(item?.departDate)}
              </p>
            </div>
            {/* <div className="d-flex justify-content-start">
            <p className="fd_more_detail_date"></p>
            <p className="fd_more_refund">{fetchTicketType}</p>
          </div> */}
          </div>

          {activeFlightDet?.matchedFlights[index]?.flightDetails &&
            (Array.isArray(
              activeFlightDet?.matchedFlights[index]?.flightDetails
            )
              ? activeFlightDet?.matchedFlights[index]?.flightDetails
              : [activeFlightDet?.matchedFlights[index]?.flightDetails]
            ).map((itm, idx, arr) => {
              // Calculate layover time
              let layoverTime = null;
              if (idx < arr.length - 1) {
                const arrivalTime =
                  arr[idx]?.flightInformation?.productDateTime?.timeOfArrival;
                const departureTime =
                  arr[idx + 1]?.flightInformation?.productDateTime
                    ?.timeOfDeparture;
                if (arrivalTime && departureTime) {
                  layoverTime = calculateLayoverTime(
                    arrivalTime,
                    departureTime
                  );
                }
              }
              return (
                <Fragment>
                  <div
                    className="fd_stops_detail d-flex justify-content-between w-100"
                    key={idx}
                  >
                    <div className="fd_airport_logo align-self-center text-center stop_width_1">
                      <img
                        className="airline-logo"
                        src={
                          matchedAirline
                            ? matchedAirline[index].logo
                            : itm?.flightInformation.companyId.marketingCarrier
                        }
                        alt="PK Logo"
                      />
                      <p className="fd_airport_name">
                        {itm?.flightInformation.companyId.marketingCarrier}
                      </p>
                      <div className="fd_flightNo">
                        <p className="fd_airport_name">
                          {itm?.flightInformation?.flightOrtrainNumber}
                        </p>
                      </div>
                    </div>

                    <div className="text-center align-self-center stop_width_2">
                      <span className="fd_airport_size">
                        {itm?.flightInformation?.location?.[0].locationId}
                      </span>
                      &nbsp;
                      <span className="fd_airport_size_time">
                        {convertTimeFormat(
                          itm?.flightInformation?.productDateTime
                            ?.timeOfDeparture
                        )}
                      </span>
                      <p className="fd_flight_date">
                        {convertDateFormat(
                          itm?.flightInformation?.productDateTime
                            ?.dateOfDeparture
                        )}
                      </p>
                      <p className="fd_airport_name">
                        {
                          airportNameFunct[
                            itm?.flightInformation?.location?.[0].locationId
                          ]
                        }
                      </p>
                    </div>

                    <div className="align-self-center ">
                      <svg
                        className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium d-flex align-items-center fd_clock css-i4bv87-MuiSvgIcon-root"
                        focusable="false"
                        aria-hidden="true"
                        viewBox="0 0 24 24"
                        data-testid="AccessTimeIcon"
                      >
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                      </svg>
                      <p className="fd_flight_date">
                        {AmadeuselapsedTime(
                          itm?.flightInformation?.attributeDetails
                            ?.attributeDescription
                        ) || "00:00"}
                      </p>
                    </div>

                    <div className="text-center align-self-center stop_width_4">
                      <span className="fd_airport_size">
                        {itm?.flightInformation?.location?.[1].locationId}
                      </span>
                      &nbsp;
                      <span className="fd_airport_size_time">
                        {convertTimeFormat(
                          itm?.flightInformation?.productDateTime?.timeOfArrival
                        )}
                      </span>
                      <p className="fd_flight_date">
                        {convertDateFormat(
                          itm?.flightInformation?.productDateTime?.dateOfArrival
                        )}
                      </p>
                      <p className="fd_airport_name">
                        {
                          airportNameFunct[
                            itm?.flightInformation?.location?.[1].locationId
                          ]
                        }
                      </p>
                    </div>
                  </div>
                  {idx < arr.length - 1 && (
                    <div className="fd_line_structure">
                      <div className="fd_line"></div>
                      <div className="fd_icon_wrapper">
                        <p className="fd_middle_border">
                          <DirectionsRunIcon />{" "}
                          {`Short layover: ${layoverTime}`}
                        </p>
                      </div>
                      <div className="fd_line"></div>
                    </div>
                  )}
                </Fragment>
              );
            })}
        </div>
      ))}
    </Fragment>
  );
};

export default StopFlightDetails;
