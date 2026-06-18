import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RiSearchLine, RiEyeLine, RiPlayCircleLine, RiAddLine } from 'react-icons/ri';
import { getAllCourses } from '../../redux/actions/course';
import { addToPlaylist } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/user';

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  description,
  creator,
  lectureCount,
  loading,
}) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-44 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
          <RiEyeLine /> {views}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>

        <div className="mt-1 flex items-center gap-2 text-xs">
          <span className="font-semibold uppercase tracking-wide text-gray-400">
            Creator
          </span>
          <span className="font-medium uppercase text-primary-600 dark:text-primary-400">
            {creator}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-3 text-xs font-medium text-gray-500 dark:text-gray-400">
          <span className="inline-flex items-center gap-1">
            <RiPlayCircleLine /> {lectureCount} Lectures
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
          <Link to={`/course/${id}`} className="flex-1">
            <button className="w-full rounded-lg bg-gradient-to-r from-primary-400 to-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:shadow-md active:scale-95">
              Watch Now
            </button>
          </Link>

          <button
            disabled={loading}
            onClick={() => addToPlaylistHandler(id)}
            title="Add to playlist"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600 disabled:opacity-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <RiAddLine />
          </button>
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const [keyword, setkeyword] = useState('');
  const [category, setCategory] = useState('');

  const dispatch = useDispatch();

  const { loading, course, error, message } = useSelector(
    state => state.course
  );

  const addToPlaylistHandler = async courseId => {
    await dispatch(addToPlaylist(courseId));
    dispatch(loadUser());
  };

  const categories = [
    'web development',
    'Artificial Intelligence',
    'Date Structure and algorithm',
    'Yoga',
  ];

  useEffect(() => {
    dispatch(getAllCourses(keyword, category));

    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [error, dispatch, keyword, category, message]);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          All Courses
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Browse our catalogue and start learning today
        </p>
      </div>

      <div className="relative mx-auto max-w-xl">
        <RiSearchLine className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
        <input
          value={keyword}
          onChange={e => setkeyword(e.target.value)}
          placeholder="Search a course…"
          type="text"
          className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-400/40 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => setCategory('')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            category === ''
              ? 'bg-accent-500 text-white shadow-md shadow-accent-500/30'
              : 'border border-gray-300 text-gray-600 hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:text-gray-300'
          }`}
        >
          All
        </button>
        {categories.map((item, index) => (
          <button
            key={index}
            onClick={() => setCategory(item)}
            className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
              category === item
                ? 'bg-accent-500 text-white shadow-md shadow-accent-500/30'
                : 'border border-gray-300 text-gray-600 hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:text-gray-300'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {course.length > 0 ? (
          course.map(item => (
            <Course
              key={item._id}
              title={item.title}
              description={item.description}
              views={item.views}
              imageSrc={item.poster.url}
              id={item._id}
              creator={item.createdBy}
              lectureCount={item.noOfVideos}
              addToPlaylistHandler={addToPlaylistHandler}
              loading={loading}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-2xl font-semibold text-gray-400">
              No courses found
            </p>
            <p className="mt-1 text-gray-400">Try a different search or category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
