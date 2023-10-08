import { useRouter } from "next/router";
import SiteHeader from "../components/siteHeader";
import SearchFilters from "../components/searchFilters";
import ProductPlate from "../components/productPlate";

import container from "server/di/container";
import { connect } from "react-redux";
//import { saveMainProductPageAction } from "store/actionCreators";
import { useActions } from "src/hooks/useEntity";
import clientContainer from "src/di/clientContainer";
import ReduxStore from "store/store";
import { action, ADD } from "store/actionTypes";

const reduxStore = clientContainer.resolve<ReduxStore>("ReduxStore");

const mapDispatchToProps = (dispatch) => {
  return {
    saveMainProductPageAction: (data) =>
      dispatch(action(ADD, {payload: data})),
  };
};

const mapStateToProps = (state) => {
  const productData = 
    (Object.values(state.products) as any[])
      .sort((a, b) => a.id - b.id)
      .slice(0, 20)
      .map(product => {
        const feedbacks = product.feedbacks.map((feedbacId) => {
          return state.feedbacks[feedbacId];
        });
        return { product, feedbacks }
      })

  return {data: productData}

};

function Base({ data }) {
  const productsData = data;

  const router = useRouter();
  const { fetchMainProductPage } =
    useActions("ProductEntity");
  /*useEffect(() => {
    fetchMainProductPage();
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
            {productsData?.map((product, index) =>
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

export const getServerSideProps = reduxStore.getServerSideProps(container, "index", 'ProductController')
