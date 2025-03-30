import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { call } = location.state || {};

  if (!call || !call.call_scores) {
    return <p className="text-center text-red-500">No data available</p>;
  }

  const callScores = {
    "ACKNOWLEDGE": call.call_scores["ACKNOWLEDGE"] || 0,
    "CALL OPENING": call.call_scores["CALL OPENING"] || 0,
    "HOLD/TRANSFER": call.call_scores["HOLD/TRANSFER"] || 0,
    "OBJECTION HANDLING": call.call_scores["OBJECTION HANDLING"] || 0,
    "PROBING": call.call_scores["PROBING"] || 0,
    "TRANSITION": call.call_scores["TRANSITION"] || 0
  };

  const scores = Object.values(callScores);
  const avgRating = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const starRating = Math.round((avgRating / 10) * 5);

  return (
    <div className="flex h-screen font-inter bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed md:static z-20 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 bg-gray-900 text-white w-3/4 sm:w-1/4 md:w-64 md:h-full flex flex-col`}
      >
        <h1 className="text-2xl font-bold p-4 text-white">
          <span className="text-white">ALGO</span>
          <span className="text-orange-500">FLEX</span>
        </h1>
        <nav className="flex flex-col mt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="p-4 text-left text-lg hover:bg-gray-700"
          >
            CONTENT REVIEW
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-full md:w-4/5 p-10 flex">
        {/* Left Section - Agent Details & Rating */}
        <div className="w-1/3 pr-8">
          <div className="bg-white p-6 shadow-md rounded-xl flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold text-4xl">
              {call.agent_name?.charAt(0)}
            </div>
            <h3 className="text-2xl font-semibold mt-4">{call.agent_name}</h3>
            <p className="text-gray-600 text-md">{call.agent_email || "N/A"}</p>
            <p className="text-lg mt-2"><strong>Call ID:</strong> {call.call_id}</p>
            <p className="text-lg"><strong>Campaign:</strong> {call.campaign_name}</p>
            <p className="text-lg"><strong>Storage:</strong> {call.call_storage || "N/A"}</p>
          </div>

          {/* Rating Scale */}
          <div className="bg-white p-6 shadow-md rounded-xl text-center">
            <h3 className="text-xl font-semibold">Overall Rating</h3>
            <div className="flex justify-center space-x-1 mt-2 text-yellow-500 text-3xl">
              {"⭐".repeat(starRating)}
              {"☆".repeat(5 - starRating)}
            </div>
            <p className="text-gray-600 mt-2 text-lg">Average Score: {avgRating.toFixed(1)}/10</p>
          </div>
        </div>

        {/* Right Section - Skill Ratings */}
        <div className="w-2/3 grid grid-cols-2 gap-6">
          {Object.entries(callScores).map(([key, score], index) => (
            <div
              key={index}
              className="p-6 shadow-md rounded-xl flex flex-col items-center border border-gray-300 bg-white"
            >
              <div className="w-28 h-28">
                <CircularProgressbar
                  value={score * 10}
                  text={`${score}/10`}
                  styles={buildStyles({
                    textSize: "24px",
                    pathColor: score > 6 ? "#4CAF50" : score > 3 ? "#FFC107" : "#F44336",
                    textColor: "#333",
                    trailColor: "#ddd",
                  })}
                />
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mt-4">{key.replace("_", " ")}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
