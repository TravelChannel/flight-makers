import React, { Fragment } from 'react';
import ConnectWithoutContactTwoToneIcon from '@mui/icons-material/ConnectWithoutContactTwoTone';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LahoreBranches, { OtherCityBranches } from '../Constant/ContactUsDetails';
import * as images from '../Constant/images';

const Contact = () => {
  return (
    <div className='container'>
      <div className='contact_us_heading d-flex justify-content-center'>
        <ConnectWithoutContactTwoToneIcon className='contact_detail_icon align-self-center' />
        <h3>Contact Us</h3>
      </div>

      <div className='contact_us_body'>
        <div className="highlight-container">
          <p className="highlight-message">
            Our head office is open on Sunday as well, from 9:00 AM to 2:00 PM. We look forward to serving you!
          </p>
        </div>

        {/* Lahore Branches */}
        <div className='row'>
          <div className='d-flex justify-content-center my-1'>
            <h5 className='contact_details branches_heading align-self-center'>Drexel Hill</h5>
          </div>

          {LahoreBranches.map((item) => (
            <div key={item.id} className='col-lg-6 col-md-6 col-sm-12 offices_detail_main'>
              <div className={`offices_header ${item.status ? '' : 'd-flex justify-content-between'}`}>
                <p className="office_name">{item.officeName}</p>
                <p className="office_name">{item.timing}</p>
              </div>
              <div className="offices_details text-center">
                <p className="underText">{item.address}</p>
                <p className="underText">{item.city}</p>
                <p className="underText">{item.uan}</p>
                <p className="underText">{item.email}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Other City Branches */}
        <div className='row'>
          {OtherCityBranches.map((item) => (
            <div key={item.id} className='col-lg-4 col-md-6 col-sm-12 offices_detail_main'>
              <div className='offices_header d-flex justify-content-between'>
                <p className="office_name">{item.officeName}</p>
                <p className="office_name">{item.timing}</p>
              </div>
              <div className="offices_details text-center">
                <p className="underText">{item.address}</p>
                <p className="underText">{item.city}</p>
                <p className="underText">{item.uan}</p>
                <p className="underText">{item.email}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Social Media Section */}
        <h5 className='branches_details branches_heading d-none'>Engage With Us on Social Media</h5>
        <div className='d-flex justify-content-between social_contacts_main flex-wrap d-none'>
          <div className="fb_connection">
            <a
              href="https://www.facebook.com/TravelChannelInternationalPvt.Limited"
              target="_blank"
              rel="noopener noreferrer"
              className='d-flex justify-content-start'
            >
              <FacebookOutlinedIcon className='fb_connect_icon' />
              <p className='fb_contact_content align-self-center'>Connect with Us on Facebook</p>
            </a>
          </div>

          <a href="https://twitter.com/travel-channel-international-pvt-limited" target="_blank" rel="noopener noreferrer">
            <div className="twitter_connection d-flex justify-content-start">
              <TwitterIcon className='twitter_connect_icon' />
              <p className='twiter_contact_content align-self-center'>Stay Connected on Twitter</p>
            </div>
          </a>

          <a href="https://www.linkedin.com/company/travel-channel-international-pvt-limited" target="_blank" rel="noopener noreferrer">
            <div className="linkden_connection d-flex justify-content-start">
              <LinkedInIcon className='linkden_connect_icon' />
              <p className='linkden_contact_content align-self-center'>Follow us on LinkedIn</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
