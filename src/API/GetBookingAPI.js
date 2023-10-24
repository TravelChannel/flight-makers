export const getBookingApi = async () => {

    const storedAuthtoken = JSON.parse(localStorage.getItem("AuthToken"))
    const authToken = storedAuthtoken ? storedAuthtoken.access_token : null;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${authToken}`);

    var raw = JSON.stringify({
        "confirmationId": "OFYJXC"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    try {
        const responce = await fetch("https://api.havail.sabre.com/v1/trip/orders/getBooking", requestOptions);
        const result = await responce.json();
        return result;
    }
    catch (error) {
        console.log("GetBookingAPI", error)
    }
}