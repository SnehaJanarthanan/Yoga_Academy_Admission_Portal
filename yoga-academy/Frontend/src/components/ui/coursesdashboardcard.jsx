import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseDashboardCard = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCourses();
  }, [token]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/get/course",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      const coursesData = response.data.map((course) => ({
        id: course.courseId,
        imageUrl: course.img_url,
        title: course.courseName,
        description: course.courseDescription,
      }));
      setCourses(coursesData);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  const handleEdit = (course) => {
    setEditingCourse(course);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter((course) => course.id !== id));
      console.log("Course deleted successfully");
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleFormClose = () => {
    setEditingCourse(null);
    setShowAddForm(false);
  };

  const handleSubmit = async (formData, isEditing) => {
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:8080/admin/update/${formData.id}`,
          {
            courseName: formData.title,
            courseDescription: formData.description,
            img_url: formData.imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses((prevCourses) =>
          prevCourses.map((course) =>
            course.id === formData.id ? formData : course
          )
        );
        console.log("Course updated successfully");
      } else {
        const response = await axios.post(
          "http://localhost:8080/admin/add",
          {
            courseName: formData.title,
            courseDescription: formData.description,
            img_url: formData.imageUrl,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourses((prevCourses) => [...prevCourses, response.data]);
        fetchCourses();
        console.log("New course added successfully");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    handleFormClose();
  };

  const handleAddNewCourse = () => {
    setShowAddForm(true);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <button
          onClick={handleAddNewCourse}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Course
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.courseId} className="w-full">
              <div className="flex flex-col items-center bg-white rounded-xl shadow-cla-blue border border-black overflow-hidden">
                <img
                  className="h-64 w-full object-cover object-center"
                  src={course.imageUrl}
                  alt="blog"
                />
                <div className="p-6 flex flex-col items-center">
                  <h1 className="title-font text-lg font-medium text-black mb-3 text-center">
                    {course.title}
                  </h1>
                  <p className="leading-relaxed mb-3 text-black text-center">
                    {course.description}
                  </p>
                  <div className="flex justify-between w-full">
                    <button
                      onClick={() => handleEdit(course)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {editingCourse && (
        <EditForm
          course={editingCourse}
          onClose={handleFormClose}
          onSubmit={(formData) => handleSubmit(formData, true)}
        />
      )}
      {showAddForm && (
        <AddNewCourseForm
          onClose={handleFormClose}
          onSubmit={(formData) => handleSubmit(formData, false)}
          token={token}
        />
      )}
    </section>
  );
};

const EditForm = ({ course, onClose, onSubmit }) => {
  const [editedCourse, setEditedCourse] = useState({
    id: course.id,
    title: course.title,
    description: course.description,
    imageUrl: course.imageUrl,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
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
        <h2 className="text-2xl font-bold mb-4">Edit Course</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedCourse.title}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={editedCourse.description}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={editedCourse.imageUrl}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={() => onSubmit(editedCourse)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

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
          onClick={() => onSubmit(newCourse)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default CourseDashboardCard;
