import { Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductPlate from "../../components/productPlate";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import container from "server/di/container";
import Link from "next/link";
import { connect } from "react-redux";
import { useActions } from "src/hooks/useEntity";
import clientContainer from "src/di/clientContainer";
import ReduxStore from "store/store";
import { action, ADD } from "store/actionTypes";

const reduxStore = clientContainer.resolve<ReduxStore>("ReduxStore");

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductPageAction: (data) => dispatch(action(ADD, { payload: data })),
  };
};

const mapStateToProps = (state) => {
  const pageName = "products";
  const pagination = state.pagination[pageName];
  if (typeof pagination == `undefined` || !pagination.pages) return {};
  const selectedPage = pagination.currentPage;
  const currentFilter = pagination.filter;
  const data = pagination.pages[selectedPage];
  if (data == null) return {};
  const productData = data.ids.map((productId) => {
    const product = state.products[productId];
    const feedbacks = product.feedbacks.map((feedbacId) => {
      return state.feedbacks[feedbacId];
    });

    return { product, feedbacks };
  });

  if (state.users && pagination.filter && pagination.filter.user_id) {
    productData["vendor"] = state.users[pagination.filter.user_id];
  }

  productData["count"] = pagination.count;
  productData["currentFilter"] = currentFilter;
  return { data: productData };
};

function Base({ data }) {
  const router = useRouter();

  const { fetchProductsPage } = useActions("ProductEntity");
  const { fetchUser } = useActions("UserEntity");
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);

  const productsPageData = data;

  let userId = router.query.user;

  let userString = "";
  if (userId) {
    userString = `&user=${userId}`;
  }

  const filter = {};
  if (userId) {
    filter["user_id"] = userId;
  }

  const currentFilter = productsPageData?.currentFilter ?? {};

  const cKeys = Object.keys(currentFilter);
  const fKeys = Object.keys(filter);
  let force = false;
  if (cKeys.length != fKeys.length) {
    force = true;
  } else {
    cKeys.forEach((key) => {
      if (currentFilter[key] != filter[key]) {
        force = true;
      }
    });
  }
  useEffect(() => {
    fetchProductsPage({
      payload: { page: page, pageName: "products", perPage: 20, filter, force },
    });
  }, [page]);

  useEffect(() => {
    if(filter["user_id"] && data && !data.vendor) {
      fetchUser({payload: {id: filter["user_id"]}})
    }
  }, [filter])

  const goToProductsPage = () => {
    userId = "";
    userString = "";
    router.push(
      {
        query: {
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
    setPage(1);
    fetchProductsPage({
      payload: { page: 1, pageName: "products", filter: {}, force: true },
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
        {productsPageData?.map((product) => {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  (state) => state
)(Base);

export const getServerSideProps = reduxStore.getServerSideProps(
  container,
  "products/index",
  "ProductController"
);
