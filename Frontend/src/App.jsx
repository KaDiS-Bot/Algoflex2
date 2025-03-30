import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './assets/Components/LoginForm';
import SignupForm from './assets/Components/SignupForm';
import ForgotPasswordModal from './assets/Components/ForgotPasswordModal';
import ResetPasswordPage from './assets/Components/ResetPassword';
import Dashboard from './assets/Components/Admin-Dashboard';
import ContentDetails from './assets/Components/Admin-ContentDetails';
import ClientDashboard from './assets/Components/Client-Client-Dashboard';
import ReviewPage from './assets/Components/ReviewPage';
import Clients from './assets/Components/Admin-Clients-dashboard';
import Agents from './assets/Components/Admin-Agents-dashboard';
import Campaigns from './assets/Components/Admin-Campaigns';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/forgotpassword" element={<ForgotPasswordModal />} />
          <Route path="/resetpassword" element={<ResetPasswordPage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/contentdetails" element={<ContentDetails/>} />
          <Route path="/clientdashboard" element={<ClientDashboard/>} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/content-review" element={<Dashboard />} />
          <Route path='/agents' element={<Agents />} />
          <Route path='/campaigns' element={<Campaigns />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
