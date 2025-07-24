import React, { useState,useEffect, Fragment,useCallback } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatDate } from '../../helpers/formatdata';
import { useItemsToShow } from './Comman/Context';
import { useNavigate } from 'react-router-dom';
import { MasterPriceCalanderRes } from '../../API/AmadeousAPI';
import { EuropianDateFormat } from '../../helpers/formatdata';
import { formatCustomDate } from '../../helpers/formatdata';
import { PropagateLoader } from "react-spinners";
const DateComparision = (props) => {
  const { searchDataArr } = useItemsToShow();
  const [isLoading , setIsLoading] = useState(false);
  const [apiData ,setApiData] = useState([]);
  const { tripType } = searchDataArr;
  const { alternateRates } = props;
  const navigate = useNavigate();
  let activeIdx = '';
  let slidesToShow = '';

  if (tripType === 'OneWay') {
    activeIdx = 3;
    slidesToShow = 7;
  }
  else {
    activeIdx = 24;
    slidesToShow = 3;
  }
  const [activeIndex, setActiveIndex] = useState(activeIdx);

  const handleDateClick = (index) => {
    setActiveIndex(index);
    const getingSingleRates = apiData[index].groupDescription.map(item => formatCustomDate(item.departDate));

    const updatedSearchDataArr = {
      ...searchDataArr,
      date: getingSingleRates, 
    };
    navigate('/searchflightresult' , {state:{searchDataArr : updatedSearchDataArr}});
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToShow,
    initialSlide: activeIndex,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 512,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  // -----------------------------
    const handleCalanderAPICall = useCallback(async() =>{
      try{
        setIsLoading(true);
        const resp = await MasterPriceCalanderRes (searchDataArr);
        // console.log("calanderData_view",resp); 
        setApiData(resp);
      }catch(error){
        console.log("Error at AmadeusCalander Data",error);
      } finally{
        setIsLoading(false);
      }
    })

    const flightFare = apiData?.map((items) => parseFloat(items?.recommendation?.recPriceInfo?.monetaryDetail[0]?.amount) || 0);
    const flightTax = apiData?.map((items) => parseFloat(items?.recommendation?.recPriceInfo?.monetaryDetail[1]?.amount) || 0);

    const flightFareAndTax = flightFare?.map((fare, index) => ({
      fare,
      tax: flightTax[index],
    }));
   const totalAmount = flightFareAndTax?.map(({ fare, tax }) => fare);
  //  const totalAmount = flightFareAndTax?.map(({ fare, tax }) => fare + tax);


   const getDepartDate =apiData?.map((items)=>items.groupDescription.map((itm)=>itm.departDate));
    // console.log("getDepartDate",getDepartDate);
   const mergeDatePrice = totalAmount?.map((items ,index)=>{
    return{
       price:items.toLocaleString(),
       date:getDepartDate[index]
    }
    }); 

  // line to sort the dates in ascending order 
  //  mergeDatePrice?.sort((a, b) => Number(a.date) - Number(b.date));

  //  console.log("mergeDatePrice",mergeDatePrice);

       useEffect(()=>{
           handleCalanderAPICall();
       },[searchDataArr]);
  // ---------------------------------
  return (
    <Fragment>
      {tripType !== "MultiCity" ? (
        <div className="date_comparision_hero">
          <h4 className="cdate_heading_size">Flexible Date Comparison</h4>
        {
          isLoading ? (
            <p className='text-center py-4'><PropagateLoader color="#2c67b3"/></p>
          ):
          (
            <div className="date_slider">
            <Slider {...settings}>
            {mergeDatePrice?.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleDateClick(index)}
                    className='px-3'
                  >
                   <div
                      className={`dc_para_size ${
                        activeIndex === index ? 'dc_para_color_current' : 'dc_para_color'
                      }`}
                    >
                      <p>
                        {item?.date?.map((itm, idx) => (
                          <div key={idx}>
                            {EuropianDateFormat(itm)}
                            {idx < item.date.length - 1 &&  '  ⇄  '}
                          </div>
                        ))}
                      </p>
                    </div>
                    <hr className="m-1" />
                    <p
                      className={`dc_para_size ${
                        activeIndex === index ? 'dc_date_color_current' : 'dc_price_color'
                      }`}
                    >
                      {`${item.price.toLocaleString()} $`}
                    </p>
                  </div>
                ))}

            </Slider>

            {/* <div key={index}>
                  <div onClick={() => handleDateClick(index)}>
                    <p className={`dc_para_size ${activeIndex === index ? 'dc_para_color_current' : 'dc_para_color'}`}>
                      {`${formatDate(item.date[0].departureDate)} `}
                      {item.date[1] && `⇄ ${formatDate(item.date[1].departureDate)}`}
                    </p>
                    <p className={`dc_para_size ${activeIndex === index ? 'dc_date_color_current' : 'dc_price_color'}`}>{`${item.price.toLocaleString()} PKR`}</p>
                  </div>
                </div> */}
          </div>
          )
        }
        </div>
      ) : null}
    </Fragment>
  );
};

export default DateComparision;
