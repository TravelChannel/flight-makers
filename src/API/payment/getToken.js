export const getTokenApi = () => {
    return new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        "api_key": "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2TVRBMk9UY3lMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuYVNJMC1iSVZhTHVncGFXZ3dkbEl5bWNnR2I3VXhvSjJydVY4N2dfVm9FNjhZNFFwU0VDdGNqdExLNFNwNF9PaGx0Qy1TZTcwMGR1M2pKdF9Nck9CTWc="
      });
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      fetch("https://pakistan.paymob.com/api/auth/tokens", requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(result => {
          console.log("getToken", result);
          resolve(result); // Resolve the promise with the result
        })
        .catch(error => {
          console.log('getToken', error);
          reject(error); // Reject the promise with the error
        });
    });
  };
  