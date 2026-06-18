import React from 'react';
import { RiErrorWarningFill, RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-50 text-5xl text-primary-500 dark:bg-primary-500/10">
          <RiErrorWarningFill />
        </div>
        <div>
          <h1 className="text-7xl font-black tracking-tight text-gray-900 dark:text-white">
            404
          </h1>
          <p className="mt-2 text-lg font-medium text-gray-500 dark:text-gray-400">
            Page Not Found
          </p>
        </div>
        <Link to="/">
          <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-6 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-95">
            <RiArrowLeftLine /> Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
