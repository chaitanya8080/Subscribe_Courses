import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import vg from '../../assets/images/logo.png';
import { CgGoogle, CgYoutube } from 'react-icons/cg';
import { SiCoursera, SiUdemy } from 'react-icons/si';
import { DiAws } from 'react-icons/di';
import { RiPlayFill, RiArrowRightLine } from 'react-icons/ri';
import introVideo from '../../assets/videos/bubbleSort.mp4';

const brands = [CgGoogle, CgYoutube, SiCoursera, SiUdemy, DiAws];

const Home = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-primary-400/20 blur-3xl" />
          <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        </div>

        <div className="mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center gap-12 px-6 py-20 lg:flex-row lg:justify-between">
          <div className="flex max-w-xl flex-col items-center text-center lg:items-start lg:text-left">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-4 py-1.5 text-sm font-medium text-accent-700 dark:border-accent-500/20 dark:bg-accent-500/10 dark:text-accent-400">
              🚀 Premium courses at a reasonable price
            </span>
            <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
              Learn from the{' '}
              <span className="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                experts
              </span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-gray-600 dark:text-gray-400">
              Find valuable content at a reasonable price. Stream high-quality
              courses anytime, anywhere.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start">
              <Link to="/courses">
                <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-400 to-primary-500 px-7 py-3.5 text-lg font-semibold text-white shadow-lg shadow-primary-500/25 transition hover:shadow-xl hover:shadow-primary-500/30 active:scale-95">
                  Explore Now <RiArrowRightLine />
                </button>
              </Link>
              <Link to="/subscribe">
                <button className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-7 py-3.5 text-lg font-semibold text-gray-700 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-white/5">
                  <RiPlayFill /> View Plans
                </button>
              </Link>
            </div>

            <div className="mt-10 flex gap-8">
              {[
                ['500+', 'Lectures'],
                ['50k+', 'Students'],
                ['4.8★', 'Rating'],
              ].map(([n, l]) => (
                <div key={l} className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {n}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full max-w-md justify-center">
            <img
              className="vector-grapics w-[80%] object-contain"
              src={vg}
              alt="Course Bundler"
            />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="border-y border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <p className="text-center text-sm font-semibold uppercase tracking-widest text-gray-400">
            Trusted by learners from
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 text-5xl text-gray-400">
            {brands.map((Brand, i) => (
              <Brand
                key={i}
                className="transition duration-300 hover:scale-110 hover:text-primary-500"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured video */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            See it in action
          </h2>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            A glimpse of the quality you can expect
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-black shadow-2xl dark:border-gray-800">
          <video
            controls
            controlsList="nodownload nofullscreen noremoteplayback"
            disablePictureInPicture
            disableRemotePlayback
            src={introVideo}
            className="aspect-video w-full"
          ></video>
        </div>
      </section>
    </div>
  );
};

export default Home;
