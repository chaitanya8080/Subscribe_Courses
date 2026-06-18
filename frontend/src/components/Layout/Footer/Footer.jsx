import React from 'react';
import {
  TiSocialYoutubeCircular,
  TiSocialInstagramCircular,
} from 'react-icons/ti';

import { DiGithub } from 'react-icons/di';

const socials = [
  { href: 'https://youtube.com', Icon: TiSocialYoutubeCircular, label: 'YouTube' },
  { href: 'https://instagram.com', Icon: TiSocialInstagramCircular, label: 'Instagram' },
  { href: 'https://github.com', Icon: DiGithub, label: 'GitHub' },
];

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-gray-900 text-gray-300">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-primary-500 text-sm font-black text-white">
              C
            </span>
            <span className="text-lg font-bold text-white">
              Course<span className="text-primary-400">Bundler</span>
            </span>
          </div>
          <p className="text-sm text-gray-400">All Rights Reserved</p>
          <p className="text-xs font-medium text-primary-400">
            Built by @chaitanya Girase
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/5 text-3xl text-gray-300 transition hover:scale-110 hover:bg-primary-400 hover:text-gray-900"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
