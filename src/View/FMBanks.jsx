import React, { useState, useEffect, Fragment, useRef } from "react";
import * as images from "../../src/Constant/images";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import ContactSources from "../Components/Commom/ContactSources";
import { MasterPriceTravelResults } from "../API/AmadeousAPI";
import { cityNameFunct } from "../helpers/formatdata";
import { indexOf } from "lodash";

const FMBanks = () => {
  // --------even & Odd Switcher-----------
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [isNum, setNum] = useState(0);
  const [isOdd, setIsOdd] = useState(true);
  const [userInput, setUserInput] = useState("");

  const handleNumbers = () => {
    let nextIndex;
    if (isOdd) {
      nextIndex = (isNum + 1) % numbers.length;
      setNum(isNum + 2);
    } else {
      nextIndex = (isNum + 2) % numbers.length;
    }

    setNum(nextIndex);
    setIsOdd(!isOdd);
  };

  // --------- Palindrome Checker----------------------
  const handleUserInput = (event) => {
    const value = event.target.value;
    setUserInput(value);
  };

  const handlePalindrome = () => {
    // for(let i= 0 ; i < userInput.length ; i++ ){
    //   if(userInput[i])
    // }
    let reverseValue = userInput.split("").reverse().join("");
    console.log("reverseValue", reverseValue);
    if (userInput === reverseValue) {
      alert("✅ Palindrome");
    } else {
      alert("❌ Not a palindrome");
    }
  };

  // ----------------------

  return (
    <div className="container">
      <div className="contact_us_heading d-flex justify-content-center">
        <AccountBalanceRoundedIcon className="about_detail_icon " />
        <h3 className="fmBanks_main_heading">
          Channel Group Consulting LLC Official Bank Accounts:
        </h3>
      </div>
      <div className="banks_main">
        <div className="row">
          <div className=" col-md-4 col-sm-6 habib_bank_details">
            <div>
              <div className="hbl_header d-flex justify-content-center">
                <img src={images.hbllogo} alt="" width="40px" />
                <p className="hbl_name">Habib Bank Limited</p>
              </div>
              <div className="hbl_body">
                <div className="accounts_details d-flex justify-content-start">
                  <p className="account_title align-self-center ">
                    Account Title:
                  </p>
                  <p className="align-self-center account_title_body ">
                    Channel Group Consulting LLC Int'l Pvt Ltd
                  </p>
                </div>
                <div className="accounts_details d-flex justify-content-start">
                  <p className="account_title align-self-center">
                    Account Number:
                  </p>
                  <p className=" account_title_body "> 1060-7900329303</p>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-md-4 col-sm-6 habib_bank_details">
            <div className="hbl_header d-flex justify-content-center">
              <img src={images.SCBank} alt="" width="15px" />
              <p className="hbl_name">STANDARD CHARTERED</p>
            </div>
            <div className="hbl_body">
              <div className="accounts_details d-flex justify-content-start">
                <p className="account_title align-self-center ">
                  Account Title:
                </p>
                <p className="align-self-center account_title_body ">
                  Channel Group Consulting LLC Int'l Pvt Ltd
                </p>
              </div>
              <div className="accounts_details d-flex justify-content-start">
                <p className="account_title align-self-center">
                  Account Number:
                </p>
                <p className=" account_title_body "> 01-7011197-01</p>
              </div>
            </div>
          </div>
          <div className=" col-md-4 col-sm-6 habib_bank_details">
            <div className="hbl_header d-flex justify-content-center">
              <img src={images.MBBank} alt="" width="25px" />
              <p className="hbl_name">Meezan Bank</p>
            </div>
            <div className="hbl_body">
              <div className="accounts_details d-flex justify-content-start">
                <p className="account_title align-self-center ">
                  Account Title:
                </p>
                <p className="align-self-center account_title_body ">
                  Channel Group Consulting LLC Int'l Pvt Ltd
                </p>
              </div>
              <div className="accounts_details d-flex justify-content-start">
                <p className="account_title align-self-center">
                  Account Number:
                </p>
                <p className=" account_title_body "> 0287-0101682411</p>
              </div>
            </div>
          </div>
          <div className="help_desk">
            <ContactSources />
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}

      <div className="bg-white px-3">
        <h3 onClick={handleNumbers}>{numbers[isNum]}</h3>

        <input
          type="text"
          value={userInput}
          placeholder="Enter the String"
          className="m-2 p-2"
          onChange={handleUserInput}
        />
        <button onClick={handlePalindrome}> Click to Check</button>
      </div>
    </div>
  );
};

export default FMBanks;
