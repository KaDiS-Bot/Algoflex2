import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { LinearProgress } from "@mui/material";

const ContentDetails = () => {
  const parameters = [
    { name: "Parameter 1", score: 23, subParams: [20, 66, 78] },
    { name: "Parameter 2", score: 30, subParams: [20, 66, 78] },
    { name: "Parameter 3", score: 10, subParams: [20, 66, 78] },
    { name: "Parameter 4", score: 15, subParams: [20, 66, 78] },
    { name: "Parameter 5", score: 45, subParams: [20, 66, 78] },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-4 space-y-8">
        <h1 className="text-xl font-bold text-orange-500">ALGOFLEX</h1>
        <nav>
          <ul className="space-y-4">
            <li className="text-orange-500 font-medium">Content Review</li>
            <li>Clients</li>
            <li>Agents</li>
            <li>Campaigns</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-gray-700">Content Details</h2>
        </header>

        {/* Content Details Section */}
        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div className="col-span-1 bg-white rounded-lg shadow p-4">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {/* Placeholder for Profile Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9A3.75 3.75 0 1112 5.25a3.75 3.75 0 013.75 3.75zM4.5 19.125a8.625 8.625 0 1115 0M4.5 19.125h15"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold">Roberto Carlos</h3>
                <p className="text-sm text-gray-500">
                  roberto.carlos@convergies.com
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <p>
                <strong>Unique Call ID:</strong> ID189652744
              </p>
              <p>
                <strong>Campaign Name:</strong> Incorporation of UTM while
                tracking
              </p>
              <p>
                <strong>Call Storage Location:</strong>{" "}
                /data/user/0/files/callrecording
              </p>
            </div>

            {/* Rating Scale */}
            <div className="mt-6">
              <h4 className="text-lg font-bold">Rating Scale</h4>
              <div className="flex space-x-1 mt-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    fill={index < 4 ? "orange" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-orange-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.998 18.26l-5.612 3.22 1.485-6.335L2.5 10.565l6.525-.566L11.998 4l2.973 6.002 6.525.566-5.37 4.581 1.485 6.335-5.613-3.22z"
                    />
                  </svg>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="mt-6">
              <h4 className="text-lg font-bold">Comments</h4>
              <p className="text-sm text-gray-600 mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et
                euismod turpis. Phasellus molestie gravida ligula.
              </p>
            </div>
          </div>

          {/* Skillify Rating */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {parameters.map((param, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 space-y-4"
              >
                {/* Circular Progress Bar */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16">
                    <CircularProgressbar
                      value={param.score}
                      text={`${param.score}`}
                      styles={buildStyles({
                        textSize: "20px",
                        textColor: "#f00",
                        pathColor: "#f88",
                      })}
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{param.name}</h4>
                    {param.subParams.map((subScore, subIndex) => (
                      <div key={subIndex} className="text-sm my-2">
                        <p>Sub Parameter {subIndex + 1}</p>
                        <LinearProgress
                          variant="determinate"
                          value={subScore}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <p className="text-sm text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                  et euismod turpis.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
