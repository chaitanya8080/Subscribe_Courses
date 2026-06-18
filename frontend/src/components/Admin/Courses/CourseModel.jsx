import React from 'react';
import { useState } from 'react';
import { RiDeleteBin7Fill, RiCloseLine, RiUploadCloud2Line } from 'react-icons/ri';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';

const fileInputClass =
  'block w-full text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-violet-100 file:px-4 file:py-2 file:font-medium file:text-violet-700 hover:file:bg-violet-200 dark:text-gray-300';

const CourseModel = ({
  isOpen,
  onClose,
  id,
  deleteButtonHandler,
  addLectureHandler,
  lectures = [1, 2, 3, 4],
  courseTitle,
  loading,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [video, setVideo] = useState();
  const [videoPrv, setVideoPrv] = useState();

  const changeVideoHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setVideoPrv(reader.result);
      setVideo(file);
    };
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setVideo('');
    setVideoPrv('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-50 dark:bg-gray-950">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/80 px-6 py-4 backdrop-blur dark:border-gray-800 dark:bg-gray-900/80">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {courseTitle}
        </h2>
        <button
          onClick={handleClose}
          aria-label="Close"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-800"
        >
          <RiCloseLine />
        </button>
      </div>

      <div className="mx-auto max-w-6xl p-6 sm:p-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {courseTitle}
              </h1>
              <p className="mt-1 font-mono text-xs text-gray-400">#{id}</p>
            </div>

            <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-400">
              Lectures
            </h2>
            <div className="space-y-3">
              {lectures.map((item, i) => (
                <VideoCard
                  key={i}
                  num={i + 1}
                  title={item.title}
                  description={item.description}
                  lectureId={item._id}
                  courseId={id}
                  deleteButtonHandler={deleteButtonHandler}
                  loading={loading}
                />
              ))}
            </div>
          </div>

          <div>
            <form
              onSubmit={e => addLectureHandler(e, id, title, description, video)}
              className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:sticky lg:top-24"
            >
              <h2 className="flex items-center gap-2 text-lg font-bold uppercase text-gray-900 dark:text-white">
                <RiUploadCloud2Line className="text-violet-500" /> Add Lecture
              </h2>
              <input
                placeholder="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputClass}
              />

              <input
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className={inputClass}
              />

              <input
                accept="image/*"
                required
                id="chooseAvatar"
                type="file"
                onChange={changeVideoHandler}
                className={fileInputClass}
              />

              {videoPrv && (
                <video
                  controlsList="nodownload"
                  controls
                  src={videoPrv}
                  className="w-full rounded-xl"
                ></video>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-md shadow-purple-500/20 transition hover:shadow-lg active:scale-[0.98]"
              >
                Upload
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModel;

function VideoCard({
  num,
  title,
  description,
  lectureId,
  courseId,
  deleteButtonHandler,
  loading,
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white">
          <span className="text-violet-500">#{num}</span> {title}
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <button
        onClick={() => deleteButtonHandler(courseId, lectureId)}
        disabled={loading}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-500 transition hover:bg-red-100 disabled:opacity-50 dark:bg-red-500/10"
      >
        <RiDeleteBin7Fill />
      </button>
    </div>
  );
}
