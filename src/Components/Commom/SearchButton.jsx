import React from 'react';

const SearchButton = ({onButtonClick}) => {
  return (
    <div className="col-xs-12 col-sm-12 col-md-12 text_center_btn">
    <button type='submit' className={`searchFlight ${onButtonClick() ? 'c-pointer' : 'c-not-allowed-btn'}`} disabled={!onButtonClick()}>SEARCH</button>
</div>
  )
}

export default SearchButton;