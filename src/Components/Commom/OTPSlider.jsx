import React from "react";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay} from "swiper";
import {OTPSliderData} from '../../Constant/homeData';




const OTPSlider = () =>
{
    return (
        <Fragment  className="slider_background">
            <div> 
                {/* <h2 className="colorBlue ">What Our Client Say</h2> */}
                <Swiper 
                slidesPerView={1}
                spaceBetween={0}
                pagination={{
                  clickable: true,
                 
                }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                modules={[ Autoplay, Pagination ]}
                className="mySwiper"
                >
                {
                    OTPSliderData.map((item,index) =>
                    {
                        return(
                          <SwiperSlide  >
                              <div className="slider_background">
                              
                                    <img alt="Slider Img" src={item.OTPImages}/>
                              </div>
                            </SwiperSlide>
                            
                        );
                    }
                    )
                }
             </Swiper>
            </div>
        </Fragment>
    );
}

export default OTPSlider;
