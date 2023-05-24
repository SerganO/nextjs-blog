import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import SiteHeader from "../components/siteHeader";
import SearchFilters from "../components/searchFilters";
import ProductPlate from "../components/productPlate";

import productController from "server/controllers/ProductController";
import getConfig from "next/config";
import Product from "server/models/Product";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export default function Base({ products }) {
  const [productsData, setProductsData] = useState<[Product]>(products);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        BASE_URL + "/api/products/feedbacksIncluded?o=0&l=20"
      );
      const newData = await response.json();
      setProductsData(newData);
    };

    fetchData();
  }, []);

  const goToProductsPage = () => {
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-gray-200 antialiased">
      <SiteHeader></SiteHeader>
      <SearchFilters></SearchFilters>
      <main className="py-6">
        <div className="px-4">
          <h3 className="text-xl text-gray-900">Los Angeles</h3>
          <p className="text-gray-600">
            Live like the stars in these luxurious Southern California estates.
          </p>
        </div>
        <button
          className="mx-4 my-4 rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
          onClick={goToProductsPage}
        >
          All Products
        </button>
        <div className="mt-6 sm:overflow-x-auto sm:px-4 ">
          <div className="px-4 sm:-ml-2 sm:inline-flex sm:px-0 sm:pb-8">
            {productsData?.map((product, index) => ProductPlate(product))};
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = productController.getServerSidePropsMainPage;
