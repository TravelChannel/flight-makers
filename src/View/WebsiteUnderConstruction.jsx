import React from 'react';
import * as images from '../Constant/images';
const WebsiteUnderConstruction = () => {
  return (
    <div className='container bg-white main_construction'> 
            <div className='d-flex justify-content-center py-3'>
                <h3 className='under_construction_message2'>Site  Under Maintenance...</h3> 
          </div>
           <div className='d-flex justify-content-center'>
               <img src={images.Robot} alt=""  width = '350px'/>
          </div>
           <div className='pb-3'>
                <p className='under_construction_message1 text-center py-1'>Sorry For Inconvenience</p>
                <p className='under_construction_message1 text-center'>To Contact us in the mean time  please email</p>
                <p className='under_construction_message1 text-center contact_typograpy'> support@faremakers.com</p> 
                <p className='under_construction_message1 text-center ' > or call <span className='under_construction_message1'>03111 147 111</span></p>
           </div>
            {/* <div className='d-flex justify-content-end'>
            <img src={images.gearImage}  width= '350px' alt="" />
           </div> */}
    </div>
  )
}

export default WebsiteUnderConstruction;