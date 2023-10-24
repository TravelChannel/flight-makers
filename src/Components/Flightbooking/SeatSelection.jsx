import {React,useState,Fragment} from 'react';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import FlightClassIcon from '@mui/icons-material/FlightClass';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined';

const SeatSelection = () => {
    const [btnClicked,setBtnclicked] = useState(false);
    const[colorChange , setColorChange] = useState([]);
    const handleBtnClicked = ()=>{
        setBtnclicked(!btnClicked);
    }
    const handleColorChange =(index)=>{
        const updatedColor = new Array(colorChange.length).fill(false);
        updatedColor[index]=true;
        setColorChange(updatedColor);
    } 
  return (
    <div className='seat_selection_main mt-4'>
         <div className="d-flex align-self-center">
            <span> <AirlineSeatReclineNormalIcon className="policy_main_icon" /></span>
            <span className="policy_main_heading">Seat Selection</span>
        </div>
        <div  className='d-flex justify-content-between'>
            <div className='seat_selection_heading'>
                 <div className="d-flex justify-content-start">
                  <span className='seat_main_icon'><FlightClassIcon className="flight_icon_editing"/></span>
                    <p className="prefered_flight_heading align-self-center">Select Your Preferred Seat</p>
                 </div>
                <p className="seat_flight_subtitile">Save More by Pre-Booking Your Seats</p>
           </div>
            <div className='seat_selection_heading align-self-center'>
                { btnClicked ? (
                    <CancelOutlinedIcon className='close_seat_selection' onClick={handleBtnClicked}/>
                    ):(
                     <button type="button" class="btn btn-outline-primary  seat_selectoin_btn" onClick={handleBtnClicked}>Select Seats</button>
                      )}
            </div>
        </div>
        {
            btnClicked && (
            <Fragment>
            <div className="seat_selection_hero">
           <div className="main_seats_map d-flex justify-content-center w-100">
               <div className="seat_detail_distance"> 
                        <div className="direction_title">
                            <p>Onward</p>
                        </div>
                        <div className={`d-flex justify-content-start onward_content ${colorChange[0] ? 'seat_bc_blue':''}`} onClick={() => handleColorChange(0)} >
                            <div className="d-flex justify-content start onward_flights_detail">
                                    <p>LHE</p>
                                    <span><ArrowRightAltOutlinedIcon/></span> 
                                    <p>KHI</p>
                            </div>
                            <div className="map_count_distance align-self-center">
                                <p className="available_seats_count">0/1</p>
                            </div>
                        </div>
                        <div className={`d-flex justify-content-start onward_content ${colorChange[1] ? 'seat_bc_blue':''}`} onClick={() => handleColorChange(1)}>
                            <div className="d-flex justify-content start onward_flights_detail">
                                    <p>LHE</p>
                                    <span><ArrowRightAltOutlinedIcon/></span> 
                                    <p>KHI</p>
                            </div>
                            <div className="map_count_distance align-self-center">
                                <p className="available_seats_count">0/1</p>
                            </div>
                        </div>
               </div>
               
               <div className="seat_detail_center">
                    <div className="direction_title">
                            <p>Returns</p>
                      </div>
                        <div className={`d-flex justify-content-start onward_content ${colorChange[2] ? 'seat_bc_blue':''}`} onClick={() => handleColorChange(2)}>
                            <div className="d-flex justify-content start onward_flights_detail">
                                    <p>LHE</p>
                                    <span><ArrowRightAltOutlinedIcon/></span> 
                                    <p>KHI</p>
                            </div>
                            <div className="map_count_distance align-self-center">
                                <p className="available_seats_count">0/1</p>
                            </div>
                        </div>
                        <div className={`d-flex justify-content-start onward_content ${colorChange[3] ? 'seat_bc_blue':''}`} onClick={() => handleColorChange(3)}>
                            <div className="d-flex justify-content start onward_flights_detail ">
                                    <p>LHE</p>
                                    <span><ArrowRightAltOutlinedIcon/></span> 
                                    <p>KHI</p>
                            </div>
                            <div className="map_count_distance align-self-center">
                                <p className="available_seats_count">0/1</p>
                            </div>
                        </div>
               </div>
           </div>
           <div className="seat_catagories_main d-flex justify-content-around">
                <div className="display_free_category">
                    <div className='d-flex justify-content-start'>
                        <div className="free_cata_box cata_box_size"> </div>
                         <p className="seat_category_titles align-self-center">Free</p>
                    </div>
                </div> 
                <div className="display_free_category">
                    <div className='d-flex justify-content-start'>
                        <div className="first_cata_box cata_box_size"></div>
                         <p className="seat_category_titles align-self-center">500 PKR</p>
                    </div>
                </div> 
                <div className="display_free_category">
                    <div className='d-flex justify-content-start'>
                        <div className="sec_cata_box cata_box_size"></div>
                         <p className="seat_category_titles align-self-center">1000 PKR</p>
                    </div>
                </div> 
                <div className="display_free_category">
                    <div className='d-flex justify-content-start'>
                        <div className="third_cata_box cata_box_size"></div>
                         <p className="seat_category_titles align-self-center">2000 PKR</p>
                    </div>
                </div> 
                <div className="display_free_category">
                    <div className='d-flex justify-content-start'>
                        <div className="fourth_cata_box cata_box_size">
                        </div>
                         <p className="seat_category_titles align-self-center">5000 PKR</p>
                    </div>
                </div> 
                <div className="display_free_category">
                    <div className='d-flex justify-content-start'>
                        <div className="last_cata_box cata_box_size">
                        </div>
                         <p className="seat_category_titles align-self-center">8000 PKR</p>
                    </div>
                </div>        
           </div>
      </div>

      <div className='seat_map_hero d-flex justify-content-start w-100'>
        <div className="flex-inline d-flex justify-content-start  ">
            <svg viewBox="0 0 240 236" height="216" className='align-self-center'>
                <g fill="none" fillRule="evenodd">
                <path fill="#F7F7F7" fillOpacity="0.01" d="M0 0h240v236H0z"></path>
                <path fill="#FFF" d="M210.760609 234.096774S220.507073 234.731183 240 236V0c-19.492927 1.2688172-29.239391 1.90322581-29.239391 1.90322581C157.418708 1.90322581 40 62.1659084 40 118c0 55.834092 117.418708 116.096774 170.760609 116.096774z"></path>
                <g fill="#E6E6E6">
                    <path d="M135.161 66.612L158 70.419l-15.226 43.774h-22.839zM171.322 45.677h3.807l-15.226 20.935-22.839-3.806zM119.935 121.806h22.839L158 165.58l-22.839 3.807zM137.064 173.193l22.839-3.806 15.226 20.935h-3.807z"></path>
                </g>
                </g>
            </svg>
            <svg viewBox="0 0 40 44" width="40" height="44" className='align-self-center bg-white airoplane_move_arrow'>
                    <path fill="#E6E6E6" fillRule="evenodd" d="M40 31.429V12.571H21.538V0L0 22l21.538 22V31.429z"></path>
            </svg>
            <svg  width="20" height="8" className='align-self-center exit_1' ><path d="M4.44141856 7.5v-.7910156H.95509044V4.28710937H4.2607545v-.78125H.95509044V1.24511719h3.48632812V.45410156H.07618419V7.5h4.36523437zm1.88772974 0l1.8798829-2.77832031h.078125L10.1328593 7.5h1.0546875L8.7998515 3.99414062 11.2412577.45410156h-1.0009765L8.3555155 3.25683594h-.078125L6.4219218.45410156H5.36235147L7.745164 3.95507812 5.33305459 7.5h.99609371zm6.8877298 0V.45410156h-.8789062V7.5h.8789062zm4.2656595 0V1.24511719h2.2705078V.45410156h-5.4199219v.79101563h2.2705078V7.5h.8789063z" fill="#999" fill-rule="nonzero"></path></svg>

            <svg  width="20" height="8" className='align-self-center exit_2' ><path d="M4.44141856 7.5v-.7910156H.95509044V4.28710937H4.2607545v-.78125H.95509044V1.24511719h3.48632812V.45410156H.07618419V7.5h4.36523437zm1.88772974 0l1.8798829-2.77832031h.078125L10.1328593 7.5h1.0546875L8.7998515 3.99414062 11.2412577.45410156h-1.0009765L8.3555155 3.25683594h-.078125L6.4219218.45410156H5.36235147L7.745164 3.95507812 5.33305459 7.5h.99609371zm6.8877298 0V.45410156h-.8789062V7.5h.8789062zm4.2656595 0V1.24511719h2.2705078V.45410156h-5.4199219v.79101563h2.2705078V7.5h.8789063z" fill="#999" fill-rule="nonzero"></path></svg>
        </div>
        <div className=" d-flex justify-content-start  bg-white airoplane_main align-self-center">
            <div  className='flights_coloumn_color'>
                <div>F</div>
                <div className="flight_coloum_detail">E</div>
                <div>D</div>
                <div className='flight_row_differentiate'> </div>
                <div>C</div>
                <div className="flight_coloum_detail">B</div>
                <div>A</div>
            </div>
             <div className='flights_coloumn_color align-slef-center'>
                <div className="last_cata_box cata_box_size"></div>
                <div className="last_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="last_cata_box cata_box_size"></div>

                <div className='flight_row_differentiate'> </div>

                <div className="last_cata_box cata_box_size"></div>
                <div className="last_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="last_cata_box cata_box_size"></div>
                <div className='flights_row_distribution'>1</div>
             </div>
             <div className='flights_coloumn_color align-slef-center'>
                <div className="fourth_cata_box cata_box_size"></div>
                <div className="fourth_cata_box cata_box_size flight_coloum_detail"></div>

                <div className="fourth_cata_box cata_box_size"></div>

                <div className='flight_row_differentiate'> </div>
                <div className="fourth_cata_box cata_box_size"></div>
                <div className="fourth_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="fourth_cata_box cata_box_size"></div>
                <div className='flights_row_distribution'>2</div>
             </div>
             <div className='flights_coloumn_color align-slef-center'>
                <div className="fourth_cata_box cata_box_size"></div>
                <div className="fourth_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="fourth_cata_box cata_box_size"></div>
                <div className='flight_row_differentiate'> </div>
                <div className="fourth_cata_box cata_box_size"></div>
                <div className="fourth_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="fourth_cata_box cata_box_size"></div>
                <div className='flights_row_distribution'>3</div>
             </div>
             <div className='flights_coloumn_color align-slef-center'>
                <div className="third_cata_box cata_box_size"></div>
                <div className="third_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="third_cata_box cata_box_size"></div>
                <div className='flight_row_differentiate'> </div>
                <div className="third_cata_box cata_box_size"></div>
                <div className="third_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="third_cata_box cata_box_size "></div>
                <div className='flights_row_distribution'>4</div>
             </div>
             <div className='flights_coloumn_color align-slef-center'>
                <div className="third_cata_box cata_box_size"></div>
                <div className="third_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="third_cata_box cata_box_size"></div>
                <div className='flight_row_differentiate'> </div>
                <div className="third_cata_box cata_box_size"></div>
                <div className="third_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="third_cata_box cata_box_size "></div>
                <div className='flights_row_distribution'>5</div>
             </div>
             <div className='flights_coloumn_color align-slef-center'>
                <div className="free_cata_box cata_box_size"> </div>
                <div className="free_cata_box cata_box_size flight_coloum_detail"> </div>
                <div className="free_cata_box cata_box_size"> </div>
                <div className='flight_row_differentiate'> </div>
                <div className="free_cata_box cata_box_size"> </div>
                <div className="free_cata_box cata_box_size flight_coloum_detail"> </div>
                <div className="free_cata_box cata_box_size"> </div>
                <div className='flights_row_distribution'>6</div>
             </div>
             <div className='flights_coloumn_color align-slef-center'>
                <div className="sec_cata_box cata_box_size"></div>
                <div className="sec_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="sec_cata_box cata_box_size"></div>
                <div className='flight_row_differentiate'> </div>
                <div className="sec_cata_box cata_box_size"></div>
                <div className="sec_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="sec_cata_box cata_box_size "></div>
                <div className='flights_row_distribution'>7</div>
             </div>
             <div className='flights_coloumn_color align-slef-center'>
                 <div className="first_cata_box cata_box_size"></div>
                 <div className="first_cata_box cata_box_size flight_coloum_detail"></div>
                 <div className="first_cata_box cata_box_size"></div>

                 <div className='flight_row_differentiate'> </div>

                <div className="first_cata_box cata_box_size"></div>
                <div className="first_cata_box cata_box_size flight_coloum_detail"></div>
                <div className="first_cata_box cata_box_size"></div>
                <div className='flights_row_distribution'>8</div>
             </div>

        </div>

            <div className=''>
                <svg viewBox="0 0 339 434" height="400">
                    <g fill="none" fillRule="evenodd">
                    <path fill="#F7F7F7" fillOpacity="0.01" d="M1 99h338v236H1z" />
                    <path
                        fill="#FFF"
                        d="M29.2311326 334.65432c41.0301017 0 194.3535324-90.318637 194.3535324-117.88959 0-27.570953-153.3234307-117.88959-194.3535324-117.88959H.584665v235.77918h28.6464676z"
                    />
                    <path
                        fill="#FFF"
                        d="M240.053044 0H280.6279L165.020044 216.76473C85.0350209 210.660427 30.3409992 206.374615 .93797897 203.907294c-.35342897 0 .07800272-38.786327.1120178-38.786327C42.4562484 148.359633 112.098215 97.0907408 209.975897 11.3142888 218.298212 4.02091338 228.987139 0 240.053044 0zM.58455 229.619907c1.11937378-.094559 55.9312051-4.379618 164.435494-12.855177L280.6279 433.52946h-40.605546c-11.047724-.000001-21.720356-4.007738-30.037417-11.279512C111.803591 336.408017 42.0034619 285.106328 .58455 268.344881c-.07800272 0 0-38.724974 0-38.724974z"
                    />
                    <path
                        fill="#FFF"
                        d="M71.1644707 224.37051c57.8981783 0 226.5765493-1.924864 226.5765493-7.60578s-168.678371-7.60578-226.5765493-7.60578c0 0-40.4234507 3.624276-40.4234507 7.486704 0 3.862428 40.4234507 7.724856 40.4234507 7.724856z"
                    />
                    <path
                        fill="#FFF"
                        d="M71.1644707 224.37051c57.8981783 0 226.5765493-1.924864 226.5765493-7.60578 0-.119076-267-.119076-267-.119076 0 3.862428 40.4234507 7.724856 40.4234507 7.724856z"
                    />
                    </g>
                </svg>
                <svg  width="20" height="8" className='align-self-center exit_3' ><path d="M4.44141856 7.5v-.7910156H.95509044V4.28710937H4.2607545v-.78125H.95509044V1.24511719h3.48632812V.45410156H.07618419V7.5h4.36523437zm1.88772974 0l1.8798829-2.77832031h.078125L10.1328593 7.5h1.0546875L8.7998515 3.99414062 11.2412577.45410156h-1.0009765L8.3555155 3.25683594h-.078125L6.4219218.45410156H5.36235147L7.745164 3.95507812 5.33305459 7.5h.99609371zm6.8877298 0V.45410156h-.8789062V7.5h.8789062zm4.2656595 0V1.24511719h2.2705078V.45410156h-5.4199219v.79101563h2.2705078V7.5h.8789063z" fill="#999" fill-rule="nonzero"></path></svg>
                <svg  width="20" height="8" className='align-self-center exit_4' ><path d="M4.44141856 7.5v-.7910156H.95509044V4.28710937H4.2607545v-.78125H.95509044V1.24511719h3.48632812V.45410156H.07618419V7.5h4.36523437zm1.88772974 0l1.8798829-2.77832031h.078125L10.1328593 7.5h1.0546875L8.7998515 3.99414062 11.2412577.45410156h-1.0009765L8.3555155 3.25683594h-.078125L6.4219218.45410156H5.36235147L7.745164 3.95507812 5.33305459 7.5h.99609371zm6.8877298 0V.45410156h-.8789062V7.5h.8789062zm4.2656595 0V1.24511719h2.2705078V.45410156h-5.4199219v.79101563h2.2705078V7.5h.8789063z" fill="#999" fill-rule="nonzero"></path></svg>

              
        </div>
      </div>

     
            </Fragment>
            ) 
        }
    </div>
   
  )
}

export default SeatSelection;