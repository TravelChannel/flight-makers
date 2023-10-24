import {React,useState,useEffect} from 'react';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { CSSTransition } from "react-transition-group";
import CloseIcon from '@mui/icons-material/Close';
import PayOnline from '../BookingPayment/PayOnline';
import PrivacyPolicyCheck from '../BookingPayment/Comman/PrivacyPolicyCheck';
import JazzCashPay from '../BookingPayment/JazzCashPay';
import PayAtBranch from '../BookingPayment/PayAtBranch';
import CashOnDelivary from '../BookingPayment/CashOnDelivary';

const  SideBarMenu = ({selectedMethode,setSelectedMethode,setSubMenuSelected}) => {
// const [openCard , setOpenCard] = useState(true);
const [isMobile , setIsMobile] = useState(window.innerWidth<768);
const [isPayMore , setPayMore] = useState(false);
const [isJazzCash , setJazzCash] = useState(false);
const [isPayAtBranch , setPayAtBranch] = useState(false);
const [isCashDelivery , setCashDelivery] = useState(false);
const [checked, setChecked] =useState(false);
const [isEmpty , setIsEmpty] = useState(true);

 const handlePaymentMethode =(methode)=>{
  setSelectedMethode(methode);
  // setOpenCard(false);
  setSubMenuSelected(false);
  
 }

//  const handlesubmenu =(event)=>{
//   setSubMenuSelected(event);
//  }
  const handleOnlineMethode =()=>{
    // setOpenCard(true);
    setSubMenuSelected('hbl_banking');
  }

  useEffect(()=>{
   const handlesize = () =>{
    setIsMobile(window.innerWidth<768);
   };
   window.addEventListener("resize" ,handlesize);
   return()=>{
    window.removeEventListener('resize' ,handlesize);
   }
  },[])
  // ----------------------------
  const handlePayMoreMethode = ()=>{
      setPayMore(!isPayMore);
  }
  const handleCloseCard = ()=>{
    setPayMore(false);
    setJazzCash(false);
    setPayAtBranch(false);
    setCashDelivery(false);
   }
  //  const handleJazzCash = () =>{
  //   setJazzCash(!isJazzCash);
  //  }
   const handlePayAtBranch = () =>{
    setPayAtBranch(!isPayAtBranch);
   }
   const handleCashDelivery = () =>{
    setCashDelivery(!isCashDelivery);
   }

  // ----------------------------

  
  return (
    <div className="payment_menu_main">
      {
        !isMobile && (
          <ul className="methodes_name">
      <li
        onClick={() => {
          handlePaymentMethode('Online_payment');
          handleOnlineMethode();
         
        }}
        className={`pay_methodes_spacing ${
          selectedMethode === 'Online_payment' ? 'backgorund_selected' : ''
        }`}
      >
        Online payment
        {selectedMethode === 'Online_payment' && (
          <KeyboardDoubleArrowRightIcon className="align-self-center pay_forward_icon" />
        )}
      </li>
      <li
        className={`methodes_distance pay_methodes_spacing ${
          selectedMethode === 'pay_at_branch' ? 'backgorund_selected' : ''
        }`}
        onClick={() => 
        {
            handlePaymentMethode('pay_at_branch');
           
        }}
      >
        Payment at Branch
        {selectedMethode === 'pay_at_branch' && (
          <KeyboardDoubleArrowRightIcon className="align-self-center pay_forward_icon" />
        )}
      </li>
      <li
        onClick={() => {
            handlePaymentMethode('cash_on_delivary');
           
        }}
        className={`pay_methodes_spacing ${
          selectedMethode === 'cash_on_delivary' ? 'backgorund_selected' : ''
        }`}
      >
        Cash on Delivery
        {selectedMethode === 'cash_on_delivary' && (
          <KeyboardDoubleArrowRightIcon className="align-self-center pay_forward_icon" />
        )}
      </li>
    </ul>
        )}
      {isMobile && (
         <div className='payments_methode'>
             <div className='d-flex justify-content-between mob_line_spacing' onClick={handlePayMoreMethode}>
                <div  className='d-flex justify-content-start'>
                    <LocalMallOutlinedIcon className='pay_icon_colors'/>
                    <h5 className='mob_methode_name align-self-center'>PayOnline</h5>
                </div>
                   <KeyboardArrowRightIcon className='mob_forward_icon'/>
             </div>
             <div className='mob_doted_line'></div>
             <div className='d-flex justify-content-between mob_line_spacing' onClick={handlePayAtBranch}>
                  <div  className='d-flex justify-content-start'>
                    <MapsHomeWorkOutlinedIcon className='pay_icon_colors'/>
                    <h5 className='mob_methode_name align-self-center'> Pay at Branch</h5>
                  </div>
                   <KeyboardArrowRightIcon className='mob_forward_icon'/>
             </div>
             <div className='mob_doted_line'></div>
             <div className='d-flex justify-content-between mob_line_spacing' onClick={handleCashDelivery}>
                  <div  className='d-flex justify-content-start'>
                    <DeliveryDiningIcon className='pay_icon_colors'/>
                    <h5 className='mob_methode_name align-self-center'> Cash on Delivery</h5>
                  </div>
                   <KeyboardArrowRightIcon className='mob_forward_icon'/>
             </div>
             <div className='mob_doted_line'></div>
         </div>
        )}

        {isPayMore && (
            <CSSTransition in={isPayMore} timeout={1000} classNames="fade" unmountOnExit >
                <div className="disply_mob_menu_mob">
                     <div className=" d-flex justify-content-between filter_mob_top ">
                                <div className="edit_search_mob">
                                  <h4>PayOnline</h4>
                                </div>
                                <div>
                                  <CloseIcon onClick= {handleCloseCard}  className="mob_cross_border" />
                                </div>
                     </div>
                    <div className='mob_flight_card'>
                         <PayOnline/>
                         {/* <PrivacyPolicyCheck checked = {checked} setChecked = {setChecked} isEmpty={isEmpty} setIsEmpty={setIsEmpty}/> */}
                   </div>
                </div>
             </CSSTransition>
          ) }
          {isJazzCash && (
            <CSSTransition
            in={isJazzCash}
            timeout={1000}
            classNames='fade'
            unmountOnExit
            >
            <div className="disply_mob_menu_mob">
              <div className=" d-flex justify-content-between filter_mob_top ">
                <div className="edit_search_mob">
                  <h4>JazzCash</h4>
                </div>
                <div>
                  <CloseIcon onClick= {handleCloseCard}  className="mob_cross_border" />
                </div>
                    </div>
                <div className='mob_flight_card'>
                  <JazzCashPay/>
                  <PrivacyPolicyCheck checked = {checked} setChecked = {setChecked} isEmpty={isEmpty}/>
                 </div>
            </div>
            </CSSTransition>
                  ) }
            {isPayAtBranch && (
            <CSSTransition
            in={isPayAtBranch}
            timeout={1000}
            classNames='fade'
            unmountOnExit
            >
             <div className="disply_mob_menu_mob">
               <div className=" d-flex justify-content-between filter_mob_top ">
                  <div className="edit_search_mob">
                    <h4>PayAtBranch</h4>
                  </div>
                  <div>
                    <CloseIcon onClick= {handleCloseCard}  className="mob_cross_border" />
                  </div>
             </div>
              <div className='mob_flight_card'>
            <PayAtBranch/>
            <PrivacyPolicyCheck checked = {checked} setChecked = {setChecked} isEmpty={isEmpty}/>
            </div>
           </div>
            </CSSTransition>
                  ) }
           {isCashDelivery && (
            <CSSTransition
            in={isCashDelivery}
            timeout={1000}
            classNames='fade'
            unmountOnExit
            >
             <div className="disply_mob_menu_mob">
                <div className=" d-flex justify-content-between filter_mob_top ">
                  <div className="edit_search_mob">
                    <h4>Cash On Delivery</h4>
                  </div>
                  <div>
                    <CloseIcon onClick= {handleCloseCard}  className="mob_cross_border" />
                  </div>
                </div>
               <div className='mob_flight_card'>
                    <CashOnDelivary checked = {checked} setChecked = {setChecked} isEmpty={isEmpty} setIsEmpty={setIsEmpty} />
                    <PrivacyPolicyCheck checked = {checked} setChecked = {setChecked} isEmpty={isEmpty}/>
              </div>
          </div>
            </CSSTransition>
                  ) }
  </div>
  )
}

export default SideBarMenu