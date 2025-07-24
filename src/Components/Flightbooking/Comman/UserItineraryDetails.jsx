
import { React,useState,useEffect, Fragment } from 'react';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { cityNameFunct,formatCompleteDate,calculateDuration,
  elapsedTimeFunct,airportNameFunct,convertDateFormat,
  convertTimeFormat ,calculateLayoverTime ,AmadeuselapsedTime} from '../../../helpers/formatdata';
import airlinesName from '../../../Constant/airlineName';
import { requestReviewItinerary } from '../../../API';
import { useAmadeusData } from '../../../Context/AmadeusContext';
import { ListItemSecondaryAction } from '@mui/material';
const UserItineraryDetails = () => {
  const {bestPricingData} =useAmadeusData();
  let globalIndex = -1; 

    const [isMobile , setIsMobile] = useState(window.innerWidth < 912);
    const [isSmallMob ,setSmallMob] = useState(window.innerWidth < 500);
    const [seatAvailable, setSeatAvailable] = useState([]);

    const flightdetails = JSON.parse(localStorage.getItem("bookingTicket"));
    const handleTicketTypeArr = Array.isArray(flightdetails?.recommendation?.paxFareProduct) ? flightdetails?.recommendation?.paxFareProduct :[flightdetails?.recommendation?.paxFareProduct];
    const fetchTicketType = handleTicketTypeArr?.map((item)=>item.fare[0]?.pricingMessage?.description || '0');
    const seatsType = Array.isArray(flightdetails?.recommendations?.paxFareProduct) ?
     flightdetails?.recommendations?.paxFareProduct?.flatMap(item => item.paxReference.ptc) : 
     [flightdetails?.recommendations?.paxFareProduct?.paxReference?.ptc];

    
    const conSeatsType = seatsType.join(', ');

    const FIBP_Details = bestPricingData?.map((items ,index)=>items?.fareInfoGroup?.segmentLevelGroup);
    const FIBP_flightDetails = Array.isArray(FIBP_Details) ? FIBP_Details :[FIBP_Details];


     //get cabin info and available seats info  
     const flightProductInfo = FIBP_flightDetails?.map((items, index) => 
      Array.isArray(items) 
        ? items.map((itm, idx) => itm?.flightProductInformationType?.cabinProduct) 
        : [items?.flightProductInformationType?.cabinProduct]
    );

    console.log("flightProductInfo---1",flightProductInfo);

    useEffect(()=>{
        const handleResize = ()=>{
            setIsMobile(window.innerWidth < 912);
            setSmallMob(window.innerWidth<500);
        };
        window.addEventListener('resize', handleResize);
        return()=>{
            window.removeEventListener('resize', handleResize);
        }
    },[])
  return (
    <div className="iti_review_main">
                <div className="d-flex justify-content_start mt-2 mb-4">
                </div>
                {flightdetails.groupDescription.map((item, index) => (
                    <div key={index}>
                        <div className="iti_flight_details" >
                            {
                                !isSmallMob && (
                            <div className="d-flex justify-content-between w-100">
                                <div className="d-flex justify-content-start align-self-center w-75">
                                    <h5 className="iti_city_font">{cityNameFunct[item.departure]}</h5> 
                                    <span className="airport_spacing"><RedoOutlinedIcon /></span> 
                                    <h5 className="iti_city_font">{cityNameFunct[item.arrival]}</h5>
                                    <p className=" d-flex align-self-center iti_date_spacing"> {convertDateFormat(item.departDate)}</p>
                                </div>
                                <div className="w-25">
                                    <div className='iti_refund_detail'>
                                    <p>{fetchTicketType[index]|| '---'}</p>
                                        {/* <p>{flightdetails.fare.passengerInfoList[0].passengerInfo.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p> */}
                                    </div>
                                </div>
                            </div>
                                )
                            }
                            {
                                isSmallMob &&(
                            <div className='d-flex justify-content-between w-100'>
                                <div className=" align-self-center w-75">
                                    <div className='d-flex justify-content-start'>
                                        <h5 className="iti_city_font">{cityNameFunct[item.departure]}</h5> 
                                        <span className="airport_spacing"><RedoOutlinedIcon /></span> 
                                        <h5 className="iti_city_font">{cityNameFunct[item.arrival]}</h5>
                                    </div>
                                    <p className=" d-flex align-self-center iti_date_spacing iti_mob_spacing"> {convertDateFormat(item.departDate)}</p>
                                </div>
                                <div className=" align-self-center w-25">
                                    <div className='iti_refund_detail'>
                                    <p>{'NON REFUNDABLE'}</p>
                                        {/* <p>{flightdetails.fare.passengerInfoList[0].passengerInfo.nonRefundable ? "NON REFUNDABLE" : "REFUNDABLE"}</p> */}
                                    </div>
                                </div>
                            </div>

                                )
                            }
                            {flightdetails?.matchedFlights[index].flightDetails &&
                             (Array.isArray(flightdetails?.matchedFlights[index]?.flightDetails)
                                ? flightdetails?.matchedFlights[index]?.flightDetails
                                : [flightdetails?.matchedFlights[index]?.flightDetails]
                              ).map((itm, idx,arr) => {
                                const airlineName =
                                  itm?.flightInformation?.companyId
                                    ?.marketingCarrier;
                                const matchedAirline = airlinesName.find(
                                  (airline) => airline.id === airlineName
                                );

                                globalIndex++;
                                // Calculate layover time
                                let layoverTime = null;
                                if (idx < arr.length - 1) {
                                  const arrivalTime =
                                    arr[idx]?.flightInformation?.productDateTime
                                      ?.timeOfArrival;
                                  const departureTime =
                                    arr[idx + 1]?.flightInformation
                                      ?.productDateTime?.timeOfDeparture;
                                  if (arrivalTime && departureTime) {
                                    layoverTime = calculateLayoverTime(
                                      arrivalTime,
                                      departureTime
                                    );
                                  }
                                }

                                return (
                                  <Fragment key={idx}>
                                    <div className="row">
                                      <div
                                        className={`col-md-9 flight_complete_details ${
                                          isMobile ? "col-md-12" : "col-md-9"
                                        }`}
                                      >
                                        <div className="d-flex justify-content-start">
                                          <div className="align-self-center text-center">
                                            <img
                                              src={
                                                matchedAirline
                                                  ? matchedAirline.logo
                                                  : airlineName
                                              }
                                              alt=""
                                              width="32px"
                                              height="32px"
                                            />
                                            <p className="iti_flight_no">
                                              {matchedAirline
                                                ? matchedAirline.name
                                                : airlineName}
                                            </p>
                                            <p className="iti_flight_no">{`${airlineName}-${itm?.flightInformation?.companyId?.marketingCarrier}`}</p>
                                            <p className="iti_flight_no">
                                              {flightdetails.classtype}
                                            </p>
                                          </div>
                                          <div className="separator mx-4">
                                            <DonutLargeIcon className="donut_size" />
                                            <div
                                              className={`${
                                                isSmallMob
                                                  ? "iti_mob_line"
                                                  : "vertical-line"
                                              }`}
                                            ></div>
                                            <DonutLargeIcon className="donut_size" />
                                          </div>
                                          <div className='align-self-center'>
                                            <div>
                                              <span className="iti_flight_timing">
                                                {convertTimeFormat(
                                                  itm?.flightInformation
                                                    ?.productDateTime
                                                    ?.timeOfDeparture
                                                )}
                                              </span>
                                              <span className="iti_city_code">
                                                {
                                                  itm?.flightInformation
                                                    ?.location?.[0]?.locationId
                                                }
                                              </span>
                                              {isSmallMob ? (
                                                <div className="iti_airport_name">
                                                  {
                                                    airportNameFunct[
                                                      itm?.flightInformation
                                                        ?.location?.[0]
                                                        ?.locationId
                                                    ]
                                                  }
                                                </div>
                                              ) : (
                                                <span className="iti_airport_name">
                                                  {
                                                    airportNameFunct[
                                                      itm?.flightInformation
                                                        ?.location?.[0]
                                                        ?.locationId
                                                    ]
                                                  }
                                                </span>
                                              )}
                                            </div>
                                            <div className="iti_content_spacing">
                                              <QueryBuilderOutlinedIcon />{" "}
                                              {AmadeuselapsedTime(itm?.flightInformation?.attributeDetails?.attributeDescription)}
                                            </div>
                                            <div>
                                              <span className="iti_flight_timing">
                                                {convertTimeFormat(
                                                  itm?.flightInformation
                                                    ?.productDateTime
                                                    ?.timeOfArrival
                                                )}
                                              </span>
                                              <span className="iti_city_code">
                                                {
                                                  itm?.flightInformation
                                                    ?.location?.[1]?.locationId
                                                }
                                              </span>
                                              {isSmallMob ? (
                                                <div className="iti_airport_name">
                                                  {
                                                    airportNameFunct[
                                                      itm?.flightInformation
                                                        ?.location?.[1]
                                                        ?.locationId
                                                    ]
                                                  }
                                                </div>
                                              ) : (
                                                <span className="iti_airport_name">
                                                  {
                                                    airportNameFunct[
                                                      itm?.flightInformation
                                                        ?.location?.[1]
                                                        ?.locationId
                                                    ]
                                                  }
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {isMobile ? (
                                        <div className="iti_content_spacing">
                                                    <div className='iti_mob_border'>
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <p className="fd_airport_name fd_space_baggages">No of Seats</p>
                                                                {FIBP_flightDetails.map(
                                                                    (it, ix) => (
                                                                      <p className="fd_airport_name fd_space_baggages">
                                                                        {Array.isArray(it)
                                                                          ? it?.[0]?.ptcSegment
                                                                              ?.quantityDetails
                                                                              ?.unitQualifier
                                                                          : it?.ptcSegment
                                                                              ?.quantityDetails
                                                                              ?.unitQualifier}
                                                                      </p>
                                                                    )
                                                                  )}
                                                            </div>
                                                            <div>
                                                                <p className="fd_airport_name fd_space_baggages ">Cabin</p>
                                                                {flightProductInfo?.map(
                                                                  (it, ix) => (
                                                                    <p className="fd_airport_name fd_space_baggages">
                                                                      {it[globalIndex]?.cabin}
                                                                    </p>
                                                                  )
                                                                )}
                                                            </div>
                                                            <div>
                                                                <div>
                                                                <p className="fd_airport_name fd_space_baggages">Baggage</p>
                                                                </div>
                                                                {/* <p className="fd_airport_name fd_space_baggages mob_iti_text">
                                                                    {flightdetails && flightdetails.baggageAllowance && flightdetails.baggageAllowance[index]
                                                                        ? `${flightdetails.baggageAllowance[index].pieceCount || ''} ${flightdetails.baggageAllowance[index].weight || ''} ${flightdetails.baggageAllowance[index].unit || ''}`
                                                                        : '...'}
                                                                </p> */}
                                                                <p className="fd_airport_name fd_space_baggages mob_iti_text">
                                                                {FIBP_flightDetails?.[0]?.[0]?.baggageAllowance?.baggageDetails?.freeAllowance ?? 
                                                                  FIBP_flightDetails?.[0]?.baggageAllowance?.baggageDetails?.freeAllowance ?? 
                                                                  "No Baggage Info"}
                                                                </p>
                                                            </div>
                                                            <div className="mx-1">
                                                              <p className="fd_airport_name fd_space_baggages">
                                                                flightNo
                                                              </p>
                                                              {FIBP_flightDetails.map(
                                                                (it, ix) => (
                                                                  <p className="fd_airport_name fd_space_baggages mob_iti_text">
                                                                    {
                                                                      it[globalIndex]
                                                                        ?.segmentInformation
                                                                        ?.flightIdentification
                                                                        ?.flightNumber || it?.segmentInformation?.flightIdentification?.flightNumber
                                                                    }
                                                                  </p>
                                                                )
                                                              )}
                                                            </div>
                                                        </div>
                                                        <div className='mt-2'>
                                                                <p className="fd_airport_name fd_space_baggages">
                                                                    <span className={seatAvailable && seatAvailable[index] && seatAvailable[index] < 5 ? 'text-danger' : 'text-success'}>
                                                                        Remaining Seats
                                                                    </span>
                                                                </p>
                                                                <p
                                                                  className={`fd_airport_name fd_space_baggages ${
                                                                    flightProductInfo[idx]?.[idx]
                                                                      ?.avlStatus &&
                                                                    flightProductInfo[idx]?.[idx]
                                                                      ?.avlStatus < 5
                                                                      ? "text-danger"
                                                                      : "text-success"
                                                                  }`}
                                                                >
                                                                  {flightProductInfo[0]?.[0]?.avlStatus || "0"}
                                                                </p>
                                                          </div>
                                                    </div>
                                                </div>
                                      ) : (
                                        <div className="col-md-3 iti_content_spacing align-self-center">
                                          <div className="d-flex justify-content-between">
                                            <div className="mx-1">
                                              <p className="fd_airport_name fd_space_baggages">
                                                Pax
                                              </p>
                                              <hr className="my-1" />
                                              {FIBP_flightDetails.map(
                                                (it, ix) => (
                                                  <p className="fd_airport_name fd_space_baggages">
                                                    {Array.isArray(it)
                                                      ? it?.[0]?.ptcSegment
                                                          ?.quantityDetails
                                                          ?.unitQualifier
                                                      : it?.ptcSegment
                                                          ?.quantityDetails
                                                          ?.unitQualifier}
                                                  </p>
                                                )
                                              )}
                                            </div>
                                            {/* <div className='mx-1'>
                                      <p className="fd_airport_name fd_space_baggages">
                                        Cabin
                                      </p>
                                      <hr className='my-1'/>
                                      {FIBP_flightDetails.map((it ,ix)=>(
                                      <p className="fd_airport_name fd_space_baggages">
                                         {Array.isArray(it) ? it?.[0]?.segmentInformation?.flightIdentification?.bookingClass :  it?.segmentInformation?.flightIdentification?.bookingClass}
                                      </p>
                                     
                                    ))}
                                    </div> */}
                                            <div className="mx-1">
                                              <p className="fd_airport_name fd_space_baggages">
                                                Cabin
                                              </p>
                                              <hr className="my-1" />
                                              {flightProductInfo?.map(
                                                (it, ix) => (
                                                  <p className="fd_airport_name fd_space_baggages">
                                                    {it[globalIndex]?.cabin}
                                                  </p>
                                                )
                                              )}
                                            </div>
                                            <div className="mx-1">
                                              <p className="fd_airport_name fd_space_baggages">
                                                flightNo
                                              </p>
                                              <hr className="my-1" />
                                              {FIBP_flightDetails?.map(
                                                (it, ix) => (
                                                  <p className="fd_airport_name fd_space_baggages">
                                                    {
                                                      it[globalIndex]?.segmentInformation?.flightIdentification?.flightNumber || it?.segmentInformation?.flightIdentification?.flightNumber
                                                    }
                                                  </p>
                                                )
                                              )}
                                            </div>
                                            <div className="mx-1">
                                              <p className="fd_airport_name fd_space_baggages">
                                                RBD
                                              </p>
                                              <hr className="my-1" />
                                              {flightProductInfo.map(
                                                (it, ix) => (
                                                  <p className="fd_airport_name fd_space_baggages">
                                                    {it[globalIndex]?.rbd}
                                                  </p>
                                                )
                                              )}
                                            </div>
                                            <div className="mx-1">
                                              <p className="fd_airport_name fd_space_baggages">
                                                Baggage
                                              </p>
                                              <hr className="my-1" />
                                              {/* <p className="fd_airport_name fd_space_baggages">
                                                {FIBP_flightDetails[0]?.[0]
                                                  ?.baggageAllowance
                                                  ?.baggageDetails
                                                  ?.freeAllowance
                                                  ? FIBP_flightDetails[0]?.[0]
                                                      ?.baggageAllowance
                                                      ?.baggageDetails
                                                      ?.freeAllowance
                                                  : "Nill"}
                                              </p> */}
                                              <p className="fd_airport_name fd_space_baggages">
                                              {FIBP_flightDetails?.map(
                                                (it, ix) => (
                                                  <p className="fd_airport_name fd_space_baggages">
                                                    {
                                                      it[globalIndex]?.baggageAllowance?.baggageDetails?.freeAllowance || it?.baggageAllowance?.baggageDetails?.freeAllowance
                                                    }
                                                  </p>
                                                )
                                              )}
                                                {/* {FIBP_flightDetails[0]?.baggageAllowance?.baggageDetails?.freeAllowance || FIBP_flightDetails[0]?.[0]?.baggageAllowance?.baggageDetails?.freeAllowance || "Nill"} */}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="mt-2">
                                            <p className="fd_airport_name fd_space_baggages">
                                              <span
                                                className={
                                                  flightProductInfo[idx]
                                                    ?.avlStatus &&
                                                  flightProductInfo[idx]
                                                    ?.avlStatus < 5
                                                    ? "text-danger"
                                                    : "text-success"
                                                }
                                              >
                                                Remaining Seats
                                              </span>
                                              <hr className="my-1" />
                                            </p>
                                            <p
                                              className={`fd_airport_name fd_space_baggages ${
                                                flightProductInfo[idx]?.[idx]
                                                  ?.avlStatus &&
                                                flightProductInfo[idx]?.[idx]
                                                  ?.avlStatus < 5
                                                  ? "text-danger"
                                                  : "text-success"
                                              }`}
                                            >
                                            <p className="fd_airport_name fd_space_baggages">
                                               {flightProductInfo[0]?.[0]?.avlStatus}
                                            </p>
                                            </p>
                                          </div>
                                        </div>
                                      )}
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
                    </div>
                )
                )}
            </div>
  )
}

export default UserItineraryDetails;