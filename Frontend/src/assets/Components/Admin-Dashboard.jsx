// import React, { useState, useEffect } from "react";
// import { FaBars } from "react-icons/fa";
// import Clients from "./Admin-Clients-dashoard";
// import Agents from "./Admin-Agents-dashboard";
// import CampaignsPage from "./Admin-Campaigns";

// function Dashboard() {
//   const [activeTab, setActiveTab] = useState("content-review");
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isContentCollapsed, setIsContentCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect screen size changes
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     handleResize(); // Check on component mount
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const renderContent = () => {
//     switch (activeTab) {
//       case "content-review":
//         return (
//           <div>
//             <h2 className="text-3xl font-bold mb-6">
//               <span className="text-orange-600  ">Content</span>
//               <span className="text-orange-500">Review</span>
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//               {[
//                 { title: "Total Clients", value: 145, color: "bg-red-500" },
//                 { title: "Total Campaigns", value: 874, color: "bg-yellow-500" },
//                 { title: "Total Content", value: 3792, color: "bg-green-500" },
//                 {
//                   title: "Content Reviewed",
//                   value: 2652,
//                   color: "bg-blue-500",
//                 },
//               ].map((stat, idx) => (
//                 <div
//                   key={idx}
//                   className={`${stat.color} text-white p-4 text-center rounded-lg`}
//                 >
//                   <h3 className="text-2xl font-bold">{stat.value}</h3>
//                   <p>{stat.title}</p>
//                 </div>
//               ))}
//             </div>

//             {/* Collapse Section Icon */}
//             <div className="flex justify-end mb-4">
//               <img
//                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTUBI7eE-DYTaQ4g0OxITVdS-wkznnKppqyQ&s" // Invalid source for now
//                 alt="Collapse Section"
//                 onClick={() =>
//                   setIsContentCollapsed(!isContentCollapsed)
//                 }
//                 className="cursor-pointer w-6 h-6"
//                 aria-label="Toggle collapse section"
//               />
//             </div>

//             {/* Collapsible Content */}
//             <div
//               className={`bg-white shadow-md rounded-lg p-4 transition-all duration-300 ease-in-out ${
//                 isContentCollapsed ? "max-h-0 overflow-hidden" : "max-h-screen"
//               }`}
//             >
//               <table className="w-full border-collapse">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="p-4 text-left font-medium">Unique ID</th>
//                     <th className="p-4 text-left font-medium">Campaign Name</th>
//                     <th className="p-4 text-left font-medium">Agent Details</th>
//                     <th className="p-4 text-left font-medium">Time Taken</th>
//                     <th className="p-4 text-left font-medium">Content</th>
//                     <th className="p-4 text-left font-medium">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {Array.from({ length: 5 }).map((_, i) => (
//                     <tr key={i} className="border-b">
//                       <td className="p-4">ID18965274{i + 1}</td>
//                       <td className="p-4">Campaign Name {i + 1}</td>
//                       <td className="p-4">Agent {i + 1}</td>
//                       <td className="p-4">2 hrs</td>
//                       <td className="p-4">Chat</td>
//                       <td className="p-4">
//                         <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
//                           Review
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         );
//       case "clients":
//         return (
//          <Clients />
//         );
//       case "agents":
//         return (
//           <Agents />
//         );
//       case "campaigns":
//         return (
//           <CampaignsPage />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div
//         className={`fixed md:static z-20 transform ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0 transition-transform duration-300 bg-gray-900 text-white w-3/4 sm:w-1/4 md:w-64 md:h-full flex flex-col ${
//           isMobile && isMenuOpen ? "w-1/4" : ""
//         }`}
//         style={{ height: isMenuOpen && isMobile ? "100vh" : "auto" }} // Full height on mobile when sidebar is open
//       >
//         <h1 className="text-2xl font-bold p-4 text-white">
//           <span className="text-white">ALGO</span>
//           <span className="text-orange-500">FLEX</span>
//         </h1>
//         <nav className="flex flex-col mt-4">
//           {["content-review", "clients", "agents", "campaigns"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`p-4 text-left text-lg hover:bg-gray-700 ${
//                 activeTab === tab ? "bg-gray-700" : ""
//               }`}
//             >
//               {tab.replace("-", " ").toUpperCase()}
//             </button>
//           ))}
//         </nav>
//       </div>

//       {/* Burger Menu for small screens */}
//       <button
//         className="md:hidden fixed top-4 left-4 z-30 bg-gray-900 text-white p-2 rounded-full"
//         onClick={() => setIsMenuOpen(!isMenuOpen)}
//       >
//         <FaBars size={24} />
//       </button>

//       {/* Main Content */}
//       <div
//         className={`flex-grow bg-gray-100 p-6 overflow-y-auto transition-all duration-300 ease-in-out ${
//           isMenuOpen ? "ml-1/4 md:ml-64" : "ml-0" // Adjust content width based on sidebar state
//         }`}
//       >
//         {renderContent()}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("content-review");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/api/dashboard");
        setDashboardData(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const renderContent = () => {
    if (loading) return <p className="text-center text-lg">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (!dashboardData) return null;

    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">
          <span className="text-orang-600">Content</span>
          <span className="text-orane-500">Review</span>
        </h2>

        {/* Table Section */}
        <div className="bg-white shadow-md rounded-lg p-4">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left font-medium">Unique ID</th>
                <th className="p-4 text-left font-medium">Campaign Name</th>
                <th className="p-4 text-left font-medium">Agent Details</th>
                <th className="p-4 text-left font-medium">Content</th>
                <th className="p-4 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.companies.flatMap((company) =>
                company.calls.map((call, i) => (
                  <tr key={i} className="border-b">
                    <td className="p-4">{call.call_id}</td>
                    <td className="p-4">{call.campaign_name}</td>
                    <td className="p-4">{call.agent_name}</td>
                    <td className="p-4">Sales Call</td>
                    <td className="p-4">
                      <button
                        className="bg-orange-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => navigate(`/review/${call.call_id}`, { state: { call } })}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`fixed md:static z-20 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 transition-transform duration-300 bg-gray-900 text-white w-3/4 sm:w-1/4 md:w-64 md:h-full flex flex-col`}>
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
              className={`p-4 text-left text-lg hover:bg-gray-700 ${activeTab === tab ? "bg-gray-700" : ""}`}
            >
              {tab.replace("-", " ").toUpperCase()}
            </button>
          ))}
        </nav>
      </div>

      {/* Mobile Menu */}
      <button className="md:hidden fixed top-4 left-4 z-30 bg-gray-900 text-white p-2 rounded-full" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaBars size={24} />
      </button>

      {/* Main Content */}
      <div className={`flex-grow bg-gray-100 p-6 overflow-y-auto transition-all duration-300 ease-in-out`}>
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
