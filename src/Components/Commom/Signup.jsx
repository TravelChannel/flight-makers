import React ,{useState} from 'react';
import OTPSlider from './OTPSlider';
import userDetailsBackend from '../../API/BackendAPI/BackendAPI_Fun';
import PhoneInput from 'react-phone-input-2';
// import { sendOTPCode } from '../../API';
import { sendOTPCode } from '../../API/BackendAPI/allAPICalls';
import OTPCode from './OTPCode';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { useNavigate } from 'react-router';
import Loader from '../../Loader/Loader';
const SignUp = () => {
   const navigate = useNavigate();

    const [isLoading , setLoading] =useState(false);
    const [userData ,setUser] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [isOTP ,setOTP] = useState(false);
    const [fromSingUp , setFromSignUp] = useState(false);

    // const navigate = useNavigate();
    const handlePhoneNumberChange = (value, country) => {
        const dialCode = country.dialCode;
    
        if (value.includes(dialCode)) {
          const numericPhoneNumber = value.replace(dialCode, '').replace(/\D/g, '');
          setPhoneNumber(numericPhoneNumber);
        } else {
          setPhoneNumber(value.replace(/\D/g, ''));
        }
        setCountryCode(dialCode);
      };
   
    // const OpenUserPanel = ()=>{
    //     navigate('/userPanel');
    // }

    const GetOTP =async ()=>{
        try{
          setLoading(true);
          const OTPResponce = await sendOTPCode(getOTPData); 
          console.log('OTPResponce',OTPResponce);
          if(OTPResponce.data.status === 'SUCCESS'){
            setOTP(true);
            setFromSignUp(true);
            setLoading(false);
          }else{
            console.log("error while fetching Data")
            // alert('error while fetching Data');
          }
        
        }catch(error){ 
       
          console.error('errorOTP',error);
          setLoading(false);
          // alert('error while Sending OTP' ,error);
          // alert(`Error while sending OTP: ${error.message}`);
          navigate('/signup');
        }
      }
      const backToNumber = ()=>{
        setOTP(false);
      }
    const getOTPData = {
        'countryCode':countryCode,
        'phoneNumber':phoneNumber
      }
    
      console.log("getOTPObj",getOTPData);

    return (
       
        isLoading ? (<Loader/>):(
          <div className='container'>
          <div className='row py-4 bg-white m-0'>
              <div className='col-md-7'> <OTPSlider /></div>
              <div className='col-md-5 align-self-center'>
                 <div className="main_login_card">
                      <input className='signupinput' type="checkbox" id="chk" aria-hidden="true" />
                      {
                          isOTP ?(''):(
                              <div className="signup">
                          <form>
                              <label className='label_signup2' for="chk" aria-hidden="true">Login</label>
                              {/* <input className='signupinput' type="text" name="txt" placeholder="User name" /> */}
                              <div className='signup_ph_input d-flex justify-content-center' >
                              <PhoneInput
                                      country={'us'}
                                      value={`+${countryCode} ${phoneNumber}`} 
                                      onChange={(value, country) => handlePhoneNumberChange(value, country)}
                                      placeholder="Enter your phone number"
                                      onlyCountries={['us' ,'pk']}
                                  />
                              </div>
                              {/* <input className='signupinput' type="email" name="email" placeholder="Email" /> */}
                              {/* <input className='signupinput' type="password" name="pswd" placeholder="Password" /> */}
                              
                          </form>
                          <button className='submit_sign_button ' onClick={GetOTP}>GET OTP </button>
                      </div>
                          )
                      }
                      <div className="login">
                      
                          <form>
                              <label className='label_signup'>Login</label>  
                             <div >
                             <p className='otp_message_set text-center sign_up_message_color'>Enter OTP sent to the number: {phoneNumber}</p>
                             <div className='login_otp'>
                             {
                                  <OTPCode  getOTPData = {getOTPData} fromSingUp ={fromSingUp}/>
                              }
                             </div>
                             </div>
                              {/* <input className='signupinput' type="email" name="email" placeholder="Email" />
                              <input className='signupinput' type="password" name="pswd" placeholder="Password" /> */}
                              {/* <button className='submit_log_button'>Login</button> */}
                          </form>
                      </div>
                  </div>
                      {/* )
                  } */}
              </div>
          </div>
      </div>
        )
    );
}

export default SignUp;