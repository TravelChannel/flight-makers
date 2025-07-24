
export const createOrderApi = (getToken,paymentCode) => {
    return new Promise((resolve, reject) => {
      const PNRNumber = JSON.parse(localStorage.getItem('PNRNumber'));
      const totalPrice = JSON.parse(localStorage.getItem("totalTicketPrice"));

      console.log("price1",totalPrice)
      console.log('PNRNumber-at-create-order',PNRNumber);
      console.log('paymentCode_at_CreateOrder',paymentCode);


      // -------------------------------------------------------
         const cardFactor1= parseFloat(process.env.REACT_APP_PAYMOB_CARD_FACTOR1);
         const  cardFactor2=  parseFloat(process.env.REACT_APP_PAYMOB_CARD_FACTOR2);

         const easypaisaFactor1 = parseFloat(process.env.REACT_APP_PAYMOB_EASYPAISA_FACTOR1);
         const easyPaisaFactor2 = parseFloat(process.env.REACT_APP_PAYMOB_EASYPAISA_FACTOR2 );

         const jazzCashFactor1 = parseFloat(process.env.REACT_APP_PAYMOB_JAZZCASH_FACTOR1);
         const jazzCashFactor2 = parseFloat(process.env.REACT_APP_PAYMOB_JAZZCASH_FACTOR2);

          let result1 =0;
          let result2 = 0;
         if (paymentCode == 124774)
                {
                    result1 = totalPrice * cardFactor1;
                    result2 = result1 * cardFactor2;
                    //bankCharges = (2.7/100);
                }
                else if (paymentCode == 124780)
                {
                    result1 = totalPrice * easypaisaFactor1;
                    result2 = result1 * easyPaisaFactor2;
                    //bankCharges = (2.7 / 100);
                }
                else if (paymentCode == 124777)
                {
                    result1 = totalPrice * jazzCashFactor1;
                    result2 = result1 * jazzCashFactor2;
                    //bankCharges = (2.7 / 100);
                }

                console.log("result1",result1);
                console.log("result2",result2);
                // const finalAmount =  totalPrice + result1 + result2;
                const CalculateTotalAmount = parseFloat(totalPrice) + parseFloat(result1) + parseFloat(result2);
                const finalAmount  = Math.round(CalculateTotalAmount);
                console.log("Price2",finalAmount);
      // -------------------------------------------------------

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "auth_token": `${getToken.token}`,
        "delivery_needed": "false",
        "amount_cents": "100",
        "currency": "$",
        "items": [
            {
                "name": PNRNumber,
                "amount_cents": finalAmount,
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




