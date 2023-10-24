import {React,useState,Fragment} from 'react';
import * as images from '../../Constant/images';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
const PayOnline = () => {
  const [isMonth , setMonth] = useState('');
  const [isYear , setYear] = useState('');
  const [CardNum , setCardNum] = useState('');
  const [cardName ,setCardName] = useState('');
  const [isCvv , setIsCvv] =useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({length:20},(_ , index)=>currentYear + index);

  const handleMonth = (event)=>{
    setMonth(event.target.value);
  }

  const handleYear = (event) =>{
    setYear (event.target.value);
  }
  const handleCardNum = (event) =>{
  const inputvalue = event.target.value;
  const sanitizedValue = inputvalue.replace(/\D/g, '').slice(0, 14);

  const truncatedval  = sanitizedValue.slice(0,14);
  setCardNum(truncatedval);
  }
  const handleCardName =(event)=>{
  const username = event.target.value;
  const sanitizedName = username.replace(/[^A-Za-z]+/g, '');
  setCardName(sanitizedName)
  }
  const handleCvv =(event)=>{
 const inputValue = event.target.value;
 const sanitizedValue = inputValue.replace(/\D/g,'').slice(0,3);
 setIsCvv(sanitizedValue);
  }
  return (
    <Fragment>
        <div className='hbl_main'>
          <h6 className='pay_location_heading'>Enter Your Card Details</h6>
          <Box
          sx={{
              display:'flex',
              alignItems:'center',
              m:1,
              width:'100%',
               maxWidth:500,
              '& .MuiInputBase-input': {
                height: '12px',
                  },
              '& .MuiInputLabel-root': {
                color: '#999',
                fontSize: '13px',
                  },
            }}>
          <img src={images.hbllogo} alt="" width="20" height="20" className='hbl_logo_positioning' />
          <img src={images.visacardlogo} alt="" width="20" height="20" className='visa_logo_positioning' />
          <img src={images.mastercardlogo} alt="" width="20" height="20" className='master_logo_positioning' />

          <TextField 
          fullWidth label="Enter Card Number" 
          id="fullWidth"
          value={CardNum} 
          onChange={handleCardNum}
           />
          </Box>
        
        </div>
        <div className="card_further_detail">
           <div className="online_payment_components">
           <p className='expairy_date_heading'>Expairy Date:</p>
            <div className='d-flex justify-content-start w-100'>
            <div className='date_width_control online_payment_padding'>
                  <FormControl sx={{ m: 1, width: '100%', maxWidth: 200}}>
                    <Select
                      value={isMonth}
                      onChange={handleMonth}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      
                      MenuProps={{
                            anchorOrigin: {
                              vertical: 'bottom', 
                              horizontal: 'center',
                            },
                            transformOrigin: {
                              vertical: 'top', 
                              horizontal: 'center', 
                            },
                            getContentAnchorEl: null,
                            PaperProps: {
                                  style: {
                                    maxHeight: 220,
                                  },
                                },
                          }}
                          
                      sx={{height:'45px',
                      '& .MuiInputLabel-root': {
                            color:' #999',
                            fontSize: '13px',
                          },
                          '& .MuiInputBase-input': {
                              fontSize: '14px', 
                            },
                            }}
                    >
                      <MenuItem value=''>
                        {isMonth === '' && (<em className="month_font_size">Month</em>)}
                      </MenuItem>
                      <MenuItem  value={1} className="month_font_size">January (01)</MenuItem>
                      <MenuItem  value={2}  className="month_font_size">February (02)</MenuItem>
                      <MenuItem  value={3} className="month_font_size">March (03)</MenuItem>
                      <MenuItem  value={4} className="month_font_size">April (04)</MenuItem>
                      <MenuItem  value={5} className="month_font_size">May (05)</MenuItem>
                      <MenuItem  value={6} className="month_font_size">June (06)</MenuItem>
                      <MenuItem  value={7} className="month_font_size">July (07)</MenuItem>
                      <MenuItem  value={8} className="month_font_size">August (08)</MenuItem>
                      <MenuItem  value={9} className="month_font_size">September (09)</MenuItem>
                      <MenuItem  value={10} className="month_font_size">October (10)</MenuItem>
                      <MenuItem  value={11} className="month_font_size">November (11)</MenuItem>
                      <MenuItem  value={12} className="month_font_size">December (12)</MenuItem>
                    </Select>
                  </FormControl>
              </div>
              <div className='date_width_control'>
                  <FormControl sx={{ m: 1, width: '100%', maxWidth: 200}}>
                    <Select
                      value={isYear}
                      onChange={handleYear}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      
                      MenuProps={{
                            anchorOrigin: {
                              vertical: 'bottom', 
                              horizontal: 'center',
                            },
                            transformOrigin: {
                              vertical: 'top', 
                              horizontal: 'center', 
                            },
                            getContentAnchorEl: null,
                            PaperProps: {
                                  style: {
                                    maxHeight: 220,
                                  },
                                },
                          }}
                      sx={{height:'45px',
                      '& .MuiInputLabel-root': {
                            color:' #999',
                            fontSize: '13px',
                          },
                          '& .MuiInputBase-input': {
                              fontSize: '14px', 
                            },
                            }}
                    >
                      <MenuItem value=''>
                        {isYear === '' && (<em className="month_font_size">Year</em>)}
                      </MenuItem>
                    {
                      years.map((year)=>(
                        <MenuItem  value={year} className="month_font_size">{year}</MenuItem>
                      ))
                    }
                    </Select>
                  </FormControl>
              </div>
            </div>
           </div>
            <div className="online_payment_components">
            <p className='expairy_date_heading'>Account Holder Name:</p>
                <Box
              sx={{
                  display:'flex',
                  alignItems:'center',
                  m:1,
                  width:'100%',
                  maxWidth:500,
                  '& .MuiInputBase-input': {
                    height: '12px',
                      },
                  '& .MuiInputLabel-root': {
                    color: '#999',
                    fontSize: '13px',
                      },
                }}>
              <TextField fullWidth 
              label="Name as on Card" 
              id="fullWidth"
              value = {cardName}
              onChange={handleCardName}
               />
              </Box>
            </div>
            <div className="online_payment_components">
            <p className='expairy_date_heading'>CVV:</p>
                <Box
              sx={{
                  display:'flex',
                  alignItems:'center',
                  m:1,
                  width:'30%',
                  maxWidth:500,
                  '& .MuiInputBase-input': {
                    height: '12px',
                      },
                  '& .MuiInputLabel-root': {
                    color: '#999',
                    fontSize: '13px',
                      },
                }}>
              <TextField
               fullWidth label="CVV" 
               id="fullWidth"
               type='password'
               value={isCvv}
               onChange={handleCvv}
                />
              </Box>
            </div>
        </div>
 
    </Fragment>
  )
}

export default PayOnline;