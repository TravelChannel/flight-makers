import React,{useState ,useEffect} from 'react';
import { AllUsersDetail } from '../../../API/BackendAPI/UserBookingDetails';

const UserLists = () => {

    const [allUserData ,setUserData] = useState([]);

    const __handleSearch = ()=>{
        ''
    }
    useEffect(()=>{
        const AllUsers = async()=>{
          try{
              const responce = await AllUsersDetail();
              setUserData(responce.data.payload);
              console.log('allUserResponce',responce);
      
          }catch(error){
              console.log('Error in AllUsersDetail', error);
          }
        }
        AllUsers();
      },[])

      const  ArrangeDateFormat = (JourneyDate) =>{
        const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
        return formattedDate;
    }
  return (
     <div>
      <div className='dashboard-content-header'>
          <h2>Booking Details</h2>
          <div className='dashboard-content-search'>
            <input
              type='text'
              value={''}
              placeholder='Search..'
              className='dashboard-content-input'
              onChange={e => __handleSearch(e)}
            />
          </div>
        </div>
        <div className="promotion_table mt-3  text-center">
                <table className="table table-bordered ">
                    <thead>
                        <tr className='head_details'>
                            <th className="promotion_design">ID</th>
                            <th className="promotion_design">First Name</th>
                            <th className="promotion_design">Last Name</th>
                            <th className="promotion_design">Phone Number</th>
                            <th className="promotion_design">DOB</th>
                            <th className="promotion_design">CreatedAt</th>

                            {/* <th className="promotion_design">CNIC</th> */}
                            <th className="promotion_design">Passport</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        allUserData.map((items ,index)=>(
                        <tr className='data_details' key={index}>
                            <td>{items.id}</td>
                            <td>{items.firstName}</td>
                            <td>{items.lastName} </td>
                            <td>{items.phoneNumber}</td>
                            <td>{ArrangeDateFormat(items.dateOfBirth)}</td>
                            {/* <td>{items.cnic}</td> */}
                            <td>{ArrangeDateFormat(items.createdAt)}</td>
                            <td>{items.passportNo}</td>
                        </tr>  
                        ))
                    }
                        {/* <tr className='data_details'>
                            <td>00012</td>
                            <td>Tasbeel</td>
                            <td>Ahmad </td>
                            <td>+92 3180174143</td>
                            <td>12-08-2001</td>
                            <td>81201-6698648-9</td>
                            <td>3180TTYY</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
     </div>
  )
}

export default UserLists;