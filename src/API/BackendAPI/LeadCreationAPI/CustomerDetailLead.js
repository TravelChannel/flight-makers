export const CustomerDetailLead = async(finalObject) =>{
    console.log("responceAt-LeadCreation-APi",finalObject)
    const myHeaders = new Headers();
myHeaders.append("Cookie", "ARRAffinity=9f9528d55c7f2deb897d8c0d55d7ba2486ecef4a28e2cfa8e6c1fdd4f5663ca3; ARRAffinitySameSite=9f9528d55c7f2deb897d8c0d55d7ba2486ecef4a28e2cfa8e6c1fdd4f5663ca3; ASP.NET_SessionId=cxphiotx0samfjiaudyvu15r");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

try {
    const responce = await fetch("https://fmcrm.azurewebsites.net/Handlers/FMConnectApis.ashx?type=89&from=LHE&to=KHI&name=Mr Arman Ahmed&phone=03235268422&email=arman@faremakers.com&adult=1&child=0&infant=0&airline=PF&classtype=Economy&TripTypeId=1&depDate=27-06-2024&retDate=01-01-1900", requestOptions);
    const result = await responce.json();
    console.log("Lead Creation", result);
    return result;
}
catch (error) {
    console.error("Lead Creation", error);
    throw error;
}

}




