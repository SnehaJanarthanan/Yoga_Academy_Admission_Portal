const BlogSection = () => {
  // Define an array of objects containing information for each card
  const cardsData = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1633534073437-39c3d168d362?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "CATEGORY-1",
      title: "The Catalyzer",
      description: "Acrobatics and Advanced Level Classes",
    },

    {
      imageUrl:
        "https://images.unsplash.com/photo-1593358578769-b7a7cf27cba7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fHlvZ2F8ZW58MHwwfDB8fHww",
      category: "CATEGORY-1",
      title: "The Catalyzer",
      description: "Advanced Level Meditation and Yoga",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1584937005173-c307e769aa24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fHlvZ2F8ZW58MHwwfDB8fHww",
      category: "CATEGORY-2",
      title: "The Accelerant",
      description: "Intermediate Level Meditation and Yoga",
    },
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {/* Map over the cardsData array to generate each card */}
          {cardsData.map((card, index) => (
            <div key={index} className="p-4 md:w-1/3">
              <div className="h-full rounded-xl shadow-cla-blue bg-white overflow-hidden border border-black">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                  src={card.imageUrl}
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {card.category}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-black mb-3">
                    {card.title}
                  </h1>
                  <p className="leading-relaxed mb-3 text-black">
                    {card.description}
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <button className="bg-black text-white hover:bg-white hover:text-black px-4 py-1 rounded-lg border border-black">
                      Learn more
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BlogSection;
