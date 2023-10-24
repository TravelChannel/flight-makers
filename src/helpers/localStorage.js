// export const getLastSearchData = () => {
//     const persistedData = localStorage.getItem('searchData');
  
//     try {
//       const searchDataArray = JSON.parse(persistedData);
//       const searchDataArr = searchDataArray[searchDataArray.length - 1];
//       return searchDataArr;
//     } catch (error) {
//       console.error('Error parsing searchData from localStorage:', error);
//       return null;
//     }
//   };
export const getLastSearchData = (index = -1) => {
  const persistedData = localStorage.getItem('searchData');

  try {
    const searchDataArray = JSON.parse(persistedData);

    // If no index is provided, return the last data
    if (index === -1) {
      return searchDataArray[searchDataArray.length - 1];
    }

    // Return the data at the specified index
    return searchDataArray[index];
  } catch (error) {
    console.error('Error parsing searchData from localStorage:', error);
    return null;
  }
};