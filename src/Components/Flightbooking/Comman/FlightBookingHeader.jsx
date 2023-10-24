import {React,Fragment,useState,useEffect} from 'react';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { useNavigate } from 'react-router-dom';


const FlightBookingHeader = (props) => {
    const {pageTitle , icons, setTimer} = props;
    const[timerRunning, setTimerRunning] = useState(setTimer);
    const [isMobile , setIsMobile] = useState(window.innerWidth<500)
    const navigate = useNavigate();
    const handleIcon =() =>{
        switch(icons) {
            case 'BookingPayment' :
                return <ReceiptIcon className="main_heading_icon"/>
            default:
                return <PreviewOutlinedIcon className="review_icon_size"/>
        } 
    }
    useEffect(()=>{
        const handleResize = ()=>{
            setIsMobile(window.innerWidth<500);
        };
        window.addEventListener('resize' ,handleResize);
        return()=>{
        window.removeEventListener("resize",handleResize);
        }
    })
    useEffect(()=>{
        if(timerRunning>0){
           const interval = setInterval(()=>{
            setTimerRunning ((prevTimer)=>prevTimer-1);
           },1000);
           return ()=>{
            clearInterval(interval);
           }
        }
        else{
            localStorage.removeItem("bookingTicket");
            navigate('/');
        }
    },[timerRunning,navigate]);
    const minutes = Math.floor(timerRunning/60);
    const seconds = timerRunning % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}: ${seconds.toString().padStart(2, '0')}`;
  return (
    <Fragment>
        <div className="iti_heading d-flex justify-content-between">
            <div className='d-flex justify-content-start'>
                        <span className=" d-flex align-self-center">
                        {/* <PreviewOutlinedIcon className="review_icon_size"/> */}
                        {handleIcon()}
                        </span> 
                        <h4 className=" d-flex align-self-center review_spacing"> {pageTitle}</h4>
            </div>
            <div className={`${isMobile ? 'iti_mob_header':'d-flex justify-content-start'}`}>
                <p className="iti_header_timer align-self-center"> Remaining Time: </p>
                <span className='header_count_down align-self-center' >{formattedTime}</span>
            </div>
        </div>
    </Fragment>
  )
}

export default FlightBookingHeader;