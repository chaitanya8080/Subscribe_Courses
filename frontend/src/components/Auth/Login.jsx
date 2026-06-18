import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RiMailLine, RiLockPasswordLine } from 'react-icons/ri';
import { login } from '../../redux/actions/user';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-500 text-2xl font-black text-white">
              C
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome back
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Sign in to continue to Course Bundler
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <RiMailLine className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
                <input
                  required
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <RiLockPasswordLine className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
                <input
                  required
                  id="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgetpassword"
                className="text-sm font-medium text-gray-500 transition hover:text-primary-600 dark:text-gray-400"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-5 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          New here?{' '}
          <Link
            to="/register"
            className="font-semibold text-primary-600 transition hover:text-primary-700 dark:text-primary-400"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
