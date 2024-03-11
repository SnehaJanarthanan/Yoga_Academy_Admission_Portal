import React, { useState, useEffect } from "react";
import axios from "axios";

const UserProfile = () => {
  const [courses, setCourses] = useState([]);
  const cour = 25;

  const ProfileImage =
    "https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  // Placeholder images should be imported or provided as URLs
  const placeholderImages = [
    "https://images.unsplash.com/photo-1593164842264-854604db2260?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1545389336-cf090694435e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1561049501-e1f96bdd98fd?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const getPlaceholderImage = () => {
    // Generate a random index to select a placeholder image from the array
    const randomIndex = Math.floor(Math.random() * placeholderImages.length);
    return placeholderImages[randomIndex];
  };

  useEffect(() => {
    const fetchStudentCourses = async () => {
      try {
        // Make an API call to fetch the student courses using the user ID
        const response = await axios.get(
          `http://localhost:8080/user/student/${cour}`
        );
        console.log(response.data);
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching student courses:", error);
      }
    };

    // Fetch courses when the component mounts
    fetchStudentCourses();
  }, []); // Empty dependency array ensures this effect runs only once, equivalent to componentDidMount

  return (
    <div className="p-4 md:p-16">
      <div className="p-4 md:p-8 bg-white shadow mt-8 md:mt-24">
        {/* Profile section */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Left empty for layout purposes */}
          <div className="hidden md:block md:col-span-1"></div>
          <div className="md:col-span-1 flex justify-center items-center">
            {/* Profile image */}
            <div className="relative">
              <img
                src={ProfileImage}
                alt="Profile"
                className="w-32 h-32 md:w-48 md:h-48 bg-indigo-100 rounded-full shadow-2xl flex items-center justify-center text-indigo-500"
              />
            </div>
          </div>
          {/* Right empty for layout purposes */}
          <div className="hidden md:block md:col-span-1"></div>
        </div>

        {/* Profile details */}
        <div className="mt-8 md:mt-20 text-center border-b pb-6 md:pb-12">
          <h1 className="text-2xl md:text-4xl font-medium text-gray-700">
            Jessica Jones, <span className="font-light text-gray-500">27</span>
          </h1>
          <p className="font-light text-gray-600 mt-1 md:mt-3">
            Bucharest, Romania
          </p>

          <p className="mt-4 md:mt-8 text-gray-500">
            Solution Manager - Creative Tim Officer
          </p>
          <p className="mt-1 md:mt-2 text-gray-500">
            University of Computer Science
          </p>
        </div>

        {/* Courses section */}
        <div className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-4">
            Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Render courses only if they exist */}
            {courses.length > 0 &&
              courses.map((course, index) => (
                <div
                  key={index} // Use a unique key for each course
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={getPlaceholderImage()}
                    alt={course.courseName} // Assuming courseName is the title of the course
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {course.courseName}
                    </h3>
                    <p className="text-gray-600">{course.courseDescription}</p>
                    <button className="text-indigo-500 py-1 px-2 font-medium mt-2">
                      Enrolled
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
