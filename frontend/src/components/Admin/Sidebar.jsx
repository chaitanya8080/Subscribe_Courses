import React from 'react';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { Icon: RiDashboardFill, text: 'Dashboard', url: 'dashboard' },
  { Icon: RiAddCircleFill, text: 'Create Course', url: 'createcourse' },
  { Icon: RiEyeFill, text: 'Courses', url: 'courses' },
  { Icon: RiUser3Fill, text: 'Users', url: 'users' },
];

const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="border-b border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
      <div className="mb-6 hidden items-center gap-2 px-3 pt-4 lg:flex">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-sm font-black text-white">
          A
        </span>
        <span className="font-bold tracking-tight text-gray-900 dark:text-white">
          Admin Panel
        </span>
      </div>
      <nav className="flex flex-row gap-1 overflow-x-auto lg:flex-col">
        {links.map(({ Icon, text, url }) => (
          <LinkButton
            key={url}
            Icon={Icon}
            text={text}
            url={url}
            active={location.pathname === `/admin/${url}`}
          />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`} className="shrink-0">
      <span
        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
          active
            ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-md shadow-purple-500/20'
            : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 dark:text-gray-300 dark:hover:bg-white/5'
        }`}
      >
        <Icon className="text-lg" />
        {text}
      </span>
    </Link>
  );
}
