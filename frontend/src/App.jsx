// import React, { useState } from 'react';
// import axios from 'axios';
// import { SunIcon, MoonIcon, UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
// import { Spinner } from 'react-bootstrap';

// const App = () => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [question, setQuestion] = useState('');
//   const [responses, setResponses] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSend = async () => {
//     if (!question) return;

//     setResponses((prev) => [...prev, { text: question, type: 'user' }]);
//     setLoading(true);

//     try {
//       const response = await axios.post('http://localhost:8000/ask', { question }, { withCredentials: true,headers: {
//         'Content-Type': 'application/json',
//       } });
//       setResponses((prev) => [...prev, { text: response.data.answer, type: 'bot' }]);
//       setQuestion('');
//       console.log('response', responses);
//     } catch (error) {
//       console.error('Error sending question:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
//       {/* Header */}
//       <header className={`p-4 shadow-md ${darkMode ? 'bg-gray-800' : 'bg-cyan-600'} text-white flex justify-between items-center`}>
//         <h1 className="text-2xl font-bold">Support Agent ChatBot</h1>
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className={`ml-4 p-2 rounded-lg ${darkMode ? 'bg-cyan-500' : 'bg-cyan-700'} hover:bg-cyan-800 flex items-center`}
//         >
//           {darkMode ? (
//             <SunIcon className="h-6 w-6 text-white" />
//           ) : (
//             <MoonIcon className="h-6 w-6 text-white" />
//           )}
//         </button>
//       </header>

//       <main className="flex-grow p-4 overflow-auto relative">
//         <div className={`rounded-lg shadow-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
//           <div className="h-[calc(100vh-200px)] overflow-y-auto mb-4 scrollbar-hide">
//             <div className="flex flex-col space-y-4">
//               {responses.map((response, index) => (
//                 <div
//                   key={index}
//                   className={`flex items-start p-3 rounded-lg ${
//                     response.type === 'bot'
//                       ? darkMode
//                         ? 'bg-cyan-700'
//                         : 'bg-cyan-100'
//                       : darkMode
//                       ? 'bg-gray-700'
//                       : 'bg-gray-200'
//                   } self-${response.type === 'bot' ? 'start' : 'end'}`}
//                 >
//                   <div className="mr-2">
//                     {response.type === 'bot' ? (
//                       <ChatBubbleLeftIcon className="h-6 w-6 text-white" />
//                     ) : (
//                       <UserIcon className="h-6 w-6 text-gray-800" />
//                     )}
//                   </div>
//                   <p className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>{response.text}</p>
//                 </div>
//               ))}
//               {loading && (
//                 <div className="flex items-center justify-center p-3">
//                   <Spinner animation="border" variant="primary" />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className={`fixed bottom-20 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-2xl p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} border-t border-gray-300`}>
//           <div className="flex">
//             <input
//               type="text"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//               placeholder="Type your message..."
//               className={`flex-grow border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 ${
//                 darkMode ? 'bg-gray-700 text-white border-gray-600 focus:ring-cyan-500' : 'bg-white text-gray-800 focus:ring-cyan-500'
//               }`}
//             />
//             <button
//               onClick={handleSend}
//               className={`ml-2 rounded-lg px-4 py-2 ${darkMode ? 'bg-cyan-500' : 'bg-cyan-600'} text-white hover:bg-cyan-700`}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </main>

//       <footer className={`text-center p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
//         <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>© 2025 Support Agent ChatBot.</p>
//       </footer>
//     </div>
//   );
// };

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import { SunIcon, MoonIcon, UserIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import ReactMarkdown from 'react-markdown';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [question, setQuestion] = useState('');
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;

    setResponses((prev) => [...prev, { text: question, type: 'user' }]);
    setQuestion('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:8000/ask',
        { question },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setResponses((prev) => [...prev, { text: response.data.answer, type: 'bot' }]);
    
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} min-h-screen flex flex-col`}>
      {/* Header */}
      <header className={`flex items-center justify-between px-6 py-4 shadow-md 
        ${darkMode ? 'bg-indigo-900 text-white' : 'bg-indigo-600 text-white'}`}>

        <h1 className="text-xl sm:text-2xl font-semibold">Customer Support Agent</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-md hover:bg-cyan-700 transition"
        >
          {darkMode ? <SunIcon className="h-6 w-6" /> : <MoonIcon className="h-6 w-6" />}
        </button>
      </header>

      {/* Chat Container */}
      <main className="flex-grow flex flex-col px-4 py-6 max-w-3xl mx-auto w-full">
        <div className={`flex flex-col space-y-4 overflow-y-auto flex-grow mb-4 px-1`}>
          {responses.map((res, idx) => (
            <div key={idx} className={`flex ${res.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xs sm:max-w-md p-3 rounded-xl flex items-start space-x-2 ${
                  res.type === 'bot'
                    ? `${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-100 text-gray-800'}`
                    : `${darkMode ? 'bg-zinc-700 text-white' : 'bg-zinc-200 text-gray-800'}`
                }`}
              >
                <div className="pt-1">
                  {res.type === 'bot' ? (
                    <ChatBubbleLeftIcon className="h-5 w-5 text-white" />
                  ) : (
                    <UserIcon className="h-5 w-5 text-gray-800" />
                  )}
                </div>
                {/* <p className="text-sm leading-relaxed">{res.text}</p> */}
                <ReactMarkdown
                  components={{
                    p: ({ node, ...props }) => (
                      <p className="text-sm leading-relaxed" {...props} />
                    ),
                  }}
                >
                  {res.text}
               </ReactMarkdown>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-xl bg-cyan-200 animate-pulse text-sm text-gray-800">
                Bot is typing...
              </div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className={`mt-auto w-full flex items-center gap-2 py-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg`}>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question..."
            className={`flex-grow px-4 py-2 rounded-lg focus:outline-none text-sm ${
              darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-white text-gray-800'
            }`}
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-indigo-900 text-white text-sm rounded-lg hover:bg-cyan-700 transition"
          >
            Send
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`text-center py-4 text-sm border-t ${
          darkMode
            ? 'bg-gray-800 text-gray-400 border-gray-700'
            : 'bg-gray-100 text-gray-600 border-gray-300'
        }`}
      >
        <p>Made with 💬 by Support Agent ChatBot &copy; 2025</p>
     </footer>

    </div>
  );
};

export default App;

