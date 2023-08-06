import { useRouter } from "next/router";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import ProductPage from "../../components/productPage";
import React, { useEffect, useState } from "react";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";
import container from "server/di/container";
import ProductController from "server/controllers/ProductController";
import { wrapper } from "store";
import { saveProductAction, productRequestAction } from "store/actionCreators";
import * as actionTypes from "store/actionTypes";
import { normalize } from "normalizr";
import { product } from "functions/xfetch";


const mapDispatchToProps = (dispatch) => {
  return {
    saveProductAction: (data) => dispatch(saveProductAction(data)),
  };
};

const mapStateToProps = (state) => {

  const data =  structuredClone(state.productReducer.products.find(
    (i) => i.id == state.reducer.selectedProductId
  ))

  if(!data) return {}

  data.vendor = state.userReducer.users.find((u) => u.id == data.vendor)

  data.feedbacks = data.feedbacks.map(
    feedId => {
      const feedback = structuredClone(state.feedbackReducer.feedbacks.find((f) => f.id == feedId))

      feedback.author =  state.userReducer.users.find((u) => u.id ==  feedback.author)

      return feedback
    }
  )


  return {data}
};

function Base({ data }) {
  const dispatch: Dispatch<any> = useDispatch();

  const router = useRouter();

  const productData = data;
  useEffect(() => {
    dispatch(productRequestAction({ payload: { id: router.query.id } }));
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

const productController =
  container.resolve<ProductController>("ProductController");

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    //console.log('2. Page.getServerSideProps uses the store to dispatch things');
    store.dispatch(
      actionTypes.action(actionTypes.SELECT_PRODUCT_ID, {
        payload: { data: parseInt(context.query.id as string) },
      })
    );
    const res = await (
      productController.handler("products/:id") as (
        context: any
      ) => Promise<any>
    )(context);
    const nData = normalize(res.props.data, product)
    store.dispatch(saveProductAction({ data: nData }));

    return res;
  }
);
