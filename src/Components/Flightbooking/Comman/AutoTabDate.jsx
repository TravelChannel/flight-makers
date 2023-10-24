import React, { useRef, useEffect } from 'react';
import { handleShowErrorAlert } from '../../../helpers/sweatalert';

const AutoTabDate = ({ label, value, handleInputChange, traveller }) => {
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const tagLabel = label.replace(/\s+/g, '');

  useEffect(() => {
    const day = dayRef.current ? dayRef.current.value || 'DD' : 'DD';
    const month = monthRef.current ? monthRef.current.value || 'MM' : 'MM';
    const year = yearRef.current ? yearRef.current.value || 'YYYY' : 'YYYY';
    const formattedDate = `${day}-${month}-${year}`;
    let inputDate = 'DD-MM-YYYY';

    if (day !== 'DD' && month !== 'MM' && year !== 'YYYY' && year.length === 4 ) {
      inputDate = new Date(`${day}-${month}-${year}`);
    }
    const currentDate = new Date();
    
    const name = tagLabel ? `${tagLabel}${value}` : `DOB${value}`;
    let errorText = '';

    const twelveYearsAgo = new Date();
    twelveYearsAgo.setFullYear(twelveYearsAgo.getFullYear() - 12);
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    const expireFurtDate = new Date();
    expireFurtDate.setMonth(expireFurtDate.getMonth() + 6);
    const formatexpireFurtDate= `${('0' + expireFurtDate.getDate()).slice(-2)}-${('0' + (expireFurtDate.getMonth() + 1)).slice(-2)}-${expireFurtDate.getFullYear()}`;

    handleInputChange({ target: { name, value: formattedDate } }, value);

    if (tagLabel === 'DateOfBirth') {
      if (traveller === 'Adult' && inputDate > twelveYearsAgo) {
        errorText = `Adult must be greater than 12 years`;
      } else if (traveller === 'Child' && (inputDate > currentDate || inputDate < twelveYearsAgo)) {
        errorText = 'Child must be greater than 2 years and less than 12 years';
      } else if (traveller === 'Infant' && (inputDate > currentDate || inputDate < twoYearsAgo)) {
        errorText = 'Infants must be equal or less than 2 years';
      }
    } else if (tagLabel === 'PassportExpiryDate' && inputDate < expireFurtDate) {
      errorText = `Passport Expiry Date should not be earlier than ${formatexpireFurtDate}`;
    }
    
    if (errorText) {
      handleShowErrorAlert(errorText);
      dayRef.current.value = '';
      monthRef.current.value = '';
      yearRef.current.value = '';
    }

  }, [tagLabel, value, handleInputChange, traveller]);

  const handleKeyUp = (e, targetRef, nextRef, maxVal) => {
    const numericValue = parseInt(e.target.value, 10);

    if (!isNaN(numericValue) && numericValue <= maxVal) {
      if (e.target.value.length === e.target.maxLength && nextRef) {
        nextRef.current.focus();
      }
    } else {
      e.target.value = '';
    }
  };

  return (
    <div>
      <p className="dob_heading">{label}</p>
      <div className="d-flex justify-content-between input_date_mob">
        <input
          placeholder="DD"
          type="text"
          pattern="^(0?[1-9]|[1-2][0-9]|3[0-1])$"
          maxLength="2"
          size="2"
          className="date-field"
          ref={dayRef}
          onKeyUp={(e) => handleKeyUp(e, dayRef, monthRef, 31)}
        />

        <input
          placeholder="MM"
          type="text"
          pattern="^(0?[1-9]|1[0-2])$"
          maxLength="2"
          size="2"
          className="date-field"
          ref={monthRef}
          onKeyUp={(e) => handleKeyUp(e, monthRef, yearRef, 12)}
        />

        <input
          placeholder="YYYY"
          type="text"
          pattern="^(19\d{2}|20\d{2})$"
          maxLength="4"
          size="4"
          className="date-field date-field--year"
          ref={yearRef}
          onKeyUp={(e) => handleKeyUp(e, yearRef, null, 2099)}
        />
      </div>
    </div>
  );
};

export default AutoTabDate;
