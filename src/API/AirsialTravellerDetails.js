export const airsialTravelerDetail = async (formData,activepnrNumber) => {
// const cnic = formData.CNIC;
  console.log("Hello World 1",formData);
  console.log("hello world 2",activepnrNumber);
    const PNRNumber = activepnrNumber;
    const Authtoken = JSON.parse(localStorage.getItem("airsialAuthToken"));
    const flightDetails = JSON.parse(localStorage.getItem("bookingTicket"));
    const { adults, children } = flightDetails;
    // const FORMDATES = JSON.parse(localStorage.getItem("formData"));
    // console.log("local",formData);
// ----------------------------------------------
    const adultsData = [];
    const childrenData = [];
    const infantsData = [];

    const CnicFormat = (cnic)=>{
      if(cnic && cnic.length ===13){
        return `${cnic.slice(0, 5)}-${cnic.slice(5, 12)}-${cnic.slice(12)}`;
      } else{
        return cnic;
      }

    }

    const formatDate = (dateString) =>{
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  }
    
    // formData.forEach((data, index) => {
    //     const category = index < adults ? 'adult' : index < adults + children ? 'child' : 'infant';

    //     const formattedData = {
    //       Title: "MR",
    //       WheelChair: data[`wheelChair${index}`] || 'N',
    //       FullName: `${data[`fname${index}`]} ${data[`lname${index}`]}`,
    //       Firstname: data[`fname${index}`],
    //       Lastname: data[`lname${index}`],
    //       Passport: data[`passport${index}`],
    //       PassportCountry: 'PK',
    //       PassportExpiry: data[`PassportExpiryDate${index}`],
    //       Dob: data[`DateOfBirth${index}`],
    //       Cnic : CnicFormat(data[`cnic${index}`]),
    //       // Cnic: data[`cnic${index}`] || '',
    //       Gender: data[`gender${index}`],
    //     };
      
    //     if (category === 'adult') {
    //       adultsData.push(formattedData);
    //     } else if (category === 'child') {
    //       childrenData.push(formattedData);
    //     } else {
    //       infantsData.push(formattedData);
    //     }
    //   });

    //   console.log("Adults Data:", adultsData);

   Object.keys(formData).forEach((key, index) => {
    const data = formData[key];
    const category = index < adults ? 'adult' : index < adults + children ? 'child' : 'infant';

    const formattedData = {
        Title: "MR",
        WheelChair: null,
        FullName: `${data.firstName} ${data.lastName}`,
        Firstname: `${data.firstName}`,
        Lastname: `${data.lastName}`,
        Passport: `${data.passportNo}`,
        PassportCountry: 'PK', // You need to specify the country
        PassportExpiry: formatDate(data.passportExpiryDate),
        Dob: formatDate(data.dateOfBirth),
        // PassportExpiry:"02-07-2026",
        // Dob:"02-07-2008",
        Cnic:`${CnicFormat(data.cnic)}`,
        Gender: `${data.gender}`,
    };

    if (category === 'adult') {
        adultsData.push(formattedData);
    } else if (category === 'child') {
        childrenData.push(formattedData);
    } else {
        infantsData.push(formattedData);
    }
});

console.log("Adults Data:", adultsData);
// console.log("Children Data:", childrenData);
// console.log("Infants Data:", infantsData);

     
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