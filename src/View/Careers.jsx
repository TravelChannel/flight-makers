import React from 'react'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import * as images from '../Constant/images';
const Careers = () => {
  return (
    <div className='container bg-white'>
         <div className='about_us_heading d-flex justify-content-center'>
            <ApartmentOutlinedIcon className='about_us_icon align-self-center'/><h3>Careers</h3>
        </div>
        <div className='career_main d-flex justify-content-center w-100'>
            <div className='align-self-center'>
                <h3 className='hiring_heading text-center pb-3'>We are Hiring !</h3>
                <h5>
                    If you want to apply, please send your resume at:
                    <a className='career_link' href='mailto:careers@flightmakers.com'>
                    careers@flightmakers.com
                    </a>
                </h5>
            </div>
            <div>
                <img src={images.career} alt="" className='career_img_prop'/>
            </div>
        </div>
    </div>
  )
}

export default Careers;
