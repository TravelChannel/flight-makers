export const GetGclidID = async (gclidValue) => {
    try {
        console.log("GCLID-for-api",gclidValue);
        const msg =``;
        // console.log("whatsAPp-msg-1",msg);
        const encodedMsg  = encodeURIComponent(msg);
        console.log('encodedMsg-2',encodedMsg);
            const url = `https://fmcrm.azurewebsites.net/Handlers/FMConnectApis.ashx?type=102&refID=0&gclid=${gclidValue}&msg=${encodedMsg}`;
            console.log("GClid-APi-url",url);
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
  