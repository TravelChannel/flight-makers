import React, { useState, useEffect } from 'react';
import { AllUsersDetail } from '../../../API/BackendAPI/allAPICalls';

const UserLists = () => {
  const [allUserData, setUserData] = useState([]);
  const [search, setSearch] = useState('');

  const __handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await AllUsersDetail();
        setUserData(response.data.payload);
        console.log('allUserResponse', response);
      } catch (error) {
        console.log('Error in AllUsersDetail', error);
      }
    };
    fetchAllUsers();
  }, []);

  const ArrangeDateFormat = (JourneyDate) => {
    const formattedDate = new Date(JourneyDate).toLocaleDateString('en-GB');
    return formattedDate;
  };

  const filteredUserData = allUserData.filter(
    (item) =>
      item.id?.toLowerCase().includes(search.toLowerCase()) ||
      item.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      item.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      item.phoneNumber?.toLowerCase().includes(search.toLowerCase()) ||
      ArrangeDateFormat(item.dateOfBirth)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      ArrangeDateFormat(item.createdAt)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      item.passportNo?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className='dashboard-content-header'>
        <h2>Booking Details</h2>
        <div className='dashboard-content-search'>
          <input
            type='text'
            value={search}
            placeholder='Search..'
            className='dashboard-content-input'
            onChange={(e) => __handleSearch(e)}
          />
        </div>
      </div>
      <div className='promotion_table mt-3 text-center table-responsive '>
        <table className='table table-bordered'>
          <thead>
            <tr className='head_details'>
              <th className='promotion_design'>ID</th>
              <th className='promotion_design'>First Name</th>
              <th className='promotion_design'>Last Name</th>
              <th className='promotion_design'>Phone Number</th>
              <th className='promotion_design'>DOB</th>
              <th className='promotion_design'>CreatedAt</th>
              <th className='promotion_design'>Passport</th>
            </tr>
          </thead>
          <tbody>
            {filteredUserData.map((items, index) => (
              <tr className='data_details' key={index}>
                <td>{items.id}</td>
                <td>{items.firstName|| '-' } </td>
                <td>{items.lastName || '-'}</td>
                <td>{items.phoneNumber}</td>
                <td>{ArrangeDateFormat(items.dateOfBirth) || '-'} </td>
                <td>{ArrangeDateFormat(items.createdAt) || '-'}</td>
                <td>{items.passportNo || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserLists;
