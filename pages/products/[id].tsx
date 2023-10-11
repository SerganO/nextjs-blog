import { useRouter } from "next/router";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import ProductPage from "../../components/productPage";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import container from "server/di/container";
import clientContainer from "src/di/clientContainer";
import { useActions } from "src/hooks/useEntity";
import ReduxStore from "store/store";
import { action, ADD } from "store/actionTypes";

const reduxStore = clientContainer.resolve<ReduxStore>("ReduxStore");

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductAction: (data) => dispatch(action(ADD, { payload: data })),
  };
};

const mapStateToProps = (state) => {
  if (typeof state.products != `undefined`) {
    const selectedProductId = state.valueReducer["SELECTED_PRODUCT_ID"];
    const product = state.products[selectedProductId];
    if (product) {
      let vendor = null;
      if (product.vendor) {
        vendor = state.users[product.vendor];
      }
      const feedbacks = product.feedbacks.map((feedbacId) => {
        const feedback = state.feedbacks[feedbacId];
        const author = state.users[feedback.author];
        return { data: feedback, author };
      });

      return {
        data: {
          product,
          vendor,
          feedbacks,
        },
      };
    }
  }

  return {
    data: {
      product: null,
      vendor: null,
      feedbacks: [],
    },
  };
};

function Base({ data }) {
  const { setCurrentProduct } = useActions("ProductEntity");
  const router = useRouter();

  const productData = data;
  useEffect(() => {
    setCurrentProduct({ payload: { id: router.query.id } });
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
  (state) => state
)(Base);

export const getServerSideProps = reduxStore.getServerSideProps(
  container,
  "products/:id",
  "ProductController"
);
