import React ,{useState,useEffect} from 'react'
import * as images from '../../../Constant/images';
import CommissionModel from '../MyPanel/Pages/common/CommissionModel';
import { GetCommission } from '../../../API/BackendAPI/CommissionAPI/GetCommissions';
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
useEffect(() => {
    const handleCommissionPercentage = async () => {
        try {
            const response = await GetCommission();
            setCommPassingObj(response.data.payload); 
            console.log("Response from GetCommission API:", response);
        } catch (error) {
            console.log("Error on GetCommissionPage:", error);
        }
    }
    handleCommissionPercentage();
}, []);

// console.log('CommissionPassingObj123',CommissionPassingObj);
const ArrangeDateFormat = (JourneyDate) => {
  const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
  return formattedDate;
};


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
                            <th className="promotion_design">AirlineWise ID</th>
                            <th className="promotion_design">FareClassWise ID</th>
                            <th className="promotion_design">SectorWise ID</th>
                            <th className="promotion_design">CreatedAt</th>
                            <th className="promotion_design">isActive</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                      CommissionPassingObj.map((items,index)=>(
                        <tr key={index}>
                          {/* <td>{`${index+1}`}</td> */}
                          <td>{items.id}</td>
                          <td>{items.percentage != null ? `${items.percentage}%` : 'Null'}</td>
                          <td>{items.airlineId != null ? items.airlineId : 'Null'}</td>
                          <td>{items.fareClassId != null ? items.fareClassId : 'Null'}</td>
                          <td>{items.sectorId != null ? items.sectorId : 'Null'}</td>
                          <td>{ArrangeDateFormat(items.createdAt)}</td>
                          <td>{items.isActive != null ? (items.isActive ? 'True' : 'False') : 'null'}</td>
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