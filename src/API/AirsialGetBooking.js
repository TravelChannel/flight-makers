export const airSialViewDetail = async()=>{

    const airSialAuthToken = JSON.parse(localStorage.getItem("airsialAuthToken"))



    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "ci_session_frontend=qjttk8ohve4bjvsq11478etofoqdkn1f");

var raw = JSON.stringify([
  {
    "Caller": "viewTicket",
    "PNR": "396Z5B",
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
    console.log()
    return results;
    
}catch(error){
    console.log("AirSialViewDetailsErros:",error)
}

fetch("http://demo.airsial.com.pk/starter/asmis/booking", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}