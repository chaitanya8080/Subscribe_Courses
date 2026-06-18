import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RiEyeLine, RiDeleteBin6Line } from 'react-icons/ri';
import {
  addLecture,
  deleteCourse,
  deleteLecture,
} from '../../../redux/actions/admin';
import {
  getAllCourses,
  getCourseLectures,
} from '../../../redux/actions/course';

import Sidebar from '../Sidebar';
import CourseModel from './CourseModel';

const AdminCourses = () => {
  const dispatch = useDispatch();

  const { course, lectures } = useSelector(state => state.course);

  const { loading, error, message } = useSelector(state => state.admin);

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const [courseIdfordelete, setCourseId] = useState('');
  const [courseTitle, setCourseTitle] = useState('');

  const courseDetailsHandler = (courseId, title) => {
    dispatch(getCourseLectures(courseId));
    onOpen();
    setCourseId(courseId);
    setCourseTitle(title);
  };

  const deleteButtonHandler = courseId => {
    dispatch(deleteCourse(courseId));
  };

  const deleteLectureButtonHandler = async (courseId, lectureId) => {
    await dispatch(deleteLecture(courseId, lectureId));
    dispatch(getCourseLectures(courseId));
  };

  const addLectureHandler = async (e, courseId, title, description, video) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('file', video);
    await dispatch(addLecture(courseId, myForm));
    dispatch(getCourseLectures(courseId));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllCourses());
  }, [dispatch, error, message]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[16rem_1fr]">
      <Sidebar />
      <main className="px-5 py-8 sm:px-8">
        <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          All Courses
        </h1>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-800/50 dark:text-gray-400">
                <tr>
                  <th className="px-5 py-3.5 font-semibold">Id</th>
                  <th className="px-5 py-3.5 font-semibold">Poster</th>
                  <th className="px-5 py-3.5 font-semibold">Title</th>
                  <th className="px-5 py-3.5 font-semibold">Category</th>
                  <th className="px-5 py-3.5 font-semibold">Creator</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Views</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Lectures</th>
                  <th className="px-5 py-3.5 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {course.map(item => (
                  <Row
                    courseDetailsHandler={courseDetailsHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    loading={loading}
                    item={item}
                    key={item._id}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <CourseModel
          isOpen={isOpen}
          onClose={onClose}
          lectures={lectures}
          id={courseIdfordelete}
          courseTitle={courseTitle}
          deleteButtonHandler={deleteLectureButtonHandler}
          addLectureHandler={addLectureHandler}
          loading={loading}
        />
      </main>
    </div>
  );
};

function Row({ item, courseDetailsHandler, deleteButtonHandler, loading }) {
  return (
    <tr className="text-gray-700 transition hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/40">
      <td className="px-5 py-3.5 font-mono text-xs text-gray-400">{item._id}</td>
      <td className="px-5 py-3.5">
        <img
          src={item.poster.url}
          alt={item.title}
          className="h-12 w-20 rounded-lg object-cover"
        />
      </td>
      <td className="px-5 py-3.5 font-medium text-gray-900 dark:text-white">
        {item.title}
      </td>
      <td className="px-5 py-3.5">
        <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium uppercase text-gray-600 dark:bg-gray-800 dark:text-gray-300">
          {item.category}
        </span>
      </td>
      <td className="px-5 py-3.5">{item.createdBy}</td>
      <td className="px-5 py-3.5 text-right">{item.views}</td>
      <td className="px-5 py-3.5 text-right">{item.noOfVideos}</td>
      <td className="px-5 py-3.5">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => courseDetailsHandler(item._id, item.title)}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 px-3 py-1.5 text-xs font-medium text-violet-600 transition hover:bg-violet-50 disabled:opacity-50 dark:border-violet-500/30 dark:hover:bg-violet-500/10"
          >
            <RiEyeLine /> Lectures
          </button>
          <button
            onClick={() => deleteButtonHandler(item._id)}
            disabled={loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-500/10"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default AdminCourses;
