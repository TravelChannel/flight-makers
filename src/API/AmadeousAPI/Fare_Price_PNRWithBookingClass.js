import { fetchApi } from "./Api";
export const Fare_Price_PNRWithBookingClass = async (
  SessionData,
  companyIdentification
) => {
  // getting Session ID and Security Token
  const SessionId = SessionData.SessionID;
  const SecurityToken = SessionData.SecurityToken;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    Fare_PricePNRWithBookingClass: {
      pricingOptionGroup: [
        // {
        //   "pricingOptionKey": {
        //     "pricingOptionKey": "RP"
        //   }
        // },
        // {
        //   "pricingOptionKey": {
        //     "pricingOptionKey": "RU"
        //   }
        // },
        {
          pricingOptionKey: {
            pricingOptionKey: "RLO",
          },
        },
        {
          pricingOptionKey: {
            pricingOptionKey: "VC",
          },
          carrierInformation: {
            companyIdentification: {
              otherCompany: `${companyIdentification[0]}`,
            },
          },
        },
        {
          pricingOptionKey: {
            pricingOptionKey: "FCO",
          },
          currency: {
            firstCurrencyDetails: {
              currencyQualifier: "FCO",
              currencyIsoCode: "$",
            },
          },
        },
      ],
    },
    session: {
      TransactionStatusCode: "InSeries",
      SessionId: `${SessionId}`,
      SequenceNumber: "4",
      SecurityToken: `${SecurityToken}`,
    },
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const result = await fetchApi(
      "fare_price_pnrwithbookingclass",
      requestOptions
    );
    if (result.success === true) {
      const getFairList =
        result?.data?.["soapenv:Envelope"]?.["soapenv:Body"]
          ?.Fare_PricePNRWithBookingClassReply?.fareList;
      return getFairList;
    } else {
      throw new Error(
        "error while Fetching fare_price_pnrwithbookingclass",
        result
      );
    }
  } catch (error) {
    console.log("Error while Fetching fare_price_pnrwithbookingclass", error);
  }
};
