import {React, useState,Fragment,useEffect}from "react";
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import menuItems from "../Constant/CustomerSupportData";
import { useNavigate ,useLocation } from "react-router";

// ---------------------------
const Customersupport = () =>{
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedMenuItem, setSelectedMenuItem] = useState(0);
    // useEffect(() => {
    //     navigate(`/customer-support/${encodeURIComponent(menuItems[selectedMenuItem].path)}`);
    // }, []);
    useEffect(() => {
        const path = location.pathname.split("/").pop();
        const index = menuItems.findIndex(item => item.path === path);  
        if (index !== -1) {
            setSelectedMenuItem(index);
        }
    }, [location.pathname]);
    const handleMenuItemClick = (index,title) =>{
        setSelectedMenuItem(index);
        navigate(`/customer-support/${encodeURIComponent(title)}`);
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
                        onClick={()=>handleMenuItemClick(index ,item.path)}
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



