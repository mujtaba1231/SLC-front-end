import React, { useState } from 'react';

const Question = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-[20px] overflow-hidden bg-white">
      <button
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900 font-onest">{question}</h3>
        <span className="text-xl text-gray-600">
          {isOpen ? '-' : '+'}
        </span>
      </button>

      {/* Divider */}
      <div className={`w-[95%] h-[1px] bg-gray-200 mx-auto ${isOpen ? 'block' : 'hidden'}`}></div>

      {/* Answer */}
      <div 
        className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <p className="px-6 py-4 text-gray-600 font-sans">{answer}</p>
      </div>
    </div>
  );
};

export default Question;