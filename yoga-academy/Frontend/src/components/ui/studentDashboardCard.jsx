import React, { useState, useEffect } from "react";
import axios from "axios";

const InstituteDashboardCard = () => {
  const [institutes, setInstitutes] = useState([]);

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/user/student");
      console.log(response.data);
      setInstitutes(response.data);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {institutes.map((institute) => (
            <div key={institute.studentId} className="w-full">
              <div className="flex flex-col items-center bg-white rounded-xl shadow-cla-blue border border-black overflow-hidden">
                <div className="p-6 flex flex-col items-center">
                  <h1 className="title-font text-lg font-medium text-black mb-3 text-center">
                    Student Name: {institute.studentName}
                  </h1>
                  <p className="leading-relaxed mb-3 text-black text-center">
                    Address: {institute.address}
                  </p>
                  <p className="leading-relaxed mb-3 text-black text-center">
                    Mobile: {institute.mobile}
                  </p>
                  <p className="leading-relaxed mb-3 text-black text-center">
                    Age: {institute.age}
                  </p>
                  {institute.institutions && (
                    <React.Fragment>
                      <p className="leading-relaxed mb-3 text-black text-center">
                        Institute Name: {institute.institutions.instituteName}
                      </p>
                      <p className="leading-relaxed mb-3 text-black text-center">
                        Institute Description:{" "}
                        {institute.institutions.instituteDescription}
                      </p>
                      {/* Add more fields as needed */}
                    </React.Fragment>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstituteDashboardCard;
