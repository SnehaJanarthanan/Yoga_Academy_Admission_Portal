import React from "react";

function Modal({ showModal, closeModal, imageUrl, title, description }) {
  return (
    <div
      className={`modal ${
        showModal ? "flex" : "hidden"
      } fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 items-center justify-center`}
    >
      <div className="modal-content bg-white p-8 max-w-lg relative backdrop-filter backdrop-blur-lg overflow-y-auto">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <img className="mb-4 w-full object-cover" src={imageUrl} alt={title} />
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-800">{description}</p>
      </div>
    </div>
  );
}

export default Modal;
