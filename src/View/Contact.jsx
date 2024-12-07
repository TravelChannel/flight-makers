import React ,{Fragment} from 'react';
import ConnectWithoutContactTwoToneIcon from '@mui/icons-material/ConnectWithoutContactTwoTone';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContactSources from '../Components/Commom/ContactSources';
import LahoreBranches from '../Constant/ContactUsDetails';
import { OtherCityBranches } from '../Constant/ContactUsDetails';
import * as images from '../Constant/images';

const Contact = () => {
  return (
    <div className='container'>
        <div className='contact_us_heading d-flex justify-content-center'>
        <ConnectWithoutContactTwoToneIcon className='contact_detail_icon align-self-center'/><h3>Contact Us</h3>
        </div>
        <div className='contact_us_body'>
          <ContactSources/>    

         <h5 className='branches_details branches_heading '>You can also Visit Our Nearest Branch:</h5>
         <div className="highlight-container">
             <p className="highlight-message">Our head office is open on Sunday as well, from 9:00 AM to 2:00 PM. We look forward to serving you!</p>
          </div>
         <div className='row'>
          <div className='d-flex justify-content-center my-1'>
          <h5 className='contact_details branches_heading align-self-center'>Lahore </h5>
            <img src={images.LahoreTower} alt="" className='tower_width'/>
            <h5 className='contact_details branches_heading align-self-center'> City</h5>
          </div>
          {
              LahoreBranches.map((item, index) => (
                  <div
                      key={item.id}
                      className={`col-lg-4 col-md-6 col-sm-12 offices_detail_main`}
                  >
                    {/* ${
                          index === LahoreBranches.length - 1 ? 'offset-md-4' : ''
                      } */} 
                      <div className={`offices_header ${item.status ? '':'d-flex justify-content-between'}`}>
                           {
                            item.status ? (
                              <div className='d-flex justify-content-between'>
                                  <div >
                                      <p className="office_name">{item.officeName}</p>
                                      <p className="office_name">{item.timing}</p>
                                  </div>
                                  <div className='status_background'>
                                      <p className='contactUS_status' >Temporarily Closed*</p>
                                  </div>
                              </div>
                            ):(
                             <Fragment>
                              <p className="office_name">{item.officeName}</p>
                              <p className="office_name">{item.timing}</p>
                             </Fragment>
                            )
                           }
                            
                      </div>
                      <div className="offices_details text-center">
                          <p className="underText">{item.address}</p>
                          <p className="underText">{item.city}</p>
                          <p className="underText">{item.uan}</p>
                          <p className="underText">{item.email}</p>
                      </div>
                  </div>
              ))
          }
            
         </div>
         <div className='row'>
         <div className='d-flex justify-content-center my-1'>
          <h5 className='contact_details branches_heading align-self-center'>Other </h5>
            <img src={images.OtherCitiesImg} alt="" className='tower_width mx-3'/>
            <h5 className='contact_details branches_heading align-self-center'> Cities</h5>
          </div>
         {/* <h5 className='contact_details branches_heading '>Other Cities Branches</h5> */}
         {
          OtherCityBranches.map((items,index)=>(
                <div className={`col-lg-4 col-md-6 col-sm-12  offices_detail_main`}>
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
         <h5 className='branches_details branches_heading '>Engage With Us on Social Media</h5>
         <div className='d-flex justify-content-between social_contacts_main flex-wrap'>
         <div className="fb_connection ">
         <a href="https://www.facebook.com/TravelChannelInternationalPvt.Limited" target="_blank" rel="noopener noreferrer" className='d-flex justify-content-start'>
            <FacebookOutlinedIcon className='fb_connect_icon'/> 
            <p className='fb_contact_content align-self-center'>Connect with Us on Facebook</p>
          </a>
          </div>
          <a href="https://twitter.com/travel-channel-international-pvt-limited" target="_blank" rel="noopener noreferrer">
            <div className="twitter_connection d-flex justify-content-start">
              <TwitterIcon className='twitter_connect_icon'/> 
              <p className='twiter_contact_content align-self-center'>Stay Connected on Twitter</p>
            </div>
          </a>
            <a href="https://www.linkedin.com/company/travel-channel-international-pvt-limited" target="_blank" rel="noopener noreferrer">
              <div className="linkden_connection d-flex justify-content-start">
                <LinkedInIcon className='linkden_connect_icon'/> 
                <p className='linkden_contact_content align-self-center'>Follow us on LinkedIn</p>
              </div>
            </a>

         </div>
         
       </div>

    </div>
  )
}

export default Contact;