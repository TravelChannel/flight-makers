import { React, Fragment, useContext , useEffect} from 'react'
import { calculateTax } from '../../helpers/taxCalculation'
import { TicketPriceContext } from './Comman/Context';
import { useFormData } from '../../Context/FormDataContext';
const TotalPriceCalculation = () => {
    const flightData = JSON.parse(localStorage.getItem("bookingTicket"));
    const {extraBagg } = useContext(TicketPriceContext);
    const {serviceCharges} =useFormData();

       
    // console.log("PriceCalPage",{serviceCharges});
    const classtype = flightData.classtype;
    const classType =
        classtype === 'Economy'
            ? 'Y'
            : classtype === 'Business class'
                ? 'C'
                : classtype === 'First class'
                    ? 'P'
                    : classtype === 'Premium economy'
                        ? 'S'
                        : null;

    const destination = [flightData.groupDescription[0].arrivalLocation, flightData.groupDescription[0].departureLocation];
    const airline = flightData.fare.governingCarriers.split(" ")[0];
    // console.log(classType,destination,airline);
    const ticketPrice = flightData.fare.totalFare.equivalentAmount;
    const taxAmount = flightData.fare.totalFare.totalTaxAmount;
    let totalAmount = ticketPrice + taxAmount + extraBagg;
    const servicefees = (taxfees=0) => {

        const serviecFees = (totalAmount * taxfees) / 100;
        totalAmount = totalAmount + serviecFees;
        return serviecFees.toFixed(0);
    };

    // const taxfees = calculateTax(destination, airline, classType);
    const taxfees = serviceCharges
    const calculatedServiceFees = servicefees(taxfees);
    const totalTicketPrice = totalAmount.toFixed(0);

    // console.log('totalTicketPrice---v1',totalTicketPrice);

     // calculation of Bank charges 
    //  const bankPercentage = 2.32;
    //  const BankCharges = Math.round((totalTicketPrice * bankPercentage) / 100);
    //  console.log("BankCharges-calculated-v1",BankCharges);




    const exchangeRateUsed = flightData.fare.passengerInfoList[0]?.passengerInfo.currencyConversion?.exchangeRateUsed?.toFixed(2);
    localStorage.setItem("totalTicketPrice", JSON.stringify(totalTicketPrice));

    const userAmount = {
        BaseFare:ticketPrice,
        taxAmount :taxAmount,
        ServiceCharges:calculatedServiceFees,
        totalTicketPrice:totalTicketPrice
    }
    localStorage.setItem("UserAmount", JSON.stringify(userAmount));
    // console.log("Amount Object",userAmount);
    // console.log(exchangeRateUsed)
    return (
        <Fragment>
            <div className='price_content_center mb-4'>
                <div className="total_price_main align-self-center">
                    <div className="d-flex justify-content-between">
                        <div>
                            <p className="tp_title">Total Price </p>
                        </div>

                        <h4 className='price_quantity'>{`${Number(totalTicketPrice).toLocaleString()} PKR`}</h4>
                    </div>
                    <div className='tp_sepration_line'></div>
                    <div className="d-flex justify-content-between">
                        <div className="tp_fair_detail">
                            <p>Base Fare</p>
                            <p>Taxes</p>
                            <p>Extra Baggages</p>
                            {/* <p>Bank Charges</p> */}
                            <p>Service Charges</p>
                           
                        </div>
                        <div className="tp_fair_detail">
                            <p>{`${ticketPrice.toLocaleString()} PKR`}</p>
                            <p>{`${taxAmount.toLocaleString()} PKR`}</p>
                            <p>{`${extraBagg.toLocaleString()} PKR`}</p>
                            {/* <p>{`${BankCharges.toLocaleString()} PKR`}</p> */}
                            <p>{`${Number(calculatedServiceFees).toLocaleString()} PKR`}</p>
                            
                        </div>
                    </div>

                    {/* {exchangeRateUsed !== undefined ? (
                        <marquee className="marquee_tag mt-3">
                            {`Exchange Rate: ${exchangeRateUsed}`}
                        </marquee>
                    ) : null} */}
                </div>
            </div>
        </Fragment>
    )
}

export default TotalPriceCalculation;