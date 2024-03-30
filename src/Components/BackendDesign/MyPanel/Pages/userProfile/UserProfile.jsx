import React,{useState , useEffect, Fragment} from 'react';
import userDetailsBackend from '../../../../../API/BackendAPI/BackendAPI_Fun';
import * as images from '../../../../../Constant/images';
import EditModel from '../common/EditModel';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import Loader from '../../../../../Loader/Loader';
import { VerificationAPi } from '../../../../../API/BackendAPI/Find_me_verification';
import { useFormData } from '../../../../../Context/FormDataContext';


const UserProfile = (props)=>{
  const {isLoading,checkAdmin,partialAdmin} = props;
  const {userVerName,userCountryCode} =useFormData();
  const [ProfileData ,setProfileData] =useState([]);
  const [backLoading , setBackLoading] =useState(true);
  const [isOpen , setIsOpen] = useState(false);
  const [isMobile , setIsMobile] = useState(window.innerWidth < 467);

  // const [userProfiles ,SetUserProfiles] = useState([]);
  


  const openEditModel = ()=>{
    setIsOpen(true);
  }
// ---------------------APi----------------
// useEffect(()=>{
//   const userProfileData = ProfileData.payload.userData;
//   SetUserProfiles(userProfileData);
//   console.log("userProfileData",userProfileData);
// },[]);


        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await VerificationAPi();  
              console.log("Verification-API",response);
              if (response.data.status === 'SUCCESS') {
                console.log('test1',response.data.payload );
                setProfileData(response.data.payload.userData);
                //  setUserName(ProfileData.firstName);

              } else {
                console.log('User is not logged in');
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };

          fetchData();  
        }, []); 

  console.log('ProfileDataProfileData112',ProfileData);

// -----------------
useEffect(()=>{
  const handleResize = ()=>{
    setIsMobile(window.innerWidth < 467);
  };
  window.addEventListener('resize', handleResize);
  return()=>{
    window.removeEventListener('resize', handleResize);
  }
},[]);
// --------------------

   const  ArrangeDateFormat = (JourneyDate) =>{
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
}

    return(
      isLoading? (<Loader/>):(
        <div className='dashboard-content'>
        <div className='dashboard-content-container'>
                  <div  >
                         <Fragment>
                         {
                          isMobile ?(
                            <div className=' contact_card_main' 
                  // key={detailIndex}
                  >
                      <div className="profile-card">
                          <header>
                              <h3>{`${userCountryCode} ${userVerName} `}</h3>
                              <div className="image">
                                  <img src={images.userProfile} alt='abc' />
                              </div>
                              <h3 className='profile_itenty' >{`${ProfileData.firstName} ${ProfileData.lastName} `}</h3>
                          </header>
                      <div className='d-flex justify-content-around'>
                                  <div className="content">
                                      <p>Gender:</p>
                                      <p>Passport:</p>
                                      <p>Cnic:</p>
                                      <p>DOB:</p>
                                  </div>
                                  <div className="content">
                                      <p>{ProfileData.gender || '_'}</p>
                                      <p>{ProfileData.passportNo || '_'} </p>
                                      <p>{ProfileData.cnic || '_'}</p>
                                      <p>{ArrangeDateFormat(ProfileData.dateOfBirth) || '_'}</p>
                                  </div>
                                  
                      </div> 
                        <div className='text-center py-3'>
                            <button className='btn btn-primary profile_update_btn' onClick={openEditModel}>
                                Update Your profile
                            </button>
                      </div>
                      </div>
                      
                </div>
                          ):(
                            <div className="m-3 background_line ">
                                <div className="d-flex justify-content-start">
                                    <div className="userProfile_bg">
                                        <div className="user_profile text-center">
                                            <div className="m-1  ">
                                              <img src={images.userProfile} alt="" />
                                            </div>
                                            <h3>{ProfileData.firstName}</h3>
                                            <div className='userprofile_data  mt-2'>
                                                <div className='usercountry'>
                                                    <p className=''>Country Code:</p>
                                                    <h6 className='contact_info_data'>{userCountryCode}</h6>
                                                </div>
                                                <div className=' '>
                                                    <p className=''> Mobile No:</p>
                                                    <h6 className='contact_info_data '>{userVerName}</h6>
                                                </div>
                                            </div>
                                            <div className='text-center mt-4'>
                                              <button className='btn btn-primary profile_update_btn' onClick={openEditModel}>
                                                    Edit Your profile
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
                                        {
                                          checkAdmin || partialAdmin ?(<h3 className=" line_details m-b-20  f-w-600">Admin Details</h3>):(<h3 className=" line_details m-b-20  f-w-600">Personal Details</h3>)
                                        }
                                        <div className='   mb-4 '>
                                            <p className='user_detials_heading user_detail_p'>First Name :</p>
                                            <h6 className='user_detials_data '>{ProfileData.firstName || '_'}  </h6>

                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>Last Name :</p>
                                            <h6 className='user_detials_data '>{ProfileData.lastName || '_'}</h6>
                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>Gender :</p>
                                            <h6 className='user_detials_data '>{ProfileData.gender || '_'} </h6>

                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>CNIC :</p>
                                            <h6 className='user_detials_data '>{ProfileData.cnic || '_'}</h6>

                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>Date of Birth :</p>
                                            <h6 className='user_detials_data '> {ArrangeDateFormat(ProfileData.dateOfBirth) || '_'}</h6>
                                        </div>
                                        <div className=' mb-4'>
                                            <p className='user_detials_heading '>Passport No :</p>
                                            <h6 className='user_detials_data '>{ProfileData.passportNo || '_'}</h6>
                                        </div>

                                    </div>


                                </div>
                            </div>
                          )
                         }
                            
                            </Fragment>
                  </div>
              {
                isOpen ?(
                  <EditModel isOpen ={isOpen} setIsOpen={setIsOpen}
                   setProfileData ={setProfileData} ProfileData ={ProfileData}
                   />
                ):('')
              }
          
        </div>
        
      </div>

      )
      
      
    )
}

export default UserProfile;