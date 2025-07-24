import { React, Fragment } from "react";
import * as images from "../../Constant/images";
import { Link } from "react-router-dom";

const Precautions = () => {
  return (
    <Fragment>
      <h4 className="text-center colorRed cautionTitle hidden-lg d-none">
        Be Aware Be safe !
      </h4>
      <div className="text-center cautionText hidden-lg d-none">
        <img src={images.caution} height="25" width="40" alt="caution" />
        <span>
          We only call from one number :<b> +1 (484) 312-1100</b>
        </span>
      </div>

      <div className="panel-heading availableBanks d-none">
        <div className="panel-title">
          <div className="inlineDiv support">
            <img
              src={images.mobBanking}
              width="19"
              height="19"
              alt="mobBanking"
            />
          </div>
          <Link>
            <span>Official Bank Accounts Click Here</span>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Precautions;
