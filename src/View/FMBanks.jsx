import React,{useState,useEffect,Fragment ,useRef} from 'react';
import * as images from '../../src/Constant/images';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ContactSources from '../Components/Commom/ContactSources';
import { MasterPriceTravelResults } from '../API/AmadeousAPI';
import { cityNameFunct } from '../helpers/formatdata';

const FMBanks = () => {

  const [MPData ,setMPData] = useState();
  const [displayData ,setDisplayData] = useState(false);

  const APiResp = async()=>{
    const resp = await MasterPriceTravelResults();
    console.log("MasterPriceTravelResults-final",resp);
    setMPData(resp);
  }

  // Access API Body
  const MPBodyAccess = MPData?.data?.["soapenv:Envelope"]?.["soapenv:Body"]?.Fare_MasterPricerTravelBoardSearchReply;
  console.log("MPBodyAccess", MPBodyAccess);


  //Access the group of Flights
  const groupofFlights = MPBodyAccess?.flightIndex?.groupOfFlights;
  console.log("groupofFlights",groupofFlights);

  // --------------------------- Info about Price Details--------------------------------------
const priceArray = MPBodyAccess?.recommendation?.map((rec)=>rec.recPriceInfo.monetaryDetail[0].amount);

console.log("priceArray",priceArray);


  // -------------------------------------------------------------------

  // get all Flights details
  const flightInfo = groupofFlights?.map(items=>items?.flightDetails);


  // handle object and array case of Each flight info ----> imp

  let getMPFlightsInfo = flightInfo?.map((details) =>Array.isArray(details) ? details.map((detail) => detail?.flightInformation) : [details?.flightInformation])
  .filter(Boolean);
  console.log('getMPFlightsInfo',getMPFlightsInfo);


  // get Depart and Arrival
  const departAndArrival = getMPFlightsInfo?.map((items)=>items.flatMap(itm=>itm.location.flatMap(it=>it.locationId)));
  console.log("departAndArrival---v1",departAndArrival);


  // creating new schedualDetGet object 
  const schedualDetGet = [
    {
      id:1,
      stopCount:0,
      elapsedTime:0,
      departure:{
        airport:"khi",
        city:"khi",
        country:"PK",
        terminal:"M"
      },
      arrival:{
        airport:"khi",
        city:"khi",
        country:"PK",
        terminal:"M"
      }
    }
  ];
// ---------------------------------scheduleDETGET OBJ  ---------------------------------------------------------------------------------
// const updatedSchedualDetGet = departAndArrival?.map((locations) =>
//   locations.map((loc, index) => {
//     return {
//       id: index + 1, 
//       stopCount: 0, 
//       elapsedTime: 0, 
//       departure: {
//         airport: locations[index], 
//         city: "PK", 
//         country: "PK", 
//         terminal: "M"
//       },
//       arrival: {
//         airport: locations[index + 1] || "N/A", 
//         city: "PK", 
//         country: "PK", 
//         terminal: "M"
//       }
//     };
//   })
// );

// console.log("Updated-schedualDetGet", updatedSchedualDetGet);

// -------------------IMP Data-------------------------

// ---------get productDateTime obj
const flightDateandTime = getMPFlightsInfo?.map((items)=>items.flatMap(itm=>itm.productDateTime));
console.log("flightDateandTime",flightDateandTime);

// get Company ID Object for all flights
const companyId = getMPFlightsInfo?.map((items)=>items.flatMap(itm=>itm.companyId));

// get marketing carrier for groupDescription 
const marketingCarrier = companyId?.map((itm)=>itm[0].marketingCarrier);
console.log("marketingCarrier",marketingCarrier);

const productDateTime = flightDateandTime?.map((array) => {
  if (array.length === 1) {
    return {
      dateOfDeparture: array[0].dateOfDeparture,
      dateOfArrival: array[0].dateOfArrival,
      timeofDeparture:array[0].timeOfDeparture,
      timeofArrival:array[0].timeOfArrival,

    };
  } else if (array.length > 1) {
    return {
      dateOfDeparture: array[0].dateOfDeparture,
      dateOfArrival: array[array.length - 1].dateOfArrival,
      timeofDeparture:array[0].timeOfDeparture,
      timeofArrival:array[array.length - 1].timeOfArrival,
    };
  }
  return null;
});

// console.log(productDateTime);


const groupDescription = departAndArrival?.map((items ,index) =>{
  return {
      id:index,
      departure:items[0],
      arrival:items[items.length-1],
      departDate:productDateTime[index]?.dateOfDeparture,
      arrivalDate:productDateTime[index]?.dateOfArrival,
      departTime:productDateTime[index]?.timeofDeparture,
      ArrivalTime:productDateTime[index]?.timeofArrival,
      marketingCarrier:marketingCarrier[index]
  }
});
console.log("groupDescription",groupDescription);
  
  // handle object and array case of Each flight info
  
  // const  getEachFlightInfo = flightInfo?.map((details,index) =>
  //   Array.isArray(details)
  //     ? details.map((detail) => ({
  //         ...detail?.flightInformation,
  //         scheduleDetails: groupDescription[index] 
  //       }))
  //     : [
  //         {
  //           ...details?.flightInformation, 
  //           scheduleDetails: groupDescription[index] 

  //         }
  //       ]
  // ).filter(Boolean);
  
  // console.log("Flight Info with Schedule Details:", getEachFlightInfo);
  
  const updateGroupOfFlights = groupofFlights?.map((item ,index)=>{
    return{
      ...groupofFlights[index],
      groupDescription:groupDescription[index],
    };
  });

  console.log("updateGroupOfFlights",updateGroupOfFlights);


  // ------------handle segment Flight Refrence--------------
  const segmentFlightRef = MPBodyAccess?.recommendation?.map((items)=>items.segmentFlightRef);
  console.log('segmentFlightRef',segmentFlightRef);
  

  // --------handle Flight Display button-----------------
  const handleDisplayDetail = (index) =>{
    setDisplayData((prev) => ({
      ...prev,
      [index]: !prev[index], 
    }));
  }
  // --------------------------------------------------------



  return (
    <div className='container'>
       <div className='contact_us_heading d-flex justify-content-center'>
            <AccountBalanceRoundedIcon className='about_detail_icon '/><h3 className='fmBanks_main_heading'>Travel Channel Official Bank Accounts:</h3>
      </div>
        <div className='banks_main'>
            <div className='row'>
              <div className=' col-md-4 col-sm-6 habib_bank_details'>
                  <div>
                      <div className='hbl_header d-flex justify-content-center'>
                        <img src={images.hbllogo} alt="" width="40px" /> 
                        <p className='hbl_name'>Habib Bank Limited</p>
                      </div> 
                      <div className='hbl_body'>
                        <div className='accounts_details d-flex justify-content-start'>
                          <p className='account_title align-self-center '>Account Title:</p>
                          <p className='align-self-center account_title_body '>Travel Channel Int'l Pvt Ltd</p>
                        </div> 
                        <div className='accounts_details d-flex justify-content-start'>
                          <p className='account_title align-self-center'>Account Number:</p>
                          <p className=' account_title_body '> 1060-7900329303</p>
                          
                        </div>
                      </div>
                  </div>
                </div>
                <div className=' col-md-4 col-sm-6 habib_bank_details' >
                    <div className='hbl_header d-flex justify-content-center'>
                      <img src={images.SCBank} alt="" width="15px" /> 
                      <p className='hbl_name'>STANDARD CHARTERED</p>
                    </div> 
                    <div className='hbl_body'>
                      <div className='accounts_details d-flex justify-content-start'>
                        <p className='account_title align-self-center '>Account Title:</p>
                        <p className='align-self-center account_title_body '>Travel Channel Int'l Pvt Ltd</p>
                      </div> 
                      <div className='accounts_details d-flex justify-content-start'>
                        <p className='account_title align-self-center'>Account Number:</p>
                        <p className=' account_title_body '> 01-7011197-01</p>
                        
                      </div>
                    </div>
                </div>
                <div className=' col-md-4 col-sm-6 habib_bank_details'>
                    <div className='hbl_header d-flex justify-content-center'>
                      <img src={images.MBBank} alt="" width="25px" /> 
                      <p className='hbl_name'>Meezan Bank</p>
                    </div> 
                    <div className='hbl_body'>
                      <div className='accounts_details d-flex justify-content-start'>
                        <p className='account_title align-self-center '>Account Title:</p>
                        <p className='align-self-center account_title_body '>Travel Channel Int'l Pvt Ltd</p>
                      </div> 
                      <div className='accounts_details d-flex justify-content-start'>
                        <p className='account_title align-self-center'>Account Number:</p>
                        <p className=' account_title_body '>  0287-0101682411</p>
                        
                      </div>
                    </div>
                </div>
                <div className='help_desk'>
                  <ContactSources/>
                </div>
           
            </div>

        </div>

        <div className='bg-white p-4'>
          <button className='btn btn-primary'  onClick={APiResp}>
            MasterPriceTravelBoard
          </button>
        </div> 

        {/* ----------------------------------------------------- */}

        {
          groupDescription?.map((items ,index)=>(
            <Fragment>
            <div className="d-flex justify-content-between w-100 ad_border_top_oneway bg-white my-1" key={index}>
                <div className='d-flex justify-content-between w-50'>
                    <div className="fd_content_style">
                        <img className='airline-logo' src="https://images.kiwi.com/airlines/64/PK.png" alt="" />
                        <p>{items.marketingCarrier}</p>
                    </div>
                    <div className="fd_timing_detail fd_content_style">
                        <p className="fd_timing_size">{items.departTime}</p>
                        <p>{cityNameFunct[items.departure]}</p>
                    </div>
                   
                    <div className="fd_timing_detail fd_content_style">
                        <p className="fd_expected_time">2hr 25min </p>
                        <hr className="fd_line" />
                        <p className="fd_expected_time">non stop</p>
                    </div>
                    <div className="fd_timing_detail fd_content_style">
                        <p className="fd_timing_size">{items.ArrivalTime}</p>
                        <p>{cityNameFunct[items.arrival]}</p>
                    </div>
                </div>
                <div className="w-50 text-right align-self-center">
                 <p className="fd_total_price align-self-center fd_price_color">{priceArray[index] || '000'}</p> 
                   <button className="fd_book_button" type='button' >Book now</button>
                </div>
            </div>
            <p className="fd_heading border-0" onClick={()=>handleDisplayDetail(index)}>
                       {displayData[index] ? "Hide Detail" : "Show Detail"}
            </p>
            <div>
                {displayData[index] && ( 
                  <Fragment>
                  <div className="fd_more_detail pb-4">
                    <div className="d-flex justify-content-between text-center bg-lighterBlue p-1">
                      <div className="d-flex justify-content-start">
                        <p className="fd_more_detail_size">Karachi → Dubai</p>
                        <p className="fd_more_detail_date">Thu, Feb 6, 2025</p>
                      </div>
                      <div className="d-flex justify-content-start">
                        <p className="fd_more_detail_date"></p>
                        <p className="fd_more_refund">REFUNDABLE</p>
                      </div>
                    </div>
                    { (Array.isArray(updateGroupOfFlights?.[index]?.flightDetails)
                        ? updateGroupOfFlights[index].flightDetails
                        : [updateGroupOfFlights?.[index]?.flightDetails]
                      ).map((itm,idx)=>(
                        <div className="fd_stops_detail d-flex justify-content-between w-100" key= {idx}>
                      <div className="fd_airport_logo align-self-center text-center stop_width_1">
                        <img
                          className="airline-logo"
                          src="https://images.kiwi.com/airlines/64/PK.png"
                          alt="PK Logo"
                        />
                        <p className="fd_airport_name">{itm?.flightInformation.companyId.marketingCarrier}</p>
                        <div className="fd_flightNo">
                          <p className="fd_airport_name">{itm?.flightInformation?.flightOrtrainNumber}</p>
                        </div>
                      </div>
                      <div className="text-center align-self-center stop_width_2">
                        <span className="fd_airport_size">{itm?.flightInformation?.location?.[0].locationId}</span>&nbsp;
                        <span className="fd_airport_size_time">{itm?.flightInformation?.productDateTime?.timeOfDeparture}</span>
                        <p className="fd_flight_date">{itm?.flightInformation?.productDateTime?.dateOfDeparture}</p>
                        <p className="fd_airport_name">Jinnah International Airport</p>
                      </div>
                      <div className="align-self-center stop_width_3">
                        <svg
                          className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium d-flex align-items-center fd_clock css-i4bv87-MuiSvgIcon-root"
                          focusable="false"
                          aria-hidden="true"
                          viewBox="0 0 24 24"
                          data-testid="AccessTimeIcon"
                        >
                          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
                          <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
                        </svg>
                        <p className="fd_flight_date">2hr 35min</p>
                      </div>
                      <div className="text-center align-self-center stop_width_4">
                        <span className="fd_airport_size">{itm?.flightInformation?.location?.[1].locationId}</span>&nbsp;
                        <span className="fd_airport_size_time">{itm?.flightInformation?.productDateTime?.timeOfArrival}</span>
                        <p className="fd_flight_date">{itm?.flightInformation?.productDateTime?.dateOfArrival}</p>
                        <p className="fd_airport_name">Dubai International Airport</p>
                      </div>
                    </div>
                      ))
                    }
                  </div>
                  {/* <hr  className='p-2'/> */}
                  </Fragment>
              )}
            </div>
            </Fragment>
            
          ))
        }



        {/* ---------------------------------------------------------------- */}



    </div>
  )
}

export default FMBanks;