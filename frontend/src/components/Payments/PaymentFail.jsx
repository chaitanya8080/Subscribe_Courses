import React from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentFail = () => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white text-center shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <div className="bg-gradient-to-br from-red-400 to-rose-500 px-8 py-10 text-white">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-4xl">
            <RiCloseCircleFill />
          </div>
          <h1 className="text-2xl font-bold uppercase">Payment Failed</h1>
        </div>

        <div className="p-8">
          <p className="text-gray-500 dark:text-gray-400">
            Something went wrong with your payment. Please try again.
          </p>

          <Link to="/subscribe">
            <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-5 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-[0.98]">
              Try Again
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFail;
