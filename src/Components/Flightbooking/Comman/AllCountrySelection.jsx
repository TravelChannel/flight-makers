import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries } from '../../../Constant/homeData';

const AllCountrySelection = ({ name, onChange }) => {
  const defaultCountry = countries.find((country) => country.label === 'Pakistan');
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);

  useEffect(() => {
    // Trigger the onChange event when the selected country changes
    if (selectedCountry) {
      const formattedCountry = {
        label: selectedCountry.label,
        code: selectedCountry.code,
      };
      onChange({ target: { name, value: formattedCountry } });
    }
  }, [name, selectedCountry, onChange]);

  return (
    <Autocomplete
      id="country-select-demo"
      options={countries}
      autoHighlight
      getOptionLabel={(option) => option.label}
      value={selectedCountry}
      onChange={(event, newValue) => {
        setSelectedCountry(newValue);
      }}
      renderOption={(props, option) => (
        <Box component="li" sx={{ display: 'flex', alignItems: 'center' }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
            style={{ marginRight: '7px' }}
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          placeholder="Nationality"
          {...params}
          size="small"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off',
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: selectedCountry ? (
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${selectedCountry.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png 2x`}
                alt=""
                style={{ marginRight: '3px' }}
              />
            ) : null,
          }}
        />
      )}
    />
  );
};

export default AllCountrySelection;
