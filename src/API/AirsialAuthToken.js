export const fetchAirSialToken = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ci_session_frontend=0kbf0t68uah3hdteren1r80db2hclltu");
  
    const raw = JSON.stringify([
      {
        "Caller": "login",
        "Username": "travelchanelapi",
        "Password": "47A3S79ia7L"
      }
    ]);
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    try {
      const response = await fetch("http://demo.airsial.com.pk/starter/asmis/booking", requestOptions);
      const result = await response.json();
      const AuthToken = result.Response.Data.token;
      const airsialAuthToken = '"' + AuthToken + '"';
      localStorage.setItem("airsialAuthToken", JSON.stringify(airsialAuthToken));
      return result;

    } catch (error) {
      console.log('Airsial AuthToken', error);
      return null;
    }
  };
  
