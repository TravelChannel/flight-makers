import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  Fragment,
  useMemo,
} from "react";
import StopFlightDetails from "./StopFlightDetails";
import { calculateTotalTime } from "../../helpers/formatdata";
import OneWay from "./Comman/OneWay";
import Round from "./Comman/Round";
import Multi from "./Comman/Multi";
import { useItemsToShow } from "./Comman/Context";
import airlinesData from "../../Constant/airlineName";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const AirlinesResults = (props) => {
  const { itemsToShow, setItemsToShow, totalResults, apiData, searchDataArr } =
    useItemsToShow();
  const memoizedDataArray = useMemo(() => apiData, [apiData]);
  const { onItemClick } = props;
  const [selectedFlightIndex, setSelectedFlightIndex] = useState(0);
  const [isUpward, setIsUpward] = useState(true);
  const [dataArray, setDataArray] = useState(apiData);
  const { tripType } = searchDataArr;
  const itemsPerPage = 20;
  const lastItemRef = useRef(null);
  const [fdCard, setFdCard] = useState(false);
  const [isSingleMobile, setIsSingleMobile] = useState(window.innerWidth < 430);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1080);
  const [multiMobile, setMultiMobile] = useState(window.innerWidth < 550);
  const loadMoreItems = useCallback(() => {
    setItemsToShow((prevItems) => {
      const newItemsToShow = prevItems + itemsPerPage;
      return Math.min(newItemsToShow, totalResults);
    });
  }, [totalResults, setItemsToShow]);

  const ShowFltDetails = (index) => {
    if (selectedFlightIndex === index) {
      setFdCard((prev) => !prev);
    } else {
      setSelectedFlightIndex(index);
      setFdCard(true);
    }
  };

  const toggleArrowDirection = () => {
    setIsUpward((prevState) => !prevState);
    setDataArray((prevArray) =>
      isUpward ? [...prevArray].reverse() : apiData
    );
  };
  useEffect(() => {
    if (lastItemRef.current) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreItems();
        }
      });
      observer.observe(lastItemRef.current);
      const observedItem = lastItemRef.current;
      return () => {
        observer.unobserve(observedItem);
      };
    }
  }, [loadMoreItems]);

  useEffect(() => {
    setSelectedFlightIndex(0);
  }, []);

  useEffect(() => {
    setDataArray(apiData);
  }, [apiData]);

  useEffect(() => {
    const handleResize = () => {
      setIsSingleMobile(window.innerWidth < 430);
      setIsTablet(window.innerWidth < 1080);
      setMultiMobile(window.innerWidth < 530);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const totalAmount = dataArray?.map((items) => {
    const fare =
      Number(
        items?.recommendation?.recPriceInfo?.monetaryDetail?.[0]?.amount
      ) || 0;
    // const tax = Number(items?.recommendation?.recPriceInfo?.monetaryDetail?.[1]?.amount) || 0;
    return fare;
  });

  // Calculating total Flight Time
  const totalFlightTime = useMemo(() => {
    return (
      dataArray?.map(
        (items) =>
          items.matchedFlights?.map((it) =>
            (Array.isArray(it?.flightDetails)
              ? it.flightDetails
              : [it.flightDetails]
            ).map(
              (i) =>
                i?.flightInformation?.attributeDetails?.attributeDescription
            )
          ) || []
      ) || []
    );
  }, [dataArray]);

  if (tripType === "OneWay") {
    return (
      <div>
        <div className="AirlinesData_hero">
          <div className="d-flex justify-content-between w-100">
            {isSingleMobile ? (
              <h6 className="text-right ad_price_detail ad_header_font">
                <p> Flight Details</p>
              </h6>
            ) : (
              <div className="d-flex justify-content-between w-50 ad_header_font">
                <h6 className="ad_header_font">Airline</h6>
                <h6 className="ad_header_font">Departure</h6>
                <h6 className="ad_header_font">Duration</h6>
                <h6 className="ad_header_font">Arrival</h6>
              </div>
            )}
            <div className="w-50 rotate-icon text-end">
              <h6
                onClick={toggleArrowDirection}
                className="text-right ad_price_detail ad_header_font"
              >
                <b>Price</b>
                {isUpward ? (
                  <ArrowUpwardIcon className="arrowFont" />
                ) : (
                  <ArrowDownwardIcon className="arrowFont" />
                )}
              </h6>
            </div>
          </div>
        </div>
        {dataArray?.map((item, index) => {
          const airlineName = item?.groupDescription[0]?.marketingCarrier;
          const matchedAirline = airlinesData.find(
            (airline) => airline.id === airlineName
          );
          return (
            <div key={index} onClick={() => onItemClick(index)}>
              <div
                onClick={() => setSelectedFlightIndex(index)}
                className={`mb-2 bg-white ${
                  selectedFlightIndex === index
                    ? "adSelectedFlight_current"
                    : ""
                }`}
              >
                <OneWay
                  imageFlight={
                    matchedAirline ? matchedAirline.logo : airlineName
                  }
                  flightName={item.groupDescription[0]?.marketingCarrier}
                  departureTime={item.groupDescription[0]?.departTime}
                  departureAirport={item.groupDescription[0]?.departure}
                  elapsedTime={calculateTotalTime(totalFlightTime[index])}
                  stops={item?.groupDescription[0]?.stopCounts}
                  arrivalTime={item.groupDescription[0]?.arrivalTime}
                  arrivalAirport={item.groupDescription[0]?.arrival}
                  priceTicket={totalAmount[index]}
                  bookButton={false}
                />
                <div className="active_bar_botm">
                  <div className="d-flex justify-content-between">
                    <p
                      onClick={() => ShowFltDetails(index)}
                      className="fd_heading border-0"
                    >
                      {selectedFlightIndex === index
                        ? fdCard
                          ? "Hide Details"
                          : "Flight Details"
                        : "Flight Details"}
                    </p>
                    <div className="refundableTicket2 ">
                      {
                        dataArray[index]?.recommendation?.paxFareProduct[0]
                          ?.fare[0]?.pricingMessage?.description || ''
                      }
                    </div>
                  </div>
                  {fdCard && selectedFlightIndex === index && (
                    <StopFlightDetails
                      activeFlightDet={dataArray[index]}
                      refFlag={false}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={lastItemRef}></div>
      </div>
    );
  } else if (tripType === "Round") {
    return (
      <div>
        <div className="AirlinesData_hero">
          <div className="d-flex justify-content-between w-100">
            {isTablet ? (
              <Fragment>
                <div>
                  <h6 className="text-right ad_price_detail ad_header_font">
                    Flight Details
                  </h6>
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="d-flex justify-content-between w-25 ad_header_font_round">
                  <h6 className="ad_header_font">Airline</h6>
                  <h6 className="ad_header_font">Departure</h6>
                  <h6 className="ad_header_font">Duration</h6>
                  <h6 className="ad_header_font">Arrival</h6>
                </div>
                <div className="d-flex justify-content-between w-25 ad_move_right ad_header_font_round">
                  <h6 className="ad_header_font">Airline</h6>
                  <h6 className="ad_header_font">Departure</h6>
                  <h6 className="ad_header_font">Duration</h6>
                  <h6 className="ad_header_font">Arrival</h6>
                </div>
              </Fragment>
            )}
            <div className="rotate-icon ">
              <h6
                onClick={toggleArrowDirection}
                className="text-right ad_price_detail ad_header_font"
              >
                <b>Price</b>
                {isUpward ? (
                  <ArrowUpwardIcon className="arrowFont" />
                ) : (
                  <ArrowDownwardIcon className="arrowFont" />
                )}
              </h6>
            </div>
          </div>
        </div>
        {dataArray.slice(0, itemsToShow).map((item, index) => (
          <div key={index} onClick={() => onItemClick(index)}>
            <div
              onClick={() => setSelectedFlightIndex(index)}
              className={`mb-2 bg-white ${
                selectedFlightIndex === index ? "adSelectedFlight_current" : ""
              }`}
            >
              <Round
                key={index}
                activeFlightDet={item}
                bookButton={false}
                totalAmount={totalAmount[index]}
                totalFlightTime={calculateTotalTime(totalFlightTime[index])}
              />
              <div className="active_bar_botm">
                <div className="d-flex justify-content-between">
                  <p
                    onClick={() => ShowFltDetails(index)}
                    className="fd_heading border-0"
                  >
                    {selectedFlightIndex === index
                      ? fdCard
                        ? "Hide Details"
                        : "Flight Details"
                      : "Flight Details"}
                  </p>
                  <div className="refundableTicket2 ">
                    {(() => {
                      const paxFareProduct =
                        dataArray[index]?.recommendation?.paxFareProduct;

                      const fareArray = Array.isArray(paxFareProduct)
                        ? paxFareProduct[0]?.fare
                        : paxFareProduct?.fare;

                      return (
                        fareArray?.[0]?.pricingMessage?.description || null
                      );
                    })()}{" "}
                  </div>
                </div>
                {fdCard && selectedFlightIndex === index && (
                  <StopFlightDetails
                    activeFlightDet={dataArray[index]}
                    refFlag={false}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={lastItemRef}></div>
      </div>
    );
  } else if (tripType === "MultiCity") {
    return (
      <Fragment>
        <div className="AirlinesData_hero">
          {multiMobile ? (
            <div className="d-flex justify-content-start">
              <div style={{ width: "20%" }}>
                <h6 className="ad_header_font">Details</h6>
              </div>
              <div
                className="d-flex justify-content-between  ad_header_font"
                style={{ width: "40%" }}
              >
                <h6 className="ad_header_font">Departure</h6>
                <h6 className="ad_header_font">Arrival</h6>
              </div>
            </div>
          ) : (
            <div className="d-flex justify-content-between w-100">
              <div style={{ width: "20%" }}>
                <h6 className="ad_header_font">Details</h6>
              </div>
              <div
                className="d-flex justify-content-between  ad_header_font"
                style={{ width: "40%" }}
              >
                <h6 className="ad_header_font">Airline</h6>
                <h6 className="ad_header_font">Departure</h6>
                <h6 className="ad_header_font">Duration</h6>
                <h6 className="ad_header_font">Arrival</h6>
              </div>
              <div className=" rotate-icon" style={{ width: "40%" }}>
                <h6
                  onClick={toggleArrowDirection}
                  className="text-end ad_price_detail ad_header_font"
                >
                  <b>Price</b>
                  {isUpward ? (
                    <ArrowUpwardIcon className="arrowFont" />
                  ) : (
                    <ArrowDownwardIcon className="arrowFont" />
                  )}
                </h6>
              </div>
            </div>
          )}
        </div>
        {dataArray.slice(0, itemsToShow).map((item, index) => (
          <div key={index} onClick={() => onItemClick(index)}>
            <div
              onClick={() => setSelectedFlightIndex(index)}
              className={`main_multi_flight ${
                selectedFlightIndex === index ? "adSelectedFlight_current" : ""
              }`}
            >
              {item.groupDescription.map((val, indx) => {
                const airlineName = val.marketingCarrier;
                const matchedAirline = airlinesData.find(
                  (airline) => airline.id === airlineName
                );

                const totalTime = calculateTotalTime(totalFlightTime[index]);
                console.log("elapsedTime", totalTime);
                return (
                  <div key={indx}>
                    <div className="d-flex justify-content-start w-100 ad_multi_border">
                      <Multi
                        index={indx}
                        imageFlight={
                          matchedAirline ? matchedAirline.logo : airlineName
                        }
                        flightName={val?.marketingCarrier}
                        departureTime={val?.departTime}
                        departureAirport={val?.departure}
                        elapsedTime={totalTime[indx]}
                        stops={`${val?.stopCounts} stops`}
                        arrivalTime={val?.arrivalTime}
                        arrivalAirport={val?.arrival}
                      />
                      {!isSingleMobile && (
                        <div className=" text-right align-self-center ad_width_bwteen_left">
                          {indx === item.groupDescription.length - 1 && (
                            <span className="ad_total_price_size">
                              {item?.recommendation?.recPriceInfo?.monetaryDetail[0]?.amount.toLocaleString()}{" "}
                              $
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {indx !== item.groupDescription.length - 1 && (
                      <hr className="hr_style" />
                    )}
                  </div>
                );
              })}
              {isSingleMobile && (
                <div className=" text-right">
                  <span className="ad_total_price_size multi_mob_price">
                    {item?.recommendation?.recPriceInfo?.monetaryDetail[0]?.amount.toLocaleString()}{" "}
                    $
                  </span>
                </div>
              )}
              <div className="active_bar_botm">
                <div className="d-flex justify-content-between">
                  <p
                    onClick={() => ShowFltDetails(index)}
                    className="fd_heading border-0"
                  >
                    {selectedFlightIndex === index
                      ? fdCard
                        ? "Hide Details"
                        : "Flight Details"
                      : "Flight Details"}
                  </p>
                  <div className="refundableTicket2 ">
                    {(() => {
                      const paxFareProduct =
                        dataArray[index]?.recommendation?.paxFareProduct;

                      const fareArray = Array.isArray(paxFareProduct)
                        ? paxFareProduct[0]?.fare
                        : paxFareProduct?.fare;

                      return (
                        fareArray?.[0]?.pricingMessage?.description || null
                      );
                    })()}{" "}
                  </div>
                </div>
                {fdCard && selectedFlightIndex === index && (
                  <StopFlightDetails
                    activeFlightDet={dataArray[index]}
                    refFlag={false}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={lastItemRef}></div>
      </Fragment>
    );
  }
};

export default React.memo(AirlinesResults);
