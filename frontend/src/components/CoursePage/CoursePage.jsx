import Loader from '../Layout/Loader/Loader';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import introVideo from '../../assets/videos/bubbleSort.mp4';
import { getCourseLectures } from '../../redux/actions/course';
import { useParams, Navigate } from 'react-router-dom';
import { RiPlayCircleFill } from 'react-icons/ri';
import toast from 'react-hot-toast';

const CoursePage = ({ user }) => {
  const [lectureNumber, setLectureNumber] = useState(0);

  const { lectures, loading } = useSelector(state => state.course);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCourseLectures(params.id));
  }, [params.id, dispatch]);

  if (
    user.role !== 'admin' &&
    (user.subscription === undefined || user.subscription.status !== 'active')
  ) {
    toast('Not subscribed, first subscribe to the course');
    return <Navigate to={'/subscribe'}></Navigate>;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="grid min-h-[90vh] grid-cols-1 lg:grid-cols-[1fr_22rem]">
      {lectures && lectures.length > 0 ? (
        <>
          <div className="p-4 sm:p-8">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-lg dark:border-gray-800">
              <video
                className="aspect-video w-full"
                autoPlay
                muted
                controls
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
                src={introVideo}
              ></video>
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              <span className="text-primary-500">#{lectureNumber + 1}</span>{' '}
              {lectures[lectureNumber].title}
            </h1>
            <div className="mt-4">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">
                Description
              </h2>
              <p className="mt-2 leading-relaxed text-gray-600 dark:text-gray-300">
                {lectures[lectureNumber].description}
              </p>
            </div>
          </div>

          <aside className="border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900 lg:border-l lg:border-t-0">
            <h2 className="mb-3 px-2 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Lectures
            </h2>
            <div className="flex flex-col gap-1">
              {lectures.map((element, index) => (
                <button
                  onClick={() => setLectureNumber(index)}
                  key={element._id}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    index === lectureNumber
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-500/10 dark:text-primary-400'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5'
                  }`}
                >
                  <RiPlayCircleFill
                    className={`shrink-0 text-xl ${
                      index === lectureNumber ? 'text-primary-500' : 'text-gray-400'
                    }`}
                  />
                  <span className="line-clamp-1 text-sm font-medium">
                    {index + 1}. {element.title}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </>
      ) : (
        <div className="flex min-h-[60vh] items-center justify-center">
          <p className="text-xl font-semibold text-gray-400">No Lecture Found</p>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
