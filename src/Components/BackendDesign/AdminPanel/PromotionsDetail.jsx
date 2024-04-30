import React,{useState,useEffect} from 'react';
import PromotionsModel from '../MyPanel/Pages/common/PromotionsModel';
import { GetAllPromotions } from '../../../API/BackendAPI/allAPICalls';
import { DeletePromotion } from '../../../API/BackendAPI/allAPICalls';
import * as images from '../../../Constant/images';
import { togglePromotion } from '../../../API/BackendAPI/allAPICalls';
const PromotionsDetail = () => {
const [isOpen , setIsOpen] = useState(false);
const [isUpdate , setUpdate] = useState(false);
const [updateID ,setUpdateId] = useState('');
const [promotionData , setPromotionData] = useState([]);


const ShowAddModel = ()=>{
    setIsOpen(!isOpen);
    setUpdate(false);
}
const ShowUpdateModel = (itemID)=>{
    setIsOpen(!isOpen);
    setUpdate(true);
    setUpdateId(itemID);
}

useEffect(() => {
    const getPromotionsDetail = async () => {
        try {
            const response = await GetAllPromotions();
            console.log("promotionResponce",response);
            setPromotionData(response.data.payload);
        } catch (error) {
            console.log('Error in getAllPromotions', error);
        }
    };

    getPromotionsDetail();
}, []);

const handleDeletePromotion = async (id) => {
    try {
        await DeletePromotion(id);
        // After deletion, update the promotionData state to reflect the changes
        setPromotionData(promotionData.filter(item => item.id !== id));
    } catch (error) {
        console.error("Error deleting promotion:", error);
    }
}

const handleTogglePromotions = async (id) => {
    try {
        const toggleResponse = await togglePromotion(id);
        console.log("TogglePromotion-Response:", toggleResponse);
        // Update isActive field locally
        setPromotionData(promotionData.map(item => {
            if (item.id === id) {
                return { ...item, isActive: !item.isActive };
            }
            return item;
        }));
    } catch (error) {
        console.error("PromotionError", error);
    }
}
const ArrangeDateFormat = (JourneyDate) => {
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
  };
  return (
    <div>
          <div className='dashboard-content-header'>
          <h2>Promotions Detail</h2>
          <div className='dashboard-content-search'>
            <input
              type='text'
              value={''}
              placeholder='Search..'
              className='dashboard-content-input'
            //   onChange={e => __handleSearch(e)}
            />
          </div>
        </div>
        <div>
                <div className='d-flex justify-content-end mt-5' onClick={ShowAddModel}>
                   <button className='btn btn-primary addPromo_btn p-2'>
                           <img src={images.announcement} alt="" width='32px' /> Add  Promotion
                   </button>
                </div>
                    <div className="promotion_table text-center table-responsive ">
                        <table className="table table-bordered ">
                            <thead>
                               <tr>
                               <th className="promotion_design">ID</th>
                                <th className="promotion_design" >Title</th>
                                <th className="promotion_design">Description</th>
                                <th className="promotion_design">Start Date</th>
                                <th className="promotion_design">End Date</th>
                                <th  className="promotion_design">IsActive</th>
                                <th className="promotion_design">Disable</th>
                                <th className="promotion_design"> Operation</th>

                               </tr>
                            </thead>
                            <tbody>
                                {
                                    promotionData?.map((items , index)=>(
                                        <tr key={index} >
                                        <td>{items.id}</td>
                                            <td>{items.title} </td>
                                            <td>{items.description}</td>
                                            <td>{ArrangeDateFormat(items.startDate)}</td>
                                            <td>{ArrangeDateFormat(items.endDate)}</td>
                                            <td>{items.isActive ? 'True' : 'False'}</td>
                                            {/* <td className='disable_button'>
                                                <button className='btn btn-primary btn_promotion_model  mx-2' onClick={()=>handleTogglePromotions(items.id)}>{items.isActive ? 'Deactivate' : 'Activate'}</button>
                                            </td> */}
                                            <td className='disable_button'>
                                            {
                                                items.isActive ? (<button className='btn btn-primary btn_promotion_model  mx-2' onClick={()=>handleTogglePromotions(items.id)}>Deactivate</button>):(<button className='btn btn-danger btn_promotion_model_active  mx-2' onClick={()=>handleTogglePromotions(items.id)}>Activate</button>)
                                            }
                                            </td>
                                            <td className='promotions_table_btn'>
                                            <div onClick={()=>{ShowUpdateModel(items.id)}}>
                                                <button
                                                    className='btn btn-primary buttons_typo user_cancelation_button'>
                                                    Edit
                                                </button>
                                            </div>
                                            <div className='mt-2' onClick={()=>handleDeletePromotion(items.id)}>
                                                <button
                                                    className='btn btn-primary buttons_typo_delt promo_bg_btn '>
                                                Delete
                                                </button>
                                            </div>
                                            </td>
                                            
                                            

                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                {
                    isOpen && (
                        <PromotionsModel 
                        isOpen={isOpen} setIsOpen ={setIsOpen} 
                        promotionData={promotionData} setPromotionData={setPromotionData}
                        isUpdate ={isUpdate} setUpdate={setUpdate} 
                        updateID = {updateID}  
                        />
                    )
                }

        </div>
    </div>
  )
}

export default PromotionsDetail;