import React from 'react';
import OTPSlider from './OTPSlider';

const SignUp = () => {

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

        </div>
    );
}

export default SignUp;