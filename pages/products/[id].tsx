import { useRouter } from "next/router";
import { notFound } from 'next/navigation'
 

import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import ProductPage from "../../components/productPage";
import container from "server/di/container";

//import productController from "server/controllers/ProductController";
import { useEffect, useState } from "react";
import getConfig from "next/config";
import ProductController from "server/controllers/ProductController";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export default function Base({ data }) {
  const router = useRouter();

  const [productData, setProductData] = useState(data);

  useEffect(() => {
    console.log("fetch")
    const fetchData = async () => {
      console.log("fetch in")
      const response = await fetch(
        BASE_URL + `/api/products/${router.query.id}/extended`
      );
      const newData = await response.json();
      console.log("newData: ", newData)
      if(newData["error"]) {
        router.push("/404")
      }
      setProductData(newData);
    };

    fetchData();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-200 antialiased">
      <SiteHeader></SiteHeader>
      <SearchFilters></SearchFilters>
      <main className="py-6">
        <div>
          <button
            className="mx-4 rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
        <div className="">
          <div className="">{ProductPage(productData)}</div>
        </div>
      </main>
    </div>
  );
}

const productController =
  container.resolve<ProductController>("ProductController");
export const getServerSideProps = productController.handler("products/:id");

/*export async function getServerSideProps({ req, res }) {
  const r = await productController.handler("products/:id")
  console.log('rr', r)
  return r ;
}*/
