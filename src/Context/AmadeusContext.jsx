import React, {createContext ,useContext,useState ,useEffect} from 'react';


const AmadeusContext = createContext();

export const AmadeusDataProvider = ({children}) => {
    const [bestPricingData ,setBestPricingData] = useState();

    // Setting Header for Getting SessionID and SecurityToken from header for all
    const [SessionHeader ,setSessionHeader] = useState();

    const [searchDetail , setSearchDetail] = useState();

    //  Extract SessionID and SecurityToken from SessionHeader
    const SessionID =SessionHeader?.['awsse:Session']?.['awsse:SessionId'];
    const SecurityToken =SessionHeader?.['awsse:Session']?.['awsse:SecurityToken'];
    
    const SessionData = {
      SessionID:SessionID,
      SecurityToken:SecurityToken
    }
    return(
        <AmadeusContext.Provider  value = {{bestPricingData ,setBestPricingData,SessionHeader ,setSessionHeader ,SessionData , searchDetail , setSearchDetail}}>
           {children}
        </AmadeusContext.Provider>
    )   
};


//define static Hook
export const useAmadeusData = () => {
  const context = useContext(AmadeusContext);

  if (!context) {
    throw new Error("Amadeus Data must be used within a AmadeusDataProvider");
  }
  return context;
};
 
