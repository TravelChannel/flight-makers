import React, { Fragment,useEffect } from "react";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import './index.css';
import './responsive.css';
import TopNavBar from "./Components/Commom/TopNavBar";
import Header from "./Components/Commom/Header";
import Footer from "./Components/Commom/Footer";
import Routes from './Route';
import { requestFetchAuthToken,requestAirsialToken } from './API/index';
import { useLocation } from "react-router-dom";

const App = () =>
{
    useEffect(() => {
      // localStorage.removeItem('searchData');
        const currentDate = new Date();
        const storedData = JSON.parse(localStorage.getItem("AuthToken"));
        requestAirsialToken();
        if (!storedData) {
          requestFetchAuthToken();
        } else {
          if (storedData.expireAuthTokenDate) {
            const futureDate = new Date(storedData.expireAuthTokenDate);
            if (futureDate < currentDate) {
              requestFetchAuthToken();
            }
          } else {
            requestFetchAuthToken();
          }
        }
      }, []);
      
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
      const inputPNR = searchParams.get('inputPNR');
    return(
        <Fragment>
            <div className="backgradiant">
                <div className="container-fluid">
                    {!inputPNR && <TopNavBar/>}
                    {!inputPNR && <Header />}
                    <Routes/>
                    {!inputPNR && <Footer/> }
                </div>
            </div>
        </Fragment>
    );
}

export default App;