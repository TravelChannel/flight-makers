import React,{Fragment,useState} from 'react'
import CheckCircleOutlineTwoToneIcon from '@mui/icons-material/CheckCircleOutlineTwoTone';
import TotalPriceCalculation from '../../Flightbooking/TotalPriceCalculation';
import { TicketPriceProvider } from '../../Flightbooking/Comman/Context';
import UserItineraryDetails from '../../Flightbooking/Comman/UserItineraryDetails';
import { useFormData } from '../../../Context/FormDataContext';
import { useLocation } from 'react-router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const BookingDetails = () => {

  const location = useLocation();
  const [currentDate , setCurrentDate] = useState(false);
const {formData ,setFormData}= useFormData();
const firstName = formData.map(items=>items.fname0);
const lastName = formData.map(items =>items.lname0);
const passedData =  location.state?.data;
const finalBranch = passedData?.branchlabel;
const userLocation = passedData?.userLocation;

console.log("userrrrrrrrrrr",userLocation);

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

// -------------------------------------------------------

  return (
    <Fragment>
      <div className='container bg-white' id="pdf-content">
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
           <table className="table table-bordered  mt-3">
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Passenger Name</th>
                  <th>DOB</th>
                  <th>Passport No</th>
                  <th>Cnic</th>
                  <th>Phone No</th>
                </tr>
              </thead>
              {formData?.map((item, index) => (
                    <tbody key={index}>
                      <tr>
                        <td>1</td>
                        <td>{item.fname0} {item.lname0}</td>
                        <td>{item.DateOfBirth0}</td>
                        <td>{item.passport0}</td>
                        <td>{item.cnic0}</td>
                        <td>03408922375</td>
                      </tr>
                    </tbody>
                  ))}
                    {/* {
                      formData?.map((item , index)=>(
                        <tbody key={index}>
                        <tr>
                          <td>{index+1}</td>
                          <td>{item[`fname${index}`]} {item[`lname${index}`]}</td>
                          <td>{item[`DateOfBirth${index}`]}</td>
                          <td>{item[`passport${index}`] || null} </td>
                          <td> {item[`cnic${index}`] || null} </td>
                          <td>03408922375</td>
                        </tr>
                        </tbody>
                      ))
                    } */}
          </table>
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