import React, { useState, useEffect } from "react";
import RegistrationForm from "./classregisterationform";
import axios from "axios";

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

const ClassesCards = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/admin/get/course",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCardsData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const openModal = (index) => {
    setShowModal(true);
    setSelectedCard(cardsData[index]);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCard(null);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {cardsData.map((card, index) => (
            <div key={index} className="p-4 md:w-1/3">
              <div className="h-full rounded-xl shadow-cla-blue bg-white overflow-hidden border border-black">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                  src={card.img_url}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {card.category}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-black mb-3">
                    {card.courseName}
                  </h1>
                  <p className="leading-relaxed mb-3 text-black">
                    {card.courseDescription}
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <button
                      onClick={() => openModal(index)}
                      className="bg-black text-white hover:bg-white hover:text-black px-4 py-1 rounded-lg border border-black"
                    >
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        imageUrl={selectedCard ? selectedCard.img_url : ""}
        title={selectedCard ? selectedCard.courseName : ""}
        description={selectedCard ? selectedCard.courseDescription : ""}
      />
    </section>
  );
};

export default ClassesCards;
