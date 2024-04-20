import React,{useState ,useEffect} from 'react';
import { getAllControls } from '../../../API/BackendAPI/AdminControlsAPI/GetAllControls';
import { ToggleControl } from '../../../API/BackendAPI/AdminControlsAPI/ToggleControl';

const AdminControl = () => {

    const [getApiData ,setApiData] = useState([]);

    const handleGetApiData = async() =>{
        try{
            const responce = await getAllControls();
            console.log("getControl-resp",responce);
            setApiData(responce);
        }catch(error){
            console.error("Error while Fetching Data",error);
        }
    }
    useEffect(()=>{
        handleGetApiData();
    },[]);

    const handleGeneralTasks = async() =>{
        try{
            const responce = await ToggleControl(1);
            console.log("getControl-resp",responce);
        }catch(error){
            console.error("Error while Fetching Data",error);
        }
    }
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
                        <tr>
                                <td>1</td>
                                <td>Admin Panel</td>
                                <td>IsOn</td>
                                <td>CreatedAt</td>
                                <td className='promotions_table_btn'>
                                        <div >
                                            <button
                                                className='btn btn-primary buttons_typo_delt '
                                                onClick = {handleGeneralTasks}
                                            >
                                                Activate
                                            </button>
                                        </div>
                                    </td>
                            </tr>

                        </tbody>
           </table> 
    </div>
  )
}

export default AdminControl;