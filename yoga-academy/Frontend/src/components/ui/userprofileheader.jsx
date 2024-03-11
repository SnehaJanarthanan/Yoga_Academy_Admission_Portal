const UserProfile = () => {
  return (
    <div className="p-4 md:p-16 mt-2">
      {" "}
      {/* Reduced margin-top from mt-8 to mt-6 */}
      <div className="p-4 md:p-8 bg-white shadow mt-2 md:mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="hidden md:block md:col-span-1"></div>{" "}
          {/* Empty div to maintain grid layout */}
          <div className="md:col-span-1 flex justify-center items-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-48 md:h-48 bg-indigo-100 rounded-full shadow-2xl flex items-center justify-center text-indigo-500">
                <img
                  src="https://images.unsplash.com/photo-1602192509154-0b900ee1f851?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Profile Picture"
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full object-cover"
                />
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </div>
            </div>
          </div>
          <div className="hidden md:block md:col-span-1"></div>{" "}
          {/* Empty div to maintain grid layout */}
        </div>

        <div className="mt-8 md:mt-20 text-center border-b pb-6 md:pb-12">
          <h1 className="text-2xl md:text-4xl font-medium text-gray-700">
            Devita Chopra, <span className="font-light text-gray-500">24</span>
          </h1>
          <p className="font-light text-gray-600 mt-1 md:mt-3">Mumbai, India</p>

          <p className="mt-4 md:mt-8 text-gray-500">Yoga Student</p>
          <p className="mt-1 md:mt-2 text-gray-500">5 yrs</p>
        </div>

        <div className="mt-8 md:mt-12 flex flex-col justify-center">
          <p className="text-gray-600 text-center font-light lg:px-4 md:px-16">
            Devita Chopra is a dedicated yoga student, passionate about
            exploring the depths of yoga philosophy and practice. With a focus
            on alignment and breath, she strives to deepen her understanding of
            yoga and cultivate a sense of inner peace and balance. Through her
            practice, Devita seeks to inspire others to embark on their own
            journey of self-discovery and holistic well-being.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
