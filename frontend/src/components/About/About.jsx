import React from 'react';
import { Link } from 'react-router-dom';
import introVideo from '../../assets/videos/bubbleSort.mp4';

import termsAndConditon from '../../../src/assets/docs/termsAndCondition';

import { RiSecurePaymentFill } from 'react-icons/ri';

const Founder = () => (
  <div className="flex flex-col items-center gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:flex-row sm:items-center">
    <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-500 text-5xl font-black text-white">
      C
    </div>
    <div className="text-center sm:text-left">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary-600 dark:text-primary-400">
        Co-founder
      </span>
      <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
        Chaitanya Girase
      </h2>
      <p className="mt-2 max-w-md text-gray-500 dark:text-gray-400">
        Hi, I am a Full Stack Developer and Teacher. Our mission is to create
        quality content at a reasonable price.
      </p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
          About Us
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          A video streaming platform with premium courses
        </p>
      </div>

      <Founder />

      <div className="my-8 flex flex-col items-center justify-between gap-4 rounded-3xl border border-primary-200 bg-primary-50 p-8 dark:border-primary-500/20 dark:bg-primary-500/5 sm:flex-row">
        <p className="text-center text-gray-700 dark:text-gray-300 sm:text-left">
          We are a video streaming platform with premium courses available only
          for subscribed members.
        </p>
        <Link to="/subscribe" className="shrink-0">
          <button className="rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-6 py-3 font-semibold text-white shadow-md shadow-primary-500/20 transition hover:shadow-lg active:scale-95">
            Checkout Our Plan
          </button>
        </Link>
      </div>

      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-black shadow-lg dark:border-gray-800">
        <video
          autoPlay
          muted
          controls
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          src={introVideo}
          className="aspect-video w-full"
        ></video>
      </div>

      <div className="mt-8 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Terms &amp; Conditions
        </h2>
        <div className="mt-4 max-h-80 overflow-y-auto pr-2 text-sm leading-relaxed tracking-wide text-gray-600 dark:text-gray-400">
          <p>{termsAndConditon.data}</p>
          <p className="mt-4 font-semibold text-gray-900 dark:text-white">
            Refund is available for cancellation within 7 days.
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        <RiSecurePaymentFill className="text-lg text-green-500" />
        Payment is secured by Razorpay
      </div>
    </div>
  );
};

export default About;
