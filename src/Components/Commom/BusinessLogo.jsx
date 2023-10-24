import {React,Fragment} from 'react'
import * as images from '../../Constant/images';
import { Link } from 'react-router-dom';
const BusinessLogo = () => {
  return (
    <Fragment>
          <div className="d-flex justify-content-between">
                        <div className="desktop_menu">
                            <ul>
                                <li className="trip_tab trip_active"> 
                                  <Link to="/">
                                    <img src={images.planeImage} alt="Hotel" className="hotel_img" />
                                    <h6 className='text-white'>Flights</h6>
                                  </Link>
                                </li>
                                <li className="trip_tab">
                                  <Link to="/">
                                    <img src={images.hotelImage} alt="Hotel" className="hotel_img" />
                                    <h6 className='text-white'>Hotels</h6>
                                  </Link>
                                </li>
                                <li className="trip_tab">
                                    <Link to="https://www.faremakersmall.com/" target='blank'>
                                      <img src={images.MallLogo} alt="Hotel" className="hotel_img" />
                                      <h6 className='text-white'>Mall</h6>
                                    </Link>
                                </li>
                                <li className="trip_tab">
                                    <Link to="https://fastsports.tv/Live" target='blank'>
                                      <img src={images.liveIcon} alt="Hotel" className="hotel_img" />
                                      <h6 className='text-white'>Live</h6>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center">
                            <h3 className="search_heading">Search Flights</h3>
                        </div>
                        <div className="d-flex align-items-center">
                            <h6 className="slogan">Fly anywhere.Fly everywhere.</h6>
                        </div>
                        
                    </div>
    </Fragment>
  )
}

export default BusinessLogo;