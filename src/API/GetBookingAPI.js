export const getBookingApi = async () => {
    

    const pnrNumber = JSON.parse(localStorage.getItem("PNRNumber"));

    console.log("sabre pnrNumber",pnrNumber);
    const storedAuthtoken = JSON.parse(localStorage.getItem("AuthToken"))
    const authToken = storedAuthtoken ? storedAuthtoken.access_token : null;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
        "confirmationId":pnrNumber
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    console.log("pnr___raw",raw);
    try {
        const responce = await fetch("https://api.havail.sabre.com/v1/trip/orders/getBooking", requestOptions);
        const result = await responce.json();
        console.log('data',2,result)

        return result;
    }
    catch (error) {
        console.log("GetBookingAPI", error)
    }
}