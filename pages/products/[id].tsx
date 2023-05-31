import { useRouter } from "next/router";

import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import ProductPage from "../../components/productPage";
import container from "server/di/container";

//import productController from "server/controllers/ProductController";
import { useEffect, useState } from "react";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export default function Base({ product }) {
  const router = useRouter();

  const [productData, setProductData] = useState(product);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        BASE_URL + `/api/products/${router.query.id}/extended`
      );
      const newData = await response.json();
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

const productController = container.resolve("ProductController");
export const getServerSideProps = productController.getServerSideProduct;
