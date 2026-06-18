import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiUser3Line, RiMailLine } from 'react-icons/ri';
import { courseRequest } from '../../redux/actions/others';

const Request = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(state => state.other);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(courseRequest(name, email, course));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  const inputClass =
    'w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Request New Course
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Tell us what you'd like to learn next
          </p>
        </div>

        <form className="space-y-5" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <div className="relative">
              <RiUser3Line className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
              <input
                required
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
                placeholder="Your name"
                className={inputClass}
              />
            </div>
          </div>

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
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="course"
              className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Course Details
            </label>
            <textarea
              required
              id="course"
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="Explain about the course…"
              rows={4}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-5 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send Request'}
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            See available courses?{' '}
            <Link
              to="/courses"
              className="font-semibold text-primary-600 transition hover:text-primary-700 dark:text-primary-400"
            >
              Click here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Request;
