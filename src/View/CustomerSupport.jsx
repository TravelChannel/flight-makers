import {React, useState,Fragment,useEffect}from "react";
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FAQs from "../Components/Commom/FAQs";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AirSialTravDetial } from "../API";
import { handleShowErrorAlert } from "../helpers/sweatalert";
import { useFormData } from "../Context/FormDataContext";

// ---------------------------
import { useNavigate } from "react-router";


const Customersupport = () =>{
    const navigate = useNavigate();
    const activepnrNumber = JSON.parse(localStorage.getItem("PNRNumber"));
    console.log("cspnrNumber",activepnrNumber);
    const [isbgColor , setBgColor] = useState(1);
    const [inputPNR, setInputPNR] = useState('');
    const [policy, setpolicy] = useState('refund');
    const [AirsialData , setAirsialData] = useState({});
    const [isLoading ,setLoading] = useState(false);
    const { formData, setFormData } = useFormData();

console.log("formData",formData);
    const handleChange = (event) => {
        setpolicy(event.target.value);
    };
    const handleInputChange = (event) => {
        setInputPNR(event.target.value);
    };
    const handlebgColor = (e) =>{
        setBgColor(e);
    }
    
    // const handlerBookingCheck = () => {
    //     const PNRNumber = inputPNR;
    //     if(PNRNumber ===activepnrNumber){
    //         setInputPNR('');
    //         const url = `/GetPNRItinerary?inputPNR=${PNRNumber}`;
    //         const target = '_blank';
    
    //         window.open(url, target);
    //     }
    //     else{
    //         handleShowErrorAlert('please Enter the Correct PNR');
    //     }
     
    // }

    const handlerBookingCheck = () => {
        const PNRNumber = inputPNR;
            setInputPNR('');
            const url = `/GetPNRItinerary?inputPNR=${PNRNumber}`;
            const target = '_blank';
    
            window.open(url, target);
    }

    // ------------------------------------------------------
 const fetchData = async()=>{
    const extra_Bagg = JSON.parse(localStorage.getItem("bookingTicket"));

    if (extra_Bagg?.schedualDetGet?.[0]?.[0]?.carrier?.operating === "PF"){
        try{
            setLoading(true);
            const airsialtravllersDetail = await AirSialTravDetial(formData,activepnrNumber);
            console.log("airsialtravllersDetail",airsialtravllersDetail);
            setAirsialData(airsialtravllersDetail);
            setLoading(false);
    
        }catch(error){
            console.error("Error", error);
        }
    
     }

    }
 useEffect(()=>{
    fetchData();
 },[])

 const AirSialFinalPNR  = AirsialData?.Response?.Data?.PNR;

 console.log("AirSialFinalPNR",AirSialFinalPNR);
    // ------------------------------------------------------
    useEffect(() => {
        // Example condition: You can replace this with your own condition
        const userShouldAccessPage =  true;/* Your condition here */
    
        if (!userShouldAccessPage) {
          // Redirect the user to another page
          navigate('/some-other-page');
        }
      }, [navigate]);
    


    // ------------------------------------------------------


    return(
       <div className="container">
            <div className='contact_us_heading d-flex justify-content-center'>
            <SupportAgentRoundedIcon className='contact_detail_icon align-self-center'/><h3>Customer Support</h3>
            </div>
            <div className="CS_body">
                <div className="cs_top_menu d-flex justify-content-start">
                    <p className={`cs_menu_content rounded ${isbgColor===1 ? 'print_title rounded':''}`} onClick={()=>handlebgColor(1)}>Print Your Ticket</p>
                    <p className={`write_title  cs_menu_content  ${isbgColor===2 ? 'print_title rounded':''}`} onClick={()=>handlebgColor(2)}>Write to Us</p>
                    <p className={`faq_title cs_menu_content ${isbgColor===3 ? 'print_title rounded':''}`} onClick={()=>handlebgColor(3)}>FAQ</p>
                </div>
                <div className="support_methodes_main">
                 {isbgColor===1 &&(
                       <Fragment>
                       <div className="CS_body">
                <div className="support_methodes_main">
                    <div className="print_ticket text-center">
                        <label className='booking_heading'>Enter Your Booking ID <span className="required_sign">*</span></label>
                        <Box
                            sx={{
                                width: 500,
                                paddingTop: 0,
                                maxWidth: '100%',
                                margin: '0 auto'
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Booking ID"
                                value={inputPNR}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </div>
                    <div className="col-md-4 cs_booking_btn">
                        <div className="btn btn-primary btn-block" target="_blank" onClick={handlerBookingCheck}>Go to Booking</div>
                    </div>
                </div>
            </div>
            {/* </div> */}
                       </Fragment>
                    )
                 }
                 {isbgColor===2 &&(
                   <Fragment>
                 <div className="writeUs_main">
                 <label className='write_us_label'>Recieved From <span className="required_sign">*</span></label>
                 <Box
                            sx={{
                                width: 400,
                                paddingTop: 0,
                                maxWidth: '100%',
                                margin: '0 auto'
                            }}
                    >
                            <TextField
                               fullWidth
                                size="small"
                                label="Enter Name"
                            />
                 </Box>
                 <label className='write_us_label'>Phone<span className="required_sign">*</span></label>
                 <Box
                            sx={{
                                width: 400,
                                paddingTop: 0,
                                maxWidth: '100%',
                                margin: '0 auto'
                            }}
                    >
                            <TextField
                               fullWidth
                                size="small"
                                label="Enter Phone No"
                            />
                 </Box>
                 <div className="write_dropdown">
                 <label className='write_us_label'>Option of Request <span className="required_sign">*</span></label>
                 <Box sx={{ 
                    maxWidth: 400,
                     margin: '0 auto'
                     }}>
                <FormControl
                 fullWidth
                 size="small"
                 

                 >
                    <InputLabel id="demo-simple-select-label">Policy</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={policy}
                    label="Age"
                    onChange={handleChange}
                    >
                    <MenuItem value={'refund'}>Refund Ticket</MenuItem>
                    <MenuItem value={'cancle'}>Cancle Ticket</MenuItem>
                    </Select>
                </FormControl>
                </Box>
                 </div>
                 <div>
                 <label className='write_us_label'>Ticket No<span className="required_sign">*</span></label>
                 <Box
                            sx={{
                                width: 400,
                                paddingTop: 0,
                                maxWidth: '100%',
                                margin: '0 auto'
                            }}
                    >
                            <TextField
                               fullWidth
                                size="small"
                                label="Enter Ticket No"
                            />
                 </Box>
                 </div>
                 <div className="col-md-4 cs_booking_btn">
                        <div className="btn btn-primary btn-block" target="_blank" >Refund Payment</div>
                </div>
                
                 </div>
                   </Fragment>
                    )
                 }
                 {isbgColor===3 &&(
                   <FAQs/>
                    )
                 }
                 
                </div>
            </div>

           
       </div>
    );
}

export default Customersupport;