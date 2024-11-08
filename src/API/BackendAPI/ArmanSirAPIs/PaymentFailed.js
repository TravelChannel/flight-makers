export const PaymentFailedAPI = async (pnr) => {
    try {
        console.log("pnr-at-failed-API",pnr);
            const url = `https://fmcrm.azurewebsites.net/Handlers/FMConnectApis.ashx?type=101&pnr=${pnr}&msg=FailedToComplete`;

            console.log("api-url",url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow'
        });
  
        if (!response.ok) {
            throw new Error(`Error-G: ${response.status} ${response.statusText}`);
        }
  
        const result = await response.json();
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  };
  