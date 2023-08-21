import Pagination from "@material-ui/lab/Pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ProductPlate from "../../components/productPlate";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import container from "server/di/container";
import clientContainer from "src/di/clientContainer";
import Link from "next/link";
import ProductController from "server/controllers/ProductController";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";
import { wrapper } from "store";
import { saveProductPageAction, productPageRequestAction } from "store/actionCreators";
import * as actionTypes from "store/actionTypes";
import { Schema, normalize, schema } from 'normalizr';
import { mainPageInfo, page } from "src/functions/xfetch";
import PageEntity from "src/entities/PageEntity";

const mapDispatchToProps = (dispatch) => {
  return {
    saveProductPageAction: (data) => dispatch(saveProductPageAction(data)),
  };
};

const mapStateToProps = (state) => {
  /*const data = structuredClone(state.commonReducer.entities.pages.find(
    //(i) => i.page == state.reducer.selectedPage
    (i) => i.page == state.valueReducer.values["SELECTED_PAGE"]
  ))*/

  if(typeof state.commonReducer.entities.pages == `undefined`) return {}
  const data = structuredClone(state.commonReducer.entities.pages[state.valueReducer.values["SELECTED_PAGE"]])
  

  if (data == null) return {}

  data.products = data.products.map(
    id => {
      //const product = structuredClone(state.commonReducer.entities.products.find((i) => i.id == id))
      const product = structuredClone(state.commonReducer.entities.products[id])

      product.feedbacks = product.feedbacks.map(
        feedId => {
          //return structuredClone(state.commonReducer.entities.feedbacks.find((f) => f.id == feedId))
          return structuredClone(state.commonReducer.entities.feedbacks[feedId])
        }
      )

      return product
    }
  )

  return {data}
};

function Base({ data }) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();
  const [page, setPage] = useState(parseInt(router.query.page as string) || 1);

  const productsPageData = data;

  //const [productsPageData, setProductsPageData] = useState(data);

  let userId = router.query.user;

  let userString = "";
  if (userId) {
    userString = `&user=${userId}`;
  }

  useEffect(() => {
    
    const entity = clientContainer.resolve<PageEntity>("PageEntity")
    //dispatch(entity.action("fetchProductPage", { payload: { page: page, userString: userString} }))
    const action = entity.fetchProductPageInvokable({ payload: { page: page, userString: userString}})
    console.log("invokableAction: ", action)
    dispatch(action)
    //dispatch(productPageRequestAction({ payload: { page: page, userString: userString} }))
  }, [page]);

  const goToProductsPage = () => {
    userId = "";
    userString = "";
    router.push(
      {
        query: {
          page: 1
        },
      },
      undefined,
      { shallow: true }
    );
    setPage(1)
    const entity = clientContainer.resolve<PageEntity>("PageEntity")
    dispatch(entity.action("fetchProductPage", { payload: { page: 1, userString: ""} }))
    //dispatch(entity.fetchProductPageInvokable({ payload: { page: 1, userString: ""}}))
   
    //dispatch(productPageRequestAction({ payload: { page: 1, userString: ""} }))
    /*router.replace("/products?page=1").then(() => {
      setPage(1)
    });*/
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
      actionTypes.action(actionTypes.UPDATE_VALUE, {
        
          payload: { data: {
            key: "SELECTED_PAGE",
            value: (parseInt(context.query.page as string) || 1)
          } },
        }
      )
      /*actionTypes.action(actionTypes.SELECT_PAGE, {
        payload: { data: (parseInt(context.query.page as string) || 1) },
      })*/
    );
    const res = await (
      productController.handler("products/index") as (
        context: any
      ) => Promise<any>
    )(context);

    const nData = normalize(res.props.data, page)
    console.log("nData: ", nData)
    store.dispatch(saveProductPageAction({ data: nData }));

    return res;
  }
);

