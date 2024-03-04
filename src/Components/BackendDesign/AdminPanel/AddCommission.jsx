import React ,{useState,useEffect} from 'react'
import * as images from '../../../Constant/images';
import CommissionModel from '../MyPanel/Pages/common/CommissionModel';
import { GetCommission } from '../../../API/BackendAPI/CommissionAPI/GetCommissions';
import { Deletecommission } from '../../../API/BackendAPI/CommissionAPI/DeleteCommission';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toggleCommission } from '../../../API/BackendAPI/CommissionAPI/ToggleStatus';
const AddCommission = () => {

    const [isOpen , setIsOpen] = useState(false);
    const [isUpdate , setUpdate] = useState(false);

    const [CommissionPassingObj ,setCommPassingObj] = useState([]);
   
    // const PassCommData = {
    //   percentage: CommissionPassingObj.percentage,
    //   airlineId:CommissionPassingObj.AirlineWise?.value,
    //   fareClassId:CommissionPassingObj.farewise?.value,
    //   sectorId:CommissionPassingObj.sectorwise?.value
    // }

    // console.log('PassingCommission', PassCommData);


    const ShowAddModel = ()=>{
        setIsOpen(!isOpen);
        setUpdate(false);
    }
    const handleCommissionPercentage = async () => {
      try {
          const response = await GetCommission();
          setCommPassingObj(response.data.payload);
          console.log("Response from GetCommission API:", response);
      } catch (error) {
          console.log("Error on GetCommissionPage:", error);
      }
  }

  // Call handleCommissionPercentage when the component mounts
  useEffect(() => {
      handleCommissionPercentage();
  }, []);
  useEffect(() => {
    handleCommissionPercentage();
}, [CommissionPassingObj]);

const ArrangeDateFormat = (JourneyDate) => {
  const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
  return formattedDate;
};

const handleDeletCommission = async(id) =>{
  try {
    const DeletedCommRes= await Deletecommission(id);
    console.log("DeleteComm-Response:", DeletedCommRes);
    setCommPassingObj(CommissionPassingObj.filter(item => item.id !== id));
    toast.success('Commission Deleted Successfully!', {autoClose: 2000});
} catch (error) {
    console.error("PromotionError", error);
}
}

// const handleToggleCommission= async (id) => {
//   try {
//       const toggleResponse = await toggleCommission(id);
//       console.log("TogglePromotion-Response:", toggleResponse);
//       // Update isActive field locally
//       setCommPassingObj(CommissionPassingObj.map(item => {
//           if (item.id === id) {
//               return { ...item, isActive: !item.isActive };
//           }
//           return item;
//       }));
//   } catch (error) {
//       console.error("PromotionError", error);
//   }
// }


  return (
    <div className='m-3'>
        <div className='dashboard-content-header'>
          <h2>Commission detail</h2>
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
            <div className='d-flex justify-content-end mt-5' onClick={ShowAddModel}>
                    <button className='btn btn-primary addPromo_btn p-2'>
                            <img src={images.announcement} alt="" width='32px' /> Add  Commission
                    </button>
           </div>
        <table className="table table-bordered mt-2">
                    <thead>
                        <tr> 
                            {/* <th className="promotion_design">Serial No</th> */}
                            <th className="promotion_design" >ID</th>
                            <th className="promotion_design">Percentage Applied</th>
                            <th className="promotion_design">Airline</th>
                            <th className="promotion_design">FareClass</th>
                            <th className="promotion_design">Sector</th>
                            <th className="promotion_design">StartDate</th>
                            <th className="promotion_design">EndDate</th>
                            <th className="promotion_design">isActive</th>
                            <th  className="promotion_design" >Action</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                      CommissionPassingObj.map((items,index)=>(
                        <tr key={index}>
                          <td>{items.id}</td>
                          <td>{items.percentage != null ? `${items.percentage}%` : 'Null'}</td>
                          <td>{items.airlineId && items.airline?.name || 'null'}</td>
                          <td>{items.fareClassId && items.fareClass?.name || 'null'} </td>
                          <td>{items.sectorId && items.sector?.name || 'null'} </td>
                          <td>{ArrangeDateFormat(items.startDate)}</td>
                          <td>{ArrangeDateFormat(items.endDate)}</td>
                          <td>{items.isActive != null ? (items.isActive ? 'True' : 'False') : 'null'}</td>
                          <td>
                               <div className='mt-2'>
                                  <button className='btn btn-primary buttons_typo_delt ' onClick={()=>handleDeletCommission(items.id)} >
                                                  Delete
                                  </button>
                                  {/* <td className='disable_button'>
                                            {
                                                items.isActive ? (<button className='btn btn-primary btn_promotion_model  mx-2' onClick={()=>handleToggleCommission(items.id)}>Deactivate</button>):(<button className='btn btn-danger btn_promotion_model_active  mx-2' onClick={()=>handleToggleCommission(items.id)}>Activate</button>)
                                            }
                                  </td> */}
                               </div>
                          </td>
                      </tr>
                      ))
                    }
                    </tbody>
                </table>

                {
                    isOpen && (
                        <CommissionModel
                        isOpen={isOpen} setIsOpen ={setIsOpen}
                        CommissionPassingObj ={CommissionPassingObj} 
                        setCommPassingObj = {setCommPassingObj}
                        // promotionData={promotionData} setPromotionData={setPromotionData}
                        // isUpdate ={isUpdate} setUpdate={setUpdate} 
                        // updateID = {updateID}  
                        />
                    )
                }
      </div>
  )
}

export default AddCommission;