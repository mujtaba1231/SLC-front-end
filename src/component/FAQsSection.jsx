import React from 'react';
import Question from './faqs/Question';

const FAQsSection = () => {
    const questions = [
        {
            question: "What is the purpose of this website?",
            answer: "Our website is designed to help seniors and their families find trusted senior living communities with transparent and unbiased information."
        },
        {
            question: "How can I search for a senior living community?",
            answer: "You can search by ZIP code, city, state, care type, amenities, or specific keywords."
        },
        {
            question: "Is there a cost to use this website?",
            answer: "No, our platform is completely free for users seeking senior living communities."
        },
        {
            question: "How do you verify the information provided?",
            answer: "We implement a thorough verification process that requires communities to submit accurate documentation before being marked as 'Verified'."
        }
    ];

    
  return (
    <div className="max-w-[1200px] mx-auto py-16 flex flex-col gap-2">
        <div className="flex items-center justify-center gap-2 ">
            
            <p className="text-xs tracking-[3.5px] font-onest">FAQ's</p>   
        </div>
        <h1 className='text-4xl font-bold text-center mb-4 font-onest'>Have Any Questions For Us?</h1>

        <div className='flex justify-center flex-col md:flex-row gap-4'>
            {/* image section  */}
            <div className="flex flex-col gap-4 w-full lg:w-1/2">
                <div className="flex items-center justify-center lg:justify-end">
                    <img 
                    src="/5.jpg" 
                    alt="chooseus-1" 
                    className="w-full max-w-[350px] md:max-w-[480px] h-auto rounded-[20px]" 
                    />
                </div>
                
                {/* <img 
                    src="/1.jpg" 
                    alt="chooseus-2" 
                    className="w-full max-w-[300px] md:max-w-[412px] h-auto mt-[-50px] md:mt-[-100px] rounded-[20px] border-[8px] md:border-[15px] border-white self-start md:self-auto" 
                /> */}
                </div>

            {/* Question section */}
            <div className='flex flex-col gap-4 w-full lg:w-1/2 px-2' >
                {questions.map((question, index) => (
                    <Question key={index} question={question.question} answer={question.answer} />
                ))}
                
            </div>
        </div>
    </div>
  );
};

export default FAQsSection;


