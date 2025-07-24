import apiClient from "../api_main";

export const GenerateSiteMap = async (values) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const fullUrl = `${values.baseUrl.replace(/\/$/, "")}/${values.slug.replace(
    /^\//,
    ""
  )}`;

  console.log("fullUrl", fullUrl);

  const raw_bk = JSON.stringify({
    urls: [
      {
        loc: fullUrl,
        lastmod: values.lastMod,
        changefreq: values?.changefreq,
        priority: values?.priority,
      },
    ],
  });

  const raw = {
    urls: [
      {
        loc: fullUrl,
        lastmod: values.lastMod,
        changefreq: values?.changefreq,
        priority: values?.priority,
      },
    ],
  };

  console.log("raw-data", raw);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  try {
    const response = await apiClient.post(
      "/sitemap",
      JSON.stringify(requestOptions)
    );

    const params = response.urls;

    if (!params) {
      throw new Error("Invalid response format from server.");
    }

    console.log("params-check", params);
    return params;
  } catch (error) {
    console.error("Error while Creating Sitemap:", error);
    return null; // Optional: make it consistent for the caller
  }
};
