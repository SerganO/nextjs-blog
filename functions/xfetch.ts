import getConfig from "next/config";
import { showErrorNotification } from "./showNotification";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export default async (
  url,
  additionalProperties = {},
  success,
  failure = showErrorNotification
) => {
  const fetchData = async () => {
    try {
      console.log("url: ", BASE_URL + url);
      const response = await fetch(BASE_URL + url, additionalProperties);
      if (response.ok) {
        const data = await response.json();
        success(data);
      } else {
        const text = await response.text();
        failure(Error(`error: ${text}`));
      }
    } catch (error) {
      failure(error);
    }
  };
  await fetchData();
};

export async function _xfetch(url: string, additionalProperties = {}) {
  const uri = '/api/v2/' + BASE_URL + url;
  return fetch(uri, additionalProperties).then((response) =>
    response.json()
  ) .catch((error) => {
    throw error;
  });

  const fetchData = async () => {
    try {
      console.log("url: ", BASE_URL + url);
      const response = await fetch(BASE_URL + url, additionalProperties);
      if (response.ok) {
        const data = await response.json();
        //success(data);
      } else {
        const text = await response.text();
        //failure(Error(`error: ${text}`))
      }
    } catch (error) {
      //failure(error);
    }
  };
  await fetchData();
}
