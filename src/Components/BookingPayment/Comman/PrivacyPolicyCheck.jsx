import { React, Fragment, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { requestGetpaymentToken } from "../../../API/index";
import { useNavigate } from "react-router";
import BookingDetails from "./BookingDetails";
import { useFormData } from "../../../Context/FormDataContext";
import { requestPNRCreate } from "../../../API/index";
import { handleShowErrorAlert } from "../../../helpers/sweatalert";
import Loader from "../../../Loader/Loader";
// import { UserBookingDetails } from '../../../API/index';
import { UserBookingDetails } from "../../../API/BackendAPI/allAPICalls";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AirSialTravDetial } from "../../../API/index";
import { airsialBookingDetail } from "../../../API/index";
import { AirSialTicketIssued } from "../../../API/index";
import apiClient from "../../../API/BackendAPI/api_main";

const PrivacyPolicyCheck = (props) => {
  const navigate = useNavigate();
  const { formData, backendFinalOBJ, setPNRLoading, userID } = useFormData();

  const [isMobile, setMobile] = useState(window.innerWidth < 768);
  const [isBtnCenter, setBtnCenter] = useState(window.innerWidth < 468);
  const [isLoading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [formFields, setFormFields] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const {
    checked,
    setChecked,
    isEmpty,
    paymentType,
    branchLabel,
    userLocation,
    payAtBranchID,
  } = props;
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const gettingTicketPrice = JSON.parse(
    localStorage.getItem("totalTicketPrice")
  );
  const totalTicketPrice = Number(gettingTicketPrice).toLocaleString();

  const UserAmount = JSON.parse(localStorage.getItem("UserAmount"));

  // console.log("UserAmount",UserAmount);
  useEffect(() => {
    const handleSize = () => {
      setMobile(window.innerWidth < 768);
      setBtnCenter(window.innerWidth < 468);
    };
    window.addEventListener("resize", handleSize);

    // ----------------------------Temporary--------------------------------------------------
    try {
      console.log(formData);
      setUserPhoneNum(backendFinalOBJ?.pnrBookings[0]?.phoneNumber);
      console.log("nabeel logged userphone number", userPhoneNum);
      console.log(userPhoneNum);
    } catch (error) {
      console.log("error", error);
    }
    // ----------------------------Temporary---------------------------------------------------

    // Only fetch JazzCash data if paymentType is 'jazzcash'
    setOrderId(`ORD-${Date.now()}`);
    fetchJazzCashFormData();

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [paymentType, backendFinalOBJ, formData]);
  const payOnlineHandler = async () => {
    setPNRLoading(true);
    try {
      const pnrNum = "test";
      // const pnrNum = await generatePnrNum();
      // console.log("pnrNum:", pnrNum);
      // if (!pnrNum) {
      //   console.log("erroratGetPNR");
      //   throw new Error("Error Generating Pnr Num");
      // }
      let paymentCode;
      let iframe_id;

      switch (paymentType) {
        case "paypro":
          paymentCode = 124774;
          // paymentCode = 117547;
          iframe_id = 134320; // Only set for "paypro"
          break;
        case "easypaisa":
          // paymentCode = 118906;
          paymentCode = 124780;
          break;
        case "jazzcash":
          paymentCode = 20000;
          break;
        default:
          // paymentCode = 118909;
          paymentCode = 124777;
          break;
      }

      if (paymentType === "jazzcash") {
        console.log("OrderId", orderId);
        console.log("pnrNum", pnrNum);
        const handleBackendResp = await handleBackendData(orderId, pnrNum);
        if (!handleBackendResp) {
          console.log("handleBackendResp", handleBackendResp);
          handleShowErrorAlert(
            "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline 03111147111 for further details..."
          );
          throw new Error("Error Generating Pnr Num");
        }
      } else {
        // setPNRLoading(true);
        const paymentToken = await requestGetpaymentToken(
          paymentCode,
          userPhoneNum
        );
        console.log("paymentTokenpaymentToken", paymentToken.createOrder);

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

        console.log(
          "-------------------------Start------------------------------"
        );
        console.log("OrderId", OrderId);
        console.log("pnrNum", pnrNum);
        const handleBackendResp = await handleBackendData(OrderId, pnrNum);
        if (!handleBackendResp) {
          console.log("handleBackendResp", handleBackendResp);
          handleShowErrorAlert(
            "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline 03111147111 for further details..."
          );
          throw new Error("Error Generating Pnr Num");
        }

        console.log(
          "------------------------End-------------------------------"
        );

        if (paymentType === "paypro") {
          window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/${iframe_id}?payment_token=${getPaymentToken1.token}`;
        } else {
          window.location.href = `https://pakistan.paymob.com/iframe/${getPaymentToken1.token}`;
        }

        setPNRLoading(false);
      }
    } catch (error) {
      console.error(error, error.message);
      console.log("catch");
      setPNRLoading(false);
    }
    // setLoading(false);
  };

  const fetchJazzCashFormData = async () => {
    console.log(UserAmount.totalTicketPrice);
    const requestBody = {
      pp_TxnType: "",
      pp_BillReference: orderId, // replace with dynamically generated order ID if needed
      pp_CustomerID: userID, // replace with actual customer ID
      pp_Amount: UserAmount.totalTicketPrice,
      pp_CustomerMobile: userPhoneNum,
    };

    try {
      // Await the response from the API call using apiClient
      const response = await apiClient.post(
        "/payment/PaymentAtJazzCash",
        requestBody
      );
      // The response is already processed by your interceptor
      // You can access the response data like this
      const params = response.data.serviceResponse; // Assuming the response contains the HTML in the data
      console.log("nabeel_testing");
      setFormFields(params);
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error Fetching Payment Form:", error);
    } finally {
      // Ensure loading state is reset regardless of success or failure
      setPNRLoading(false);
    }
  };

  const BookingDetail = async () => {
    setPNRLoading(true);
    let OrderId = null;
    let sendSmsBranch = false;
    let sendSmsCod = false;
    if (payAtBranchID === 1) {
      sendSmsBranch = true;
    } else {
      sendSmsCod = true;
    }
    try {
      const pnrNum = await generatePnrNum();
      if (!pnrNum) {
        console.log("erroratGetPNR");
        throw new Error("Error Generating Pnr Num");
      }

      console.log("pnrNum123", pnrNum);
      const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));
      // if (extra_Bagg?.schedualDetGet?.[0]?.[0]?.carrier?.operating === "PF"){
      //   const finalPNR = await fetchData(pnrNum);

      //   const airSialUserDetail = await airsialBookingDetail();
      //   console.log('airSialUserDetail',airSialUserDetail);

      //   const AirSialTicketIsssue = await AirSialTicketIssued();
      // }

      const handleBackendResp2 = await handleBackendData(
        OrderId,
        pnrNum,
        sendSmsBranch,
        sendSmsCod
      );
      if (!handleBackendResp2) {
        console.log("handleBackendResp", handleBackendResp2);
        throw new Error("Error in backend Data Function");
      }
      const DatatoPass = {
        branchlabel: branchLabel,
        userLocation: userLocation,
      };
      navigate("/bookingDetail", { state: { data: DatatoPass } });
      setPNRLoading(false);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
      console.log("catch2");
      setPNRLoading(false);
    } finally {
      setPNRLoading(false);
      //  window.scrollTo(0,0);
    }
  };
  // ---------------------------------------
  const fetchData = async (pnrNum) => {
    try {
      // setLoading(true);
      const airsialtravllersDetail = await AirSialTravDetial(
        backendFinalOBJ.pnrBookings,
        pnrNum
      );
      console.log("airsialtravllersDetail", airsialtravllersDetail);
      // setAirsialData(airsialtravllersDetail);
      // setLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };
  //   ---------------------------------------

  const generatePnrNum = async () => {
    let getPNRNumber = false;
    try {
      // setPNRLoading(true);
      const PNRRespon = await requestPNRCreate(formData);

      if (PNRRespon?.Success === false) {
        const message = PNRRespon.Response.message;
        // handleShowErrorAlert(message);
        console.log("PNR-Message-1", message);
        handleShowErrorAlert(
          "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline 03111147111 for further details."
        );
      } else if (PNRRespon?.status === "NotProcessed") {
        // handleShowErrorAlert("Incomplete");
        handleShowErrorAlert(
          "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline 03111147111 for further details."
        );
      } else if (
        PNRRespon?.CreatePassengerNameRecordRS?.ApplicationResults?.status ===
        "Incomplete"
      ) {
        const message =
          PNRRespon.CreatePassengerNameRecordRS.ApplicationResults.Warning[0]
            .SystemSpecificResults[0].Message[0].content;
        // handleShowErrorAlert(message);
        console.log("PNR-Message-2", message);
        handleShowErrorAlert(
          "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline 03111147111 for further details."
        );
      } else {
        if (PNRRespon?.Success === true) {
          getPNRNumber = PNRRespon.Response.Data; //airsial Pnr

          const finalPNR = await fetchData(getPNRNumber);

          const airSialUserDetail = await airsialBookingDetail(getPNRNumber);
          console.log("airSialUserDetail", airSialUserDetail);

          // const AirSialTicketIsssue = await AirSialTicketIssued(getPNRNumber);
        } else {
          getPNRNumber =
            PNRRespon.CreatePassengerNameRecordRS?.ItineraryRef?.ID; // sabre pnr
          const pnrPayment =
            PNRRespon.CreatePassengerNameRecordRS?.AirPrice?.[0].PriceQuote
              .PricedItinerary?.TotalAmount;
          UserAmount.pnrPayment = pnrPayment;
          console.log("PnrPayment-v2", UserAmount);
        }

        // Creating Final Object for the Backend
      }
    } finally {
      // setPNRLoading(false);
    }
    localStorage.setItem("PNRNumber", JSON.stringify(getPNRNumber));
    return getPNRNumber;
  };

  const handleBackendData = async (
    OrderId,
    pnrNum,
    sendSmsBranch,
    sendSmsCod
  ) => {
    let updatedBackendFinalOBJ = {};
    updatedBackendFinalOBJ = {
      ...backendFinalOBJ,
      pnr: pnrNum,
      OrderId: OrderId,
      sendSmsBranch: sendSmsBranch,
      sendSmsCod: sendSmsCod,
      branchLabel: branchLabel,
      userLocation: userLocation,
      Amount: UserAmount,
    };

    if (window.fbq) {
      window.fbq("track", "PayNow", {
        buttonName: "PayNow",
        payInfo: formData,
      });
    }
    console.log("Final Pnr-Booking-Object", updatedBackendFinalOBJ);

    const respServerPnrBooking = await UserBookingDetails(
      updatedBackendFinalOBJ
    );
    console.log(
      "checkForPayment1",
      respServerPnrBooking.data.payload.isAmountEqual
    );
    if (respServerPnrBooking.data.status !== "SUCCESS") {
      handleShowErrorAlert(
        "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline 03111147111 for further details..."
      );
      throw new Error("Error: Server response status is not SUCCESS");
    } else if (respServerPnrBooking.data.payload.isAmountEqual) {
      console.log(
        "checkForPayment2",
        respServerPnrBooking.data.payload.isAmountEqual
      );
      console.log("respServerPnrBooking", respServerPnrBooking);
      toast.success("PNR Created Successfully", { autoClose: 2000 });
      return true;
    } else {
      handleShowErrorAlert(
        "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline 03111147111 for further details...."
      );
    }
    // };
  };

  // const handleTermsandConditions = () =>{
  //   navigate('/terms-and-conditions');
  //   window.scrollTo(0,0);
  // }
  // const handleBookingPolicy = () =>{
  //   navigate('/terms-of-service');
  // }
  // const handlePrivacyPolicy = () =>{
  //   navigate('/refund-policy');
  //   window.scrollTo(0,0);
  // }
  return (
    <Fragment>
      <div>
        {!isMobile && (
          <div>
            <div className="policy_check_main d-flex justify-content-start">
              <div className="align-self-center">
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              {/* <div className='privacy_policy_content '>
                                    <p>I acknowledge and accept the rules, restrictions, <span className='privacy_policy_linked' onClick = {handleBookingPolicy}>booking policy,</span> <span className='privacy_policy_linked' onClick={handlePrivacyPolicy}>privacy policy</span>, and <span className='privacy_policy_linked' onClick={handleTermsandConditions}>terms and conditions</span> of faremakers.
                                    </p>
                                </div> */}
              <div className="privacy_policy_content ">
                <p>
                  I acknowledge and accept the rules, restrictions,
                  <span
                    className="privacy_policy_linked"
                    onClick={() => window.open("/term-and-condition", "_blank")}
                  >
                    {" "}
                    terms and conditions,{" "}
                  </span>
                  <span
                    className="privacy_policy_linked"
                    onClick={() => window.open("/terms-of-service", "_blank")}
                  >
                    {" "}
                    terms of Services{" "}
                  </span>
                  , and
                  <span
                    className="privacy_policy_linked"
                    onClick={() => window.open("/refund-policy", "_blank")}
                  >
                    {" "}
                    Refund Policy{" "}
                  </span>
                  , of faremakers.
                </p>
              </div>
            </div>
            <div>
              {!checked ? (
                <p className="warning_terms_alert">
                  Please accept the terms and conditions to proceed with this
                  booking.{" "}
                </p>
              ) : (
                ""
              )}
            </div>

            <div className="d-flex justify-content-end">
              <div className="align-self-center pay_content_right">
                <h5 className="total_payment_detail">
                  <strong>{totalTicketPrice.toLocaleString()} PKR</strong>
                </h5>
                <p className="payment_subtitle">
                  total inclusive, of all taxes
                </p>
              </div>
              <div className="move_payment_button ">
                <form
                  method="post"
                  action="https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform"
                >
                  {Object.entries(formFields).map(([key, value]) => (
                    <input
                      key={key}
                      type="hidden"
                      name={key}
                      value={value || ""}
                    />
                  ))}
                  <button type="submit" className="btn btn-primary">
                    Pay With Jazz Cash
                  </button>
                </form>
                <button
                  onClick={() => {
                    if (
                      paymentType === "paypro" ||
                      paymentType === "easypaisa" ||
                      paymentType === "jazzcash"
                    ) {
                      payOnlineHandler();
                    } else {
                      BookingDetail();
                    }
                  }}
                  type="button"
                  className={`btn btn-primary pay_now_btn ${
                    !checked ? "disable_cursr" : "activ_cursor"
                  }`}
                  disabled={!checked || isEmpty}
                >
                  {
                    // Display button text based on paymentType
                    paymentType === "paypro" ||
                    paymentType === "easypaisa" ||
                    paymentType === "jazzcash" ? (
                      <p>Pay Now</p>
                    ) : (
                      <p>Submit</p>
                    )
                  }
                </button>
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div>
            <div className="policy_check_main d-flex justify-content-start">
              <div className="align-self-center">
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </div>
              <div className="privacy_policy_content align-self-center">
                {/* <p>I acknowledge and accept the rules, restrictions, <span className='privacy_policy_linked' onClick = {handleBookingPolicy}>booking policy,</span> <span className='privacy_policy_linked' onClick={handlePrivacyPolicy}>privacy policy</span>, and <span className='privacy_policy_linked' onClick={handleTermsandConditions}>terms and conditions</span> of faremakers.
                                </p> */}
                <p>
                  I acknowledge and accept the rules, restrictions,
                  <span
                    className="privacy_policy_linked"
                    onClick={() => window.open("/refund-policy", "_blank")}
                  >
                    {" "}
                    booking policy
                  </span>
                  ,
                  <span
                    className="privacy_policy_linked"
                    onClick={() => window.open("/terms-of-service", "_blank")}
                  >
                    {" "}
                    privacy policy
                  </span>
                  , and
                  <span
                    className="privacy_policy_linked"
                    onClick={() =>
                      window.open("/terms-and-conditions", "_blank")
                    }
                  >
                    {" "}
                    terms and conditions
                  </span>
                  of faremakers.
                </p>
              </div>
            </div>
            <div>
              {!checked ? (
                <p className="warning_terms_alert">
                  Please accept the terms and conditions to proceed with this
                  booking.{" "}
                </p>
              ) : (
                ""
              )}
            </div>
            <div
              className={`${
                isBtnCenter
                  ? "d-flex justify-content-center pay_btn_cneter"
                  : "d-flex justify-content-end"
              }`}
            >
              <div className="align-self-center pay_content_right">
                <h5 className="total_payment_detail">
                  <strong> {totalTicketPrice.toLocaleString()} PKR</strong>
                </h5>
                <p className="payment_subtitle">
                  total inclusive, of all taxes
                </p>
              </div>
              <div className="move_payment_button p-3">
                <button
                  onClick={() => {
                    if (
                      paymentType === "paypro" ||
                      paymentType === "easypaisa" ||
                      paymentType === "jazzcash"
                    ) {
                      payOnlineHandler();
                    } else {
                      BookingDetail();
                    }
                  }}
                  type="button"
                  className={`btn btn-primary pay_now_btn ${
                    !checked ? "disable_cursr" : "activ_cursor"
                  }`}
                  disabled={!checked || isEmpty}
                >
                  {
                    // Display button text based on paymentType
                    paymentType === "paypro" ||
                    paymentType === "easypaisa" ||
                    paymentType === "jazzcash" ? (
                      <p>Pay Now</p>
                    ) : (
                      <p>Submit</p>
                    )
                  }
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PrivacyPolicyCheck;
