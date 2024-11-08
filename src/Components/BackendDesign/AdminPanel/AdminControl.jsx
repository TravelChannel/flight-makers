import React,{useState ,useEffect} from 'react';
import { getAllControls } from '../../../API/BackendAPI/AdminControlsAPI/GetAllControls';
import { ToggleControl } from '../../../API/BackendAPI/AdminControlsAPI/ToggleControl';

const AdminControl = () => {

    const [getApiData ,setApiData] = useState([]);
    const [flagStatus ,setFlagStatus] = useState(null);

    const handleGetApiData = async() =>{
        try{
            const responce = await getAllControls();
            console.log("getControl-resp",responce);
            setApiData(responce.data.payload.data);
        }catch(error){
            console.error("Error while Fetching Data",error);
        }
    }
    useEffect(()=>{
        handleGetApiData();
    },[]);

    const handleGeneralTasks = async(id) =>{
        try{
            const responce = await ToggleControl(id);
            console.log("getControl-resp",responce);
            handleGetApiData();
        }catch(error){
            console.error("Error while Fetching Data",error);
        }
    }

    const ArrangeDateFormat = (JourneyDate) => {
        const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
        return formattedDate;
      };
  return (
    <div className='m-3'>
        <div className='dashboard-content-header'>
                            <h2>Admin Control </h2>
                            <div className='dashboard-content-search'>
                                <input
                                    type='text'
                                    value={''}
                                    placeholder='Search..'
                                    className='dashboard-content-input'
                                />
                            </div>
        </div>
                 <div className='table-responsive '>
                 <table className="table table-bordered mt-5">
                            <thead>
                                <tr>
                                    <th className="promotion_design" >Serial No</th>
                                    <th className="promotion_design">Discription</th>
                                    <th className="promotion_design">CreatedAt</th>
                                    <th className="promotion_design">Flag</th>
                                    <th className="promotion_design">Action</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                        {
                            getApiData.map((items ,index)=>(
                                <tr key={index} >
                                    <td>{`${index+1}`}</td>
                                    <td>{items.description}</td>
                                    <td>{ArrangeDateFormat(items.createdAt)}</td>
                                    <td>{items.flag === true ? <p className='enable_status'>Enable</p> :  <p className='disable_status'> Disable</p>}</td>
                                    <td className='promotions_table_btn'>
                                            <div >
                                                <button
                                                    className='btn btn-primary buttons_typo_delt '
                                                    onClick = {()=>handleGeneralTasks(items.id)}
                                                >
                                                {items.flag === true ? 'DeActivate' : 'Activate'}
                                                </button>
                                            </div>
                                        </td>
                                </tr>
                            ))
                        }

                            </tbody>
                     </table> 
                 </div>
    </div>
  )
}

export default AdminControl;