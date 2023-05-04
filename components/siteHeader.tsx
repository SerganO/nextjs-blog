import Link from "next/link";
import { useState } from "react";

export default function SiteHeader() {
  var [isOpen, setIsOpen] = useState(false);

  return (
    <header className=" bg-gray-900 sm:flex sm:items-center sm:justify-between">
      <div className="flex justify-between py-3 pl-4">
        <div>
          <svg className="h-8 w-44" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M121.09 28.336c2.352 0 4.392-1.248 5.424-3.12l-2.688-1.536c-.48.984-1.512 1.584-2.76 1.584-1.848 0-3.216-1.368-3.216-3.264 0-1.92 1.368-3.288 3.216-3.288 1.224 0 2.256.624 2.736 1.608l2.664-1.56c-.984-1.848-3.024-3.096-5.376-3.096-3.648 0-6.336 2.76-6.336 6.336 0 3.576 2.688 6.336 6.336 6.336ZM137.084 16v1.416c-.864-1.08-2.16-1.752-3.912-1.752-3.192 0-5.832 2.76-5.832 6.336 0 3.576 2.64 6.336 5.832 6.336 1.752 0 3.048-.672 3.912-1.752V28h3.096V16h-3.096Zm-3.336 9.384c-1.896 0-3.312-1.368-3.312-3.384s1.416-3.384 3.312-3.384c1.92 0 3.336 1.368 3.336 3.384s-1.416 3.384-3.336 3.384ZM149.851 18.976V16h-2.712v-3.36l-3.096.936V16h-2.088v2.976h2.088v4.992c0 3.24 1.464 4.512 5.808 4.032v-2.808c-1.776.096-2.712.072-2.712-1.224v-4.992h2.712ZM153.57 14.56c1.056 0 1.92-.864 1.92-1.896s-.864-1.92-1.92-1.92c-1.032 0-1.896.888-1.896 1.92s.864 1.896 1.896 1.896ZM152.034 28h3.096V16h-3.096v12ZM163.676 28.336c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336Zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312ZM178.886 15.664c-1.608 0-2.856.6-3.576 1.68V16h-3.096v12h3.096v-6.48c0-2.088 1.128-2.976 2.64-2.976 1.392 0 2.376.84 2.376 2.472V28h3.096v-7.368c0-3.192-1.992-4.968-4.536-4.968Z"
              fill="#A3BFFA"
            />
            <path
              d="M61.063 28h3.768l3.144-11.088L71.143 28h3.768l4.704-16.8h-3.48L72.92 23.656 69.391 11.2H66.56l-3.504 12.456L59.84 11.2h-3.48L61.063 28ZM85.674 28.336c3.528 0 6.36-2.76 6.36-6.336 0-3.576-2.832-6.336-6.36-6.336-3.528 0-6.336 2.76-6.336 6.336 0 3.576 2.808 6.336 6.336 6.336Zm0-3.024c-1.824 0-3.24-1.368-3.24-3.312 0-1.944 1.416-3.312 3.24-3.312 1.848 0 3.264 1.368 3.264 3.312 0 1.944-1.416 3.312-3.264 3.312ZM97.308 18.064V16h-3.096v12h3.096v-5.736c0-2.52 2.04-3.24 3.648-3.048V15.76c-1.512 0-3.024.672-3.648 2.304ZM113.831 28l-4.968-6.072L113.687 16h-3.696l-4.128 5.28V11.2h-3.096V28h3.096v-5.448L110.231 28h3.6Z"
              fill="#fff"
            />
            <path
              d="M43.911 12.604 36.213 8.16v20.645h9v2h-44v-2h4v-12.72l-3.728.933L1 15.078l21.09-5.273h3.122a9.552 9.552 0 0 0-.68 2.559l-.483 3.975 5.164-2.982v15.448h5V8.161l-7.696 4.444a7.502 7.502 0 0 1 2.565-4.8h-4.12a7.489 7.489 0 0 1 6.646-2.973l-5.591-3.228a7.488 7.488 0 0 1 6.696.402c1.039.6 1.88 1.41 2.5 2.347a7.461 7.461 0 0 1 2.5-2.347 7.49 7.49 0 0 1 6.698-.402l-5.593 3.228a7.488 7.488 0 0 1 6.646 2.973h-4.12a7.498 7.498 0 0 1 2.567 4.8ZM25.213 28.805v-10h-6v10h6Zm-11-8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
              fill="#A3BFFA"
            />
          </svg>
        </div>
        <div className="flex">
          <button
            onClick={Toggle}
            className=" pr-4 text-gray-500 hover:text-white focus:text-white focus:outline-none sm:hidden"
          >
            <svg
              className="h-4 w-4 fill-current "
              xmlns="http://www.w3.org/2000/svg"
              viewBox={!isOpen ? "0 0 18 14" : "0 0 14 14"}
            >
              <path
                d={
                  !isOpen
                    ? "M0 1C0 0.447715 0.447715 0 1 0H17C17.5523 0 18 0.447715 18 1C18 1.55228 17.5523 2 17 2H1C0.447716 2 0 1.55228 0 1ZM0 7C0 6.44772 0.447715 6 1 6H17C17.5523 6 18 6.44772 18 7C18 7.55228 17.5523 8 17 8H1C0.447716 8 0 7.55228 0 7ZM1 12C0.447715 12 0 12.4477 0 13C0 13.5523 0.447716 14 1 14H17C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12H1Z"
                    : "M12.7782 11.364C13.1687 11.7545 13.1687 12.3877 12.7782 12.7782C12.3877 13.1687 11.7545 13.1687 11.364 12.7782L6.53553 7.94975L1.70711 12.7782C1.31658 13.1687 0.683418 13.1687 0.292893 12.7782C-0.0976311 12.3877 -0.0976311 11.7545 0.292893 11.364L5.12132 6.53553L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L6.53553 5.12132L11.364 0.292893C11.7545 -0.0976311 12.3877 -0.0976311 12.7782 0.292893C13.1687 0.683418 13.1687 1.31658 12.7782 1.70711L7.94975 6.53553L12.7782 11.364Z"
                }
              />
            </svg>
          </button>
        </div>
      </div>
      <nav hidden={!isOpen} className="sm:flex sm:items-center">
        <div className="border-b border-gray-800 px-2 pb-5 pt-2 sm:flex sm:border-b-0 sm:py-0">
          <span>{isOpen}</span>
          <Link
            href={""}
            className="block rounded px-3 py-1 font-semibold text-white hover:bg-gray-800 sm:text-sm"
          >
            List your properties
          </Link>
          <Link
            href={""}
            className="mt-1 block rounded px-3 py-1 font-semibold text-white hover:bg-gray-800 sm:mt-0 sm:text-sm"
          >
            Trips
          </Link>
          <Link
            href={""}
            className="mt-1 block  rounded px-3 py-1 font-semibold text-white hover:bg-gray-800 sm:mt-0 sm:text-sm"
          >
            Messages
          </Link>
        </div>
        <div className=" px-5 py-3 sm:py-0">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full border-2  border-gray-600 object-cover sm:h-8 sm:w-8"
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
              alt="profile"
            />
            <span className="ml-4 text-gray-200 sm:hidden">Isla Schogar</span>
          </div>
          <div className="pt-3 sm:hidden">
            <Link
              href={""}
              className="mt-3 block text-gray-400 hover:text-white"
            >
              Account settings
            </Link>
            <Link
              href={""}
              className="mt-3 block text-gray-400 hover:text-white"
            >
              Support
            </Link>
            <Link
              href={""}
              className="mt-3 block text-gray-400 hover:text-white"
            >
              Sign out
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );

  function Toggle() {
    setIsOpen(!isOpen);
  }
}
