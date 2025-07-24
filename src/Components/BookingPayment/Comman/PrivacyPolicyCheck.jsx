import { React, Fragment, useState, useEffect, useRef } from "react";
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
import { v4 as uuidv4 } from "uuid";

const PrivacyPolicyCheck = (props) => {
  const navigate = useNavigate();

  const { formData, userVerName, backendFinalOBJ, setPNRLoading, userID } =
    useFormData();
  const { SessionData } = useAmadeusData();
  const formRef = useRef(null);
  const [isMobile, setMobile] = useState(window.innerWidth < 768);
  const [isBtnCenter, setBtnCenter] = useState(window.innerWidth < 468);
  const [isLoading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(uuidv4());
  const [getPNR, setPNR] = useState();
  const [formFields, setFormFields] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  let [handleBackendResp, sethandleBackendResp] = useState("");
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
  // console.log("gettingTicketPrice---v1",gettingTicketPrice);
  const totalTicketPrice = Number(gettingTicketPrice).toLocaleString();
  const UserAmount = JSON.parse(localStorage.getItem("UserAmount"));

  useEffect(() => {
    const updateIsMobile = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", updateIsMobile);
    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  // useEffect(() => {
  //   if (paymentType === "jazzcash" || paymentType === "paypro")
  //     fetchJazzCashFormData();
  // }, [orderId]);

  const fetchJazzCashFormData = async (pnrNum) => {
    const requestBody = {
      pp_TxnType: "",
      pp_BillReference: pnrNum, // replace with dynamically generated order ID if needed
      pp_CustomerID: userID, // replace with actual customer ID
      pp_Amount: UserAmount.totalTicketPrice,
      pp_CustomerMobile: userVerName,
      pp_PNR: "2",
    };

    // console.log("requestBody",requestBody);
    // debugger;

    try {
      // Await the response from the API call using apiClient
      const response = await apiClient.post(
        "/payment/PaymentAtJazzCash",
        requestBody
      );
      // The response is already processed by your interceptor
      // You can access the response data like this
      const params = response.data.serviceResponse;
      return params;
      // console.log(params);
      // setFormFields(params);
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error Fetching Payment Form:", error);
    } finally {
      // Ensure loading state is reset regardless of success or failure
      setPNRLoading(false);
    }
  };

  async function submitJazzCashForm(url, fields) {
    // Create a form element

    console.log("fields", fields);
    const form = document.createElement("form");
    form.method = "POST";
    form.action = url;

    // Loop through the JSON fields and append them to the form
    for (const key in fields) {
      if (fields.hasOwnProperty(key)) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = fields[key];
        form.appendChild(input);
      }
    }

    // Append the form to the document and submit it
    document.body.appendChild(form);
    form.submit();

    // Optional: Remove the form after submission to keep the DOM clean
    document.body.removeChild(form);
  }

  const handleSubmit = async () => {
    // Check if required conditions are met
    if (!checked || isEmpty) return;

    try {
      // First, call payOnlineHandler
      let pnrstatus = await payOnlineHandler();

      console.log("pnrstatus--log1", pnrstatus);
      // If payment type is "jazzcash", submit the form

      const formFields = await fetchJazzCashFormData(pnrstatus);
      console.log("formFields", formFields);
      if (formFields) {
        submitJazzCashForm(
          "https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform",
          formFields
        );
      } else {
        // Handle the error in case payOnlineHandler fails
        toast.error("Booking failed. Please try again later.");
      }
    } catch (error) {
      // Handle the error in case payOnlineHandler fails
      toast.error("Booking failed. Please try again later.");
    }
  };

  const payOnlineHandlerbk = async () => {
    setPNRLoading(true);
    try {
      //const pnrNum = "test";
      const pnrNum = await generatePnrNum();
      if (!pnrNum) {
        throw new Error("Error Generating Pnr Num");
      }
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
      handleBackendResp = await handleBackendData(orderId, pnrNum);
      if (!handleBackendResp) {
        handleShowErrorAlert(
          "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline +1 (484) 312-1100 for further details..."
        );
        throw new Error("Error Generating Pnr Num");
      } else {
      }
      // if (paymentType === "jazzcash") {
      // } else {
      //   // setPNRLoading(true);
      //   const paymentToken = await requestGetpaymentToken(
      //     paymentCode,
      //     userPhoneNum
      //   );
      //   //console.log("paymentTokenpaymentToken", paymentToken.createOrder);

      //   if (!paymentToken) {
      //     console.log("Error: paymentToken");
      //     throw new Error("Error paymentToken");
      //   }
      //   // console.log(paymentToken.token);
      //   const createOrder = paymentToken.createOrder;
      //   const OrderId = createOrder.id;
      //   const getPaymentToken1 = paymentToken.getPaymentToken;

      //   //console.log("paymentTokenResult", getPaymentToken1.token);
      //   //console.log("you are searching for me", createOrder);

      //   //console.log("-------------------Start-------------");
      //   //console.log("OrderId", OrderId);
      //   //console.log("pnrNum", pnrNum);
      //   const handleBackendResp = await handleBackendData(OrderId, pnrNum);
      //   if (!handleBackendResp) {
      //     //console.log("handleBackendResp", handleBackendResp);
      //     handleShowErrorAlert(
      //       "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline +1 (484) 312-1100 for further details..."
      //     );
      //     throw new Error("Error Generating Pnr Num");
      //   }
      //   //console.log("-------------End----------------------");

      //   if (paymentType === "paypro") {
      //     window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/${iframe_id}?payment_token=${getPaymentToken1.token}`;
      //   } else {
      //     window.location.href = `https://pakistan.paymob.com/iframe/${getPaymentToken1.token}`;
      //   }

      //   setPNRLoading(false);
      // }
    } catch (error) {
      console.error(error, error.message);
      console.log("catch");
      setPNRLoading(false);
    }
    setLoading(false);
  };

  const payOnlineHandler = async () => {
    setPNRLoading(true);
    try {
      let pnrNum = await generatePnrNum();
      console.log("pnrNum__log2", pnrNum);
      if (!pnrNum) {
        throw new Error("Error Generating Pnr Num");
      }

      handleBackendResp = await handleBackendData(orderId, pnrNum);
      if (!handleBackendResp) {
        handleShowErrorAlert(
          "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline +1 (484) 312-1100 for further details..."
        );
        throw new Error("Error Generating Pnr Num");
        return 0;
      }
      setPNRLoading(false);
      return pnrNum;
    } catch (error) {
      console.error(error, error.message);
      handleShowErrorAlert(
        "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline +1 (484) 312-1100 for further details..."
      );
      console.log("catch");
      setPNRLoading(false);
      return 0;
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
      console.log("sendSmsBranch", sendSmsBranch);
      // ----------Disabaled Sabre PNR Creatoin API-----------------
      // const pnrNum = await generatePnrNum();

      //  (1) Calling Amadeus PNR Creation API ----------------------------

      const fetch_PNR_Add_MultiElements =
        await PNR_Add_MultiElements_Final_Resp(SessionData, backendFinalOBJ);
      console.log("Amadeus PNR RESP", fetch_PNR_Add_MultiElements);

      let getPnrNum =
        fetch_PNR_Add_MultiElements?.data?.["soapenv:Envelope"]?.[
          "soapenv:Body"
        ]?.PNR_Reply?.pnrHeader;
      let pnrNum = Array.isArray(getPnrNum)
        ? getPnrNum[0]?.reservationInfo?.reservation?.controlNumber
        : getPnrNum?.reservationInfo?.reservation?.controlNumber;
      if (!pnrNum) {
        console.log("erroratGetPNR");
        throw new Error("Error Generating Pnr Num");
      }

      console.log("pnrNum", pnrNum);
      // (2) Calling PNR Retrieve API ----------------------------

      const pnrRetrieve = await PNR_Retrieve_Resp(SessionData, pnrNum);
      // console.log("pnrRetrieve",pnrRetrieve);

      // (3) Calling QueuePlace PNR API ----------------------------
      const queuePNR = await queuePNR_Resp(SessionData, pnrNum);

      //  (4) Ending the session after PNR Creation-------------------
      let signOut_SeqNum = 9;
      const signout = await SecuritySignOutResp(SessionData, signOut_SeqNum);

      // --------------------Temparary Disabled---------------------
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
        OrderId: OrderId,
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
    let getPNRNumber = "";
    try {
      // setPNRLoading(true);
      const PNRRespon = await PNR_Add_MultiElements_Final_Resp(
        SessionData,
        backendFinalOBJ
      );
      if (PNRRespon?.success === false) {
        const message =
          PNRRespon.data?.["soapenv:Envelope"]?.["soapenv:Body"]?.PNR_Reply;
        // handleShowErrorAlert(message);
        console.log("PNR-Message-2", message);
        handleShowErrorAlert(
          "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline +1 (484) 312-1100 for further details."
        );
      } else {
        if (PNRRespon?.success === true) {
          // let getPnrNum = fetch_PNR_Add_MultiElements?.data?.['soapenv:Envelope']?.['soapenv:Body']?.PNR_Reply?.pnrHeader;
          // let pnrNum = Array.isArray(getPnrNum) ? getPnrNum[0]?.reservationInfo?.reservation?.controlNumber : getPnrNum?.reservationInfo?.reservation?.controlNumber;
          let getPnrNum =
            PNRRespon?.data?.["soapenv:Envelope"]?.["soapenv:Body"]?.PNR_Reply
              ?.pnrHeader;
          getPNRNumber = Array.isArray(getPnrNum)
            ? getPnrNum[0]?.reservationInfo?.reservation?.controlNumber
            : getPnrNum?.reservationInfo?.reservation?.controlNumber; //Amadeus PNR
          const pnrPayment =
            PNRRespon?.CreatePassengerNameRecordRS?.AirPrice?.[0]?.PriceQuote
              ?.PricedItinerary?.TotalAmount;
          UserAmount.pnrPayment = pnrPayment || "100";
          console.log("PnrPayment-v2", UserAmount);
        } else {
          // -------------------------Temporary Disabeling the AirSial API-----------------------------

          // const finalPNR = await fetchData(getPNRNumber);
          // const airSialUserDetail = await airsialBookingDetail(getPNRNumber);
          // console.log("airSialUserDetail", airSialUserDetail);
          // ------------------------------------------------------------------------------------------------
          console.log(
            "you need to enable AIrSial API's to Run AIrSial Process"
          );
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

    const respServerPnrBooking = await CreateBooking(updatedBackendFinalOBJ);
    console.log("respServerPnrBooking_Check", respServerPnrBooking);
    // console.log(
    //   "checkForPayment1",
    //   respServerPnrBooking.data.payload.isAmountEqual
    // );
    if (respServerPnrBooking.data.status !== "SUCCESS") {
      handleShowErrorAlert(
        "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline +1 (484) 312-1100 for further details..."
      );
      throw new Error("Error: Server response status is not SUCCESS");
    } else if (respServerPnrBooking.data.status == "SUCCESS") {
      console.log("Reached here");
      return true;
    } else {
      handleShowErrorAlert(
        "Your Booking could not be retained due to an internal error from Airline. You can try another booking with different query or call our helpline +1 (484) 312-1100 for further details...."
      );
    }
    // };
  };

  const handleFormSubmit = () => {
    console.log(formRef.current);
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
                    terms and conditions,
                  </span>
                  <span
                    className="privacy_policy_linked"
                    onClick={() => window.open("/terms-of-service", "_blank")}
                  >
                    terms of Services
                  </span>
                  , and
                  <span
                    className="privacy_policy_linked"
                    onClick={() => window.open("/refund-policy", "_blank")}
                  >
                    Refund Policy
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
                  <strong>{totalTicketPrice.toLocaleString()} $</strong>
                </h5>
                <p className="payment_subtitle">
                  total inclusive, of all taxes
                </p>
              </div>
              <div className="move_payment_button">
                <form
                  ref={formRef} // Attach the ref to the form
                >
                  {Object.entries(formFields).map(([key, value]) => (
                    <input
                      key={key}
                      type="hidden"
                      name={key}
                      value={value || ""}
                    />
                  ))}

                  {/* <button type="submit" className="btn btn-primary">
                    Pay With Jazz Cash
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        paymentType === "paypro" ||
                        paymentType === "easypaisa" ||
                        paymentType === "jazzcash"
                      ) {
                        handleSubmit();
                      } else {
                        BookingDetail();
                      }
                    }}
                    type="submit"
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
                </form>
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
                    booking policy
                  </span>
                  ,
                  <span
                    className="privacy_policy_linked"
                    onClick={() => window.open("/terms-of-service", "_blank")}
                  >
                    privacy policy
                  </span>
                  , and
                  <span
                    className="privacy_policy_linked"
                    onClick={() =>
                      window.open("/terms-and-conditions", "_blank")
                    }
                  >
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
                  <strong> {totalTicketPrice.toLocaleString()} $</strong>
                </h5>
                <p className="payment_subtitle">
                  total inclusive, of all taxes
                </p>
              </div>
              <div className="move_payment_button">
                <form
                  ref={formRef} // Attach the ref to the form
                >
                  {Object.entries(formFields).map(([key, value]) => (
                    <input
                      key={key}
                      type="hidden"
                      name={key}
                      value={value || ""}
                    />
                  ))}

                  {/* <button type="submit" className="btn btn-primary">
                    Pay With Jazz Cash
                  </button> */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      if (
                        paymentType === "paypro" ||
                        paymentType === "easypaisa" ||
                        paymentType === "jazzcash"
                      ) {
                        handleSubmit();
                      } else {
                        BookingDetail();
                      }
                    }}
                    type="submit"
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
                </form>
              </div>
              {/* <div className="move_payment_button p-3">
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
              </div> */}
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default PrivacyPolicyCheck;
