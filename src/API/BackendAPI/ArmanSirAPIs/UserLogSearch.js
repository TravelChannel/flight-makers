export const saveFlightSearchLogs = async (raw) => {
    console.log("raw",raw);
    const url = 'https://faremakers.azurewebsites.net/api/Activity/SaveFlihtSearchLogs';
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
   
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body:JSON.stringify(raw), 
      redirect: 'follow'
    };
  
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      console.log('Success:', result);
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };
  