import React, { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const branchData = [
  { value: 0, label: 'Head Office, Lahore', address: '53 A-1, Block E 1 Gulberg III, Lahore, Punjab 54000, Pakistan', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.6958285992378!2d74.32938927627393!3d31.50504354789804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904688e90638d%3A0x497b2088a0c0c2fa!2sFaremakers%20Kalma%20Chowk%20Century%20Tower!5e0!3m2!1sen!2s!4v1694080261849!5m2!1sen!2s' },
  { value: 1, label: 'Kalma Chowk Branch, Lahore', address: '3-UGF, Century Tower, Kalma Chowk, Main Boulevard, Gulberg-III, Lahore, Pakistan', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.6958285992378!2d74.32938927627393!3d31.50504354789804!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904688e90638d%3A0x497b2088a0c0c2fa!2sFaremakers%20Kalma%20Chowk%20Century%20Tower!5e0!3m2!1sen!2s!4v1694080261849!5m2!1sen!2s' },
  { value: 2, label: 'Defence Branch, Lahore', address: 'Plot-211, Block CCA FF Market, Defence Housing Society (DHA) Phase 4, Lahore, Pakistan', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.1519221291032!2d74.38486558824194!3d31.465006783465885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391906111262d26d%3A0xf58d81999f7e9c86!2sFaremakers!5e0!3m2!1sen!2s!4v1694080638901!5m2!1sen!2s' },
  { value: 3, label: 'Shimla Hill, Lahore', address: '4-UGF, National Tower, Egerton Road, Lahore, Pakistan', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108900.7165867944!2d74.30503989911081!3d31.465131378039445!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904688f3ee893%3A0xfb875054e1ed67c!2sFaremakers%20Egerton%20Road%20Branch!5e0!3m2!1sen!2s!4v1694080830237!5m2!1sen!2s' },
  { value: 4, label: 'DHA Y Block, Lahore', address: 'Office No. 11, Y Block Commercial Plaza round Market phase 3 Dha Lahore.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.807127190167!2d74.37563537615064!3d31.47449139821949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919056aebcf7d45%3A0xb3a372f510ddfe09!2sFaremakers!5e0!3m2!1sen!2s!4v1694081041252!5m2!1sen!2s' },
  { value: 5, label: 'DHA H Block, Lahore', address: 'Office No. 01, Plaza No.01, Block-G, Phase-1C, Dha Lahore Cantt.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13611.325039713452!2d74.37559271821279!3d31.473827638642344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905fdaaaaaaab%3A0xea96c7321df318b5!2sFaremakers%20Block-H%20DHA%20Lahore%20Branch!5e0!3m2!1sen!2s!4v1694082777262!5m2!1sen!2s' },
  { value: 6, label: 'Iqbal Town Branch, Lahore', address: '03 GF, Akbari Shoping Mall, Hunza Block, Allama Iqbal Town, Lahore, Pakistan.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3401.350065552505!2d74.29389187627422!3d31.51454394742882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391903764f900001%3A0xfa958116d1d3d4bf!2sFaremakers%20Iqbal%20Town%20Branch!5e0!3m2!1sen!2s!4v1694081838386!5m2!1sen!2s' },
  { value: 7, label: 'Johar Town Branch, Lahore', address: 'Office No. 95 G1 Market, Johar Town, Lahore.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.6354022447113!2d74.2787187762732!3d31.479214249173157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391905fd43ded3a3%3A0xf15310138f542d7!2sFaremakers%20johar%20town%20Branch!5e0!3m2!1sen!2s!4v1694081916780!5m2!1sen!2s' },
  { value: 8, label: 'Cantt Branch, Lahore', address: 'Office No. 3, Cantt Commercial Complex, Abid Majeed Road, Lahore Cantt.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54442.0475376671!2d74.24009415096488!3d31.479418609141657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919059fb32c7b8b%3A0xdbd2fc16ff5e2c75!2sFaremakers!5e0!3m2!1sen!2s!4v1694082059157!5m2!1sen!2s' },
  { value: 9, label: 'Jaranwala Branch, Faisalabad', address: 'Office No. 10 - 11, Ground Floor Kohinoor 1 Plaza Jaranwala Road Faisalabad, Pakistan.', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.0497755960314!2d73.11276457627123!3d31.412754652450012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3922692fb12f136d%3A0xb26fa80abfd06441!2sFaremakers%20Faisalabad%20Branch!5e0!3m2!1sen!2s!4v1694082152876!5m2!1sen!2s' },
  { value: 10, label: 'Blue Area Branch, Islamabad', address: 'Office No. 6, Shahid Plaza, Jinnah Avenue, Blue Area, Islamabad', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3318.3144704863003!2d73.0842043763383!3d33.72668353484976!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfbf817bfa9fb5%3A0x53b593fd9240cfad!2sFaremakers!5e0!3m2!1sen!2s!4v1694082249045!5m2!1sen!2s' },
  { value: 11, label: 'Bahria Town Branch, Islamabad', address: 'Office No. 8, Ground Floor, Plaza No. 139, Phase IV, Civic Center, Bahria Town, Islamabad', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13302.323636488696!2d73.10067826917134!3d33.53828025909042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfed04c9e7d965%3A0x5ab8e1875c4cf14b!2sFaremakers!5e0!3m2!1sen!2s!4v1694082318402!5m2!1sen!2s' },
  { value: 12, label: 'DHA Phase-VI Branch, Karachi', address: 'Office No. 3, Plot No.16-C, Main Shahbaz Commercial, Near Pizza Hut, Phase-VI, DHA, Karachi, Pakistan', mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.604393556972!2d67.06216069999999!3d24.8089965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33cf64b13eacd%3A0x15b7939f24a01eec!2sFare%20Makers!5e0!3m2!1sen!2s!4v1694082484963!5m2!1sen!2s' },
];

const PayAtBranch = () => {
  const [branchName, setBranchName] = useState(branchData[0].value); // Set the default value to the value at index 0
  const [helperText, setHelperText] = useState('');
  const [googleMap, setGoogleMap] = useState('');


  const handleChange = (event) => {
    const selectedBranch = branchData.find((branch) => branch.value === event.target.value);

    if (selectedBranch) {
      setBranchName(event.target.value);
      setHelperText(selectedBranch.address);
      setGoogleMap(
        <iframe
          title="Google Map"
          src={selectedBranch.mapSrc}
          width="100%"
          height="300"
          style={{ borderRadius: "7px", boxShadow: '-1px 3px 4px 2px rgba(0, 0, 0, 0.2)' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      );
    }
  };

  useEffect(() => {
    handleChange({ target: { value: branchName } });
  }, [branchName]);



  return (
    <div className='pay_branch_main'>
      <p className="branch_heading_main">Select Your Nearest Branch</p>
      <div>
        <div>
          <FormControl sx={{ m: 1, width: '100%', maxWidth: 500 }}>
            <Select
              value={branchName}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              MenuProps={{
                anchorOrigin: {
                  vertical: 'bottom',
                  horizontal: 'center',
                },
                transformOrigin: {
                  vertical: 'top',
                  horizontal: 'center',
                },
                getContentAnchorEl: null,
                PaperProps: {
                  style: {
                    maxHeight: 250,
                  },
                },
              }}
              sx={{
                height: '45px',
              }}
            >
              {branchData.map((branch) => (
                <MenuItem key={branch.value} value={branch.value}>
                  {branch.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <p className='helper_text'>{helperText}</p>
      </div>
      <div className="google_map_spacing">{googleMap}</div>
    </div>
  );
};

export default PayAtBranch;