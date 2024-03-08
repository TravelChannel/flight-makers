import React,{Fragment,useEffect,useState} from 'react'
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import TotalPriceCalculation from '../../Flightbooking/TotalPriceCalculation';
import { TicketPriceProvider } from '../../Flightbooking/Comman/Context';
import UserItineraryDetails from '../../Flightbooking/Comman/UserItineraryDetails';
import { useFormData } from '../../../Context/FormDataContext';
import { useLocation } from 'react-router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GetDetailByPNR } from '../../../API/BackendAPI/GetDetailbyPNR';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useNavigate } from 'react-router';
import Tooltip from '@material-ui/core/Tooltip';
const BookingDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const [currentDate , setCurrentDate] = useState(false);
const {formData ,setFormData,backendFinalOBJ}= useFormData();
const firstName = formData.map(items=>items.fname0);
const lastName = formData.map(items =>items.lname0);
const passedData =  location.state?.data;
const finalBranch = passedData?.branchlabel;
const userLocation = passedData?.userLocation;

const [isSmallScreen ,  setIsSmallScreen] = useState(false);

const activepnrNumber = JSON.parse(localStorage.getItem("PNRNumber"));

console.log("userPNR",activepnrNumber);

console.log("userrrrrrrrrrr",userLocation);

console.log("backendFinalOBJ",backendFinalOBJ);

// --------------------------------------------------------
const currentDateTime = new Date();
// Add 11 hours to the current date
const futureDateTime = new Date(currentDateTime);
futureDateTime.setHours(currentDateTime.getHours() + 11);
// Format the dates
const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
const formattedCurrentDateTime = currentDateTime.toLocaleString(undefined, options);
const formattedFutureDateTime = futureDateTime.toLocaleString(undefined, options);
// --------------------------------------------------------
const downloadPDF = () => {
  const input = document.getElementById('pdf-content');

  html2canvas(input, { scale: 3 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg'); // Change image type to 'JPEG'

    const pdf = new jsPDF('p', 'mm', 'a4', true);

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;

    pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('invoice.pdf');
  });
};

useEffect(() => {
  const GetUsersDetail = async () => {
    try {
      const response = await GetDetailByPNR(activepnrNumber);
      console.log("userDetailbyPNR", response);
    } catch (error) {
      console.error("error in ffetching Data",error);
    }
  };
  
  GetUsersDetail();
}, []);
useEffect(() => {
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

const backNavigation = () =>{
  navigate('/');
}


// -------------------------------------------------------

  return (
    <Fragment>
      <div className='container bg-white' id="pdf-content">
          <Tooltip title="Go to Home Page" >
            <div className='navigation_icon mx-4 '>
            <ReplyAllIcon onClick={backNavigation} className='navigation_arrow' />
            </div>
          </Tooltip>
        <div className='details_header d-flex justify-content-center'>
          <CheckCircleOutlineTwoToneIcon className="booking_done_icon align-self-center"/>
          <div className='px-2' >
          <p className='booking_done_heading'>ThankYou {`${firstName} ${lastName}`}</p>
          <p className='booking_done_heading'>You are almost Done !</p>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-8'>
            <div className='pass_booking_detial_main '>
                <div className='d-flex justify-content-start'>
                  <div className='numbering_backgorund'>1</div>
                  <div className='align-self-center'>
                    <h4 className='custom_itineray_heading'>Booking Details</h4>
                  </div>
                </div>
                <div className="custom_detials_main">
                  <div className=' d-flex justify-content-between custom_itinerary_details'>
                    <h6>Order ID </h6>
                    <h6 className='custom_sub_details'>#454545545</h6>
                  </div>
                  <div className=' d-flex justify-content-between custom_itinerary_details'>
                    <h6>
                    {finalBranch != null ? "Selected Branch ": "YourLocation"}
                    </h6>
                    <h6 className='custom_sub_details'>
                      {finalBranch != null ? finalBranch : userLocation}
                    </h6>
                  </div>
                  {/* <div className=' d-flex justify-content-between custom_itinerary_details'>
                    <h6>Branch Address </h6>
                    <h6 className='custom_sub_details'>3-UGF, Century Tower, Kalma Chowk,& Main Boulevard, Gulberg-III, Lahore, Pakistan.</h6>
                  </div> */}
                  <div className=' d-flex justify-content-between custom_itinerary_details'>
                    <h6>Transaction Date	 </h6>
                    <h6 className='custom_sub_details'>{formattedCurrentDateTime}</h6>
                  </div>
                  <div className=' d-flex justify-content-between custom_itinerary_details'>
                    <h6>Booking Valid till </h6>
                    <h6 className='custom_sub_details'>{formattedFutureDateTime}</h6>
                  </div>
                  <div className=' d-flex justify-content-between custom_itinerary_details'>
                    <h6 className='custom_sub_details text-center  custom_booking_message'>Your order has been placed. Please visit your selected branch within 24 hours to complete the payment and finalize your booking</h6>
                  </div>
                 
                </div>
            </div>
          </div>
          <div className='col-md-4 pass_booking_detial_main'>
              <div className='d-flex justify-content-center'>
                      <div className='numbering_backgorund'>2</div>
                      <div className='align-self-center'>
                        <h4 className='custom_itineray_heading'> Payment Details</h4>
                      </div>
              </div>
              <div className='total_payment_card'>
              <TicketPriceProvider>
                              <TotalPriceCalculation />
                 </TicketPriceProvider>
                {/* <TotalPriceCalculation/> */}
              </div>
          </div>
        </div>
        <div className='pass_booking_detial_main'>
            <div className='d-flex justify-content-center py-1'>
               <div className='numbering_backgorund'>3</div>
               <div className='align-self-center'>
                   <h4 className='custom_itineray_heading'> Personal Details</h4>
              </div>
           </div>
           <div>
           <div className="table-responsive mt-3">
              <table className="table table-bordered">
              <thead>
                <tr>
                  <th>{isSmallScreen ? 'No' : 'Serial No'}</th>
                  <th>{isSmallScreen ? 'Name' : 'Passenger Name'}</th>
                  <th>{isSmallScreen ? 'DOB' : 'Date of Birth'}</th>
                  <th>{isSmallScreen ? 'Pass.No' : 'Passport No'}</th>
                  <th>Gender</th>
                  <th>Cnic</th>
                  <th>{isSmallScreen ? 'Phone' : 'Phone No'}</th>
                </tr>
              </thead>
                <tbody>
                  {backendFinalOBJ.pnrBookings?.map((item, index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{item.firstName} {item.lastName}</td>
                      <td>{item.dateOfBirth}</td>
                      <td>{item.passportNo}</td>
                      <td>{item.gender}</td>
                      <td>{item.cnic || '---'}</td>
                      <td>{`92${item.phoneNumber}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
       </div>
        </div>
        <div className='pass_booking_detial_main'>
            <div className='d-flex justify-content-center py-1'>
               <div className='numbering_backgorund'>4</div>
               <div className='align-self-center'>
                   <h4 className='custom_itineray_heading'>Review Your Booking</h4>
              </div>
           </div>
           <div className="itineryDetailssty mt-4"> 
                <UserItineraryDetails/>
         </div>
        </div>
        
        <div className="d-flex justify-content-center">
              <button className='btn btn-primary m-2 download_typography' onClick={() => downloadPDF()}>
                      Download as PDF
              </button>
        </div>
      </div>
    </Fragment>
  )
}

export default BookingDetails;