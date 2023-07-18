import { useRouter } from "next/router";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import ProductPage from "../../components/productPage";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import { saveProductToRedux } from "store/actionCreators";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";
import container from "server/di/container";
import ProductController from "server/controllers/ProductController";
import xfetch from "functions/xfetch";
import { showErrorNotification } from "functions/showNotification";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();


const mapDispatchToProps = (dispatch) => {
  return {
    saveProductToRedux: (product) => dispatch(saveProductToRedux(product)),
  };
};

const mapStateToProps = (state) => (
  {
  data: state.productReducer.products[state.productReducer.products.length - 1]
});

function Base({ data }) {
  const dispatch: Dispatch<any> = useDispatch();

  /*const recieveProduct = React.useCallback(
    (id, success, failure) => dispatch(getProduct(id, success, failure)),
    [dispatch]
  );*/



  const router = useRouter();

  const productData = data
  useEffect(() => {
    xfetch(
      `/api/products/${router.query.id}/extended`,
      {},
      (product) => {
        dispatch(saveProductToRedux(product))
      },
      showErrorNotification
    );
   /* recieveProduct(
      router.query.id,
      (data) => {
        if (data["error"]) {
          router.push("/404");
        }
        setProductData(data);
      },
      showErrorNotification
    );*/
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Base)

/*export default Base;*/

const productController =
  container.resolve<ProductController>("ProductController");
export const getServerSideProps = productController.handler("products/:id");
