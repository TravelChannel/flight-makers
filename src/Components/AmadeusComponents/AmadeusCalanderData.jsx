import { React, useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { MasterPriceCalanderRes } from "../../API/AmadeousAPI";
import { useItemsToShow } from "../Searchflight/Comman/Context";
import { EuropianDateFormat } from "../../helpers/formatdata";

const AmadeusCalanderData = () => {
  const { searchDataArr } = useItemsToShow();
  const [showPrices, setShowPrices] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleTogglePrices = () => {
    setShowPrices((prev) => !prev);
  };
  const handleCalanderAPICall = async () => {
    try {
      setIsLoading(true);
      const resp = await MasterPriceCalanderRes(searchDataArr);
      console.log("calanderData_view", resp);
      setApiData(resp);
    } catch (error) {
      console.log("Error at AmadeusCalander Data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const flightFare = apiData.map(
    (items) =>
      parseFloat(
        items.recommendation?.recPriceInfo?.monetaryDetail[0]?.amount
      ) || 0
  );
  const flightTax = apiData.map(
    (items) =>
      parseFloat(
        items.recommendation?.recPriceInfo?.monetaryDetail[1]?.amount
      ) || 0
  );

  const flightFareAndTax = flightFare.map((fare, index) => ({
    fare,
    tax: flightTax[index],
  }));
  const totalAmount = flightFareAndTax?.map(({ fare, tax }) => fare + tax);

  const getDepartDate = apiData?.map((items) =>
    items.groupDescription.map((itm) => itm.departDate)
  );
  console.log("getDepartDate", getDepartDate);
  const mergeDatePrice = totalAmount?.map((items, index) => {
    return {
      price: items.toLocaleString(),
      date: getDepartDate[index],
    };
  });

  // line to sort the dates in ascending order
  mergeDatePrice?.sort((a, b) => Number(a.date) - Number(b.date));

  console.log("mergeDatePrice", mergeDatePrice);

  useEffect(() => {
    handleCalanderAPICall();
  }, []);
  return (
    <div className="amadeus_clander_main bg-white  p-2">
      <div className="amad_clnd_title" onClick={handleTogglePrices}>
        Masterprice Calender Prices <KeyboardArrowDownIcon />
      </div>
      {isLoading ? (
        <p className="text-center">loading-------------------</p>
      ) : (
        showPrices && (
          <div className="d-flex justify-content-between amad_clnd_prices pt-2">
            {mergeDatePrice?.map((item, index) => (
              <div className="amad_clnd_box">
                {item?.date?.map((itm, idx) => (
                  <p>{EuropianDateFormat(itm)}</p>
                ))}
                <hr className="m-1" />
                <p>{`${item.price} $`}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default AmadeusCalanderData;
