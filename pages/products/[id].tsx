import { useRouter } from "next/router";
import { notFound } from 'next/navigation'
 

import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import ProductPage from "../../components/productPage";
import container from "server/di/container";

//import productController from "server/controllers/ProductController";
import React, {useEffect, useState } from "react";
import getConfig from "next/config";
import { getProduct } from "store/actionCreators";
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

function showNotification(error: Error) {
  window.alert(error.message);
}


function Base({ data }) {
  const dispatch: Dispatch<any> = useDispatch()

  const recieveProduct = React.useCallback(
    (id, success, failure) => dispatch(getProduct(id, success, failure)),
    [dispatch]
  )
  

  const router = useRouter();

  const [productData, setProductData] = useState(data);

  useEffect(() => {
    /*xfetch(`/api/products/${router.query.id}/extended`, {}, (data) => {
      if(data["error"]) {
        router.push("/404")
      }
      setProductData(data);
    })*/
    recieveProduct(router.query.id,  (data) => {
      if(data["error"]) {
        router.push("/404")
      }
      setProductData(data);
    }, showNotification)

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



/*const mapStateToProps = (state) => ({
  users: state.reducer.users
});

const mapDispatchToProps = (dispatch) => {
  return {
      saveUsersToRedux: (users) => dispatch(saveUsersToRedux(users))
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Base)*/

export default Base

/*const productController =
  container.resolve<ProductController>("ProductController");
export const getServerSideProps = productController.handler("products/:id");*/

/*export async function getServerSideProps({ req, res }) {
  const r = await productController.handler("products/:id")
  console.log('rr', r)
  return r ;
}*/
