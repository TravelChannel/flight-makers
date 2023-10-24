import {React,useState,Fragment} from 'react';
import * as images from '../../Constant/images';
import 'react-datepicker/dist/react-datepicker.css';
import PrivacyPolicyCheck from './Comman/PrivacyPolicyCheck';
const PayOnline = () => {

  const [checked, setChecked] = useState(false);
  const [changeLogoColor , setLogoColor] = useState('paypro');



  const methode_change = (event)=>{
    setLogoColor(event);
  }
  return (
    <Fragment>
        <div className='online_main' >
           <div className='d-flex justify-content-between online_logo_spacing'>
              <div className={`paypro_main ${changeLogoColor ==='paypro' ? 'logoBackground':""}`} onClick={()=>methode_change('paypro')} > <img src={images.payprologo} alt=""  width ="100px" className='acive_bg_spacing'/></div>
              <div className={`hbl_main ${changeLogoColor ==='easypaisa' ? 'logoBackground':""}`} onClick={()=>methode_change('easypaisa')}> <img src={images.easypaisa_logo} alt=""  width ="100px" className='acive_bg_spacing'/></div>
              <div className={`jazzcash_main ${changeLogoColor ==='jazzcash' ? 'logoBackground':""}`} onClick={()=>methode_change('jazzcash')}> <img src={images.jazzcash_Logo} alt=""  width ="100px" className='acive_bg_spacing'/></div>
           </div>
        </div>
        <div className='privacy_policy_hero'>
             <PrivacyPolicyCheck checked={checked} setChecked={setChecked} paymentType={changeLogoColor}  />
        </div>
 
    </Fragment>
  )
}

export default PayOnline;