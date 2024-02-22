import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
import * as images from '../../../../../Constant/images';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from 'react-select';
// import { AirlineDropDown, FareClassDropDown } from '../../../../../API/BackendAPI/CommissionAPI';
import { AirlineDropDown } from '../../../../../API/BackendAPI/CommissionAPI/AirlineDropDown';
import { FareClassDropDown } from '../../../../../API/BackendAPI/CommissionAPI/FareClassDropDown';
import { SectorDropDown } from '../../../../../API/BackendAPI/CommissionAPI/SectorDropDown';
import { AddCommissionPercentage } from '../../../../../API/BackendAPI/CommissionAPI/AddCommissionPercentage';

const CommissionModel = (props) => {
    const { isOpen, setIsOpen ,setCommPassingObj,CommissionPassingObj } = props;
    const [isTitle, setTitle] = useState();
    const [selectedAirlineOption, setSelectedAirlineOption] = useState(null);
    const [selectedFareClassOption, setSelectedFareClassOption] = useState(null);
    const [selectedSectorOptions , setSelectedSectorOptions] = useState(null);
    const [customValue, setCustomValue] = useState('');
    const [airlineOptions, setAirlineOptions] = useState([]);
    const [fareClassOptions, setFareClassOptions] = useState([]);
    const [sectorWiseOptions ,setSectorEiseOptions] = useState([]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleModelTitle = (event) => {
        const numericRegex = /^[0-9]*\.?[0-9]*$/;
        const newValue = event.target.value;

        // Check if the new value matches the numeric regex
        if (numericRegex.test(newValue) || newValue === '') {
            setTitle(newValue);
        }
    };

    const handleAirlineChange = (selected) => {
        setSelectedAirlineOption(selected);
    };

    const handleFareClassChange = (selected) => {
        setSelectedFareClassOption(selected);
    };

    const handleSectorChange = (selected) =>{
        setSelectedSectorOptions(selected)
    }

    const handleInputChange = (inputValue) => {
        setCustomValue(inputValue);
    };

    const handleAddCustomValue = () => {
        if (customValue.trim() !== '') {
            const newOption = { value: customValue, label: customValue };
            setSelectedAirlineOption(newOption);
        }
    };

    useEffect(() => {
        const fetchAirlineDropDown = async () => {
            try {
                const response = await AirlineDropDown();
                const options = response.data.payload.map(item => ({
                    value: item.id,
                    label: item.name
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
                const options = response.data.payload.map(item => ({
                    value: item.id,
                    label: item.name
                }));
                setFareClassOptions(options);
            } catch (error) {
                console.error("Error fetching fare class dropdown:", error);
            }
        };
        fetchFareClassDropDown();
    }, []);

    useEffect(() =>{
        const fetchSectorWise = async () =>{
            try{
                const resp = await SectorDropDown();
                const options = resp.data.payload.map(item => ({
                    value: item.id,
                    label: item.name
                }));
                setSectorEiseOptions(options);
            }catch (error) {
                console.error("Error fetching sector class dropdown:", error);
            }
        }
        fetchSectorWise();
    },[])

    const CommissionDataObj = {
        AirlineWise:selectedAirlineOption,
        farewise:selectedFareClassOption,
        sectorwise:selectedSectorOptions
    }

    console.log("comm-obj-to-pass",CommissionDataObj);

    const PassCommData = {
        percentage:  parseInt(isTitle),
        airlineId: CommissionDataObj.AirlineWise?.value || null,
        fareClassId: CommissionDataObj.farewise?.value || null,
        sectorId: CommissionDataObj.sectorwise?.value || null
    };

    console.log("passingObjtoCommAPi", PassCommData);

    const handleCloseModel =async () =>{
        try {
                      console.log('kashifG',PassCommData);
                        const response = await AddCommissionPercentage(PassCommData);
                        const updatedCommissionObj = [...CommissionPassingObj, response.data.payload];
                        setCommPassingObj(updatedCommissionObj);
                        console.log("Response from Commission API:", response);
                    } catch (error) {
                        console.log("Error on CommissionPage:", error);
                    }
        setIsOpen(false);

    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggleModal} className="custom_modal_commission">
                <ModalHeader toggle={toggleModal}>
                    <div id="logobox" className="hdrLogo">
                        <img src={images.default} className="imgView w-91" alt="FM-LOGO" />
                        <span id="logotext" className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <h3 className='edit_model_body center_promotion_heading'>Add Commission</h3>
                    <div className='user_input_row'>
                        <div className='commisson_main'>
                            <h6 className='commission_title d-flex justify-content-center'>Enter Commission in Percentage (%):</h6>
                            <div className='promotion_title_main d-flex justify-content-center'>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '50%',
                                    }}
                                >
                                    <TextField fullWidth id="fullWidth" value={isTitle} onChange={handleModelTitle} />
                                </Box>
                            </div>
                        </div>
                        <div >
                            <div >
                                <div className='text-center comm_input_title'>Select Airline Wise :</div>
                               <div className='d-flex justify-content-center'>
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
                                <div className='text-center comm_input_title'>Select Fare Class Wise :</div>
                                    <div className='d-flex justify-content-center'>
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
                                <div className='text-center comm_input_title'>Select Sector Wise :</div>
                                    <div className='d-flex justify-content-center'>
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
                        </div>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-primary btn_promotion_model' onClick={handleCloseModel}>ADD</button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default CommissionModel;
