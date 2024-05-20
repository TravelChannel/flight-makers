import React ,{useState ,useEffect } from "react";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay} from "swiper";
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import {testimonialsReview} from '../../Constant/homeData';
import { DisplayRatings } from "../../API/BackendAPI/RateUsAPI/DisplayRatings";
const Tesimonials = () =>{
    const [RatingList ,setRatingList] = useState([]);
    // useEffect(() => {
    //     const handleBlogLists = async () => {
    //         try {
    //             const response = await DisplayRatings();
    //             setRatingList(response.data.payload); 
    //             console.log("Response from RatingList API:", response);
    //         } catch (error) {
    //             console.log("Error on RatingList API:", error);
    //         }
    //     }
    //     handleBlogLists();
    // }, []);
    const ArrangeDateFormat = (JourneyDate) => {
        const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
        return formattedDate;
      };
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
                    RatingList.map((item,index) =>
                    {
                        return(
                           
                            <SwiperSlide key = {index} className="testimonialSlide">
                                <div className="d-flex justify-content-between">
                                    {/* <h5 className="mr-2 nameSpaceFix text-start">{item.userName}</h5> */}
                                    <h5 className="mr-2 nameSpaceFix text-start">{item.title}</h5>
                                    <div className="d-flex justify-content-start">
                                        {Array.from({ length: item.stars }, (_, index) => (
                                        <span key={index}  className="ratingStar "><StarIcon /></span>
                                    ))}
                                   </div>
                                </div>
                                <div className="d-flex justify-content-start verfiedIcon mt-2">
                                    <VerifiedIcon/>
                                    <p className="ml-1 light_colour">Verified Customer</p>
                                </div>
                                {/* <div className="wrapper"><p className="mt-4 text-start truncate">{item.description}</p></div> */}
                                <div className="wrapper"><p className="mt-4 text-start truncate">{item.review}</p></div>
                                
                                {/* <p className="text-end mt-3 light_colour">{item.date}</p> */}
                                <p className="text-end mt-3 light_colour">{ArrangeDateFormat(item.createdAt)}</p>
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


                           


// ------------------API-----------------------------
                            {/* <SwiperSlide className="testimonialSlide">
                            <div className="d-flex justify-content-between">
                                <h5 className="mr-2 nameSpaceFix text-start">{item.title}</h5>
                                <div className="d-flex justify-content-start">
                                        {Array.from({ length: item.stars }, (_, index) => (
                                        <span key={index}  className="ratingStar "><StarIcon /></span>
                                    ))}
                                </div>
                            </div>
                            <div className="d-flex justify-content-start verfiedIcon mt-2">
                                <VerifiedIcon/>
                                <p className="ml-1 light_colour">Verified Customer</p>
                            </div>
                            <div className="wrapper"><p className="mt-4 text-start truncate">{item.review}</p></div>
                            
                            <p className="text-end mt-3 light_colour">{ArrangeDateFormat(item.createdAt)}</p>
                        </SwiperSlide> */}


//--------------Other------------------------

   {/* <SwiperSlide className="testimonialSlide">
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
                            </SwiperSlide> */}