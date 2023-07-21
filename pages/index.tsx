import { useRouter } from "next/router";
import { useState, useEffect } from "react";

import SiteHeader from "../components/siteHeader";
import SearchFilters from "../components/searchFilters";
import ProductPlate from "../components/productPlate";

//import productController from "server/controllers/ProductController";
import getConfig from "next/config";
import { IProduct } from "server/models/Product";

import container from "server/di/container";
import ProductController from "server/controllers/ProductController";
import xfetch from "functions/xfetch";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";
import { saveFirstSetToRedux } from "store/actionCreators";
import { showErrorNotification } from "functions/showNotification";
import { wrapper } from "store";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

const mapDispatchToProps = (dispatch) => {
  return {
    saveFirstSetToRedux: (user) => dispatch(saveFirstSetToRedux(user)),
  };
};

const mapStateToProps = (state) => (
  {
  data: state.productReducer.pages[state.productReducer.pages.length - 1]
});


function Base({ data }) {

  const productsData = data

  //const [productsData, setProductsData] = useState<[IProduct]>(data);
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();

  /*useEffect(() => {
    /*console.log("fetch")
    xfetch("/api/products/feedbacksIncluded/firstSet", {}, (data) => {
      setProductsData(data);
    });
    xfetch(
      "/api/products/feedbacksIncluded/firstSet",
      {},
      (products) => {
        dispatch(saveFirstSetToRedux({
          count: 0,
          products: products
        }))
      },
      showErrorNotification
    );
  }, []);*/

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
            {productsData?.products?.map((product, index) => ProductPlate(product))};
          </div>
        </div>
      </main>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  (state => state)
)(Base)


const productController = container.resolve<ProductController>("ProductController");
//export const getServerSideProps = productController.handler("index");

export const getServerSideProps = wrapper.getServerSideProps(store => async context => {
  
  const res = await (productController.handler("index") as ((context: any) => Promise<any>))(context)

  store.dispatch(saveFirstSetToRedux({
    count: 0,
    products:  res.props.data
  }))

  return res
});



/*export async function getServerSideProps({ req, res }) {
  const r = await productController.handler("index")
  console.log('rr', r)
  return r ;
}*/
