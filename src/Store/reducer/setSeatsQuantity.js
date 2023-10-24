const initialState = 1;
const changeNumber = (state = initialState, action) => {
  switch (action.type) {
    case "adultINCREMENT":
      return state < 6 ? state + 1 : state;
    case "adultDECREMENT":
      return state > 1 ? state - 1 : state;
    default:
      return state;
  }
}

export default changeNumber;

const childInitialState = 0;

const childChangeNumber = (state = childInitialState, action) => {
  switch (action.type) {
    case "childINCREMENT":
      return state < 6 ? state + 1 : state;
    case "childDECREMENT":
      return state > 0 ? state - 1 : state;
    default:
      return state;
  }
}

const InfantsInitialState= 0;

const infantsChangeNumber = (state = InfantsInitialState,action) =>
{
  switch(action.type)
  {
    case 'infantsINCREMENT' :
      return state < 6 ? state + 1 : state; 
    case 'infantsDECREMENT' :
      return state > 0 ? state - 1 : state; 
    default:
      return state;
  }
}

export { childChangeNumber, infantsChangeNumber };
