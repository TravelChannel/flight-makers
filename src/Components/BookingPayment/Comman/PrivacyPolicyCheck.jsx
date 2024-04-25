import { React, Fragment, useState, useEffect, useContext } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { requestGetpaymentToken } from '../../../API/index';
import { useNavigate } from 'react-router';
import BookingDetails from './BookingDetails';
import { useFormData } from '../../../Context/FormDataContext';
import { requestPNRCreate } from '../../../API/index';
import { handleShowErrorAlert } from '../../../helpers/sweatalert';
import Loader from '../../../Loader/Loader';
// import { UserBookingDetails } from '../../../API/index';
import { UserBookingDetails } from '../../../API/BackendAPI/allAPICalls';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AirSialTravDetial } from '../../../API/index';
import { airsialBookingDetail } from '../../../API/index';
import { AirSialTicketIssued } from '../../../API/index';

const PrivacyPolicyCheck = (props) => {
    const navigate = useNavigate();
    const {formData ,backendFinalOBJ ,setBackendFinalOBJ,setPNRLoading} = useFormData();

    console.log("formData get",formData);
    console.log("getFinalOBJ",backendFinalOBJ.pnrBookings);

    const [isMobile, setMobile] = useState(window.innerWidth < 768);
    const [isBtnCenter, setBtnCenter] = useState(window.innerWidth < 468);
    const [isLoading ,setLoading] = useState(false);

    const { checked, setChecked, isEmpty,paymentType,branchLabel,userLocation} = props;
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const gettingTicketPrice = JSON.parse(localStorage.getItem("totalTicketPrice"));
    const totalTicketPrice = Number(gettingTicketPrice).toLocaleString();
    useEffect(() => {
        const handleSize = () => {
            setMobile(window.innerWidth < 768);
            setBtnCenter(window.innerWidth < 468);
        };
        window.addEventListener("resize", handleSize);
        return () => {
            window.removeEventListener('resize', handleSize);
        }
    }, []);
    const payOnlineHandler = async () => {
      setPNRLoading(true);
        // const pnrNum = await generatePnrNum();
        // const pnrNum = await generatePnrNum();
    try {
      const pnrNum = await generatePnrNum();
      console.log("pnrNum:", pnrNum);
        if(!pnrNum){
            console.log("erroratGetPNR");
          throw new Error(
            'Error Generating Pnr Num',
          );
        }
        let paymentCode;
        let iframe_id;
      
        switch (paymentType) {
          case "paypro":
            paymentCode = 117547;
            iframe_id = 134320; // Only set for "paypro"
            break;
          case "easypaisa":
            paymentCode = 118906;
            break;
          default:
            paymentCode = 118909;
            break;
        }
      
          // setPNRLoading(true);
          const paymentToken = await requestGetpaymentToken(paymentCode);
          console.log('paymentTokenpaymentToken', paymentToken.createOrder);

          if (!paymentToken) {
            console.log("Error: paymentToken");
            throw new Error("Error paymentToken");
          }
          // console.log(paymentToken.token);
          const createOrder = paymentToken.createOrder;
          const OrderId = createOrder.id;
          const getPaymentToken1 = paymentToken.getPaymentToken;

          console.log("paymentTokenResult", getPaymentToken1.token);
          console.log("you are searching for me", createOrder);
    
          console.log("-------------------------Start------------------------------");
          console.log("OrderId", OrderId);
          console.log("pnrNum", pnrNum);
          handleBackendData(OrderId,pnrNum);
          console.log("------------------------End-------------------------------");


          if (paymentType === "paypro") {
            window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/${iframe_id}?payment_token=${getPaymentToken1.token}`;
          } else {
            window.location.href = `https://pakistan.paymob.com/iframe/${getPaymentToken1.token}`;
          }
        
        } catch (error) {

          console.error(error,error.message);
          console.log("catch");
          setLoading(false);

        }
        setLoading(false);
      };

      const BookingDetail =async ()=>{
        setPNRLoading(true);
        let OrderId =null;
        try{
            const pnrNum = await generatePnrNum();
            if(!pnrNum){
              console.log("erroratGetPNR");
            throw new Error(
              'Error Generating Pnr Num',
            );
          }
         
            console.log('pnrNum123',pnrNum);
            const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));
            // if (extra_Bagg?.schedualDetGet?.[0]?.[0]?.carrier?.operating === "PF"){
            //   const finalPNR = await fetchData(pnrNum);

            //   const airSialUserDetail = await airsialBookingDetail();
            //   console.log('airSialUserDetail',airSialUserDetail);

            //   const AirSialTicketIsssue = await AirSialTicketIssued();
            // }
            const DatatoPass ={
            branchlabel : branchLabel,
            userLocation : userLocation,
            };
            handleBackendData(OrderId,pnrNum);
            window.scrollTo(0,0);
            navigate('/bookingDetail', { state: { data: DatatoPass } });
           
        }catch(error){
                console.error(error);
                setPNRLoading(true);
        }finally {
          
                 setPNRLoading(true);
                 window.scrollTo(0,0);
          }
      }
      // ---------------------------------------
      const fetchData = async(pnrNum)=>{
            try{
                // setLoading(true);
                const airsialtravllersDetail = await AirSialTravDetial(backendFinalOBJ.pnrBookings,pnrNum);
                console.log("airsialtravllersDetail",airsialtravllersDetail);
                // setAirsialData(airsialtravllersDetail);
                // setLoading(false);
        
            }catch(error){
                console.error("Error", error);
            }
    
        }
    //   ---------------------------------------

      const generatePnrNum = async() => {
        let getPNRNumber = false;
        try {
            // setPNRLoading(true);
            const PNRRespon = await requestPNRCreate(formData);

            if (PNRRespon?.Success === false) {
              const message = PNRRespon.Response.message
              handleShowErrorAlert(message);
            }
            else if(PNRRespon?.status === "NotProcessed") {
              handleShowErrorAlert("Incomplete");
            }
            else if (PNRRespon?.CreatePassengerNameRecordRS?.ApplicationResults?.status === "Incomplete") {
              const message = PNRRespon.CreatePassengerNameRecordRS.ApplicationResults.Warning[0].SystemSpecificResults[0].Message[0].content
              handleShowErrorAlert(message);
            }
            else {
              if (PNRRespon?.Success === true) {
                getPNRNumber = PNRRespon.Response.Data   //airsial Pnr

                const finalPNR = await fetchData(getPNRNumber);

                const airSialUserDetail = await airsialBookingDetail(getPNRNumber);
                console.log('airSialUserDetail',airSialUserDetail);
  
                // const AirSialTicketIsssue = await AirSialTicketIssued(getPNRNumber);
              }
              else {
                getPNRNumber = PNRRespon.CreatePassengerNameRecordRS?.ItineraryRef?.ID;  // sabre pnr
              }
    
      
            // Creating Final Object for the Backend 
          
            }
      
          } finally {
            // setPNRLoading(false);
            
          }
          localStorage.setItem("PNRNumber", JSON.stringify(getPNRNumber));
          return getPNRNumber;
      };

      const handleBackendData = async(OrderId,pnrNum)=>{
        let updatedBackendFinalOBJ = {};
        updatedBackendFinalOBJ = {
          ...backendFinalOBJ,
          pnr: pnrNum,
          OrderId:OrderId
        };

        console.log("ADDED PNR OBj",updatedBackendFinalOBJ);
            const respServerPnrBooking = await UserBookingDetails(updatedBackendFinalOBJ);
              if (respServerPnrBooking.data.status === 'SUCCESS') {
                  console.log("respServerPnrBooking", respServerPnrBooking);
                  // localStorage.setItem("PNRNumber", JSON.stringify(pnrNum));
                  toast.success("PNR Created Successfully", { autoClose: 2000 });
              } else{
                console.log('anccccc')
                alert("Error:something went wrong, Please Try Again ");
              }
      }

      const handleTermsandConditions = () =>{
        navigate('/terms-and-conditions');
        window.scrollTo(0,0);
      }
      const handleBookingPolicy = () =>{
        navigate('/terms-of-service');
      }
      const handlePrivacyPolicy = () =>{
        navigate('/refund-policy');
        window.scrollTo(0,0);
      }
    return (
        <Fragment>
           <div>
           {
                !isMobile && (
                    <div>
                            <div className='policy_check_main d-flex justify-content-start'>
                                <div className='align-self-center'>
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                                <div className='privacy_policy_content '>
                                    <p>I acknowledge and accept the rules, restrictions, <span className='privacy_policy_linked' onClick = {handleBookingPolicy}>booking policy,</span> <span className='privacy_policy_linked' onClick={handlePrivacyPolicy}>privacy policy</span>, and <span className='privacy_policy_linked' onClick={handleTermsandConditions}>terms and conditions</span> of faremakers.
                                    </p>
                                </div>
                            </div>
                            <div>
                            {!checked ? (<p className='warning_terms_alert'>Please accept the terms and conditions to proceed with this booking. </p>
                            ) : ('')}
                            </div>

                            <div className='d-flex justify-content-end'>
                                <div className='align-self-center pay_content_right' >
                                    <h5 className='total_payment_detail'><strong>{totalTicketPrice.toLocaleString()} PKR</strong></h5>
                                    <p className='payment_subtitle'>total inclusive, of all taxes</p>
                                </div>
                                <div className="move_payment_button ">
                                        <button
                                                onClick={() => {
                                                    if (paymentType === 'paypro' || paymentType === 'easypaisa' || paymentType === 'jazzcash') {
                                                    payOnlineHandler();
                                                    } else {
                                                    BookingDetail();
                                                    }
                                                }}
                                                type="button"
                                                className={`btn btn-primary pay_now_btn ${!checked ? 'disable_cursr' : 'activ_cursor'}`}
                                                disabled={!checked || isEmpty}
                                                >
                                                {
                                                    // Display button text based on paymentType
                                                    paymentType === 'paypro' || paymentType === 'easypaisa' || paymentType === 'jazzcash' ? (
                                                    <p>Pay Now</p>
                                                    ) : (
                                                    <p>Submit</p>
                                                    )
                                                }
                                                </button>
                                </div>
                            </div>
                    </div>
                )
            }
            {
                isMobile && (
                    <div>
                        <div className='policy_check_main d-flex justify-content-start'>
                            <div className='align-self-center'>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                            <div className='privacy_policy_content align-self-center'>
                                <p>I acknowledge and accept the rules, restrictions, <span className='privacy_policy_linked' onClick = {handleBookingPolicy}>booking policy,</span> <span className='privacy_policy_linked' onClick={handlePrivacyPolicy}>privacy policy</span>, and <span className='privacy_policy_linked' onClick={handleTermsandConditions}>terms and conditions</span> of faremakers.
                                </p>
                            </div>
                        </div>
                        <div>
                            {!checked ? (<p className='warning_terms_alert'>Please accept the terms and conditions to proceed with this booking. </p>
                            ) : ('')}
                            </div>
                        <div className={`${isBtnCenter ? 'd-flex justify-content-center pay_btn_cneter' : 'd-flex justify-content-end'}`}>
                            <div className='align-self-center pay_content_right' >
                                <h5 className='total_payment_detail'><strong> {totalTicketPrice.toLocaleString()} PKR</strong></h5>
                                <p className='payment_subtitle'>total inclusive, of all taxes</p>
                            </div>
                            <div className="move_payment_button p-3">
                                    <button
                                                onClick={() => {
                                                    if (paymentType === 'paypro' || paymentType === 'easypaisa' || paymentType === 'jazzcash') {
                                                    payOnlineHandler();
                                                    } else {
                                                    BookingDetail();
                                                    }
                                                }}
                                                type="button"
                                                className={`btn btn-primary pay_now_btn ${!checked ? 'disable_cursr' : 'activ_cursor'}`}
                                                disabled={!checked || isEmpty}
                                                >
                                                {
                                                    // Display button text based on paymentType
                                                    paymentType === 'paypro' || paymentType === 'easypaisa' || paymentType === 'jazzcash' ? (
                                                    <p>Pay Now</p>
                                                    ) : (
                                                    <p>Submit</p>
                                                    )
                                                }
                                     </button>
                                </div>
                                
                        </div>
                    </div>
                )
            }
           </div>
        </Fragment>
    );
};

export default PrivacyPolicyCheck;