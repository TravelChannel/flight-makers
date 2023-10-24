import { React, useState, useEffect } from 'react';
import TotalPriceCalculation from '../Components/Flightbooking/TotalPriceCalculation';
import HelpLineCard from '../Components/Commom/HelpLineCard';
import FlightBookingHeader from '../Components/Flightbooking/Comman/FlightBookingHeader';
import SideBarMenu from '../Components/BookingPayment/SideBarMenu';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import PayAtBranch from '../Components/BookingPayment/PayAtBranch';
import PayOnline from '../Components/BookingPayment/PayOnline';
import CashOnDelivary from '../Components/BookingPayment/CashOnDelivary';
import JazzCashPay from '../Components/BookingPayment/JazzCashPay';
import MobBooking from '../Components/BookingPayment/Comman/MobBooking';
import { TicketPriceProvider } from '../Components/Flightbooking/Comman/Context';

const BookingPayment = () => {
   const [selectedMethode, setSelectedMethode] = useState('Online_payment');
   const [subMenuSelected, setSubMenuSelected] = useState('hbl_banking');
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
   // const [checked, setChecked] = useState(false);
   // const [isEmpty, setIsEmpty] = useState(true);
   // const [showPrivacyPolicy ,setPrivacyPolicy ] = useState(true);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth < 768);
      }
      window.addEventListener('resize', handleResize);
      return () => {
         window.removeEventListener('resize', handleResize);
      }
   }, [])

   return (
      <div className='container'>
         <div className="book_payment_hero">
            <div className="paymethodes_main">
               <div>
                  <FlightBookingHeader pageTitle="Pay to Secure Your Booking" icons="BookingPayment" setTimer="180" />
               </div>
               {!isMobile && (
                  <div className='row'>
                     <div className='col-md-9'>
                        <div className='payment_card d-flex justify-content-start w-100'>
                           <div className='payment_sidebar'>
                              <SideBarMenu selectedMethode={selectedMethode} setSelectedMethode={setSelectedMethode} subMenuSelected={subMenuSelected} setSubMenuSelected={setSubMenuSelected} />
                           </div>
                           <div className="sidebar_booking_sepration">
                              <div className="seprator">
                                 <DonutLargeIcon className="donut_size" />
                                 <div class="vertical-line-2"></div>
                                 <DonutLargeIcon className="donut_size" />
                              </div>
                           </div>
                           <div className='payment_card_main'>
                              <div>
                                 {subMenuSelected === 'hbl_banking' && <PayOnline  />}
                                 {subMenuSelected === 'jazzCash' && <JazzCashPay />}
                                 {selectedMethode === 'pay_at_branch' && <PayAtBranch subChild={true}/>}
                                 {selectedMethode === 'cash_on_delivary' && <CashOnDelivary/>}
                              </div>

                           </div>

                        </div>
                        {/* <div className='privacy_policy_hero'>
                           <PrivacyPolicyCheck checked={checked} setChecked={setChecked} isEmpty={isEmpty}  />
                        </div> */}
                     </div>
                     <div className='col-md-3 mob_hide_paymen'>
                        <div className='booking_price_card'>
                           <TicketPriceProvider>
                              <TotalPriceCalculation />
                           </TicketPriceProvider>
                        </div>
                        <div>
                           <HelpLineCard help_price_card="help_price_card" />
                        </div>
                     </div>
                  </div>
               )}
               {
                  isMobile && (
                     isMobile && (
                        <MobBooking />
                     )
                  )
               }
            </div>
         </div>
      </div>
   )
}

export default BookingPayment;
