import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import User from "../../server/models/User";

interface PageProps {
  user: User;
}

export default function Base({ user }: PageProps) {
  const router = useRouter();

  const fullname = `${user.firstName} ${user.lastName}`;

  const goToProductsPage = () => {
    router.push(`/products?user=${user.id}`);
  };

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
              hidden={user.role != "vendor"}
              className="mt-8 flex justify-center"
            >
              <button
                hidden={user.role != "vendor"}
                className="max-w-2 h-fit w-full max-w-xs rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
                onClick={goToProductsPage}
              >
                All Products
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const response = await fetch(
    `http://localhost:3000/api/users/${context.params.id as string}`
  );
  const data = await response.json();

  return {
    props: {
      user: data as User,
    },
  };
};
