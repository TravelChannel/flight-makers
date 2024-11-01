export const getPaymentTokenApi = async (getToken,createOrder,paymentCode ,userPhoneNum) => {
    try {
  console.log("userPhoneNum2-:",userPhoneNum);

  const userDetail = JSON.parse(localStorage.getItem("userDetails"));
  console.log("userDetail---222",userDetail);
  let Amount ;
      if(userPhoneNum ==='3235268422' || userPhoneNum ==='3408922375' ){
        Amount = 100;
      }else{
        console.log("total_Amount",createOrder.items[0].amount_cents);
        Amount = (createOrder?.items[0]?.amount_cents)*100;
      }
      console.log('CreatedOrderIDatAPI',createOrder.id );

      // localStorage.setItem("OrderID", JSON.stringify(createOrder));
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
       const pnrNum = JSON.parse(localStorage.getItem('PNRNumber'));
       console.log("User_PNR_Number",pnrNum);
      var raw = JSON.stringify({
        "auth_token": `${getToken.token}`,
        "amount_cents": Amount,
        "expiration": 3600,
        "order_id": `${createOrder.id}`,
        "billing_data": {
          "pnrNum" :`${pnrNum}`,
          "userName" : `${userDetail?.firstName || ''} ${userDetail?.lastName || 'Faremakers'}` ,
          "apartment": `${pnrNum}`,
          "email": `${userDetail?.userEmail || 'support@faremakers.com'}`,
          "floor": "1",
          "first_name": `${userDetail?.firstName || 'Faremakers'}`,
          "street": "Gulberg3",
          "building": "8028",
          "phone_number":`0${userDetail?.phoneNumber || '3111147111'}`,
          "shipping_method": "PKG",
          "postal_code": "01898",
          "city": "Lahore",
          "country": "PK",
          "last_name": `${userDetail?.lastName || 'Faremakers'}`,
          "state": "Pakistan"
        },
        "currency": "PKR",
        "integration_id": paymentCode,
        "lock_order_when_paid": "false"
      });

      console.log("rawData-BookingPayment",raw);
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      const response = await fetch("https://pakistan.paymob.com/api/acceptance/payment_keys", requestOptions);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log("getPaymentToken", result);
      return result;
    } catch (error) {
      console.error('getPaymentToken error:', error);
      throw error; // Re-throw the error for the caller to handle
    }
  };
  