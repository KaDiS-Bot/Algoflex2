import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Clients = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('clients');
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    monetization_model: '',
    total_campaigns: '',
    total_reviews: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch Clients Data
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/companies');
        if (!response.ok) {
          throw new Error('Failed to fetch clients');
        }
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    fetchClients();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) throw new Error('Failed to add client');

      const addedClient = await response.json();
      setClients([...clients, addedClient]); // Update UI with new client
      setShowModal(false);
      setNewClient({ name: '', monetization_model: '', total_campaigns: '', total_reviews: '' }); // Reset form
    } catch (error) {
      console.error('Error adding client:', error);
    }
    setLoading(false);
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

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-semibold text-gray-900">Clients</h1>
            <button 
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-md hover:from-indigo-500 hover:to-blue-600 transition-all duration-300"
              onClick={() => setShowModal(true)}
            >
              + Add Client
            </button>
          </div>

          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Company Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Monetization Model</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Total Campaigns</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-500">Total Reviews</th>
              </tr>
            </thead>
            <tbody>
              {clients.length > 0 ? (
                clients.map((client, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 text-sm text-gray-700">{client.company_name}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{client.monetization_model}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{client.total_campaigns}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{client.total_reviews}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-4 text-center text-gray-500">
                    No clients found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Client Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-96 transform transition-all scale-95 hover:scale-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">✨ Add New Client</h2>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="name"
                value={newClient.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />

              <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">Monetization Model</label>
              <input
                type="text"
                name="monetization_model"
                value={newClient.monetization_model}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                required
              />

              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-lg shadow-md hover:from-teal-500 hover:to-green-600 transition-all duration-300"
                >
                  {loading ? "Adding..." : "Add Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
