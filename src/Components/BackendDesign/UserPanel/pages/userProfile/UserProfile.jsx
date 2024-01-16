import React,{useState , useEffect} from 'react';
import userDetailsBackend from '../../../../../API/BackendAPI/BackendAPI_Fun';
import * as images from '../../../../../Constant/images';
import EditModel from '../common/EditModel';

const UserProfile = ()=>{
  const [backLoading , setBackLoading] =useState(false);
  const [userData ,setUser] = useState(null);
  const [isOpen , setIsOpen] = useState(false);

  const openEditModel = ()=>{
    setIsOpen(true);
  }
// ---------------------APi----------------
  useEffect(()=>{
    const fetchBackendData =async()=>{
      try{
        const userData = await userDetailsBackend(setBackLoading);
       console.log("ApiCalledData",userData?.data.payload);
      // console.log("ApiCalledData",userData);
          setUser(userData);
      }
      catch (error){
          console.error(error);
      }
  } ;
  
  fetchBackendData();
   },[]);

   const userProfileData = userData?.data.payload.map((items)=>items.user);
   console.log("userProfileData",userProfileData);

   const  ArrangeDateFormat = (JourneyDate) =>{
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
}

    return(
      <div className='dashboard-content'>
        <div className='dashboard-content-container'>
              <div className='dashboard-content-header'>
                            <h2>User Profile</h2>
              </div>
              {
                userProfileData?.map((items , index)=>(
                  <div key={index} >
                      <div>
                        <div className='m-1 text-center'>
                          <img src={images.userProfile} alt="" className='userProfile_image' />
                      </div>
                      <h3 className='text-center user_fname '>{items.firstName}</h3>
                      <div className='userprofile_data d-flex justify-content-center  mt-2'>
                          <div className=''>
                            <p className='code_sub_heading'>Country Code:</p>
                            <h3 className='user_profile_data text-center '>{items.countryCode}</h3>
                          </div>
                          <div className='text-center user_phone_typo '>
                            <p className='code_sub_heading'> Mobile No:</p>
                            <h3  className='user_profile_data '>{items.phoneNumber}</h3>
                          </div>
                      </div>
                      </div>
                     <div className='d-flex justify-content-around pl-6'>
                      <div className='mt-4 '>
                            <div className='text-center mb-2 '>
                              <p className='user_detials_heading '>First Name</p>
                              <p className='user_detials_data '>{items.firstName}</p>
                            </div>
                            <div className='text-center mb-2'>
                              <p className='user_detials_heading '>Gender</p>
                              <p className='user_detials_data '>{items.gender}</p>
                            </div>
                            <div className='text-center mb-2'>
                              <p className='user_detials_heading '>CNIC</p>
                              <p className='user_detials_data '>{items.cnic}</p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <div className='text-center mb-2'>
                              <p className='user_detials_heading '>Last Name</p>
                              <p className='user_detials_data '>{items.lastName}</p>
                            </div>
                            <div className='text-center mb-2'>
                              <p className='user_detials_heading '>Date of Birth</p>
                              <p className='user_detials_data '> {ArrangeDateFormat(items.dateOfBirth)}</p>
                            </div>
                            <div className='text-center mb-2'>
                              <p className='user_detials_heading '>Passport No</p>
                              <p className='user_detials_data '>{items.passportNo}</p>
                            </div>
                        </div>
                     </div>
                      <div className='text-center mt-4'>
                      <button className='btn btn-primary profile_update_btn' onClick={openEditModel}>
                            Update Your profile
                      </button>
                      </div>
                  </div>
                 
                  
                ))
              }
              {
                isOpen ?(
                  <EditModel isOpen ={isOpen} setIsOpen={setIsOpen} />
                ):('')
              }
          
        </div>
        
      </div>
    )
}

export default UserProfile;