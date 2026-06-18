import React from 'react';
import { RiCheckboxCircleFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white text-center shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 px-8 py-10 text-white">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-white/25 text-4xl">
            <RiCheckboxCircleFill />
          </div>
          <h1 className="text-2xl font-bold">Payment Successful</h1>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            You now have Pro Pack 🎉
          </h2>
          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Congratulations, you're a pro member. You have full access to all
            premium content.
          </p>

          <Link to="/profile">
            <button className="mt-8 w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-5 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-[0.98]">
              Go to Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
