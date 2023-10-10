import Star from "./star";
import Link from "next/link";

export default function ProductPlate({ product, feedbacks }) {
  var rating = 0;
  var roundedRaiting = 0;
  if (feedbacks.length > 0) {
    rating = feedbacks.reduce((sum, current) => sum + current.rating, 0);
    rating = rating / feedbacks.length;
    roundedRaiting = Math.round(rating);
  }

  if (product) {
    return (
      <Link
        href={`/products/${product.id}`}
        key={product.id}
        className="h-full py-3 sm:w-80 sm:max-w-xs sm:flex-shrink-0 sm:px-2 sm:py-0"
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
                    Star(true, index)
                  )}
                  {Array.from({ length: 5 - roundedRaiting }).map((_, index) =>
                    Star(false, index)
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {feedbacks.length} feedbacks
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <div
        className="h-full py-3 sm:w-80 sm:max-w-xs sm:flex-shrink-0 sm:px-2 sm:py-0"
        //onClick={moveToProduct}
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
                Title<span className="ml-1 text-xs text-gray-600"> SKU </span>
              </h4>
              <h6> desctiption </h6>
              <div className="mt-1">
                <span className="text-gray-900">-₴</span>
              </div>
              <div className="mt-1 flex items-center">
                <div className="flex items-center">
                  <span className="mr-2 text-sm">0</span>
                  {Array.from({ length: 5 }).map((_, index) =>
                    Star(false, index)
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600">0 feedbacks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
