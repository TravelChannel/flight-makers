const initialState = {
    searchDataArr: null,
  };
  
  const searchDataReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SEARCH_DATA':
        return {
          ...state,
          searchDataArr: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default searchDataReducer;



const initialFilterState = {
  filterDataArr: null,
};

export const updateFilterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case 'SET_FILTER_DATA':
      return {
        ...state,
        filterDataArr:action.payload,
      };
      default:
        return state;
  }
};