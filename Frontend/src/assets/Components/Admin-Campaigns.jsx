import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/campaigns")  // ✅ Use full API URL
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then((data) => setCampaigns(data))
      .catch((err) => console.error("Error fetching campaigns:", err));
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 bg-gray-900 text-white w-3/4 sm:w-1/4 md:w-64 md:h-full flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            <span className="text-white">ALGO</span>
            <span className="text-orange-500">FLEX</span>
          </h1>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="md:hidden text-white text-2xl"
          >
            ✖
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col mt-4">
          {["content-review", "clients", "agents", "campaigns"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                navigate(`/${tab}`);
                setIsMenuOpen(false);
              }}
              className="p-4 text-left text-lg hover:bg-gray-700"
            >
              {tab.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* Toggle Button (Hamburger) */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 left-4 md:hidden bg-gray-900 text-white p-2 rounded"
      >
        ☰
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold text-gray-900">Campaigns</h1>

        {/* Display a loading message while fetching */}
        {campaigns.length === 0 ? (
          <p className="mt-4 text-gray-600">Loading campaigns...</p>
        ) : (
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Campaign Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Total Call Reviews</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Unique Agents</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Average Call Rating</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-700">{campaign.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{campaign.total_call_reviews}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">{campaign.unique_agent_count}</td>
                  <td className="py-3 px-4 text-sm text-gray-700">
                    <div className="flex items-center">
                      <div className="w-3/4 bg-gray-200 h-3 rounded-lg">
                        <div
                          className={`h-3 rounded-lg ${
                            campaign.average_call_rating < 60 ? "bg-red-500" : "bg-green-500"
                          }`}
                          style={{ width: `${campaign.average_call_rating}%` }}
                        ></div>
                      </div>
                      <span className="ml-2">{campaign.average_call_rating}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
