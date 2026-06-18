import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ColorModeSwitcher } from '../../../ColorModeSwitcher';

import {
  RiDashboardFill,
  RiLogoutBoxLine,
  RiMenu5Fill,
  RiCloseLine,
  RiHome5Line,
  RiStackLine,
  RiAddBoxLine,
  RiCustomerService2Line,
  RiInformationLine,
  RiUser3Line,
} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/actions/user';

const LinkButton = ({ url = '/', title = 'Home', Icon, onClose }) => (
  <Link onClick={onClose} to={url} className="w-full">
    <span className="group flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium text-gray-700 transition hover:bg-primary-50 hover:text-primary-700 dark:text-gray-200 dark:hover:bg-white/5 dark:hover:text-primary-400">
      {Icon && (
        <Icon className="text-lg text-gray-400 transition group-hover:text-primary-500" />
      )}
      {title}
    </span>
  </Link>
);

const Header = ({ isAuthenticated = false, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    onClose();
    dispatch(logout());
  };

  return (
    <>
      <ColorModeSwitcher />

      <button
        type="button"
        onClick={onOpen}
        aria-label="Open menu"
        className="fixed top-5 left-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-500 text-xl text-white shadow-lg shadow-primary-500/30 transition hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <RiMenu5Fill />
      </button>

      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-80 max-w-[85vw] transform flex-col border-r border-gray-200 bg-white shadow-2xl transition-transform duration-300 ease-out dark:border-gray-800 dark:bg-gray-900 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <Link onClick={onClose} to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-500 text-lg font-black text-white">
              C
            </span>
            <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              Course<span className="text-primary-500">Bundler</span>
            </span>
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-1.5 text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          >
            <RiCloseLine />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          <LinkButton onClose={onClose} url="/" title="Home" Icon={RiHome5Line} />
          <LinkButton
            onClose={onClose}
            url="/courses"
            title="Browse All Courses"
            Icon={RiStackLine}
          />
          <LinkButton
            onClose={onClose}
            url="/request"
            title="Request Course"
            Icon={RiAddBoxLine}
          />
          <LinkButton
            onClose={onClose}
            url="/contact"
            title="Contact Us"
            Icon={RiCustomerService2Line}
          />
          <LinkButton
            onClose={onClose}
            url="/about"
            title="About"
            Icon={RiInformationLine}
          />
        </nav>

        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          {isAuthenticated ? (
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Link onClick={onClose} to="/profile" className="flex-1">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/5">
                    <RiUser3Line /> Profile
                  </button>
                </Link>
                <button
                  onClick={logoutHandler}
                  className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:border-red-300 hover:bg-red-50 dark:border-gray-700 dark:hover:bg-red-500/10"
                >
                  <RiLogoutBoxLine /> Logout
                </button>
              </div>

              {user && user.role === 'admin' && (
                <Link onClick={onClose} to="/admin/dashboard">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-500/20 transition hover:shadow-lg active:scale-95">
                    <RiDashboardFill /> Admin Dashboard
                  </button>
                </Link>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link onClick={onClose} to="/login" className="flex-1">
                <button className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/5">
                  Login
                </button>
              </Link>
              <Link onClick={onClose} to="/register" className="flex-1">
                <button className="w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-95">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Header;
