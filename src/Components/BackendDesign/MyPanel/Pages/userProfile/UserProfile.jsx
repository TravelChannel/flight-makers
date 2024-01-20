import React,{useState , useEffect, Fragment} from 'react';
import userDetailsBackend from '../../../../../API/BackendAPI/BackendAPI_Fun';
import * as images from '../../../../../Constant/images';
import EditModel from '../common/EditModel';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import Loader from '../../../../../Loader/Loader';
const UserProfile = (props)=>{
  const {userData,isLoading} = props;
  const [backLoading , setBackLoading] =useState(false);
  // const [userData ,setUser] = useState(null);
  const [isOpen , setIsOpen] = useState(false);
  // const [isLoading , setLoading] = useState(false);

  const openEditModel = ()=>{
    setIsOpen(true);
  }
// ---------------------APi----------------
  // useEffect(()=>{
  //   const fetchBackendData =async()=>{
  //     try{
  //       setLoading(true);
  //       const userData = await userDetailsBackend(setBackLoading);
  //      console.log("ApiCalledData",userData?.data.payload?.user);
  //     // console.log("ApiCalledData",userData);
  //         setUser(userData);
  //         setLoading(false);
  //     }
  //     catch (error){
  //         console.error(error);
  //     }
  // } ;
  
  // fetchBackendData();
  //  },[]);

   const userProfileData = userData?.data.payload.map((items)=>items.user);
   console.log("userProfileData",userProfileData);

   const  ArrangeDateFormat = (JourneyDate) =>{
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
}

    return(
      isLoading? (<Loader/>):(
        <div className='dashboard-content'>
        <div className='dashboard-content-container'>
              {
                userProfileData?.map((items , index)=>(
                  <div key={index} >
                      {
                        index ===0 &&(
                         <Fragment>
                            <div className="m-3 background_line ">
                                <div className="d-flex justify-content-start">
                                    <div className="userProfile_bg">
                                        <div className="user_profile text-center">
                                            <div className="m-1  ">
                                              <img src={images.userProfile} alt="" />
                                            </div>
                                            <h3>{items.firstName}</h3>
                                            <div className='userprofile_data  mt-2'>
                                                <div className='usercountry'>
                                                    <p className=''>Country Code:</p>
                                                    <h6 className='contact_info_data'>{items.countryCode}</h6>
                                                </div>
                                                <div className=' '>
                                                    <p className=''> Mobile No:</p>
                                                    <h6 className='contact_info_data '>{items.phoneNumber}</h6>
                                                </div>
                                            </div>
                                            <div className='text-center mt-4'>
                                              <button className='btn btn-primary profile_update_btn' onClick={openEditModel}>
                                                    Update Your profile
                                              </button>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="userprofile_seprator background_line">
                                        <DonutLargeIcon className="donut_size"/>
                                        <div className='userpanel-vertical-line'></div>
                                        <DonutLargeIcon className="donut_size"/>
                                    </div>

                                    <div className="  user_name background_line">
                                        <h3 className=" line_details m-b-20  f-w-600">Personal Details</h3>
                                        <div className='   mb-4 '>
                                            <p className='user_detials_heading user_detail_p'>First Name :</p>
                                            <h6 className='user_detials_data '>{items.firstName || '_'}  </h6>

                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>Last Name :</p>
                                            <h6 className='user_detials_data '>{items.lastName || '_'}</h6>
                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>Gender :</p>
                                            <h6 className='user_detials_data '>{items.gender || '_'} </h6>

                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>CNIC :</p>
                                            <h6 className='user_detials_data '>{items.cnic || '_'}</h6>

                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>Date of Birth :</p>
                                            <h6 className='user_detials_data '> {ArrangeDateFormat(items.dateOfBirth) || '_'}</h6>
                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>Passport No :</p>
                                            <h6 className='user_detials_data '>{items.passportNo || '_'}</h6>
                                        </div>

                                    </div>


                                </div>
                            </div>
                            </Fragment>
                        )
                      }
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
      
      
    )
}

export default UserProfile;