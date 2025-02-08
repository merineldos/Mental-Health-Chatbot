import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import qn1 from "./images/qn1"; 
import qn2 from "./images/qn2.jpg";
import qn3 from "./images/qn3.jpg"; 
import qn4 from "./images/qn4.jpg";
import qn5 from "./images/qn5.jpg"; 

const Questionnaire = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const questions = [
    { question: "What's your name?", type: 'text' },
    { question: "How are you feeling today?", type: 'options', options: ['Happy', 'Sad', 'Angry', 'Anxious', 'Neutral'] },
    { question: "Have you been feeling stressed recently?", type: 'options', options: ['Yes', 'No'] },
    { question: "Do you have trouble sleeping?", type: 'options', options: ['Yes', 'No'] },
    { question: "Have you been feeling isolated?", type: 'options', options: ['Yes', 'No'] },
    { question: "How often do you feel overwhelmed?", type: 'options', options: ['Frequently', 'Occasionally', 'Never'] },
    { question: "Do you have trouble concentrating?", type: 'options', options: ['Yes', 'No'] },
    { question: "Do you often feel fatigued?", type: 'options', options: ['Yes', 'No'] },
    { question: "Have you experienced any significant life changes recently?", type: 'options', options: ['Yes', 'No'] },
    { question: "Do you have a support system in place?", type: 'options', options: ['Yes', 'No'] },
    { question: "Would you like to talk to someone about how you're feeling?", type: 'options', options: ['Yes', 'No'] }
  ];

  const handleAnswerChange = (answer) => {
    setSelectedOption(answer);
  };

  const handleNext = () => {
    if (selectedOption || currentQuestionIndex === 0) {
      if (currentQuestionIndex > 0) {
        setAnswers([...answers, selectedOption]);
      }
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        submitAnswers();
      }
    } else {
      alert("Please select an option before proceeding.");
    }
  };

  const submitAnswers = async () => {
    try {
      const response = await fetch("http://localhost:5000/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          answers: answers,
        }),
      });

      if (response.ok) {
        navigate("/chat");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  const getRandomColor = () => {
    const colors = ["#F1C6C0", "#E6A4A3", "#D9B7FF", "#C8C1FF", "#A8E0D1"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const renderQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (currentQuestion.type === "text") {
      return (
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 rounded-lg w-72 text-center"
        />
      );
    }
    return (
      <div className="flex flex-col space-y-4 mt-4">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            className={`p-4 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${selectedOption === option ? "text-white" : "text-gray-700"}`}
            onClick={() => handleAnswerChange(option)}
            style={{
              backgroundColor: selectedOption === option ? "#B19CD9" : getRandomColor(),
              border: "none",
              width: '100%',  
              minWidth: '250px'  
            }}
          >
            {option}
          </button>
        ))}
      </div>
    );
  };

  const getImage = () => {
    switch (currentQuestionIndex) {
      case 0:
        return qn1;
      case 1:
        return qn2;
      case 2:
        return qn4;
      case 3:
        return qn5;
      case 4:
        return qn1;
      case 5:
        return qn2;
      case 6:
        return qn3;
      case 7:
        return qn4;
      default:
        return qn5;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8">
      <h1 className="absolute top-0 left-0 p-6 text-4xl font-bold text-gray-800 z-10">Mental Health Questionnaire</h1>
      <div className="mt-16 flex justify-between items-center w-full">
        <div className={`w-1/2 ${currentQuestionIndex % 2 === 0 ? "pl-8" : "pr-8"}`}>
          <img
            src={getImage()}
            alt="Question Background"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-1/2">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">{questions[currentQuestionIndex].question}</h2>
          {renderQuestion()}
          <div className="mt-8 w-full">
          <button
            onClick={handleNext}
            className={`p-4 text-lg font-semibold rounded-lg transition-all duration-300 ease-in-out ${selectedOption === null ? "text-gray-700" : "text-white"}`}
            style={{
              backgroundColor: selectedOption === null ? getRandomColor() : "#B19CD9",
              border: "none",
              width: '50%',  
              minWidth: '250px',
              marginLeft: '25%'  
            }}
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
