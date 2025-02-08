import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Questionnaire from "./Questionnaire";
import Chatbot from "./chatbot"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/chat" element={<Chatbot />} />
      </Routes>
    </Router>
  );
};

export default App;
