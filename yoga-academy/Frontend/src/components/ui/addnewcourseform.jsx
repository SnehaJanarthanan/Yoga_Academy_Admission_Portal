import React, { useState } from "react";
import axios from "axios";

const AddNewCourseForm = ({ onClose, onSubmit, token }) => {
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({
      ...newCourse,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Send POST request to add new course
      const response = await axios.post(
        "http://localhost:8080/admin/add",
        {
          courseName: newCourse.title,
          courseDescription: newCourse.description,
          img_url: newCourse.imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the request headers
          },
        }
      );
      // Call onSubmit callback with the new course data
      onSubmit(response.data);
      // Reset form fields
      setNewCourse({
        title: "",
        description: "",
        imageUrl: "",
      });
      // Close the form
      onClose();
    } catch (error) {
      console.error("Error adding new course:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-content bg-white p-8 max-w-lg">
        <button
          onClick={onClose}
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
        <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
        <div className="mb-4">
          <label
            htmlFor="newTitle"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="newTitle"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newDescription"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="newDescription"
            name="description"
            value={newCourse.description}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="newImageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="newImageUrl"
            name="imageUrl"
            value={newCourse.imageUrl}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default AddNewCourseForm;
