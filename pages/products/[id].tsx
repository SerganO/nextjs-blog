import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import SiteHeader from "../../components/siteHeader";
import SearchFilters from "../../components/searchFilters";
import ProductPage from "../../components/productPage";
import Product from "../../server/models/Product";

interface PageProps {
  product: Product;
}

export default function Base({ product }: PageProps) {
  const router = useRouter();

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
          <div className="">{ProductPage(product)}</div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context
) => {
  const response = await fetch(
    `http://localhost:3000/api/products/${context.params.id as string}/extended`
  );
  const data = await response.json();

  return {
    props: {
      product: data as Product,
    },
  };
};
