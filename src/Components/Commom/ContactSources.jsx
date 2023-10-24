import {React,Fragment} from 'react';
import * as images from '../../Constant/images';
const ContactSources = () => {
  return (
   <Fragment>
     <h5 className='contact_details'>Need Any Help ? Contact with Us</h5>
    <div className='d-flex justify-content-around  contact_links flex-wrap'>
       <div className='contact_container'>
           <img src={images.UAN} alt="" className='UAN_image' width='48px' />
           <p className='contact_phone_no'>UAN: <span className='contact_ph_size'>03111147111</span></p>
       </div>
       <div className='contact_container'>
           <img src={images.whatsappicon} alt="" className='UAN_image' width='48px' />
           <p className='contact_phone_no'>WhatsApp: <span className='contact_ph_size'>03111147111</span></p>
       </div>
       <div className='contact_container'>
           <img src={images.Mail} alt="" className='UAN_image' width='48px' />
           <p className='contact_phone_no'>Email: <span className='contact_ph_size'>support@faremakers.com</span></p>
       </div>
    </div>
    
   </Fragment>
  )
}

export default ContactSources;