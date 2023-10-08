import { useRouter } from "next/router";
import { useEffect } from "react";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";

import getConfig from "next/config";
import Link from "next/link";
import { connect } from "react-redux";
import { showErrorNotification } from "src/functions/showNotification";
//import { saveUserAction } from "store/actionCreators";
import clientContainer from "src/di/clientContainer";
import { useActions } from "src/hooks/useEntity";
import ReduxStore from "store/store";
import container from "server/di/container";
import { action, ADD } from "store/actionTypes";

const reduxStore = clientContainer.resolve<ReduxStore>("ReduxStore");

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserAction: (data) => dispatch(action(ADD, {payload: data})),
  };
};
const mapStateToProps = (state) => {
    if(typeof state.users == `undefined`) return {}
    return {data: state.users[state.valueReducer.values["SELECTED_USER"]]}
}



function Base({ data }) {
  const router = useRouter();
  const {setCurrentUser} = useActions('UserEntity')

  const userData = data;

  //const [userData, setUserData] = useState<IUser>(data);

 useEffect(() => {
    setCurrentUser( { payload: { id: router.query.id }})
    //fetchUser( { payload: { id: router.query.id }})
    //const entity = clientContainer.resolve<UserEntity>("UserEntity")
    //dispatch(entity.fetchUserInvokable({ payload: { id: router.query.id }}))
    //dispatch(entity.action("fetchUser", { payload: { id: router.query.id }}))
    //dispatch(userRequestAction({ payload: { id: router.query.id } }));
  }, []);

  const fullname = `${userData?.firstName} ${userData?.lastName}`;

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
        <div className="m-4">
          <div className="h-fit w-full rounded-lg bg-white px-4 py-3 shadow-lg ">
            <div className="flex h-fit flex-wrap items-center gap-x-4">
              <div className="h-24 w-24">
                <img
                  className="h-full w-full rounded-full object-cover shadow-md"
                  src="https://cdn-icons-png.flaticon.com/512/236/236832.png?w=740&t=st=1684484148~exp=1684484748~hmac=76a8fdbb5201abe34f6169c8fcdd2993f7ef81e883b909ce225263ad4d9b1df1"
                  alt={fullname}
                />
              </div>
              <div className="mt-2 flex items-center justify-center">
                <h4 className="mt-1 h-full w-fit flex-1 text-lg font-semibold text-gray-900">
                  {fullname}
                </h4>
              </div>
            </div>
            <div
              hidden={userData?.role != "vendor"}
              className="mt-8 flex justify-center"
            >
              <Link
                href={`/products?user=${userData?.id}`}
                hidden={userData?.role != "vendor"}
                className="max-w-2 h-fit w-full max-w-xs rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
                //onClick={goToProductsPage}
              >
                All Products
              </Link>
            </div>
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


/*export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    //console.log('2. Page.getServerSideProps uses the store to dispatch things');
    const res = await (
      userController.handler("users/:id") as (context: any) => Promise<any>
    )(context);

    store.dispatch(saveUserToRedux(res.props.data));

    return res;
  }
);*/

export const getServerSideProps = reduxStore.getServerSideProps(container, "users/:id", "UserController")
/*
  (store) => async (context) => {
    //console.log('2. Page.getServerSideProps uses the store to dispatch things');
    const res = await (
      userController.handler("users/:id") as (
        context: any
      ) => Promise<any>
    )(context);
    //const nData = normalize(res.props.data.data, {items:user})
    //store.dispatch(saveUserAction({ data: nData }));
    store.dispatch(userEntity.normalize(res.props.data))
    store.dispatch(
      actionTypes.action(actionTypes.UPDATE_VALUE, {
        
        payload: { data: {
          key: "SELECTED_USER",
          value: parseInt(context.query.id as string)
        } },
      }
    )
    
    );

    return res;
  }
);*/