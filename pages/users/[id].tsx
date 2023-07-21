import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import { IUser } from "server/models/User";

//import userController from "server/controllers/UserController";
import container from "server/di/container";
import getConfig from "next/config";
import Link from "next/link";
import UserController from "server/controllers/UserController";
import xfetch from "functions/xfetch";
import { saveUserToRedux } from "store/actionCreators";
import { Dispatch } from "redux";
import { connect, useDispatch } from "react-redux";
import { showErrorNotification } from "functions/showNotification";
import { wrapper } from "store";

const {
  publicRuntimeConfig: { BASE_URL },
} = getConfig();

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToRedux: (user) => dispatch(saveUserToRedux(user)),
  };
};

const mapStateToProps = (state) => ({
  data: state.userReducer.users[state.userReducer.users.length - 1],
});

function Base({ data }) {
  const router = useRouter();
  const dispatch: Dispatch<any> = useDispatch();

  const userData = data;

  //const [userData, setUserData] = useState<IUser>(data);

  useEffect(() => {
    xfetch(
      `/api/users/${router.query.id}`,
      {},
      (user) => {
        dispatch(saveUserToRedux(user));
      },
      showErrorNotification
    );
    /*xfetch(`/api/users/${router.query.id}`, {}, (data) => {
      setUserData(data);
    });*/
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

const userController = container.resolve<UserController>("UserController");
//export const getServerSideProps = userController.handler("users/:id");

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    //console.log('2. Page.getServerSideProps uses the store to dispatch things');
    const res = await (
      userController.handler("users/:id") as (context: any) => Promise<any>
    )(context);

    store.dispatch(saveUserToRedux(res.props.data));

    return res;
  }
);
