import React, { useState,Fragment } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { formatDate } from '../../helpers/formatdata';
import { useItemsToShow } from './Comman/Context';
import { useNavigate } from 'react-router-dom';


const DateComparision = (props) => {
  const { searchDataArr } = useItemsToShow();
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

  // console.log(alternateRates);

  const handleDateClick = (index) => {
    setActiveIndex(index);
    console.log(searchDataArr)
    const getingSingleRates = alternateRates[index].date.flatMap(item => item.departureDate);
    searchDataArr.date = [];
    searchDataArr.date.push(...getingSingleRates);
    // console.log(searchDataArr);
    navigate('/searchflightresult' , {state:{searchDataArr}});
  };
  const settings = {
    infinite: true,
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
        breakpoint: 512,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <Fragment>
      {tripType !== "MultiCity" ?
        <div className="date_comparision_hero">
          <h4 className="cdate_heading_size">Flexible Date Comparison</h4>
          <div className="date_slider">
            <Slider {...settings}>
              {alternateRates.map((item, index) => (
                <div key={index}>
                  <div onClick={() => handleDateClick(index)}>
                    <p className={`dc_para_size ${activeIndex === index ? 'dc_para_color_current' : 'dc_para_color'}`}>
                      {`${formatDate(item.date[0].departureDate)} `}
                      {item.date[1] && `⇄ ${formatDate(item.date[1].departureDate)}`}
                    </p>
                    <p className={`dc_para_size ${activeIndex === index ? 'dc_date_color_current' : 'dc_price_color'}`}>{`${item.price.toLocaleString()} PKR`}</p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        : null
      }
    </Fragment>
  )
};

export default DateComparision;
