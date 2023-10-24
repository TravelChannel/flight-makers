export const fetchAccessToken = async () => {
  const url = 'https://api.havail.sabre.com/v2/auth/token';
  const clientId = 'VmpFNk5UVTFOVG8wTTBWRU9rRkI6YzNOM2NtVnpPVGs9';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${clientId}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 2);
  const expireAuthTokenDate = futureDate.toISOString().slice(0, 10);
  // console.log('Future Date (2 days ahead):', futureDateFormatted);

  const data = await response.json();

  const AuthTokenDet = {
    ...data,
    expireAuthTokenDate,
  };
  localStorage.setItem("AuthToken", JSON.stringify(AuthTokenDet));
};
