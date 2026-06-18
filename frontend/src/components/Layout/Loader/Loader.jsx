import React from 'react';

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative h-20 w-20">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary-400/20 border-t-primary-400" />
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-accent-500/20 border-b-accent-500 [animation-direction:reverse]" />
      </div>
    </div>
  );
};

export default Loader;
