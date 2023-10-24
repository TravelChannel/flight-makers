export const calculateTax = (destination, airline, classType) =>{
    if (
        (destination[0] === 'ISB' || destination[1] === 'KHI') &&
        (airline === 'TK' || 'PK') &&
        (classType === 'Y')
    ) {
        return 7; 
    } else {
        return 5; 
    }
}

