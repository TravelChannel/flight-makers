export const getPaymentTokenApi = async (getToken,createOrder,paymentCode) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var raw = JSON.stringify({
        "auth_token": `${getToken.token}`,
        "amount_cents": "100",
        "expiration": 3600,
        "order_id": `${createOrder.id}`,
        "billing_data": {
          "apartment": "803",
          "email": "claudette09@exa.com",
          "floor": "42",
          "first_name": "Clifford",
          "street": "Ethan Land",
          "building": "8028",
          "phone_number": "+86(8)9135210487",
          "shipping_method": "PKG",
          "postal_code": "01898",
          "city": "Jaskolskiburgh",
          "country": "CR",
          "last_name": "Nicolas",
          "state": "Utah"
        },
        "currency": "PKR",
        "integration_id": paymentCode,
        "lock_order_when_paid": "false"
      });
  
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
  