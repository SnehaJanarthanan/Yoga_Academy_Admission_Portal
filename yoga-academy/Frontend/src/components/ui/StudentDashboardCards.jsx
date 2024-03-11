import React, { useState, useEffect } from "react";
import axios from "axios";

const InstituteDashboardCard = () => {
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [showRegisterPopup, setShowRegisterPopup] = useState(false); // State to control the registration popup
  const [formData, setFormData] = useState({
    studentId: "", // Add studentId to formData
    studentName: "",
    studentDOB: "",
    address: "",
    mobile: "",
    age: "",
  });
  const [courses, setCourses] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchInstitutes();
  }, [token]);

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/admin/get/institute",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInstitutes(response.data);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };

  const handleDisplayRegisterForm = () => {
    setShowRegisterPopup(true); // Open the registration popup
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/user/add/student",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Student data saved:", response.data);
      // Update formData with the received student ID
      setFormData({ ...formData, studentId: response.data.studentId });
      // Close the registration popup after submission
      setShowRegisterPopup(false);
      // Fetch courses for the selected institute
      if (selectedInstitute) {
        fetchCourses(selectedInstitute.instituteId);
      }
    } catch (error) {
      console.error("Error saving student data:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchCourses = async (instituteId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/admin/get/${instituteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleDisplayCourses = (institute) => {
    setSelectedInstitute(institute);
    setShowRegisterPopup(true);
  };

  const handleJoinCourse = async (course) => {
    try {
      if (!selectedInstitute) {
        console.error("No institute selected");
        return;
      }
      const response = await axios.post(
        `http://localhost:8080/user/${formData.studentId}/institution/${selectedInstitute.instituteId}/course/${course.courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Student joined course:", response.data);
      // Optionally, you can perform further actions after successfully joining the course
    } catch (error) {
      console.error("Error joining course:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {institutes.map((institute) => (
            <div key={institute.instituteId} className="w-full">
              <div className="flex flex-col items-center bg-white rounded-xl shadow-cla-blue border border-black overflow-hidden">
                <div className="p-6 flex flex-col items-center">
                  <h1 className="title-font text-lg font-medium text-black mb-3 text-center">
                    {institute.instituteName}
                  </h1>
                  <p className="leading-relaxed mb-3 text-black text-center">
                    {institute.instituteDescription}
                  </p>
                  <button
                    onClick={() => handleDisplayCourses(institute)}
                    className="text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded text-lg"
                  >
                    Register & Display Courses
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Registration Popup */}
      {showRegisterPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg relative">
            <h2 className="text-lg font-bold mb-4">Register Now</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="studentName"
                placeholder="Student Name"
                value={formData.studentName}
                onChange={handleChange}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="date"
                name="studentDOB"
                value={formData.studentDOB}
                onChange={handleChange}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mb-4 p-2 border rounded"
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="mb-4 p-2 border rounded"
              />
              <button
                type="submit"
                className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
              >
                Submit
              </button>
            </form>
            <button
              onClick={() => setShowRegisterPopup(false)}
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
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
          </div>
        </div>
      )}
      {/* Display Courses Modal */}
      {courses.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg relative">
            <h2 className="text-lg font-bold mb-4">
              Courses offered by {selectedInstitute?.instituteName}
            </h2>
            <ul>
              {courses.map((course) => (
                <li
                  key={course.courseId}
                  className="flex justify-between items-center mb-2"
                >
                  <span>{course.courseName}</span>
                  <button
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                    onClick={() => handleJoinCourse(course)}
                  >
                    Join Now
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowRegisterPopup(false)}
              className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800"
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
          </div>
        </div>
      )}
    </section>
  );
};

export default InstituteDashboardCard;
