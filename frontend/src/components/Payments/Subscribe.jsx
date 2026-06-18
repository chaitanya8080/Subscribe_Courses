import React from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiCheckLine, RiVipCrownFill } from 'react-icons/ri';

import { buySubscription, loadUser } from '../../redux/actions/user';

const perks = [
  'Access to all premium courses',
  'Unlimited streaming, anytime',
  'New content added regularly',
  '100% refund on cancellation (7 days)',
];

const Subscribe = () => {
  const { loading, error, subscriptionId } = useSelector(
    state => state.subscription
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const subscribeHandler = async () => {
    dispatch(buySubscription());
    navigate('/profile');
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: 'clearError' });
    }
    if (subscriptionId) {
      toast.success('subscription Id generated and user subscribed');
    }
  }, [dispatch, error, subscriptionId]);

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-800 dark:bg-gray-900">
          <div className="relative bg-gradient-to-br from-primary-400 to-primary-500 px-8 py-10 text-center text-white">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/30 text-3xl">
              <RiVipCrownFill />
            </div>
            <h2 className="text-lg font-semibold uppercase tracking-widest">
              Pro Pack
            </h2>
            <p className="mt-2 text-5xl font-black">
              ₹399
              <span className="text-base font-medium opacity-80"> only</span>
            </p>
          </div>

          <div className="p-8">
            <ul className="space-y-3">
              {perks.map(perk => (
                <li
                  key={perk}
                  className="flex items-start gap-3 text-gray-700 dark:text-gray-300"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400">
                    <RiCheckLine className="text-sm" />
                  </span>
                  {perk}
                </li>
              ))}
            </ul>

            <button
              onClick={subscribeHandler}
              disabled={loading}
              className="mt-8 w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-5 py-3.5 text-lg font-semibold text-white shadow-md shadow-primary-500/25 transition hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? 'Processing…' : 'Buy Now'}
            </button>

            <p className="mt-4 text-center text-xs text-gray-400">
              Terms and conditions applied. Payment secured by Razorpay.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
