import React from 'react'
import GrassIcon from '@mui/icons-material/Grass';
import * as images from '../Constant/images';
import { useNavigate } from 'react-router-dom';
const About = () => {
  const navigate = useNavigate();
  const handleNavigation = ()=>{
    navigate('/contactus');
  }
  return (
   <div className="container">
      <div className='about_main'>
        <div className='about_us_heading d-flex justify-content-center'>
          <GrassIcon className='about_us_icon align-self-center'/><h3>About Us</h3>
          </div>
          <div className='about_container'>
            <img src={images.FMAbout} alt="" width ='500px'  />
          </div>
          <h5 className='about_details'>Why Choose Us </h5>
          <div className='about_us_content'>
              <p className='about_first_para'>Travel Channel International (Pvt) Limited is Pakistan's leading travel company with numerous sales outlets across Pakistan. Established in 2003, we have evolved to be one of the finest in travel industry.</p>
              <p className='about_sec_para'>Keeping our vision of <span className='about_moto'>"Excellence in Travel Services"</span>, we strive to provide great customer services, ease of booking and value for your money. Through continuous improvement in our infrastructure, technology and our people, we are providing seamless travel experience to our customers.</p>
              <p className='about_third_para'>FareMakers.com is our flagship brand product that also holds the crown of being Pakistan's first real-time fully integrated travel booking website. FareMakers.com has gained exponential popularity among travelers and our customers in and outside of Pakistan.</p>
              <p className='about_fourth_para'>We provide full spectrum of travel services by keeping in mind personal preferences of the travelers. We are passionate about travel and provide end-to-end travel services.</p>
              <p className='about_fifth_para'>We invite you to come and enjoy outstanding travel services from our team of 300+ professional travel consultants. Finding a great travel deal is just a call away. Book online or visit one of our office in Lahore, Islamabad, Karachi or Faisalabad.</p>
          </div>
          <div className="about_space">
             <h4 className="colorOrange about_space text-center">"Happy Flying with <a href="https://www.faremakers.com/" className='FM_website_link'>FareMakers.com!</a>"</h4>
               <div className="btn btn-primary contactus" onClick={handleNavigation}>Contact Now</div>
          </div>
      </div>
   </div>
  )
}

export default About;