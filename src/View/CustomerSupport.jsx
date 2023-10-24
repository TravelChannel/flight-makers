import React, { useState } from "react";
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const Customersupport = () => {
    const [inputPNR, setInputPNR] = useState('');
    const handleInputChange = (event) => {
        setInputPNR(event.target.value);
    };
    const handlerBookingCheck = () => {
        const PNRNumber = inputPNR;
        setInputPNR('')
        const url = `/GetPNRItinerary?inputPNR=${PNRNumber}`;
        const target = '_blank';

        window.open(url, target);
    }
    return (
        <div className="container bg-white">
            <div className='contact_us_heading d-flex justify-content-center'>
                <SupportAgentRoundedIcon className='contact_detail_icon align-self-center' /><h1>Customer Support</h1>
            </div>
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
        </div>
    );
}

export default Customersupport;