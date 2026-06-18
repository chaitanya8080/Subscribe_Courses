import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  RiDeleteBin7Fill,
  RiCameraLine,
  RiMailLine,
  RiUser3Line,
  RiCalendarLine,
  RiVipCrownLine,
  RiEditLine,
  RiLockLine,
  RiCloseLine,
} from 'react-icons/ri';
import {
  removeFromPlaylist,
  updateProfilePicture,
} from '../../redux/actions/profile';
import { useDispatch, useSelector } from 'react-redux';
import { cancelSubscription, loadUser } from '../../redux/actions/user';
import toast from 'react-hot-toast';

const fileInputClass =
  'block w-full text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-primary-100 file:px-4 file:py-2 file:font-medium file:text-primary-700 hover:file:bg-primary-200 dark:text-gray-300';

const InfoRow = ({ Icon, label, children }) => (
  <div className="flex items-center gap-3 border-b border-gray-100 py-3 last:border-0 dark:border-gray-800">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-gray-800">
      <Icon />
    </span>
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <div className="font-semibold text-gray-900 dark:text-white">
        {children}
      </div>
    </div>
  </div>
);

const Profile = ({ user }) => {
  const dispatch = useDispatch();

  const { loading, message, error } = useSelector(state => state.profile);

  const {
    loading: subLoading,
    message: subMessage,
    error: subError,
  } = useSelector(state => state.subscription);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    if (subError) {
      toast.error('Your time of 7 days of subscription cancelation is over');
      dispatch({ type: 'clearError' });
    }
    if (subMessage) {
      toast.success(subMessage);
      dispatch({ type: 'clearMessage' });
      dispatch(loadUser());
    }
  }, [dispatch, error, message, subError, subMessage]);

  const removeFromPlayListHandler = async id => {
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('file', image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const cancelSubscriptionHandler = () => {
    dispatch(cancelSubscription());
  };

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        My Profile
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[18rem_1fr]">
        {/* Avatar card */}
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="relative">
            <img
              src={user.avatar?.url}
              alt={user.name}
              className="h-40 w-40 rounded-full border-4 border-primary-100 bg-gray-200 object-cover dark:border-gray-800 dark:bg-gray-800"
            />
            <span className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {user.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.role === 'admin' ? 'Administrator' : 'Member'}
            </p>
          </div>
          <button
            onClick={onOpen}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-4 py-2.5 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-95"
          >
            <RiCameraLine /> Change Photo
          </button>
        </div>

        {/* Details card */}
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <InfoRow Icon={RiUser3Line} label="Name">
            {user.name}
          </InfoRow>
          <InfoRow Icon={RiMailLine} label="Email">
            {user.email}
          </InfoRow>
          <InfoRow Icon={RiCalendarLine} label="Joined On">
            {user.createdAt.split('T')[0]}
          </InfoRow>

          {user.role !== 'admin' && (
            <InfoRow Icon={RiVipCrownLine} label="Subscription">
              {user.subscription && user.subscription.status === 'active' ? (
                <button
                  onClick={cancelSubscriptionHandler}
                  disabled={subLoading}
                  className="rounded-lg bg-red-50 px-3 py-1 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-500/10"
                >
                  Cancel Subscription
                </button>
              ) : (
                <Link to="/subscribe">
                  <button className="rounded-lg bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700 transition hover:bg-primary-100 dark:bg-primary-500/10 dark:text-primary-400">
                    Subscribe Now
                  </button>
                </Link>
              )}
            </InfoRow>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to="/updateprofile" className="flex-1">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 font-semibold text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/5">
                <RiEditLine /> Update Profile
              </button>
            </Link>
            <Link to="/changepassword" className="flex-1">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 font-semibold text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/5">
                <RiLockLine /> Change Password
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          My Playlist
        </h2>
        {user.playlist.length > 0 ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {user.playlist.map(element => (
              <div
                key={element.course}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900"
              >
                <img
                  className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                  src={element.poster}
                  alt="poster"
                />
                <div className="flex items-center gap-2 p-3">
                  <Link to={`/course/${element.course}`} className="flex-1">
                    <button className="w-full rounded-lg bg-gradient-to-r from-primary-400 to-primary-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:shadow-md active:scale-95">
                      Watch
                    </button>
                  </Link>
                  <button
                    onClick={() => removeFromPlayListHandler(element.course)}
                    disabled={loading}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-red-500 transition hover:bg-red-50 disabled:opacity-50 dark:border-gray-700 dark:hover:bg-red-500/10"
                  >
                    <RiDeleteBin7Fill />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
            <p className="text-gray-400">Your playlist is empty.</p>
            <Link
              to="/courses"
              className="mt-2 inline-block font-semibold text-primary-600 hover:text-primary-700 dark:text-primary-400"
            >
              Browse courses →
            </Link>
          </div>
        )}
      </div>

      <ChangePhotoBox
        isOpen={isOpen}
        onClose={onClose}
        changeImageSubmitHandler={changeImageSubmitHandler}
        loading={loading}
      />
    </div>
  );
};

export default Profile;

function ChangePhotoBox({ isOpen, onClose, changeImageSubmitHandler, loading }) {
  const [imagePrv, setImagePrv] = useState('');
  const [image, setImage] = useState('');

  const changeImage = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrv(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrv('');
    setImage('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        onClick={closeHandler}
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Change Photo
          </h3>
          <button
            onClick={closeHandler}
            aria-label="Close"
            className="rounded-lg p-1.5 text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
          >
            <RiCloseLine />
          </button>
        </div>

        <form onSubmit={e => changeImageSubmitHandler(e, image)}>
          <div className="flex flex-col items-center gap-6">
            <img
              src={imagePrv || undefined}
              alt="preview"
              className={`h-40 w-40 rounded-full border-4 border-primary-100 object-cover dark:border-gray-800 ${
                imagePrv ? 'bg-gray-200' : 'bg-gray-100 dark:bg-gray-800'
              }`}
            />
            <input type="file" onChange={changeImage} className={fileInputClass} />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-4 py-2.5 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-95 disabled:opacity-50"
            >
              {loading ? 'Uploading…' : 'Change'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
