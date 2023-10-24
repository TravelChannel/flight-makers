
export const setSearchData = (dataArr) => {
  return {
    type: 'SET_SEARCH_DATA',
    payload: dataArr
  }
}
export const setFilterData = (updateArr) => {
  return {
    type: 'SET_FILTER_DATA',
    payload: updateArr
  };
}

export const adultincNumber = () => {
    return {
      type: 'adultINCREMENT'
    }
  }
  
  export const adultdecNumber = () => {
    return {
      type: 'adultDECREMENT'
    }
  }
  
  export const childincNumber = () => {
    return {
      type: 'childINCREMENT'
    }
  }
  
  export const childdecNumber = () => {
    return {
      type: 'childDECREMENT'
    }
  }

  export const infantsincNumber = () => {
    return {
      type: 'infantsINCREMENT'
    }
  }
  
  export const infantsdecNumber = () => {
    return {
      type: 'infantsDECREMENT'
    }
  }