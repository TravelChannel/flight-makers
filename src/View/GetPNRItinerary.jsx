import React, { useState, useEffect, Fragment } from "react";
import * as image from "../Constant/images";
import FlightIcon from '@mui/icons-material/Flight';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import QRCode from 'qrcode.react';
import CryptoJS from 'crypto-js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { cityNameFunct, convertDateFormat ,convertTimeFormat,AmadeuselapsedTime, airportNameFunct ,formatCustomDate} from '../helpers/formatdata';
import { useFormData } from '../Context/FormDataContext';
import { useLocation } from "react-router";
import { useNavigate } from "react-router";


const GetPNRItinerary = () => {
  return (
    <div className="container bg-white">
        <div>
          i am here 
        </div>
    </div>
  );
}
export default GetPNRItinerary;