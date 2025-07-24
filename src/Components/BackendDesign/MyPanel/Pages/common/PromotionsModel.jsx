import React, { useState, Fragment, useRef } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
} from "reactstrap";
import * as images from "../../../../../Constant/images";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AddPromotions } from "../../../../../API/BackendAPI/allAPICalls";
// import { GetAllPromotions } from '../../../../../API/BackendAPI/UserBookingDetails';
import { UpdatePromotion } from "../../../../../API/BackendAPI/allAPICalls";
import { DatePicker } from "antd";
import CampaignIcon from "@mui/icons-material/Campaign";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Loader from "../../../../../Loader/Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PromotionsModel = (props) => {
  const [isTitle, setTitle] = useState("");
  const [isDesc, setDesc] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [imgSrc, setImgSrc] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isClick, setisClick] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // console.log("isTitle",isTitle);
  const {
    isOpen,
    setIsOpen,
    promotionData,
    setPromotionData,
    isUpdate,
    setUpdate,
    updateID,
  } = props;

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
        setLoading(true);
        const formData = new FormData();
        const dataStringify = JSON.stringify(PromotionsValue);

        formData.append("data", dataStringify);

        const fileInput = document.getElementById(
          "account-settings-upload-image"
        );
        if (fileInput && fileInput.files && fileInput.files[0]) {
          const imgFile = fileInput.files[0];
          formData.append("imgFile", imgFile);
        }

        console.log("hello-FormData-here", formData);
        const response = await AddPromotions(formData);
        console.log("Add API Response", response);
        setPromotionData([...promotionData, response?.data?.payload]);
        setLoading(false);
        toast.success("Promotion Added Successfully!", { autoClose: 2000 });
      }

      setIsOpen(false);
      setUpdate(false);
    } catch (error) {
      console.error("API Error", error);
    }
  };
  // ----------------
  const handleModelTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleModelDesc = (event) => {
    setDesc(event.target.value);
  };

  const formatDateToString = (date) => {
    return date ? date.toISOString().split("T")[0] : null;
  };

  const PromotionsValue = {
    title: isTitle,
    description: isDesc,
    startDate: formatDateToString(startDate),
    endDate: formatDateToString(endDate),
  };

  console.log("PromotionsValuePromotionsValue", PromotionsValue);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  // const disabledStartDate = (current) => {
  //   return current && current < new Date();
  // };
  // -----------------------------------------------------

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Trigger the file input click event
    fileInputRef.current.click();
    setisClick(true);
  };
  const handleInputImageChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
        setInputValue(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type. Please select an image (PNG or JPEG).");
    }
  };

  const handleInputImageReset = () => {
    setImgSrc("");
    setInputValue("");
    setisClick(false);
  };
  //  ---------------------------------------------------------------
  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="custom_modal_promotion "
      >
        <ModalHeader toggle={toggleModal}>
          <div id="logobox" className="hdrLogo">
            <img src={images.default} className="imgView w-91" alt="FM-LOGO" />
            <span id="logotext" className="colorBlue d-block"></span>
          </div>
        </ModalHeader>
        {isLoading ? (
          <Loader />
        ) : (
          <ModalBody>
            {isUpdate ? (
              <div className="d-flex justify-content-center center_promotion_heading">
                <p className="align-self-center px-1">
                  <CampaignIcon />
                </p>
                <h3 className="edit_model_body "> Update Promotion</h3>
              </div>
            ) : (
              <div className="d-flex justify-content-center center_promotion_heading">
                <p className="align-self-center">
                  <CampaignIcon />
                </p>
                <h3 className="edit_model_body "> Add New Promotion</h3>
              </div>
            )}
            <div className=" user_input_row">
              <div className="">
                <div className="d-flex justify-content-center">
                  {/* <h3 className='editModel_labeling align-self-center'>Title</h3> */}
                  <div className="promotion_title_main ">
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "90%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Title"
                        id="fullWidth"
                        value={isTitle}
                        onChange={handleModelTitle}
                      />
                    </Box>
                  </div>
                </div>

                <div className="d-flex justify-content-center">
                  {/* <h3 className='editModel_labeling align-self-center '>Discription</h3> */}
                  <div className="promotion_discription_main ">
                    <Box
                      sx={{
                        width: 500,
                        maxWidth: "90%",
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Discription"
                        id="fullWidth"
                        value={isDesc}
                        onChange={handleModelDesc}
                      />
                    </Box>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-start prom_date_picker "
                  style={{ width: "695px" }}
                >
                  <DatePicker
                    placeholder="Start Date"
                    className="promStartCalander"
                    value={startDate}
                    onChange={handleStartDateChange}
                    // disabledDate={disabledStartDate}
                  />
                  <DatePicker
                    placeholder="End Date"
                    className="promStartCalander"
                    value={endDate}
                    onChange={handleEndDateChange}
                    disabledDate={(current) => current && current < startDate}
                  />
                </div>
                <div className="mt-3 center_promotion_heading d-flex justify-content-center">
                  <p className="align-self-center px-1">
                    <CloudUploadIcon />
                  </p>
                  <h3 className="edit_model_body "> Upload Promotion Image</h3>
                </div>
                <div className="d-flex justify-content-center promotion_img_hndler">
                  {/* <p className="title_typograpy">Upload Image</p> */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <div className="text-center">
                      {isClick && (
                        <div className="d-flex justify-content-center">
                          <img
                            src={imgSrc}
                            alt="Profile Pic"
                            width="30%"
                            className="m-2"
                          />
                        </div>
                      )}
                      <div>
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={handleInputImageChange}
                          id="account-settings-upload-image"
                          style={{ display: "none" }}
                          ref={fileInputRef}
                        />
                      </div>
                      <button
                        className="btn btn-primary addPromo_btn p-3 m-2"
                        onClick={handleButtonClick}
                      >
                        Select Image
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={handleInputImageReset}
                      >
                        Reset
                      </button>
                      <p className="upload_ins">
                        Allowed PNG or JPEG. Max size of 800K.
                      </p>
                    </div>
                  </Box>
                </div>
              </div>
              <div
                className="d-flex justify-content-center"
                onClick={SubmitDetail}
              >
                {isUpdate ? (
                  <Fragment>
                    <button className="btn btn-primary btn_promotion_model">
                      Update
                    </button>
                    {/* <button className='btn btn-primary btn_promotion_model mx-2'>DeActivate</button> */}
                  </Fragment>
                ) : (
                  <button className="btn btn-primary btn_promotion_model">
                    Submit
                  </button>
                )}
              </div>
            </div>
          </ModalBody>
        )}
      </Modal>
    </div>
  );
};

export default PromotionsModel;
