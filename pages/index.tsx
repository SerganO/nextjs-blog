import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import SiteHeader from "../components/siteHeader";
import SearchFilters from "../components/searchFilters";
import ProductPlate from "../components/productPlate";

import container from "server/di/container";
import ProductController from "server/controllers/ProductController";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";
import {
  mainProductPageRequestAction,
  saveMainProductPageAction,
} from "store/actionCreators";
import { wrapper } from "store";
import { normalize } from "normalizr";
import { mainPageInfo } from "functions/xfetch";

const mapDispatchToProps = (dispatch) => {
  return {
    saveMainProductPageAction: (data) =>
      dispatch(saveMainProductPageAction(data)),
  };
};

const mapStateToProps = (state) => {
  
  const data = structuredClone(state.mainPageInfoReducer.info)

  if (data == null) return {}

  data.products = data.products.map(
    id => {
      const product = structuredClone(state.productReducer.products.find((i) => i.id == id))

      product.feedbacks = product.feedbacks.map(
        feedId => {
          return structuredClone(state.feedbackReducer.feedbacks.find((f) => f.id == feedId))
        }
      )

      return product
    }
  )

  return {data}


};

function Base({ data }) {
  const productsData = data;

  //const [productsData, setProductsData] = useState<[IProduct]>(data);
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(mainProductPageRequestAction());
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
            {productsData?.products?.map((product, index) =>
              ProductPlate(product)
            )}
            ;
          </div>
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
//export const getServerSideProps = productController.handler("index");

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const res = await (
      productController.handler("index") as (context: any) => Promise<any>
    )(context);
    const nData = normalize(res.props.data, mainPageInfo)
    store.dispatch(
      saveMainProductPageAction({ data: nData  })
    );
    return res;
  }
);
