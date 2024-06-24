import React ,{useState} from 'react';
import * as images from '../../Constant/images';
import PrivacyPolicyCheck from '../BookingPayment/Comman/PrivacyPolicyCheck';

const PayThorughSwich = () => {
    const [checked, setChecked] = useState(false);
    let payThroughSwich =true;
  return (
    <div>
        <div className='mt-3 d-flex justify-content-center '>
            <img src={images.swichLogo} alt="" width='200px' className={`BeforeSwichlogoSelection ${checked ? 'SwichlogoBackground' :''}`}/>
        </div>
        <div className='privacy_policy_hero mt-3 '>
                <PrivacyPolicyCheck checked={checked} setChecked={setChecked} payThroughSwich={payThroughSwich}/>
        </div>
    </div>
  )
}

export default PayThorughSwich;