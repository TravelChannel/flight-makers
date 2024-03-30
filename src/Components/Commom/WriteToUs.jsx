import React,{Fragment ,useState} from 'react';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const WriteToUs = () => {
    const [Query ,setQuery] = useState();
    const handleQuery = (event) =>{
        setQuery(event.target.value);
    }
  return (
    <div className='container bg-white'>
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
                 <p className='write_us_label'>Share Your Queries and Feedback</p>
                <textarea
                    className="full_width_input blog_TextArea w-50 "
                    placeholder={"Write your Query to Us..."}
                    value={Query}
                    onChange={handleQuery}
                />
                 <div className="col-md-4 cs_booking_btn">
                        <div className="btn btn-primary btn-block">Submit</div>
                </div>
                
                 </div>
                   </Fragment>
    </div>
  )
}

export default WriteToUs;