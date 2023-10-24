import React from "react";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay} from "swiper";
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import {testimonialsReview} from '../../Constant/homeData'
const Tesimonials = () =>
{
    return (
        <Fragment>
            <div className="component_container"> 
                <h2 className="colorBlue ">What Our Client Say</h2>
                <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    800: {
                      slidesPerView: 3,
                    },
                    700: {
                        slidesPerView: 2,
                      },
                    0: {
                      slidesPerView: 1,
                    },
                  }}
                modules={[Autoplay, Pagination ]}
                className="mySwiper"
                >
                {
                    testimonialsReview.map((item,index) =>
                    {
                        return(
                            <SwiperSlide className="testimonialSlide">
                                <div className="d-flex justify-content-between">
                                    <h5 className="mr-2 nameSpaceFix text-start">{item.userName}</h5>
                                    <span className="ratingStar">
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                        <StarIcon/>
                                    </span>
                                </div>
                                <div className="d-flex justify-content-start verfiedIcon mt-2">
                                    <VerifiedIcon/>
                                    <p className="ml-1 light_colour">Verified Customer</p>
                                </div>
                                <div className="wrapper"><p className="mt-4 text-start truncate">{item.description}</p></div>
                                
                                <p className="text-end mt-3 light_colour">{item.date}</p>
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

export default Tesimonials;