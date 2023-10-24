import React from 'react';
import * as images from '../../src/Constant/images';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ContactSources from '../Components/Commom/ContactSources';
const FMBanks = () => {
  return (
    <div className='container'>
       <div className='contact_us_heading d-flex justify-content-center'>
            <AccountBalanceRoundedIcon className='about_detail_icon '/><h3 className='fmBanks_main_heading'>Travel Channel Official Bank Accounts:</h3>
      </div>
        <div className='banks_main'>
            <div className='row'>
              <div className=' col-md-4 col-sm-6 habib_bank_details'>
                  <div>
                      <div className='hbl_header d-flex justify-content-center'>
                        <img src={images.hbllogo} alt="" width="40px" /> 
                        <p className='hbl_name'>Habib Bank Limited</p>
                      </div> 
                      <div className='hbl_body'>
                        <div className='accounts_details d-flex justify-content-start'>
                          <p className='account_title align-self-center '>Account Title:</p>
                          <p className='align-self-center account_title_body '>Travel Channel Int'l Pvt Ltd</p>
                        </div> 
                        <div className='accounts_details d-flex justify-content-start'>
                          <p className='account_title align-self-center'>Account Number:</p>
                          <p className=' account_title_body '> 1060-7900329303</p>
                          
                        </div>
                      </div>
                  </div>
                </div>
                <div className=' col-md-4 col-sm-6 habib_bank_details' >
                    <div className='hbl_header d-flex justify-content-center'>
                      <img src={images.SCBank} alt="" width="15px" /> 
                      <p className='hbl_name'>STANDARD CHARTERED</p>
                    </div> 
                    <div className='hbl_body'>
                      <div className='accounts_details d-flex justify-content-start'>
                        <p className='account_title align-self-center '>Account Title:</p>
                        <p className='align-self-center account_title_body '>Travel Channel Int'l Pvt Ltd</p>
                      </div> 
                      <div className='accounts_details d-flex justify-content-start'>
                        <p className='account_title align-self-center'>Account Number:</p>
                        <p className=' account_title_body '> 01-7011197-01</p>
                        
                      </div>
                    </div>
                </div>
                <div className=' col-md-4 col-sm-6 habib_bank_details'>
                    <div className='hbl_header d-flex justify-content-center'>
                      <img src={images.MBBank} alt="" width="25px" /> 
                      <p className='hbl_name'>Meezan Bank</p>
                    </div> 
                    <div className='hbl_body'>
                      <div className='accounts_details d-flex justify-content-start'>
                        <p className='account_title align-self-center '>Account Title:</p>
                        <p className='align-self-center account_title_body '>Travel Channel Int'l Pvt Ltd</p>
                      </div> 
                      <div className='accounts_details d-flex justify-content-start'>
                        <p className='account_title align-self-center'>Account Number:</p>
                        <p className=' account_title_body '>  0287-0101682411</p>
                        
                      </div>
                    </div>
                </div>
                <div className='help_desk'>
                  <ContactSources/>
                </div>
           
            </div>
        </div>

    </div>
  )
}

export default FMBanks;