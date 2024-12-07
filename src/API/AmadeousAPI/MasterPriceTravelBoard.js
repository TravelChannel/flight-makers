export const MasterPriceTravelBoard =async () =>{
    const myHeaders = new Headers();
     myHeaders.append("Content-Type", "application/json");

     const raw = JSON.stringify({
      "numberOfUnit": [
        {
          "number": "250",
          "type": "RC"
        },
        {
          "number": "3",
          "type": "PX"
        }
      ],
      "paxReference": [
        {
          "ptc": "ADT",
          "traveller": [
            {
              "ref": "1"
            },
            {
              "ref": "2"
            }
          ]
        },
        {
          "ptc": "CNN",
          "traveller": [
            {
              "ref": "3"
            }
          ]
        }
      ],
      "fareOptions": {
        "priceTypes": [
          "ET",
          "RP",
          "RU"
        ]
      },
      "travelFlightInfo": {
        "cabin": "Y",
        "carrierId": "UA"
      },
      "itinerary": {
        "departureId": "ORD",
        "arrivalId": "ATL",
        "date": "261224"
      }
    });

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

try{
    const response  = await fetch("http://localhost:5000/api/masterprice/masterprice-travelboard", requestOptions);
    const result = await  response.json();
    console.log("MasterPriceTravelBoard-result", result);
    return result;
} catch(error){
    console.error("MasterPriceTravelBoard-Error", error);
}

}





