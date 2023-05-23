import { useQuery, dehydrate, QueryClient } from "react-query";
import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";
import { useRouter } from "next/router";
import ProductPlate from "../../components/productPlate";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

export default function paginationSSR(props) {
  const router = useRouter();
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);

  var userString = "";
  var userId = router.query.user;
  if (userId) {
    userString = `&user=${userId}`;
  }

  const { data } = useQuery(
    [page],
    async () =>
      await fetch(
        `http://localhost:3000/api/products/pagination?o=${
          (page - 1) * 20
        }&l=20${userString}`
      ).then((result) => result.json()),
    {
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const fullname = `${data.vendor?.firstName} ${data.vendor?.lastName}`;

  const handleGoMain = () => {
    router.push("/");
  };

  const handleGoBack = () => {
    router.back();
  };

  const goToProductsPage = () => {
    router.push("/products");
  };

  const goToUserPage = () => {
    router.push(`/users/${userId}`);
  };

  function handlePaginationChange(e, value) {
    setPage(value);
    router.push(`products/?page=${value}${userString}`, undefined, {
      shallow: true,
    });
  }
  return (
    <div>
      <SiteHeader></SiteHeader>
      <SearchFilters></SearchFilters>

      <div className="mx-4">
        <button
          className="mx-4 my-4 rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
          onClick={handleGoMain}
        >
          Go to main
        </button>
        <button
          hidden={!userId}
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
          <button className="mt-2  h-12 w-12 shrink-0" onClick={goToUserPage}>
            <img
              className="h-full w-full rounded-full object-cover shadow-md"
              src="https://cdn-icons-png.flaticon.com/512/236/236832.png?w=740&t=st=1684484148~exp=1684484748~hmac=76a8fdbb5201abe34f6169c8fcdd2993f7ef81e883b909ce225263ad4d9b1df1"
              alt={fullname}
            />
          </button>
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
            data.count % 20 == 0
              ? Math.trunc(data.count / 20)
              : Math.trunc(data.count / 20) + 1
          }
          variant="outlined"
          color="primary"
          className="pagination justify-center"
          page={page}
          onChange={handlePaginationChange}
        />
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {data?.products.map((product) => {
          return ProductPlate(product);
        })}
      </div>
      <div className="my-4 flex justify-center">
        <Pagination
          count={
            data.count % 20 == 0
              ? Math.trunc(data.count / 20)
              : Math.trunc(data.count / 20) + 1
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

export async function getServerSideProps(context) {
  let page = 1;
  if (context.query.page) {
    page = parseInt(context.query.page);
  }
  var userString = "";
  var userId = context.query.user;
  if (userId) {
    userString = `&user=${userId}`;
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [page],
    async () =>
      await fetch(
        `http://localhost:3000/api/products/pagination?o=${
          (page - 1) * 20
        }&l=20${userString}`
      ).then((result) => result.json())
  );
  return { props: { dehydratedState: dehydrate(queryClient) } };
}
