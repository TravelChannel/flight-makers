export const airSialViewDetail = async(getPNRNumber)=>{

    const airSialAuthToken = JSON.parse(localStorage.getItem("airsialAuthToken"))
    // const airsialDetailPNR = JSON.parse(localStorage.getItem("PNRNumber"));

    console.log("airsialDetailPNR",getPNRNumber);

    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "ci_session_frontend=qjttk8ohve4bjvsq11478etofoqdkn1f");

var raw = JSON.stringify([
  {
    "Caller": "viewTicket",
    "PNR": getPNRNumber,
    "token": `${airSialAuthToken}`
  }
]);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

try{

    const responce = await fetch("http://demo.airsial.com.pk/starter/asmis/booking", requestOptions);
    const results = await responce.json();
    return results;
    
}catch(error){
    console.log("AirSialViewDetailsErros:",error)
}

// fetch("http://demo.airsial.com.pk/starter/asmis/booking", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
}