import React, { Fragment, useState, useEffect } from "react";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { CSSTransition } from "react-transition-group";
import Filters from "./Comman/Filter.jsx";

const SideBarFilters = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [openSort, isOpenSort] = useState(false);
  const [openFilter, isOpenFilter] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Price');
  const handleSort = () => {
    isOpenSort(!openSort);
  }
  const handlefilter = () => {
    isOpenFilter(!openFilter);
  }
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    isOpenSort(false);
  };
  const closeFilters = () => {
    isOpenFilter(false);
  }
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <Fragment>
      {isMobile ? (
        <div className=" pl-0  pr_own mob_background_filter">
          <div className="filter_main_mob d-flex justify-content-between">
            <div className="filter_Sort background_color_sort">
              <span><SortIcon /> </span> <span className="sort_font" onClick={handleSort}>Sort</span>
            </div>
            <div className="filter_Sort">
              <span><FilterAltIcon /> </span> <span className="sort_font" onClick={handlefilter}>Filters</span>
            </div>
          </div>

          {openSort && (
            <Fragment>
              <div className="main_sort_card d-flex justify-content-between w-75">
                <div className=" sort_width ">
                  <div>

                    <p className="sort_data" onClick={() => handleOptionClick('Price')}>
                      <span>{selectedOption === 'Price' && <DoneIcon />}</span>
                      Price (Low to High)
                    </p>
                    <p className="sort_data" onClick={() => handleOptionClick('Early Departure')}>
                      <span>{selectedOption === 'Early Departure' && <DoneIcon />}</span>
                      Early Departure
                    </p>
                    <p
                      className="sort_data" onClick={() => handleOptionClick('Late Departure')}>
                      <span>{selectedOption === 'Late Departure' && <DoneIcon />}</span>
                      Late Departure
                    </p>
                  </div>
                </div>
                <div className="sort_close d-flex  justify-content-end ">
                  <CloseIcon onClick={handleOptionClick} />
                </div>
              </div>
            </Fragment>
          )}
          <CSSTransition
            in={openFilter}
            timeout={1000}
            classNames="slide"
            unmountOnExit
          >
            <div className="overall_filter_search_bc">
              <div className="mob_filter_bc_relative">
                <div className=" d-flex justify-content-between filter_mob_top ">
                  <div className="edit_search_mob">
                    <h4>Filters</h4>
                  </div>
                  <div>
                    <CloseIcon onClick={closeFilters} className="mob_cross_border" />
                  </div>
                </div>
                <div className="mob_content_background" >
                  <div className="mob_filters_hero">
                    <Filters />
                  </div>
                </div>
                <div className="disply_mob_filter_card overlay">
                  <div className=" d-flex justify-content-center  mob_filter_button " >
                    <h4>APPLY</h4>
                  </div>
                </div>
              </div>
            </div>
          </CSSTransition>
        </div>
      ) : (
        <Filters />
      )
      }

    </Fragment>
  );

};
export default SideBarFilters;


