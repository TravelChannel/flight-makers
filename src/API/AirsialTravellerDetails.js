export const airsialTravelerDetail = async (PNRRespon,formData) => {

    const PNRNumber = PNRRespon;
    const Authtoken = JSON.parse(localStorage.getItem("airsialAuthToken"));
    const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
    const { adults, children } = flightDetails;
    // const FORMDATES = JSON.parse(localStorage.getItem("formData"));
    // console.log("local",formData);

    const adultsData = [];
    const childrenData = [];
    const infantsData = [];
    formData.forEach((data, index) => {
        const category = index < adults ? 'adult' : index < adults + children ? 'child' : 'infant';

        const formattedData = {
          Title: "MR",
          WheelChair: data[`wheelChair${index}`] || 'N',
          FullName: `${data[`fname${index}`]} ${data[`lname${index}`]}`,
          Firstname: data[`fname${index}`],
          Lastname: data[`lname${index}`],
          Passport: data[`passport${index}`],
          PassportCountry: data[`countery${index}`]?.code,
          PassportExpiry: data[`PassportExpiryDate${index}`],
          Dob: data[`DateOfBirth${index}`],
          Cnic: data[`cnic${index}`] || '',
          Gender: data[`gender${index}`],
        };
      
        if (category === 'adult') {
          adultsData.push(formattedData);
        } else if (category === 'child') {
          childrenData.push(formattedData);
        } else {
          infantsData.push(formattedData);
        }
      });
      
    // console.log("kasj",adultsData,childrenData,infantsData);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ci_session_frontend=f8oe9fve3otb0io7br1o2de14dco34nt");

    var raw = JSON.stringify([
        {
            "Caller": "passengerInsertion",
            "PNR": PNRNumber,
            "token": Authtoken,
            "adult": adultsData,
            "child": childrenData,
            "infant": infantsData,
            "PrimaryCell": "+923137559954",
            "SecondaryCell": "+92",
            "EmailAddress": "test@test.com",
            "CNIC": "",
            "Comments": ""
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
        const result = await responce.json();
        return result;
    }
    catch (error){
        console.error("Airsial Traveller Details", error);
    }
} 