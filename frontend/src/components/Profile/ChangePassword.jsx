import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RiLockLine, RiLockPasswordLine } from 'react-icons/ri';
import { changePassword } from '../../redux/actions/profile';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const data = useSelector(state => state.profile);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(changePassword(oldPassword, newPassword));
  };

  useEffect(() => {
    if (data.error) {
      toast.error(data?.error?.message);
      dispatch({ type: 'clearError' });
    }
    if (data.message) {
      toast.success(data.message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, data.error, data.message]);

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        <h1 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Change Password
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="relative">
            <RiLockLine className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
            <input
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              type="password"
              placeholder="Old password"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <div className="relative">
            <RiLockPasswordLine className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
            <input
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              type="password"
              placeholder="New password"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={data.loading}
            className="w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-5 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
          >
            {data.loading ? 'Changing…' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
