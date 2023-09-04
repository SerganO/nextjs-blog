import getConfig from "next/config";
import { showErrorNotification } from "./showNotification";
import { Schema, normalize, schema } from 'normalizr';

const {
  publicRuntimeConfig: { BASE_URL, API_STRING },
} = getConfig();

export const user = new schema.Entity('users');

export const feedback = new schema.Entity('feedbacks', {
  author: user,
});

export const product = new schema.Entity('products', {
  vendor: user,
  feedbacks: [feedback],
});

export const page = new schema.Entity("pages", {
  products: [product],
}, {idAttribute: "page"})




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

export async function _xfetch(url: string, schema: Schema<any>, additionalProperties = {}) {
  const uri = /*API_STRING + */BASE_URL + url;
  return fetch(uri, additionalProperties).then(async (response) => {
    const json = await response.json()

    const nData =  normalize(json, schema)
    return nData
  }

  ) .catch((error) => {
    throw error;
  });
}
