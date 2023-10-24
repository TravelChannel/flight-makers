import React from 'react';
import ConnectWithoutContactTwoToneIcon from '@mui/icons-material/ConnectWithoutContactTwoTone';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactUsDetails from '../Constant/ContactUsDetails';
import ContactSources from '../Components/Commom/ContactSources';


const Contact = () => {
  return (
    <div className='container'>
        <div className='contact_us_heading d-flex justify-content-center'>
        <ConnectWithoutContactTwoToneIcon className='contact_detail_icon align-self-center'/><h3>Contact Us</h3>
        </div>
        <div className='contact_us_body'>
          <ContactSources/>
         <h5 className='contact_details branches_heading '>You can also Visit Our Nearest Branch:</h5>

         <div className='row'>
         {
            ContactUsDetails.map((items,index)=>(
                <div className={`col-lg-4 col-md-6 col-sm-12  offices_detail_main ${index===ContactUsDetails.length-1 ? 'offset-md-4':''}`}>
                    <div className='offices_header d-flex justify-content-between'>
                        <p className="office_name" key={items.id}>{items.officeName}</p>
                        <p className="office_name" key={items.id}>{items.timing}</p>
                    </div>
                    <div className="offices_details text-center">
                    <p className="underText" key={items.id}>{items.address}</p>
                    <p className="underText" key={items.id}>{items.city}</p>
                    <p className="underText" key={items.id}>{items.uan}</p>
                    <p className="underText" key={items.id}>{items.email}</p>
                    </div>
              </div>
           ))
         }
            
         </div>
         <h5 className='contact_details branches_heading '>Engage With Us on Social Media</h5>
         <div className='d-flex justify-content-between social_contacts_main flex-wrap'>
            <div className="fb_connection d-flex justify-content-start">
              <FacebookOutlinedIcon className='fb_connect_icon'/> 
              <p className='fb_contact_content align-self-center'>Connect with Us on Facebook</p>
            </div>
            <div className="twitter_connection d-flex justify-content-start">
              <TwitterIcon className='twitter_connect_icon'/> 
              <p className='twiter_contact_content align-self-center'>Stay Connected on Twitter</p>
            </div>
            <div className="linkden_connection d-flex justify-content-start">
              <LinkedInIcon className='linkden_connect_icon'/> 
              <p className='linkden_contact_content align-self-center'>Follow us on LinkedIn  </p>
            </div>

         </div>
         
       </div>

    </div>
  )
}

export default Contact;