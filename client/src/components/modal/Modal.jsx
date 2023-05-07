import React from 'react';

export default function Modal({ isOpen, onClose, height, width, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='relative flex items-center justify-center min-h-screen'>
        <div
          className='fixed inset-0 bg-transparent backdrop-blur-sm transition-opacity'
          aria-hidden='true'
          onClick={onClose}
        />
        <div className={`relative bg-slate-400 rounded-lg z-50 max-w-md ${width} ${height} p-6`}>
            <button className='text-gray-700 absolute z-50 right-0 top-0 m-2 hover:text-black hover:scale-95 duration-200' onClick={onClose} id='close'>
                <svg className='' width="40" height="40" fill="white" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Z"></path>
                    <path d="m14.829 9.172-5.657 5.657"></path>
                    <path d="m9.172 9.172 5.656 5.657"></path>
                </svg>
            </button>
          <div className='absolute inset-0 z-40 h-full'>{children}</div>
        </div>
      </div>
    </div>
  );
}