import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import EmployeeInfoForm from './component/EmployeeInfoForm/EmployeeInfoForm';
import CvTemplate1 from './pages/Cv-template/Cv-template-1/CvTemplate1';
import CvTemplate2 from './pages/Cv-template/Cv-template-2/CvTemplate2';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Home from './pages/Home/Home';
import LoginForm from './pages/Login/LoginForm';
import Profile from './pages/Profile/Profile';
import SignUpForm from './pages/SignUp/SignUpForm';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path="/signUp" element={<SignUpForm />}></Route>
            <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/employeeForm" element={<EmployeeInfoForm />}></Route>
            <Route path="/CvTemplate1" element={<CvTemplate1 />}></Route>
            <Route path="/CvTemplate2" element={<CvTemplate2 />}></Route>
          </Routes>
        </Router>
      </div>
    </ChakraProvider>
  );
}

export default App;
