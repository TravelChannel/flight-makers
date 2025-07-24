
export const WhatsappLowestFair = async (fair,gclid,gclidID) => {

    try {
        let refID = 0 ;
        if(gclidID){
            refID = gclidID;
        };
        // console.log("refID-v1",refID);
        const msg =`Lowest Fare Detail: ${fair} $ (NET FARE WITHOUT PSF)`;
        // console.log("whatsAPp-msg-1",msg);
        const encodedMsg  = encodeURIComponent(msg);
        console.log('encodedMsg-2',encodedMsg);
            const url = `https://fmcrm.azurewebsites.net/Handlers/FMConnectApis.ashx?type=102&refID=${refID}&gclid=${gclid}&msg=${encodedMsg}`;
           
            console.log("whatsApp-Far-APi",url);
        
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
        console.log('whatsUp-Success:', result);
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
  };

  