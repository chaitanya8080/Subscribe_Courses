import React from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RiExchangeLine, RiDeleteBin6Line } from 'react-icons/ri';
import {
  deleteUser,
  getAllUsers,
  updateUserRole,
} from '../../../redux/actions/admin';
import Loader from '../../Layout/Loader/Loader';

import Sidebar from '../Sidebar';

const Users = () => {
  const { users, loading, error, message } = useSelector(state => state.admin);

  const dispatch = useDispatch();

  const updateHandler = userId => {
    dispatch(updateUserRole(userId));
  };

  const deleteButtonHandler = userId => {
    dispatch(deleteUser(userId));
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[16rem_1fr]">
      <Sidebar />
      {loading ? (
        <Loader />
      ) : (
        <main className="px-5 py-8 sm:px-8">
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            All Users
          </h1>

          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                  <tr>
                    <th className="px-5 py-3.5 font-semibold">Id</th>
                    <th className="px-5 py-3.5 font-semibold">Name</th>
                    <th className="px-5 py-3.5 font-semibold">Email</th>
                    <th className="px-5 py-3.5 font-semibold">Role</th>
                    <th className="px-5 py-3.5 font-semibold">Subscription</th>
                    <th className="px-5 py-3.5 text-right font-semibold">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {users &&
                    users.map(item => (
                      <Row
                        updateHandler={updateHandler}
                        deleteButtonHandler={deleteButtonHandler}
                        item={item}
                        key={item._id}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler }) {
  const isActive = item.subscription && item.subscription.status === 'active';
  return (
    <tr className="text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/40">
      <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{item._id}</td>
      <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">
        {item.name}
      </td>
      <td className="px-5 py-3.5">{item.email}</td>
      <td className="px-5 py-3.5">
        <span
          className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${
            item.role === 'admin'
              ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400'
              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'
          }`}
        >
          {item.role}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium ${
            isActive ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
            }`}
          />
          {isActive ? 'Active' : 'Not active'}
        </span>
      </td>
      <td className="px-5 py-3.5">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => updateHandler(item._id)}
            title="Change role"
            className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 px-3 py-1.5 text-xs font-medium text-violet-600 transition hover:bg-violet-50 dark:border-violet-500/30 dark:hover:bg-violet-500/10"
          >
            <RiExchangeLine /> Change Role
          </button>
          <button
            onClick={() => deleteButtonHandler(item._id)}
            title="Delete user"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 dark:bg-red-500/10"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </td>
    </tr>
  );
}
