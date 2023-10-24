import React from 'react'
import PayAtBranch from './PayAtBranch';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const CashOnDelivary = ({isEmpty,setIsEmpty}) => {
  const handleEmpty =(event)=>{
    const inputValue = event.target.value;
    if (inputValue.length===0){
      setIsEmpty(true);
    } else {
      setIsEmpty (false);
    }
  }
  return (
    <div className='pay_on_delivry_main'>
      <div className='pay_location_main'>
      <h6 className='pay_location_heading'>Enter Your Location</h6>
          <Box
            sx={{
              m: 1, 
              width:'100%',
              maxWidth: 500,
              '& .MuiInputBase-input': {
                  height: '12px',
                },
            }}
          >
            <TextField 
            fullWidth label="Your Location" 
            id="fullWidth" 
            onChange={handleEmpty}
              />
        </Box>
        {
        isEmpty && (
          <p className="location_message">Please Enter your Exact Location</p>

        )
      }
      </div>
      
      <div>
        <PayAtBranch/>
      </div>
    </div>
  )
}

export default CashOnDelivary;