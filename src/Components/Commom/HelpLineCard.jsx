import React from 'react';
import HeadsetMicRoundedIcon from '@mui/icons-material/HeadsetMicRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
const HelpLineCard = (props) => {
  return (
 <div className={`${props.help_price_card}`}>
        <div className="search_bar_components">
            <div className="helpline_main" >
                <div >
                    <h4 className="helpline_heading">Need Help ?</h4>
                    <p className="helpline_tagline">24/7 Available</p>
            </div>
                <p className="help_tag_padding">Call us for Booking Help</p>
                <div className="helpline_content">
                <span className="help_right_padding"><HeadsetMicRoundedIcon/></span>03111 147 111 
                </div>
                <div className="helpline_content">
                        <span className="help_right_padding"><WhatsAppIcon className='text-success'/></span>03111 147 111 
                </div>
            </div>
      </div>
 </div>
  )
}

export default HelpLineCard;