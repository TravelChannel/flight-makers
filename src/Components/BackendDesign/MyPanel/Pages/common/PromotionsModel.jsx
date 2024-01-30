import React ,{useState,Fragment}from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, } from 'reactstrap';
import * as images from '../../../../../Constant/images';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { AddPromotions } from '../../../../../API/BackendAPI/UserBookingDetails';
// import { GetAllPromotions } from '../../../../../API/BackendAPI/UserBookingDetails';
import { UpdatePromotion } from '../../../../../API/BackendAPI/UserBookingDetails';
const PromotionsModel = (props) => {
    const [isTitle ,setTitle]  =useState('');
    const [isDesc ,setDesc]  =useState('');

    // console.log("isTitle",isTitle);
    const {isOpen , setIsOpen,promotionData,setPromotionData,isUpdate ,setUpdate ,updateID} = props;

    // console.log("userUpdateId",updateID );

    // console.log('KAshifG',isUpdate);
    const toggleModal = () => {
        setIsOpen(!isOpen);
      };

      // const SubmitDetail =async ()=>{
      //   try{
      //       const responce = await AddPromotions(PromotionsValue);
      //       console.log("AddAPI Responce",responce);
      //       setPromotionData([...promotionData, responce?.data?.payload])
      //       setIsOpen(false);
      //   }catch(error){
      //       console.error("ADD Promotions API Error",error);
      //   }
        
      // }
      const SubmitDetail = async () => {
        try {
          if (isUpdate) {
            const response = await UpdatePromotion(updateID);
            console.log("Update API Response", response);
          } else {
            const response = await AddPromotions(PromotionsValue);
            console.log("Add API Response", response);
            setPromotionData([...promotionData, response?.data?.payload]);
          }
      
          setIsOpen(false);
          setUpdate(false);
        } catch (error) {
          console.error("API Error", error);
        }
      };
      // ----------------
      const handleModelTitle =(event)=>{
        setTitle(event.target.value);
      }
      const handleModelDesc = (event)=>{
        setDesc(event.target.value);
      }

      const PromotionsValue = {
        title:isTitle,
        description:isDesc
      }

    //   console.log('PromotionsValue',PromotionsValue);
     
  return (
    <div>
        <Modal isOpen={isOpen} toggle={toggleModal} className="custom_modal_promotion ">
            <ModalHeader toggle={toggleModal}>
            <div id="logobox" className="hdrLogo"><img src={images.default} className="imgView w-91" alt="FM-LOGO"/><span id="logotext" className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span></div>
            </ModalHeader>
            <ModalBody>
            { isUpdate ?(<h3 className='edit_model_body center_promotion_heading'>Update Promotion</h3>):(<h3 className='edit_model_body center_promotion_heading'>Add New Promotion</h3>)}
            <div className=' user_input_row'>
                    <div className=''>
                    <div className='d-flex justify-content-center'>
                    {/* <h3 className='editModel_labeling align-self-center'>Title</h3> */}
                    <div className='promotion_title_main '>
                        <Box
                        sx={{
                            width: 500,
                            maxWidth: '90%',
                        }}
                        > 
                        <TextField fullWidth label="Title" id="fullWidth" value = {isTitle} onChange={handleModelTitle} />
                        </Box>
                    </div>
                 </div>
               
               
                <div className='d-flex justify-content-center'>
                    {/* <h3 className='editModel_labeling align-self-center '>Discription</h3> */}
                    <div className='promotion_discription_main '>
                    <Box
                        sx={{
                            width: 500,
                            maxWidth: '90%',
                        }}
                        >
                        <TextField fullWidth label="Discription" id="fullWidth" value={isDesc} onChange={handleModelDesc} />
                    </Box>
                        
                    </div>
                </div>
                    </div>
                <div className='d-flex justify-content-center' onClick={SubmitDetail}>
                   {
                    isUpdate ?(
                     <Fragment>
                     <button className='btn btn-primary btn_promotion_model'>Update</button>
                      <button className='btn btn-primary btn_promotion_model mx-2'>DeActivate</button>
                     </Fragment>
                    ):(
                       <button className='btn btn-primary btn_promotion_model'>Submit</button>)
                   }
                </div>
          </div>
            </ModalBody>
        </Modal>
    </div>
  )
}

export default PromotionsModel;