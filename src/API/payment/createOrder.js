
export const createOrderApi = (getToken) => {
    return new Promise((resolve, reject) => {
      const PNRNumber = JSON.parse(localStorage.getItem('PNRNumber'));
      const totalPrice = JSON.parse(localStorage.getItem("totalTicketPrice"));
      console.log(PNRNumber)
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "auth_token": `${getToken.token}`,
        "delivery_needed": "false",
        "amount_cents": "100",
        "currency": "PKR",
        "items": [
            {
                "name": PNRNumber,
                "amount_cents": totalPrice,
                "description": "Flights Name",
                // "quantity": "1"
            }
        ]
    });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://pakistan.paymob.com/api/ecommerce/orders", requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response as JSON
        })
        .then(result => {
          console.log("CreateOrder", result);
          resolve(result); // Resolve the promise with the result
        })
        .catch(error => {
          console.error('CreateOrder error:', error);
          reject(error); // Reject the promise with the error
        });
    });
  };

  export const getPaymentTokenApi = (order, token) => {
    return new Promise((resolve, reject) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        // ... your request payload
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://pakistan.paymob.com/api/acceptance/payment_keys", requestOptions)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Parse the response as JSON
        })
        .then(result => {
          console.log("getPaymentToken", result);
          resolve(result); // Resolve the promise with the result
        })
        .catch(error => {
          console.error('getPaymentToken error:', error);
          reject(error); // Reject the promise with the error
        });
    });
  };




