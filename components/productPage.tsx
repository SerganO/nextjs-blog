import { useRouter } from "next/router";
import { useState } from "react";

import Product from "../server/models/Product";
import Star from "./star";
import FeedbackView from "./feedback";
import FeedbackForm from "./feedbackForm";

export default function ProductPage(product: Product) {
  var [feedbackShown, setFeedbackShown] = useState(false);
  const router = useRouter();

  const fullname = `${product.vendor.firstName} ${product.vendor.lastName}`;

  var rating = 0;
  var roundedRaiting = 0;
  if (product.feedbacks.length > 0) {
    rating = product.feedbacks.reduce(
      (sum, current) => sum + current.rating,
      0
    );
    rating = rating / product.feedbacks.length;
    roundedRaiting = Math.round(rating);
  }

  const goToProductsPage = () => {
    router.push(`/products?user=${product.vendor.id}`);
  };

  const toggle = () => {
    setFeedbackShown(!feedbackShown);
  };

  const goToUserPage = () => {
    router.push(`/users/${product.vendor.id}`);
  };

  return (
    <div className="">
      <div className="sm:flex sm:flex-wrap sm:justify-center">
        <div className="sm:mx-10 sm:flex">
          <div className="m-4 sm:w-3/4">
            <img
              className="rounded-lg object-cover shadow-md"
              src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt="villa"
            />
          </div>
          <div className="m-4 sm:w-1/4">
            <div className="h-fit justify-center rounded-lg bg-white px-4 py-3 shadow-lg ">
              <div className="flex h-fit flex-wrap items-center justify-center gap-x-4">
                <button
                  className="mt-2  h-12 w-12 shrink-0"
                  onClick={goToUserPage}
                >
                  <img
                    className="h-full w-full rounded-full object-cover shadow-md"
                    src="https://cdn-icons-png.flaticon.com/512/236/236832.png?w=740&t=st=1684484148~exp=1684484748~hmac=76a8fdbb5201abe34f6169c8fcdd2993f7ef81e883b909ce225263ad4d9b1df1"
                    alt={fullname}
                  />
                </button>
                <div className="mt-2 flex items-center justify-center">
                  <h4 className="mt-1 h-full w-fit flex-1 text-lg font-semibold text-gray-900">
                    {fullname}
                  </h4>
                </div>
              </div>
              <div className="mt-8 flex justify-center">
                <button
                  className="max-w-2 h-fit w-full max-w-xs rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
                  onClick={goToProductsPage}
                >
                  All Products
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:w-4/5 ">
          <h4 className="mt-1 text-lg font-semibold text-gray-900">
            {product.title}
            <span className="ml-1 text-xs text-gray-600">/{product.SKU}</span>
          </h4>
          <h6>{product.description}</h6>
          <div className="mt-1">
            <span className="text-gray-900">{product.price}₴</span>
          </div>
          <div className="flex justify-center">
            <button
              className="mx-4 my-4 w-full max-w-xs rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400 sm:w-100"
              onClick={() => {}}
            >
              Add to cart
            </button>
          </div>
          <div className="mt-1 flex flex-wrap items-center">
            <div className="flex items-center">
              <span className="mr-2 text-sm">{rating.toFixed(2)}</span>
              {Array.from({ length: roundedRaiting }).map((_, index) =>
                Star(true)
              )}
              {Array.from({ length: 5 - roundedRaiting }).map((_, index) =>
                Star(false)
              )}
            </div>
            <span className="ml-2 text-sm text-gray-600">
              {product.feedbacks.length} feedbacks
            </span>

            <button
              hidden={product.feedbacks.length <= 0}
              className="mx-4 my-4 rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400"
              onClick={toggle}
            >
              {feedbackShown ? "Hide" : "Show"}
            </button>
          </div>
          {FeedbackForm(product.id)}
          <div hidden={!feedbackShown}>
            {product.feedbacks.map((feedback, index) => FeedbackView(feedback))}
          </div>
        </div>
      </div>
    </div>

    /*<div>
      <div
        key={product.id}
        className="py-3 sm:w-80 sm:max-w-xs sm:flex-shrink-0 sm:px-2 sm:py-0"
      >
        <div className="aspect-6x5">
          <img
            className="rounded-lg object-cover shadow-md"
            src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            alt="villa"
          />
        </div>
        <div className="relative -mt-20 px-4">
          <div className="rounded-lg bg-white px-4 py-3 shadow-lg">
            <div>
              <h4 className="mt-1 text-lg font-semibold text-gray-900">
                {product.title}
                <span className="ml-1 text-xs text-gray-600">
                  /{product.SKU}
                </span>
              </h4>
              <h6>{product.description}</h6>
              <div className="mt-1">
                <span className="text-gray-900">{product.price}₴</span>
              </div>
              <div className="mt-1 flex items-center">
                <div className="flex items-center">
                  <span className="mr-2 text-sm">{rating.toFixed(2)}</span>
                  {Array.from({ length: roundedRaiting }).map((_, index) =>
                    Star(true)
                  )}
                  {Array.from({ length: 5 - roundedRaiting }).map((_, index) =>
                    Star(false)
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.feedbacks.length} feedbacks
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {product.feedbacks.map((feedback, index) => FeedbackView(feedback))}
      </div>
    </div>*/
  );
}
