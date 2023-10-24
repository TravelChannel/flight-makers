import React, { useState, useEffect } from "react";
import * as image from "../Constant/images";
import FlightIcon from '@mui/icons-material/Flight';
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js';
import { useLocation } from "react-router-dom";
import { requestGetBooking } from '../API/index'
import Loader from '../Loader/Loader.jsx';

const Customersupport = () => {
    // const [confirmPayment, setConfirmPayment] = useState(false);
    const [loading, setLoading] = useState(true);
    const [getPNRData, setGetPNRData] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const inputPNR = searchParams.get('inputPNR');

    const pricingStatusName = getPNRData?.fares?.map(item => item.pricingStatusName) ?? [];

    const qrCodeValue = 'NSFTJQ';
    const qrCodeSize = 70;

    const encryptText = (text) => {
        const myKey = 'UmerSaleemTheCreatorOfThisClass1985';
        const encrypted = CryptoJS.TripleDES.encrypt(text, myKey).toString();
        return encrypted;
    };
    console.log("getPNRData",getPNRData)
    const hashEncripted = encryptText(qrCodeValue);
    const fetch = async () => {
        try {
            setLoading(true);
            const userDetails = await requestGetBooking();
            setGetPNRData(userDetails);
            setLoading(false);
        }
        catch (error) {
            console.error("Error", error)
        }
    }
    useEffect(() => {
        fetch();
    }, [])

    return (
        <div className='container'>
            {loading ? (
                <Loader />
            ) : (
                <div className="container bg-white p-5">
                    <div className="ticket_display">
                        <div className="d-flex justify-content-between">
                            <div id="logobox" className="hdrLogo" >
                                <img
                                    src={image.default}
                                    className="imgView"
                                    alt="FM-LOGO"
                                />
                                <span id="logotext" className="colorBlue d-block">
                                    Travel Channel Int'l (Pvt).Ltd
                                </span>
                            </div>
                            <h1 className="colorBlue">E-Reservation</h1>
                            <QRCode value={`https://fmcrm.azurewebsites.net/ViewItinerary.aspx?PNR=${hashEncripted}=`} size={qrCodeSize} />
                        </div>
                        <h6 className="text-danger mt-3">Payment is Pending</h6>
                        <div className="d-flex justify-content-between mt-5">
                            <h4>13 Oct 2023 to 31 Oct 2023</h4>
                            <h4>Lahore → DAMMAM </h4>
                        </div>
                        <table className="table table-bordered mt-3">
                            <thead>
                                <tr>
                                    <th>Passenger</th>
                                    <th>eTicket Receipt(s)</th>
                                    <th>Seats</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getPNRData.travelers[0].identityDocuments.map((item, index) => (
                                    <tr key={index}>
                                    <td>{`${item.givenName} ${item.surname}`}</td>
                                    <td>{pricingStatusName[index]}</td>
                                    <td>2142938226597</td>
                                    </tr>
                                ))}
                               { /*
                                <tr>
                                    <td>AHMAD/SAFIA MRS</td>
                                    <td>ACTIVE</td>
                                    <td>2142938226597</td>
                                </tr>*/}
                            </tbody>
                        </table>
                        <div className="d-flex justify-content-between mt-3">
                            <h6><span>Booking Reference:</span> {inputPNR}</h6>
                            <h6><span>Airline Reference:</span> DCPK*8PY9Y6</h6>
                        </div>
                        <div className="itineryDetailssty mt-4">
                            <div className="d-flex justify-content-start">
                                <div>
                                    <FlightIcon className="airplane-rotated-icon" />
                                </div>
                                <div>
                                    <h5>Departure:Friday 13 Oct</h5>
                                    <h6 className="verify_prior">Please verify flight times prior to departure</h6>
                                </div>
                            </div>
                            <div className="row my-3 ">
                                <div className="col-md-4 mb-3 ">
                                    <h4>PAKISTAN INTL AIRLINES</h4>
                                    <h5 className="mb-3">PK-647</h5>
                                    <p><span className="span_verify_prior mt-2">Duration: </span>03h:35m</p>
                                    <p><span className="span_verify_prior mt-2">Class: </span>V-ECONOMY CLASS</p>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div className="row">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h4 className="font-weight-bolder">LHE </h4>
                                                <p className="airport_ticket_bok">Alama Iqbal International Airport</p>
                                            </div>
                                            <div><FlightIcon className="plane-mark-rotated-icon" /></div>
                                            <div>
                                                <h4 className="font-weight-bolder">DMM  </h4>
                                                <p className="airport_ticket_bok">King Fahd International Airport</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <p>Departing At: <span className="ticket_book_det">15:55</span></p>
                                            <p>Terminal: <span className="ticket_book_det">Nill</span></p>
                                        </div>
                                        <div className="col">
                                            <p>Arrival  At: <span className="ticket_book_det">15:55</span></p>
                                            <p>Terminal: <span className="ticket_book_det">Nill</span></p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <p><span className="span_verify_prior mt-2">Aircraft: </span>772 BOEING 777-200 JET 285-305 STD SEATS</p>
                                    <p><span className="span_verify_prior mt-2">Stop(s): </span>00</p>
                                    <p><span className="span_verify_prior mt-2">Seat No: </span>0</p>
                                    <p><span className="span_verify_prior mt-2">Meals: </span>Yes</p>
                                    <p><span className="span_verify_prior mt-2">Baggage Allowence: </span>40 KG</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3">
                            <p className="ticket_book_heading">TERMS AND CONDITIONS</p>
                            <p>No terms and conditions found refer to GDS for more details</p>
                            <p className="ticket_book_heading border-top mt-3 pt-3">Travel Channel Int. Pvt. Ltd.</p>
                            <p>3-UGF, Century Tower, Kalma Chowk Main Boulevard, Gulberg-III Lahore, Pakistan</p>
                            <div className="d-flex justify-content-between mt-2">
                                <p><span className="span_verify_prior">E-mail: </span>support@faremakers.com</p>
                                <p><span className="span_verify_prior">UAN: </span> (+92-42) 03111-147-111</p>
                            </div>
                            <p className="border-top mt-3 pt-3"><span className="span_verify_prior">www.Faremakers.com </span>Powered By Travel Channel International (Pvt.) Ltd. Pakistan. Which is Nationwide IATA accredited company, Founded in 2003 & successfully operating the business in Lahore, Karachi & Islamabad. Our Goal is Making Travel Simple & Easy through Giving Best Travel Services all over the Pakistan.</p>
                        </div>
                    </div>

                </div>
            )}

        </div>
    );
}
export default Customersupport;