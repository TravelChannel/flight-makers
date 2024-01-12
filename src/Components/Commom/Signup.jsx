import React ,{useState} from 'react';
import OTPSlider from './OTPSlider';
import { useNavigate } from 'react-router';
import userDetailsBackend from '../../API/BackendAPI/BackendAPI_Fun';

const SignUp = () => {
    const [backLoading , setBackLoading] =useState(false);
    const [userData ,setUser] = useState(null);
    const navigate = useNavigate();

    const OpenUserPanel = ()=>{
        navigate('/userPanel');
    }

    const fetchBackendData =async()=>{
        try{
            console.log("ello_g",userData);
            const userData =   await userDetailsBackend(setBackLoading);
            
           
        }
        catch (error){
            console.error(error);
        }
    } 

    // const userDetailsBackend = () => {
    //     setBackLoading(true);
        
    //     apiClient
    //       .get(`/pnrBooking`)
    //       .then((response) => {
    //         console.log(JSON.stringify(response));
    //         setBackLoading(false); 
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         setBackLoading(false); 
    //       });
    //   };



    return (
        <div className='container'>
            <div className='row py-4 bg-white m-0'>
                <div className='col-md-7'> <OTPSlider /></div>
                <div className='col-md-5 align-self-center'>
                    <div class="main_login_card">
                        <input className='signupinput' type="checkbox" id="chk" aria-hidden="true" />

                        <div class="signup">
                            <form>
                                <label className='label_signup' for="chk" aria-hidden="true">Sign up</label>
                                <input className='signupinput' type="text" name="txt" placeholder="User name" />
                                <input className='signupinput' type="email" name="email" placeholder="Email" />
                                <input className='signupinput' type="password" name="pswd" placeholder="Password" />
                                <button className='submit_sign_button'>Sign up</button>
                            </form>
                        </div>
                        <div class="login">
                            <form>
                                <label className='label_signup' for="chk" aria-hidden="true">Login</label>
                                <input className='signupinput' type="email" name="email" placeholder="Email" />
                                <input className='signupinput' type="password" name="pswd" placeholder="Password" />
                                <button className='submit_log_button'>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           {/* ---------------------- */}
                <div className='bg-white p-4'>
                    <button className='btn btn-success' onClick={OpenUserPanel}> Access to backend Panel</button>
                </div>
           {/* ---------------------- */}

        </div>
    );
}

export default SignUp;