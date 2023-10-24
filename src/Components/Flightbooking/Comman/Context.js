// import React, { createContext, useState } from 'react';

// export const TicketPriceContext = createContext();

// export const TicketPriceProvider = ({ children }) => {
    
//     const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
//     const extraBaggage = parseInt(flightDetails.extraBaggages[1].AMOUNT);
//     const [extraBagg,setExtraBagg] = useState(extraBaggage);

//     return (
//         <TicketPriceContext.Provider value={{ extraBagg, setExtraBagg}}>
//             {children}
//         </TicketPriceContext.Provider>
//     );
// };
import React, { createContext, useState } from 'react';

export const TicketPriceContext = createContext();

export const TicketPriceProvider = ({ children }) => {
    
    const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
    let extraBaggValue = 0;

    if (flightDetails && flightDetails.extraBaggages && Array.isArray(flightDetails.extraBaggages) && flightDetails.extraBaggages.length > 1) {
        extraBaggValue = parseInt(flightDetails.extraBaggages[1].AMOUNT, 10);
    }
    const [extraBagg, setExtraBagg] = useState(extraBaggValue);

    return (
        <TicketPriceContext.Provider value={{ extraBagg, setExtraBagg}}>
            {children}
        </TicketPriceContext.Provider>
    );
};
