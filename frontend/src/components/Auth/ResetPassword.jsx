import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { RiLockPasswordLine } from 'react-icons/ri';
import { resetPassword } from '../../redux/actions/profile';

const ResetPassword = () => {
  const [password, setPassword] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const { loading, message, error } = useSelector(state => state.profile);

  const dispatch = useDispatch();
  const submitHandler = e => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });

      navigate('/login');
    }
  }, [dispatch, error, message, navigate]);

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Reset Password
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Choose a new password for your account
            </p>
          </div>

          <form onSubmit={submitHandler} className="space-y-5">
            <div className="relative">
              <RiLockPasswordLine className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
              <input
                required
                id="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder="New password"
                className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-5 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
