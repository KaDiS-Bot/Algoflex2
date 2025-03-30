import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  const [activeTab, setActiveTab] = useState("agents");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/agents");
      const data = await response.json();
      setAgents(data.agents);
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed md:static z-20 transform bg-gray-900 text-white w-3/4 sm:w-1/4 md:w-64 md:h-full flex flex-col">
        <h1 className="text-2xl font-bold p-4 text-white">
          <span className="text-white">ALGO</span>
          <span className="text-orange-500">FLEX</span>
        </h1>
        <nav className="flex flex-col mt-4">
          {["content-review", "clients", "agents", "campaigns"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                navigate(`/${tab}`);
              }}
              className={`p-4 text-left text-lg hover:bg-gray-700 ${
                activeTab === tab ? "bg-gray-700" : ""
              }`}
            >
              {tab.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white shadow rounded-lg overflow-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Agents</h1>

        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border text-left text-sm font-medium text-gray-500">
                Company Name
              </th>
              <th className="py-2 px-4 border text-left text-sm font-medium text-gray-500">
                Agent Name
              </th>
              <th className="py-2 px-4 border text-left text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="py-2 px-4 border text-left text-sm font-medium text-gray-500">
                Total Calls
              </th>
            </tr>
          </thead>
          <tbody>
            {agents.map((agent, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border text-sm text-gray-700">
                  {agent.company_name || "Unknown"}
                </td>
                <td className="py-2 px-4 border text-sm text-gray-700">
                  {agent.agent_name || "Unknown"}
                </td>
                <td className="py-2 px-4 border text-sm text-gray-700">
                  {agent.email || "N/A"}
                </td>
                <td className="py-2 px-4 border text-sm text-gray-700">
                  {agent.total_calls || 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agents;
