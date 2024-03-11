const DashboardCards = () => {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Summary Box */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {" "}
          {/* Increased padding */}
          <h3 className="text-lg font-semibold text-gray-800">Summary</h3>
          <p className="text-gray-600 mt-2">Total Revenue: $10,000</p>
          {/* Add more summary metrics here */}
        </div>

        {/* Quick Actions Box */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {" "}
          {/* Increased padding */}
          <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
            Add New Item
          </button>
          {/* Add more quick actions here */}
        </div>

        {/* Alerts Box */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {" "}
          {/* Increased padding */}
          <h3 className="text-lg font-semibold text-gray-800">Alerts</h3>
          <div className="mt-2">
            <p className="text-red-500">System Maintenance Scheduled</p>
            {/* Add more alerts here */}
          </div>
        </div>

        {/* Recent Activity Box */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          {" "}
          {/* Increased padding */}
          <h3 className="text-lg font-semibold text-gray-800">
            Recent Activity
          </h3>
          <div className="mt-2">
            <p>User John Doe logged in</p>
            {/* Add more recent activity here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
