import Pagination from "@material-ui/lab/Pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductPlate from "../../components/productPlate";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import getConfig from "next/config";

//import productController from "server/controllers/ProductController";
import container from "server/di/container";
import Link from "next/link";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export default function paginationSSR({ pageData }) {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);
  const [productsPageData, setProductsPageData] = useState(pageData);

  let userId = router.query.user;

  let userString = "";
  if (userId) {
    userString = `&user=${userId}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        BASE_URL +
          `/api/products/pagination?o=${(page - 1) * 20}&l=20${userString}`
      );
      const newData = await response.json();
      console.log("updating page data");
      setProductsPageData(newData);
    };

    fetchData();
  }, [page]);

  const goToProductsPage = () => {
    userId = "";
    userString = "";

    const fetchData = async () => {
      const response = await fetch(
        BASE_URL + `/api/products/pagination?o=0&l=20`
      );
      const newData = await response.json();
      console.log("updating page data");
      setProductsPageData(newData);
    };

    fetchData();
    router.replace("/products?page=1").then(() => {
      setPage(1);
    });
  };

  const fullname = `${productsPageData?.vendor?.firstName ?? ""} ${
    productsPageData?.vendor?.lastName ?? ""
  }`;

  const handleGoBack = () => {
    router.back();
  };

  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`products?page=${value}${userString}`, undefined, {
      shallow: true,
    });
  }
  return (
    <div>
      <SiteHeader></SiteHeader>
      <SearchFilters></SearchFilters>

      <div className="mx-4">
        <Link
          href="/"
          className="mx-4 my-4 inline-block rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
        >
          Go to main
        </Link>
        <button
          hidden={!userId}
          //href={`${BASE_URL}/products?page=1`}
          className="my-4 mr-4 rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
          onClick={goToProductsPage}
        >
          All Products
        </button>
      </div>
      <div hidden={!userId} className="mx-4 my-4">
        <div className="my-4">
          <button
            className="mx-4 rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
        <div className="mx-4 flex h-fit w-fit flex-wrap items-center gap-x-4 rounded-lg bg-gray-100  px-4 py-3 shadow-lg">
          <Link className="mt-2  h-12 w-12 shrink-0" href={`/users/${userId}`}>
            <img
              className="h-full w-full rounded-full object-cover shadow-md"
              src="https://cdn-icons-png.flaticon.com/512/236/236832.png?w=740&t=st=1684484148~exp=1684484748~hmac=76a8fdbb5201abe34f6169c8fcdd2993f7ef81e883b909ce225263ad4d9b1df1"
              alt={fullname}
            />
          </Link>
          <div className="mt-2 flex items-center justify-center">
            <h4 className="mt-1 h-full w-fit flex-1 text-lg font-semibold text-gray-900">
              {fullname}
            </h4>
          </div>
        </div>
      </div>
      <div className="my-4 flex justify-center">
        <Pagination
          count={
            productsPageData?.count % 20 == 0
              ? Math.trunc(productsPageData?.count / 20)
              : Math.trunc(productsPageData?.count / 20) + 1
          }
          variant="outlined"
          color="primary"
          className="pagination justify-center"
          page={page}
          onChange={handlePaginationChange}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {productsPageData?.products.map((product) => {
          return ProductPlate(product);
        })}
      </div>
      <div className="my-4 flex justify-center">
        <Pagination
          count={
            productsPageData?.count % 20 == 0
              ? Math.trunc(productsPageData?.count / 20)
              : Math.trunc(productsPageData?.count / 20) + 1
          }
          variant="outlined"
          color="primary"
          className="pagination items-center justify-center"
          page={page}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}

const productController = container.resolve("ProductController");
export const getServerSideProps = productController.getServerSidePaginated;
