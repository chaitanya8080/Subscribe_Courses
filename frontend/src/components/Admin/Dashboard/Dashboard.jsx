import React from 'react';
import { useEffect } from 'react';
import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiEyeLine,
  RiUser3Line,
  RiVipCrownLine,
} from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { getDashboardStats } from '../../../redux/actions/admin';
import Sidebar from '../Sidebar';
import { LineChart, DoughnutChart } from './Chart';
import Loader from '../../Layout/Loader/Loader';

const Databox = ({ title, qty, qtyPercentage, profit, Icon }) => (
  <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
    <div className="flex items-center justify-between">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
        <Icon />
      </span>
      <span
        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
          profit
            ? 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400'
            : 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
        }`}
      >
        {profit ? <RiArrowUpLine /> : <RiArrowDownLine />}
        {qtyPercentage}%
      </span>
    </div>
    <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">{qty}</p>
    <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
      {title}
    </p>
    <p className="mt-0.5 text-xs text-gray-400">since last month</p>
  </div>
);

const Bar = ({ title, value, profit }) => {
  return (
    <div className="py-3">
      <div className="mb-1.5 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {title}
        </h3>
        <span className="text-xs font-medium text-gray-400">
          {profit ? '0%' : `-${value}%`}
        </span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all"
          style={{ width: `${Math.min(profit ? value : 0, 100)}%` }}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();

  const {
    loading,
    stats,
    viewsCount,
    SubscriptionCount,
    usersCount,
    usersPercentage,
    subscriptionPercentage,
    viewsPercentage,
    usersProfit,
    subscriptionProfit,
    viewsProfit,
  } = useSelector(state => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[16rem_1fr]">
      <Sidebar />
      {loading || !stats ? (
        <Loader />
      ) : (
        <main className="px-5 py-8 sm:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-400">
              {`Last change was on ${
                String(new Date(stats[11].createdAt)).split('G')[0]
              }`}
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row">
            <Databox
              title="Views"
              qty={viewsCount}
              qtyPercentage={viewsPercentage}
              profit={viewsProfit}
              Icon={RiEyeLine}
            />
            <Databox
              title="Users"
              qty={usersCount}
              qtyPercentage={usersPercentage}
              profit={usersProfit}
              Icon={RiUser3Line}
            />
            <Databox
              title="Subscriptions"
              qty={SubscriptionCount}
              qtyPercentage={subscriptionPercentage}
              profit={subscriptionProfit}
              Icon={RiVipCrownLine}
            />
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
              Views Graph
            </h2>
            <LineChart views={stats.map(item => item.views)} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                Progress
              </h2>
              <Bar title="Views" value={viewsPercentage} profit={viewsProfit} />
              <Bar title="Users" value={usersPercentage} profit={usersProfit} />
              <Bar
                title="Subscription"
                value={subscriptionPercentage}
                profit={subscriptionProfit}
              />
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <h2 className="mb-4 text-center text-lg font-bold text-gray-900 dark:text-white">
                Users
              </h2>
              <DoughnutChart
                users={[SubscriptionCount, usersCount - SubscriptionCount]}
              />
            </div>
          </div>
        </main>
      )}
    </div>
  );
};

export default Dashboard;
