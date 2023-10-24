import countryPhoneCodes  from '../Constant/countryCode';

export const TravelerInfo = async () => {

    const data = JSON.parse(localStorage.getItem('userInfodetails'));

    const [userData, ...otherData] = data;
    const { phoneNumber, PNR, userEmail, ...users } = userData;
    
    // const counteryCd = users[0].countery.code;

    const counteryCd = Object.values(users).map(item => item.countery.code);
    // console.log(counteryCd);

    const getPhoneCode = (countryCodes) => {
        return countryCodes.map(countryCode => {
          const country = countryPhoneCodes.find(country => country.code === countryCode);
          return country ? country.dial_code : null;
        });
      };

    const phoneCode = getPhoneCode(counteryCd);
    
    // const usersInfo = Object.values(users).map((item, index) => {
      
    //     return {
    //       DateOfBirth: item.DateOfBirth,
    //       PassportExpiryDate: item.PassportExpiryDate,
    //       fname: item.fname,
    //       lname: item.lname,
    //       gender: item.gender,
    //       passport: item.passport
    //     };
    //   });

    // console.log(phoneCode);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    

    var raw = JSON.stringify({
        "pnrBooking": [
            {
              "phoneNumber": phoneNumber,
              "userEmail": userEmail,
              "userInfoDetails": {
                "countery": phoneCode[0],
                "DateOfBirth": users[0].DateOfBirth,
                "PassportExpiryDate": users[0].PassportExpiryDate,
                "fname": users[0].fname,
                "lname": users[0].lname,
                "gender": users[0].gender,
                "cnic": users[0].cnic,
                "passport": users[0].passport
              },
              "pnr": "P435NR"
            }
          ]
        
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    try {
        const responce = await fetch("http://10.30.11.101:5000/api/pnrBooking", requestOptions);
        const result = await responce.json();
        // console.log(raw);
        // console.log(result);
        return result;

    }
    catch (error) {
        console.error("TravelerInfo", error)
    }

} 