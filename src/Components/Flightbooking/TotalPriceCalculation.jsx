import { React, Fragment, useContext} from 'react'
import { calculateTax } from '../../helpers/taxCalculation'
import { TicketPriceContext } from './Comman/Context';

const TotalPriceCalculation = () => {
    const flightData = JSON.parse(localStorage.getItem("bookingTicket"));
    const {extraBagg } = useContext(TicketPriceContext);
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
    const ticketPrice = flightData.fare.totalFare.totalPrice;
    const taxAmount = flightData.fare.totalFare.totalTaxAmount;
    let totalAmount = ticketPrice + taxAmount + extraBagg;
    const servicefees = (taxfees) => {

        const serviecFees = (totalAmount * taxfees) / 100;
        totalAmount = totalAmount + serviecFees;
        return serviecFees.toFixed(0);
    };

    const taxfees = calculateTax(destination, airline, classType);
    const calculatedServiceFees = servicefees(taxfees);
    const totalTicketPrice = totalAmount.toFixed(0);

    const exchangeRateUsed = flightData.fare.passengerInfoList[0]?.passengerInfo.currencyConversion?.exchangeRateUsed?.toFixed(2);
    localStorage.setItem("totalTicketPrice", JSON.stringify(totalTicketPrice));
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
                            <p>Service Charges</p>
                           
                        </div>
                        <div className="tp_fair_detail">
                            <p>{`${ticketPrice.toLocaleString()} PKR`}</p>
                            <p>{`${taxAmount.toLocaleString()} PKR`}</p>
                            <p>{`${extraBagg.toLocaleString()} PKR`}</p>
                            <p>{`${Number(calculatedServiceFees).toLocaleString()} PKR`}</p>
                            
                        </div>
                    </div>

                    {exchangeRateUsed !== undefined ? (
                        <marquee className="marquee_tag mt-3">
                            {`Exchange Rate: ${exchangeRateUsed}`}
                        </marquee>
                    ) : null}
                </div>
            </div>
        </Fragment>
    )
}

export default TotalPriceCalculation;