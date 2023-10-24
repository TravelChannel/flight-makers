import { React, Fragment, useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { requestGetpaymentToken } from '../../../API/index';

const PrivacyPolicyCheck = (props) => {
    const [isMobile, setMobile] = useState(window.innerWidth < 768);
    const [isBtnCenter, setBtnCenter] = useState(window.innerWidth < 468);
    const { checked, setChecked, isEmpty,paymentType} = props;
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };
    const gettingTicketPrice = JSON.parse(localStorage.getItem("totalTicketPrice"));
    const totalTicketPrice = Number(gettingTicketPrice).toLocaleString();
    useEffect(() => {
        const handleSize = () => {
            setMobile(window.innerWidth < 768);
            setBtnCenter(window.innerWidth < 468);
        };
        window.addEventListener("resize", handleSize);
        return () => {
            window.removeEventListener('resize', handleSize);
        }
    }, []);
    const payOnlineHandler = async () => {
        let paymentCode;
        let iframe_id;
      
        switch (paymentType) {
          case "paypro":
            paymentCode = 117547;
            iframe_id = 134320; // Only set for "paypro"
            break;
          case "easypaisa":
            paymentCode = 118906;
            break;
          default:
            paymentCode = 118909;
            break;
        }
      
        try {
          const paymentToken = await requestGetpaymentToken(paymentCode);
          console.log(paymentToken.token);
      
          if (paymentType === "paypro") {
            window.location.href = `https://pakistan.paymob.com/api/acceptance/iframes/${iframe_id}?payment_token=${paymentToken.token}`;
          } else {
            window.location.href = `https://pakistan.paymob.com/iframe/${paymentToken.token}`;
          }
        } catch (error) {
          console.error(error);
        }
      };
      
    return (
        <Fragment>
            {
                !isMobile && (
                    <div>
                        <div className='d-flex justify-content-between'>
                            <div className='policy_check_main d-flex justify-content-start'>
                                <div className='align-self-center'>
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                </div>
                                <div className='privacy_policy_content '>
                                    <p>I acknowledge and accept the rules, restrictions, <span className='privacy_policy_linked'>booking policy, <br /></span> <span className='privacy_policy_linked'>privacy policy</span>, and <span className='privacy_policy_linked'>terms and conditions</span> of faremakers.
                                    </p>
                                </div>
                            </div>

                            <div className='d-flex justify-content-start'>
                                <div className='align-self-center pay_content_right' >
                                    <h5 className='total_payment_detail'><strong>{totalTicketPrice.toLocaleString()} PKR</strong></h5>
                                    <p className='payment_subtitle'>total inclusive, of all taxes</p>
                                </div>
                                <div className="move_payment_button">
                                    <button
                                        onClick={payOnlineHandler}
                                        type="button"
                                        className={`btn btn-primary pay_now_btn ${!checked ? 'disable_cursr' : 'activ_cursor'}`}
                                        disabled={!checked || isEmpty}  >
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {!checked ? (<p className='warning_terms_alert'>Please accept the terms and conditions to proceed with this booking. </p>
                            ) : ('')}
                        </div>
                    </div>
                )
            }
            {
                isMobile && (
                    <div>
                        <div className='policy_check_main d-flex justify-content-start'>
                            <div className='align-self-center'>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </div>
                            <div className='privacy_policy_content align-self-center'>
                                <p>I acknowledge and accept the rules, restrictions, <span className='privacy_policy_linked'>booking policy,</span> <span className='privacy_policy_linked'>privacy policy</span>, and <span className='privacy_policy_linked'>terms and conditions</span> of faremakers.
                                </p>
                            </div>
                        </div>
                        <div>
                            {!checked ? (<p className='warning_terms_alert'>Please accept the terms and conditions to proceed with this booking. </p>
                            ) : ('')}
                        </div>
                        <div className={`${isBtnCenter ? 'd-flex justify-content-center pay_btn_cneter' : 'd-flex justify-content-end'}`}>
                            <div className='align-self-center pay_content_right' >
                                <h5 className='total_payment_detail'><strong> {totalTicketPrice.toLocaleString()} PKR</strong></h5>
                                <p className='payment_subtitle'>total inclusive, of all taxes</p>
                            </div>
                            <div className="move_payment_button">
                                <button
                                    type="button"
                                    className={`btn btn-primary pay_now_btn ${!checked ? 'disable_cursr' : 'activ_cursor'}`}
                                    disabled={checked && isEmpty}  >
                                    Pay Now
                                </button>
                            </div>
                        </div>

                    </div>
                )
            }
        </Fragment>
    );
};

export default PrivacyPolicyCheck;