import React, { useState, useEffect } from "react";
import axios from "axios";

const InstituteDashboardCard = () => {
  const [institutes, setInstitutes] = useState([]);
  const [editingInstitute, setEditingInstitute] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
      console.log(response.data);
      setInstitutes(response.data);
    } catch (error) {
      console.error("Error fetching institutes:", error);
    }
  };

  const handleEdit = (institute) => {
    setEditingInstitute(institute);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/admin/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setInstitutes(institutes.filter((inst) => inst.instituteId !== id));
      console.log("Institute deleted successfully");
    } catch (error) {
      console.error("Error deleting institute:", error);
    }
  };

  const handleFormClose = () => {
    setEditingInstitute(null);
    setShowAddForm(false);
  };

  const handleEditSubmit = async (formData) => {
    try {
      await axios.put(
        `http://localhost:8080/admin/put/${formData.instituteId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setInstitutes((prevInstitutes) =>
        prevInstitutes.map((inst) =>
          inst.instituteId === formData.instituteId ? formData : inst
        )
      );
      console.log("Institute updated successfully");
    } catch (error) {
      console.error("Error updating institute:", error);
    }
    handleFormClose();
  };

  const handleAddSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/admin/add/institute",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setInstitutes((prevInstitutes) => [...prevInstitutes, response.data]);
      console.log("New institute added successfully");
    } catch (error) {
      console.error("Error adding institute:", error);
    }
    handleFormClose();
  };

  const handleAddNewInstitute = () => {
    setShowAddForm(true);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto">
        <button
          onClick={handleAddNewInstitute}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add New Institute
        </button>
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
                  <div className="flex justify-between w-full">
                    <button
                      onClick={() => handleEdit(institute)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(institute.instituteId)}
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
      {editingInstitute && (
        <EditForm
          institute={editingInstitute}
          onClose={handleFormClose}
          onSubmit={handleEditSubmit}
        />
      )}
      {showAddForm && (
        <AddNewInstituteForm
          onClose={handleFormClose}
          onSubmit={handleAddSubmit}
          token={token}
        />
      )}
    </section>
  );
};

const EditForm = ({ institute, onClose, onSubmit }) => {
  const [editedInstitute, setEditedInstitute] = useState(institute);

  const handleInputChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditedInstitute((prevInstitute) => ({
      ...prevInstitute,
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
        <h2 className="text-2xl font-bold mb-4">Edit Institute</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="instituteName"
            value={editedInstitute.instituteName}
            onChange={handleInputChangeEdit}
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
            name="instituteDescription"
            value={editedInstitute.instituteDescription}
            onChange={handleInputChangeEdit}
            rows="3"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="address"
            name="instituteAddress"
            value={editedInstitute.instituteAddress}
            onChange={handleInputChangeEdit}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={editedInstitute.mobile}
            onChange={handleInputChangeEdit}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={editedInstitute.email}
            onChange={handleInputChangeEdit}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={() => onSubmit(editedInstitute)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

const AddNewInstituteForm = ({ onClose, onSubmit, token }) => {
  const [newInstitute, setNewInstitute] = useState({
    instituteName: "",
    instituteDescription: "",
    instituteAddress: "",
    mobile: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInstitute((prevInstitute) => ({
      ...prevInstitute,
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
        <h2 className="text-2xl font-bold mb-4">Add New Institute</h2>
        <div className="mb-4">
          <label
            htmlFor="newName"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="newName"
            name="instituteName"
            value={newInstitute.instituteName}
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
            name="instituteDescription"
            value={newInstitute.instituteDescription}
            onChange={handleInputChange}
            rows="3"
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="newAddress"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            type="text"
            id="newAddress"
            name="instituteAddress"
            value={newInstitute.instituteAddress}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newMobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile
          </label>
          <input
            type="text"
            id="newMobile"
            name="mobile"
            value={newInstitute.mobile}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="text"
            id="newEmail"
            name="email"
            value={newInstitute.email}
            onChange={handleInputChange}
            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={() => onSubmit(newInstitute)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Institute
        </button>
      </div>
    </div>
  );
};

export default InstituteDashboardCard;
