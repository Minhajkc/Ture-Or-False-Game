import React, { useState } from 'react';

function Qstns() {
  const questions = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Madrid'],
      answer: 'Paris',
    },
    {
      question: 'What is the largest planet in our solar system?',
      options: ['Earth', 'Jupiter', 'Mars', 'Venus'],
      answer: 'Jupiter',
    },
    {
      question: 'What is the smallest country in the world?',
      options: ['Monaco', 'Vatican City', 'Maldives', 'Nauru'],
      answer: 'Vatican City',
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [score, setScore] = useState(0);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowCorrectAnswer(false); // Reset the correct answer display on option change
  };

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
      setShowCorrectAnswer(false);
    } else {
      setShowCorrectAnswer(true);
    }

    setIsAnswerSubmitted(true);
    setTimeout(() => {
      proceedToNextQuestion();
    }, 1000); // Show the answer for 1 second before proceeding
  };

  const proceedToNextQuestion = () => {
    setSelectedOption('');
    setShowCorrectAnswer(false);
    setIsAnswerSubmitted(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    window.location.reload();
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-500 '>
      <div className='bg-white  p-8 rounded-2xl shadow-md w-full max-w-lg'>
        {quizCompleted ? (
          <div className='text-center'>
            <h1 className='text-2xl font-bold mb-4'>Quiz Completed!</h1>
            <p className='font-semibold text-lg mb-4'>Your score is: {score} out of {questions.length}</p>
            <button
              onClick={handleRestart}
              className='mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors'
            >
              Restart Quiz
            </button>
          </div>
        ) : (
          <>
            <h1 className='text-2xl font-bold text-center mb-4'>Questions</h1>
            <div className='mb-4 '>
              <h2 className='font-bold text-lg mb-2'>{questions[currentQuestionIndex].question}</h2>
              <ul className='list-none'>
                {questions[currentQuestionIndex].options.map((option, idx) => (
                  <li key={idx} className='mb-2'>
                    <label className='flex items-center'>
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        checked={selectedOption === option}
                        onChange={handleOptionChange}
                        className='mr-2'
                        disabled={isAnswerSubmitted} // Disable option change after submission
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
              {showCorrectAnswer && (
                <p className='text-red-500 font-semibold'>
                  Incorrect! The correct answer is: {questions[currentQuestionIndex].answer}
                </p>
              )}
              <button
                onClick={handleSubmit}
                className={`mt-4  p-1 px-5 ${isAnswerSubmitted ? 'bg-gray-500' : 'bg-green-500'} text-white rounded ${!isAnswerSubmitted ? 'hover:bg-blue-700' : ''} transition-colors`}
                disabled={isAnswerSubmitted} // Disable submit button after submission
              >
                Submit
              </button>
            </div>
            <p className='font-semibold text-center'>Score: {score}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Qstns;
