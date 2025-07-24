// const BASE_URL = "https://api.faremakers.com/api/amadeus-live/";

const BASE_URL = "http://localhost:5000/api/amadeus-live/";

// const BASE_URL = "http://localhost:5000/api/amadeus/";

// const BASE_URL = "https://api.flightmakers.com/api/amadeus-live/";

export async function fetchApi(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
