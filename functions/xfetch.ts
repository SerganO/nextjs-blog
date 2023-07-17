import getConfig from "next/config";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

function showNotification(error: Error) {
  window.alert(error.message);
}

export default async (url, additionalProperties = {}, success, failure = showNotification) => {
  const fetchData = async () => {
    try {
      console.log("url: ", BASE_URL + url);
      const response = await fetch(BASE_URL + url, additionalProperties);
      if(response.ok) {
        const data = await response.json();
        success(data);
      } else {
        const text = await response.text()
        failure(Error(`error: ${text}`))
      }
     
    } catch (error) {
      failure(error);
    }
  };
  await fetchData();
};
