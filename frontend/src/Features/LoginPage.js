// LoginPage.js
import React from 'react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">Your Logo</h1> {/* Replace with actual logo */}
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <div className="px-5 py-7">
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Username</label>
            <input type="text" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            
            <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
            <input type="password" className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
            
            <button type="button" className="transition duration-200 bg-customColor hover:bg-secondaryColor text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
              <span className="inline-block mr-2">Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </button>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <span className="inline-block ml-1">Forgot Password?</span>
                </button>
              </div>
              <div className="text-center sm:text-right  whitespace-nowrap">
                <button className="transition duration-200 mx-5 px-5 py-4 font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                  <span className="inline-block ml-1">Sign Up</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
