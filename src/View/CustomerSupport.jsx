import {React, useState,Fragment,useEffect}from "react";
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import Box from '@mui/material/Box';
import FAQs from "../Components/Commom/FAQs";
import menuItems from "../Constant/CustomerSupportData";
import { useNavigate } from "react-router";
import { Route, Routes, Navigate } from "react-router-dom";



// ---------------------------
const Customersupport = () =>{
    const navigate = useNavigate();
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);

    const handleMenuItemClick = (index) =>{
        setSelectedMenuItem(index);
    }
    return(
        <div className="container bg-white">
            <div className='contact_us_heading d-flex justify-content-center'>
                 <SupportAgentRoundedIcon className='contact_detail_icon align-self-center'/><h3>Customer Support</h3>
            </div>
            <div className="CS_body">
                <div className="cs_top_menu d-flex justify-content-start"> 
                {
                    menuItems.map((item,index)=>(
                        <p
                        key = {index}
                        className={`cs_menu_content ${selectedMenuItem === index ? 'print_title rounded' : ''}`}
                        onClick={()=>handleMenuItemClick(index)}
                        >
                            {item.title}
                        </p>
                    ))
                }
                </div>
                <div className="support_methodes_main">
                    {menuItems[selectedMenuItem].component}
                </div>
             </div>
        </div>
    );
}

export default Customersupport;



