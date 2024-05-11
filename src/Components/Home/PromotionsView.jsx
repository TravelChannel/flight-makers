import React ,{useState ,useEffect} from "react";
import { Fragment } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination,Autoplay} from "swiper";
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import {testimonialsReview} from '../../Constant/homeData';
import { GetAllPromotions } from "../../API/BackendAPI/allAPICalls";
const PromotionsView = () =>{
  const [PromotionData ,setPromotionData] = useState([]);
    useEffect(() => {
        const getPromotionsDetail = async () => {
            try {
                const response = await GetAllPromotions();
                console.log("promotionResponce",response);
                setPromotionData(response.data.payload);
            } catch (error) {
                console.log('Error in getAllPromotions', error);
            }
        };
    
        getPromotionsDetail();
    }, []);
    return (
        <Fragment>
            <div className="component_container"> 
                {/* <h2 className="colorBlue ">What Our Client Say</h2> */}
                <Swiper
                slidesPerView={3}
                spaceBetween={20}
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
                    PromotionData.map((item,index) =>
                    {
                        return( 
                          <div key={index} className="bg-white mb-2">
                          <SwiperSlide className="PromotionSlide " style={{ backgroundImage: `url(${item.img})` }}>
                                <div className="d-flex justify-content-between">
                                    <h5 className="mr-2 nameSpaceFix promotionDisplay text-start">{item.title}</h5>
                                </div>
                                <div className="wrapper"><p className="mt-4 text-start truncate">{item.description}</p></div>
                                {/* <p className="text-end mt-3 light_colour">{item.date}</p> */}
                            </SwiperSlide>
                          </div>
                        );
                    }
                    )
                }
             </Swiper>
            </div>
        </Fragment>
    );
}

export default PromotionsView;