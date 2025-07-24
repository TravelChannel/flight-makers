import React, { useState, useEffect } from "react";
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
import Select from "react-select";
// import { AirlineDropDown, FareClassDropDown } from '../../../../../API/BackendAPI/CommissionAPI';
import { AirlineDropDown } from "../../../../../API/BackendAPI/CommissionAPI/AirlineDropDown";
import { FareClassDropDown } from "../../../../../API/BackendAPI/CommissionAPI/FareClassDropDown";
import { SectorDropDown } from "../../../../../API/BackendAPI/CommissionAPI/SectorDropDown";
import { AddCommissionPercentage } from "../../../../../API/BackendAPI/CommissionAPI/AddCommissionPercentage";
import { DatePicker } from "antd";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CommissionModel = (props) => {
  const {
    isOpen,
    setIsOpen,
    setCommPassingObj,
    CommissionPassingObj,
    handleCommissionPercentage,
  } = props;
  const [isTitle, setTitle] = useState();
  const [selectedAirlineOption, setSelectedAirlineOption] = useState(null);
  const [selectedFareClassOption, setSelectedFareClassOption] = useState(null);
  const [selectedSectorOptions, setSelectedSectorOptions] = useState(null);
  const [customValue, setCustomValue] = useState("");
  const [airlineOptions, setAirlineOptions] = useState([]);
  const [fareClassOptions, setFareClassOptions] = useState([]);
  const [sectorWiseOptions, setSectorEiseOptions] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleModelTitle = (event) => {
    const numericRegex = /^[0-9]*\.?[0-9]*$/;
    const newValue = event.target.value;

    // Check if the new value matches the numeric regex
    if (numericRegex.test(newValue) || newValue === "") {
      setTitle(newValue);
    }
  };

  const handleAirlineChange = (selected) => {
    setSelectedAirlineOption(selected);
  };

  const handleFareClassChange = (selected) => {
    setSelectedFareClassOption(selected);
  };

  const handleSectorChange = (selected) => {
    setSelectedSectorOptions(selected);
  };

  const handleInputChange = (inputValue) => {
    setCustomValue(inputValue);
  };

  const handleAddCustomValue = () => {
    if (customValue.trim() !== "") {
      const newOption = { value: customValue, label: customValue };
      setSelectedAirlineOption(newOption);
    }
  };

  useEffect(() => {
    const fetchAirlineDropDown = async () => {
      try {
        const response = await AirlineDropDown();
        const options = response.data.payload.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setAirlineOptions(options);
      } catch (error) {
        console.error("Error fetching airline dropdown:", error);
      }
    };
    fetchAirlineDropDown();
  }, []);

  useEffect(() => {
    const fetchFareClassDropDown = async () => {
      try {
        const response = await FareClassDropDown();
        const options = response.data.payload.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setFareClassOptions(options);
      } catch (error) {
        console.error("Error fetching fare class dropdown:", error);
      }
    };
    fetchFareClassDropDown();
  }, []);

  useEffect(() => {
    const fetchSectorWise = async () => {
      try {
        const resp = await SectorDropDown();
        const options = resp.data.payload.map((item) => ({
          value: item.id,
          label: item.name,
        }));
        setSectorEiseOptions(options);
      } catch (error) {
        console.error("Error fetching sector class dropdown:", error);
      }
    };
    fetchSectorWise();
  }, []);

  const CommissionDataObj = {
    AirlineWise: selectedAirlineOption,
    farewise: selectedFareClassOption,
    sectorwise: selectedSectorOptions,
  };

  console.log("comm-obj-to-pass", CommissionDataObj);
  const formatDateToString = (date) => {
    return date ? date.toISOString().split("T")[0] : null;
  };
  // const PassCommData = {
  //     percentage:  parseInt(isTitle),
  //     airlineId: CommissionDataObj.AirlineWise?.value || null,
  //     fareClassId: CommissionDataObj.farewise?.value || null,
  //     sectorId: CommissionDataObj.sectorwise?.value || null,
  //     startDate: formatDateToString(startDate),
  //     endDate: formatDateToString(endDate)
  // };
  const PassCommData = {
    percentage: parseInt(isTitle),
    airlineId: CommissionDataObj.AirlineWise?.value || null,
    // airlinelabel: CommissionDataObj.AirlineWise?.label || null,
    fareClassId: CommissionDataObj.farewise?.value || null,
    // fareClasslabel: CommissionDataObj.farewise?.label || null,
    sectorId: CommissionDataObj.sectorwise?.value || null,
    // sectorlabel: CommissionDataObj.sectorwise?.label || null,
    startDate: formatDateToString(startDate),
    endDate: formatDateToString(endDate),
  };

  console.log("passingObjtoCommAPi", PassCommData);

  const handleCloseModel = async () => {
    try {
      console.log("kashifG", PassCommData);
      const response = await AddCommissionPercentage(PassCommData);
      // const updatedCommissionObj = [...CommissionPassingObj, response.data.payload];
      // setCommPassingObj(updatedCommissionObj);
      handleCommissionPercentage();
      console.log("Response from Commission API:", response);
      toast.success("Commission Added Successfully!", { autoClose: 2000 });
    } catch (error) {
      console.log("Error on CommissionPage:", error);
    }
    setIsOpen(false);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };
  //   const disabledStartDate = (current) => {
  //     return current && current < new Date();
  //   };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="custom_modal_commission"
      >
        <ModalHeader toggle={toggleModal}>
          <div id="logobox" className="hdrLogo">
            <img src={images.default} className="imgView w-91" alt="FM-LOGO" />
            <span id="logotext" className="colorBlue d-block"></span>
          </div>
        </ModalHeader>
        <ModalBody>
          <h3 className="edit_model_body center_promotion_heading">
            Add Commission
          </h3>
          <div className="user_input_row">
            <div className="commisson_main">
              <h6 className="commission_title d-flex justify-content-center">
                Enter Commission in Percentage (%):
              </h6>
              <div className="promotion_title_main d-flex justify-content-center">
                <Box
                  sx={{
                    width: 500,
                    maxWidth: "50%",
                  }}
                >
                  <TextField
                    fullWidth
                    id="fullWidth"
                    value={isTitle}
                    onChange={handleModelTitle}
                  />
                </Box>
              </div>
            </div>
            <div>
              <div>
                <div className="text-center comm_input_title">
                  Select Airline Wise :
                </div>
                <div className="d-flex justify-content-center">
                  <Select
                    value={selectedAirlineOption}
                    onChange={handleAirlineChange}
                    options={airlineOptions}
                    isClearable
                    isSearchable
                    placeholder="Select airline..."
                    className="CommissionInputFields"
                    onCreateOption={handleAddCustomValue}
                    onInputChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div className="text-center comm_input_title">
                  Select Fare Class Wise :
                </div>
                <div className="d-flex justify-content-center">
                  <Select
                    value={selectedFareClassOption}
                    onChange={handleFareClassChange}
                    options={fareClassOptions}
                    isClearable
                    isSearchable
                    placeholder="Select fare class..."
                    className="CommissionInputFields"
                    onCreateOption={handleAddCustomValue}
                    onInputChange={handleInputChange}
                  />
                </div>
              </div>
              <div>
                <div className="text-center comm_input_title">
                  Select Sector Wise :
                </div>
                <div className="d-flex justify-content-center">
                  <Select
                    value={selectedSectorOptions}
                    onChange={handleSectorChange}
                    options={sectorWiseOptions}
                    isClearable
                    isSearchable
                    placeholder="Select Sector..."
                    className="CommissionInputFields"
                    onCreateOption={handleAddCustomValue}
                    onInputChange={handleInputChange}
                  />
                </div>
              </div>

              <div
                className="d-flex justify-content-center comm_date_picker "
                style={{ width: "560px" }}
              >
                <DatePicker
                  placeholder="Start Date"
                  className="promStartCalander"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
                <DatePicker
                  placeholder="End Date"
                  className="promStartCalander"
                  value={endDate}
                  onChange={handleEndDateChange}
                  disabledDate={(current) => current && current < startDate}
                />
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary btn_promotion_model"
                onClick={handleCloseModel}
              >
                ADD
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CommissionModel;
