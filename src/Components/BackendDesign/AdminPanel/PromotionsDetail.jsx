import React,{useState,useEffect} from 'react';
import PromotionsModel from '../MyPanel/Pages/common/PromotionsModel';
import { GetAllPromotions } from '../../../API/BackendAPI/UserBookingDetails';
import { DeletePromotion } from '../../../API/BackendAPI/UserBookingDetails';
const PromotionsDetail = () => {
const [isOpen , setIsOpen] = useState(false);
const [isUpdate , setUpdate] = useState(false);
const [updateID ,setUpdateId] = useState('');
const [promotionData , setPromotionData] = useState([]);
const [promotions, setPromotions] = useState([]);

const ShowAddModel = ()=>{
    setIsOpen(!isOpen);
}
const ShowUpdateModel = (itemID)=>{
    setIsOpen(!isOpen);
    setUpdate(true);
    setUpdateId(itemID);
}

useEffect(() => {
    const GetPromotionsDetail = async () => {
        try {
            const response = await GetAllPromotions();
            setPromotionData(response.data.payload);
            console.log('getAllPromotions', response.data.payload);
        } catch (error) {
            console.log('Error in getAllPromotions', error);
        }
    };

    GetPromotionsDetail();
}, [promotions]);

const handleDeletePromotion =async (id)=>{

    DeletePromotion(id,setPromotions);
}

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
                   <button className='btn btn-primary p-2'>
                            Add  Promotion
                   </button>
                </div>
                    <div className="promotion_table text-center">
                        <table className="table table-bordered ">
                            <thead>
                               <tr>
                               <th className="promotion_design">ID</th>
                                <th className="promotion_design" >Title</th>
                                <th className="promotion_design">Description</th>
                                <th  className="promotion_design">IsActive</th>
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
                                        <td>{items.isActive}</td>
                                        <td className='promotions_table_btn'>
                                        <div onClick={()=>{ShowUpdateModel(items.id)}}>
                                            <button
                                                className='btn btn-primary buttons_typo user_cancelation_button'>
                                                Update
                                            </button>
                                        </div>
                                        <div className='mt-2' onClick={()=>handleDeletePromotion(items.id)}>
                                            <button
                                                className='btn btn-primary buttons_typo_delt user_cancelation_button'>
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