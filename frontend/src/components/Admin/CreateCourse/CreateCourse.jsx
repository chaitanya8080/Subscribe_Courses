import React, { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCourse } from '../../../redux/actions/admin';
import Sidebar from '../Sidebar';

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none transition focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-400/40 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100';

const fileInputClass =
  'block w-full text-sm text-gray-600 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-violet-100 file:px-4 file:py-2 file:font-medium file:text-violet-700 hover:file:bg-violet-200 dark:text-gray-300';

const CreateCourse = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedby] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState();
  const [imagePrv, setImagePrv] = useState();

  const dispatch = useDispatch();

  const { loading, error, message } = useSelector(state => state.admin);

  const categories = [
    'web development',
    'Artificial Intelligence',
    'Date Structure and algorithm',
    'Yoga',
  ];

  const changeImageHandler = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrv(reader.result);
      setImage(file);
    };
  };

  const submitHandler = e => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append('title', title);
    myForm.append('description', description);
    myForm.append('category', category);
    myForm.append('createdBy', createdBy);
    myForm.append('file', image);

    dispatch(createCourse(myForm));
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
  }, [dispatch, error, message]);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[16rem_1fr]">
      <Sidebar />
      <main className="flex items-start justify-center px-5 py-8 sm:px-8">
        <div className="w-full max-w-xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Create Course
          </h1>

          <form
            onSubmit={submitHandler}
            className="space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              type="text"
              placeholder="Course title"
              className={inputClass}
            />

            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              className={inputClass}
            />

            <input
              value={createdBy}
              onChange={e => setCreatedby(e.target.value)}
              type="text"
              placeholder="Creator name"
              className={inputClass}
            />

            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className={inputClass}
            >
              <option value="">Select Category</option>
              {categories.map(item => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>

            <input
              accept="image/*"
              required
              id="chooseAvatar"
              type="file"
              onChange={changeImageHandler}
              className={fileInputClass}
            />

            {imagePrv && (
              <img
                src={imagePrv}
                alt="preview"
                className="h-48 w-full rounded-xl border border-gray-200 object-contain dark:border-gray-700"
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-3 font-semibold text-white shadow-md shadow-purple-500/20 transition hover:shadow-lg active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? 'Creating…' : 'Create Course'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreateCourse;
