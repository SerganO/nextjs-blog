export default function HousePlate() {
  return (
    <div className="py-3 sm:w-80 sm:max-w-xs sm:flex-shrink-0 sm:px-2 sm:py-0">
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
            <div className="flex items-center">
              <span className="inline-block rounded-full bg-teal-200 px-2 py-1 text-xs font-semibold uppercase leading-none tracking-wide text-teal-800">
                Plus
              </span>
              <div className="pl-2 text-xs font-semibold uppercase tracking-wide text-gray-600">
                3 beds &bull; 2 baths
              </div>
            </div>
            <h4 className="mt-1 text-lg font-semibold text-gray-900">
              Modern home in city center
            </h4>
            <div className="mt-1">
              <span className="text-gray-900">$1400</span>
              <span className="ml-1 text-gray-600">/wk</span>
            </div>
            <div className="mt-1 flex items-center">
              <div className="flex items-center">
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-teal-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 fill-current text-teal-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className=" h-4 w-4 fill-current text-teal-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className=" h-4 w-4 fill-current text-teal-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                <svg
                  viewBox="0 0 24 24"
                  className=" h-4 w-4 fill-current text-teal-500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <span className="ml-2 text-sm text-gray-600">34 reviews</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
