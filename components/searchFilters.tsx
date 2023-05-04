import { useState } from "react";

export default function SearchFilters() {
  var [isOpen, setIsOpen] = useState(false);

  return (
    <section className=" bg-gray-800 ">
      <div>
        <div className="flex justify-between px-4 py-2">
          <div className=" group flex w-full max-w-xs items-center rounded-lg bg-gray-900 px-3  py-2 focus-within:bg-gray-200 hover:bg-white ">
            <svg
              className="h-5 w-5 fill-current text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m14.32 12.906 1.096 1.096c.412-.023.83.123 1.145.437l3 3a1.5 1.5 0 0 1-2.122 2.122l-3-3a1.497 1.497 0 0 1-.437-1.145l-1.096-1.096a8 8 0 1 1 1.414-1.414ZM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Z" />
            </svg>
            <input
              className="ml-1 block w-full bg-gray-900 text-base text-gray-500 focus:bg-gray-200 focus:text-gray-800 focus:outline-none group-hover:bg-white"
              placeholder="Search by keyword"
            ></input>
          </div>

          <button
            onClick={Toggle}
            className={
              isOpen
                ? "group ml-2 flex items-center justify-center rounded-lg bg-gray-900  px-3 py-2"
                : "group ml-2 flex items-center justify-center rounded-lg bg-gray-500  px-3 py-2"
            }
          >
            <svg
              viewBox="0 0 24 24"
              className="mt-1 h-4 w-4 fill-current text-gray-200 group-hover:text-white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 1a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm3 6a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1Zm4 5a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H7Z" />
            </svg>
            <span className=" ml-1 text-base text-gray-200 group-hover:text-white">
              Filters
            </span>
          </button>
        </div>
      </div>
      <form hidden={!isOpen}>
        <div className="by-4 border-t border-gray-900 sm:flex">
          <div className="flex sm:w-1/2">
            <label className="block w-1/2 px-4">
              <span className="text-sm font-semibold text-gray-500">
                Bedrooms
              </span>
              <select className="bg-gray=700 form-select mt-1 block w-full text-white shadow focus:bg-gray-600">
                <option>4</option>
              </select>
            </label>
            <label className="block w-1/2 px-4">
              <span className=" text-sm font-semibold text-gray-500">
                Bathrooms
              </span>
              <select className="bg-gray=700 form-select mt-1 block w-full text-white shadow focus:bg-gray-600">
                <option>2</option>
              </select>
            </label>
          </div>
          <div className="pb-5 pt-8 sm:w-1/2 sm:pt-0">
            <label className="block w-full px-4">
              <span className="text-sm font-semibold text-gray-500">
                Price range
              </span>
              <select className="bg-gray=700 form-select mt-1 block w-full text-white shadow focus:bg-gray-600">
                <option>Up to $2.000/wk</option>
              </select>
            </label>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-900 py-4">
          <span className=" block px-4 text-sm font-semibold text-gray-500">
            Property type
          </span>
          <div className="px-4 sm:flex">
            <label className="flex items-center sm:w-1/4">
              <input
                className="form-radio"
                type="radio"
                name="properType"
                value="house"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">House</span>
            </label>
            <label className="flex items-center sm:w-1/4">
              <input
                className="form-radio"
                type="radio"
                name="properType"
                value="apartment"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Apartment</span>
            </label>
            <label className="flex items-center sm:w-1/4">
              <input
                className="form-radio"
                type="radio"
                name="properType"
                value="loft"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Loft</span>
            </label>
            <label className="flex items-center sm:w-1/4">
              <input
                className="form-radio"
                type="radio"
                name="properType"
                value="townhouse"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Townhouse</span>
            </label>
          </div>
        </div>
        <div className="mt-4 border-t border-gray-900 py-4">
          <span className="block px-4 text-sm font-semibold text-gray-500">
            Amenities
          </span>
          <div className="px-4 sm:flex sm:flex-wrap">
            <label className="flex items-center sm:mt-3 sm:w-1/4">
              <input
                className="form-checkbox"
                type="checkbox"
                name="balcony"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Balcony</span>
            </label>
            <label className="flex items-center sm:mt-3  sm:w-1/4">
              <input
                className="form-checkbox"
                type="checkbox"
                name="airConditioning"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">
                Air Conditioning
              </span>
            </label>
            <label className="flex items-center sm:mt-3  sm:w-1/4">
              <input
                className="form-checkbox"
                type="checkbox"
                name="pool"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Pool</span>
            </label>
            <label className="flex items-center sm:mt-3  sm:w-1/4">
              <input
                className="form-checkbox"
                type="checkbox"
                name="beach"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Beach</span>
            </label>
            <label className="flex items-center sm:mt-3  sm:w-1/4">
              <input
                className="form-checkbox"
                type="checkbox"
                name="petFriendly"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Pet Friendly</span>
            </label>
            <label className="flex items-center sm:mt-3  sm:w-1/4">
              <input
                className="form-checkbox"
                type="checkbox"
                name="kidFriendly"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Kid Friendly</span>
            </label>
            <label className="flex items-center sm:mt-3  sm:w-1/4">
              <input
                className="form-checkbox"
                type="checkbox"
                name="parking"
              ></input>
              <span className="ml-2 mt-3 text-white sm:mt-0">Parking</span>
            </label>
          </div>
        </div>
        <div className="bg-gray-900 px-4 py-4 sm:text-right">
          <button className="w-full rounded-lg bg-indigo-500 px-4 py-2 font-semibold text-white hover:bg-indigo-400 sm:inline-block sm:w-auto">
            Update results
          </button>
        </div>
      </form>
    </section>
  );

  function Toggle() {
    setIsOpen(!isOpen);
  }
}
