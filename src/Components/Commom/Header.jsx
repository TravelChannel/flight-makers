import React, { Fragment, useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import * as image from "../../Constant/images";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import GroupsIcon from "@mui/icons-material/Groups";
import WifiCallingIcon from "@mui/icons-material/WifiCalling";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LoginIcon from "@mui/icons-material/Login";
import { CSSTransition } from "react-transition-group";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [shouldApplyBoxShadow, setShouldApplyBoxShadow] = useState(false);

  const displayMenu = () => {
    setMenu(!false);
  };

  const closeMenu = () => {
    setMenu(false);
  };

  const handleScroll = () => {
    const scrollTop =
      window.scrollY || document.documentElement.scrollTop;
    setIsScrolled(scrollTop > 10 );
    const threshold = 100;
    setIsFixed(scrollTop >= threshold);
    setShouldApplyBoxShadow(scrollTop >= threshold);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Fragment>
      <div className="container">
        <div className="header">
          <div className={`container ${isFixed ? "fixedHeader" : ""}`}>
            <div
              className={`my-element ${
                shouldApplyBoxShadow ? "apply-box-shadow" : ""
              }`}
            >
              <ul className="mainLinks DesktopMenu pt-2 pb-1" id="myNavBar">
                <li id="logo d-inline-block">
                  <Link
                    id="logobox"
                    to={'/'}
                    className="hdrLogo"
                  >
                    <img
                      src={image.default}
                      className="imgView"
                      alt="FM-LOGO"
                    />
                    <span id="logotext" className="colorBlue d-block">
                      Travel Channel Int'l (Pvt).Ltd
                    </span>
                  </Link>
                </li>
                <li
                  className={`${isScrolled ? "showText" : "hideIndex"}`}
                >
                  <Link to="">
                    <img
                      src={image.planelogo}
                      className="w-35"
                      alt="FLIGHTS-LOGO"
                    />
                    <br />
                    <span className="iconText menuItem">Flights</span>
                  </Link>
                </li>
                <li
                  id="hotels"
                  className={`${isScrolled ? "showText" : "hideIndex"}`}
                >
                  <Link to="">
                    <img
                      src={image.hotellogo}
                      className="w-35"
                      alt="HOTEL-LOGO"
                    />
                    <br />
                    <span className="iconText menuItem">Hotels</span>
                  </Link>
                </li>
                <li
                  id="hotels"
                  className={`${isScrolled ? "showText" : "hideIndex"}`}
                >
                  <Link to="">
                    <img
                      src={image.MallIconMob}
                      className="w-35"
                      alt="HOTEL-LOGO"
                    />
                    <br />
                    <span className="iconText menuItem">Mall</span>
                  </Link>
                </li>
                <li
                  id="hotels"
                  className={`${isScrolled ? "showText" : "hideIndex"}`}
                >
                  <Link to="https://www.fastsports.tv/Live">
                    <img
                       src={image.liveIconMob}
                      className="w-35"
                      alt="HOTEL-LOGO"
                    />
                    <br />
                    <span className="iconText menuItem">Live</span>
                  </Link>
                </li>
                <li id="promoSld d-none">
                  <div className="marquee">
                    <div className="promotionSlider marquee__item"></div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="MobileMenu fixedHeader">
            <div className="navbar-header">
              <div className="d-block mobileLogo">
                <Link to={'/'} className="hdrLogo">
                  <img src={image.default} alt="FM-LOGO" />
                  <div id="logotext">Travel Channel Int'l (Pvt).Ltd</div>
                </Link>
              </div>
              <div className="uanNum">
                <i className="glyphicon glyphicon-phone-alt"></i>UAN : 03 111
                147 111
              </div>
              <div className="CustMenuIcon inlineDiv">
                <MenuIcon
                  className="mob_menu_color"
                  onClick={displayMenu}
                />
              </div>
              <div className="custContactInfo"></div>
            </div>
            <CSSTransition in={menu} timeout={1000} classNames="fade" unmountOnExit>
                <div className="disply_mob_menu">
                    <div className="d-flex justify-content-between p-3">
                        <Link to={'/'} className="hdrLogomob ">
                            <img src={image.default} className="imgView" alt="FM-LOGO" width="120px"/>
                            <span id="logotext" className="colorBlue d-block">Travel Channel Int'l (Pvt).Ltd</span>
                        </Link>
                        <div className="menu_cross_icon">
                                <CloseIcon onClick={closeMenu} />
                        </div>
                    </div>
                    <ul>
                        <li> <GroupsIcon className="mob_menu_icon"/> About Us</li>
                        <li> <WifiCallingIcon className="mob_menu_icon"/>Contact Us</li>
                        <li> <SupportAgentIcon className="mob_menu_icon"/>Support</li>
                        <li> <AccountBalanceIcon className="mob_menu_icon"/>Banks</li>
                        <li> <ManageAccountsIcon className="mob_menu_icon"/>Account </li>
                        <li><LoginIcon className="mob_menu_icon"/> Login</li>
                    </ul>
                </div>
             </CSSTransition>
            <div className={`container ${isFixed ? "fixedHeader" : ""}`}>
              <div
                className={`my-element ${
                  shouldApplyBoxShadow ? "apply-box-shadow" : ""
                }`}
              >
                <div className="headerBox  ng-scope mini">
                  <ul className="mainLinks" id="myNavBar">
                    <li idc="flightsm">
                      <Link to="">
                        <img
                          src={image.planelogo}
                          className="w-35"
                          alt="Flight-LOGO"
                        />
                        <br />
                        <span className="iconText">Flights</span>
                      </Link>
                    </li>
                    <li id="hotelsm">
                      <Link to="">
                        <img
                          src={image.hotellogo}
                          className="w-35"
                          alt="HOTEL-LOGO"
                        />
                        <br />
                        <span className="iconText">Hotels</span>
                      </Link>
                    </li>
                    <li id="mallsm">
                      <Link to="">
                        <img
                          src={image.MallIconMob}
                          className="w-35"
                          alt="HOTEL-LOGO"
                        />
                        <br />
                        <span className="iconText">Mall</span>
                      </Link>
                    </li>
                    <li id="mallsm">
                      <Link to="https://www.fastsports.tv/Live">
                        <img
                          src={image.liveIconMob}
                          className="w-35"
                          alt="HOTEL-LOGO"
                        />
                        <br />
                        <span className="iconText">Live</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
