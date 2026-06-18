import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiUser3Line, RiMailLine } from 'react-icons/ri';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = ({ user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const { loading } = useSelector(state => state.profile);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async e => {
    e.preventDefault();

    await dispatch(updateProfile(name, email));
    dispatch(loadUser());
    navigate('/profile');
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl dark:border-gray-800 dark:bg-gray-900 sm:p-10">
        <h1 className="mb-8 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Update Profile
        </h1>

        <form onSubmit={submitHandler} className="space-y-5">
          <div className="relative">
            <RiUser3Line className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type="text"
              placeholder="Name"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>
          <div className="relative">
            <RiMailLine className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2.5 pl-11 pr-4 text-gray-900 placeholder-gray-400 outline-none transition focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-5 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
          >
            {loading ? 'Updating…' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
