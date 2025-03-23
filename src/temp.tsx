// import React, { useState, useRef, useEffect } from 'react';
// import * as echarts from 'echarts';
// import './index.css';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   model: string;
//   status: 'sending' | 'sent' | 'error';
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const models = [
//     { id: 'gpt4', name: 'GPT-4', icon: 'fa-robot' },
//     { id: 'claude', name: 'Claude 3', icon: 'fa-brain' },
//     { id: 'nextchat', name: 'NextChat', icon: 'fa-comment-dots' },
//   ];

//   const todayChats = [
//     'Chat1',
//     'Chat1',
//     'Chat1',
//     'Chat1',
//   ];

//   const yesterdayChats = [
//     'Chat2',
//     'Chat2',
//     'Chat2'
//   ];

//   const previousChats = [
//     'Chat3',
//     'Chat3'
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   const handleSendMessage = () => {
//     if (!inputText.trim()) return;
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: inputText,
//       type: 'user',
//       timestamp: new Date(),
//       model: selectedModel,
//       status: 'sending'
//     };
//     setMessages(prev => [...prev, newMessage]);
//     setInputText('');
//     setIsGenerating(true);

//     setTimeout(() => {
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: 'I understand your query. Let me help you with that...',
//         type: 'assistant',
//         timestamp: new Date(),
//         model: selectedModel,
//         status: 'sent'
//       };
//       setMessages(prev => [...prev, aiResponse]);
//       setIsGenerating(false);
//     }, 1000);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800">
//       {/* Left Sidebar */}
//       <div className={`${isSidebarOpen ? 'translate-x-0 w-72 min-w-[288px]' : '-translate-x-full w-0'} fixed md:relative h-full bg-white/90 backdrop-blur-sm border-r border-gray-200 p-4 flex flex-col shadow-lg overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
//         <div className="flex items-center justify-between mb-6">
//           <div className="text-blue-400 text-2xl">
//             <i className="fas fa-robot"></i>
//           </div>
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-gray-600 transition-colors">
//             <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//           </button>
//         </div>
//         <div className="mb-6">
//           <div className="flex items-center mb-4">
//             <i className="fas fa-comment-alt mr-2"></i>
//             <span>ChatGPT</span>
//           </div>
//           <div className="flex items-center mb-4">
//             <i className="fas fa-th mr-2"></i>
//             <span>Explore GPTs</span>
//           </div>
//         </div>
//         <div className="space-y-6">
//           <div>
//             <h3 className="text-gray-400 mb-2">Today</h3>
//             <ul className="space-y-2">
//               {todayChats.map((chat, index) => (
//                 <li key={index} className="group hover:bg-gray-100 rounded-lg p-2 cursor-pointer flex items-center justify-between">
//                   <span>{chat}</span>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-pen text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500"></i>
//                     <i className="fas fa-trash text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"></i>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-gray-400 mb-2">Yesterday</h3>
//             <ul className="space-y-2">
//               {yesterdayChats.map((chat, index) => (
//                 <li key={index} className="group hover:bg-gray-100 rounded-lg p-2 cursor-pointer flex items-center justify-between">
//                   <span>{chat}</span>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-pen text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500"></i>
//                     <i className="fas fa-trash text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"></i>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-gray-400 mb-2">Previous 7 Days</h3>
//             <ul className="space-y-2">
//               {previousChats.map((chat, index) => (
//                 <li key={index} className="group hover:bg-gray-100 rounded-lg p-2 cursor-pointer flex items-center justify-between">
//                   <span>{chat}</span>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-pen text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500"></i>
//                     <i className="fas fa-trash text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"></i>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out">
//         {!isSidebarOpen && (
//           <button onClick={() => setIsSidebarOpen(true)} className="fixed left-4 top-3 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
//             <i className="fas fa-bars text-gray-600"></i>
//           </button>
//         )}

//         {/* Top Navigation */}
//         <div className="h-14 bg-white/90 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="block md:hidden mr-4 text-gray-600 hover:text-gray-800 transition-colors">
//             <i className="fas fa-bars text-xl"></i>
//           </button>
//           <div className="flex items-center flex-1 max-w-xl">
//             <div className="relative w-full">
//               <input
//                 type="search"
//                 placeholder="Search conversations..."
//                 className="w-full pl-10 pr-4 py-1.5 mt-0.5 bg-gray-100 border-none rounded-full text-gray-800 focus:ring-2 focus:ring-blue-400"
//               />
//               <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 mt-0.5"></i>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <span className="text-gray-400">Using limited free plan</span>
//             <button className="ml-2 text-purple-400 hover:text-purple-300">Upgrade</button>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 overflow-y-auto p-6 pb-32">
//           <div className="max-w-4xl w-full mx-auto space-y-6">
//             {/* Model Selection Pills */}
//             <div className="flex space-x-2 mb-6">
//               {models.map((model) => (
//                 <button
//                   key={model.id}
//                   onClick={() => setSelectedModel(model.name)}
//                   className={`flex items-center px-4 py-2 rounded-full transition-all ${
//                     selectedModel === model.name
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
//                   }`}
//                 >
//                   <i className={`fas ${model.icon} mr-2`}></i>
//                   {model.name}
//                 </button>
//               ))}
//             </div>

//             {/* Messages Area */}
//             <div className="space-y-4 mb-6">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-lg p-4 ${
//                       message.type === 'user'
//                         ? 'bg-indigo-600 text-white'
//                         : 'bg-gray-800 text-gray-200'
//                     }`}
//                   >
//                     <div className="flex items-center mb-1">
//                       <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                       <span className="text-sm opacity-75">
//                         {message.model} • {new Date(message.timestamp).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <p>{message.content}</p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>

//             {/* Greeting */}
//             <div className="mb-8 flex items-center">
//               <h1 className="text-4xl font-light">
//                 {(() => {
//                   const [displayText, setDisplayText] = useState('');
//                   const hour = new Date().getHours();
//                   const greetingText = hour >= 0 && hour < 12
//                     ? 'Good morning'
//                     : hour >= 12 && hour < 16
//                       ? 'Good afternoon'
//                       : 'Good evening';

//                   useEffect(() => {
//                     let currentText = '';
//                     const fullText = `${greetingText}, Ved`;
//                     let currentIndex = 0;

//                     const interval = setInterval(() => {
//                       if (currentIndex < fullText.length) {
//                         currentText += fullText[currentIndex];
//                         setDisplayText(currentText);
//                         currentIndex++;
//                       } else {
//                         clearInterval(interval);
//                       }
//                     }, 100);

//                     return () => clearInterval(interval);
//                   }, []);

//                   return displayText;
//                 })()}
//               </h1>
//             </div>

//             {/* Input Area */}
//             <div className="sticky bottom-0 w-full p-6 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg">
//               <div className="max-w-4xl mx-auto">
//                 <div className="bg-gray-800 rounded-xl p-4">
//                   <div className="flex items-center mb-4">
//                     <div className="flex-1 flex items-center space-x-6">
//                       <div className="flex items-center">
//                         <i className="fas fa-microphone text-indigo-400 mr-2"></i>
//                         <span className="text-sm text-gray-200">Voice input enabled</span>
//                       </div>
//                       <div className="flex items-center">
//                         <i className="fas fa-image text-indigo-400 mr-2"></i>
//                         <span className="text-sm text-gray-200">Image analysis ready</span>
//                       </div>
//                       <div className="flex items-center">
//                         <i className="fas fa-code text-indigo-400 mr-2"></i>
//                         <span className="text-sm text-gray-200">Code assistance active</span>
//                       </div>
//                     </div>
//                     {isGenerating && (
//                       <div className="flex items-center text-indigo-400">
//                         <i className="fas fa-circle-notch fa-spin mr-2"></i>
//                         Generating...
//                       </div>
//                     )}
//                   </div>
//                   <div className="relative">
//                     <textarea
//                       className="w-full bg-gray-50 rounded-lg border-2 border-gray-200 focus:border-blue-500 outline-none resize-none p-4 pr-24 text-gray-800 placeholder-gray-500"
//                       rows={4}
//                       value={inputText}
//                       onChange={(e) => setInputText(e.target.value)}
//                       placeholder={`Message ${selectedModel}...`}
//                       onKeyDown={(e) => {
//                         if (e.key === 'Enter' && !e.shiftKey) {
//                           e.preventDefault();
//                           handleSendMessage();
//                         }
//                       }}
//                     />
//                     <div className="absolute right-4 bottom-4 flex items-center space-x-3">
//                       <button
//                         className="p-2 hover:bg-gray-600 rounded-full transition-colors"
//                         onClick={() => setIsMicActive(!isMicActive)}
//                       >
//                         <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                       </button>
//                       <button className="p-2 hover:bg-gray-600 rounded-full transition-colors">
//                         <i className="fas fa-paperclip"></i>
//                       </button>
//                       <button
//                         className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2 transition-colors"
//                         onClick={handleSendMessage}
//                       >
//                         <i className="fas fa-paper-plane"></i>
//                       </button>
//                     </div>
//                   </div>
//                   <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
//                     <div className="flex items-center space-x-4">
//                       <span>Model: {selectedModel}</span>
//                       <span>|</span>
//                       <span>Temperature: 0.7</span>
//                       <span>|</span>
//                       <span>Max length: 4000 tokens</span>
//                     </div>
//                     <div className="flex items-center">
//                       <button className="text-indigo-400 hover:text-indigo-300 transition-colors">
//                         Advanced settings
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Analysis Chart */}
//           {activeTab === 'analysis' && (
//             <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//               <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//               <div ref={chartRef} style={{ height: '300px' }}></div>
//             </div>
//           )}

//           {/* Analysis Tool Announcement */}
//           {showAnalysisTool && (
//             <div className="bg-white border border-blue-200 rounded-lg p-4 relative shadow-sm">
//               <div className="flex items-center mb-2">
//                 <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2">NEW</span>
//                 <span className="font-medium">Analysis tool</span>
//                 <button
//                   className="absolute top-4 right-4"
//                   onClick={() => setShowAnalysisTool(false)}
//                 >
//                   <i className="fas fa-times"></i>
//                 </button>
//               </div>
//               <p className="text-gray-400 mb-2">
//                 Upload CSVs for Claude to analyze quantitative data with high accuracy and create interactive data visualizations.
//               </p>
//               <a href="#" className="text-purple-400 hover:text-purple-300">Try it out</a>
//             </div>
//           )}

//           {/* Recent Chats */}
//           <div className="mt-6">
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center">
//                 <i className="fas fa-history mr-2"></i>
//                 <span>Your recent chats</span>
//                 <button
//                   className="ml-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                   onClick={() => setIsShowingChats(!isShowingChats)}
//                 >
//                   {isShowingChats ? 'Hide' : 'Show'}
//                 </button>
//               </div>
//               <button
//                 onClick={() => setShowAllChats(!showAllChats)}
//                 className="text-gray-400 hover:text-gray-500 transition-colors"
//               >
//                 {showAllChats ? 'Show less' : 'View all'}
//               </button>
//             </div>
//             {isShowingChats && (
//               <div className="bg-white rounded-xl shadow-sm p-4 space-y-6">
//                 <div>
//                   <h3 className="text-gray-400 mb-2">Recent Chats</h3>
//                   <ul className="space-y-2">
//                     {[...todayChats, ...yesterdayChats, ...previousChats]
//                       .slice(0, showAllChats ? undefined : 4)
//                       .map((chat, index) => (
//                         <li
//                           key={index}
//                           className="group hover:bg-blue-50 hover:border-blue-100 border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200"
//                         >
//                           <div className="flex items-center space-x-2">
//                             <i className="fas fa-comment-alt text-gray-400"></i>
//                             <span>{chat}</span>
//                           </div>
//                           <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button className="text-gray-400 hover:text-blue-500">
//                               <i className="fas fa-pen"></i>
//                             </button>
//                             <button className="text-gray-400 hover:text-blue-500">
//                               <i className="fas fa-trash"></i>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                   </ul>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useState, useRef, useEffect } from 'react';
// import * as echarts from 'echarts';
// import './index.css';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
// }

// const Greeting: React.FC = () => {
//   const [displayText, setDisplayText] = useState('');
//   const hour = new Date().getHours();
//   const greetingText = hour >= 0 && hour < 12
//     ? 'Good morning'
//     : hour >= 12 && hour < 16
//       ? 'Good afternoon'
//       : 'Good evening';

//   useEffect(() => {
//     let currentText = '';
//     const fullText = `${greetingText}, Ved`;
//     let currentIndex = 0;

//     const interval = setInterval(() => {
//       if (currentIndex < fullText.length) {
//         currentText += fullText[currentIndex];
//         setDisplayText(currentText);
//         currentIndex++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, [greetingText]);

//   return (
//     <h1 className="text-4xl font-light text-center">{displayText}</h1>
//   );
// };

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);

//   const todayChats = [
//     'Chat1',
//     'Chat1',
//     'Chat1',
//     'Chat1',
//   ];

//   const yesterdayChats = [
//     'Chat2',
//     'Chat2',
//     'Chat2'
//   ];

//   const previousChats = [
//     'Chat3',
//     'Chat3'
//   ];

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   const handleSendMessage = () => {
//     if (!inputText.trim()) return;
//     setShowGreeting(false); // Hide greeting when message is sent
//     setIsChatActive(true); // Activate chat mode
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: inputText,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending'
//     };
//     setMessages(prev => [...prev, newMessage]);
//     setInputText('');
//     setIsGenerating(true);

//     setTimeout(() => {
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: 'I understand your query. Let me help you with that...',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };
//       setMessages(prev => [...prev, aiResponse]);
//       setIsGenerating(false);
//     }, 1000);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800">
//       {/* Left Sidebar */}
//       <div className={`${isSidebarOpen ? 'translate-x-0 w-72 min-w-[288px]' : '-translate-x-full w-0'} fixed md:relative h-full bg-white/90 backdrop-blur-sm border-r border-gray-200 p-4 flex flex-col shadow-lg overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
//         <div className="flex items-center justify-between mb-6">
//           <div className="text-blue-400 text-2xl">
//             <i className="fas fa-robot"></i>
//           </div>
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-gray-600 transition-colors">
//             <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//           </button>
//         </div>
//         <div className="mb-6">
//           <div className="flex items-center mb-4">
//             <i className="fas fa-comment-alt mr-2"></i>
//             <span>ChatGPT</span>
//           </div>
//           <div className="flex items-center mb-4">
//             <i className="fas fa-th mr-2"></i>
//             <span>Explore GPTs</span>
//           </div>
//         </div>
//         <div className="space-y-6">
//           <div>
//             <h3 className="text-gray-400 mb-2">Today</h3>
//             <ul className="space-y-2">
//               {todayChats.map((chat, index) => (
//                 <li key={index} className="group hover:bg-gray-100 rounded-lg p-2 cursor-pointer flex items-center justify-between">
//                   <span>{chat}</span>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-pen text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500"></i>
//                     <i className="fas fa-trash text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"></i>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-gray-400 mb-2">Yesterday</h3>
//             <ul className="space-y-2">
//               {yesterdayChats.map((chat, index) => (
//                 <li key={index} className="group hover:bg-gray-100 rounded-lg p-2 cursor-pointer flex items-center justify-between">
//                   <span>{chat}</span>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-pen text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500"></i>
//                     <i className="fas fa-trash text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"></i>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div>
//             <h3 className="text-gray-400 mb-2">Previous 7 Days</h3>
//             <ul className="space-y-2">
//               {previousChats.map((chat, index) => (
//                 <li key={index} className="group hover:bg-gray-100 rounded-lg p-2 cursor-pointer flex items-center justify-between">
//                   <span>{chat}</span>
//                   <div className="flex items-center space-x-2">
//                     <i className="fas fa-pen text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-blue-500"></i>
//                     <i className="fas fa-trash text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500"></i>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out">
//         {!isSidebarOpen && (
//           <button onClick={() => setIsSidebarOpen(true)} className="fixed left-4 top-3 z-50 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors">
//             <i className="fas fa-bars text-gray-600"></i>
//           </button>
//         )}

//         {/* Top Navigation */}
//         <div className="h-14 bg-white/90 backdrop-blur-sm border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="block md:hidden mr-4 text-gray-600 hover:text-gray-800 transition-colors">
//             <i className="fas fa-bars text-xl"></i>
//           </button>
//           <div className="flex items-center flex-1 max-w-xl">
//             <div className="relative w-full">
//               <input
//                 type="search"
//                 placeholder="Search conversations..."
//                 className="w-full pl-10 pr-4 py-1.5 mt-0.5 bg-gray-100 border-none rounded-full text-gray-800 focus:ring-2 focus:ring-blue-400"
//               />
//               <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 mt-0.5"></i>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <span className="text-gray-400">Using limited free plan</span>
//             <button className="ml-2 text-purple-400 hover:text-purple-300">Upgrade</button>
//           </div>
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 overflow-y-auto p-6 pb-32">
//           <div className={`max-w-4xl w-full mx-auto space-y-6 transition-all duration-500 ${isChatActive ? 'chat-active' : ''}`}>
//             {/* Centered Greeting */}
//             {showGreeting && (
//               <div className="flex justify-center items-center min-h-[200px]">
//                 <Greeting />
//               </div>
//             )}

//             {/* Messages Area */}
//             <div className={`space-y-4 mb-6 transition-all duration-500 ${
//               isChatActive ? 'mt-0' : 'mt-6'
//             }`}>
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-lg p-4 ${
//                       message.type === 'user'
//                         ? 'bg-indigo-600 text-white'
//                         : 'bg-gray-800 text-gray-200'
//                     }`}
//                   >
//                     <div className="flex items-center mb-1">
//                       <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                       <span className="text-sm opacity-75">
//                         {new Date(message.timestamp).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <p>{message.content}</p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />  
//             </div>

//             {/* Input Area - Simplified */}
//             <div className={`transition-all duration-500 ${
//               isChatActive 
//                 ? 'fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl'
//                 : 'sticky bottom-0 w-full'
//             }`}>
//               <div className="max-w-4xl mx-auto">
//                 <div className="relative bg-white rounded-lg shadow-lg">
//                   <textarea
//                     className="w-full bg-white rounded-lg outline-none resize-none p-4 pr-16 text-gray-800 placeholder-gray-500"
//                     rows={3}
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     placeholder="Type your message..."
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter' && !e.shiftKey) {
//                         e.preventDefault();
//                         handleSendMessage();
//                       }
//                     }}
//                   />
//                   <div className="absolute right-2 bottom-2 flex items-center space-x-2">
//                     <button
//                       className="p-2 text-gray-400 hover:text-indigo-600 rounded-full transition-colors"
//                       onClick={() => setIsMicActive(!isMicActive)}
//                     >
//                       <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                     </button>
//                     <button
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-2.5 transition-colors"
//                       onClick={handleSendMessage}
//                     >
//                       <i className="fas fa-paper-plane"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Components that should disappear in chat mode */}
//           <div className={`transition-all duration-500 ${
//             isChatActive 
//               ? 'opacity-0 h-0 overflow-hidden' 
//               : 'opacity-100 h-auto'
//           }`}>
//             {/* Analysis Chart */}
//             {activeTab === 'analysis' && (
//               <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                 <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                 <div ref={chartRef} style={{ height: '300px' }}></div>
//               </div>
//             )}

//             {/* Analysis Tool Announcement */}
//             {showAnalysisTool && (
//               <div className="bg-white border border-blue-200 rounded-lg p-4 relative shadow-sm">
//                 <div className="flex items-center mb-2">
//                   <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded mr-2">NEW</span>
//                   <span className="font-medium">Analysis tool</span>
//                   <button
//                     className="absolute top-4 right-4"
//                     onClick={() => setShowAnalysisTool(false)}
//                   >
//                     <i className="fas fa-times"></i>
//                   </button>
//                 </div>
//                 <p className="text-gray-400 mb-2">
//                   Upload CSVs for Claude to analyze quantitative data with high accuracy and create interactive data visualizations.
//                 </p>
//                 <a href="#" className="text-purple-400 hover:text-purple-300">Try it out</a>
//               </div>
//             )}

//             {/* Recent Chats */}
//             <div className="mt-6">
//               <div className="flex items-center justify-between mb-4">
//                 <div className="flex items-center">
//                   <i className="fas fa-history mr-2"></i>
//                   <span>Your recent chats</span>
//                   <button
//                     className="ml-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//                     onClick={() => setIsShowingChats(!isShowingChats)}
//                   >
//                     {isShowingChats ? 'Hide' : 'Show'}
//                   </button>
//                 </div>
//                 <button
//                   onClick={() => setShowAllChats(!showAllChats)}
//                   className="text-gray-400 hover:text-gray-500 transition-colors"
//                 >
//                   {showAllChats ? 'Show less' : 'View all'}
//                 </button>
//               </div>
//               {isShowingChats && (
//                 <div className="bg-white rounded-xl shadow-sm p-4 space-y-6">
//                   <div>
//                     <h3 className="text-gray-400 mb-2">Recent Chats</h3>
//                     <ul className="space-y-2">
//                       {[...todayChats, ...yesterdayChats, ...previousChats]
//                         .slice(0, showAllChats ? undefined : 4)
//                         .map((chat, index) => (
//                           <li
//                             key={index}
//                             className="group hover:bg-blue-50 hover:border-blue-100 border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200"
//                           >
//                             <div className="flex items-center space-x-2">
//                               <i className="fas fa-comment-alt text-gray-400"></i>
//                               <span>{chat}</span>
//                             </div>
//                             <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                               <button className="text-gray-400 hover:text-blue-500">
//                                 <i className="fas fa-pen"></i>
//                               </button>
//                               <button className="text-gray-400 hover:text-blue-500">
//                                 <i className="fas fa-trash"></i>
//                               </button>
//                             </div>
//                           </li>
//                         ))}
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;


// import React, { useState, useRef, useEffect } from 'react';
// import * as echarts from 'echarts';
// import './index.css';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
// }

// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;  // Add this property
// }

// const Greeting: React.FC = () => {
//   const [displayText, setDisplayText] = useState('');
//   const hour = new Date().getHours();
//   const greetingText = hour >= 0 && hour < 12
//     ? 'Good morning'
//     : hour >= 12 && hour < 16
//       ? 'Good afternoon'
//       : 'Good evening';

//   useEffect(() => {
//     let currentText = '';
//     const fullText = `${greetingText}, Ved`;
//     let currentIndex = 0;

//     const interval = setInterval(() => {
//       if (currentIndex < fullText.length) {
//         currentText += fullText[currentIndex];
//         setDisplayText(currentText);
//         currentIndex++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, [greetingText]);

//   return (
//     <h1 className="text-4xl font-light text-center">{displayText}</h1>
//   );
// };

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);

//   const toggleDarkMode = () => {
//     setIsDarkMode(prev => !prev);
//   };

//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: `Chat ${chats.length + 1}`,
//       createdAt: new Date(),
//       messages: []
//     };
    
//     setChats(prev => [newChat, ...prev]);
//     setCurrentChat(newChat);
//     setShowGreeting(false);
//     setIsChatActive(true);
//     setMessages([]);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleChatSelect = (chat: Chat) => {
//     setCurrentChat(chat);
//     setMessages(chat.messages);
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
    
//     // On mobile, close sidebar
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent chat selection when clicking delete
    
//     setChats(prev => prev.filter(chat => chat.id !== chatId));
    
//     // If deleting current chat, reset to home
//     if (currentChat?.id === chatId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   const handleSendMessage = () => {
//     if (!inputText.trim() || !currentChat) return;
    
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: inputText,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending'
//     };

//     // Update messages in current chat
//     const updatedChat = {
//       ...currentChat,
//       messages: [...currentChat.messages, newMessage]
//     };

//     setChats(prev => prev.map(chat => 
//       chat.id === currentChat.id ? updatedChat : chat
//     ));
//     setCurrentChat(updatedChat);
//     setMessages(updatedChat.messages);ī
//     setInputText('');
//     setIsGenerating(true);

//     setTimeout(() => {
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: 'I understand your query. Let me help you with that...',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };
//       setMessages(prev => [...prev, aiResponse]);
//       setIsGenerating(false);
//     }, 1000);
//   };

//   return (
//     <div className={`flex h-screen overflow-hidden ${
//       isDarkMode 
//         ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//         : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//     }`}>
//       <div className={`${isSidebarOpen ? 'translate-x-0 w-72 min-w-[288px]' : '-translate-x-full w-0'} fixed md:relative h-full ${
//           isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
//         } backdrop-blur-sm border-r p-4 flex flex-col shadow-lg overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
//         <div className="flex items-center justify-between mb-6">
//           <span 
//             onClick={handleHomeClick}
//             className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-[#FFFFFF]/80 to-[#138808] hover:opacity-90 transition-all duration-300"
//             style={{
//               textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//               WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//               background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//               WebkitBackgroundClip: 'text',
//               letterSpacing: '0.5px'
//             }}
//           >
//             Hind AI
//           </span>
//           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-gray-600 transition-colors">
//             <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//           </button>
//         </div>

//         <nav className="mb-6">
//           <ul className="space-y-2">
//             <li>
//               <button 
//                 onClick={handleNewChat}
//                 className={`w-full flex items-center p-2 rounded-lg transition-colors ${
//                   isDarkMode 
//                     ? 'hover:bg-gray-700 text-gray-200 hover:text-white' 
//                     : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
//                 }`}
//               >
//                 <i className="fas fa-plus-circle mr-3"></i>
//                 <span>New Chat</span>
//               </button>
//             </li>
//           </ul>
//         </nav>

//         {/* Starred Chats Section */}
//         {chats.some(chat => chat.isStarred) && (
//           <div className="mb-6">
//             <h3 className={`text-sm font-medium mb-2 ${
//               isDarkMode ? 'text-gray-400' : 'text-gray-500'
//             }`}>Starred Chats</h3>
//             <ul className="space-y-2">
//               {chats.filter(chat => chat.isStarred).map(chat => (
//                 <li 
//                   key={chat.id}
//                   onClick={() => handleChatSelect(chat)}
//                   className={`group p-2 rounded-lg cursor-pointer flex items-center justify-between ${
//                     isDarkMode 
//                       ? 'hover:bg-gray-700 text-gray-200' 
//                       : 'hover:bg-gray-100 text-gray-700'
//                   } ${currentChat?.id === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                 >
//                   <div className="flex items-center space-x-3">
//                     <i className="fas fa-comment-alt text-gray-400"></i>
//                     <span className="truncate">{chat.title}</span>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={(e) => handleStarChat(chat.id, e)}
//                       className={`p-1.5 rounded-full ${
//                         isDarkMode 
//                           ? 'text-yellow-400' 
//                           : 'text-yellow-500'
//                       }`}
//                     >
//                       <i className="fas fa-star"></i>
//                     </button>
//                     <button
//                       onClick={(e) => handleDeleteChat(chat.id, e)}
//                       className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                         isDarkMode 
//                           ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
//                           : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
//                       }`}
//                     >
//                       <i className="fas fa-trash-alt"></i>
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}

//         <div className={`h-px w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-6`}></div>

//         <div className="flex-1 overflow-y-auto">
//           <ul className="space-y-2">
//             {chats.map(chat => (
//               <li 
//                 key={chat.id}
//                 onClick={() => handleChatSelect(chat)}
//                 className={`group p-2 rounded-lg cursor-pointer flex items-center justify-between ${
//                   isDarkMode 
//                     ? 'hover:bg-gray-700 text-gray-200' 
//                     : 'hover:bg-gray-100 text-gray-700'
//                 } ${currentChat?.id === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//               >
//                 <div className="flex items-center space-x-3">
//                   <i className="fas fa-comment-alt text-gray-400"></i>
//                   <span className="truncate">{chat.title}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={(e) => handleStarChat(chat.id, e)}
//                     className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                       chat.isStarred
//                         ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                         : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                     }`}
//                   >
//                     <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                   </button>
//                   <button
//                     onClick={(e) => handleDeleteChat(chat.id, e)}
//                     className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                       isDarkMode 
//                         ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
//                         : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
//                     }`}
//                   >
//                     <i className="fas fa-trash-alt"></i>
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>

//       <div className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out">
//         <div className={`h-14 ${
//           isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
//         } backdrop-blur-sm border-b flex items-center justify-between px-4 shadow-sm w-full`}>
//           {/* Left section - Updated visibility logic */}
//           <div className="flex items-center gap-4">
//             {!isSidebarOpen && (
//               <>
//                 <button 
//                   onClick={() => setIsSidebarOpen(true)} 
//                   className={`p-2 transition-colors ${
//                     isDarkMode 
//                       ? 'text-gray-400 hover:text-blue-400' 
//                       : 'text-gray-600 hover:text-blue-600'
//                   }`}
//                 >
//                   <i className="fas fa-bars text-lg"></i>
//                 </button>
                
//                 <a 
//                   href="/" 
//                   className="text-3xl font-medium bg-clip-text text-transparent hover:opacity-90 transition-opacity"
//                   style={{
//                     textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//                     WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//                     background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//                     WebkitBackgroundClip: 'text',
//                     letterSpacing: '0.5px'
//                   }}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     setShowGreeting(true);
//                     setIsChatActive(false);
//                     setMessages([]);
//                   }}
//                 >
//                   Hind AI
//                 </a>
//               </>
//             )}
//           </div>

//           {/* Center section - Search */}
//           <div className="flex-1 flex justify-center max-w-3xl mx-4">
//             <div className="w-full max-w-2xl">
//               <div className="relative">
//                 <input
//                   type="search"
//                   placeholder="Search conversations..."
//                   className={`w-full pl-10 pr-4 py-1.5 ${
//                     isDarkMode 
//                       ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                       : 'bg-gray-100 text-gray-800'
//                   } outline-none rounded-full focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                 />
//                 <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//               </div>
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="flex items-center">
//             <button
//               onClick={toggleDarkMode}
//               className={`p-2 rounded-full ${
//                 isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'
//               } hover:bg-opacity-80 transition-colors`}
//             >
//               <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto p-6 pb-32">
//           <div className={`max-w-4xl w-full mx-auto space-y-6 transition-all duration-500 ${isChatActive ? 'chat-active' : ''}`}>
//             {showGreeting && (
//               <div className="flex justify-center items-center min-h-[200px]">
//                 <Greeting />
//               </div>
//             )}

//             <div className={`space-y-4 mb-6 transition-all duration-500 ${
//               isChatActive ? 'mt-0' : 'mt-6'
//             }`}>
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                 >
//                   <div
//                     className={`max-w-[80%] rounded-3xl p-4 message-bubble ${
//                       message.type === 'user'
//                         ? 'bg-indigo-600 text-white user-message rounded-br-lg'
//                         : 'bg-gray-800 text-gray-200 assistant-message rounded-bl-lg'
//                     }`}
//                   >
//                     <div className="flex items-center mb-1">
//                       {message.type === 'user' && (
//                         <i className="fas fa-user mr-2 opacity-75"></i>
//                       )}
//                       <span className="text-sm opacity-75">
//                         {new Date(message.timestamp).toLocaleTimeString()}
//                       </span>
//                     </div>
//                     <p className="text-base leading-relaxed">{message.content}</p>
//                   </div>
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />  
//             </div>

//             <div className={`transition-all duration-500 ${
//               isChatActive 
//                 ? 'fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl'
//                 : 'sticky bottom-0 w-full'
//             }`}>
//               <div className="max-w-4xl mx-auto">
//                 <div className={`relative rounded-lg shadow-lg chat-glow ${
//                   isDarkMode ? 'bg-gray-800' : 'bg-white'
//                 }`}>
//                   <textarea
//                     className={`w-full rounded-lg outline-none resize-none p-4 pr-16 ${
//                       isDarkMode 
//                         ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' 
//                         : 'bg-white text-gray-800 placeholder-gray-500 border-gray-200'
//                     }`}
//                     rows={3}
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     placeholder="Type your message..."
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter' && !e.shiftKey) {
//                         e.preventDefault();
//                         handleSendMessage();
//                       }
//                     }}
//                   />
//                   <div className="absolute right-2 bottom-2 flex items-center space-x-2">
//                     <button
//                       className={`p-2 rounded-full transition-colors ${
//                         isDarkMode 
//                           ? 'text-gray-400 hover:text-blue-400' 
//                           : 'text-gray-400 hover:text-indigo-600'
//                       }`}
//                       onClick={() => setIsMicActive(!isMicActive)}
//                     >
//                       <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                     </button>
//                     <button
//                       className={`rounded-full p-2.5 transition-colors ${
//                         isDarkMode 
//                           ? 'bg-blue-600 hover:bg-blue-700' 
//                           : 'bg-indigo-600 hover:bg-indigo-700'
//                       } text-white`}
//                       onClick={handleSendMessage}
//                     >
//                       <i className="fas fa-paper-plane"></i>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className={`transition-all duration-500 ${
//             isChatActive 
//               ? 'opacity-0 h-0 overflow-hidden' 
//               : 'opacity-100 h-auto'
//           }`}>
//             {activeTab === 'analysis' && (
//               <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                 <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                 <div ref={chartRef} style={{ height: '300px' }}></div>
//               </div>
//             )}

//             <div className="mt-6 space-y-8">
//               {/* Starred Chats Section */}
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     <i className="fas fa-star mr-2 text-yellow-500"></i>
//                     <span>Starred chats</span>
//                   </div>
//                 </div>
//                 {chats.some(chat => chat.isStarred) ? (
//                   <div className={`${
//                     isDarkMode 
//                       ? 'bg-gray-800 shadow-gray-900/20' 
//                       : 'bg-white shadow-sm'
//                   } rounded-xl p-4`}>
//                     <ul className="space-y-2">
//                       {chats
//                         .filter(chat => chat.isStarred)
//                         .map((chat, index) => (
//                           <li
//                             key={index}
//                             className={`group ${
//                               isDarkMode 
//                                 ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                 : 'hover:bg-blue-50 hover:border-blue-100'
//                               } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                           >
//                             <div className="flex items-center space-x-2">
//                               <i className="fas fa-comment-alt text-gray-400"></i>
//                               <span>{chat.title}</span>
//                             </div>
//                             <i className="fas fa-star text-yellow-500"></i>
//                           </li>
//                         ))}
//                     </ul>
//                   </div>
//                 ) : (
//                   <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                     No starred chats yet
//                   </p>
//                 )}
//               </div>

//               {/* Recent Chats Section */}
//               <div>
//                 <div className="flex items-center justify-between mb-4">
//                   <div className="flex items-center">
//                     <i className="fas fa-history mr-2"></i>
//                     <span>Your recent chats</span>
//                     <button
//                       className={`ml-2 px-3 py-1 rounded-full transition-colors ${
//                         isDarkMode 
//                           ? 'bg-gray-700 hover:bg-gray-600' 
//                           : 'bg-gray-100 hover:bg-gray-200'
//                       }`}
//                       onClick={() => setIsShowingChats(!isShowingChats)}
//                     >
//                       {isShowingChats ? 'Hide' : 'Show'}
//                     </button>
//                   </div>
//                   {isShowingChats && chats.length > 3 && (
//                     <button
//                       onClick={() => setShowAllChats(!showAllChats)}
//                       className="text-gray-400 hover:text-gray-500 transition-colors"
//                     >
//                       {showAllChats ? 'Show less' : 'View all'}
//                     </button>
//                   )}
//                 </div>
//                 {isShowingChats && (
//                   <div className={`${
//                     isDarkMode 
//                       ? 'bg-gray-800 shadow-gray-900/20' 
//                       : 'bg-white shadow-sm'
//                   } rounded-xl p-4`}>
//                     {chats.length > 0 ? (
//                       <ul className="space-y-2">
//                         {chats
//                           .slice(0, showAllChats ? undefined : 3)
//                           .map((chat, index) => (
//                             <li
//                               key={index}
//                               className={`group ${
//                                 isDarkMode 
//                                   ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                   : 'hover:bg-blue-50 hover:border-blue-100'
//                                 } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                             >
//                               <div className="flex items-center space-x-2">
//                                 <i className="fas fa-comment-alt text-gray-400"></i>
//                                 <span>{chat.title}</span>
//                               </div>
//                               <button
//                                 onClick={(e) => handleStarChat(chat.id, e)}
//                                 className={`transition-colors ${
//                                   chat.isStarred
//                                     ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                                     : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                                 }`}
//                               >
//                                 <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                               </button>
//                             </li>
//                           ))}
//                       </ul>
//                     ) : (
//                       <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                         No recent chats available
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;



// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;  // Add this property
// }

// const Greeting: React.FC = () => {
//   const [displayText, setDisplayText] = useState('');
//   const hour = new Date().getHours();
//   const greetingText = hour >= 0 && hour < 12
//     ? 'Good morning'
//     : hour >= 12 && hour < 16
//       ? 'Good afternoon'
//       : 'Good evening';

//   useEffect(() => {
//     let currentText = '';
//     const fullText = `${greetingText}, Ved`;
//     let currentIndex = 0;

//     const interval = setInterval(() => {
//       if (currentIndex < fullText.length) {
//         currentText += fullText[currentIndex];
//         setDisplayText(currentText);
//         currentIndex++;
//       } else {
//         clearInterval(interval);
//       }
//     }, 100);

//     return () => clearInterval(interval);
//   }, [greetingText]);

//   return (
//     <h1 className="text-4xl font-light text-center">{displayText}</h1>
//   );
// };

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');

//   const models = [
//     { id: 'gpt4', name: 'GPT-4', icon: 'fa-robot' },
//     { id: 'claude', name: 'Claude 3', icon: 'fa-brain' },
//     { id: 'nextchat', name: 'NextChat', icon: 'fa-comment-dots' },
//   ];

//   const toggleDarkMode = () => {
//     setIsDarkMode(prev => !prev);
//   };

//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: `Chat ${chats.length + 1}`,
//       createdAt: new Date(),
//       messages: []
//     };
    
//     setChats(prev => [newChat, ...prev]);
//     setCurrentChat(newChat);
//     setShowGreeting(false);
//     setIsChatActive(true);
//     setMessages([]);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleChatSelect = (chat: Chat) => {
//     setCurrentChat(chat);
//     setMessages(chat.messages);
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
    
//     // On mobile, close sidebar
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent chat selection when clicking delete
    
//     setChats(prev => prev.filter(chat => chat.id !== chatId));
    
//     // If deleting current chat, reset to home
//     if (currentChat?.id === chatId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   const handleSendMessage = async () => {
//     if (!inputText.trim() || isGenerating) return;
    
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: inputText,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending'
//     };

//     try {
//       // Add user message immediately
//       setMessages(prev => [...prev, newMessage]);
//       setInputText('');
//       setIsGenerating(true);

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Update user message status to sent
//       setMessages(prev => prev.map(msg => 
//         msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
//       ));

//       // Create and add AI response
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: 'I understand your query. Let me help you with that...',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };

//       setMessages(prev => [...prev, aiResponse]);

//     } catch (error) {
//       console.error('Failed to send message:', error);
      
//       // Update message status to error
//       setMessages(prev => prev.map(msg => 
//         msg.id === newMessage.id ? { ...msg, status: 'error' } : msg
//       ));
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Add this helper function to render message status
//   const renderMessageStatus = (status: Message['status']) => {
//     switch (status) {
//       case 'sending':
//         return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2"></i>;
//       case 'sent':
//         return <i className="fas fa-check text-green-400 ml-2"></i>;
//       case 'error':
//         return <i className="fas fa-exclamation-circle text-red-400 ml-2"></i>;
//       default:
//         return null;
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       // Create object URL for preview
//       const fileUrl = URL.createObjectURL(file);
      
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: `Uploaded: ${file.name}`,
//         type: 'user',
//         timestamp: new Date(),
//         status: 'sent',
//         file: {
//           name: file.name,
//           type: file.type,
//           url: fileUrl
//         }
//       };
  
//       if (currentChat) {
//         const updatedChat = {
//           ...currentChat,
//           messages: [...currentChat.messages, newMessage]
//         };
  
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       }
//     });
  
//     setIsUploadModalOpen(false);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleAuthSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormError('');
//     setFormSuccess('');
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     if (isLogin) {
//       setFormSuccess('Successfully logged in!');
//     } else {
//       setFormSuccess('Account created successfully!');
//     }
    
//     setLoading(false);
//     setTimeout(() => {
//       setIsLoginModalOpen(false);
//       setFormSuccess('');
//     }, 1500);
//   };

//   return (
//     <>
//       {isLoginModalOpen ? (
//         <AuthPage
//           onClose={() => setIsLoginModalOpen(false)}
//           isDarkMode={isDarkMode}
//           onToggleDarkMode={toggleDarkMode}
//           initialMode={isLogin ? 'signin' : 'signup'}
//         />
//       ) : (
//         <div className={`flex h-screen overflow-hidden ${
//           isDarkMode 
//             ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//             : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//         }`}>
//           <div className={`${isSidebarOpen ? 'translate-x-0 w-72 min-w-[288px]' : '-translate-x-full w-0'} fixed md:relative h-full ${
//               isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
//             } backdrop-blur-sm border-r p-4 flex flex-col shadow-lg overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
//             <div className=" flex items-center justify-between mb-6">
//               <span 
//                 onClick={handleHomeClick}
//                 className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-[#FFFFFF]/80 to-[#138808] hover:opacity-90 transition-all duration-300"
//                 style={{
//                   textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//                   WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//                   background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//                   WebkitBackgroundClip: 'text',
//                   letterSpacing: '0.5px'
//                 }}
//               >
//                 Hind AI
//               </span>
//               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-gray-600 transition-colors">
//                 <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//               </button>
//             </div>

//             <nav className="mb-6">
//               <ul className="space-y-2">
//                 <li>
//                   <button 
//                     onClick={handleNewChat}
//                     className={`w-full flex items-center p-2 rounded-lg transition-colors ${
//                       isDarkMode 
//                         ? 'hover:bg-gray-700 text-gray-200 hover:text-white' 
//                         : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
//                     }`}
//                   >
//                     <i className="fas fa-plus-circle mr-3"></i>
//                     <span>New Chat</span>
//                   </button>
//                 </li>
//               </ul>
              
//               {/* Add search bar below New Chat */}
//               <div className="mt-3">
//                 <div className="relative">
//                   <input
//                     type="search"
//                     placeholder="Search conversations..."
//                     className={`w-full pl-9 pr-4 py-2 ${
//                       isDarkMode 
//                         ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                         : 'bg-gray-100 text-gray-800'
//                     } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                   />
//                   <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//                 </div>
//               </div>
//             </nav>

//             {/* Starred Chats Section */}
//             {chats.some(chat => chat.isStarred) && (
//               <div className="mb-6">
//                 <h3 className={`text-sm font-medium mb-2 ${
//                   isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                 }`}>Starred Chats</h3>
//                 <ul className="space-y-2">
//                   {chats.filter(chat => chat.isStarred).map(chat => (
//                     <li 
//                       key={chat.id}
//                       onClick={() => handleChatSelect(chat)}
//                       className={`group p-2 rounded-lg cursor-pointer flex items-center justify-between ${
//                         isDarkMode 
//                           ? 'hover:bg-gray-700 text-gray-200' 
//                           : 'hover:bg-gray-100 text-gray-700'
//                       } ${currentChat?.id === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                     >
//                       <div className="flex items-center space-x-3">
//                         <i className="fas fa-comment-alt text-gray-400"></i>
//                         <span className="truncate">{chat.title}</span>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={(e) => handleStarChat(chat.id, e)}
//                           className={`p-1.5 rounded-full ${
//                             isDarkMode 
//                               ? 'text-yellow-400' 
//                               : 'text-yellow-500'
//                           }`}
//                         >
//                           <i className="fas fa-star"></i>
//                         </button>
//                         <button
//                           onClick={(e) => handleDeleteChat(chat.id, e)}
//                           className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                             isDarkMode 
//                               ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
//                               : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
//                           }`}
//                         >
//                           <i className="fas fa-trash-alt"></i>
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             <div className={`h-px w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-6`}></div>

//             <div className="flex-1 overflow-y-auto">
//               <ul className="space-y-2">
//                 {chats.map(chat => (
//                   <li 
//                     key={chat.id}
//                     onClick={() => handleChatSelect(chat)}
//                     className={`group p-2 rounded-lg cursor-pointer flex items-center justify-between ${
//                       isDarkMode 
//                         ? 'hover:bg-gray-700 text-gray-200' 
//                         : 'hover:bg-gray-100 text-gray-700'
//                     } ${currentChat?.id === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                   >
//                     <div className="flex items-center space-x-3">
//                       <i className="fas fa-comment-alt text-gray-400"></i>
//                       <span className="truncate">{chat.title}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={(e) => handleStarChat(chat.id, e)}
//                         className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                           chat.isStarred
//                             ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                             : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                         }`}
//                       >
//                         <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                       </button>
//                       <button
//                         onClick={(e) => handleDeleteChat(chat.id, e)}
//                         className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                           isDarkMode 
//                             ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
//                             : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
//                         }`}
//                       >
//                         <i className="fas fa-trash-alt"></i>
//                       </button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           <div className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out">
//             <div className={`h-14 ${
//               isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
//             } backdrop-blur-sm border-b flex items-center justify-between px-4 shadow-sm w-full`}>
//               {/* Left section - Updated visibility logic */}
//               <div className="flex items-center gap-4">
//                 {!isSidebarOpen && (
//                   <>
//                     <button 
//                       onClick={() => setIsSidebarOpen(true)} 
//                       className={`p-2 transition-colors ${
//                         isDarkMode 
//                           ? 'text-gray-400 hover:text-blue-400' 
//                           : 'text-gray-600 hover:text-blue-600'
//                       }`}
//                     >
//                       <i className="fas fa-bars text-lg"></i>
//                     </button>
                    
//                     <a 
//                       href="/" 
//                       className=" text-3xl font-medium bg-clip-text text-transparent hover:opacity-90 transition-opacity"
//                       style={{
//                         textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//                         WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//                         background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//                         WebkitBackgroundClip: 'text',
//                         letterSpacing: '0.5px'
//                       }}
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setShowGreeting(true);
//                         setIsChatActive(false);
//                         setMessages([]);
//                       }}
//                     >
//                       Hind AI
//                     </a>
//                   </>
//                 )}
//               </div>

//               {/* Right section */}
//               <div className="flex items-center space-x-4">
//                 {/* Login Button */}
//                 <button
//                   onClick={() => {
//                     setIsLogin(true);
//                     setIsLoginModalOpen(true);
//                   }}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                     isDarkMode
//                       ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
//                       : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
//                   }`}
//                 >
//                   Login
//                 </button>

//                 {/* Signup Button */}
//                 <button
//                   onClick={() => {
//                     setIsLogin(false);
//                     setIsLoginModalOpen(true);
//                   }}
//                   className={`px-4 py-2 rounded-lg font-medium transition-all ${
//                     isDarkMode
//                       ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                       : 'bg-indigo-600 hover:bg-indigo-700 text-white'
//                   }`}
//                 >
//                   Sign Up
//                 </button>

//                 {/* Dark Mode Toggle */}
//                 <button
//                   onClick={toggleDarkMode}
//                   className={`p-2 rounded-full ${
//                     isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'
//                   } hover:bg-opacity-80 transition-colors`}
//                 >
//                   <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
//                 </button>
//               </div>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6 pb-32">
//               <div className={`max-w-4xl w-full mx-auto space-y-6 transition-all duration-500 ${isChatActive ? 'chat-active' : ''}`}>
//                 {showGreeting && (
//                   <div className="flex justify-center items-center min-h-[200px]">
//                     <Greeting />
//                   </div>
//                 )}

//                 <div className={`space-y-4 mb-6 transition-all duration-500 ${
//                   isChatActive ? 'mt-0' : 'mt-6'
//                 }`}>
//                   {messages.map((message) => (
//                     <div
//                       key={message.id}
//                       className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                     >
//                       <div
//                         className={`max-w-[80%] rounded-3xl p-4 message-bubble ${
//                           message.type === 'user'
//                             ? 'bg-indigo-600 text-white user-message rounded-br-lg'
//                             : 'bg-gray-800 text-gray-200 assistant-message rounded-bl-lg'
//                         }`}
//                       >
//                         <div className="flex items-center justify-between mb-1">
//                           <div className="flex items-center">
//                             <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                             <span className="text-sm opacity-75">
//                               {new Date(message.timestamp).toLocaleTimeString()}
//                             </span>
//                           </div>
//                           {renderMessageStatus(message.status)}
//                         </div>
                        
//                         {/* Add file preview */}
//                         {message.file && (
//                           <div className="mb-2">
//                             {message.file.type.startsWith('image/') ? (
//                               <div className="relative rounded-lg overflow-hidden">
//                                 <img 
//                                   src={message.file.url} 
//                                   alt={message.file.name}
//                                   className="max-w-full h-auto rounded-lg"
//                                 />
//                                 <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
//                                   <div className="flex items-center">
//                                     <i className="fas fa-image mr-2"></i>
//                                     <span className="truncate">{message.file.name}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             ) : message.file.type === 'application/pdf' ? (
//                               <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                 <i className="fas fa-file-pdf text-2xl text-red-400"></i>
//                                 <div className="flex-1 min-w-0">
//                                   <div className="truncate">{message.file.name}</div>
//                                   <div className="text-sm opacity-75">PDF Document</div>
//                                 </div>
//                                 <a 
//                                   href={message.file.url} 
//                                   target="_blank" 
//                                   rel="noopener noreferrer"
//                                   className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                 >
//                                   <i className="fas fa-external-link-alt"></i>
//                                 </a>
//                               </div>
//                             ) : (
//                               <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                 <i className="fas fa-file text-2xl text-blue-400"></i>
//                                 <div className="flex-1 min-w-0">
//                                   <div className="truncate">{message.file.name}</div>
//                                   <div className="text-sm opacity-75">Document</div>
//                                 </div>
//                                 <a 
//                                   href={message.file.url} 
//                                   target="_blank" 
//                                   rel="noopener noreferrer"
//                                   className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                 >
//                                   <i className="fas fa-download"></i>
//                                 </a>
//                               </div>
//                             )}
//                           </div>
//                         )}
                        
//                         <p className="text-base leading-relaxed">{message.content}</p>
//                       </div>
//                     </div>
//                   ))}
//                   <div ref={messagesEndRef} />  
//                 </div>

//                 <div className={`transition-all duration-500 ${
//                   isChatActive 
//                     ? 'fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl'
//                     : 'sticky bottom-0 w-full'
//                 }`}>
//                   <div className="max-w-4xl mx-auto">
//                     <div className={`relative rounded-lg shadow-lg chat-glow ${
//                       isDarkMode ? 'bg-gray-800' : 'bg-white'
//                     }`}>
//                       {/* File Preview Banner */}
//                       {messages.length > 0 && messages[messages.length - 1].file && (
//                         <div className={`w-full px-4 py-2 border-b ${
//                           isDarkMode 
//                             ? 'bg-gray-700/50 border-gray-600' 
//                             : 'bg-gray-50/50 border-gray-200'
//                         }`}>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <i className={`fas ${
//                                 messages[messages.length - 1].file?.type.startsWith('image/')
//                                   ? 'fa-image text-green-400'
//                                   : messages[messages.length - 1].file?.type === 'application/pdf'
//                                     ? 'fa-file-pdf text-red-400'
//                                     : 'fa-file text-blue-400'
//                               }`}></i>
//                               <span className="text-sm truncate max-w-[200px]">
//                                 {messages[messages.length - 1].file?.name}
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                 File attached
//                               </span>
//                               <i className="fas fa-check text-green-400"></i>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       <textarea
//                         className={`w-full rounded-lg outline-none resize-none p-4 pr-16 ${
//                           isDarkMode 
//                             ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' 
//                             : 'bg-white text-gray-800 placeholder-gray-500 border-gray-200'
//                         }`}
//                         rows={3}
//                         value={inputText}
//                         onChange={(e) => setInputText(e.target.value)}
//                         placeholder={`Message ${selectedModel}...`}
//                         onKeyDown={(e) => {
//                           if (e.key === 'Enter' && !e.shiftKey) {
//                             e.preventDefault();
//                             handleSendMessage();
//                           }
//                         }}
//                       />
//                       <div className="absolute right-2 bottom-2 flex items-center space-x-2">
//                         <button
//                           className={`p-2 rounded-full transition-colors ${
//                             isDarkMode 
//                               ? 'text-gray-400 hover:text-blue-400' 
//                               : 'text-gray-400 hover:text-indigo-600'
//                           }`}
//                           onClick={() => setIsUploadModalOpen(true)}
//                         >
//                           <i className="fas fa-paperclip"></i>
//                         </button>
                        
//                         <button
//                           className={`p-2 rounded-full transition-colors ${
//                             isDarkMode 
//                               ? 'text-gray-400 hover:text-blue-400' 
//                               : 'text-gray-400 hover:text-indigo-600'
//                           }`}
//                           onClick={() => setIsMicActive(!isMicActive)}
//                         >
//                           <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                         </button>
//                         <button
//                           className={`rounded-full p-2.5 transition-colors ${
//                             isDarkMode 
//                               ? 'bg-blue-600 hover:bg-blue-700' 
//                               : 'bg-indigo-600 hover:bg-indigo-700'
//                           } text-white`}
//                           onClick={handleSendMessage}
//                         >
//                           <i className="fas fa-paper-plane"></i>
//                         </button>
//                       </div>

//                       {/* File Upload Modal */}
//                       {isUploadModalOpen && (
//                         <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
//                           <div 
//                             className={`relative w-full max-w-md mx-4 p-6 rounded-xl shadow-lg ${
//                               isDarkMode ? 'bg-gray-800' : 'bg-white'
//                             }`}
//                           >
//                             <button 
//                               onClick={() => setIsUploadModalOpen(false)}
//                               className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//                             >
//                               <i className="fas fa-times"></i>
//                             </button>
                            
//                             <div 
//                               onDragOver={handleDragOver}
//                               onDragLeave={handleDragLeave}
//                               onDrop={handleDrop}
//                               className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                                 isDragging
//                                   ? (isDarkMode ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50')
//                                   : (isDarkMode ? 'border-gray-600' : 'border-gray-300')
//                               } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                             >
//                               <i className="fas fa-cloud-upload-alt text-4xl mb-4"></i>
//                               <p className="mb-2">Drag and drop files here</p>
//                               <p className="text-sm opacity-75">or</p>
//                               <button
//                                 onClick={() => fileInputRef.current?.click()}
//                                 className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
//                                   isDarkMode
//                                     ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                                     : 'bg-blue-500 hover:bg-blue-600 text-white'
//                                 }`}
//                               >
//                                 Choose Files
//                               </button>
//                               <input
//                                 ref={fileInputRef}
//                                 type="file"
//                                 multiple
//                                 className="hidden"
//                                 onChange={handleFileInput}
//                               />
//                               <p className="mt-4 text-sm opacity-75">
//                                 Supported files: Images, PDFs, Documents
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       )}
//                     </div>

//                     {/* Add model selection footer */}
//                     <div className="flex justify-between items-center mt-3 text-sm px-2">
//                       <div className="flex items-center space-x-4">
//                         <div className="relative">
//                           <button
//                             onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
//                             className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg ${
//                               isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                             }`}
//                           >
//                             <i className={`fas ${models.find(m => m.name === selectedModel)?.icon}`}></i>
//                             <span>{selectedModel}</span>
//                             <i className={`fas fa-chevron-${isModelDropdownOpen ? 'up' : 'down'} text-xs ml-1`}></i>
//                           </button>

//                           {isModelDropdownOpen && (
//                             <div className={`absolute bottom-full mb-2 left-0 w-48 ${
//                               isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//                             } border rounded-lg shadow-lg overflow-hidden z-50`}>
//                               {models.map(model => (
//                                 <button
//                                   key={model.id}
//                                   className={`w-full flex items-center px-4 py-2 ${
//                                     isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                                   } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                                   onClick={() => {
//                                     setSelectedModel(model.name);
//                                     setIsModelDropdownOpen(false);
//                                   }}
//                                 >
//                                   <i className={`fas ${model.icon} mr-2`}></i>
//                                   <span>{model.name}</span>
//                                   {selectedModel === model.name && (
//                                     <i className="fas fa-check ml-auto"></i>
//                                   )}
//                                 </button>
//                               ))}
//                             </div>
//                           )}
//                         </div>
                        
                        
//                       </div>
//                       <button className={`text-sm ${
//                         isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'
//                       }`}>
                        
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className={`transition-all duration-500 ${
//                 isChatActive 
//                   ? 'opacity-0 h-0 overflow-hidden' 
//                   : 'opacity-100 h-auto'
//               }`}>
//                 {activeTab === 'analysis' && (
//                   <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                     <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                     <div ref={chartRef} style={{ height: '300px' }}></div>
//                   </div>
//                 )}

//                 <div className="mt-6 space-y-8">
//                   {/* Starred Chats Section */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         <i className="fas fa-star mr-2 text-yellow-500"></i>
//                         <span>Starred chats</span>
//                       </div>
//                     </div>
//                     {chats.some(chat => chat.isStarred) ? (
//                       <div className={`${
//                         isDarkMode 
//                           ? 'bg-gray-800 shadow-gray-900/20' 
//                           : 'bg-white shadow-sm'
//                       } rounded-xl p-4`}>
//                         <ul className="space-y-2">
//                           {chats
//                             .filter(chat => chat.isStarred)
//                             .map((chat, index) => (
//                               <li
//                                 key={index}
//                                 className={`group ${
//                                   isDarkMode 
//                                     ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                     : 'hover:bg-blue-50 hover:border-blue-100'
//                                   } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                               >
//                                 <div className="flex items-center space-x-2">
//                                   <i className="fas fa-comment-alt text-gray-400"></i>
//                                   <span>{chat.title}</span>
//                                 </div>
//                                 <i className="fas fa-star text-yellow-500"></i>
//                               </li>
//                             ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         No starred chats yet
//                       </p>
//                     )}
//                   </div>

//                   {/* Recent Chats Section */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         <i className="fas fa-history mr-2"></i>
//                         <span>Your recent chats</span>
//                         <button
//                           className={`ml-2 px-3 py-1 rounded-full transition-colors ${
//                             isDarkMode 
//                               ? 'bg-gray-700 hover:bg-gray-600' 
//                               : 'bg-gray-100 hover:bg-gray-200'
//                           }`}
//                           onClick={() => setIsShowingChats(!isShowingChats)}
//                         >
//                           {isShowingChats ? 'Hide' : 'Show'}
//                         </button>
//                       </div>
//                       {isShowingChats && chats.length > 3 && (
//                         <button
//                           onClick={() => setShowAllChats(!showAllChats)}
//                           className="text-gray-400 hover:text-gray-500 transition-colors"
//                         >
//                           {showAllChats ? 'Show less' : 'View all'}
//                         </button>
//                       )}
//                     </div>
//                     {isShowingChats && (
//                       <div className={`${
//                         isDarkMode 
//                           ? 'bg-gray-800 shadow-gray-900/20' 
//                           : 'bg-white shadow-sm'
//                       } rounded-xl p-4`}>
//                         {chats.length > 0 ? (
//                           <ul className="space-y-2">
//                             {chats
//                               .slice(0, showAllChats ? undefined : 3)
//                               .map((chat, index) => (
//                                 <li
//                                   key={index}
//                                   className={`group ${
//                                     isDarkMode 
//                                       ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                       : 'hover:bg-blue-50 hover:border-blue-100'
//                                     } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                 >
//                                   <div className="flex items-center space-x-2">
//                                     <i className="fas fa-comment-alt text-gray-400"></i>
//                                     <span>{chat.title}</span>
//                                   </div>
//                                   <button
//                                     onClick={(e) => handleStarChat(chat.id, e)}
//                                     className={`transition-colors ${
//                                       chat.isStarred
//                                         ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                                         : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                                     }`}
//                                   >
//                                     <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                                   </button>
//                                 </li>
//                               ))}
//                           </ul>
//                         ) : (
//                           <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                             No recent chats available
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default App;





// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;  // Add this property
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });

//   const models = [
//     { id: 'gpt4', name: 'GPT-4', icon: 'fa-robot' },
//     { id: 'claude', name: 'Claude 3', icon: 'fa-brain' },
//     { id: 'nextchat', name: 'NextChat', icon: 'fa-comment-dots' },
//   ];

//   const toggleDarkMode = () => {
//     setIsDarkMode(prev => !prev);
//   };

//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'New Chat', // Initial title will be updated with first message
//       createdAt: new Date(),
//       messages: []
//     };
    
//     setChats(prev => [newChat, ...prev]);
//     setCurrentChat(newChat);
//     setShowGreeting(false);
//     setIsChatActive(true);
//     setMessages([]);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleChatSelect = (chat: Chat) => {
//     setCurrentChat(chat);
//     setMessages(chat.messages);
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
    
//     // On mobile, close sidebar
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent chat selection when clicking delete
    
//     setChats(prev => prev.filter(chat => chat.id !== chatId));
    
//     // If deleting current chat, reset to home
//     if (currentChat?.id === chatId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   const handleSendMessage = async () => {
//     if (!inputText.trim() || isGenerating) return;
    
//     if (isMicActive) {
//       setIsMicActive(false);
//     }
    
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: inputText,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending'
//     };

//     try {
//       // For both new and existing chats
//       const chat = currentChat || {
//         id: Date.now().toString(),
//         title: 'New Chat',
//         createdAt: new Date(),
//         messages: []
//       };

//       // If this is the first message in the chat, update the title
//       if (chat.messages.length === 0) {
//         chat.title = inputText.length > 30 
//           ? `${inputText.substring(0, 30)}...` 
//           : inputText;
//       }

//       const updatedChat = {
//         ...chat,
//         messages: [...chat.messages, newMessage]
//       };

//       // Update chats list
//       setChats(prev => 
//         currentChat
//           ? prev.map(c => c.id === currentChat.id ? updatedChat : c)
//           : [updatedChat, ...prev]
//       );
      
//       setCurrentChat(updatedChat);
//       setMessages([...updatedChat.messages]);
//       setInputText('');
//       setIsGenerating(true);

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Update message status to sent
//       const updatedMessage = { ...newMessage, status: 'sent' };

//       // Create and add AI response
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: 'I understand your query. Let me help you with that...',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };

//       // Update chat with both messages
//       const finalChat = {
//         ...updatedChat,
//         messages: [...updatedChat.messages.map(msg => 
//           msg.id === newMessage.id ? updatedMessage : msg
//         ), aiResponse]
//       };

//       setChats(prev => prev.map(c => 
//         c.id === finalChat.id ? finalChat : c
//       ));
//       setCurrentChat(finalChat);
//       setMessages(finalChat.messages);

//     } catch (error) {
//       console.error('Failed to send message:', error);
//       setMessages(prev => prev.map(msg => 
//         msg.id === newMessage.id ? { ...msg, status: 'error' } : msg
//       ));
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Add this helper function to render message status
//   const renderMessageStatus = (status: Message['status']) => {
//     switch (status) {
//       case 'sending':
//         return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2"></i>;
//       case 'sent':
//         return <i className="fas fa-check text-green-400 ml-2"></i>;
//       case 'error':
//         return <i className="fas fa-exclamation-circle text-red-400 ml-2"></i>;
//       default:
//         return null;
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       // Create object URL for preview
//       const fileUrl = URL.createObjectURL(file);
      
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: `Uploaded: ${file.name}`,
//         type: 'user',
//         timestamp: new Date(),
//         status: 'sent',
//         file: {
//           name: file.name,
//           type: file.type,
//           url: fileUrl
//         }
//       };
  
//       if (currentChat) {
//         const updatedChat = {
//           ...currentChat,
//           messages: [...currentChat.messages, newMessage]
//         };
  
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       }
//     });
  
//     setIsUploadModalOpen(false);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleAuthSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormError('');
//     setFormSuccess('');
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     if (isLogin) {
//       setFormSuccess('Successfully logged in!');
//     } else {
//       setFormSuccess('Account created successfully!');
//     }
    
//     setLoading(false);
//     setTimeout(() => {
//       setIsLoginModalOpen(false);
//       setFormSuccess('');
//     }, 1500);
//   };

//   // Add completion handler
//   const handleIntroductionComplete = (name: string) => {
//     setUserName(name);
//     setShowIntroduction(false);
//     setShowGreeting(true);
//   };

//   // Handle successful signup
//   const handleSignupSuccess = (userData: { name: string; email: string }) => {
//     handleAuthSuccess(userData);
//     setShowIntroduction(true);
//   };

//   // Add this new handler for successful authentication
//   const handleAuthSuccess = (userData: { name: string; email: string }) => {
//     setIsAuthenticated(true);
//     setUserProfile(userData);
//     setIsLoginModalOpen(false);
//     // Clear any existing chat data when a new user logs in
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//   };

//   // Add logout handler
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserProfile(null);
//     // Clear all user data
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setActiveChat(null);
//     setStarredChats([]);
//   };

//   // Create a memoized version of the Greeting component
//   const Greeting = React.memo(() => {
//     const [displayText, setDisplayText] = useState('');
//     const [hasTyped, setHasTyped] = useState(false);
//     const hour = new Date().getHours();
//     const greetingText = hour >= 0 && hour < 12
//       ? 'Good morning'
//       : hour >= 12 && hour < 16
//         ? 'Good afternoon'
//         : 'Good evening';

//     useEffect(() => {
//       if (!hasTyped) {
//         const fullText = `${greetingText}, ${userName || 'Ved'}`;
//         let timeouts: NodeJS.Timeout[] = [];

//         [...fullText].forEach((char, index) => {
//           const timeout = setTimeout(() => {
//             setDisplayText(prev => prev + char);
//             if (index === fullText.length - 1) {
//               setHasTyped(true);
//             }
//           }, 100 * index);
//           timeouts.push(timeout);
//         });

//         return () => timeouts.forEach(clearTimeout);
//       }
//     }, []); // Empty dependency array - only run once

//     return (
//       <h1 className="text-4xl font-light text-center">
//         {hasTyped ? `${greetingText}, ${userName || 'Ved'}` : displayText}
//       </h1>
//     );
//   });

//   const handleVoiceTranscript = (text: string) => {
//     setInputText(text);
//   };

//   const handleVoiceStateChange = (isListening: boolean) => {
//     setIsMicActive(isListening);
//   };

//   const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//     setSelectedLanguage(language);
//     // Here you would typically call your translation service to convert existing messages
//     // This is a placeholder for the actual implementation
//     if (currentChat && currentChat.messages.length > 0) {
//       try {
//         // Simulate translation API call
//         setIsGenerating(true);
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // Here you would actually translate the messages
//         // For now, we'll just add a note about translation
//         const translatedMessages = currentChat.messages.map(msg => ({
//           ...msg,
//           content: `[${language.name}] ${msg.content}`
//         }));
        
//         const updatedChat = {
//           ...currentChat,
//           messages: translatedMessages
//         };
        
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       } catch (error) {
//         console.error('Translation failed:', error);
//       } finally {
//         setIsGenerating(false);
//       }
//     }
//   };

//   return (
//     <>
//       {showIntroduction ? (
//         <Introduction onComplete={handleIntroductionComplete} />
//       ) : (
//         <>
//           {isLoginModalOpen ? (
//             <AuthPage
//               onClose={() => setIsLoginModalOpen(false)}
//               isDarkMode={isDarkMode}
//               onToggleDarkMode={toggleDarkMode}
//               initialMode={isLogin ? 'signin' : 'signup'}
//               onSignupSuccess={handleSignupSuccess}
//             />
//           ) : (
//             <div className={`flex h-screen overflow-hidden ${
//               isDarkMode 
//                 ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//                 : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//             }`}>
//               <div className={`${isSidebarOpen ? 'translate-x-0 w-72 min-w-[288px]' : '-translate-x-full w-0'} fixed md:relative h-full ${
//                   isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
//                 } backdrop-blur-sm border-r p-4 flex flex-col shadow-lg overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
//                 <div className=" flex items-center justify-between mb-6">
//                   <span 
//                     onClick={handleHomeClick}
//                     className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-[#FFFFFF]/80 to-[#138808] hover:opacity-90 transition-all duration-300"
//                     style={{
//                       textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//                       WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//                       background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//                       WebkitBackgroundClip: 'text',
//                       letterSpacing: '0.5px'
//                     }}
//                   >
//                     Hind AI
//                   </span>
//                   <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-gray-600 transition-colors">
//                     <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//                   </button>
//                 </div>

//                 <nav className="mb-6">
//                   <ul className="space-y-2">
//                     <li>
//                       <button 
//                         onClick={handleNewChat}
//                         className={`w-full flex items-center p-2 rounded-lg transition-colors ${
//                           isDarkMode 
//                             ? 'hover:bg-gray-700 text-gray-200 hover:text-white' 
//                             : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
//                         }`}
//                       >
//                         <i className="fas fa-plus-circle mr-3"></i>
//                         <span>New Chat</span>
//                       </button>
//                     </li>
//                   </ul>
                  
//                   {/* Add search bar below New Chat */}
//                   <div className="mt-3">
//                     <div className="relative">
//                       <input
//                         type="search"
//                         placeholder="Search conversations..."
//                         className={`w-full pl-9 pr-4 py-2 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                             : 'bg-gray-100 text-gray-800'
//                         } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                       />
//                       <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//                     </div>
//                   </div>
//                 </nav>

//                 {/* Starred Chats Section */}
//                 {chats.some(chat => chat.isStarred) && (
//                   <div className="mb-6">
//                     <h3 className={`text-sm font-medium mb-2 ${
//                       isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>Starred Chats</h3>
//                     <ul className="space-y-2">
//                       {chats.filter(chat => chat.isStarred).map(chat => (
//                         <li 
//                           key={chat.id}
//                           onClick={() => handleChatSelect(chat)}
//                           className={`group p-2 rounded-lg cursor-pointer flex items-center justify-between ${
//                             isDarkMode 
//                               ? 'hover:bg-gray-700 text-gray-200' 
//                               : 'hover:bg-gray-100 text-gray-700'
//                           } ${currentChat?.id === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                         >
//                           <div className="flex items-center space-x-3">
//                             <i className="fas fa-comment-alt text-gray-400"></i>
//                             <span className="truncate">{chat.title}</span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={(e) => handleStarChat(chat.id, e)}
//                               className={`p-1.5 rounded-full ${
//                                 isDarkMode 
//                                   ? 'text-yellow-400' 
//                                   : 'text-yellow-500'
//                               }`}
//                             >
//                               <i className="fas fa-star"></i>
//                             </button>
//                             <button
//                               onClick={(e) => handleDeleteChat(chat.id, e)}
//                               className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                                 isDarkMode 
//                                   ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
//                                   : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
//                               }`}
//                             >
//                               <i className="fas fa-trash-alt"></i>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 <div className={`h-px w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-6`}></div>

//                 <div className="flex-1 overflow-y-auto">
//                   <ul className="space-y-2">
//                     {chats.map(chat => (
//                       <li 
//                         key={chat.id}
//                         onClick={() => handleChatSelect(chat)}
//                         className={`group p-2 rounded-lg cursor-pointer flex items-center justify-between ${
//                           isDarkMode 
//                             ? 'hover:bg-gray-700 text-gray-200' 
//                             : 'hover:bg-gray-100 text-gray-700'
//                         } ${currentChat?.id === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                       >
//                         <div className="flex items-center space-x-3">
//                           <i className="fas fa-comment-alt text-gray-400"></i>
//                           <span className="truncate">{chat.title}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                               chat.isStarred
//                                 ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                                 : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                             }`}
//                           >
//                             <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                               isDarkMode 
//                                 ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
//                                 : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
//                             }`}
//                           >
//                             <i className="fas fa-trash-alt"></i>
//                           </button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out">
//                 <div className={`h-14 ${
//                   isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
//                 } backdrop-blur-sm border-b flex items-center justify-between px-4 shadow-sm w-full`}>
//                   {/* Left section */}
//                   <div className="flex items-center gap-2 md:gap-4">
//                     {!isSidebarOpen && (
//                       <>
//                         <button 
//                           onClick={() => setIsSidebarOpen(true)} 
//                           className={`p-1.5 md:p-2 rounded-lg transition-colors ${
//                             isDarkMode 
//                               ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
//                               : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           <i className="fas fa-bars text-base md:text-lg"></i>
//                         </button>
                        
//                         <a 
//                           href="/" 
//                           className="text-xl md:text-3xl font-medium bg-clip-text text-transparent hover:opacity-90 transition-opacity hidden sm:block"
//                           style={{
//                             textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//                             WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//                             background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//                             WebkitBackgroundClip: 'text',
//                             letterSpacing: '0.5px'
//                           }}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setShowGreeting(true);
//                             setIsChatActive(false);
//                             setMessages([]);
//                           }}
//                         >
//                           Hind AI
//                         </a>
//                       </>
//                     )}
//                   </div>

//                   {/* Right section */}
//                   <div className="flex items-center gap-2 md:gap-4">
//                     {isAuthenticated && userProfile ? (
//                       <>
//                         <div className="flex items-center gap-2 md:gap-3">
//                           <div className={`flex items-center px-2 md:px-3 py-1.5 rounded-lg ${
//                             isDarkMode 
//                               ? 'bg-gray-700 text-gray-200' 
//                               : 'bg-gray-100 text-gray-800'
//                           }`}>
//                             <i className="fas fa-user-circle mr-2 hidden sm:inline-block"></i>
//                             <span className="font-medium text-sm md:text-base truncate max-w-[100px] md:max-w-[150px]">
//                               {userProfile.name}
//                             </span>
//                           </div>
//                           <button
//                             onClick={handleLogout}
//                             className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
//                               isDarkMode
//                                 ? 'bg-red-600 hover:bg-red-700 text-white'
//                                 : 'bg-red-500 hover:bg-red-600 text-white'
//                             }`}
//                           >
//                             <span className="hidden sm:inline">Logout</span>
//                             <i className="fas fa-sign-out-alt sm:hidden"></i>
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="relative group">
//                           <button
//                             onClick={() => {
//                               setIsLogin(true);
//                               setIsLoginModalOpen(true);
//                             }}
//                             className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
//                               isDarkMode
//                                 ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
//                                 : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
//                             }`}
//                           >
//                             <span className="hidden sm:inline">Login</span>
//                             <i className="fas fa-sign-in-alt sm:hidden"></i>
//                           </button>
//                           {/* Tooltip below icon */}
//                           <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity sm:hidden pointer-events-none ${
//                             isDarkMode 
//                               ? 'bg-gray-700 text-gray-200' 
//                               : 'bg-gray-800 text-white'
//                           }`}>
//                             Login
//                           </div>
//                         </div>

//                         <div className="relative group">
//                           <button
//                             onClick={() => {
//                               setIsLogin(false);
//                               setIsLoginModalOpen(true);
//                             }}
//                             className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
//                               isDarkMode
//                                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                                 : 'bg-indigo-600 hover:bg-indigo-700 text-white'
//                             }`}
//                           >
//                             <span className="hidden sm:inline">Sign Up</span>
//                             <i className="fas fa-user-plus sm:hidden"></i>
//                           </button>
//                           {/* Tooltip below icon */}
//                           <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity sm:hidden pointer-events-none ${
//                             isDarkMode 
//                               ? 'bg-gray-700 text-gray-200' 
//                               : 'bg-gray-800 text-white'
//                           }`}>
//                             Sign Up
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Dark Mode Toggle */}
//                     <button
//                       onClick={toggleDarkMode}
//                       className={`p-1.5 md:p-2 rounded-full ${
//                         isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'
//                       } hover:bg-opacity-80 transition-colors`}
//                     >
//                       <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-6 pb-32">
//                   <div className={`max-w-4xl w-full mx-auto space-y-6 transition-all duration-500 ${isChatActive ? 'chat-active' : ''}`}>
//                     {showGreeting && (
//                       <div className="flex justify-center items-center min-h-[200px]">
//                         <Greeting />
//                       </div>
//                     )}

//                     <div className={`space-y-4 mb-6 transition-all duration-500 ${
//                       isChatActive ? 'mt-0' : 'mt-6'
//                     }`}>
//                       {messages.map((message) => (
//                         <div
//                           key={message.id}
//                           className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                         >
//                           <div
//                             className={`max-w-[80%] rounded-3xl p-4 message-bubble ${
//                               message.type === 'user'
//                                 ? 'bg-indigo-600 text-white user-message rounded-br-lg'
//                                 : 'bg-gray-800 text-gray-200 assistant-message rounded-bl-lg'
//                             }`}
//                           >
//                             <div className="flex items-center justify-between mb-1">
//                               <div className="flex items-center">
//                                 <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                                 <span className="text-sm opacity-75">
//                                   {new Date(message.timestamp).toLocaleTimeString()}
//                                 </span>
//                               </div>
//                               {renderMessageStatus(message.status)}
//                             </div>
                            
//                             {/* Add file preview */}
//                             {message.file && (
//                               <div className="mb-2">
//                                 {message.file.type.startsWith('image/') ? (
//                                   <div className="relative rounded-lg overflow-hidden">
//                                     <img 
//                                       src={message.file.url} 
//                                       alt={message.file.name}
//                                       className="max-w-full h-auto rounded-lg"
//                                     />
//                                     <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
//                                       <div className="flex items-center">
//                                         <i className="fas fa-image mr-2"></i>
//                                         <span className="truncate">{message.file.name}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ) : message.file.type === 'application/pdf' ? (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file-pdf text-2xl text-red-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">PDF Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-external-link-alt"></i>
//                                     </a>
//                                   </div>
//                                 ) : (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file text-2xl text-blue-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-download"></i>
//                                     </a>
//                                   </div>
//                                 )}
//                               </div>
//                             )}
                            
//                             <p className="text-base leading-relaxed">{message.content}</p>
//                           </div>
//                         </div>
//                       ))}
//                       <div ref={messagesEndRef} />  
//                     </div>

//                     <div className={`transition-all duration-500 ${
//                       isChatActive 
//                         ? 'fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl'
//                         : 'sticky bottom-0 w-full'
//                     }`}>
//                       <div className="max-w-4xl mx-auto">
//                         <div className={`relative rounded-lg shadow-lg chat-glow ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-white'
//                         }`}>
//                           {/* File Preview Banner */}
//                           {messages.length > 0 && messages[messages.length - 1].file && (
//                             <div className={`w-full px-4 py-2 border-b ${
//                               isDarkMode 
//                                 ? 'bg-gray-700/50 border-gray-600' 
//                                 : 'bg-gray-50/50 border-gray-200'
//                             }`}>
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-2">
//                                   <i className={`fas ${
//                                     messages[messages.length - 1].file?.type.startsWith('image/')
//                                       ? 'fa-image text-green-400'
//                                       : messages[messages.length - 1].file?.type === 'application/pdf'
//                                         ? 'fa-file-pdf text-red-400'
//                                         : 'fa-file text-blue-400'
//                                   }`}></i>
//                                   <span className="text-sm truncate max-w-[200px]">
//                                     {messages[messages.length - 1].file?.name}
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                     File attached
//                                   </span>
//                                   <i className="fas fa-check text-green-400"></i>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           <textarea
//                             className={`w-full rounded-lg outline-none resize-none p-4 pr-16 ${
//                               isDarkMode 
//                                 ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' 
//                                 : 'bg-white text-gray-800 placeholder-gray-500 border-gray-200'
//                             }`}
//                             rows={3}
//                             value={inputText}
//                             onChange={(e) => setInputText(e.target.value)}
//                             placeholder={`Message ${selectedModel}...`}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter' && !e.shiftKey) {
//                                 e.preventDefault();
//                                 handleSendMessage();
//                               }
//                             }}
//                           />
                          
//                           {/* Bottom toolbar with model selector and actions */}
//                           <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
//                             {/* Model and Language selectors */}
//                             <div className="flex items-center space-x-2">
//                               {/* Existing model selector */}
//                               <div className="relative">
//                                 <button
//                                   onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
//                                   className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm ${
//                                     isDarkMode 
//                                       ? 'hover:bg-gray-700 text-gray-300' 
//                                       : 'hover:bg-gray-100 text-gray-600'
//                                   } transition-colors`}
//                                 >
//                                   <i className={`fas ${models.find(m => m.name === selectedModel)?.icon}`}></i>
//                                   <span className="hidden sm:inline">{selectedModel}</span>
//                                   <i className={`fas fa-chevron-${isModelDropdownOpen ? 'up' : 'down'} text-xs`}></i>
//                                 </button>

//                                 {isModelDropdownOpen && (
//                                   <div className={`absolute bottom-full mb-1 left-0 w-48 ${
//                                     isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//                                   } border rounded-lg shadow-lg overflow-hidden z-50`}>
//                                     {models.map(model => (
//                                       <button
//                                         key={model.id}
//                                         className={`w-full flex items-center px-4 py-2 ${
//                                           isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                                         } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                                         onClick={() => {
//                                           setSelectedModel(model.name);
//                                           setIsModelDropdownOpen(false);
//                                         }}
//                                       >
//                                         <i className={`fas ${model.icon} mr-2`}></i>
//                                         <span>{model.name}</span>
//                                         {selectedModel === model.name && (
//                                           <i className="fas fa-check ml-auto"></i>
//                                         )}
//                                       </button>
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
                              
//                               {/* Add Language selector */}
//                               <LanguageSelector
//                                 isDarkMode={isDarkMode}
//                                 onLanguageChange={handleLanguageChange}
//                                 selectedLanguage={selectedLanguage}
//                               />
//                             </div>
                            
//                             {/* Existing action buttons */}
//                             <div className="flex items-center space-x-2">
//                               <button
//                                 className={`p-2 rounded-full transition-colors ${
//                                   isDarkMode 
//                                     ? 'text-gray-400 hover:text-blue-400' 
//                                     : 'text-gray-400 hover:text-indigo-600'
//                                 }`}
//                                 onClick={() => setIsUploadModalOpen(true)}
//                               >
//                                 <i className="fas fa-paperclip"></i>
//                               </button>
                              
//                               <button
//                                 className={`p-2 rounded-full transition-colors ${
//                                   isDarkMode 
//                                     ? 'text-gray-400 hover:text-blue-400' 
//                                     : 'text-gray-400 hover:text-indigo-600'
//                                 }`}
//                                 onClick={() => setIsMicActive(!isMicActive)}
//                               >
//                                 <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                               </button>
//                               <button
//                                 className={`rounded-full p-2.5 transition-colors ${
//                                   isDarkMode 
//                                     ? 'bg-blue-600 hover:bg-blue-700' 
//                                     : 'bg-indigo-600 hover:bg-indigo-700'
//                                 } text-white`}
//                                 onClick={handleSendMessage}
//                               >
//                                 <i className="fas fa-paper-plane"></i>
//                               </button>
//                             </div>
//                           </div>
//                         </div>

//                         {/* File Upload Modal */}
//                         {isUploadModalOpen && (
//                           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
//                             <div 
//                               className={`relative w-full max-w-md mx-4 p-6 rounded-xl shadow-lg ${
//                                 isDarkMode ? 'bg-gray-800' : 'bg-white'
//                               }`}
//                             >
//                               <button 
//                                 onClick={() => setIsUploadModalOpen(false)}
//                                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//                               >
//                                 <i className="fas fa-times"></i>
//                               </button>
                              
//                               <div 
//                                 onDragOver={handleDragOver}
//                                 onDragLeave={handleDragLeave}
//                                 onDrop={handleDrop}
//                                 className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                                   isDragging
//                                     ? (isDarkMode ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50')
//                                     : (isDarkMode ? 'border-gray-600' : 'border-gray-300')
//                                 } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                               >
//                                 <i className="fas fa-cloud-upload-alt text-4xl mb-4"></i>
//                                 <p className="mb-2">Drag and drop files here</p>
//                                 <p className="text-sm opacity-75">or</p>
//                                 <button
//                                   onClick={() => fileInputRef.current?.click()}
//                                   className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
//                                     isDarkMode
//                                       ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                                       : 'bg-blue-500 hover:bg-blue-600 text-white'
//                                   }`}
//                                 >
//                                   Choose Files
//                                 </button>
//                                 <input
//                                   ref={fileInputRef}
//                                   type="file"
//                                   multiple
//                                   className="hidden"
//                                   onChange={handleFileInput}
//                                 />
//                                 <p className="mt-4 text-sm opacity-75">
//                                   Supported files: Images, PDFs, Documents
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className={`transition-all duration-500 ${
//                     isChatActive 
//                       ? 'opacity-0 h-0 overflow-hidden' 
//                       : 'opacity-100 h-auto'
//                   }`}>
//                     {activeTab === 'analysis' && (
//                       <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                         <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                         <div ref={chartRef} style={{ height: '300px' }}></div>
//                       </div>
//                     )}

//                     <div className="mt-6 space-y-8">
//                       {/* Starred Chats Section */}
//                       <div>
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center">
//                             <i className="fas fa-star mr-2 text-yellow-500"></i>
//                             <span>Starred chats</span>
//                           </div>
//                         </div>
//                         {chats.some(chat => chat.isStarred) ? (
//                           <div className={`${
//                             isDarkMode 
//                               ? 'bg-gray-800 shadow-gray-900/20' 
//                               : 'bg-white shadow-sm'
//                           } rounded-xl p-4`}>
//                             <ul className="space-y-2">
//                               {chats
//                                 .filter(chat => chat.isStarred)
//                                 .map((chat, index) => (
//                                   <li
//                                     key={index}
//                                     className={`group ${
//                                       isDarkMode 
//                                         ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                         : 'hover:bg-blue-50 hover:border-blue-100'
//                                       } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                   >
//                                     <div className="flex items-center space-x-2">
//                                       <i className="fas fa-comment-alt text-gray-400"></i>
//                                       <span>{chat.title}</span>
//                                     </div>
//                                     <i className="fas fa-star text-yellow-500"></i>
//                                   </li>
//                                 ))}
//                             </ul>
//                           </div>
//                         ) : (
//                           <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                             No starred chats yet
//                           </p>
//                         )}
//                       </div>

//                       {/* Recent Chats Section */}
//                       <div>
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center">
//                             <i className="fas fa-history mr-2"></i>
//                             <span>Your recent chats</span>
//                             <button
//                               className={`ml-2 px-3 py-1 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'bg-gray-700 hover:bg-gray-600' 
//                                   : 'bg-gray-100 hover:bg-gray-200'
//                               }`}
//                               onClick={() => setIsShowingChats(!isShowingChats)}
//                             >
//                               {isShowingChats ? 'Hide' : 'Show'}
//                             </button>
//                           </div>
//                           {isShowingChats && chats.length > 3 && (
//                             <button
//                               onClick={() => setShowAllChats(!showAllChats)}
//                               className="text-gray-400 hover:text-gray-500 transition-colors"
//                             >
//                               {showAllChats ? 'Show less' : 'View all'}
//                             </button>
//                           )}
//                         </div>
//                         {isShowingChats && (
//                           <div className={`${
//                             isDarkMode 
//                               ? 'bg-gray-800 shadow-gray-900/20' 
//                               : 'bg-white shadow-sm'
//                           } rounded-xl p-4`}>
//                             {chats.length > 0 ? (
//                               <ul className="space-y-2">
//                                 {chats
//                                   .slice(0, showAllChats ? undefined : 3)
//                                   .map((chat, index) => (
//                                     <li
//                                       key={index}
//                                       className={`group ${
//                                         isDarkMode 
//                                           ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                           : 'hover:bg-blue-50 hover:border-blue-100'
//                                         } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                     >
//                                       <div className="flex items-center space-x-2">
//                                         <i className="fas fa-comment-alt text-gray-400"></i>
//                                         <span>{chat.title}</span>
//                                       </div>
//                                       <button
//                                         onClick={(e) => handleStarChat(chat.id, e)}
//                                         className={`transition-colors ${
//                                           chat.isStarred
//                                             ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                                             : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                                         }`}
//                                       >
//                                         <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                                       </button>
//                                     </li>
//                                   ))}
//                               </ul>
//                             ) : (
//                               <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                 No recent chats available
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//       <VoiceInput
//         isActive={isMicActive}
//         onTranscript={handleVoiceTranscript}
//         onStateChange={handleVoiceStateChange}
//         isDarkMode={isDarkMode}
//       />
//     </>
//   );
// };

// export default App;




// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;  // Add this property
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });

//   const models = [
//     { id: 'gpt4', name: 'GPT-4', icon: 'fa-robot' },
//     { id: 'claude', name: 'Claude 3', icon: 'fa-brain' },
//     { id: 'nextchat', name: 'NextChat', icon: 'fa-comment-dots' },
//   ];

//   const toggleDarkMode = () => {
//     setIsDarkMode(prev => !prev);
//   };

//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'New Chat', // Initial title will be updated with first message
//       createdAt: new Date(),
//       messages: []
//     };
    
//     setChats(prev => [newChat, ...prev]);
//     setCurrentChat(newChat);
//     setShowGreeting(false);
//     setIsChatActive(true);
//     setMessages([]);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleChatSelect = (chat: Chat) => {
//     setCurrentChat(chat);
//     setMessages(chat.messages);
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
    
//     // On mobile, close sidebar
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevent chat selection when clicking delete
    
//     setChats(prev => prev.filter(chat => chat.id !== chatId));
    
//     // If deleting current chat, reset to home
//     if (currentChat?.id === chatId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   const handleSendMessage = async () => {
//     if (!inputText.trim() || isGenerating) return;
    
//     if (isMicActive) {
//       setIsMicActive(false);
//     }
    
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: inputText,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending'
//     };

//     try {
//       // For both new and existing chats
//       const chat = currentChat || {
//         id: Date.now().toString(),
//         title: 'New Chat',
//         createdAt: new Date(),
//         messages: []
//       };

//       // If this is the first message in the chat, update the title
//       if (chat.messages.length === 0) {
//         chat.title = inputText.length > 30 
//           ? `${inputText.substring(0, 30)}...` 
//           : inputText;
//       }

//       const updatedChat = {
//         ...chat,
//         messages: [...chat.messages, newMessage]
//       };

//       // Update chats list
//       setChats(prev => 
//         currentChat
//           ? prev.map(c => c.id === currentChat.id ? updatedChat : c)
//           : [updatedChat, ...prev]
//       );
      
//       setCurrentChat(updatedChat);
//       setMessages([...updatedChat.messages]);
//       setInputText('');
//       setIsGenerating(true);

//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1000));

//       // Update message status to sent
//       const updatedMessage = { ...newMessage, status: 'sent' };

//       // Create and add AI response
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: 'I understand your query. Let me help you with that...',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };

//       // Update chat with both messages
//       const finalChat = {
//         ...updatedChat,
//         messages: [...updatedChat.messages.map(msg => 
//           msg.id === newMessage.id ? updatedMessage : msg
//         ), aiResponse]
//       };

//       setChats(prev => prev.map(c => 
//         c.id === finalChat.id ? finalChat : c
//       ));
//       setCurrentChat(finalChat);
//       setMessages(finalChat.messages);

//     } catch (error) {
//       console.error('Failed to send message:', error);
//       setMessages(prev => prev.map(msg => 
//         msg.id === newMessage.id ? { ...msg, status: 'error' } : msg
//       ));
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // Add this helper function to render message status
//   const renderMessageStatus = (status: Message['status']) => {
//     switch (status) {
//       case 'sending':
//         return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2"></i>;
//       case 'sent':
//         return <i className="fas fa-check text-green-400 ml-2"></i>;
//       case 'error':
//         return <i className="fas fa-exclamation-circle text-red-400 ml-2"></i>;
//       default:
//         return null;
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       // Create object URL for preview
//       const fileUrl = URL.createObjectURL(file);
      
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: `Uploaded: ${file.name}`,
//         type: 'user',
//         timestamp: new Date(),
//         status: 'sent',
//         file: {
//           name: file.name,
//           type: file.type,
//           url: fileUrl
//         }
//       };
  
//       if (currentChat) {
//         const updatedChat = {
//           ...currentChat,
//           messages: [...currentChat.messages, newMessage]
//         };
  
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       }
//     });
  
//     setIsUploadModalOpen(false);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleAuthSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormError('');
//     setFormSuccess('');
    
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     if (isLogin) {
//       setFormSuccess('Successfully logged in!');
//     } else {
//       setFormSuccess('Account created successfully!');
//     }
    
//     setLoading(false);
//     setTimeout(() => {
//       setIsLoginModalOpen(false);
//       setFormSuccess('');
//     }, 1500);
//   };

//   // Add completion handler
//   const handleIntroductionComplete = (name: string) => {
//     setUserName(name);
//     setShowIntroduction(false);
//     setShowGreeting(true);
//   };

//   // Handle successful signup
//   const handleSignupSuccess = (userData: { name: string; email: string }) => {
//     handleAuthSuccess(userData);
//     setShowIntroduction(true);
//   };

//   // Add this new handler for successful authentication
//   const handleAuthSuccess = (userData: { name: string; email: string }) => {
//     setIsAuthenticated(true);
//     setUserProfile(userData);
//     setIsLoginModalOpen(false);
//     // Clear any existing chat data when a new user logs in
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//   };

//   // Add logout handler
//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserProfile(null);
//     // Clear all user data
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setActiveChat(null);
//     setStarredChats([]);
//   };

//   // Create a memoized version of the Greeting component
//   const Greeting = React.memo(() => {
//     const [displayText, setDisplayText] = useState('');
//     const [hasTyped, setHasTyped] = useState(false);
//     const hour = new Date().getHours();
//     const greetingText = hour >= 0 && hour < 12
//       ? 'Good morning'
//       : hour >= 12 && hour < 16
//         ? 'Good afternoon'
//         : 'Good evening';

//     useEffect(() => {
//       if (!hasTyped) {
//         const fullText = `${greetingText}, ${userName || 'Ved'}`;
//         let timeouts: NodeJS.Timeout[] = [];

//         [...fullText].forEach((char, index) => {
//           const timeout = setTimeout(() => {
//             setDisplayText(prev => prev + char);
//             if (index === fullText.length - 1) {
//               setHasTyped(true);
//             }
//           }, 100 * index);
//           timeouts.push(timeout);
//         });

//         return () => timeouts.forEach(clearTimeout);
//       }
//     }, []); // Empty dependency array - only run once

//     return (
//       <h1 className="text-4xl font-light text-center">
//         {hasTyped ? `${greetingText}, ${userName || 'Ved'}` : displayText}
//       </h1>
//     );
//   });

//   const handleVoiceTranscript = (text: string) => {
//     setInputText(text);
//   };

//   const handleVoiceStateChange = (isListening: boolean) => {
//     setIsMicActive(isListening);
//   };

//   const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//     setSelectedLanguage(language);
//     // Here you would typically call your translation service to convert existing messages
//     // This is a placeholder for the actual implementation
//     if (currentChat && currentChat.messages.length > 0) {
//       try {
//         // Simulate translation API call
//         setIsGenerating(true);
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         // Here you would actually translate the messages
//         // For now, we'll just add a note about translation
//         const translatedMessages = currentChat.messages.map(msg => ({
//           ...msg,
//           content: `[${language.name}] ${msg.content}`
//         }));
        
//         const updatedChat = {
//           ...currentChat,
//           messages: translatedMessages
//         };
        
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       } catch (error) {
//         console.error('Translation failed:', error);
//       } finally {
//         setIsGenerating(false);
//       }
//     }
//   };

//   return (
//     <>
//       {showIntroduction ? (
//         <Introduction onComplete={handleIntroductionComplete} />
//       ) : (
//         <>
//           {isLoginModalOpen ? (
//             <AuthPage
//               onClose={() => setIsLoginModalOpen(false)}
//               isDarkMode={isDarkMode}
//               onToggleDarkMode={toggleDarkMode}
//               initialMode={isLogin ? 'signin' : 'signup'}
//               onSignupSuccess={handleSignupSuccess}
//             />
//           ) : (
//             <div className={`flex h-screen overflow-hidden ${
//               isDarkMode 
//                 ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//                 : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//             }`}>
//               <div className={`${isSidebarOpen ? 'translate-x-0 w-72 min-w-[288px]' : '-translate-x-full w-0'} fixed md:relative h-full ${
//                   isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
//                 } backdrop-blur-sm border-r p-4 flex flex-col shadow-lg overflow-y-auto transition-all duration-300 ease-in-out z-50`}>
//                 <div className=" flex items-center justify-between mb-6">
//                   <span 
//                     onClick={handleHomeClick}
//                     className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent bg-gradient-to-r from-[#FF9933] via-[#FFFFFF]/80 to-[#138808] hover:opacity-90 transition-all duration-300"
//                     style={{
//                       textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//                       WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//                       background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//                       WebkitBackgroundClip: 'text',
//                       letterSpacing: '0.5px'
//                     }}
//                   >
//                     Hind AI
//                   </span>
//                   <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-400 hover:text-gray-600 transition-colors">
//                     <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//                   </button>
//                 </div>

//                 <nav className="mb-6">
//                   <ul className="space-y-2">
//                     <li>
//                       <button 
//                         onClick={handleNewChat}
//                         className={`w-full flex items-center p-2 rounded-lg transition-colors ${
//                           isDarkMode 
//                             ? 'hover:bg-gray-700 text-gray-200 hover:text-white' 
//                             : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
//                         }`}
//                       >
//                         <i className="fas fa-plus-circle mr-3"></i>
//                         <span>New Chat</span>
//                       </button>
//                     </li>
//                   </ul>
                  
//                   {/* Add search bar below New Chat */}
//                   <div className="mt-3">
//                     <div className="relative">
//                       <input
//                         type="search"
//                         placeholder="Search conversations..."
//                         className={`w-full pl-9 pr-4 py-2 ${
//                           isDarkMode 
//                             ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                             : 'bg-gray-100 text-gray-800'
//                         } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                       />
//                       <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//                     </div>
//                   </div>
//                 </nav>

//                 {/* Starred Chats Section */}
//                 {chats.some(chat => chat.isStarred) && (
//                   <div className="mb-6">
//                     <h3 className={`text-sm font-medium mb-2 ${
//                       isDarkMode ? 'text-gray-400' : 'text-gray-500'
//                     }`}>Starred Chats</h3>
//                     <ul className="space-y-2">
//                       {chats.filter(chat => chat.isStarred).map(chat => (
//                         <li 
//                           key={chat.id}
//                           onClick={() => handleChatSelect(chat)}
//                           className={`group p-2 rounded-lg cursor-pointer flex items-center justify-between ${
//                             isDarkMode 
//                               ? 'hover:bg-gray-700 text-gray-200' 
//                               : 'hover:bg-gray-100 text-gray-700'
//                           } ${currentChat?.id === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                         >
//                           <div className="flex items-center space-x-3">
//                             <i className="fas fa-comment-alt text-gray-400"></i>
//                             <span className="truncate">{chat.title}</span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <button
//                               onClick={(e) => handleStarChat(chat.id, e)}
//                               className={`p-1.5 rounded-full ${
//                                 isDarkMode 
//                                   ? 'text-yellow-400' 
//                                   : 'text-yellow-500'
//                               }`}
//                             >
//                               <i className="fas fa-star"></i>
//                             </button>
//                             <button
//                               onClick={(e) => handleDeleteChat(chat.id, e)}
//                               className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                                 isDarkMode 
//                                   ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
//                                   : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
//                               }`}
//                             >
//                               <i className="fas fa-trash-alt"></i>
//                             </button>
//                           </div>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 <div className={`h-px w-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} mb-6`}></div>

//                 <div className="flex-1 overflow-y-auto">
//                   <ul className="space-y-2">
//                     {chats.map(chat => (
//                       <li 
//                         key={chat.id}
//                         onClick={() => handleChatSelect(chat)}
//                         className={`group p-2 rounded-lg cursor-pointer flex items-center justify-between ${
//                           isDarkMode 
//                             ? 'hover:bg-gray-700 text-gray-200' 
//                             : 'hover:bg-gray-100 text-gray-700'
//                         } ${currentChat?.id === chat.id ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                       >
//                         <div className="flex items-center space-x-3">
//                           <i className="fas fa-comment-alt text-gray-400"></i>
//                           <span className="truncate">{chat.title}</span>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                               chat.isStarred
//                                 ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                                 : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                             }`}
//                           >
//                             <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-full ${
//                               isDarkMode 
//                                 ? 'hover:bg-gray-600 text-gray-400 hover:text-red-400' 
//                                 : 'hover:bg-gray-200 text-gray-400 hover:text-red-500'
//                             }`}
//                           >
//                             <i className="fas fa-trash-alt"></i>
//                           </button>
//                         </div>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="flex-1 flex flex-col relative transition-all duration-300 ease-in-out">
//                 <div className={`h-14 ${
//                   isDarkMode ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200'
//                 } backdrop-blur-sm border-b flex items-center justify-between px-4 shadow-sm w-full`}>
//                   {/* Left section */}
//                   <div className="flex items-center gap-2 md:gap-4">
//                     {!isSidebarOpen && (
//                       <>
//                         <button 
//                           onClick={() => setIsSidebarOpen(true)} 
//                           className={`p-1.5 md:p-2 rounded-lg transition-colors ${
//                             isDarkMode 
//                               ? 'text-gray-400 hover:text-blue-400 hover:bg-gray-700' 
//                               : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           <i className="fas fa-bars text-base md:text-lg"></i>
//                         </button>
                        
//                         <a 
//                           href="/" 
//                           className="text-xl md:text-3xl font-medium bg-clip-text text-transparent hover:opacity-90 transition-opacity hidden sm:block"
//                           style={{
//                             textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//                             WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//                             background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//                             WebkitBackgroundClip: 'text',
//                             letterSpacing: '0.5px'
//                           }}
//                           onClick={(e) => {
//                             e.preventDefault();
//                             setShowGreeting(true);
//                             setIsChatActive(false);
//                             setMessages([]);
//                           }}
//                         >
//                           Hind AI
//                         </a>
//                       </>
//                     )}
//                   </div>

//                   {/* Right section */}
//                   <div className="flex items-center gap-2 md:gap-4">
//                     {isAuthenticated && userProfile ? (
//                       <>
//                         <div className="flex items-center gap-2 md:gap-3">
//                           <div className={`flex items-center px-2 md:px-3 py-1.5 rounded-lg ${
//                             isDarkMode 
//                               ? 'bg-gray-700 text-gray-200' 
//                               : 'bg-gray-100 text-gray-800'
//                           }`}>
//                             <i className="fas fa-user-circle mr-2 hidden sm:inline-block"></i>
//                             <span className="font-medium text-sm md:text-base truncate max-w-[100px] md:max-w-[150px]">
//                               {userProfile.name}
//                             </span>
//                           </div>
//                           <button
//                             onClick={handleLogout}
//                             className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
//                               isDarkMode
//                                 ? 'bg-red-600 hover:bg-red-700 text-white'
//                                 : 'bg-red-500 hover:bg-red-600 text-white'
//                             }`}
//                           >
//                             <span className="hidden sm:inline">Logout</span>
//                             <i className="fas fa-sign-out-alt sm:hidden"></i>
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <div className="relative group">
//                           <button
//                             onClick={() => {
//                               setIsLogin(true);
//                               setIsLoginModalOpen(true);
//                             }}
//                             className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
//                               isDarkMode
//                                 ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
//                                 : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
//                             }`}
//                           >
//                             <span className="hidden sm:inline">Login</span>
//                             <i className="fas fa-sign-in-alt sm:hidden"></i>
//                           </button>
//                           {/* Tooltip below icon */}
//                           <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity sm:hidden pointer-events-none ${
//                             isDarkMode 
//                               ? 'bg-gray-700 text-gray-200' 
//                               : 'bg-gray-800 text-white'
//                           }`}>
//                             Login
//                           </div>
//                         </div>

//                         <div className="relative group">
//                           <button
//                             onClick={() => {
//                               setIsLogin(false);
//                               setIsLoginModalOpen(true);
//                             }}
//                             className={`px-2 md:px-4 py-1.5 md:py-2 rounded-lg font-medium text-sm md:text-base transition-all ${
//                               isDarkMode
//                                 ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                                 : 'bg-indigo-600 hover:bg-indigo-700 text-white'
//                             }`}
//                           >
//                             <span className="hidden sm:inline">Sign Up</span>
//                             <i className="fas fa-user-plus sm:hidden"></i>
//                           </button>
//                           {/* Tooltip below icon */}
//                           <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity sm:hidden pointer-events-none ${
//                             isDarkMode 
//                               ? 'bg-gray-700 text-gray-200' 
//                               : 'bg-gray-800 text-white'
//                           }`}>
//                             Sign Up
//                           </div>
//                         </div>
//                       </>
//                     )}

//                     {/* Dark Mode Toggle */}
//                     <button
//                       onClick={toggleDarkMode}
//                       className={`p-1.5 md:p-2 rounded-full ${
//                         isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-gray-200 text-gray-600'
//                       } hover:bg-opacity-80 transition-colors`}
//                     >
//                       <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex-1 overflow-y-auto p-6 pb-32">
//                   <div className={`max-w-4xl w-full mx-auto space-y-6 transition-all duration-500 ${isChatActive ? 'chat-active' : ''}`}>
//                     {showGreeting && (
//                       <div className="flex justify-center items-center min-h-[200px]">
//                         <Greeting />
//                       </div>
//                     )}

//                     <div className={`space-y-4 mb-6 transition-all duration-500 ${
//                       isChatActive ? 'mt-0' : 'mt-6'
//                     }`}>
//                       {messages.map((message) => (
//                         <div
//                           key={message.id}
//                           className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
//                         >
//                           <div
//                             className={`max-w-[80%] rounded-3xl p-4 message-bubble ${
//                               message.type === 'user'
//                                 ? 'bg-indigo-600 text-white user-message rounded-br-lg'
//                                 : 'bg-gray-800 text-gray-200 assistant-message rounded-bl-lg'
//                             }`}
//                           >
//                             <div className="flex items-center justify-between mb-1">
//                               <div className="flex items-center">
//                                 <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                                 <span className="text-sm opacity-75">
//                                   {new Date(message.timestamp).toLocaleTimeString()}
//                                 </span>
//                               </div>
//                               {renderMessageStatus(message.status)}
//                             </div>
                            
//                             {/* Add file preview */}
//                             {message.file && (
//                               <div className="mb-2">
//                                 {message.file.type.startsWith('image/') ? (
//                                   <div className="relative rounded-lg overflow-hidden">
//                                     <img 
//                                       src={message.file.url} 
//                                       alt={message.file.name}
//                                       className="max-w-full h-auto rounded-lg"
//                                     />
//                                     <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
//                                       <div className="flex items-center">
//                                         <i className="fas fa-image mr-2"></i>
//                                         <span className="truncate">{message.file.name}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ) : message.file.type === 'application/pdf' ? (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file-pdf text-2xl text-red-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">PDF Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-external-link-alt"></i>
//                                     </a>
//                                   </div>
//                                 ) : (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file text-2xl text-blue-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-download"></i>
//                                     </a>
//                                   </div>
//                                 )}
//                               </div>
//                             )}
                            
//                             <p className="text-base leading-relaxed">{message.content}</p>
//                           </div>
//                         </div>
//                       ))}
//                       <div ref={messagesEndRef} />  
//                     </div>

//                     <div className={`transition-all duration-500 ${
//                       isChatActive 
//                         ? 'fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl'
//                         : 'sticky bottom-0 w-full'
//                     }`}>
//                       <div className="max-w-4xl mx-auto">
//                         <div className={`relative rounded-lg shadow-lg chat-glow ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-white'
//                         }`}>
//                           {/* File Preview Banner */}
//                           {messages.length > 0 && messages[messages.length - 1].file && (
//                             <div className={`w-full px-4 py-2 border-b ${
//                               isDarkMode 
//                                 ? 'bg-gray-700/50 border-gray-600' 
//                                 : 'bg-gray-50/50 border-gray-200'
//                             }`}>
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-2">
//                                   <i className={`fas ${
//                                     messages[messages.length - 1].file?.type.startsWith('image/')
//                                       ? 'fa-image text-green-400'
//                                       : messages[messages.length - 1].file?.type === 'application/pdf'
//                                         ? 'fa-file-pdf text-red-400'
//                                         : 'fa-file text-blue-400'
//                                   }`}></i>
//                                   <span className="text-sm truncate max-w-[200px]">
//                                     {messages[messages.length - 1].file?.name}
//                                   </span>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                     File attached
//                                   </span>
//                                   <i className="fas fa-check text-green-400"></i>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           <textarea
//                             className={`w-full rounded-lg outline-none resize-none p-4 pr-16 ${
//                               isDarkMode 
//                                 ? 'bg-gray-800 text-gray-200 placeholder-gray-400 border-gray-700' 
//                                 : 'bg-white text-gray-800 placeholder-gray-500 border-gray-200'
//                             }`}
//                             rows={3}
//                             value={inputText}
//                             onChange={(e) => setInputText(e.target.value)}
//                             placeholder={`Message ${selectedModel}...`}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter' && !e.shiftKey) {
//                                 e.preventDefault();
//                                 handleSendMessage();
//                               }
//                             }}
//                           />
                          
//                           {/* Bottom toolbar with model selector and actions */}
//                           <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
//                             {/* Model and Language selectors */}
//                             <div className="flex items-center space-x-2">
//                               {/* Existing model selector */}
//                               <div className="relative">
//                                 <button
//                                   onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
//                                   className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm ${
//                                     isDarkMode 
//                                       ? 'hover:bg-gray-700 text-gray-300' 
//                                       : 'hover:bg-gray-100 text-gray-600'
//                                   } transition-colors`}
//                                 >
//                                   <i className={`fas ${models.find(m => m.name === selectedModel)?.icon}`}></i>
//                                   <span className="hidden sm:inline">{selectedModel}</span>
//                                   <i className={`fas fa-chevron-${isModelDropdownOpen ? 'up' : 'down'} text-xs`}></i>
//                                 </button>

//                                 {isModelDropdownOpen && (
//                                   <div className={`absolute bottom-full mb-1 left-0 w-48 ${
//                                     isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//                                   } border rounded-lg shadow-lg overflow-hidden z-50`}>
//                                     {models.map(model => (
//                                       <button
//                                         key={model.id}
//                                         className={`w-full flex items-center px-4 py-2 ${
//                                           isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                                         } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
//                                         onClick={() => {
//                                           setSelectedModel(model.name);
//                                           setIsModelDropdownOpen(false);
//                                         }}
//                                       >
//                                         <i className={`fas ${model.icon} mr-2`}></i>
//                                         <span>{model.name}</span>
//                                         {selectedModel === model.name && (
//                                           <i className="fas fa-check ml-auto"></i>
//                                         )}
//                                       </button>
//                                     ))}
//                                   </div>
//                                 )}
//                               </div>
                              
//                               {/* Add Language selector */}
//                               <LanguageSelector
//                                 isDarkMode={isDarkMode}
//                                 onLanguageChange={handleLanguageChange}
//                                 selectedLanguage={selectedLanguage}
//                               />
//                             </div>
                            
//                             {/* Existing action buttons */}
//                             <div className="flex items-center space-x-2">
//                               <button
//                                 className={`p-2 rounded-full transition-colors ${
//                                   isDarkMode 
//                                     ? 'text-gray-400 hover:text-blue-400' 
//                                     : 'text-gray-400 hover:text-indigo-600'
//                                 }`}
//                                 onClick={() => setIsUploadModalOpen(true)}
//                               >
//                                 <i className="fas fa-paperclip"></i>
//                               </button>
                              
//                               <button
//                                 className={`p-2 rounded-full transition-colors ${
//                                   isDarkMode 
//                                     ? 'text-gray-400 hover:text-blue-400' 
//                                     : 'text-gray-400 hover:text-indigo-600'
//                                 }`}
//                                 onClick={() => setIsMicActive(!isMicActive)}
//                               >
//                                 <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                               </button>
//                               <button
//                                 className={`rounded-full p-2.5 transition-colors ${
//                                   isDarkMode 
//                                     ? 'bg-blue-600 hover:bg-blue-700' 
//                                     : 'bg-indigo-600 hover:bg-indigo-700'
//                                 } text-white`}
//                                 onClick={handleSendMessage}
//                               >
//                                 <i className="fas fa-paper-plane"></i>
//                               </button>
//                             </div>
//                           </div>
//                         </div>

//                         {/* File Upload Modal */}
//                         {isUploadModalOpen && (
//                           <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
//                             <div 
//                               className={`relative w-full max-w-md mx-4 p-6 rounded-xl shadow-lg ${
//                                 isDarkMode ? 'bg-gray-800' : 'bg-white'
//                               }`}
//                             >
//                               <button 
//                                 onClick={() => setIsUploadModalOpen(false)}
//                                 className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//                               >
//                                 <i className="fas fa-times"></i>
//                               </button>
                              
//                               <div 
//                                 onDragOver={handleDragOver}
//                                 onDragLeave={handleDragLeave}
//                                 onDrop={handleDrop}
//                                 className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                                   isDragging
//                                     ? (isDarkMode ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50')
//                                     : (isDarkMode ? 'border-gray-600' : 'border-gray-300')
//                                 } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                               >
//                                 <i className="fas fa-cloud-upload-alt text-4xl mb-4"></i>
//                                 <p className="mb-2">Drag and drop files here</p>
//                                 <p className="text-sm opacity-75">or</p>
//                                 <button
//                                   onClick={() => fileInputRef.current?.click()}
//                                   className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
//                                     isDarkMode
//                                       ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                                       : 'bg-blue-500 hover:bg-blue-600 text-white'
//                                   }`}
//                                 >
//                                   Choose Files
//                                 </button>
//                                 <input
//                                   ref={fileInputRef}
//                                   type="file"
//                                   multiple
//                                   className="hidden"
//                                   onChange={handleFileInput}
//                                 />
//                                 <p className="mt-4 text-sm opacity-75">
//                                   Supported files: Images, PDFs, Documents
//                                 </p>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className={`transition-all duration-500 ${
//                     isChatActive 
//                       ? 'opacity-0 h-0 overflow-hidden' 
//                       : 'opacity-100 h-auto'
//                   }`}>
//                     {activeTab === 'analysis' && (
//                       <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                         <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                         <div ref={chartRef} style={{ height: '300px' }}></div>
//                       </div>
//                     )}

//                     <div className="mt-6 space-y-8">
//                       {/* Starred Chats Section */}
//                       <div>
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center">
//                             <i className="fas fa-star mr-2 text-yellow-500"></i>
//                             <span>Starred chats</span>
//                           </div>
//                         </div>
//                         {chats.some(chat => chat.isStarred) ? (
//                           <div className={`${
//                             isDarkMode 
//                               ? 'bg-gray-800 shadow-gray-900/20' 
//                               : 'bg-white shadow-sm'
//                           } rounded-xl p-4`}>
//                             <ul className="space-y-2">
//                               {chats
//                                 .filter(chat => chat.isStarred)
//                                 .map((chat, index) => (
//                                   <li
//                                     key={index}
//                                     className={`group ${
//                                       isDarkMode 
//                                         ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                         : 'hover:bg-blue-50 hover:border-blue-100'
//                                       } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                   >
//                                     <div className="flex items-center space-x-2">
//                                       <i className="fas fa-comment-alt text-gray-400"></i>
//                                       <span>{chat.title}</span>
//                                     </div>
//                                     <i className="fas fa-star text-yellow-500"></i>
//                                   </li>
//                                 ))}
//                             </ul>
//                           </div>
//                         ) : (
//                           <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                             No starred chats yet
//                           </p>
//                         )}
//                       </div>

//                       {/* Recent Chats Section */}
//                       <div>
//                         <div className="flex items-center justify-between mb-4">
//                           <div className="flex items-center">
//                             <i className="fas fa-history mr-2"></i>
//                             <span>Your recent chats</span>
//                             <button
//                               className={`ml-2 px-3 py-1 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'bg-gray-700 hover:bg-gray-600' 
//                                   : 'bg-gray-100 hover:bg-gray-200'
//                               }`}
//                               onClick={() => setIsShowingChats(!isShowingChats)}
//                             >
//                               {isShowingChats ? 'Hide' : 'Show'}
//                             </button>
//                           </div>
//                           {isShowingChats && chats.length > 3 && (
//                             <button
//                               onClick={() => setShowAllChats(!showAllChats)}
//                               className="text-gray-400 hover:text-gray-500 transition-colors"
//                             >
//                               {showAllChats ? 'Show less' : 'View all'}
//                             </button>
//                           )}
//                         </div>
//                         {isShowingChats && (
//                           <div className={`${
//                             isDarkMode 
//                               ? 'bg-gray-800 shadow-gray-900/20' 
//                               : 'bg-white shadow-sm'
//                           } rounded-xl p-4`}>
//                             {chats.length > 0 ? (
//                               <ul className="space-y-2">
//                                 {chats
//                                   .slice(0, showAllChats ? undefined : 3)
//                                   .map((chat, index) => (
//                                     <li
//                                       key={index}
//                                       className={`group ${
//                                         isDarkMode 
//                                           ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                           : 'hover:bg-blue-50 hover:border-blue-100'
//                                         } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                     >
//                                       <div className="flex items-center space-x-2">
//                                         <i className="fas fa-comment-alt text-gray-400"></i>
//                                         <span>{chat.title}</span>
//                                       </div>
//                                       <button
//                                         onClick={(e) => handleStarChat(chat.id, e)}
//                                         className={`transition-colors ${
//                                           chat.isStarred
//                                             ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                                             : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                                         }`}
//                                       >
//                                         <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                                       </button>
//                                     </li>
//                                   ))}
//                               </ul>
//                             ) : (
//                               <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                 No recent chats available
//                               </p>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </>
//       )}
//       <VoiceInput
//         isActive={isMicActive}
//         onTranscript={handleVoiceTranscript}
//         onStateChange={handleVoiceStateChange}
//         isDarkMode={isDarkMode}
//       />
//     </>
//   );
// };

// export default App;







// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');

//   const models = [
//     { id: 'gpt4', name: 'GPT-4', icon: 'fa-robot' },
//     { id: 'claude', name: 'Claude 3', icon: 'fa-brain' },
//     { id: 'nextchat', name: 'NextChat', icon: 'fa-comment-dots' },
//   ];

//   const toggleDarkMode = () => { 
//     setIsDarkMode(prev => !prev);
//   };

//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'New Chat',
//       createdAt: new Date(),
//       messages: []
//     };
    
//     // Update chats array ensuring no duplicates by ID
//     setChats(prev => {
//       const chatExists = prev.some(chat => chat.id === newChat.id);
//       if (chatExists) return prev;
//       return [newChat, ...prev];
//     });
    
//     setCurrentChat(newChat);
//     setShowGreeting(false);
//     setIsChatActive(true);
//     setMessages([]);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleChatSelect = (chat: Chat) => {
//     if (currentChat?.id === chat.id) return; // Prevent unnecessary updates
    
//     setCurrentChat(chat);
//     setMessages(chat.messages);
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     setChats(prev => prev.filter(chat => chat.id !== chatId));
    
//     if (currentChat?.id === chatId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     if (!isSidebarOpen && !isHovered) {
//       setIsSearchActive(false);
//     }
//   }, [isSidebarOpen, isHovered]);

//   const resetTextAreaHeight = () => {
//     const textarea = document.querySelector('textarea');
//     if (textarea) {
//       textarea.style.height = '56px';
//     }
//   };

//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const handleSendMessage = async () => {
//     if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;
    
//     setHasMessages(true); // Set to true when first message is sent
    
//     if (isMicActive) {
//       setIsMicActive(false);
//     }
    
//     // Switch to clean view when first message is sent
//     setIsCleanView(true);
    
//     let chatToUse = currentChat;
    
//     // Create a new chat if there isn't one
//     if (!chatToUse) {
//       chatToUse = {
//         id: Date.now().toString(),
//         title: inputText.length > 30 ? `${inputText.substring(0, 30)}...` : inputText,
//         createdAt: new Date(),
//         messages: []
//       };
//       setCurrentChat(chatToUse);
//       setChats(prev => [chatToUse, ...prev]);
//     }
    
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     // Generate unique IDs for messages
//     const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
//     const newMessage: Message = {
//       id: messageId,
//       content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending',
//       file: activeFilePreview || undefined
//     };

//     try {
//       const updatedChat = {
//         ...chatToUse,
//         messages: [...chatToUse.messages, newMessage]
//       };

//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//       setInputText('');
//       resetTextAreaHeight();
//       setIsGenerating(true);

//       const aiResponseText = await generateResponse(inputText);
      
//       const sentMessage = { ...newMessage, status: 'sent' };
      
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponseText,
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };

//       const finalChat = {
//         ...updatedChat,
//         messages: [
//           ...updatedChat.messages.map(msg => 
//             msg.id === newMessage.id ? sentMessage : msg
//           ),
//           aiResponse
//         ]
//       };

//       setChats(prev => prev.map(c => 
//         c.id === finalChat.id ? finalChat : c
//       ));
//       setCurrentChat(finalChat);
//       setMessages(finalChat.messages);
//       setActiveFilePreview(null);

//     } catch (error) {
//       console.error('Failed to send message:', error);
//       const errorMessage = { ...newMessage, status: 'error' };
      
//       const errorChat = {
//         ...currentChat,
//         messages: currentChat?.messages.map(msg =>
//           msg.id === newMessage.id ? errorMessage : msg
//         ) || []
//       };
      
//       setChats(prev => prev.map(c => 
//         c.id === currentChat?.id ? errorChat : c
//       ));
//       setCurrentChat(errorChat);
//       setMessages(errorChat.messages);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const renderMessageStatus = (status: Message['status']) => {
//     switch (status) {
//       case 'sending':
//         return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2"></i>;
//       case 'sent':
//         return <i className="fas fa-check text-green-500 ml-2"></i>;
//       case 'error':
//         return <i className="fas fa-exclamation-circle text-red-500 ml-2"></i>;
//       default:
//         return null;
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       const fileUrl = URL.createObjectURL(file);
//       const filePreview = {
//         name: file.name,
//         type: file.type,
//         url: fileUrl
//       };
//       setActiveFilePreview(filePreview);
      
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: `Attached: ${file.name}`,
//         type: 'user',
//         timestamp: new Date(),
//         status: 'sent',
//         file: filePreview
//       };
  
//       if (currentChat) {
//         const updatedChat = {
//           ...currentChat,
//           messages: [...currentChat.messages, newMessage]
//         };
  
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       }
//     });
  
//     setIsUploadModalOpen(false);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleAuthSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setFormError('');
//     setFormSuccess('');
    
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     if (isLogin) {
//       setFormSuccess('Successfully logged in!');
//     } else {
//       setFormSuccess('Account created successfully!');
//     }
    
//     setLoading(false);
//     setTimeout(() => {
//       setIsLoginModalOpen(false);
//       setFormSuccess('');
//     }, 1500);
//   };

//   const handleIntroductionComplete = (name: string) => {
//     setUserName(name);
//     setShowIntroduction(false);
//     setShowGreeting(true);
//   };

//   const handleSignupSuccess = (userData: { name: string; email: string }) => {
//     handleAuthSuccess(userData);
//     setShowIntroduction(true);
//   };

//   const handleAuthSuccess = (userData: { name: string; email: string }) => {
//     setIsAuthenticated(true);
//     setUserProfile(userData);
//     setIsLoginModalOpen(false);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserProfile(null);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setActiveChat(null);
//     setStarredChats([]);
//   };

//   const Greeting = React.memo(() => {
//     const [displayText, setDisplayText] = useState('');
//     const [hasTyped, setHasTyped] = useState(false);
//     const hour = new Date().getHours();
//     const greetingText = hour >= 0 && hour < 12
//       ? 'Good morning'
//       : hour >= 12 && hour < 16
//         ? 'Good afternoon'
//         : 'Good evening';

//     useEffect(() => {
//       if (!hasTyped) {
//         const fullText = `${greetingText}, ${userName || 'Ved'}`;
//         let timeouts: NodeJS.Timeout[] = [];

//         [...fullText].forEach((char, index) => {
//           const timeout = setTimeout(() => {
//             setDisplayText(prev => prev + char);
//             if (index === fullText.length - 1) {
//               setHasTyped(true);
//             }
//           }, 100 * index);
//           timeouts.push(timeout);
//         });

//         return () => timeouts.forEach(clearTimeout);
//       }
//     }, []);

//     return (
//       <h1 className="text-4xl font-light text-center">
//         {hasTyped ? `${greetingText}, ${userName || 'Ved'}` : displayText}
//       </h1>
//     );
//   });

//   const handleVoiceTranscript = (text: string) => {
//     setInputText(text);
//   };

//   const handleVoiceStateChange = (isListening: boolean) => {
//     setIsMicActive(isListening);
//   };

//   const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//     setSelectedLanguage(language);
    
//     if (currentChat && currentChat.messages.length > 0) {
//       try {
//         setIsGenerating(true);
        
//         const translatedMessages = await Promise.all(
//           currentChat.messages.map(async (msg) => {
//             const translatedContent = await translateText(msg.content, language.name);
//             return {
//               ...msg,
//               content: translatedContent
//             };
//           })
//         );
        
//         const updatedChat = {
//           ...currentChat,
//           messages: translatedMessages
//         };
        
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       } catch (error) {
//         console.error('Translation failed:', error);
//       } finally {
//         setIsGenerating(false);
//       }
//     }
//   };

//   const parseMessageContent = (content: string) => {
//     const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//     const parts = [];
//     let lastIndex = 0;
//     let match;

//     while ((match = codeBlockRegex.exec(content)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push({
//           type: 'text',
//           content: content.slice(lastIndex, match.index)
//         });
//       }

//       parts.push({
//         type: 'code',
//         language: match[1] || 'plaintext',
//         content: match[2].trim()
//       });

//       lastIndex = match.index + match[0].length;
//     }
    

//     if (lastIndex < content.length) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex)
//       });
//     }

//     return parts.length > 0 ? parts : [{ type: 'text', content }];
//   };

//   const handleCodeClick = (content: string, language: string) => {
//     setSelectedCode({ content, language });
//     setIsInfoPanelOpen(true);
//   };

//   const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = e.target;
//     const value = textarea.value;
    
//     if (!value.trim()) {
//       textarea.style.height = '56px';
//     } else {
//       textarea.style.height = 'inherit';
//       textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//     }
    
//     setInputText(value);
//   };

//   const handleCodeBlockClick = (content: string, language: string) => {
//     setSelectedCodeBlock({
//       content: content.trim(),
//       language: language || 'plaintext'
//     });
//     setIsCodeSliderOpen(true);
//   };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       <div className={`flex h-screen overflow-hidden ${
//         isDarkMode 
//           ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//           : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//       }`}>
//         {/* Fixed brand text container */}
//         <div className={`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${
//           isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//         }`}>
//           <span 
//             className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent"
//             style={{
//               background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//               WebkitBackgroundClip: 'text',
//               textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//               WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//               letterSpacing: '0.5px'
//             }}
//           >
//             Hind AI
//           </span>
//         </div>

//         {/* Sidebar */}
//         <div 
//           className={`${
//             isSidebarOpen ? 'w-72' : 'w-16'
//           } fixed md:relative h-full transition-all duration-300 ease-in-out ${
//             isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//           } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`}
//         >
//           {/* Top section - only toggle button */}
//           <div className="flex items-center p-4">
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
//               className="text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//             >
//               <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//             </button>
//           </div>

//           {/* Main content with icons-only when collapsed */}
//           <nav className="flex-1 px-2">
//             <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
//               onClick={handleNewChat}
//             >
//               <i className="fa-solid fa-plus w-8"></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 New Chat
//               </span>
//             </button>

//             {/* Search section */}
//             <div className="px-2 mb-4">
//               {isSidebarOpen ? (
//                 <div className="relative">
//                   <input
//                     type="search"
//                     placeholder="Search conversations..."
//                     className={`w-full pl-9 pr-4 py-2 ${
//                       isDarkMode 
//                         ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                         : 'bg-gray-100 text-gray-800'
//                     } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                   />
//                   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => setIsSidebarOpen(true)}
//                   className={`w-full p-2 rounded-lg ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}
//                 >
//                   <i className="fa-solid fa-magnifying-glass"></i>
//                 </button>
//               )}
//             </div>

//             {/* Starred Chats Section */}
//             <div className="mb-4">
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <button
//                   onClick={() => {
//                     if (!isSidebarOpen) {
//                       setChatListInitialTab('starred');
//                       setIsChatListOpen(true);
//                     }
//                   }}
//                   className="relative"
//                 >
//                   <i className="fa-solid fa-star text-yellow-500 w-8"></i>
//                 </button>
//                 {isSidebarOpen && <span className="text-sm font-medium">Starred Chats</span>}
//               </div>
//               <div className="space-y-1">
//                 {chats
//                   .filter(chat => chat.isStarred)
//                   .map((chat) => (
//                     <div
//                       key={`starred_${chat.id}`}
//                       className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                       onClick={() => handleChatSelect(chat)}
//                     >
//                       <i className="fas fa-comment-alt w-8 text-yellow-500/80"></i>
//                       {isSidebarOpen && (
//                         <>
//                           <span className="ml-2 truncate flex-1">{chat.title}</span>
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className="ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//                           >
//                             <i className="fas fa-star text-yellow-500"></i>
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* All Chats Section */}
//             <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen) {
//                     setChatListInitialTab('all');
//                     setIsChatListOpen(true);
//                   }
//                 }}
//                 className="relative"
//               >
//                 <i className="fa-solid fa-comments w-8"></i>
//               </button>
//               {isSidebarOpen && <span className="text-sm font-medium">All Chats</span>}
//             </div>
            
//             {/* Chat list section */}
//             <div className="space-y-1">
//               {chats
//                 .filter(chat => !chat.isStarred) // Only show non-starred chats in this section
//                 .map((chat) => (
//                   <div
//                     key={`all_${chat.id}`}
//                     className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                       isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                     }`}
//                     onClick={() => handleChatSelect(chat)}
//                   >
//                     <i className="fa-regular fa-comment w-8"></i>
//                     {isSidebarOpen && (
//                       <>
//                         <span className="ml-2 truncate flex-1">{chat.title}</span>
//                         <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100">
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className={`p-1 rounded-full transition-colors ${
//                               chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//                             }`}
//                           >
//                             <i className="fa-solid fa-star"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//                           >
//                             <i className="fa-solid fa-trash"></i>
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </nav>

//           {/* Auth section at bottom */}
//           <div className="mt-auto p-2 border-t border-gray-700/50">
//             {isAuthenticated ? (
//               <div className="space-y-1">
//                 <div className="flex items-center p-2 rounded-lg">
//                   <i className="fa-solid fa-user w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     {userProfile?.name}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//                 >
//                   <i className="fa-solid fa-right-from-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Logout
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-1">
//                 <button className="w-full flex items-center p-2" onClick={() => setIsLoginModalOpen(true)}>
//                   <i className="fa-solid fa-right-to-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Login
//                   </span>
//                 </button>
//                 <button 
//                   className="w-full flex items-center p-2 text-indigo-500"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setIsLoginModalOpen(true);
//                   }}
//                 >
//                   <i className="fa-solid fa-user-plus w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Sign Up
//                   </span>
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={toggleDarkMode}
//               className="w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//             >
//               <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8`}></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col relative pt-16 pl-16">
//           <div className={`flex-1 overflow-y-auto ${hasMessages ? 'pb-32' : ''}`}>
//             {/* Messages container */}
//             <div className={`w-full max-w-3xl mx-auto ${
//               hasMessages ? 'min-h-full flex flex-col' : ''
//             }`}>
//               {showGreeting && !hasMessages && (
//                 <div className="flex justify-center items-center min-h-[200px]">
//                   <Greeting />
//                 </div>
//               )}

//               {/* Messages section */}
//               <div className="flex-1 space-y-4 py-4 px-4">
//                 {messages.map((message, index) => (
//                   <div
//                     key={`${message.id}_${index}`}
//                     className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
//                     style={{
//                       animationDelay: `${index * 100}ms`,
//                     }}
//                   >
//                     <div
//                       className={`max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${
//                         message.type === 'user'
//                           ? isDarkMode
//                             ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//                             : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//                           : isDarkMode
//                             ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//                             : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//                       }`}
//                       style={{
//                         backdropFilter: 'blur(8px)',
//                       }}
//                     >
//                       <div className="flex items-center justify-between mb-1">
//                         <div className="flex items-center">
//                           <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                           <span className="text-sm opacity-75">
//                             {new Date(message.timestamp).toLocaleTimeString()}
//                           </span>
//                         </div>
//                         {renderMessageStatus(message.status)}
//                       </div>
                      
//                       {message.file && (
//                         <div className="mb-2">
//                           {message.file.type.startsWith('image/') ? (
//                             <div className="relative rounded-lg overflow-hidden">
//                               <img 
//                                 src={message.file.url} 
//                                 alt={message.file.name}
//                                 className="max-w-full h-auto rounded-lg"
//                               />
//                               <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
//                                 <div className="flex items-center">
//                                   <i className="fas fa-image mr-2"></i>
//                                   <span className="truncate">{message.file.name}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ) : message.file.type === 'application/pdf' ? (
//                             <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                               <i className="fas fa-file-pdf text-2xl text-red-400"></i>
//                               <div className="flex-1 min-w-0">
//                                 <div className="truncate">{message.file.name}</div>
//                                 <div className="text-sm opacity-75">PDF Document</div>
//                               </div>
//                               <a 
//                                 href={message.file.url} 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                               >
//                                 <i className="fas fa-external-link-alt"></i>
//                               </a>
//                             </div>
//                           ) : (
//                             <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                               <i className="fas fa-file text-2xl text-blue-400"></i>
//                               <div className="flex-1 min-w-0">
//                                 <div className="truncate">{message.file.name}</div>
//                                 <div className="text-sm opacity-75">Document</div>
//                               </div>
//                               <a 
//                                 href={message.file.url} 
//                                 target="_blank" 
//                                 rel="noopener noreferrer"
//                                 className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                               >
//                                 <i className="fas fa-download"></i>
//                               </a>
//                             </div>
//                           )}
//                         </div>
//                       )}
                      
//                       <div className="space-y-4">
//                         {parseMessageContent(message.content).map((part, index) => (
//                           part.type === 'code' ? (
//                             <div 
//                               key={index}
//                               onClick={() => handleCodeBlockClick(part.content, part.language)}
//                               className={`cursor-pointer group rounded-lg overflow-hidden ${
//                                 isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                               }`}
//                             >
//                               <div className={`flex items-center justify-between px-4 py-2 ${
//                                 isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//                               }`}>
//                                 <div className="flex items-center space-x-2">
//                                   <i className="fas fa-code"></i>
//                                   <span className={`text-sm font-medium ${
//                                     isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                                   }`}>
//                                     {part.language}
//                                   </span>
//                                 </div>
//                                 <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
//                                   isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                                 }`}>
//                                   <i className="fas fa-expand-alt"></i>
//                                 </div>
//                               </div>
//                               <div className="p-4 max-h-60 overflow-hidden relative">
//                                 <pre className="overflow-x-auto">
//                                   <code className={`language-${part.language} ${
//                                     isDarkMode ? 'text-gray-300' : 'text-gray-800'
//                                   }`}>
//                                     {part.content}
//                                   </code>
//                                 </pre>
//                                 <div className={`absolute bottom-0 inset-x-0 h-8 ${
//                                   isDarkMode 
//                                     ? 'bg-gradient-to-t from-gray-800' 
//                                     : 'bg-gradient-to-t from-gray-50'
//                                 }`}></div>
//                               </div>
//                             </div>
//                           ) : (
//                             <p key={index} className="text-base leading-relaxed whitespace-pre-wrap">
//                               {part.content}
//                             </p>
//                           )
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <div ref={messagesEndRef} />  
//               </div>

//               {/* Chat input section */}
//               <div className={`${
//                 hasMessages 
//                   ? 'fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4'
//                   : 'sticky bottom-6 w-full max-w-3xl mx-auto'
//               }`}>
//                 <div className="max-w-4xl mx-auto">
//                   <div className={`relative rounded-[20px] shadow-lg chat-glow transition-colors ${
//                     isDarkMode ? 'bg-gray-800' : 'bg-white'
//                   }`}>
//                     {activeFilePreview && (
//                       <div className={`w-full px-4 py-3 ${
//                         isDarkMode 
//                           ? 'bg-gray-700/30' 
//                           : 'bg-gray-50/50'
//                       }`}>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-3">
//                             <i className={`fas ${
//                               activeFilePreview.type.startsWith('image/')
//                                 ? 'fa-image text-green-400'
//                                 : activeFilePreview.type === 'application/pdf'
//                                   ? 'fa-file-pdf text-red-400'
//                                   : 'fa-file text-blue-400'
//                             } text-lg`}></i>
//                             <div className="flex flex-col">
//                               <span className="text-sm font-medium truncate max-w-[200px]">
//                                 {activeFilePreview.name}
//                               </span>
//                               <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                 Ready to send
//                               </span>
//                             </div>
//                           </div>
//                           <button 
//                             onClick={() => setActiveFilePreview(null)}
//                             className={`p-1.5 rounded-full transition-colors ${
//                               isDarkMode 
//                                 ? 'hover:bg-gray-600 text-gray-400' 
//                                 : 'hover:bg-gray-200 text-gray-500'
//                             }`}
//                           >
//                             <i className="fas fa-times"></i>
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {messages.length > 0 && messages[messages.length - 1].file && (
//                       <div className={`w-full px-4 py-2 ${
//                         isDarkMode 
//                           ? 'bg-gray-700/30' 
//                           : 'bg-gray-50/50'
//                       }`}>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <i className={`fas ${
//                               messages[messages.length - 1].file?.type.startsWith('image/')
//                                 ? 'fa-image text-green-400'
//                                 : messages[messages.length - 1].file?.type === 'application/pdf'
//                                   ? 'fa-file-pdf text-red-400'
//                                   : 'fa-file text-blue-400'
//                             }`}></i>
//                             <span className="text-sm truncate max-w-[200px]">
//                               {messages[messages.length - 1].file?.name}
//                             </span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                               File attached
//                             </span>
//                             <i className="fas fa-check text-green-400"></i>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     <div className="relative flex flex-col">
//                       <div className="min-h-[56px] max-h-[200px] overflow-hidden">
//                         <textarea
//                           className={`w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${
//                             isDarkMode 
//                               ? 'bg-gray-800 text-gray-200 placeholder-gray-400' 
//                               : 'bg-white text-gray-800 placeholder-gray-500'
//                           }`}
//                           value={inputText}
//                           onChange={handleTextAreaResize}
//                           placeholder={`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter' && !e.shiftKey) {
//                               e.preventDefault();
//                               if (activeFilePreview || inputText.trim()) {
//                                 handleSendMessage();
//                               }
//                             }
//                           }}
//                           style={{
//                             minHeight: '56px',
//                             maxHeight: '200px'
//                           }}
//                         />
//                       </div>

//                       <div className={`flex items-center justify-between p-4 rounded-b-[20px] ${
//                         isDarkMode ? 'bg-gray-800' : 'bg-white'
//                       }`}>
//                         <div className="flex items-center space-x-2">
//                           <div className="relative">
//                             <button
//                               onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
//                               className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm ${
//                                 isDarkMode 
//                                   ? 'hover:bg-gray-700 text-gray-300' 
//                                   : 'hover:bg-gray-100 text-gray-600'
//                               } transition-all duration-300`}
//                             >
//                               <i className={`fas ${models.find(m => m.name === selectedModel)?.icon}`}></i>
//                               <span className="hidden sm:inline">{selectedModel}</span>
//                               <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
//                                 isModelDropdownOpen ? 'rotate-180' : 'rotate-0'
//                               }`}></i>
//                             </button>

//                             {isModelDropdownOpen && (
//                               <DropdownPortal>
//                                 <div 
//                                   className="fixed inset-0 pointer-events-none"
//                                   onClick={() => setIsModelDropdownOpen(false)}
//                                 >
//                                   <div 
//                                     className={`absolute pointer-events-auto ${
//                                       isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
//                                     } border rounded-lg shadow-lg overflow-hidden`}
//                                     style={{
//                                       left: modelButtonRef.current?.getBoundingClientRect().left + 'px',
//                                       top: modelButtonRef.current?.getBoundingClientRect().bottom + 8 + 'px',
//                                       width: '192px'
//                                     }}
//                                     onClick={e => e.stopPropagation()}
//                                   >
//                                   </div>
//                                 </div>
//                               </DropdownPortal>
//                             )}
//                           </div>
                          
//                           <LanguageSelector
//                             isDarkMode={isDarkMode}
//                             onLanguageChange={handleLanguageChange}
//                             selectedLanguage={selectedLanguage}
//                             className="z-[60]"
//                             dropdownPosition="bottom"
//                           />
//                         </div>
                        
//                         <div className="flex items-center space-x-2">
//                           <button
//                             className={`p-2 rounded-full transition-colors ${
//                               isDarkMode 
//                                 ? 'text-gray-400 hover:text-blue-400' 
//                                 : 'text-gray-400 hover:text-indigo-600'
//                             }`}
//                             onClick={() => setIsUploadModalOpen(true)}
//                           >
//                             <i className="fas fa-paperclip"></i>
//                           </button>
                          
//                           <button
//                             className={`p-2 rounded-full transition-colors ${
//                               isDarkMode 
//                                 ? 'text-gray-400 hover:text-blue-400' 
//                                 : 'text-gray-400 hover:text-indigo-600'
//                             }`}
//                             onClick={() => setIsMicActive(!isMicActive)}
//                           >
//                             <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                           </button>
                          
//                           <button
//                             className={`rounded-full p-2.5 transition-colors ${
//                               isDarkMode 
//                                 ? 'bg-blue-600 hover:bg-blue-700' 
//                                 : 'bg-indigo-600 hover:bg-indigo-700'
//                             } text-white`}
//                             onClick={handleSendMessage}
//                           >
//                             <i className="fas fa-paper-plane"></i>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {isUploadModalOpen && (
//                     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
//                       <div 
//                         className={`relative w-full max-w-md mx-4 p-6 rounded-xl shadow-lg ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-white'
//                         }`}
//                       >
//                         <button 
//                           onClick={() => setIsUploadModalOpen(false)}
//                           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//                         >
//                           <i className="fas fa-times"></i>
//                         </button>
                        
//                         <div className="flex space-x-2 mb-4">
//                           <button
//                             className={`flex-1 p-2 rounded-lg transition-colors ${
//                               activeUploadTab === 'computer' 
//                                 ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') 
//                                 : ''
//                             }`}
//                             onClick={() => setActiveUploadTab('computer')}
//                           >
//                             <i className="fas fa-laptop-house mr-2"></i>
//                             Computer
//                           </button>
//                           <button
//                             className={`flex-1 p-2 rounded-lg transition-colors ${
//                               activeUploadTab === 'drive' 
//                                 ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') 
//                                 : ''
//                             }`}
//                             onClick={() => setActiveUploadTab('drive')}
//                           >
//                             <i className="fab fa-google-drive mr-2"></i>
//                             Google Drive
//                           </button>
//                         </div>

//                         {activeUploadTab === 'computer' ? (
//                           <div 
//                             onDragOver={handleDragOver}
//                             onDragLeave={handleDragLeave}
//                             onDrop={handleDrop}
//                             className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
//                               isDragging
//                                 ? (isDarkMode ? 'border-blue-500 bg-blue-500/10' : 'border-blue-500 bg-blue-50')
//                                 : (isDarkMode ? 'border-gray-600' : 'border-gray-300')
//                             } ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
//                           >
//                             <i className="fas fa-cloud-upload-alt text-4xl mb-4"></i>
//                             <p className="mb-2">Drag and drop files here</p>
//                             <p className="text-sm opacity-75">or</p>
//                             <button
//                               onClick={() => fileInputRef.current?.click()}
//                               className={`mt-4 px-4 py-2 rounded-lg transition-colors ${
//                                 isDarkMode
//                                   ? 'bg-blue-600 hover:bg-blue-700 text-white'
//                                   : 'bg-blue-500 hover:bg-blue-600 text-white'
//                               }`}
//                             >
//                               Choose Files
//                             </button>
//                             <input
//                               ref={fileInputRef}
//                               type="file"
//                               multiple
//                               className="hidden"
//                               onChange={handleFileInput}
//                             />
//                             <p className="mt-4 text-sm opacity-75">
//                               Supported files: Images, PDFs, Documents
//                             </p>
//                           </div>
//                         ) : (
//                           <GoogleDriveSelector
//                             onFileSelect={(file) => {
//                               setActiveFilePreview({
//                                 name: file.name,
//                                 type: file.mimeType,
//                                 url: file.webViewLink
//                               });
//                               setIsUploadModalOpen(false);
//                             }}
//                             isDarkMode={isDarkMode}
//                           />
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Only show additional components when no messages */}
//             {!hasMessages && (
//               <div className="max-w-[850px] mx-auto mt-6">
//                 {activeTab === 'analysis' && (
//                   <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                     <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                     <div ref={chartRef} style={{ height: '300px' }}></div>
//                   </div>
//                 )}

//                 <div className="mt-6 space-y-8">
//                   {/* Starred Chats Section */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         <i className="fas fa-star mr-2 text-yellow-500"></i>
//                         <span>Starred chats</span>
//                       </div>
//                     </div>
//                     {chats.some(chat => chat.isStarred) ? (
//                       <div className={`${
//                         isDarkMode 
//                           ? 'bg-gray-800 shadow-gray-900/20' 
//                           : 'bg-white shadow-sm'
//                       } rounded-xl p-4`}>
//                         <ul className="space-y-2">
//                           {chats
//                             .filter(chat => chat.isStarred)
//                             .map(chat => (
//                               <li
//                                 key={`starred_${chat.id}`}
//                                 className={`group ${
//                                   isDarkMode 
//                                     ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                     : 'hover:bg-blue-50 hover:border-blue-100'
//                                 } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                               >
//                                 <div className="flex items-center space-x-2">
//                                   <i className="fas fa-comment-alt text-gray-400"></i>
//                                   <span>{chat.title}</span>
//                                 </div>
//                                 <i className="fas fa-star text-yellow-500"></i>
//                               </li>
//                             ))}
//                         </ul>
//                       </div>
//                     ) : (
//                       <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                         No starred chats yet
//                       </p>
//                     )}
//                   </div>

//                   {/* Recent Chats Section */}
//                   <div>
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         <i className="fas fa-history mr-2"></i>
//                         <span>Your recent chats</span>
//                         <button
//                           className={`ml-2 px-3 py-1 rounded-full transition-colors ${
//                             isDarkMode 
//                               ? 'bg-gray-700 hover:bg-gray-600' 
//                               : 'bg-gray-100 hover:bg-gray-200'
//                           }`}
//                           onClick={() => setIsShowingChats(!isShowingChats)}
//                         >
//                           {isShowingChats ? 'Hide' : 'Show'}
//                         </button>
//                       </div>
//                       {isShowingChats && chats.length > 3 && (
//                         <button
//                           onClick={() => setShowAllChats(!showAllChats)}
//                           className="text-gray-400 hover:text-gray-500 transition-colors"
//                         >
//                           {showAllChats ? 'Show less' : 'View all'}
//                         </button>
//                       )}
//                     </div>
//                     {isShowingChats && (
//                       <div className={`${
//                         isDarkMode 
//                           ? 'bg-gray-800 shadow-gray-900/20' 
//                           : 'bg-white shadow-sm'
//                       } rounded-xl p-4`}>
//                         {chats.length > 0 ? (
//                           <ul className="space-y-2">
//                             {chats
//                               .slice(0, showAllChats ? undefined : 3)
//                               .map(chat => (
//                                 <li
//                                   key={`recent_${chat.id}`}
//                                   className={`group ${
//                                     isDarkMode 
//                                       ? 'hover:bg-gray-700 hover:border-gray-600' 
//                                       : 'hover:bg-blue-50 hover:border-blue-100'
//                                   } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                 >
//                                   <div className="flex items-center space-x-2">
//                                     <i className="fas fa-comment-alt text-gray-400"></i>
//                                     <span>{chat.title}</span>
//                                   </div>
//                                   <button
//                                     onClick={(e) => handleStarChat(chat.id, e)}
//                                     className={`transition-colors ${
//                                       chat.isStarred
//                                         ? (isDarkMode ? 'text-yellow-400' : 'text-yellow-500')
//                                         : (isDarkMode ? 'text-gray-400 hover:text-yellow-400' : 'text-gray-400 hover:text-yellow-500')
//                                     }`}
//                                   >
//                                     <i className={`fas ${chat.isStarred ? 'fa-star' : 'fa-star'}`}></i>
//                                   </button>
//                                 </li>
//                               ))}
//                           </ul>
//                         ) : (
//                           <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                             No recent chats available
//                           </p>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <ChatListPopup
//         isOpen={isChatListOpen}
//         onClose={() => setIsChatListOpen(false)}
//         chats={chats}
//         onChatSelect={handleChatSelect}
//         onStarChat={handleStarChat}
//         onDeleteChat={handleDeleteChat}
//         isDarkMode={isDarkMode}
//         initialTab={chatListInitialTab}
//       />
//       <VoiceInput
//         isActive={isMicActive}
//         onTranscript={handleVoiceTranscript}
//         onStateChange={handleVoiceStateChange}
//         isDarkMode={isDarkMode}
//       />
//       <InfoPanel
//         isOpen={isInfoPanelOpen}
//         onClose={() => {
//           setIsInfoPanelOpen(false);
//           setSelectedCode(null);
//         }}
//         isDarkMode={isDarkMode}
//         code={selectedCode || undefined}
//       />
//       <CodeSlider
//         isOpen={isCodeSliderOpen}
//         onClose={() => {
//           setIsCodeSliderOpen(false);
//           setSelectedCodeBlock(null);
//         }}
//         code={selectedCodeBlock?.content || ''}
//         language={selectedCodeBlock?.language || 'plaintext'}
//         isDarkMode={isDarkMode}
//       />
//       <div id="dropdown-root" className="fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;









// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';
// import ActionCapsules from './components/ActionCapsules';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// // Update Project interface
// interface Project {
//   id: string;
//   name: string;
//   createdAt: Date;
//   chats: Chat[];
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');
//   const [isShowingStarredChats, setIsShowingStarredChats] = useState(true);
//   const [showAllStarredChats, setShowAllStarredChats] = useState(false);
//   const [isNewChatStarted, setIsNewChatStarted] = useState(false);
//   const modelButtonRef = useRef<HTMLButtonElement>(null);
//   const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
//   const [isShowingProjects, setIsShowingProjects] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);
//   // Add new states
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isProjectChatListOpen, setIsProjectChatListOpen] = useState(false);

//   const models = [
//     { id: 'gpt4', name: 'GPT-4', icon: 'fa-robot' },
//     { id: 'claude', name: 'Claude 3', icon: 'fa-brain' },
//     { id: 'nextchat', name: 'NextChat', icon: 'fa-comment-dots' },
//   ];

//   const toggleDarkMode = () => { 
//     setIsDarkMode(prev => !prev);
//   };

//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'Untitled Chat', // Default title until first message
//       createdAt: new Date(),
//       messages: []
//     };
    
//     // Update chats array ensuring no duplicates by ID
//     setChats(prev => {
//       const chatExists = prev.some(chat => chat.id === newChat.id);
//       if (chatExists) return prev;
//       return [newChat, ...prev];
//     });
    
//     setCurrentChat(newChat);
//     setShowGreeting(false);
//     setIsChatActive(true);
//     setMessages([]);
//     setIsNewChatStarted(true);
//     // Add these two lines to hide both chat sections
//     setIsShowingChats(false);
//     setIsShowingStarredChats(false);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleChatSelect = (chat: Chat) => {
//     if (currentChat?.id === chat.id) return; // Prevent unnecessary updates
    
//     setCurrentChat(chat);
//     setMessages(chat.messages);
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
//     setIsNewChatStarted(false);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     setChats(prev => prev.filter(chat => chat.id !== chatId));
    
//     if (currentChat?.id === chatId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     if (!isSidebarOpen && !isHovered) {
//       setIsSearchActive(false);
//     }
//   }, [isSidebarOpen, isHovered]);

//   const resetTextAreaHeight = () => {
//     const textarea = document.querySelector('textarea');
//     if (textarea) {
//       textarea.style.height = '56px';
//     }
//   };

//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const handleSendMessage = async () => {
//     if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;
    
//     setHasMessages(true); // Set to true when first message is sent
    
//     if (isMicActive) {
//       setIsMicActive(false);
//     }
    
//     // Switch to clean view when first message is sent
//     setIsCleanView(true);
    
//     let chatToUse = currentChat;
    
//     // Create a new chat if there isn't one
//     if (!chatToUse) {
//       chatToUse = {
//         id: Date.now().toString(),
//         title: 'New Chat',  // We'll update this after the first message
//         createdAt: new Date(),
//         messages: []
//       };
//       setCurrentChat(chatToUse);
//       setChats(prev => [chatToUse, ...prev]);
//     }
    
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     // Generate unique IDs for messages
//     const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
//     const newMessage: Message = {
//       id: messageId,
//       content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending',
//       file: activeFilePreview || undefined
//     };

//     try {
//       const updatedChat = {
//         ...chatToUse,
//         messages: [...chatToUse.messages, newMessage],
//         // Update the title if this is the first message
//         title: chatToUse.messages.length === 0 
//           ? (inputText.length > 30 ? `${inputText.substring(0, 30)}...` : inputText)
//           : chatToUse.title
//       };

//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//       setInputText('');
//       resetTextAreaHeight();
//       setIsGenerating(true);

//       const aiResponseText = await generateResponse(inputText);
      
//       const sentMessage = { ...newMessage, status: 'sent' };
      
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponseText,
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };

//       const finalChat = {
//         ...updatedChat,
//         messages: [
//           ...updatedChat.messages.map(msg => 
//             msg.id === newMessage.id ? sentMessage : msg
//           ),
//           aiResponse
//         ]
//       };

//       setChats(prev => prev.map(c => 
//         c.id === finalChat.id ? finalChat : c
//       ));
//       setCurrentChat(finalChat);
//       setMessages(finalChat.messages);
//       setActiveFilePreview(null);

//     } catch (error) {
//       console.error('Failed to send message:', error);
//       const errorMessage = { ...newMessage, status: 'error' };
      
//       const errorChat = {
//         ...currentChat,
//         messages: currentChat?.messages.map(msg =>
//           msg.id === newMessage.id ? errorMessage : msg
//         ) || []
//       };
      
//       setChats(prev => prev.map(c => 
//         c.id === currentChat?.id ? errorChat : c
//       ));
//       setCurrentChat(errorChat);
//       setMessages(errorChat.messages);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const renderMessageStatus = (status: Message['status']) => {
//     switch (status) {
//       case 'sending':
//         return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2"></i>;
//       case 'sent':
//         return <i className="fas fa-check text-green-500 ml-2"></i>;
//       case 'error':
//         return <i className="fas fa-exclamation-circle text-red-500 ml-2"></i>;
//       default:
//         return null;
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       const fileUrl = URL.createObjectURL(file);
//       const filePreview = {
//         name: file.name,
//         type: file.type,
//         url: fileUrl
//       };
//       setActiveFilePreview(filePreview);
      
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: `Attached: ${file.name}`,
//         type: 'user',
//         timestamp: new Date(),
//         status: 'sent',
//         file: filePreview
//       };
  
//       if (currentChat) {
//         const updatedChat = {
//           ...currentChat,
//           messages: [...currentChat.messages, newMessage]
//         };
  
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       }
//     });
  
//     setIsUploadModalOpen(false);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
//     setLoading(true);
//     setFormError('');
//     setFormSuccess('');
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       if (isLogin) {
//         setFormSuccess('Successfully logged in!');
//         handleAuthSuccess({ 
//           name: data.email.split('@')[0], 
//           email: data.email 
//         });
//       } else {
//         setFormSuccess('Account created successfully!');
//         handleSignupSuccess({ 
//           name: data.name || data.email.split('@')[0], 
//           email: data.email 
//         });
//       }
      
//     } catch (error) {
//       setFormError('Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add this new function to toggle between login and signup
//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setFormError('');
//     setFormSuccess('');
//   };

//   const handleIntroductionComplete = (name: string) => {
//     setUserName(name);
//     setShowIntroduction(false);
//     setShowGreeting(false);
//   };

//   const handleSignupSuccess = (userData: { name: string; email: string }) => {
//     handleAuthSuccess(userData);
//     setShowIntroduction(true);
//   };

//   const handleAuthSuccess = (userData: { name: string; email: string }) => {
//     setIsAuthenticated(true);
//     setUserProfile(userData);
//     setIsLoginModalOpen(false);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserProfile(null);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setActiveChat(null);
//     setStarredChats([]);
//   };

//   const Greeting = React.memo(() => {
//     const [displayText, setDisplayText] = useState('');
//     const hour = new Date().getHours();
//     const greetingText = hour >= 0 && hour < 12
//       ? 'Good morning'
//       : hour >= 12 && hour < 16
//         ? 'Good afternoon'
//         : 'Good evening';

//     useEffect(() => {
//       if (!hasGreetingPlayed) {
//         const fullText = `${greetingText}, ${userName || 'Ved'}`;
//         let timeouts: NodeJS.Timeout[] = [];

//         [...fullText].forEach((char, index) => {
//           const timeout = setTimeout(() => {
//             setDisplayText(prev => prev + char);
//             if (index === fullText.length - 1) {
//               setHasGreetingPlayed(true);
//             }
//           }, 100 * index);
//           timeouts.push(timeout);
//         });

//         return () => timeouts.forEach(clearTimeout);
//       } else {
//         setDisplayText(`${greetingText}, ${userName || 'Ved'}`);
//       }
//     }, [greetingText]);

//     return (
//       <h1 className="text-4xl font-light text-center">
//         {displayText}
//       </h1>
//     );
//   });

//   const handleVoiceTranscript = (text: string) => {
//     setInputText(text);
//   };

//   const handleVoiceStateChange = (isActive: boolean) => {
//     setIsMicActive(isActive);
//   };

//   const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//     setSelectedLanguage(language);
    
//     if (currentChat && currentChat.messages.length > 0) {
//       try {
//         setIsGenerating(true);
        
//         const translatedMessages = await Promise.all(
//           currentChat.messages.map(async (msg) => {
//             const translatedContent = await translateText(msg.content, language.name);
//             return {
//               ...msg,
//               content: translatedContent
//             };
//           })
//         );
        
//         const updatedChat = {
//           ...currentChat,
//           messages: translatedMessages
//         };
        
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       } catch (error) {
//         console.error('Translation failed:', error);
//       } finally {
//         setIsGenerating(false);
//       }
//     }
//   };

//   const parseMessageContent = (content: string) => {
//     const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//     const parts = [];
//     let lastIndex = 0;
//     let match;

//     while ((match = codeBlockRegex.exec(content)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push({
//           type: 'text',
//           content: content.slice(lastIndex, match.index)
//         });
//       }

//       parts.push({
//         type: 'code',
//         language: match[1] || 'plaintext',
//         content: match[2].trim()
//       });

//       lastIndex = match.index + match[0].length;
//     }
    

//     if (lastIndex < content.length) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex)
//       });
//     }

//     return parts.length > 0 ? parts : [{ type: 'text', content }];
//   };

//   const handleCodeClick = (content: string, language: string) => {
//     setSelectedCode({ content, language });
//     setIsInfoPanelOpen(true);
//   };

//   const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = e.target;
//     const value = textarea.value;
    
//     if (!value.trim()) {
//       textarea.style.height = '56px';
//     } else {
//       textarea.style.height = 'inherit';
//       textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//     }
    
//     setInputText(value);
//   };

//   const handleCodeBlockClick = (content: string, language: string) => {
//     setSelectedCodeBlock({
//       content: content.trim(),
//       language: language || 'plaintext'
//     });
//     setIsCodeSliderOpen(true);
//   };

//   const handleModelSelect = (modelName: string) => {
//     setSelectedModel(modelName);
//     setIsModelDropdownOpen(false);
//   };

//   const ModelDropdown = ({ onSelect }: { onSelect: (model: string) => void }) => {
//     return (
//       <div 
//         className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-n z-[9999] ${
//           isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
//         }`}
//       >
//         {models.map((model) => (
//           <button
//             key={model.id}
//             onClick={() => onSelect(model.name)}
//             className={`w-full flex items-center px-4 py-3 text-left ${
//               isDarkMode
//                 ? 'hover:bg-gray-600 text-gray-200'
//                 : 'hover:bg-gray-50 text-gray-700'
//             } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}
//           >
//             <i className={`fas ${model.icon} mr-3 ${
//               selectedModel === model.name ? 'text-blue-500' : 'text-gray-400'
//             }`}></i>
//             <span>{model.name}</span>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const handleActionCapsuleClick = (action: string, suggestion?: string) => {
//     let promptText = '';
    
//     if (suggestion) {
//       // If a suggestion was clicked, use it directly
//       switch (action) {
//         case 'explain':
//           promptText = `${suggestion}: `;
//           break;
//         case 'summarize':
//           promptText = `${suggestion} for: `;
//           break;
//         case 'translate':
//           promptText = `${suggestion}: `;
//           break;
//         case 'improve':
//           promptText = `${suggestion}: `;
//           break;
//         case 'code':
//           promptText = `${suggestion}: `;
//           break;
//       }
//     } else {
//       // Default prompts when capsule is clicked
//       switch (action) {
//         case 'explain':
//           promptText = 'Please explain this in detail: ';
//           break;
//         case 'summarize':
//           promptText = 'Please provide a summary of: ';
//           break;
//         case 'translate':
//           promptText = 'Please translate this to English: ';
//           break;
//         case 'improve':
//           promptText = 'Please improve the writing of this text: ';
//           break;
//         case 'code':
//           promptText = 'Please generate code for: ';
//           break;
//       }
//     }
//     setInputText(promptText);
//   };

//   // Update the handlers for toggling sections
//   const handleToggleStarredChats = () => {
//     if (!isShowingStarredChats) {
//       setIsShowingChats(false); // Hide recent chats when showing starred
//     }
//     setIsShowingStarredChats(!isShowingStarredChats);
//   };

//   const handleToggleRecentChats = () => {
//     if (!isShowingChats) {
//       setIsShowingStarredChats(false); // Hide starred chats when showing recent
//     }
//     setIsShowingChats(!isShowingChats);
//   };

//   // Add new handler for project click
//   const handleProjectClick = (project: Project) => {
//     setSelectedProject(project);
//     setIsProjectChatListOpen(true);
//   };

//   // Modify handleAddProject to include chats array
//   const handleAddProject = () => {
//     const newProject: Project = {
//       id: `proj_${Date.now()}`,
//       name: `Project ${projects.length + 1}`,
//       createdAt: new Date(),
//       chats: []
//     };
//     setProjects(prev => [newProject, ...prev]);
//   };

//   // Add handleNewProjectChat function
//   const handleNewProjectChat = (projectId: string) => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'Untitled Chat',
//       createdAt: new Date(),
//       messages: []
//     };

//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return {
//           ...project,
//           chats: [newChat, ...project.chats]
//         };
//       }
//       return project;
//     }));
//   };

//   const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setProjects(prev => prev.filter(project => project.id !== projectId));
//   };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       <div className={`flex h-screen overflow-hidden ${
//         isDarkMode 
//           ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//           : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//       }`}>
//         {/* Fixed brand text container */}
//         <div className={`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${
//           isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//         }`}>
//           <span 
//             onClick={handleHomeClick}  // Add this line
//             className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent hover:opacity-80 transition-opacity" // Add hover effect
//             style={{
//               background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//               WebkitBackgroundClip: 'text',
//               textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//               WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//               letterSpacing: '0.5px'
//             }}
//           >
//             Hind AI
//           </span>
//         </div>

//         {/* Sidebar */}
//         <div 
//           className={`${
//             isSidebarOpen ? 'w-72' : 'w-16'
//           } fixed md:relative h-full transition-all duration-300 ease-in-out ${
//             isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//           } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`}
//         >
//           {/* Top section - only toggle button */}
//           <div className="flex items-center p-4">
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
//               className="text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//             >
//               <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//             </button>
//           </div>

//           {/* Main content with icons-only when collapsed */}
//           <nav className="flex-1 px-2">
//             <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
//               onClick={handleNewChat}
//             >
//               <i className="fa-solid fa-plus w-8"></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 New Chat
//               </span>
//             </button>

//             {/* Search section */}
//             <div className="px-2 mb-4">
//               {isSidebarOpen ? (
//                 <div className="relative">
//                   <input
//                     type="search"
//                     placeholder="Search conversations..."
//                     className={`w-full pl-9 pr-4 py-2 ${
//                       isDarkMode 
//                         ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                         : 'bg-gray-100 text-gray-800'
//                     } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                   />
//                   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => setIsSidebarOpen(true)}
//                   className={`w-full p-2 rounded-lg ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}
//                 >
//                   <i className="fa-solid fa-magnifying-glass"></i>
//                 </button>
//               )}
//             </div>

//             {/* Projects Section */}
//             <div className="mb-4">
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <div className="flex items-center flex-1">
//                   <i className="fa-solid fa-folder text-blue-400 w-8"></i>
//                   {isSidebarOpen && (
//                     <div className="flex items-center flex-1">
//                       <span className="text-sm font-medium">Projects</span>
//                       <button
//                         onClick={handleAddProject}
//                         className={`ml-0.5 p-1 rounded-lg transition-colors ${
//                           isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//                         }`}
//                       >
//                         <i className="fa-solid fa-plus text-xs"></i>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {isSidebarOpen && projects.length > 0 && (
//                 <div className="space-y-1">
//                   {projects.map(project => (
//                     <div
//                       key={project.id}
//                       className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                       onClick={() => handleProjectClick(project)}
//                     >
//                       <i className="fa-regular fa-folder-open w-8 text-blue-400"></i>
//                       <span className="text-sm truncate flex-1">{project.name}</span>
//                       <button
//                         onClick={(e) => handleDeleteProject(project.id, e)}
//                         className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                           isDarkMode
//                             ? 'text-gray-400 hover:text-red-400'
//                             : 'text-gray-500 hover:text-red-500'
//                         }`}
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Starred Chats Section */}
//             <div className="mb-4">
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <button
//                   onClick={() => {
//                     if (!isSidebarOpen) {
//                       setChatListInitialTab('starred');
//                       setIsChatListOpen(true);
//                     }
//                   }}
//                   className="relative"
//                 >
//                   <i className="fa-solid fa-star text-yellow-500 w-8"></i>
//                 </button>
//                 {isSidebarOpen && <span className="text-sm font-medium">Starred Chats</span>}
//               </div>
//               <div className="space-y-1">
//                 {chats
//                   .filter(chat => chat.isStarred)
//                   .map((chat) => (
//                     <div
//                       key={`starred_${chat.id}`}
//                       className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                       onClick={() => handleChatSelect(chat)}
//                     >
//                       <i className="fas fa-comment-alt w-8 text-yellow-500/80"></i>
//                       {isSidebarOpen && (
//                         <>
//                           <span className="ml-2 truncate flex-1">{chat.title}</span>
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className="ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//                           >
//                             <i className="fas fa-star text-yellow-500"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                               isDarkMode
//                                 ? 'text-gray-400 hover:text-red-400'
//                                 : 'text-gray-500 hover:text-red-500'
//                             }`}
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* All Chats Section */}
//             <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen) {
//                     setChatListInitialTab('all');
//                     setIsChatListOpen(true);
//                   }
//                 }}
//                 className="relative"
//               >
//                 <i className="fa-solid fa-comments w-8"></i>
//               </button>
//               {isSidebarOpen && <span className="text-sm font-medium">All Chats</span>}
//             </div>
            
//             {/* Chat list section */}
//             <div className="space-y-1">
//               {chats
//                 .filter(chat => !chat.isStarred) // Only show non-starred chats in this section
//                 .map((chat) => (
//                   <div
//                     key={`all_${chat.id}`}
//                     className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                       isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                     }`}
//                     onClick={() => handleChatSelect(chat)}
//                   >
//                     <i className="fa-regular fa-comment w-8"></i>
//                     {isSidebarOpen && (
//                       <>
//                         <span className="ml-2 truncate flex-1">{chat.title}</span>
//                         <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100">
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className={`p-1 rounded-full transition-colors ${
//                               chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//                             }`}
//                           >
//                             <i className="fa-solid fa-star"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </nav>

//           {/* Auth section at bottom */}
//           <div className="mt-auto p-2 border-t border-gray-700/50">
//             {isAuthenticated ? (
//               <div className="space-y-1">
//                 <div className="flex items-center p-2 rounded-lg">
//                   <i className="fa-solid fa-user w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     {userProfile?.name}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//                 >
//                   <i className="fa-solid fa-right-from-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Logout
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-1">
//                 <button className="w-full flex items-center p-2" onClick={() => setIsLoginModalOpen(true)}>
//                   <i className="fa-solid fa-right-to-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Login
//                   </span>
//                 </button>
//                 <button 
//                   className="w-full flex items-center p-2 text-indigo-500"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setIsLoginModalOpen(true);
//                   }}
//                 >
//                   <i className="fa-solid fa-user-plus w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Sign Up
//                   </span>
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={toggleDarkMode}
//               className="w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//             >
//               <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8`}></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col relative pt-16 pl-16">
//           <div className={`flex-1 overflow-y-auto ${hasMessages ? 'pb-32' : ''}`}>
//             {/* Messages container */}
//             <div className={`w-full max-w-3xl mx-auto ${
//               hasMessages || isNewChatStarted ? 'min-h-full flex flex-col' : ''
//             }`}>
//               {showGreeting && !hasMessages && !isNewChatStarted ? (
//                 <div className="flex justify-center items-center min-h-[200px]">
//                   <Greeting />
//                 </div>
//               ) : (
//                 <div className="flex-1 flex flex-col justify-end">
//                   <div className="flex-1 space-y-4 py-4 px-4">
//                     {messages.map((message, index) => (
//                       <div
//                         key={`${message.id}_${index}`}
//                         className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
//                         style={{
//                           animationDelay: `${index * 100}ms`,
//                         }}
//                       >
//                         <div
//                           className={`max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${
//                             message.type === 'user'
//                               ? isDarkMode
//                                 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//                                 : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//                               : isDarkMode
//                                 ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//                                 : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//                           }`}
//                           style={{
//                             backdropFilter: 'blur(8px)',
//                           }}
//                         >
//                           <div className="flex items-center justify-between mb-1">
//                             <div className="flex items-center">
//                               <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                               <span className="text-sm opacity-75">
//                                 {new Date(message.timestamp).toLocaleTimeString()}
//                               </span>
//                             </div>
//                             {renderMessageStatus(message.status)}
//                           </div>
                          
//                           {message.file && (
//                             <div className="mb-2">
//                               {message.file.type.startsWith('image/') ? (
//                                 <div className="relative rounded-lg overflow-hidden">
//                                   <img 
//                                     src={message.file.url} 
//                                     alt={message.file.name}
//                                     className="max-w-full h-auto rounded-lg"
//                                   />
//                                   <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
//                                     <div className="flex items-center">
//                                       <i className="fas fa-image mr-2"></i>
//                                       <span className="truncate">{message.file.name}</span>
//                                     </div>
//                                   </div>
//                                 </div>
//                               ) : message.file.type === 'application/pdf' ? (
//                                 <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                   <i className="fas fa-file-pdf text-2xl text-red-400"></i>
//                                   <div className="flex-1 min-w-0">
//                                     <div className="truncate">{message.file.name}</div>
//                                     <div className="text-sm opacity-75">PDF Document</div>
//                                   </div>
//                                   <a 
//                                     href={message.file.url} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                   >
//                                     <i className="fas fa-external-link-alt"></i>
//                                   </a>
//                                 </div>
//                               ) : (
//                                 <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                   <i className="fas fa-file text-2xl text-blue-400"></i>
//                                   <div className="flex-1 min-w-0">
//                                     <div className="truncate">{message.file.name}</div>
//                                     <div className="text-sm opacity-75">Document</div>
//                                   </div>
//                                   <a 
//                                     href={message.file.url} 
//                                     target="_blank" 
//                                     rel="noopener noreferrer"
//                                     className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                   >
//                                     <i className="fas fa-download"></i>
//                                   </a>
//                                 </div>
//                               )}
//                             </div>
//                           )}
                          
//                           <div className="space-y-4">
//                             {parseMessageContent(message.content).map((part, index) => (
//                               part.type === 'code' ? (
//                                 <div 
//                                   key={index}
//                                   onClick={() => handleCodeBlockClick(part.content, part.language)}
//                                   className={`cursor-pointer group rounded-lg overflow-hidden ${
//                                     isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                                   }`}
//                                 >
//                                   <div className={`flex items-center justify-between px-4 py-2 ${
//                                     isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//                                   }`}>
//                                     <div className="flex items-center space-x-2">
//                                       <i className="fas fa-code"></i>
//                                       <span className={`text-sm font-medium ${
//                                         isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                                       }`}>
//                                         {part.language}
//                                       </span>
//                                     </div>
//                                     <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
//                                       isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                                     }`}>
//                                       <i className="fas fa-expand-alt"></i>
//                                     </div>
//                                   </div>
//                                   <div className="p-4 max-h-60 overflow-hidden relative">
//                                     <pre className="overflow-x-auto">
//                                       <code className={`language-${part.language} ${
//                                         isDarkMode ? 'text-gray-300' : 'text-gray-800'
//                                       }`}>
//                                         {part.content}
//                                       </code>
//                                     </pre>
//                                     <div className={`absolute bottom-0 inset-x-0 h-8 ${
//                                       isDarkMode 
//                                         ? 'bg-gradient-to-t from-gray-800' 
//                                         : 'bg-gradient-to-t from-gray-50'
//                                     }`}></div>
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <p key={index} className="text-base leading-relaxed whitespace-pre-wrap">
//                                   {part.content}
//                                 </p>
//                               )
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     <div ref={messagesEndRef} />  
//                   </div>
//                 </div>
//               )}

//               {/* Chat input section */}
//               <div className={`${
//                 hasMessages || isNewChatStarted
//                   ? 'fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4'
//                   : 'sticky bottom-6 w-full max-w-3xl mx-auto'
//               }`}>
//                 <div className="max-w-4xl mx-auto">
//                   <div className={`relative rounded-[20px] shadow-lg chat-glow transition-colors ${
//                     isDarkMode ? 'bg-gray-800' : 'bg-white'
//                   }`}>
//                     {activeFilePreview && (
//                       <div className={`w-full px-4 py-3 ${
//                         isDarkMode 
//                           ? 'bg-gray-700/30' 
//                           : 'bg-gray-50/50'
//                       }`}>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-3">
//                             <i className={`fas ${
//                               activeFilePreview.type.startsWith('image/')
//                                 ? 'fa-image text-green-400'
//                                 : activeFilePreview.type === 'application/pdf'
//                                   ? 'fa-file-pdf text-red-400'
//                                   : 'fa-file text-blue-400'
//                             } text-lg`}></i>
//                             <div className="flex flex-col">
//                               <span className="text-sm font-medium truncate max-w-[200px]">
//                                 {activeFilePreview.name}
//                               </span>
//                               <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                 Ready to send
//                               </span>
//                             </div>
//                           </div>
//                           <button 
//                             onClick={() => setActiveFilePreview(null)}
//                             className={`p-1.5 rounded-full transition-colors ${
//                               isDarkMode 
//                                 ? 'hover:bg-gray-600 text-gray-400' 
//                                 : 'hover:bg-gray-200 text-gray-500'
//                             }`}
//                           >
//                             <i className="fas fa-times"></i>
//                           </button>
//                         </div>
//                       </div>
//                     )}

//                     {messages.length > 0 && messages[messages.length - 1].file && (
//                       <div className={`w-full px-4 py-2 ${
//                         isDarkMode 
//                           ? 'bg-gray-700/30' 
//                           : 'bg-gray-50/50'
//                       }`}>
//                         <div className="flex items-center justify-between">
//                           <div className="flex items-center space-x-2">
//                             <i className={`fas ${
//                               messages[messages.length - 1].file?.type.startsWith('image/')
//                                 ? 'fa-image text-green-400'
//                                 : messages[messages.length - 1].file?.type === 'application/pdf'
//                                   ? 'fa-file-pdf text-red-400'
//                                   : 'fa-file text-blue-400'
//                             }`}></i>
//                             <span className="text-sm truncate max-w-[200px]">
//                               {messages[messages.length - 1].file?.name}
//                             </span>
//                           </div>
//                           <div className="flex items-center space-x-2">
//                             <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                               File attached
//                             </span>
//                             <i className="fas fa-check text-green-400"></i>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     <div className="relative flex flex-col">
//                       <div className="min-h-[56px] max-h-[200px] overflow-hidden">
//                         <textarea
//                           className={`w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${
//                             isDarkMode 
//                               ? 'bg-gray-800 text-gray-200 placeholder-gray-400' 
//                               : 'bg-white text-gray-800 placeholder-gray-500'
//                           }`}
//                           value={inputText}
//                           onChange={handleTextAreaResize}
//                           placeholder={`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter' && !e.shiftKey) {
//                               e.preventDefault();
//                               if (activeFilePreview || inputText.trim()) {
//                                 handleSendMessage();
//                               }
//                             }
//                           }}
//                           style={{
//                             minHeight: '56px',
//                             maxHeight: '200px'
//                           }}
//                         />
//                       </div>

//                       <div className={`flex items-center justify-between p-4 rounded-b-[20px] ${
//                         isDarkMode ? 'bg-gray-800' : 'bg-white'
//                       }`}>
//                         <div className="flex items-center space-x-2">
//                           <div className="relative inline-block">
//                             <button
//                               ref={modelButtonRef}
//                               onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
//                               className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm ${
//                                 isDarkMode 
//                                   ? 'hover:bg-gray-700 text-gray-300' 
//                                   : 'hover:bg-gray-100 text-gray-600'
//                               } transition-all duration-300`}
//                             >
//                               <i className={`fas ${models.find(m => m.name === selectedModel)?.icon}`}></i>
//                               <span className="hidden sm:inline">{selectedModel}</span>
//                               <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
//                                 isModelDropdownOpen ? 'rotate-180' : 'rotate-0'
//                               }`}></i>
//                             </button>

//                             {isModelDropdownOpen && (
//                               <ModelDropdown onSelect={handleModelSelect} />
//                             )}
//                           </div>
                          
//                           <div className="relative inline-block">
//                             <LanguageSelector
//                               isDarkMode={isDarkMode}
//                               onLanguageChange={handleLanguageChange}
//                               selectedLanguage={selectedLanguage}
//                               className="z-[9999]"
//                               dropdownPosition="absolute"
//                             />
//                           </div>
//                         </div>
                        
//                         <div className="flex items-center space-x-2">
//                           <button
//                             className={`p-2 rounded-full transition-colors ${
//                               isDarkMode 
//                                 ? 'text-gray-400 hover:text-blue-400' 
//                                 : 'text-gray-400 hover:text-indigo-600'
//                             }`}
//                             onClick={() => setIsUploadModalOpen(true)}
//                           >
//                             <i className="fas fa-paperclip"></i>
//                           </button>
                              
//                           <button
//                             className={`p-2 rounded-full transition-colors ${
//                               isDarkMode 
//                                 ? 'text-gray-400 hover:text-blue-400' 
//                                 : 'text-gray-400 hover:text-indigo-600'
//                             }`}
//                             onClick={() => setIsMicActive(!isMicActive)}
//                           >
//                             <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                           </button>
                          
//                           <button
//                             className={`rounded-full p-2.5 transition-colors ${
//                               isDarkMode 
//                                 ? 'bg-blue-600 hover:bg-blue-700' 
//                                 : 'bg-indigo-600 hover:bg-indigo-700'
//                             } text-white`}
//                             onClick={handleSendMessage}
//                           >
//                             <i className="fas fa-paper-plane"></i>
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   {!hasMessages && !isNewChatStarted && (
//                     <ActionCapsules 
//                       isDarkMode={isDarkMode}
//                       onActionClick={handleActionCapsuleClick}
//                     />
//                   )}
//                   {!hasMessages && !isNewChatStarted && (
//                     <div className="mt-4">
//                       <div className="grid grid-cols-2 gap-4">
//                         {/* Starred Chats Section */}
//                         <div>
//                           <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center">
//                               <i className="fas fa-star mr-2 text-yellow-500"></i>
//                               <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                                 Starred chats
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <button
//                                 className={`px-2 py-1 text-xs rounded-full transition-colors ${
//                                   isDarkMode 
//                                     ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                                     : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                                 }`}
//                                 onClick={handleToggleStarredChats}
//                               >
//                                 {isShowingStarredChats ? 'Hide' : 'Show'}
//                               </button>
//                               {isShowingStarredChats && chats.filter(chat => chat.isStarred).length > 3 && (
//                                 <button
//                                   onClick={() => {
//                                     setChatListInitialTab('starred');
//                                     setIsChatListOpen(true);
//                                   }}
//                                   className={`text-xs ${
//                                     isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//                                   }`}
//                                 >
//                                   View all
//                                 </button>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className={`transition-all duration-300 ${
//                             isShowingStarredChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//                           }`}>
//                             {isShowingStarredChats && (
//                               <div className={`${
//                                 isDarkMode 
//                                   ? 'bg-gray-800/50 shadow-gray-900/20' 
//                                   : 'bg-white/50 shadow-sm'
//                               } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`}>
//                                 {chats.filter(chat => chat.isStarred).length > 0 ? (
//                                   <ul className="space-y-1.5">
//                                     {chats
//                                       .filter(chat => chat.isStarred)
//                                       .slice(0, showAllStarredChats ? undefined : 3)
//                                       .map(chat => (
//                                         <li
//                                           key={`starred_${chat.id}`}
//                                           className={`group ${
//                                             isDarkMode 
//                                               ? 'hover:bg-gray-700/50 hover:border-gray-600' 
//                                               : 'hover:bg-gray-50 hover:border-gray-100'
//                                           } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                           onClick={() => handleChatSelect(chat)}
//                                         >
//                                           <div className="flex items-center space-x-2 min-w-0">
//                                             <i className="fas fa-comment-alt text-gray-400 flex-shrink-0"></i>
//                                             <span className="truncate">{chat.title}</span>
//                                           </div>
//                                           <div className="flex items-center space-x-2">
//                                             <i className="fas fa-star text-yellow-500 flex-shrink-0"></i>
//                                             <button
//                                               onClick={(e) => handleDeleteChat(chat.id, e)}
//                                               className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                                                 isDarkMode
//                                                   ? 'text-gray-400 hover:text-red-400'
//                                                   : 'text-gray-500 hover:text-red-500'
//                                               }`}
//                                             >
//                                               <i className="fas fa-trash"></i>
//                                             </button>
//                                           </div>
//                                         </li>
//                                       ))}
//                                   </ul>
//                                 ) : (
//                                   <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                     No starred chats yet
//                                   </p>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Recent Chats Section */}
//                         <div>
//                           <div className="flex items-center justify-between mb-3">
//                             <div className="flex items-center">
//                               <i className="fas fa-history mr-2 text-gray-400"></i>
//                               <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                                 Recent chats
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <button
//                                 className={`px-2 py-1 text-xs rounded-full transition-colors ${
//                                   isDarkMode 
//                                     ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                                     : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                                 }`}
//                                 onClick={handleToggleRecentChats}
//                               >
//                                 {isShowingChats ? 'Hide' : 'Show'}
//                               </button>
//                               {isShowingChats && chats.length > 3 && (
//                                 <button
//                                   onClick={() => {
//                                     setChatListInitialTab('all');
//                                     setIsChatListOpen(true);
//                                   }}
//                                   className={`text-xs ${
//                                     isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//                                   }`}
//                                 >
//                                   View all
//                                 </button>
//                               )}
//                             </div>
//                           </div>
                          
//                           <div className={`transition-all duration-300 ${
//                             isShowingChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//                           }`}>
//                             {isShowingChats && (
//                               <div className={`${
//                                 isDarkMode 
//                                   ? 'bg-gray-800/50 shadow-gray-900/20' 
//                                   : 'bg-white/50 shadow-sm'
//                               } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`}>
//                                 {chats.length > 0 ? (
//                                   <ul className="space-y-1.5">
//                                     {chats
//                                       .slice(0, showAllChats ? undefined : 3)
//                                       .map(chat => (
//                                         <li
//                                           key={`recent_${chat.id}`}
//                                           className={`group ${
//                                             isDarkMode 
//                                               ? 'hover:bg-gray-700/50 hover:border-gray-600' 
//                                               : 'hover:bg-gray-50 hover:border-gray-100'
//                                           } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                           onClick={() => handleChatSelect(chat)}
//                                         >
//                                           <div className="flex items-center space-x-2 min-w-0">
//                                             <i className="fas fa-comment-alt text-gray-400 flex-shrink-0"></i>
//                                             <span className="truncate">{chat.title}</span>
//                                           </div>
//                                           <div className="flex items-center space-x-2">
//                                             <button
//                                               onClick={(e) => handleStarChat(chat.id, e)}
//                                               className={`flex-shrink-0 transition-colors ${
//                                                 chat.isStarred
//                                                   ? 'text-yellow-500'
//                                                   : 'text-gray-400 hover:text-yellow-500'
//                                               }`}
//                                             >
//                                               <i className="fas fa-star"></i>
//                                             </button>
//                                             <button
//                                               onClick={(e) => handleDeleteChat(chat.id, e)}
//                                               className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                                                 isDarkMode
//                                                   ? 'text-gray-400 hover:text-red-400'
//                                                   : 'text-gray-500 hover:text-red-500'
//                                               }`}
//                                             >
//                                               <i className="fas fa-trash"></i>
//                                             </button>
//                                           </div>
//                                         </li>
//                                       ))}
//                                   </ul>
//                                 ) : (
//                                   <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                     No recent chats available
//                                   </p>
//                                 )}
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Only show additional components when no messages */}
//             {!hasMessages && (
//               <div className="max-w-[850px] mx-auto mt-6">
//                 {activeTab === 'analysis' && (
//                   <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                     <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                     <div ref={chartRef} style={{ height: '300px' }}></div>
//                   </div>
//                 )}

                
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <ChatListPopup
//         isOpen={isChatListOpen}
//         onClose={() => setIsChatListOpen(false)}
//         chats={chats}
//         onChatSelect={handleChatSelect}
//         onStarChat={handleStarChat}
//         onDeleteChat={handleDeleteChat}
//         isDarkMode={isDarkMode}
//         initialTab={chatListInitialTab}
//       />
//       <VoiceInput
//         isActive={isMicActive}
//         onTranscript={handleVoiceTranscript}
//         onStateChange={handleVoiceStateChange}
//         isDarkMode={isDarkMode}
//       />
//       <InfoPanel
//         isOpen={isInfoPanelOpen}
//         onClose={() => {
//           setIsInfoPanelOpen(false);
//           setSelectedCode(null);
//         }}
//         isDarkMode={isDarkMode}
//         code={selectedCode || undefined}
//       />
//       <CodeSlider
//         isOpen={isCodeSliderOpen}
//         onClose={() => {
//           setIsCodeSliderOpen(false);
//           setSelectedCodeBlock(null);
//         }}
//         code={selectedCodeBlock?.content || ''}
//         language={selectedCodeBlock?.language || 'plaintext'}
//         isDarkMode={isDarkMode}
//       />
//       <SlidingAuthForm
//         isOpen={isLoginModalOpen}
//         onClose={() => setIsLoginModalOpen(false)}
//         isLogin={isLogin}
//         onToggleMode={toggleAuthMode}
//         onSubmit={handleAuthSubmit}
//         loading={loading}
//         error={formError}
//         success={formSuccess}
//         isDarkMode={isDarkMode}
//       />
//       <div id="dropdown-root" className="fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;




// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';
// import ActionCapsules from './components/ActionCapsules';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// // Update Project interface
// interface Project {
//   id: string;
//   name: string;
//   createdAt: Date;
//   chats: Chat[];
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');
//   const [isShowingStarredChats, setIsShowingStarredChats] = useState(true);
//   const [showAllStarredChats, setShowAllStarredChats] = useState(false);
//   const [isNewChatStarted, setIsNewChatStarted] = useState(false);
//   const modelButtonRef = useRef<HTMLButtonElement>(null);
//   const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
//   const [isShowingProjects, setIsShowingProjects] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);
//   // Add new states
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isProjectChatListOpen, setIsProjectChatListOpen] = useState(false);

//   const models = [
//     { id: 'gpt4', name: 'GPT-4', icon: 'fa-robot' },
//     { id: 'claude', name: 'Claude 3', icon: 'fa-brain' },
//     { id: 'nextchat', name: 'NextChat', icon: 'fa-comment-dots' },
//   ];

//   const toggleDarkMode = () => { 
//     setIsDarkMode(prev => !prev);
//   };

//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'Untitled Chat', // Default title until first message
//       createdAt: new Date(),
//       messages: []
//     };
    
//     // Update chats array ensuring no duplicates by ID
//     setChats(prev => {
//       const chatExists = prev.some(chat => chat.id === newChat.id);
//       if (chatExists) return prev;
//       return [newChat, ...prev];
//     });
    
//     setCurrentChat(newChat);
//     setShowGreeting(false);
//     setIsChatActive(true);
//     setMessages([]);
//     setIsNewChatStarted(true);
//     // Add these two lines to hide both chat sections
//     setIsShowingChats(false);
//     setIsShowingStarredChats(false);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleChatSelect = (chat: Chat) => {
//     if (currentChat?.id === chat.id) return; // Prevent unnecessary updates
    
//     setCurrentChat(chat);
//     setMessages(chat.messages);
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
//     setIsNewChatStarted(false);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
    
//     setChats(prev => prev.filter(chat => chat.id !== chatId));
    
//     if (currentChat?.id === chatId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     if (!isSidebarOpen && !isHovered) {
//       setIsSearchActive(false);
//     }
//   }, [isSidebarOpen, isHovered]);

//   const resetTextAreaHeight = () => {
//     const textarea = document.querySelector('textarea');
//     if (textarea) {
//       textarea.style.height = '56px';
//     }
//   };

//   const [isTransitioning, setIsTransitioning] = useState(false);

//   const handleSendMessage = async () => {
//     if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;
    
//     setHasMessages(true); // Set to true when first message is sent
    
//     if (isMicActive) {
//       setIsMicActive(false);
//     }
    
//     // Switch to clean view when first message is sent
//     setIsCleanView(true);
    
//     let chatToUse = currentChat;
    
//     // Create a new chat if there isn't one
//     if (!chatToUse) {
//       chatToUse = {
//         id: Date.now().toString(),
//         title: 'New Chat',  // We'll update this after the first message
//         createdAt: new Date(),
//         messages: []
//       };
//       setCurrentChat(chatToUse);
//       setChats(prev => [chatToUse, ...prev]);
//     }
    
//     setShowGreeting(false);
//     setIsChatActive(true);
    
//     // Generate unique IDs for messages
//     const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
//     const newMessage: Message = {
//       id: messageId,
//       content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sending',
//       file: activeFilePreview || undefined
//     };

//     try {
//       const updatedChat = {
//         ...chatToUse,
//         messages: [...chatToUse.messages, newMessage],
//         // Update the title if this is the first message
//         title: chatToUse.messages.length === 0 
//           ? (inputText.length > 30 ? `${inputText.substring(0, 30)}...` : inputText)
//           : chatToUse.title
//       };

//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//       setInputText('');
//       resetTextAreaHeight();
//       setIsGenerating(true);

//       const aiResponseText = await generateResponse(inputText);
      
//       const sentMessage = { ...newMessage, status: 'sent' };
      
//       const aiResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponseText,
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };

//       const finalChat = {
//         ...updatedChat,
//         messages: [
//           ...updatedChat.messages.map(msg => 
//             msg.id === newMessage.id ? sentMessage : msg
//           ),
//           aiResponse
//         ]
//       };

//       setChats(prev => prev.map(c => 
//         c.id === finalChat.id ? finalChat : c
//       ));
//       setCurrentChat(finalChat);
//       setMessages(finalChat.messages);
//       setActiveFilePreview(null);

//     } catch (error) {
//       console.error('Failed to send message:', error);
//       const errorMessage = { ...newMessage, status: 'error' };
      
//       const errorChat = {
//         ...currentChat,
//         messages: currentChat?.messages.map(msg =>
//           msg.id === newMessage.id ? errorMessage : msg
//         ) || []
//       };
      
//       setChats(prev => prev.map(c => 
//         c.id === currentChat?.id ? errorChat : c
//       ));
//       setCurrentChat(errorChat);
//       setMessages(errorChat.messages);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const renderMessageStatus = (status: Message['status']) => {
//     switch (status) {
//       case 'sending':
//         return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2"></i>;
//       case 'sent':
//         return <i className="fas fa-check text-green-500 ml-2"></i>;
//       case 'error':
//         return <i className="fas fa-exclamation-circle text-red-500 ml-2"></i>;
//       default:
//         return null;
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       const fileUrl = URL.createObjectURL(file);
//       const filePreview = {
//         name: file.name,
//         type: file.type,
//         url: fileUrl
//       };
//       setActiveFilePreview(filePreview);
      
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: `Attached: ${file.name}`,
//         type: 'user',
//         timestamp: new Date(),
//         status: 'sent',
//         file: filePreview
//       };
  
//       if (currentChat) {
//         const updatedChat = {
//           ...currentChat,
//           messages: [...currentChat.messages, newMessage]
//         };
  
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       }
//     });
  
//     setIsUploadModalOpen(false);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
//     setLoading(true);
//     setFormError('');
//     setFormSuccess('');
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       if (isLogin) {
//         setFormSuccess('Successfully logged in!');
//         handleAuthSuccess({ 
//           name: data.email.split('@')[0], 
//           email: data.email 
//         });
//       } else {
//         setFormSuccess('Account created successfully!');
//         handleSignupSuccess({ 
//           name: data.name || data.email.split('@')[0], 
//           email: data.email 
//         });
//       }
      
//     } catch (error) {
//       setFormError('Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add this new function to toggle between login and signup
//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setFormError('');
//     setFormSuccess('');
//   };

//   const handleIntroductionComplete = (name: string) => {
//     setUserName(name);
//     setShowIntroduction(false);
//     setShowGreeting(false);
//   };

//   const handleSignupSuccess = (userData: { name: string; email: string }) => {
//     handleAuthSuccess(userData);
//     setShowIntroduction(true);
//   };

//   const handleAuthSuccess = (userData: { name: string; email: string }) => {
//     setIsAuthenticated(true);
//     setUserProfile(userData);
//     setIsLoginModalOpen(false);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserProfile(null);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setActiveChat(null);
//     setStarredChats([]);
//   };

//   const Greeting = React.memo(() => {
//     const [displayText, setDisplayText] = useState('');
//     const hour = new Date().getHours();
//     const greetingText = hour >= 0 && hour < 12
//       ? 'Good morning'
//       : hour >= 12 && hour < 16
//         ? 'Good afternoon'
//         : 'Good evening';

//     useEffect(() => {
//       if (!hasGreetingPlayed) {
//         const fullText = `${greetingText}, ${userName || 'Ved'}`;
//         let timeouts: NodeJS.Timeout[] = [];

//         [...fullText].forEach((char, index) => {
//           const timeout = setTimeout(() => {
//             setDisplayText(prev => prev + char);
//             if (index === fullText.length - 1) {
//               setHasGreetingPlayed(true);
//             }
//           }, 100 * index);
//           timeouts.push(timeout);
//         });

//         return () => timeouts.forEach(clearTimeout);
//       } else {
//         setDisplayText(`${greetingText}, ${userName || 'Ved'}`);
//       }
//     }, [greetingText]);

//     return (
//       <h1 className="text-4xl font-light text-center">
//         {displayText}
//       </h1>
//     );
//   });

//   const handleVoiceTranscript = (text: string) => {
//     setInputText(text);
//   };

//   const handleVoiceStateChange = (isActive: boolean) => {
//     setIsMicActive(isActive);
//   };

//   const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//     setSelectedLanguage(language);
    
//     if (currentChat && currentChat.messages.length > 0) {
//       try {
//         setIsGenerating(true);
        
//         const translatedMessages = await Promise.all(
//           currentChat.messages.map(async (msg) => {
//             const translatedContent = await translateText(msg.content, language.name);
//             return {
//               ...msg,
//               content: translatedContent
//             };
//           })
//         );
        
//         const updatedChat = {
//           ...currentChat,
//           messages: translatedMessages
//         };
        
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       } catch (error) {
//         console.error('Translation failed:', error);
//       } finally {
//         setIsGenerating(false);
//       }
//     }
//   };

//   const parseMessageContent = (content: string) => {
//     const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//     const parts = [];
//     let lastIndex = 0;
//     let match;

//     while ((match = codeBlockRegex.exec(content)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push({
//           type: 'text',
//           content: content.slice(lastIndex, match.index)
//         });
//       }

//       parts.push({
//         type: 'code',
//         language: match[1] || 'plaintext',
//         content: match[2].trim()
//       });

//       lastIndex = match.index + match[0].length;
//     }
    

//     if (lastIndex < content.length) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex)
//       });
//     }

//     return parts.length > 0 ? parts : [{ type: 'text', content }];
//   };

//   const handleCodeClick = (content: string, language: string) => {
//     setSelectedCode({ content, language });
//     setIsInfoPanelOpen(true);
//   };

//   const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = e.target;
//     const value = textarea.value;
    
//     if (!value.trim()) {
//       textarea.style.height = '56px';
//     } else {
//       textarea.style.height = 'inherit';
//       textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//     }
    
//     setInputText(value);
//   };

//   const handleCodeBlockClick = (content: string, language: string) => {
//     setSelectedCodeBlock({
//       content: content.trim(),
//       language: language || 'plaintext'
//     });
//     setIsCodeSliderOpen(true);
//   };

//   const handleModelSelect = (modelName: string) => {
//     setSelectedModel(modelName);
//     setIsModelDropdownOpen(false);
//   };

//   const ModelDropdown = ({ onSelect }: { onSelect: (model: string) => void }) => {
//     return (
//       <div 
//         className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-n z-[9999] ${
//           isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
//         }`}
//       >
//         {models.map((model) => (
//           <button
//             key={model.id}
//             onClick={() => onSelect(model.name)}
//             className={`w-full flex items-center px-4 py-3 text-left ${
//               isDarkMode
//                 ? 'hover:bg-gray-600 text-gray-200'
//                 : 'hover:bg-gray-50 text-gray-700'
//             } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}
//           >
//             <i className={`fas ${model.icon} mr-3 ${
//               selectedModel === model.name ? 'text-blue-500' : 'text-gray-400'
//             }`}></i>
//             <span>{model.name}</span>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const handleActionCapsuleClick = (action: string, suggestion?: string) => {
//     let promptText = '';
    
//     if (suggestion) {
//       // If a suggestion was clicked, use it directly
//       switch (action) {
//         case 'explain':
//           promptText = `${suggestion}: `;
//           break;
//         case 'summarize':
//           promptText = `${suggestion} for: `;
//           break;
//         case 'translate':
//           promptText = `${suggestion}: `;
//           break;
//         case 'improve':
//           promptText = `${suggestion}: `;
//           break;
//         case 'code':
//           promptText = `${suggestion}: `;
//           break;
//       }
//     } else {
//       // Default prompts when capsule is clicked
//       switch (action) {
//         case 'explain':
//           promptText = 'Please explain this in detail: ';
//           break;
//         case 'summarize':
//           promptText = 'Please provide a summary of: ';
//           break;
//         case 'translate':
//           promptText = 'Please translate this to English: ';
//           break;
//         case 'improve':
//           promptText = 'Please improve the writing of this text: ';
//           break;
//         case 'code':
//           promptText = 'Please generate code for: ';
//           break;
//       }
//     }
//     setInputText(promptText);
//   };

//   // Update the handlers for toggling sections
//   const handleToggleStarredChats = () => {
//     if (!isShowingStarredChats) {
//       setIsShowingChats(false); // Hide recent chats when showing starred
//     }
//     setIsShowingStarredChats(!isShowingStarredChats);
//   };

//   const handleToggleRecentChats = () => {
//     if (!isShowingChats) {
//       setIsShowingStarredChats(false); // Hide starred chats when showing recent
//     }
//     setIsShowingChats(!isShowingChats);
//   };

//   // Add new handler for project click
//   const handleProjectClick = (project: Project) => {
//     setSelectedProject(project);
//     setIsProjectChatListOpen(true);
//   };

//   // Modify handleAddProject to include chats array
//   const handleAddProject = () => {
//     const newProject: Project = {
//       id: `proj_${Date.now()}`,
//       name: `Project ${projects.length + 1}`,
//       createdAt: new Date(),
//       chats: []
//     };
//     setProjects(prev => [newProject, ...prev]);
//   };

//   // Add handleNewProjectChat function
//   const handleNewProjectChat = (projectId: string) => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'Untitled Chat',
//       createdAt: new Date(),
//       messages: []
//     };

//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return {
//           ...project,
//           chats: [newChat, ...project.chats]
//         };
//       }
//       return project;
//     }));
//   };

//   const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setProjects(prev => prev.filter(project => project.id !== projectId));
//   };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       <div className={`flex h-screen overflow-hidden ${
//         isDarkMode 
//           ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//           : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//       }`}>
//         {/* Fixed brand text container */}
//         <div className={`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${
//           isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//         }`}>
//           <span 
//             onClick={handleHomeClick}  // Add this line
//             className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent hover:opacity-80 transition-opacity" // Add hover effect
//             style={{
//               background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//               WebkitBackgroundClip: 'text',
//               textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//               WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//               letterSpacing: '0.5px'
//             }}
//           >
//             Hind AI
//           </span>
//         </div>

//         {/* Sidebar */}
//         <div 
//           className={`${
//             isSidebarOpen ? 'w-72' : 'w-16'
//           } fixed md:relative h-full transition-all duration-300 ease-in-out ${
//             isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//           } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`}
//         >
//           {/* Top section - only toggle button */}
//           <div className="flex items-center p-4">
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
//               className="text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//             >
//               <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//             </button>
//           </div>

//           {/* Main content with icons-only when collapsed */}
//           <nav className="flex-1 px-2">
//             <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
//               onClick={handleNewChat}
//             >
//               <i className="fa-solid fa-plus w-8"></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 New Chat
//               </span>
//             </button>

//             {/* Search section */}
//             <div className="px-2 mb-4">
//               {isSidebarOpen ? (
//                 <div className="relative">
//                   <input
//                     type="search"
//                     placeholder="Search conversations..."
//                     className={`w-full pl-9 pr-4 py-2 ${
//                       isDarkMode 
//                         ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                         : 'bg-gray-100 text-gray-800'
//                     } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                   />
//                   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => setIsSidebarOpen(true)}
//                   className={`w-full p-2 rounded-lg ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}
//                 >
//                   <i className="fa-solid fa-magnifying-glass"></i>
//                 </button>
//               )}
//             </div>

//             {/* Projects Section */}
//             <div className="mb-4">
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <div className="flex items-center flex-1">
//                   <i className="fa-solid fa-folder text-blue-400 w-8"></i>
//                   {isSidebarOpen && (
//                     <div className="flex items-center flex-1">
//                       <span className="text-sm font-medium">Projects</span>
//                       <button
//                         onClick={handleAddProject}
//                         className={`ml-0.5 p-1 rounded-lg transition-colors ${
//                           isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//                         }`}
//                       >
//                         <i className="fa-solid fa-plus text-xs"></i>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {isSidebarOpen && projects.length > 0 && (
//                 <div className="space-y-1">
//                   {projects.map(project => (
//                     <div
//                       key={project.id}
//                       className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                       onClick={() => handleProjectClick(project)}
//                     >
//                       <i className="fa-regular fa-folder-open w-8 text-blue-400"></i>
//                       <span className="text-sm truncate flex-1">{project.name}</span>
//                       <button
//                         onClick={(e) => handleDeleteProject(project.id, e)}
//                         className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                           isDarkMode
//                             ? 'text-gray-400 hover:text-red-400'
//                             : 'text-gray-500 hover:text-red-500'
//                         }`}
//                       >
//                         <i className="fas fa-trash"></i>
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Starred Chats Section */}
//             <div className="mb-4">
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <button
//                   onClick={() => {
//                     if (!isSidebarOpen) {
//                       setChatListInitialTab('starred');
//                       setIsChatListOpen(true);
//                     }
//                   }}
//                   className="relative"
//                 >
//                   <i className="fa-solid fa-star text-yellow-500 w-8"></i>
//                 </button>
//                 {isSidebarOpen && <span className="text-sm font-medium">Starred Chats</span>}
//               </div>
//               <div className="space-y-1">
//                 {chats
//                   .filter(chat => chat.isStarred)
//                   .map((chat) => (
//                     <div
//                       key={`starred_${chat.id}`}
//                       className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                       onClick={() => handleChatSelect(chat)}
//                     >
//                       <i className="fas fa-comment-alt w-8 text-yellow-500/80"></i>
//                       {isSidebarOpen && (
//                         <>
//                           <span className="ml-2 truncate flex-1">{chat.title}</span>
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className="ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//                           >
//                             <i className="fas fa-star text-yellow-500"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                               isDarkMode
//                                 ? 'text-gray-400 hover:text-red-400'
//                                 : 'text-gray-500 hover:text-red-500'
//                             }`}
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* All Chats Section */}
//             <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen) {
//                     setChatListInitialTab('all');
//                     setIsChatListOpen(true);
//                   }
//                 }}
//                 className="relative"
//               >
//                 <i className="fa-solid fa-comments w-8"></i>
//               </button>
//               {isSidebarOpen && <span className="text-sm font-medium">All Chats</span>}
//             </div>
            
//             {/* Chat list section */}
//             <div className="space-y-1">
//               {chats
//                 .filter(chat => !chat.isStarred) // Only show non-starred chats in this section
//                 .map((chat) => (
//                   <div
//                     key={`all_${chat.id}`}
//                     className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                       isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                     }`}
//                     onClick={() => handleChatSelect(chat)}
//                   >
//                     <i className="fa-regular fa-comment w-8"></i>
//                     {isSidebarOpen && (
//                       <>
//                         <span className="ml-2 truncate flex-1">{chat.title}</span>
//                         <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100">
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className={`p-1 rounded-full transition-colors ${
//                               chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//                             }`}
//                           >
//                             <i className="fas fa-star"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </nav>

//           {/* Auth section at bottom */}
//           <div className="mt-auto p-2 border-t border-gray-700/50">
//             {isAuthenticated ? (
//               <div className="space-y-1">
//                 <div className="flex items-center p-2 rounded-lg">
//                   <i className="fa-solid fa-user w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     {userProfile?.name}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//                 >
//                   <i className="fa-solid fa-right-from-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Logout
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-1">
//                 <button className="w-full flex items-center p-2" onClick={() => setIsLoginModalOpen(true)}>
//                   <i className="fa-solid fa-right-to-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Login
//                   </span>
//                 </button>
//                 <button 
//                   className="w-full flex items-center p-2 text-indigo-500"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setIsLoginModalOpen(true);
//                   }}
//                 >
//                   <i className="fa-solid fa-user-plus w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Sign Up
//                   </span>
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={toggleDarkMode}
//               className="w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//             >
//               <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8`}></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col relative pt-16 pl-16">
//           <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
//             isCodeSliderOpen ? 'lg:pr-[35%]' : ''
//           }`}>
//             {/* Main chat section that shifts left when slider opens */}
//             <div className={`
//               w-full mx-auto transition-all duration-300
//               ${isCodeSliderOpen 
//                 ? 'lg:max-w-full' 
//                 : 'max-w-3xl'
//               }
//             `}>
//               {/* Chat content */}
//               <div className={`w-full max-w-3xl mx-auto ${
//                 hasMessages || isNewChatStarted ? 'min-h-full flex flex-col' : ''
//               }`}>
//                 {showGreeting && !hasMessages && !isNewChatStarted ? (
//                   <div className="flex justify-center items-center min-h-[200px]">
//                     <Greeting />
//                   </div>
//                 ) : (
//                   <div className="flex-1 flex flex-col justify-end">
//                     <div className="flex-1 space-y-4 py-4 px-4">
//                       {messages.map((message, index) => (
//                         <div
//                           key={`${message.id}_${index}`}
//                           className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
//                           style={{
//                             animationDelay: `${index * 100}ms`,
//                           }}
//                         >
//                           <div
//                             className={`max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${
//                               message.type === 'user'
//                                 ? isDarkMode
//                                   ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//                                   : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//                                 : isDarkMode
//                                   ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//                                   : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//                             }`}
//                             style={{
//                               backdropFilter: 'blur(8px)',
//                             }}
//                           >
//                             <div className="flex items-center justify-between mb-1">
//                               <div className="flex items-center">
//                                 <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                                 <span className="text-sm opacity-75">
//                                   {new Date(message.timestamp).toLocaleTimeString()}
//                                 </span>
//                               </div>
//                               {renderMessageStatus(message.status)}
//                             </div>
                            
//                             {message.file && (
//                               <div className="mb-2">
//                                 {message.file.type.startsWith('image/') ? (
//                                   <div className="relative rounded-lg overflow-hidden">
//                                     <img 
//                                       src={message.file.url} 
//                                       alt={message.file.name}
//                                       className="max-w-full h-auto rounded-lg"
//                                     />
//                                     <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
//                                       <div className="flex items-center">
//                                         <i className="fas fa-image mr-2"></i>
//                                         <span className="truncate">{message.file.name}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ) : message.file.type === 'application/pdf' ? (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file-pdf text-2xl text-red-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">PDF Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-external-link-alt"></i>
//                                     </a>
//                                   </div>
//                                 ) : (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file text-2xl text-blue-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-download"></i>
//                                     </a>
//                                   </div>
//                                 )}
//                               </div>
//                             )}
                            
//                             <div className="space-y-4">
//                               {parseMessageContent(message.content).map((part, index) => (
//                                 part.type === 'code' ? (
//                                   <div 
//                                     key={index}
//                                     onClick={() => handleCodeBlockClick(part.content, part.language)}
//                                     className={`cursor-pointer group rounded-lg overflow-hidden ${
//                                       isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                                     }`}
//                                   >
//                                     <div className={`flex items-center justify-between px-4 py-2 ${
//                                       isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//                                     }`}>
//                                       <div className="flex items-center space-x-2">
//                                         <i className="fas fa-code"></i>
//                                         <span className={`text-sm font-medium ${
//                                           isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                                         }`}>
//                                           {part.language}
//                                         </span>
//                                       </div>
//                                       <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
//                                         isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                                       }`}>
//                                         <i className="fas fa-expand-alt"></i>
//                                       </div>
//                                     </div>
//                                     <div className="p-4 max-h-60 overflow-hidden relative">
//                                       <pre className="overflow-x-auto">
//                                         <code className={`language-${part.language} ${
//                                           isDarkMode ? 'text-gray-300' : 'text-gray-800'
//                                         }`}>
//                                           {part.content}
//                                         </code>
//                                       </pre>
//                                       <div className={`absolute bottom-0 inset-x-0 h-8 ${
//                                         isDarkMode 
//                                           ? 'bg-gradient-to-t from-gray-800' 
//                                           : 'bg-gradient-to-t from-gray-50'
//                                       }`}></div>
//                                     </div>
//                                   </div>
//                                 ) : (
//                                   <p key={index} className="text-base leading-relaxed whitespace-pre-wrap">
//                                     {part.content}
//                                   </p>
//                                 )
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                       <div ref={messagesEndRef} />  
//                     </div>
//                   </div>
//                 )}

//                 {/* Chat input section */}
//                 <div className={`
//                   ${hasMessages || isNewChatStarted
//                     ? 'fixed bottom-6 lg:left-16 transition-all duration-300' 
//                     : 'sticky bottom-6'
//                   } w-full px-4
//                   ${isCodeSliderOpen 
//                     ? 'lg:left-16 lg:w-[100%] lg:translate-x-0' // Reduced left margin
//                     : 'mx-auto'
//                   }
//                 `}>
//                   <div className={`
//                     max-w-4xl
//                     ${showGreeting 
//                       ? 'mx-auto'
//                       : isCodeSliderOpen 
//                         ? 'lg:ml-0' // Remove margin when slider is open
//                         : 'mx-auto'
//                     }
//                   `}>
//                     <div className={`relative rounded-[20px] shadow-lg chat-glow transition-colors ${
//                       isDarkMode ? 'bg-gray-800' : 'bg-white'
//                     }`}>
//                       {activeFilePreview && (
//                         <div className={`w-full px-4 py-3 ${
//                           isDarkMode 
//                             ? 'bg-gray-700/30' 
//                             : 'bg-gray-50/50'
//                         }`}>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-3">
//                               <i className={`fas ${
//                                 activeFilePreview.type.startsWith('image/')
//                                   ? 'fa-image text-green-400'
//                                   : activeFilePreview.type === 'application/pdf'
//                                     ? 'fa-file-pdf text-red-400'
//                                     : 'fa-file text-blue-400'
//                               } text-lg`}></i>
//                               <div className="flex flex-col">
//                                 <span className="text-sm font-medium truncate max-w-[200px]">
//                                   {activeFilePreview.name}
//                                 </span>
//                                 <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                   Ready to send
//                                 </span>
//                               </div>
//                             </div>
//                             <button 
//                               onClick={() => setActiveFilePreview(null)}
//                               className={`p-1.5 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'hover:bg-gray-600 text-gray-400' 
//                                   : 'hover:bg-gray-200 text-gray-500'
//                               }`}
//                             >
//                               <i className="fas fa-times"></i>
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {messages.length > 0 && messages[messages.length - 1].file && (
//                         <div className={`w-full px-4 py-2 ${
//                           isDarkMode 
//                             ? 'bg-gray-700/30' 
//                             : 'bg-gray-50/50'
//                         }`}>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <i className={`fas ${
//                                 messages[messages.length - 1].file?.type.startsWith('image/')
//                                   ? 'fa-image text-green-400'
//                                   : messages[messages.length - 1].file?.type === 'application/pdf'
//                                     ? 'fa-file-pdf text-red-400'
//                                     : 'fa-file text-blue-400'
//                               }`}></i>
//                               <span className="text-sm truncate max-w-[200px]">
//                                 {messages[messages.length - 1].file?.name}
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                 File attached
//                               </span>
//                               <i className="fas fa-check text-green-400"></i>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       <div className="relative flex flex-col">
//                         <div className="min-h-[56px] max-h-[200px] overflow-hidden">
//                           <textarea
//                             className={`w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${
//                               isDarkMode 
//                                 ? 'bg-gray-800 text-gray-200 placeholder-gray-400' 
//                                 : 'bg-white text-gray-800 placeholder-gray-500'
//                             }`}
//                             value={inputText}
//                             onChange={handleTextAreaResize}
//                             placeholder={`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter' && !e.shiftKey) {
//                                 e.preventDefault();
//                                 if (activeFilePreview || inputText.trim()) {
//                                   handleSendMessage();
//                                 }
//                               }
//                             }}
//                             style={{
//                               minHeight: '56px',
//                               maxHeight: '200px'
//                             }}
//                           />
//                         </div>

//                         <div className={`flex items-center justify-between p-4 rounded-b-[20px] ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-white'
//                         }`}>
//                           <div className="flex items-center space-x-2">
//                             <div className="relative inline-block">
//                               <button
//                                 ref={modelButtonRef}
//                                 onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
//                                 className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm ${
//                                   isDarkMode 
//                                     ? 'hover:bg-gray-700 text-gray-300' 
//                                     : 'hover:bg-gray-100 text-gray-600'
//                                 } transition-all duration-300`}
//                               >
//                                 <i className={`fas ${models.find(m => m.name === selectedModel)?.icon}`}></i>
//                                 <span className="hidden sm:inline">{selectedModel}</span>
//                                 <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
//                                   isModelDropdownOpen ? 'rotate-180' : 'rotate-0'
//                                 }`}></i>
//                               </button>

//                               {isModelDropdownOpen && (
//                                 <ModelDropdown onSelect={handleModelSelect} />
//                               )}
//                             </div>
                            
//                             <div className="relative inline-block">
//                               <LanguageSelector
//                                 isDarkMode={isDarkMode}
//                                 onLanguageChange={handleLanguageChange}
//                                 selectedLanguage={selectedLanguage}
//                                 className="z-[9999]"
//                                 dropdownPosition="absolute"
//                               />
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center space-x-2">
//                             <button
//                               className={`p-2 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'text-gray-400 hover:text-blue-400' 
//                                   : 'text-gray-400 hover:text-indigo-600'
//                               }`}
//                               onClick={() => setIsUploadModalOpen(true)}
//                             >
//                               <i className="fas fa-paperclip"></i>
//                             </button>
                                
//                             <button
//                               className={`p-2 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'text-gray-400 hover:text-blue-400' 
//                                   : 'text-gray-400 hover:text-indigo-600'
//                               }`}
//                               onClick={() => setIsMicActive(!isMicActive)}
//                             >
//                               <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                             </button>
                            
//                             <button
//                               className={`rounded-full p-2.5 transition-colors ${
//                                 isDarkMode 
//                                   ? 'bg-blue-600 hover:bg-blue-700' 
//                                   : 'bg-indigo-600 hover:bg-indigo-700'
//                               } text-white`}
//                               onClick={handleSendMessage}
//                             >
//                               <i className="fas fa-paper-plane"></i>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {!hasMessages && !isNewChatStarted && (
//                       <ActionCapsules 
//                         isDarkMode={isDarkMode}
//                         onActionClick={handleActionCapsuleClick}
//                       />
//                     )}
//                     {!hasMessages && !isNewChatStarted && (
//                       <div className="mt-4">
//                         <div className="grid grid-cols-2 gap-4">
//                           {/* Starred Chats Section */}
//                           <div>
//                             <div className="flex items-center justify-between mb-3">
//                               <div className="flex items-center">
//                                 <i className="fas fa-star mr-2 text-yellow-500"></i>
//                                 <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                                   Starred chats
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <button
//                                   className={`px-2 py-1 text-xs rounded-full transition-colors ${
//                                     isDarkMode 
//                                       ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                                       : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                                   }`}
//                                   onClick={handleToggleStarredChats}
//                                 >
//                                   {isShowingStarredChats ? 'Hide' : 'Show'}
//                                 </button>
//                                 {isShowingStarredChats && chats.filter(chat => chat.isStarred).length > 3 && (
//                                   <button
//                                     onClick={() => {
//                                       setChatListInitialTab('starred');
//                                       setIsChatListOpen(true);
//                                     }}
//                                     className={`text-xs ${
//                                       isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//                                     }`}
//                                   >
//                                     View all
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
                            
//                             <div className={`transition-all duration-300 ${
//                               isShowingStarredChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//                             }`}>
//                               {isShowingStarredChats && (
//                                 <div className={`${
//                                   isDarkMode 
//                                     ? 'bg-gray-800/50 shadow-gray-900/20' 
//                                     : 'bg-white/50 shadow-sm'
//                                 } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`}>
//                                   {chats.filter(chat => chat.isStarred).length > 0 ? (
//                                     <ul className="space-y-1.5">
//                                       {chats
//                                         .filter(chat => chat.isStarred)
//                                         .slice(0, showAllStarredChats ? undefined : 3)
//                                         .map(chat => (
//                                           <li
//                                             key={`starred_${chat.id}`}
//                                             className={`group ${
//                                               isDarkMode 
//                                                 ? 'hover:bg-gray-700/50 hover:border-gray-600' 
//                                                 : 'hover:bg-gray-50 hover:border-gray-100'
//                                             } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                             onClick={() => handleChatSelect(chat)}
//                                           >
//                                             <div className="flex items-center space-x-2 min-w-0">
//                                               <i className="fas fa-comment-alt text-gray-400 flex-shrink-0"></i>
//                                               <span className="truncate">{chat.title}</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                               <i className="fas fa-star text-yellow-500 flex-shrink-0"></i>
//                                               <button
//                                                 onClick={(e) => handleDeleteChat(chat.id, e)}
//                                                 className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                                                   isDarkMode
//                                                     ? 'text-gray-400 hover:text-red-400'
//                                                     : 'text-gray-500 hover:text-red-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-trash"></i>
//                                               </button>
//                                             </div>
//                                           </li>
//                                         ))}
//                                     </ul>
//                                   ) : (
//                                     <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                       No starred chats yet
//                                     </p>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           {/* Recent Chats Section */}
//                           <div>
//                             <div className="flex items-center justify-between mb-3">
//                               <div className="flex items-center">
//                                 <i className="fas fa-history mr-2 text-gray-400"></i>
//                                 <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                                   Recent chats
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <button
//                                   className={`px-2 py-1 text-xs rounded-full transition-colors ${
//                                     isDarkMode 
//                                       ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                                       : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                                   }`}
//                                   onClick={handleToggleRecentChats}
//                                 >
//                                   {isShowingChats ? 'Hide' : 'Show'}
//                                 </button>
//                                 {isShowingChats && chats.length > 3 && (
//                                   <button
//                                     onClick={() => {
//                                       setChatListInitialTab('all');
//                                       setIsChatListOpen(true);
//                                     }}
//                                     className={`text-xs ${
//                                       isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//                                     }`}
//                                   >
//                                     View all
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
                            
//                             <div className={`transition-all duration-300 ${
//                               isShowingChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//                             }`}>
//                               {isShowingChats && (
//                                 <div className={`${
//                                   isDarkMode 
//                                     ? 'bg-gray-800/50 shadow-gray-900/20' 
//                                     : 'bg-white/50 shadow-sm'
//                                 } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`}>
//                                   {chats.length > 0 ? (
//                                     <ul className="space-y-1.5">
//                                       {chats
//                                         .slice(0, showAllChats ? undefined : 3)
//                                         .map(chat => (
//                                           <li
//                                             key={`recent_${chat.id}`}
//                                             className={`group ${
//                                               isDarkMode 
//                                                 ? 'hover:bg-gray-700/50 hover:border-gray-600' 
//                                                 : 'hover:bg-gray-50 hover:border-gray-100'
//                                             } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                             onClick={() => handleChatSelect(chat)}
//                                           >
//                                             <div className="flex items-center space-x-2 min-w-0">
//                                               <i className="fas fa-comment-alt text-gray-400 flex-shrink-0"></i>
//                                               <span className="truncate">{chat.title}</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                               <button
//                                                 onClick={(e) => handleStarChat(chat.id, e)}
//                                                 className={`flex-shrink-0 transition-colors ${
//                                                   chat.isStarred
//                                                     ? 'text-yellow-500'
//                                                     : 'text-gray-400 hover:text-yellow-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-star"></i>
//                                               </button>
//                                               <button
//                                                 onClick={(e) => handleDeleteChat(chat.id, e)}
//                                                 className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                                                   isDarkMode
//                                                     ? 'text-gray-400 hover:text-red-400'
//                                                     : 'text-gray-500 hover:text-red-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-trash"></i>
//                                               </button>
//                                             </div>
//                                           </li>
//                                         ))}
//                                     </ul>
//                                   ) : (
//                                     <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                       No recent chats available
//                                     </p>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Only show additional components when no messages */}
//               {!hasMessages && (
//                 <div className="max-w-[850px] mx-auto mt-6">
//                   {activeTab === 'analysis' && (
//                     <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                       <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                       <div ref={chartRef} style={{ height: '300px' }}></div>
//                     </div>
//                   )}

                  
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ChatListPopup
//         isOpen={isChatListOpen}
//         onClose={() => setIsChatListOpen(false)}
//         chats={chats}
//         onChatSelect={handleChatSelect}
//         onStarChat={handleStarChat}
//         onDeleteChat={handleDeleteChat}
//         isDarkMode={isDarkMode}
//         initialTab={chatListInitialTab}
//       />
//       <VoiceInput
//         isActive={isMicActive}
//         onTranscript={handleVoiceTranscript}
//         onStateChange={handleVoiceStateChange}
//         isDarkMode={isDarkMode}
//       />
//       <InfoPanel
//         isOpen={isInfoPanelOpen}
//         onClose={() => {
//           setIsInfoPanelOpen(false);
//           setSelectedCode(null);
//         }}
//         isDarkMode={isDarkMode}
//         code={selectedCode || undefined}
//       />
//       <CodeSlider
//         isOpen={isCodeSliderOpen}
//         onClose={() => {
//           setIsCodeSliderOpen(false);
//           setSelectedCodeBlock(null);
//         }}
//         code={selectedCodeBlock?.content || ''}
//         language={selectedCodeBlock?.language || 'plaintext'}
//         isDarkMode={isDarkMode}
//       />
//       <SlidingAuthForm
//         isOpen={isLoginModalOpen}
//         onClose={() => setIsLoginModalOpen(false)}
//         isLogin={isLogin}
//         onToggleMode={toggleAuthMode}
//         onSubmit={handleAuthSubmit}
//         loading={loading}
//         error={formError}
//         success={formSuccess}
//         isDarkMode={isDarkMode}
//       />
//       <div id="dropdown-root" className="fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;



// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';
// import ActionCapsules from './components/ActionCapsules';
// import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// // Update the Chat interface to include project association
// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string; // Add this to track which project the chat belongs to
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// // Update Project interface
// interface Project {
//   id: string;
//   name: string;
//   createdAt: Date;
//   chats: Chat[];
//   isEditing?: boolean;
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');
//   const [isShowingStarredChats, setIsShowingStarredChats] = useState(true);
//   const [showAllStarredChats, setShowAllStarredChats] = useState(false);
//   const [isNewChatStarted, setIsNewChatStarted] = useState(false);
//   const modelButtonRef = useRef<HTMLButtonElement>(null);
//   const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
//   const [isShowingProjects, setIsShowingProjects] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);
//   // Add new states
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isProjectChatListOpen, setIsProjectChatListOpen] = useState(false);
//   // Add new state for collapsed projects
//   const [collapsedProjects, setCollapsedProjects] = useState<{ [key: string]: boolean }>({});
//   // Add new states for delete confirmation
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{
//     isOpen: boolean;
//     itemId: string;
//     itemType: 'chat' | 'project';
//     projectId?: string;
//   }>({
//     isOpen: false,
//     itemId: '',
//     itemType: 'chat',
//   });

//   const models = [
//     { id: 'gpt4', name: 'GPT-4', icon: 'fa-robot' },
//     { id: 'claude', name: 'Claude 3', icon: 'fa-brain' },
//     { id: 'nextchat', name: 'NextChat', icon: 'fa-comment-dots' },
//   ];

//   const toggleDarkMode = () => { 
//     setIsDarkMode(prev => !prev);
//   };

//   const handleNewChat = () => {
//     const newChat: Chat = {
//       id: Date.now().toString(),
//       title: 'Untitled Chat', // Default title until first message
//       createdAt: new Date(),
//       messages: []
//     };
    
//     // Update chats array ensuring no duplicates by ID
//     setChats(prev => {
//       const chatExists = prev.some(chat => chat.id === newChat.id);
//       if (chatExists) return prev;
//       return [newChat, ...prev];
//     });
    
//     setCurrentChat(newChat);
//     setShowGreeting(false);
//     setIsChatActive(true);
//     setMessages([]);
//     setIsNewChatStarted(true);
//     // Add these two lines to hide both chat sections
//     setIsShowingChats(false);
//     setIsShowingStarredChats(false);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

// // Update handleChatSelect to handle initial message
// const handleChatSelect = (chat: Chat) => {
//   if (currentChat?.id === chat.id) return;
  
//   setCurrentChat(chat);
//   setMessages(chat.messages);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(false); // Reset new chat state
  
//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Add chat title editing functionality
// const handleChatTitleEdit = (chatId: string, newTitle: string) => {
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       const updatedChat = { ...chat, title: newTitle, isEditing: false };
//       if (currentChat?.id === chatId) {
//         setCurrentChat(updatedChat);
//       }
//       return updatedChat;
//     }
//     return chat;
//   }));
// };

// const handleChatTitleEditStart = (chatId: string) => {
//   setChats(prev => prev.map(chat => ({
//     ...chat,
//     isEditing: chat.id === chatId
//   })));
// };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
//     setIsNewChatStarted(false);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   // Update delete handlers to show confirmation first
//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDeleteConfirmation({
//       isOpen: true,
//       itemId: chatId,
//       itemType: 'chat'
//     });
//   };

//   const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDeleteConfirmation({
//       isOpen: true,
//       itemId: projectId,
//       itemType: 'project'
//     });
//   };

//   const handleDeleteProjectChat = (projectId: string, chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDeleteConfirmation({
//       isOpen: true,
//       itemId: chatId,
//       projectId: projectId,
//       itemType: 'chat'
//     });
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     if (!isSidebarOpen && !isHovered) {
//       setIsSearchActive(false);
//     }
//   }, [isSidebarOpen, isHovered]);

//   const resetTextAreaHeight = () => {
//     const textarea = document.querySelector('textarea');
//     if (textarea) {
//       textarea.style.height = '56px';
//     }
//   };

//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // Update the handleSendMessage function
// const handleSendMessage = async () => {
//   if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;
  
//   setHasMessages(true);
  
//   if (isMicActive) {
//     setIsMicActive(false);
//   }
  
//   setIsCleanView(true);
  
//   let chatToUse = currentChat;
  
//   // Create a new chat if there isn't one
//   if (!chatToUse) {
//     chatToUse = {
//       id: Date.now().toString(),
//       title: inputText.length > 30 ? `${inputText.substring(0, 30)}...` : inputText, // Set initial title from first message
//       createdAt: new Date(),
//       messages: []
//     };
//     setCurrentChat(chatToUse);
//     setChats(prev => [chatToUse, ...prev]);
//   }
  
//   setShowGreeting(false);
//   setIsChatActive(true);
  
//   // Generate unique IDs for messages
//   const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
//   const newMessage: Message = {
//     id: messageId,
//     content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//     type: 'user',
//     timestamp: new Date(),
//     status: 'sending',
//     file: activeFilePreview || undefined
//   };

//   try {
//     const updatedChat = {
//       ...chatToUse,
//       messages: [...chatToUse.messages, newMessage],
//       // Update the title if this is the first message
//       title: chatToUse.messages.length === 0 
//         ? (inputText.length > 30 ? `${inputText.substring(0, 30)}...` : inputText)
//         : chatToUse.title
//     };

//     // Update both chats array and projects array if it's a project chat
//     if (chatToUse.projectId) {
//       setProjects(prev => prev.map(project => {
//         if (project.id === chatToUse.projectId) {
//           return {
//             ...project,
//             chats: project.chats.map(chat => 
//               chat.id === chatToUse.id ? updatedChat : chat
//             )
//           };
//         }
//         return project;
//       }));
//     }

//     setCurrentChat(updatedChat);
//     setMessages(updatedChat.messages);
//     setInputText('');
//     resetTextAreaHeight();
//     setIsGenerating(true);

//     const aiResponseText = await generateResponse(inputText);
    
//     const sentMessage = { ...newMessage, status: 'sent' };
    
//     const aiResponse: Message = {
//       id: (Date.now() + 1).toString(),
//       content: aiResponseText,
//       type: 'assistant',
//       timestamp: new Date(),
//       status: 'sent'
//     };

//     const finalChat = {
//       ...updatedChat,
//       messages: [
//         ...updatedChat.messages.map(msg => 
//           msg.id === newMessage.id ? sentMessage : msg
//         ),
//         aiResponse
//       ]
//     };

//     setChats(prev => prev.map(c => 
//       c.id === finalChat.id ? finalChat : c
//     ));
//     setCurrentChat(finalChat);
//     setMessages(finalChat.messages);
//     setActiveFilePreview(null);

//   } catch (error) {
//     console.error('Failed to send message:', error);
//     const errorMessage = { ...newMessage, status: 'error' };
    
//     const errorChat = {
//       ...currentChat,
//       messages: currentChat?.messages.map(msg =>
//         msg.id === newMessage.id ? errorMessage : msg
//       ) || []
//     };
    
//     setChats(prev => prev.map(c => 
//       c.id === currentChat?.id ? errorChat : c
//     ));
//     setCurrentChat(errorChat);
//     setMessages(errorChat.messages);
//   } finally {
//     setIsGenerating(false);
//   }
// };

//   const renderMessageStatus = (status: Message['status']) => {
//     switch (status) {
//       case 'sending':
//         return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2"></i>;
//       case 'sent':
//         return <i className="fas fa-check text-green-500 ml-2"></i>;
//       case 'error':
//         return <i className="fas fa-exclamation-circle text-red-500 ml-2"></i>;
//       default:
//         return null;
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       const fileUrl = URL.createObjectURL(file);
//       const filePreview = {
//         name: file.name,
//         type: file.type,
//         url: fileUrl
//       };
//       setActiveFilePreview(filePreview);
      
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: `Attached: ${file.name}`,
//         type: 'user',
//         timestamp: new Date(),
//         status: 'sent',
//         file: filePreview
//       };
  
//       if (currentChat) {
//         const updatedChat = {
//           ...currentChat,
//           messages: [...currentChat.messages, newMessage]
//         };
  
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       }
//     });
  
//     setIsUploadModalOpen(false);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
//     setLoading(true);
//     setFormError('');
//     setFormSuccess('');
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       if (isLogin) {
//         setFormSuccess('Successfully logged in!');
//         handleAuthSuccess({ 
//           name: data.email.split('@')[0], 
//           email: data.email 
//         });
//       } else {
//         setFormSuccess('Account created successfully!');
//         handleSignupSuccess({ 
//           name: data.name || data.email.split('@')[0], 
//           email: data.email 
//         });
//       }
      
//     } catch (error) {
//       setFormError('Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add this new function to toggle between login and signup
//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setFormError('');
//     setFormSuccess('');
//   };

//   const handleIntroductionComplete = (name: string) => {
//     setUserName(name);
//     setShowIntroduction(false);
//     setShowGreeting(false);
//   };

//   const handleSignupSuccess = (userData: { name: string; email: string }) => {
//     handleAuthSuccess(userData);
//     setShowIntroduction(true);
//   };

//   const handleAuthSuccess = (userData: { name: string; email: string }) => {
//     setIsAuthenticated(true);
//     setUserProfile(userData);
//     setIsLoginModalOpen(false);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserProfile(null);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setActiveChat(null);
//     setStarredChats([]);
//   };

//   const Greeting = React.memo(() => {
//     const [displayText, setDisplayText] = useState('');
//     const hour = new Date().getHours();
//     const greetingText = hour >= 0 && hour < 12
//       ? 'Good morning'
//       : hour >= 12 && hour < 16
//         ? 'Good afternoon'
//         : 'Good evening';

//     useEffect(() => {
//       if (!hasGreetingPlayed) {
//         const fullText = `${greetingText}, ${userName || 'Ved'}`;
//         let timeouts: NodeJS.Timeout[] = [];

//         [...fullText].forEach((char, index) => {
//           const timeout = setTimeout(() => {
//             setDisplayText(prev => prev + char);
//             if (index === fullText.length - 1) {
//               setHasGreetingPlayed(true);
//             }
//           }, 100 * index);
//           timeouts.push(timeout);
//         });

//         return () => timeouts.forEach(clearTimeout);
//       } else {
//         setDisplayText(`${greetingText}, ${userName || 'Ved'}`);
//       }
//     }, [greetingText]);

//     return (
//       <h1 className="text-4xl font-light text-center">
//         {displayText}
//       </h1>
//     );
//   });

//   const handleVoiceTranscript = (text: string) => {
//     setInputText(text);
//   };

//   const handleVoiceStateChange = (isActive: boolean) => {
//     setIsMicActive(isActive);
//   };

//   const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//     setSelectedLanguage(language);
    
//     if (currentChat && currentChat.messages.length > 0) {
//       try {
//         setIsGenerating(true);
        
//         const translatedMessages = await Promise.all(
//           currentChat.messages.map(async (msg) => {
//             const translatedContent = await translateText(msg.content, language.name);
//             return {
//               ...msg,
//               content: translatedContent
//             };
//           })
//         );
        
//         const updatedChat = {
//           ...currentChat,
//           messages: translatedMessages
//         };
        
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       } catch (error) {
//         console.error('Translation failed:', error);
//       } finally {
//         setIsGenerating(false);
//       }
//     }
//   };

//   const parseMessageContent = (content: string) => {
//     const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//     const parts = [];
//     let lastIndex = 0;
//     let match;

//     while ((match = codeBlockRegex.exec(content)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push({
//           type: 'text',
//           content: content.slice(lastIndex, match.index)
//         });
//       }

//       parts.push({
//         type: 'code',
//         language: match[1] || 'plaintext',
//         content: match[2].trim()
//       });

//       lastIndex = match.index + match[0].length;
//     }
    

//     if (lastIndex < content.length) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex)
//       });
//     }

//     return parts.length > 0 ? parts : [{ type: 'text', content }];
//   };

//   const handleCodeClick = (content: string, language: string) => {
//     setSelectedCode({ content, language });
//     setIsInfoPanelOpen(true);
//   };

//   const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = e.target;
//     const value = textarea.value;
    
//     if (!value.trim()) {
//       textarea.style.height = '56px';
//     } else {
//       textarea.style.height = 'inherit';
//       textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//     }
    
//     setInputText(value);
//   };

//   const handleCodeBlockClick = (content: string, language: string) => {
//     setSelectedCodeBlock({
//       content: content.trim(),
//       language: language || 'plaintext'
//     });
//     setIsCodeSliderOpen(true);
//   };

//   const handleModelSelect = (modelName: string) => {
//     setSelectedModel(modelName);
//     setIsModelDropdownOpen(false);
//   };

//   const ModelDropdown = ({ onSelect }: { onSelect: (model: string) => void }) => {
//     return (
//       <div 
//         className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-n z-[9999] ${
//           isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
//         }`}
//       >
//         {models.map((model) => (
//           <button
//             key={model.id}
//             onClick={() => onSelect(model.name)}
//             className={`w-full flex items-center px-4 py-3 text-left ${
//               isDarkMode
//                 ? 'hover:bg-gray-600 text-gray-200'
//                 : 'hover:bg-gray-50 text-gray-700'
//             } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}
//           >
//             <i className={`fas ${model.icon} mr-3 ${
//               selectedModel === model.name ? 'text-blue-500' : 'text-gray-400'
//             }`}></i>
//             <span>{model.name}</span>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const handleActionCapsuleClick = (action: string, suggestion?: string) => {
//     let promptText = '';
    
//     if (suggestion) {
//       // If a suggestion was clicked, use it directly
//       switch (action) {
//         case 'explain':
//           promptText = `${suggestion}: `;
//           break;
//         case 'summarize':
//           promptText = `${suggestion} for: `;
//           break;
//         case 'translate':
//           promptText = `${suggestion}: `;
//           break;
//         case 'improve':
//           promptText = `${suggestion}: `;
//           break;
//         case 'code':
//           promptText = `${suggestion}: `;
//           break;
//       }
//     } else {
//       // Default prompts when capsule is clicked
//       switch (action) {
//         case 'explain':
//           promptText = 'Please explain this in detail: ';
//           break;
//         case 'summarize':
//           promptText = 'Please provide a summary of: ';
//           break;
//         case 'translate':
//           promptText = 'Please translate this to English: ';
//           break;
//         case 'improve':
//           promptText = 'Please improve the writing of this text: ';
//           break;
//         case 'code':
//           promptText = 'Please generate code for: ';
//           break;
//       }
//     }
//     setInputText(promptText);
//   };

//   // Update the handlers for toggling sections
//   const handleToggleStarredChats = () => {
//     if (!isShowingStarredChats) {
//       setIsShowingChats(false); // Hide recent chats when showing starred
//     }
//     setIsShowingStarredChats(!isShowingStarredChats);
//   };

//   const handleToggleRecentChats = () => {
//     if (!isShowingChats) {
//       setIsShowingStarredChats(false); // Hide starred chats when showing recent
//     }
//     setIsShowingChats(!isShowingChats);
//   };

//   // Add new handler for project click
//   const handleProjectClick = (project: Project) => {
//     setSelectedProject(project);
//     setIsProjectChatListOpen(true);
//   };

//   // Modify handleAddProject to include name editing
//   const handleAddProject = () => {
//     const newProject: Project = {
//       id: `proj_${Date.now()}`,
//       name: `New Project`,
//       createdAt: new Date(),
//       chats: [],
//       isEditing: true // Start in editing mode
//     };
//     setProjects(prev => [newProject, ...prev]);
//   };

//   // Add new handlers for project management
//   const handleProjectNameEdit = (projectId: string, newName: string) => {
//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return {
//           ...project,
//           name: newName,
//           isEditing: false
//         };
//       }
//       return project;
//     }));
//   };

//   const handleProjectNameEditStart = (projectId: string) => {
//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return { ...project, isEditing: true };
//       }
//       return { ...project, isEditing: false };
//     }));
//   };

// // Update handleNewProjectChat
// const handleNewProjectChat = (projectId: string) => {
//   const newChat: Chat = {
//     id: Date.now().toString(),
//     title: 'New Chat', // This will be updated with first message
//     createdAt: new Date(),
//     messages: [],
//     projectId: projectId,
//     isEditing: false // Don't start in editing mode since title will update automatically
//   };

//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: [newChat, ...project.chats]
//       };
//     }
//     return project;
//   }));

//   setCurrentChat(newChat);
//   setMessages([]);
//   setIsNewChatStarted(true);
//   setShowGreeting(false);
//   setIsChatActive(true);
// };

// // Add project chat management functions
// const handleProjectChatTitleEdit = (projectId: string, chatId: string, newTitle: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => {
//           if (chat.id === chatId) {
//             const updatedChat = { ...chat, title: newTitle, isEditing: false };
//             if (currentChat?.id === chatId) {
//               setCurrentChat(updatedChat);
//             }
//             return updatedChat;
//           }
//           return chat;
//         })
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectChatTitleEditStart = (projectId: string, chatId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => ({
//           ...chat,
//           isEditing: chat.id === chatId
//         }))
//       };
//     }
//     return project;
//   }));
// };

// // Add handler for toggling project collapse
// const handleProjectCollapse = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setCollapsedProjects(prev => ({
//     ...prev,
//     [projectId]: !prev[projectId]
//   }));
// };

// // Add new handler for project deletion
// const handleConfirmDelete = () => {
//   const { itemId, itemType, projectId } = deleteConfirmation;
  
//   if (itemType === 'project') {
//     // Handle project deletion
//     if (currentChat?.projectId === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//     setProjects(prev => prev.filter(project => project.id !== itemId));
//   } else {
//     // Handle chat deletion
//     if (projectId) {
//       // Delete project chat
//       setProjects(prev => prev.map(project => {
//         if (project.id === projectId) {
//           return {
//             ...project,
//             chats: project.chats.filter(chat => chat.id !== itemId)
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Delete regular chat
//       setChats(prev => prev.filter(chat => chat.id !== itemId));
//     }

//     if (currentChat?.id === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   }
  
//   setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
// };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       <div className={`flex h-screen overflow-hidden ${
//         isDarkMode 
//           ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//           : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//       }`}>
//         {/* Fixed brand text container */}
//         <div className={`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${
//           isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//         }`}>
//           <span 
//             onClick={handleHomeClick}  // Add this line
//             className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent hover:opacity-80 transition-opacity" // Add hover effect
//             style={{
//               background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//               WebkitBackgroundClip: 'text',
//               textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//               WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//               letterSpacing: '0.5px'
//             }}
//           >
//             Hind AI
//           </span>
//         </div>

//         {/* Sidebar */}
//         <div 
//           className={`${
//             isSidebarOpen ? 'w-72' : 'w-16'
//           } fixed md:relative h-full transition-all duration-300 ease-in-out ${
//             isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//           } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`}
//         >
//           {/* Top section - only toggle button */}
//           <div className="flex items-center p-4">
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
//               className="text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//             >
//               <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//             </button>
//           </div>

//           {/* Main content with icons-only when collapsed */}
//           <nav className="flex-1 px-2">
//             <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
//               onClick={handleNewChat}
//             >
//               <i className="fa-solid fa-plus w-8"></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 New Chat
//               </span>
//             </button>

//             {/* Search section */}
//             <div className="px-2 mb-4">
//               {isSidebarOpen ? (
//                 <div className="relative">
//                   <input
//                     type="search"
//                     placeholder="Search conversations..."
//                     className={`w-full pl-9 pr-4 py-2 ${
//                       isDarkMode 
//                         ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                         : 'bg-gray-100 text-gray-800'
//                     } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                   />
//                   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => setIsSidebarOpen(true)}
//                   className={`w-full p-2 rounded-lg ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}
//                 >
//                   <i className="fa-solid fa-magnifying-glass"></i>
//                 </button>
//               )}
//             </div>

//             {/* Projects Section */}
//             <div className="mb-2 pl-4"> {/* Increased pl-2 to pl-4 */}
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <div className="flex items-center flex-1">
//                   <i className="fa-solid fa-folder text-blue-400 w-8"></i>
//                   {isSidebarOpen && (
//                     <div className="flex items-center flex-1">
//                       <span className="text-sm font-medium ml-1">Projects</span> {/* Added ml-1 */}
//                       <button
//                         onClick={handleAddProject}
//                         className={`ml-4 p-2 rounded-lg transition-colors ${  // Increased ml-3 to ml-4 and p-1.5 to p-2
//                           isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//                         }`}
//                       >
//                         <i className="fa-solid fa-plus text-xs"></i>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {isSidebarOpen && projects.length > 0 && (
//                 <div className="space-y-1 ml-3"> {/* Increased ml-2 to ml-3 */}
//                   {projects.map(project => (
//                     <div
//                       key={project.id}
//                       className={`group px-2 py-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center flex-1 min-w-0">
//                           <div className="flex items-center">
//                             <button
//                               onClick={(e) => handleProjectCollapse(project.id, e)}
//                               className={`mr-1 p-1 rounded-lg transition-transform duration-200 ${  // Added mr-1 for right margin
//                                 isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                               }`}
//                               style={{ width: '20px' }}  // Fixed width for consistent spacing
//                             >
//                               <i className={`fas fa-chevron-right text-xs text-gray-400 transform transition-transform duration-200 ${
//                                 !collapsedProjects[project.id] ? 'rotate-90' : ''
//                               }`}></i>
//                             </button>
//                             <i className="fa-regular fa-folder-open w-8 text-blue-400 ml-1"></i>  {/* Added ml-1 */}
//                           </div>
//                           {project.isEditing ? (
//                             <input
//                               type="text"
//                               defaultValue={project.name}
//                               autoFocus
//                               onBlur={(e) => handleProjectNameEdit(project.id, e.target.value)}
//                               onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                   handleProjectNameEdit(project.id, e.currentTarget.value);
//                                 }
//                               }}
//                               className={`text-sm px-2 py-1 rounded flex-1 mr-2 ${
//                                 isDarkMode 
//                                   ? 'bg-gray-600 text-gray-200' 
//                                   : 'bg-gray-100 text-gray-800'
//                               }`}
//                             />
//                           ) : (
//                             <span 
//                               className="text-sm truncate flex-1"
//                               onDoubleClick={() => handleProjectNameEditStart(project.id)}
//                             >
//                               {project.name}
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
//                           <button
//                             onClick={() => handleNewProjectChat(project.id)}
//                             className={`p-1 rounded-full ${
//                               isDarkMode 
//                                 ? 'text-gray-400 hover:text-blue-400' 
//                                 : 'text-gray-500 hover:text-blue-500'
//                             }`}
//                           >
//                             <i className="fas fa-plus-circle"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteProject(project.id, e)}
//                             className={`p-1 rounded-full ${
//                               isDarkMode
//                                 ? 'text-gray-400 hover:text-red-400'
//                                 : 'text-gray-500 hover:text-red-500'
//                             }`}
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         </div>
//                       </div>
//                       {/* Project Chats */}
//                       {project.chats.length > 0 && !collapsedProjects[project.id] && (
//                         <div className="ml-8 mt-2 space-y-1">
//                           {project.chats.map(chat => (
//                             <div
//                               key={chat.id}
//                               onClick={() => handleChatSelect(chat)}
//                               className={`group flex items-center justify-between px-2 py-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
//                               }`}
//                             >
//                               <div className="flex items-center space-x-2 flex-1 min-w-0">
//                                 <i className="fas fa-comment-alt text-xs text-gray-400"></i>
//                                 {chat.isEditing ? (
//                                   <input
//                                     type="text"
//                                     defaultValue={chat.title}
//                                     autoFocus
//                                     onClick={e => e.stopPropagation()}
//                                     onBlur={(e) => handleProjectChatTitleEdit(project.id, chat.id, e.target.value)}
//                                     onKeyDown={(e) => {
//                                       if (e.key === 'Enter') {
//                                         handleProjectChatTitleEdit(project.id, chat.id, e.currentTarget.value);
//                                       }
//                                     }}
//                                     className={`text-sm px-2 py-1 rounded flex-1 ${
//                                       isDarkMode 
//                                         ? 'bg-gray-700 text-gray-200' 
//                                         : 'bg-gray-100 text-gray-800'
//                                     }`}
//                                   />
//                                 ) : (
//                                   <span 
//                                     className="text-sm truncate"
//                                     onDoubleClick={(e) => {
//                                       e.stopPropagation();
//                                       handleProjectChatTitleEditStart(project.id, chat.id);
//                                     }}
//                                   >
//                                     {chat.title}
//                                   </span>
//                                 )}
//                               </div>
//                               <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleProjectChatTitleEditStart(project.id, chat.id);
//                                   }}
//                                   className={`p-1 rounded-full ${
//                                     isDarkMode
//                                       ? 'text-gray-400 hover:text-blue-400'
//                                       : 'text-gray-500 hover:text-blue-500'
//                                   }`}
//                                 >
//                                   <i className="fas fa-edit text-xs"></i>
//                                 </button>
//                                 <button
//                                   onClick={(e) => handleDeleteProjectChat(project.id, chat.id, e)}
//                                   className={`p-1 rounded-full ${
//                                     isDarkMode
//                                       ? 'text-gray-400 hover:text-red-400'
//                                       : 'text-gray-500 hover:text-red-500'
//                                   }`}
//                                 >
//                                   <i className="fas fa-trash text-xs"></i>
//                                 </button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Starred Chats Section */}
//             <div className="mb-4">
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <button
//                   onClick={() => {
//                     if (!isSidebarOpen) {
//                       setChatListInitialTab('starred');
//                       setIsChatListOpen(true);
//                     }
//                   }}
//                   className="relative"
//                 >
//                   <i className="fa-solid fa-star text-yellow-500 w-8"></i>
//                 </button>
//                 {isSidebarOpen && <span className="text-sm font-medium">Starred Chats</span>}
//               </div>
//               <div className="space-y-1">
//                 {chats
//                   .filter(chat => chat.isStarred)
//                   .map((chat) => (
//                     <div
//                       key={`starred_${chat.id}`}
//                       className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                       onClick={() => handleChatSelect(chat)}
//                     >
//                       <i className="fas fa-comment-alt w-8 text-yellow-500/80"></i>
//                       {isSidebarOpen && (
//                         <>
//                           <span className="ml-2 truncate flex-1">{chat.title}</span>
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className="ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//                           >
//                             <i className="fas fa-star text-yellow-500"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                               isDarkMode
//                                 ? 'text-gray-400 hover:text-red-400'
//                                 : 'text-gray-500 hover:text-red-500'
//                             }`}
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* All Chats Section */}
//             <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen) {
//                     setChatListInitialTab('all');
//                     setIsChatListOpen(true);
//                   }
//                 }}
//                 className="relative"
//               >
//                 <i className="fa-solid fa-comments w-8"></i>
//               </button>
//               {isSidebarOpen && <span className="text-sm font-medium">All Chats</span>}
//             </div>
            
//             {/* Chat list section */}
//             <div className="space-y-1">
//               {chats.filter(chat => !chat.isStarred).map((chat) => (
//                 <div
//                   key={`all_${chat.id}`}
//                   className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                     isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                   }`}
//                   onClick={() => handleChatSelect(chat)}
//                 >
//                   <i className="fa-regular fa-comment w-8"></i>
//                   {isSidebarOpen && (
//                     <>
//                       {chat.isEditing ? (
//                         <input
//                           type="text"
//                           defaultValue={chat.title}
//                           autoFocus
//                           onClick={e => e.stopPropagation()}
//                           onBlur={(e) => handleChatTitleEdit(chat.id, e.target.value)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                               handleChatTitleEdit(chat.id, e.currentTarget.value);
//                             }
//                           }}
//                           className={`text-sm px-2 py-1 rounded flex-1 mr-2 ${
//                             isDarkMode 
//                               ? 'bg-gray-600 text-gray-200' 
//                               : 'bg-gray-100 text-gray-800'
//                           }`}
//                         />
//                       ) : (
//                         <span 
//                           className="ml-2 truncate flex-1"
//                           onDoubleClick={(e) => {
//                             e.stopPropagation();
//                             handleChatTitleEditStart(chat.id);
//                           }}
//                         >
//                           {chat.title}
//                         </span>
//                       )}
//                       <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleChatTitleEditStart(chat.id);
//                           }}
//                           className={`p-1 rounded-full transition-colors ${
//                             isDarkMode
//                               ? 'text-gray-400 hover:text-blue-400'
//                               : 'text-gray-500 hover:text-blue-500'
//                           }`}
//                         >
//                           <i className="fas fa-edit"></i>
//                         </button>
//                         <button
//                           onClick={(e) => handleStarChat(chat.id, e)}
//                           className={`p-1 rounded-full transition-colors ${
//                             chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//                           }`}
//                         >
//                           <i className="fas fa-star"></i>
//                         </button>
//                         <button
//                           onClick={(e) => handleDeleteChat(chat.id, e)}
//                           className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//                         >
//                           <i className="fas fa-trash"></i>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </nav>

//           {/* Auth section at bottom */}
//           <div className="mt-auto p-2 border-t border-gray-700/50">
//             {isAuthenticated ? (
//               <div className="space-y-1">
//                 <div className="flex items-center p-2 rounded-lg">
//                   <i className="fa-solid fa-user w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     {userProfile?.name}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//                 >
//                   <i className="fa-solid fa-right-from-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Logout
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-1">
//                 <button className="w-full flex items-center p-2" onClick={() => setIsLoginModalOpen(true)}>
//                   <i className="fa-solid fa-right-to-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Login
//                   </span>
//                 </button>
//                 <button 
//                   className="w-full flex items-center p-2 text-indigo-500"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setIsLoginModalOpen(true);
//                   }}
//                 >
//                   <i className="fa-solid fa-user-plus w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Sign Up
//                   </span>
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={toggleDarkMode}
//               className="w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//             >
//               <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8`}></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col relative pt-16 pl-16">
//           <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
//             isCodeSliderOpen ? 'lg:pr-[35%]' : ''
//           }`}>
//             {/* Main chat section that shifts left when slider opens */}
//             <div className={`
//               w-full mx-auto transition-all duration-300
//               ${isCodeSliderOpen 
//                 ? 'lg:max-w-full' 
//                 : 'max-w-3xl'
//               }
//             `}>
//               {/* Chat content */}
//               <div className={`w-full max-w-3xl mx-auto ${
//                 hasMessages || isNewChatStarted ? 'min-h-full flex flex-col' : ''
//               }`}>
//                 {showGreeting && !hasMessages && !isNewChatStarted ? (
//                   <div className="flex justify-center items-center min-h-[200px]">
//                     <Greeting />
//                   </div>
//                 ) : (
//                   <div className="flex-1 flex flex-col justify-end">
//                     <div className="flex-1 space-y-4 py-4 px-4">
//                       {messages.map((message, index) => (
//                         <div
//                           key={`${message.id}_${index}`}
//                           className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
//                           style={{
//                             animationDelay: `${index * 100}ms`,
//                           }}
//                         >
//                           <div
//                             className={`max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${
//                               message.type === 'user'
//                                 ? isDarkMode
//                                   ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//                                   : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//                                 : isDarkMode
//                                   ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//                                   : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//                             }`}
//                             style={{
//                               backdropFilter: 'blur(8px)',
//                             }}
//                           >
//                             <div className="flex items-center justify-between mb-1">
//                               <div className="flex items-center">
//                                 <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                                 <span className="text-sm opacity-75">
//                                   {new Date(message.timestamp).toLocaleTimeString()}
//                                 </span>
//                               </div>
//                               {renderMessageStatus(message.status)}
//                             </div>
                            
//                             {message.file && (
//                               <div className="mb-2">
//                                 {message.file.type.startsWith('image/') ? (
//                                   <div className="relative rounded-lg overflow-hidden">
//                                     <img 
//                                       src={message.file.url} 
//                                       alt={message.file.name}
//                                       className="max-w-full h-auto rounded-lg"
//                                     />
//                                     <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm p-2">
//                                       <div className="flex items-center">
//                                         <i className="fas fa-image mr-2"></i>
//                                         <span className="truncate">{message.file.name}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ) : message.file.type === 'application/pdf' ? (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file-pdf text-2xl text-red-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">PDF Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-external-link-alt"></i>
//                                     </a>
//                                   </div>
//                                 ) : (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file text-2xl text-blue-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-download"></i>
//                                     </a>
//                                   </div>
//                                 )}
//                               </div>
//                             )}
                            
//                             <div className="space-y-4">
//                               {parseMessageContent(message.content).map((part, index) => (
//                                 part.type === 'code' ? (
//                                   <div 
//                                     key={index}
//                                     onClick={() => handleCodeBlockClick(part.content, part.language)}
//                                     className={`cursor-pointer group rounded-lg overflow-hidden ${
//                                       isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                                     }`}
//                                   >
//                                     <div className={`flex items-center justify-between px-4 py-2 ${
//                                       isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//                                     }`}>
//                                       <div className="flex items-center space-x-2">
//                                         <i className="fas fa-code"></i>
//                                         <span className={`text-sm font-medium ${
//                                           isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                                         }`}>
//                                           {part.language}
//                                         </span>
//                                       </div>
//                                       <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
//                                         isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                                       }`}>
//                                         <i className="fas fa-expand-alt"></i>
//                                       </div>
//                                     </div>
//                                     <div className="p-4 max-h-60 overflow-hidden relative">
//                                       <pre className="overflow-x-auto">
//                                         <code className={`language-${part.language} ${
//                                           isDarkMode ? 'text-gray-300' : 'text-gray-800'
//                                         }`}>
//                                           {part.content}
//                                         </code>
//                                       </pre>
//                                       <div className={`absolute bottom-0 inset-x-0 h-8 ${
//                                         isDarkMode 
//                                           ? 'bg-gradient-to-t from-gray-800' 
//                                           : 'bg-gradient-to-t from-gray-50'
//                                       }`}></div>
//                                     </div>
//                                   </div>
//                                 ) : (
//                                   <p key={index} className="text-base leading-relaxed whitespace-pre-wrap">
//                                     {part.content}
//                                   </p>
//                                 )
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                       <div ref={messagesEndRef} />  
//                     </div>
//                   </div>
//                 )}

//                 {/* Chat input section */}
//                 <div className={`
//                   ${hasMessages || isNewChatStarted
//                     ? 'fixed bottom-6 lg:left-16 transition-all duration-300' 
//                     : 'sticky bottom-6'
//                   } w-full px-4
//                   ${isCodeSliderOpen 
//                     ? 'lg:left-16 lg:w-[100%] lg:translate-x-0' // Reduced left margin
//                     : 'mx-auto'
//                   }
//                 `}>
//                   <div className={`
//                     max-w-4xl
//                     ${showGreeting 
//                       ? 'mx-auto'
//                       : isCodeSliderOpen 
//                         ? 'lg:ml-0' // Remove margin when slider is open
//                         : 'mx-auto'
//                     }
//                   `}>
//                     <div className={`relative rounded-[20px] shadow-lg chat-glow transition-colors ${
//                       isDarkMode ? 'bg-gray-800' : 'bg-white'
//                     }`}>
//                       {activeFilePreview && (
//                         <div className={`w-full px-4 py-3 ${
//                           isDarkMode 
//                             ? 'bg-gray-700/30' 
//                             : 'bg-gray-50/50'
//                         }`}>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-3">
//                               <i className={`fas ${
//                                 activeFilePreview.type.startsWith('image/')
//                                   ? 'fa-image text-green-400'
//                                   : activeFilePreview.type === 'application/pdf'
//                                     ? 'fa-file-pdf text-red-400'
//                                     : 'fa-file text-blue-400'
//                               } text-lg`}></i>
//                               <div className="flex flex-col">
//                                 <span className="text-sm font-medium truncate max-w-[200px]">
//                                   {activeFilePreview.name}
//                                 </span>
//                                 <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                   Ready to send
//                                 </span>
//                               </div>
//                             </div>
//                             <button 
//                               onClick={() => setActiveFilePreview(null)}
//                               className={`p-1.5 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'hover:bg-gray-600 text-gray-400' 
//                                   : 'hover:bg-gray-200 text-gray-500'
//                               }`}
//                             >
//                               <i className="fas fa-times"></i>
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {messages.length > 0 && messages[messages.length - 1].file && (
//                         <div className={`w-full px-4 py-2 ${
//                           isDarkMode 
//                             ? 'bg-gray-700/30' 
//                             : 'bg-gray-50/50'
//                         }`}>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <i className={`fas ${
//                                 messages[messages.length - 1].file?.type.startsWith('image/')
//                                   ? 'fa-image text-green-400'
//                                   : messages[messages.length - 1].file?.type === 'application/pdf'
//                                     ? 'fa-file-pdf text-red-400'
//                                     : 'fa-file text-blue-400'
//                               }`}></i>
//                               <span className="text-sm truncate max-w-[200px]">
//                                 {messages[messages.length - 1].file?.name}
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                 File attached
//                               </span>
//                               <i className="fas fa-check text-green-400"></i>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       <div className="relative flex flex-col">
//                         <div className="min-h-[56px] max-h-[200px] overflow-hidden">
//                           <textarea
//                             className={`w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${
//                               isDarkMode 
//                                 ? 'bg-gray-800 text-gray-200 placeholder-gray-400' 
//                                 : 'bg-white text-gray-800 placeholder-gray-500'
//                             }`}
//                             value={inputText}
//                             onChange={handleTextAreaResize}
//                             placeholder={`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter' && !e.shiftKey) {
//                                 e.preventDefault();
//                                 if (activeFilePreview || inputText.trim()) {
//                                   handleSendMessage();
//                                 }
//                               }
//                             }}
//                             style={{
//                               minHeight: '56px',
//                               maxHeight: '200px'
//                             }}
//                           />
//                         </div>

//                         <div className={`flex items-center justify-between p-4 rounded-b-[20px] ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-white'
//                         }`}>
//                           <div className="flex items-center space-x-2">
//                             <div className="relative inline-block">
//                               <button
//                                 ref={modelButtonRef}
//                                 onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
//                                 className={`flex items-center space-x-2 px-2 py-1.5 rounded-lg text-sm ${
//                                   isDarkMode 
//                                     ? 'hover:bg-gray-700 text-gray-300' 
//                                     : 'hover:bg-gray-100 text-gray-600'
//                                 } transition-all duration-300`}
//                               >
//                                 <i className={`fas ${models.find(m => m.name === selectedModel)?.icon}`}></i>
//                                 <span className="hidden sm:inline">{selectedModel}</span>
//                                 <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${
//                                   isModelDropdownOpen ? 'rotate-180' : 'rotate-0'
//                                 }`}></i>
//                               </button>

//                               {isModelDropdownOpen && (
//                                 <ModelDropdown onSelect={handleModelSelect} />
//                               )}
//                             </div>
                            
//                             <div className="relative inline-block">
//                               <LanguageSelector
//                                 isDarkMode={isDarkMode}
//                                 onLanguageChange={handleLanguageChange}
//                                 selectedLanguage={selectedLanguage}
//                                 className="z-[9999]"
//                                 dropdownPosition="absolute"
//                               />
//                             </div>
//                           </div>
                          
//                           <div className="flex items-center space-x-2">
//                             <button
//                               className={`p-2 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'text-gray-400 hover:text-blue-400' 
//                                   : 'text-gray-400 hover:text-indigo-600'
//                               }`}
//                               onClick={() => setIsUploadModalOpen(true)}
//                             >
//                               <i className="fas fa-paperclip"></i>
//                             </button>
                                
//                             <button
//                               className={`p-2 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'text-gray-400 hover:text-blue-400' 
//                                   : 'text-gray-400 hover:text-indigo-600'
//                               }`}
//                               onClick={() => setIsMicActive(!isMicActive)}
//                             >
//                               <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                             </button>
                            
//                             <button
//                               className={`rounded-full p-2.5 transition-colors ${
//                                 isDarkMode 
//                                   ? 'bg-blue-600 hover:bg-blue-700' 
//                                   : 'bg-indigo-600 hover:bg-indigo-700'
//                               } text-white`}
//                               onClick={handleSendMessage}
//                             >
//                               <i className="fas fa-paper-plane"></i>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {!hasMessages && !isNewChatStarted && (
//                       <ActionCapsules 
//                         isDarkMode={isDarkMode}
//                         onActionClick={handleActionCapsuleClick}
//                       />
//                     )}
//                     {!hasMessages && !isNewChatStarted && (
//                       <div className="mt-4">
//                         <div className="grid grid-cols-2 gap-4">
//                           {/* Starred Chats Section */}
//                           <div>
//                             <div className="flex items-center justify-between mb-3">
//                               <div className="flex items-center">
//                                 <i className="fas fa-star mr-2 text-yellow-500"></i>
//                                 <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                                   Starred chats
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <button
//                                   className={`px-2 py-1 text-xs rounded-full transition-colors ${
//                                     isDarkMode 
//                                       ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                                       : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                                   }`}
//                                   onClick={handleToggleStarredChats}
//                                 >
//                                   {isShowingStarredChats ? 'Hide' : 'Show'}
//                                 </button>
//                                 {isShowingStarredChats && chats.filter(chat => chat.isStarred).length > 3 && (
//                                   <button
//                                     onClick={() => {
//                                       setChatListInitialTab('starred');
//                                       setIsChatListOpen(true);
//                                     }}
//                                     className={`text-xs ${
//                                       isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//                                     }`}
//                                   >
//                                     View all
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
                            
//                             <div className={`transition-all duration-300 ${
//                               isShowingStarredChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//                             }`}>
//                               {isShowingStarredChats && (
//                                 <div className={`${
//                                   isDarkMode 
//                                     ? 'bg-gray-800/50 shadow-gray-900/20' 
//                                     : 'bg-white/50 shadow-sm'
//                                 } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`}>
//                                   {chats.filter(chat => chat.isStarred).length > 0 ? (
//                                     <ul className="space-y-1.5">
//                                       {chats
//                                         .filter(chat => chat.isStarred)
//                                         .slice(0, showAllStarredChats ? undefined : 3)
//                                         .map(chat => (
//                                           <li
//                                             key={`starred_${chat.id}`}
//                                             className={`group ${
//                                               isDarkMode 
//                                                 ? 'hover:bg-gray-700/50 hover:border-gray-600' 
//                                                 : 'hover:bg-gray-50 hover:border-gray-100'
//                                             } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                             onClick={() => handleChatSelect(chat)}
//                                           >
//                                             <div className="flex items-center space-x-2 min-w-0">
//                                               <i className="fas fa-comment-alt text-gray-400 flex-shrink-0"></i>
//                                               <span className="truncate">{chat.title}</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                               <i className="fas fa-star text-yellow-500 flex-shrink-0"></i>
//                                               <button
//                                                 onClick={(e) => handleDeleteChat(chat.id, e)}
//                                                 className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                                                   isDarkMode
//                                                     ? 'text-gray-400 hover:text-red-400'
//                                                     : 'text-gray-500 hover:text-red-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-trash"></i>
//                                               </button>
//                                             </div>
//                                           </li>
//                                         ))}
//                                     </ul>
//                                   ) : (
//                                     <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                       No starred chats yet
//                                     </p>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           {/* Recent Chats Section */}
//                           <div>
//                             <div className="flex items-center justify-between mb-3">
//                               <div className="flex items-center">
//                                 <i className="fas fa-history mr-2 text-gray-400"></i>
//                                 <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                                   Recent chats
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <button
//                                   className={`px-2 py-1 text-xs rounded-full transition-colors ${
//                                     isDarkMode 
//                                       ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                                       : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                                   }`}
//                                   onClick={handleToggleRecentChats}
//                                 >
//                                   {isShowingChats ? 'Hide' : 'Show'}
//                                 </button>
//                                 {isShowingChats && chats.length > 3 && (
//                                   <button
//                                     onClick={() => {
//                                       setChatListInitialTab('all');
//                                       setIsChatListOpen(true);
//                                     }}
//                                     className={`text-xs ${
//                                       isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//                                     }`}
//                                   >
//                                     View all
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
                            
//                             <div className={`transition-all duration-300 ${
//                               isShowingChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//                             }`}>
//                               {isShowingChats && (
//                                 <div className={`${
//                                   isDarkMode 
//                                     ? 'bg-gray-800/50 shadow-gray-900/20' 
//                                     : 'bg-white/50 shadow-sm'
//                                 } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`}>
//                                   {chats.length > 0 ? (
//                                     <ul className="space-y-1.5">
//                                       {chats
//                                         .slice(0, showAllChats ? undefined : 3)
//                                         .map(chat => (
//                                           <li
//                                             key={`recent_${chat.id}`}
//                                             className={`group ${
//                                               isDarkMode 
//                                                 ? 'hover:bg-gray-700/50 hover:border-gray-600' 
//                                                 : 'hover:bg-gray-50 hover:border-gray-100'
//                                             } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                             onClick={() => handleChatSelect(chat)}
//                                           >
//                                             <div className="flex items-center space-x-2 min-w-0">
//                                               <i className="fas fa-comment-alt text-gray-400 flex-shrink-0"></i>
//                                               <span className="truncate">{chat.title}</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                               <button
//                                                 onClick={(e) => handleStarChat(chat.id, e)}
//                                                 className={`flex-shrink-0 transition-colors ${
//                                                   chat.isStarred
//                                                     ? 'text-yellow-500'
//                                                     : 'text-gray-400 hover:text-yellow-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-star"></i>
//                                               </button>
//                                               <button
//                                                 onClick={(e) => handleDeleteChat(chat.id, e)}
//                                                 className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                                                   isDarkMode
//                                                     ? 'text-gray-400 hover:text-red-400'
//                                                     : 'text-gray-500 hover:text-red-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-trash"></i>
//                                               </button>
//                                             </div>
//                                           </li>
//                                         ))}
//                                     </ul>
//                                   ) : (
//                                     <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                       No recent chats available
//                                     </p>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Only show additional components when no messages */}
//               {!hasMessages && (
//                 <div className="max-w-[850px] mx-auto mt-6">
//                   {activeTab === 'analysis' && (
//                     <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                       <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                       <div ref={chartRef} style={{ height: '300px' }}></div>
//                     </div>
//                   )}

                  
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ChatListPopup
//         isOpen={isChatListOpen}
//         onClose={() => setIsChatListOpen(false)}
//         chats={chats}
//         onChatSelect={handleChatSelect}
//         onStarChat={handleStarChat}
//         onDeleteChat={handleDeleteChat}
//         isDarkMode={isDarkMode}
//         initialTab={chatListInitialTab}
//       />
//       <VoiceInput
//         isActive={isMicActive}
//         onTranscript={handleVoiceTranscript}
//         onStateChange={handleVoiceStateChange}
//         isDarkMode={isDarkMode}
//       />
//       <InfoPanel
//         isOpen={isInfoPanelOpen}
//         onClose={() => {
//           setIsInfoPanelOpen(false);
//           setSelectedCode(null);
//         }}
//         isDarkMode={isDarkMode}
//         code={selectedCode || undefined}
//       />
//       <CodeSlider
//         isOpen={isCodeSliderOpen}
//         onClose={() => {
//           setIsCodeSliderOpen(false);
//           setSelectedCodeBlock(null);
//         }}
//         code={selectedCodeBlock?.content || ''}
//         language={selectedCodeBlock?.language || 'plaintext'}
//         isDarkMode={isDarkMode}
//       />
//       <SlidingAuthForm
//         isOpen={isLoginModalOpen}
//         onClose={() => setIsLoginModalOpen(false)}
//         isLogin={isLogin}
//         onToggleMode={toggleAuthMode}
//         onSubmit={handleAuthSubmit}
//         loading={loading}
//         error={formError}
//         success={formSuccess}
//         isDarkMode={isDarkMode}
//       />
//       <DeleteConfirmationPopup
//         isOpen={deleteConfirmation.isOpen}
//         onClose={() => setDeleteConfirmation(prev => ({ ...prev, isOpen: false }))}
//         onConfirm={handleConfirmDelete}
//         isDarkMode={isDarkMode}
//         itemType={deleteConfirmation.itemType}
//       />
//       <div id="dropdown-root" className="fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;





// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';
// import ActionCapsules from './components/ActionCapsules';
// import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';
// import ModelSelector from './components/ModelSelector';
// import { Brain, MessageSquare, Bot, Sparkles, Code, Settings, Cpu,GlobeIcon } from "lucide-react";
// import ProjectListPopup from './components/ProjectListPopup';
// import ImagePreview from './components/ImagePreview';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// // Update the Chat interface to include project association
// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string; // Add this to track which project the chat belongs to
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// // Update Project interface
// interface Project {
//   id: string;
//   name: string;
//   createdAt: Date;
//   chats: Chat[];
//   isEditing?: boolean;
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   //const [selectedModel, setSelectedModel] = useState(models[0]);
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');
//   const [isShowingStarredChats, setIsShowingStarredChats] = useState(true);
//   const [showAllStarredChats, setShowAllStarredChats] = useState(false);
//   const [isNewChatStarted, setIsNewChatStarted] = useState(false);
//   const modelButtonRef = useRef<HTMLButtonElement>(null);
//   const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
//   const [isShowingProjects, setIsShowingProjects] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isProjectListOpen, setIsProjectListOpen] = useState(false);


//   // Add new states
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isProjectChatListOpen, setIsProjectChatListOpen] = useState(false);
//   // Add new state for collapsed projects
//   const [collapsedProjects, setCollapsedProjects] = useState<{ [key: string]: boolean }>({});
//   // Add new states for delete confirmation
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{
//     isOpen: boolean;
//     itemId: string;
//     itemType: 'chat' | 'project';
//     projectId?: string;
//   }>({
//     isOpen: false,
//     itemId: '',
//     itemType: 'chat',
//   });

//   const models = [
//     { id: "gpt4", name: "GPT-4", icon: <Brain size={18} /> },
//     { id: "claude", name: "Claude 3", icon: <MessageSquare size={18} /> },
//     { id: "nextchat", name: "NextChat", icon: <Bot size={18} /> },
//     { id: "gemini", name: "Gemini", icon: <Sparkles size={18} /> },
//     { id: "llama3", name: "LLaMA 3", icon: <Code size={18} /> },
//     { id: "mistral", name: "Mistral", icon: <Settings size={18} /> }, 
//     { id: "palm2", name: "PaLM 2", icon: <Cpu size={18} /> }, 
//   ];

//   const toggleDarkMode = () => { 
//     setIsDarkMode(prev => !prev);
//   };

// const handleNewChat = () => {
//   // Create a new chat object
//   const newChat: Chat = {
//     id: Date.now().toString(),
//     title: 'New Chat',
//     createdAt: new Date(),
//     messages: [],
//     isEditing: false
//   };
  
//   // Add the new chat to the chats array
//   setChats(prev => [newChat, ...prev]);
  
//   // Reset all chat-related states
//   setCurrentChat(newChat);
//   setMessages([]);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(true);
//   setActiveChat(newChat.id);
//   setHasMessages(false);
  
//   // Clear any active states
//   setActiveFilePreview(null);
//   setIsGenerating(false);
//   setIsMicActive(false);
  
//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update handleChatSelect to handle initial message
// const handleChatSelect = (chat: Chat) => {
//   if (currentChat?.id === chat.id) return;
  
//   setCurrentChat(chat);
//   setMessages(chat.messages);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(false); // Reset new chat state
  
//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Add chat title editing functionality
// const handleChatTitleEdit = (chatId: string, newTitle: string) => {
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       const updatedChat = { ...chat, title: newTitle, isEditing: false };
//       if (currentChat?.id === chatId) {
//         setCurrentChat(updatedChat);
//       }
//       return updatedChat;
//     }
//     return chat;
//   }));
// };

// const handleChatTitleEditStart = (chatId: string) => {
//   setChats(prev => prev.map(chat => ({
//     ...chat,
//     isEditing: chat.id === chatId
//   })));
// };

//   const handleHomeClick = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setMessages([]);
//     setActiveChat(null);
//     setIsNewChatStarted(false);
    
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };

//   // Update delete handlers to show confirmation first
//   const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDeleteConfirmation({
//       isOpen: true,
//       itemId: chatId,
//       itemType: 'chat'
//     });
//   };

//   const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDeleteConfirmation({
//       isOpen: true,
//       itemId: projectId,
//       itemType: 'project'
//     });
//   };

//   const handleDeleteProjectChat = (projectId: string, chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDeleteConfirmation({
//       isOpen: true,
//       itemId: chatId,
//       projectId: projectId,
//       itemType: 'chat'
//     });
//   };

//   const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setChats(prev => prev.map(chat => {
//       if (chat.id === chatId) {
//         return { ...chat, isStarred: !chat.isStarred };
//       }
//       return chat;
//     }));
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setIsSidebarOpen(false);
//       }
//     };
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   useEffect(() => {
//     if (chartRef.current && activeTab === 'analysis') {
//       const chart = echarts.init(chartRef.current);
//       const option = {
//         animation: false,
//         title: {
//           text: 'Message Analysis',
//           textStyle: { color: '#e5e7eb' }
//         },
//         tooltip: {
//           trigger: 'axis'
//         },
//         xAxis: {
//           type: 'category',
//           data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//           axisLabel: { color: '#e5e7eb' }
//         },
//         yAxis: {
//           type: 'value',
//           axisLabel: { color: '#e5e7eb' }
//         },
//         series: [{
//           data: [120, 200, 150, 80, 70, 110, 130],
//           type: 'line',
//           smooth: true,
//           color: '#818cf8'
//         }]
//       };
//       chart.setOption(option);
//     }
//   }, [activeTab]);

//   useEffect(() => {
//     if (!isSidebarOpen && !isHovered) {
//       setIsSearchActive(false);
//     }
//   }, [isSidebarOpen, isHovered]);

//   const resetTextAreaHeight = () => {
//     const textarea = document.querySelector('textarea');
//     if (textarea) {
//       textarea.style.height = '56px';
//     }
//   };

//   const [isTransitioning, setIsTransitioning] = useState(false);

//   // Update the handleSendMessage function
// const handleSendMessage = async () => {
//   if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;
  
//   setHasMessages(true);
  
//   if (isMicActive) {
//     setIsMicActive(false);
//   }
  
//   setIsCleanView(true);
  
//   let chatToUse = currentChat;
  
//   if (!chatToUse) {
//     // Create new chat with temporary title
//     chatToUse = {
//       id: Date.now().toString(),
//       title: 'New Chat', // We'll update this after sending the first message
//       createdAt: new Date(),
//       messages: []
//     };
//     setCurrentChat(chatToUse);
//     setChats(prev => [chatToUse, ...prev]);
//   }
  
//   setShowGreeting(false);
//   setIsChatActive(true);
  
//   const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
//   const newMessage: Message = {
//     id: messageId,
//     content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//     type: 'user',
//     timestamp: new Date(),
//     status: 'sending',
//     file: activeFilePreview || undefined
//   };

//   try {
//     const updatedChat = {
//       ...chatToUse,
//       messages: [...chatToUse.messages, newMessage]
//     };

//     // Update chat title if this is the first message
//     if (updatedChat.messages.length === 1) {
//       // Truncate long messages and clean up multiline content
//       const cleanContent = inputText
//         .split('\n')[0] // Take only the first line
//         .trim()
//         .substring(0, 30); // Take first 30 characters
      
//       const newTitle = cleanContent + (cleanContent.length >= 30 ? '...' : '');
//       updatedChat.title = newTitle;
//     }

//     if (chatToUse.projectId) {
//       setProjects(prev => prev.map(project => {
//         if (project.id === chatToUse.projectId) {
//           return {
//             ...project,
//             chats: project.chats.map(chat => 
//               chat.id === chatToUse.id ? updatedChat : chat
//             )
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Update the chat in the main chats array
//       setChats(prev => prev.map(chat => 
//         chat.id === chatToUse.id ? updatedChat : chat
//       ));
//     }

//     setCurrentChat(updatedChat);
//     setMessages(updatedChat.messages);
//     setInputText('');
//     resetTextAreaHeight();
//     setIsGenerating(true);

//     // Add this helper function to detect image URLs in the response
//     const isImageUrl = (text: string) => {
//       return text.match(/https?:\/\/res\.cloudinary\.com\/[^\s]+\.(jpg|jpeg|png|gif)/i);
//     };

//     // Call the updated API with chat ID and username
//     const aiResponseText = await generateResponse(
//       inputText,
//       chatToUse.id,
//       userProfile?.name || 'user'
//     );
    
//     const sentMessage = { ...newMessage, status: 'sent' };
    
//     // Check if the response contains an image URL
//     const imageMatch = isImageUrl(aiResponseText);
    
//     let aiResponse: Message;
//     if (imageMatch) {
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: '',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent',
//         file: {
//           name: 'generated-image.png',
//           type: 'image/png',
//           url: imageMatch[0] // Use the matched URL
//         }
//       };
//     } else {
//       // Regular text response
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponseText,
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };
//     }

//     const finalChat = {
//       ...updatedChat,
//       messages: [
//         ...updatedChat.messages.map(msg => 
//           msg.id === newMessage.id ? sentMessage : msg
//         ),
//         aiResponse
//       ]
//     };

//     setChats(prev => prev.map(c => 
//       c.id === finalChat.id ? finalChat : c
//     ));
//     setCurrentChat(finalChat);
//     setMessages(finalChat.messages);
//     setActiveFilePreview(null);

//   } catch (error) {
//     console.error('Failed to send message:', error);
//     const errorMessage = { ...newMessage, status: 'error' };
    
//     const errorChat = {
//       ...currentChat,
//       messages: currentChat?.messages.map(msg =>
//         msg.id === newMessage.id ? errorMessage : msg
//       ) || []
//     };
    
//     setChats(prev => prev.map(c => 
//       c.id === currentChat?.id ? errorChat : c
//     ));
//     setCurrentChat(errorChat);
//     setMessages(errorChat.messages);
//   } finally {
//     setIsGenerating(false);
//   }
// };

//   const renderMessageStatus = (status: Message['status']) => {
//     switch (status) {
//       case 'sending':
//         return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2"></i>;
//       case 'sent':
//         return <i className="fas fa-check text-green-500 ml-2"></i>;
//       case 'error':
//         return <i className="fas fa-exclamation-circle text-red-500 ml-2"></i>;
//       default:
//         return null;
//     }
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     handleFiles(files);
//   };

//   const handleFiles = (files: FileList) => {
//     Array.from(files).forEach(file => {
//       const fileUrl = URL.createObjectURL(file);
//       const filePreview = {
//         name: file.name,
//         type: file.type,
//         url: fileUrl
//       };
//       setActiveFilePreview(filePreview);
      
//       const newMessage: Message = {
//         id: Date.now().toString(),
//         content: `Attached: ${file.name}`,
//         type: 'user',
//         timestamp: new Date(),
//         status: 'sent',
//         file: filePreview
//       };
  
//       if (currentChat) {
//         const updatedChat = {
//           ...currentChat,
//           messages: [...currentChat.messages, newMessage]
//         };
  
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       }
//     });
  
//     setIsUploadModalOpen(false);
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       handleFiles(e.target.files);
//     }
//   };

//   const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
//     setLoading(true);
//     setFormError('');
//     setFormSuccess('');
    
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       if (isLogin) {
//         setFormSuccess('Successfully logged in!');
//         handleAuthSuccess({ 
//           name: data.email.split('@')[0], 
//           email: data.email 
//         });
//       } else {
//         setFormSuccess('Account created successfully!');
//         handleSignupSuccess({ 
//           name: data.name || data.email.split('@')[0], 
//           email: data.email 
//         });
//       }
      
//     } catch (error) {
//       setFormError('Authentication failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Add this new function to toggle between login and signup
//   const toggleAuthMode = () => {
//     setIsLogin(!isLogin);
//     setFormError('');
//     setFormSuccess('');
//   };

//   const handleIntroductionComplete = (name: string) => {
//     setUserName(name);
//     setShowIntroduction(false);
//     setShowGreeting(false);
//   };

//   const handleSignupSuccess = (userData: { name: string; email: string }) => {
//     handleAuthSuccess(userData);
//     setShowIntroduction(true);
//   };

//   const handleAuthSuccess = (userData: { name: string; email: string }) => {
//     setIsAuthenticated(true);
//     setUserProfile(userData);
//     setIsLoginModalOpen(false);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//     setUserProfile(null);
//     setChats([]);
//     setMessages([]);
//     setCurrentChat(null);
//     setShowGreeting(true);
//     setIsChatActive(false);
//     setActiveChat(null);
//     setStarredChats([]);
//   };

//   const Greeting = React.memo(() => {
//     const [displayText, setDisplayText] = useState('');
//     const hour = new Date().getHours();
//     const greetingText = hour >= 0 && hour < 12
//       ? 'Good morning'
//       : hour >= 12 && hour < 16
//         ? 'Good afternoon'
//         : 'Good evening';

//     useEffect(() => {
//       if (!hasGreetingPlayed) {
//         // Only add comma if there's a username
//         const fullText = userProfile?.name 
//           ? `${greetingText}, ${userProfile.name}`
//           : greetingText;

//         let timeouts: NodeJS.Timeout[] = [];

//         [...fullText].forEach((char, index) => {
//           const timeout = setTimeout(() => {
//             setDisplayText(prev => prev + char);
//             if (index === fullText.length - 1) {
//               setHasGreetingPlayed(true);
//             }
//           }, 100 * index);
//           timeouts.push(timeout);
//         });

//         return () => timeouts.forEach(clearTimeout);
//       } else {
//         // Only add comma if there's a username
//         const fullText = userProfile?.name 
//           ? `${greetingText}, ${userProfile.name}`
//           : greetingText;
//         setDisplayText(fullText);
//       }
//     }, [greetingText, userProfile?.name]);

//     return (
//       <h1 className="text-4xl font-light text-center">
//         {displayText}
//       </h1>
//     );
//   });

//   const handleVoiceTranscript = (text: string) => {
//     setInputText(text);
//   };

//   const handleVoiceStateChange = (isActive: boolean) => {
//     setIsMicActive(isActive);
//   };

//   const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//     setSelectedLanguage(language);
    
//     if (currentChat && currentChat.messages.length > 0) {
//       try {
//         setIsGenerating(true);
        
//         const translatedMessages = await Promise.all(
//           currentChat.messages.map(async (msg) => {
//             const translatedContent = await translateText(msg.content, language.name);
//             return {
//               ...msg,
//               content: translatedContent
//             };
//           })
//         );
        
//         const updatedChat = {
//           ...currentChat,
//           messages: translatedMessages
//         };
        
//         setChats(prev => prev.map(chat => 
//           chat.id === currentChat.id ? updatedChat : chat
//         ));
//         setCurrentChat(updatedChat);
//         setMessages(updatedChat.messages);
//       } catch (error) {
//         console.error('Translation failed:', error);
//       } finally {
//         setIsGenerating(false);
//       }
//     }
//   };

//   const parseMessageContent = (content: string) => {
//     const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//     const parts = [];
//     let lastIndex = 0;
//     let match;

//     while ((match = codeBlockRegex.exec(content)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push({
//           type: 'text',
//           content: content.slice(lastIndex, match.index)
//         });
//       }

//       parts.push({
//         type: 'code',
//         language: match[1] || 'plaintext',
//         content: match[2].trim()
//       });

//       lastIndex = match.index + match[0].length;
//     }
    

//     if (lastIndex < content.length) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex)
//       });
//     }

//     return parts.length > 0 ? parts : [{ type: 'text', content }];
//   };

//   const handleCodeClick = (content: string, language: string) => {
//     setSelectedCode({ content, language });
//     setIsInfoPanelOpen(true);
//   };

//   const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     const textarea = e.target;
//     const value = textarea.value;
    
//     if (!value.trim()) {
//       textarea.style.height = '56px';
//     } else {
//       textarea.style.height = 'inherit';
//       textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//     }
    
//     setInputText(value);
//   };

//   const handleCodeBlockClick = (content: string, language: string) => {
//     setSelectedCodeBlock({
//       content: content.trim(),
//       language: language || 'plaintext'
//     });
//     setIsCodeSliderOpen(true);
//   };

//   const handleModelSelect = (modelName: string) => {
//     setSelectedModel(modelName);
//     setIsModelDropdownOpen(false);
//   };

//   const ModelDropdown = ({ onSelect }: { onSelect: (model: string) => void }) => {
//     return (
//       <div 
//         className={`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-n z-[9999] ${
//           isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
//         }`}
//       >
//         {models.map((model) => (
//           <button
//             key={model.id}
//             onClick={() => onSelect(model.name)}
//             className={`w-full flex items-center px-4 py-3 text-left ${
//               isDarkMode
//                 ? 'hover:bg-gray-600 text-gray-200'
//                 : 'hover:bg-gray-50 text-gray-700'
//             } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}
//           >
//             <i className={`fas ${model.icon} mr-3 ${
//               selectedModel === model.name ? 'text-blue-500' : 'text-gray-400'
//             }`}></i>
//             <span>{model.name}</span>
//           </button>
//         ))}
//       </div>
//     );
//   };

//   const handleActionCapsuleClick = (action: string, suggestion?: string) => {
//     let promptText = '';
    
//     if (suggestion) {
//       // If a suggestion was clicked, use it directly
//       switch (action) {
//         case 'explain':
//           promptText = `${suggestion}: `;
//           break;
//         case 'summarize':
//           promptText = `${suggestion} for: `;
//           break;
//         case 'translate':
//           promptText = `${suggestion}: `;
//           break;
//         case 'improve':
//           promptText = `${suggestion}: `;
//           break;
//         case 'code':
//           promptText = `${suggestion}: `;
//           break;
//       }
//     } else {
//       // Default prompts when capsule is clicked
//       switch (action) {
//         case 'explain':
//           promptText = 'Please explain this in detail: ';
//           break;
//         case 'summarize':
//           promptText = 'Please provide a summary of: ';
//           break;
//         case 'translate':
//           promptText = 'Please translate this to English: ';
//           break;
//         case 'improve':
//           promptText = 'Please improve the writing of this text: ';
//           break;
//         case 'code':
//           promptText = 'Please generate code for: ';
//           break;
//       }
//     }
//     setInputText(promptText);
//   };

//   // Update the handlers for toggling sections
//   const handleToggleStarredChats = () => {
//     if (!isShowingStarredChats) {
//       setIsShowingChats(false); // Hide recent chats when showing starred
//     }
//     setIsShowingStarredChats(!isShowingStarredChats);
//   };

//   const handleToggleRecentChats = () => {
//     if (!isShowingChats) {
//       setIsShowingStarredChats(false); // Hide starred chats when showing recent
//     }
//     setIsShowingChats(!isShowingChats);
//   };

//   // Add new handler for project click
//   const handleProjectClick = (project: Project) => {
//     setSelectedProject(project);
//     setIsProjectChatListOpen(true);
//   };

//   // Modify handleAddProject to include name editing
//   const handleAddProject = () => {
//     const newProject: Project = {
//       id: `proj_${Date.now()}`,
//       name: `New Project`,
//       createdAt: new Date(),
//       chats: [],
//       isEditing: true // Start in editing mode
//     };
//     setProjects(prev => [newProject, ...prev]);
//   };

//   // Add new handlers for project management
//   const handleProjectNameEdit = (projectId: string, newName: string) => {
//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return {
//           ...project,
//           name: newName,
//           isEditing: false
//         };
//       }
//       return project;
//     }));
//   };

//   const handleProjectNameEditStart = (projectId: string) => {
//     setProjects(prev => prev.map(project => {
//       if (project.id === projectId) {
//         return { ...project, isEditing: true };
//       }
//       return { ...project, isEditing: false };
//     }));
//   };

// // Update handleNewProjectChat
// const handleNewProjectChat = (projectId: string) => {
//   const newChat: Chat = {
//     id: Date.now().toString(),
//     title: 'New Chat', // This will be updated with first message
//     createdAt: new Date(),
//     messages: [],
//     projectId: projectId,
//     isEditing: false // Don't start in editing mode since title will update automatically
//   };

//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: [newChat, ...project.chats]
//       };
//     }
//     return project;
//   }));

//   setCurrentChat(newChat);
//   setMessages([]);
//   setIsNewChatStarted(true);
//   setShowGreeting(false);
//   setIsChatActive(true);
// };

// // Add project chat management functions
// const handleProjectChatTitleEdit = (projectId: string, chatId: string, newTitle: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => {
//           if (chat.id === chatId) {
//             const updatedChat = { ...chat, title: newTitle, isEditing: false };
//             if (currentChat?.id === chatId) {
//               setCurrentChat(updatedChat);
//             }
//             return updatedChat;
//           }
//           return chat;
//         })
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectChatTitleEditStart = (projectId: string, chatId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => ({
//           ...chat,
//           isEditing: chat.id === chatId
//         }))
//       };
//     }
//     return project;
//   }));
// };

// // Add handler for toggling project collapse
// const handleProjectCollapse = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setCollapsedProjects(prev => ({
//     ...prev,
//     [projectId]: !prev[projectId]
//   }));
// };

// // Add new handler for project deletion
// const handleConfirmDelete = () => {
//   const { itemId, itemType, projectId } = deleteConfirmation;
  
//   if (itemType === 'project') {
//     // Handle project deletion
//     if (currentChat?.projectId === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//     setProjects(prev => prev.filter(project => project.id !== itemId));
//   } else {
//     // Handle chat deletion
//     if (projectId) {
//       // Delete project chat
//       setProjects(prev => prev.map(project => {
//         if (project.id === projectId) {
//           return {
//             ...project,
//             chats: project.chats.filter(chat => chat.id !== itemId)
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Delete regular chat
//       setChats(prev => prev.filter(chat => chat.id !== itemId));
//     }

//     if (currentChat?.id === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   }
  
//   setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
// };

//   return (
//     <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//       <div className={`flex h-screen overflow-hidden ${
//         isDarkMode 
//           ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100' 
//           : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//       }`}>
//         {/* Fixed brand text container */}
//         <div className={`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${
//           isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//         }`}>
//           <span 
//             onClick={handleHomeClick}  // Add this line
//             className="text-3xl font-medium cursor-pointer bg-clip-text text-transparent hover:opacity-80 transition-opacity" // Add hover effect
//             style={{
//               background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//               WebkitBackgroundClip: 'text',
//               textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//               WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//               letterSpacing: '0.5px'
//             }}
//           >
//             Hind AI
//           </span>
//         </div>

//         {/* Sidebar */}
//         <div 
//           className={`${
//             isSidebarOpen ? 'w-72' : 'w-16'
//           } fixed md:relative h-full transition-all duration-300 ease-in-out ${
//             isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//           } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`}
//         >
//           {/* Top section - only toggle button */}
//           <div className="flex items-center p-4">
//             <button 
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
//               className="text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//             >
//               <i className={`fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}`}></i>
//             </button>
//           </div>

//           {/* Main content with icons-only when collapsed */}
//           <nav className="flex-1 px-2">
//             <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
//               onClick={handleNewChat}
//             >
//               <i className="fa-solid fa-plus w-8"></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 New Chat
//               </span>
//             </button>

//             {/* Search section */}
//             <div className="px-2 mb-4">
//               {isSidebarOpen ? (
//                 <div className="relative">
//                   <input
//                     type="search"
//                     placeholder="Search conversations..."
//                     className={`w-full pl-9 pr-4 py-2 ${
//                       isDarkMode 
//                         ? 'bg-gray-700 text-gray-200 placeholder-gray-400' 
//                         : 'bg-gray-100 text-gray-800'
//                     } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//                   />
//                   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" ></i>
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => setIsSidebarOpen(true)}
//                   className={`w-full p-2 rounded-lg ${
//                     isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                   }`}
//                 >
//                   <i className="fa-solid fa-magnifying-glass" title="Search"></i>
//                 </button>
//               )}
//             </div>

//             {/* Projects Section */}
//             <div className="mb-2 pl-4"> {/* Increased pl-2 to pl-4 */}
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <div className="flex items-center flex-1">
//                   <i 
//                     className="fa-solid fa-folder text-blue-400 w-8" 
//                     title="Projects"
//                     onClick={() => setIsProjectListOpen(true)}
//                     style={{ cursor: 'pointer' }}
//                   ></i>
//                   {isSidebarOpen && (
//                     <div className="flex items-center flex-1">
//                       <span 
//                         className="text-sm font-medium ml-1"
//                         onClick={() => setIsProjectListOpen(true)}
//                         style={{ cursor: 'pointer' }}
//                       >
//                         Projects
//                       </span>
//                       <button
//                         onClick={handleAddProject}
//                         className={`ml-4 p-2 rounded-lg transition-colors ${  // Increased ml-3 to ml-4 and p-1.5 to p-2
//                           isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//                         }`}
//                       >
//                         <i className="fa-solid fa-plus text-xs"></i>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//               {isSidebarOpen && projects.length > 0 && (
//                 <div className="space-y-1 ml-3"> {/* Increased ml-2 to ml-3 */}
//                   {projects.map(project => (
//                     <div
//                       key={project.id}
//                       className={`group px-2 py-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center flex-1 min-w-0">
//                           <div className="flex items-center">
//                             <button
//                               onClick={(e) => handleProjectCollapse(project.id, e)}
//                               className={`mr-1 p-1 rounded-lg transition-transform duration-200 ${  // Added mr-1 for right margin
//                                 isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                               }`}
//                               style={{ width: '20px' }}  // Fixed width for consistent spacing
//                             >
//                               <i className={`fas fa-chevron-right text-xs text-gray-400 transform transition-transform duration-200 ${
//                                 !collapsedProjects[project.id] ? 'rotate-90' : ''
//                               }`}></i>
//                             </button>
//                             <i className="fa-regular fa-folder-open w-8 text-blue-400 ml-1"></i>  {/* Added ml-1 */}
//                           </div>
//                           {project.isEditing ? (
//                             <input
//                               type="text"
//                               defaultValue={project.name}
//                               autoFocus
//                               onBlur={(e) => handleProjectNameEdit(project.id, e.target.value)}
//                               onKeyDown={(e) => {
//                                 if (e.key === 'Enter') {
//                                   handleProjectNameEdit(project.id, e.currentTarget.value);
//                                 }
//                               }}
//                               className={`text-sm px-2 py-1 rounded flex-1 mr-2 ${
//                                 isDarkMode 
//                                   ? 'bg-gray-600 text-gray-200' 
//                                   : 'bg-gray-100 text-gray-800'
//                               }`}
//                             />
//                           ) : (
//                             <span 
//                               className="text-sm truncate flex-1"
//                               onDoubleClick={() => handleProjectNameEditStart(project.id)}
//                             >
//                               {project.name}
//                             </span>
//                           )}
//                         </div>
//                         <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100">
//                           <button
//                             onClick={() => handleNewProjectChat(project.id)}
//                             className={`p-1 rounded-full ${
//                               isDarkMode 
//                                 ? 'text-gray-400 hover:text-blue-400' 
//                                 : 'text-gray-500 hover:text-blue-500'
//                             }`}
//                           >
//                             <i className="fas fa-plus-circle"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteProject(project.id, e)}
//                             className={`p-1 rounded-full ${
//                               isDarkMode
//                                 ? 'text-gray-400 hover:text-red-400'
//                                 : 'text-gray-500 hover:text-red-500'
//                             }`}
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         </div>
//                       </div>
//                       {/* Project Chats */}
//                       {project.chats.length > 0 && !collapsedProjects[project.id] && (
//                         <div className="ml-8 mt-2 space-y-1">
//                           {project.chats.map(chat => (
//                             <div
//                               key={chat.id}
//                               onClick={() => handleChatSelect(chat)}
//                               className={`group flex items-center justify-between px-2 py-1 rounded ${
//                                 isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
//                               }`}
//                             >
//                               <div className="flex items-center space-x-2 flex-1 min-w-0">
//                                 <i className="fas fa-comment-alt text-xs text-gray-400"></i>
//                                 {chat.isEditing ? (
//                                   <input
//                                     type="text"
//                                     defaultValue={chat.title}
//                                     autoFocus
//                                     onClick={e => e.stopPropagation()}
//                                     onBlur={(e) => handleProjectChatTitleEdit(project.id, chat.id, e.target.value)}
//                                     onKeyDown={(e) => {
//                                       if (e.key === 'Enter') {
//                                         handleProjectChatTitleEdit(project.id, chat.id, e.currentTarget.value);
//                                       }
//                                     }}
//                                     className={`text-sm px-2 py-1 rounded flex-1 ${
//                                       isDarkMode 
//                                         ? 'bg-gray-700 text-gray-200' 
//                                         : 'bg-gray-100 text-gray-800'
//                                     }`}
//                                   />
//                                 ) : (
//                                   <span 
//                                     className="text-sm truncate"
//                                     onDoubleClick={(e) => {
//                                       e.stopPropagation();
//                                       handleProjectChatTitleEditStart(project.id, chat.id);
//                                     }}
//                                   >
//                                     {chat.title}
//                                   </span>
//                                 )}
//                               </div>
//                               <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100">
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleProjectChatTitleEditStart(project.id, chat.id);
//                                   }}
//                                   className={`p-1 rounded-full ${
//                                     isDarkMode
//                                       ? 'text-gray-400 hover:text-blue-400'
//                                       : 'text-gray-500 hover:text-blue-500'
//                                   }`}
//                                 >
//                                   <i className="fas fa-edit text-xs"></i>
//                                 </button>
//                                 <button
//                                   onClick={(e) => handleDeleteProjectChat(project.id, chat.id, e)}
//                                   className={`p-1 rounded-full ${
//                                     isDarkMode
//                                       ? 'text-gray-400 hover:text-red-400'
//                                       : 'text-gray-500 hover:text-red-500'
//                                   }`}
//                                 >
//                                   <i className="fas fa-trash text-xs"></i>
//                                 </button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Starred Chats Section */}
//             <div className="mb-4">
//               <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//                 <button
//                   onClick={() => {
//                     if (!isSidebarOpen) {
//                       setChatListInitialTab('starred');
//                       setIsChatListOpen(true);
//                     }
//                   }}
//                   className="relative"
//                 >
//                   <i className="fa-solid fa-star text-yellow-500 w-8" title="Starred chats"></i>
//                 </button>
//                 {isSidebarOpen && <span className="text-sm font-medium">Starred Chats</span>}
//               </div>
//               <div className="space-y-1">
//                 {chats
//                   .filter(chat => chat.isStarred)
//                   .map((chat) => (
//                     <div
//                       key={`starred_${chat.id}`}
//                       className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                         isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                       }`}
//                       onClick={() => handleChatSelect(chat)}
//                     >
//                       <i className="fas fa-comment-alt w-8 text-yellow-500/80"></i>
//                       {isSidebarOpen && (
//                         <>
//                           <span className="ml-2 truncate flex-1">{chat.title}</span>
//                           <button
//                             onClick={(e) => handleStarChat(chat.id, e)}
//                             className="ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//                           >
//                             <i className="fas fa-star text-yellow-500"></i>
//                           </button>
//                           <button
//                             onClick={(e) => handleDeleteChat(chat.id, e)}
//                             className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                               isDarkMode
//                                 ? 'text-gray-400 hover:text-red-400'
//                                 : 'text-gray-500 hover:text-red-500'
//                             }`}
//                           >
//                             <i className="fas fa-trash"></i>
//                           </button>
//                         </>
//                       )}
//                     </div>
//                   ))}
//               </div>
//             </div>

//             {/* All Chats Section */}
//             <div className={`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//               <button
//                 onClick={() => {
//                   if (!isSidebarOpen) {
//                     setChatListInitialTab('all');
//                     setIsChatListOpen(true);
//                   }
//                 }}
//                 className="relative"
//               >
//                 <i className="fa-solid fa-comments w-8"title="All Chats"></i>
//               </button>
//               {isSidebarOpen && <span className="text-sm font-medium">All Chats</span>}
//             </div>
            
//             {/* Chat list section */}
//             <div className="space-y-1">
//               {chats.filter(chat => !chat.isStarred).map((chat) => (
//                 <div
//                   key={`all_${chat.id}`}
//                   className={`group flex items-center p-2 rounded-lg cursor-pointer ${
//                     isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//                   }`}
//                   onClick={() => handleChatSelect(chat)}
//                 >
//                   <i className="fa-regular fa-comment w-8"></i>
//                   {isSidebarOpen && (
//                     <>
//                       {chat.isEditing ? (
//                         <input
//                           type="text"
//                           defaultValue={chat.title}
//                           autoFocus
//                           onClick={e => e.stopPropagation()}
//                           onBlur={(e) => handleChatTitleEdit(chat.id, e.target.value)}
//                           onKeyDown={(e) => {
//                             if (e.key === 'Enter') {
//                               handleChatTitleEdit(chat.id, e.currentTarget.value);
//                             }
//                           }}
//                           className={`text-sm px-2 py-1 rounded flex-1 mr-2 ${
//                             isDarkMode 
//                               ? 'bg-gray-600 text-gray-200' 
//                               : 'bg-gray-100 text-gray-800'
//                           }`}
//                         />
//                       ) : (
//                         <span 
//                           className="ml-2 truncate flex-1"
//                           onDoubleClick={(e) => {
//                             e.stopPropagation();
//                             handleChatTitleEditStart(chat.id);
//                           }}
//                         >
//                           {chat.title}
//                         </span>
//                       )}
//                       <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleChatTitleEditStart(chat.id);
//                           }}
//                           className={`p-1 rounded-full transition-colors ${
//                             isDarkMode
//                               ? 'text-gray-400 hover:text-blue-400'
//                               : 'text-gray-500 hover:text-blue-500'
//                           }`}
//                         >
//                           <i className="fas fa-edit"></i>
//                         </button>
//                         <button
//                           onClick={(e) => handleStarChat(chat.id, e)}
//                           className={`p-1 rounded-full transition-colors ${
//                             chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//                           }`}
//                         >
//                           <i className="fas fa-star"></i>
//                         </button>
//                         <button
//                           onClick={(e) => handleDeleteChat(chat.id, e)}
//                           className="p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//                         >
//                           <i className="fas fa-trash"></i>
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </nav>

//           {/* Auth section at bottom */}
//           <div className="mt-auto p-2 border-t border-gray-700/50">
//             {isAuthenticated ? (
//               <div className="space-y-1">
//                 <div className="flex items-center p-2 rounded-lg">
//                   <i className="fa-solid fa-user w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     {userProfile?.name}
//                   </span>
//                 </div>
//                 <button 
//                   onClick={handleLogout}
//                   className="w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//                 >
//                   <i className="fa-solid fa-right-from-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Logout
//                   </span>
//                 </button>
//               </div>
//             ) : (
//               <div className="space-y-1">
//                 <button className="w-full flex items-center p-2" onClick={() => setIsLoginModalOpen(true)}>
//                   <i className="fa-solid fa-right-to-bracket w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Login
//                   </span>
//                 </button>
//                 <button 
//                   className="w-full flex items-center p-2 text-indigo-500"
//                   onClick={() => {
//                     setIsLogin(false);
//                     setIsLoginModalOpen(true);
//                   }}
//                 >
//                   <i className="fa-solid fa-user-plus w-8"></i>
//                   <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                     Sign Up
//                   </span>
//                 </button>
//               </div>
//             )}
            
//             <button 
//               onClick={toggleDarkMode}
//               className="w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//             >
//               <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8`}></i>
//               <span className={`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//                 {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="flex-1 flex flex-col relative pt-16 pl-16">
//           <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
//             isCodeSliderOpen ? 'lg:pr-[50%]' : ''
//           }`}>
//             {/* Main chat section that shifts left when slider opens */}
//             <div className={`
//               w-full transition-all duration-300 
//               ${isCodeSliderOpen 
//                 ? 'lg:max-w-full lg:pr-60' // Add right padding when slider is open
//                 : 'max-w-3xl mx-auto'
//               }
//               relative flex flex-col h-full pb-[170px] // Add these styles
//             `}>
//               {/* Chat content */}
//               <div className={`w-full ${!isCodeSliderOpen ? 'max-w-3xl mx-auto' : ''} ${
//                 hasMessages || isNewChatStarted ? 'flex-1' : ''
//               }`}>
//                 {showGreeting && !hasMessages && !isNewChatStarted ? (
//                   <div className="flex justify-center items-center min-h-[200px]">
//                     <Greeting />
//                   </div>
//                 ) : (
//                   <div className="flex-1 flex flex-col justify-end">
//                     <div className="flex-1 space-y-4 py-4 px-4 mb-40"> 
//                       {messages.map((message, index) => (
//                         <div
//                           key={`${message.id}_${index}`}
//                           className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
//                           style={{
//                             animationDelay: `${index * 100}ms`,
//                           }}
//                         >
//                           <div
//                             className={`max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${
//                               message.type === 'user'
//                                 ? isDarkMode
//                                   ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//                                   : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//                                 : isDarkMode
//                                   ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//                                   : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//                             }`}
//                             style={{
//                               backdropFilter: 'blur(8px)',
//                             }}
//                           >
//                             <div className="flex items-center justify-between mb-1">
//                               <div className="flex items-center">
//                                 <i className={`fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2`}></i>
//                                 <span className="text-sm opacity-75">
//                                   {new Date(message.timestamp).toLocaleTimeString()}
//                                 </span>
//                               </div>
//                               {renderMessageStatus(message.status)}
//                             </div>
                            
//                             {message.file && (
//                               <div className="mb-2">
//                                 {message.file.type.startsWith('image/') ? (
//                                   <ImagePreview 
//                                     imageUrl={message.file.url}
//                                     isDarkMode={isDarkMode}
//                                     fileName={message.file.name}
//                                   />
//                                 ) : message.file.type === 'application/pdf' ? (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file-pdf text-2xl text-red-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">PDF Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-external-link-alt"></i>
//                                     </a>
//                                   </div>
//                                 ) : (
//                                   <div className="flex items-center space-x-2 bg-black/20 rounded-lg p-3">
//                                     <i className="fas fa-file text-2xl text-blue-400"></i>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="truncate">{message.file.name}</div>
//                                       <div className="text-sm opacity-75">Document</div>
//                                     </div>
//                                     <a 
//                                       href={message.file.url} 
//                                       target="_blank" 
//                                       rel="noopener noreferrer"
//                                       className="p-2 hover:bg-white/10 rounded-full transition-colors"
//                                     >
//                                       <i className="fas fa-download"></i>
//                                     </a>
//                                   </div>
//                                 )}
//                               </div>
//                             )}
                            
//                             <div className="space-y-4">
//                               {parseMessageContent(message.content).map((part, index) => (
//                                 part.type === 'code' ? (
//                                   <div 
//                                     key={index}
//                                     onClick={() => handleCodeBlockClick(part.content, part.language)}
//                                     className={`cursor-pointer group rounded-lg overflow-hidden ${
//                                       isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//                                     }`}
//                                   >
//                                     <div className={`flex items-center justify-between px-4 py-2 ${
//                                       isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//                                     }`}>
//                                       <div className="flex items-center space-x-2">
//                                         <i className="fas fa-code"></i>
//                                         <span className={`text-sm font-medium ${
//                                           isDarkMode ? 'text-gray-300' : 'text-gray-700'
//                                         }`}>
//                                           {part.language}
//                                         </span>
//                                       </div>
//                                       <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${
//                                         isDarkMode ? 'text-gray-400' : 'text-gray-600'
//                                       }`}>
//                                         <i className="fas fa-expand-alt"></i>
//                                       </div>
//                                     </div>
//                                     <div className="p-4 max-h-60 overflow-hidden relative">
//                                       <pre className="overflow-x-auto">
//                                         <code className={`language-${part.language} ${
//                                           isDarkMode ? 'text-gray-300' : 'text-gray-800'
//                                         }`}>
//                                           {part.content}
//                                         </code>
//                                       </pre>
//                                       <div className={`absolute bottom-0 inset-x-0 h-8 ${
//                                         isDarkMode 
//                                           ? 'bg-gradient-to-t from-gray-800' 
//                                           : 'bg-gradient-to-t from-gray-50'
//                                       }`}></div>
//                                     </div>
//                                   </div>
//                                 ) : (
//                                   <p key={index} className="text-base leading-relaxed whitespace-pre-wrap">
//                                     {part.content}
//                                   </p>
//                                 )
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                       <div ref={messagesEndRef} />  
//                     </div>
//                   </div>
//                 )}

//                 {/* Chat input section */}
//                 <div className={`
//                   fixed bottom-0 left-0 right-0 
//                   ${hasMessages || isNewChatStarted ? 'lg:left-16' : ''}
//                   bg-gradient-to-t ${isDarkMode ? 'from-gray-900' : 'from-white'}
//                   pt-4 pb-6 px-4
//                   ${isCodeSliderOpen ? 'lg:w-[45%] lg:pr-40' : ''}
//                 `}>
//                   <div className={`
//                     max-w-4xl
//                     ${showGreeting 
//                       ? 'mx-auto'
//                       : isCodeSliderOpen 
//                         ? 'lg:ml-0' // Remove margin when slider is open
//                         : 'mx-auto'
//                     }
//                   `}>
//                     <div className={`relative rounded-[20px] shadow-lg chat-glow transition-colors ${
//                       isDarkMode ? 'bg-gray-800' : 'bg-white'
//                     }`}>
//                       {activeFilePreview && (
//                         <div className={`w-full px-4 py-3 ${
//                           isDarkMode 
//                             ? 'bg-gray-700/30' 
//                             : 'bg-gray-50/50'
//                         }`}>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-3">
//                               <i className={`fas ${
//                                 activeFilePreview.type.startsWith('image/')
//                                   ? 'fa-image text-green-400'
//                                   : activeFilePreview.type === 'application/pdf'
//                                     ? 'fa-file-pdf text-red-400'
//                                     : 'fa-file text-blue-400'
//                               } text-lg`}></i>
//                               <div className="flex flex-col">
//                                 <span className="text-sm font-medium truncate max-w-[200px]">
//                                   {activeFilePreview.name}
//                                 </span>
//                                 <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                   Ready to send
//                                 </span>
//                               </div>
//                             </div>
//                             <button 
//                               onClick={() => setActiveFilePreview(null)}
//                               className={`p-1.5 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'hover:bg-gray-600 text-gray-400' 
//                                   : 'hover:bg-gray-200 text-gray-500'
//                               }`}
//                             >
//                               <i className="fas fa-times"></i>
//                             </button>
//                           </div>
//                         </div>
//                       )}

//                       {messages.length > 0 && messages[messages.length - 1].file && (
//                         <div className={`w-full px-4 py-2 ${
//                           isDarkMode 
//                             ? 'bg-gray-700/30' 
//                             : 'bg-gray-50/50'
//                         }`}>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2">
//                               <i className={`fas ${
//                                 messages[messages.length - 1].file?.type.startsWith('image/')
//                                   ? 'fa-image text-green-400'
//                                   : messages[messages.length - 1].file?.type === 'application/pdf'
//                                     ? 'fa-file-pdf text-red-400'
//                                     : 'fa-file text-blue-400'
//                               }`}></i>
//                               <span className="text-sm truncate max-w-[200px]">
//                                 {messages[messages.length - 1].file?.name}
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                                 File attached
//                               </span>
//                               <i className="fas fa-check text-green-400"></i>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       <div className="relative flex flex-col">
//                         <div className="min-h-[56px] max-h-[200px] overflow-hidden">
//                           <textarea
//                             className={`w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${
//                               isDarkMode 
//                                 ? 'bg-gray-800 text-gray-200 placeholder-gray-400' 
//                                 : 'bg-white text-gray-800 placeholder-gray-500'
//                             }`}
//                             value={inputText}
//                             onChange={handleTextAreaResize}
//                             placeholder={`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
//                             onKeyDown={(e) => {
//                               if (e.key === 'Enter' && !e.shiftKey) {
//                                 e.preventDefault();
//                                 if (activeFilePreview || inputText.trim()) {
//                                   handleSendMessage();
//                                 }
//                               }
//                             }}
//                             style={{
//                               minHeight: '56px',
//                               maxHeight: '200px'
//                             }}
//                           />
//                         </div>

//                         <div className={`flex items-center justify-between p-4 rounded-b-[20px] ${
//                           isDarkMode ? 'bg-gray-800' : 'bg-white'
//                         }`}>
//                           <div className="flex items-center space-x-2">
//                           <div className="flex items-center space-x-2">
//                           {/* Model container */}
//                              <ModelSelector isDarkMode={isDarkMode} onModelChange={setSelectedModel} models={models} />

//                              {/* Language container */}
//                                <div className="relative inline-block">
//                                    <LanguageSelector
//                                      isDarkMode={isDarkMode}
//                                       onLanguageChange={handleLanguageChange}
//                                            selectedLanguage={selectedLanguage}
//                                          className="z-[9999]"
//                                        dropdownPosition="absolute"
//                                     />
//                                 </div>

//                                     {/* Search button */}
//                                        <button
//                                      className="flex items-center space-x-2  hover:text-gray-700"
//                                title="Search the web"
//                                   >
//                                   <GlobeIcon className="w-5 h-5" /> {/* Replace with actual icon */}
//                           <span>Search</span>
//                             </button>
//                                </div>
                            
//                           </div>
                          
//                           <div className="flex items-center space-x-2">
//                             <button
//                               className={`p-2 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'text-gray-400 hover:text-blue-400' 
//                                   : 'text-gray-400 hover:text-indigo-600'
//                               }`}
//                               onClick={() => setIsUploadModalOpen(true)}
//                             >
//                               <i className="fas fa-paperclip"></i>
//                             </button>
                                
//                             <button
//                               className={`p-2 rounded-full transition-colors ${
//                                 isDarkMode 
//                                   ? 'text-gray-400 hover:text-blue-400' 
//                                   : 'text-gray-400 hover:text-indigo-600'
//                               }`}
//                               onClick={() => setIsMicActive(!isMicActive)}
//                             >
//                               <i className={`fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
//                             </button>
                            
//                             <button
//                               className={`rounded-full p-2.5 transition-colors ${
//                                 isDarkMode 
//                                   ? 'bg-blue-600 hover:bg-blue-700' 
//                                   : 'bg-indigo-600 hover:bg-indigo-700'
//                               } text-white`}
//                               onClick={handleSendMessage}
//                             >
//                               <i className="fas fa-paper-plane"></i>
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     {!hasMessages && !isNewChatStarted && (
//                       <ActionCapsules 
//                         isDarkMode={isDarkMode}
//                         onActionClick={handleActionCapsuleClick}
//                       />
//                     )}
//                     {!hasMessages && !isNewChatStarted && (
//                       <div className="mt-4">
//                         <div className="grid grid-cols-2 gap-4">
//                           {/* Starred Chats Section */}
//                           <div>
//                             <div className="flex items-center justify-between mb-3">
//                               <div className="flex items-center">
//                                 <i className="fas fa-star mr-2 text-yellow-500"></i>
//                                 <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                                   Starred chats
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <button
//                                   className={`px-2 py-1 text-xs rounded-full transition-colors ${
//                                     isDarkMode 
//                                       ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                                       : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                                   }`}
//                                   onClick={handleToggleStarredChats}
//                                 >
//                                   {isShowingStarredChats ? 'Hide' : 'Show'}
//                                 </button>
//                                 {isShowingStarredChats && chats.filter(chat => chat.isStarred).length > 3 && (
//                                   <button
//                                     onClick={() => {
//                                       setChatListInitialTab('starred');
//                                       setIsChatListOpen(true);
//                                     }}
//                                     className={`text-xs ${
//                                       isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//                                     }`}
//                                   >
//                                     View all
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
                            
//                             <div className={`transition-all duration-300 ${
//                               isShowingStarredChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//                             }`}>
//                               {isShowingStarredChats && (
//                                 <div className={`${
//                                   isDarkMode 
//                                     ? 'bg-gray-800/50 shadow-gray-900/20' 
//                                     : 'bg-white/50 shadow-sm'
//                                 } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`}>
//                                   {chats.filter(chat => chat.isStarred).length > 0 ? (
//                                     <ul className="space-y-1.5">
//                                       {chats
//                                         .filter(chat => chat.isStarred)
//                                         .slice(0, showAllStarredChats ? undefined : 3)
//                                         .map(chat => (
//                                           <li
//                                             key={`starred_${chat.id}`}
//                                             className={`group ${
//                                               isDarkMode 
//                                                 ? 'hover:bg-gray-700/50 hover:border-gray-600' 
//                                                 : 'hover:bg-gray-50 hover:border-gray-100'
//                                             } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                             onClick={() => handleChatSelect(chat)}
//                                           >
//                                             <div className="flex items-center space-x-2 min-w-0">
//                                               <i className="fas fa-comment-alt text-gray-400 flex-shrink-0"></i>
//                                               <span className="truncate">{chat.title}</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                               <i className="fas fa-star text-yellow-500 flex-shrink-0"></i>
//                                               <button
//                                                 onClick={(e) => handleDeleteChat(chat.id, e)}
//                                                 className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                                                   isDarkMode
//                                                     ? 'text-gray-400 hover:text-red-400'
//                                                     : 'text-gray-500 hover:text-red-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-trash"></i>
//                                               </button>
//                                             </div>
//                                           </li>
//                                         ))}
//                                     </ul>
//                                   ) : (
//                                     <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                       No starred chats yet
//                                     </p>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </div>

//                           {/* Recent Chats Section */}
//                           <div>
//                             <div className="flex items-center justify-between mb-3">
//                               <div className="flex items-center">
//                                 <i className="fas fa-history mr-2 text-gray-400"></i>
//                                 <span className={`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//                                   Recent chats
//                                 </span>
//                               </div>
//                               <div className="flex items-center space-x-2">
//                                 <button
//                                   className={`px-2 py-1 text-xs rounded-full transition-colors ${
//                                     isDarkMode 
//                                       ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
//                                       : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//                                   }`}
//                                   onClick={handleToggleRecentChats}
//                                 >
//                                   {isShowingChats ? 'Hide' : 'Show'}
//                                 </button>
//                                 {isShowingChats && chats.length > 3 && (
//                                   <button
//                                     onClick={() => {
//                                       setChatListInitialTab('all');
//                                       setIsChatListOpen(true);
//                                     }}
//                                     className={`text-xs ${
//                                       isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//                                     }`}
//                                   >
//                                     View all
//                                   </button>
//                                 )}
//                               </div>
//                             </div>
                            
//                             <div className={`transition-all duration-300 ${
//                               isShowingChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//                             }`}>
//                               {isShowingChats && (
//                                 <div className={`${
//                                   isDarkMode 
//                                     ? 'bg-gray-800/50 shadow-gray-900/20' 
//                                     : 'bg-white/50 shadow-sm'
//                                 } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`}>
//                                   {chats.length > 0 ? (
//                                     <ul className="space-y-1.5">
//                                       {chats
//                                         .slice(0, showAllChats ? undefined : 3)
//                                         .map(chat => (
//                                           <li
//                                             key={`recent_${chat.id}`}
//                                             className={`group ${
//                                               isDarkMode 
//                                                 ? 'hover:bg-gray-700/50 hover:border-gray-600' 
//                                                 : 'hover:bg-gray-50 hover:border-gray-100'
//                                             } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`}
//                                             onClick={() => handleChatSelect(chat)}
//                                           >
//                                             <div className="flex items-center space-x-2 min-w-0">
//                                               <i className="fas fa-comment-alt text-gray-400 flex-shrink-0"></i>
//                                               <span className="truncate">{chat.title}</span>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                               <button
//                                                 onClick={(e) => handleStarChat(chat.id, e)}
//                                                 className={`flex-shrink-0 transition-colors ${
//                                                   chat.isStarred
//                                                     ? 'text-yellow-500'
//                                                     : 'text-gray-400 hover:text-yellow-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-star"></i>
//                                               </button>
//                                               <button
//                                                 onClick={(e) => handleDeleteChat(chat.id, e)}
//                                                 className={`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${
//                                                   isDarkMode
//                                                     ? 'text-gray-400 hover:text-red-400'
//                                                     : 'text-gray-500 hover:text-red-500'
//                                                 }`}
//                                               >
//                                                 <i className="fas fa-trash"></i>
//                                               </button>
//                                             </div>
//                                           </li>
//                                         ))}
//                                     </ul>
//                                   ) : (
//                                     <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//                                       No recent chats available
//                                     </p>
//                                   )}
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Only show additional components when no messages */}
//               {!hasMessages && (
//                 <div className="max-w-[850px] mx-auto mt-6">
//                   {activeTab === 'analysis' && (
//                     <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6">
//                       <h3 className="text-xl font-medium mb-4">Conversation Analytics</h3>
//                       <div ref={chartRef} style={{ height: '300px' }}></div>
//                     </div>
//                   )}

                  
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <ChatListPopup
//         isOpen={isChatListOpen}
//         onClose={() => setIsChatListOpen(false)}
//         chats={chats}
//         onChatSelect={handleChatSelect}
//         onStarChat={handleStarChat}
//         onDeleteChat={handleDeleteChat}
//         isDarkMode={isDarkMode}
//         initialTab={chatListInitialTab}
//       />
//       <VoiceInput
//         isActive={isMicActive}
//         onTranscript={handleVoiceTranscript}
//         onStateChange={handleVoiceStateChange}
//         isDarkMode={isDarkMode}
//       />
//       <InfoPanel
//         isOpen={isInfoPanelOpen}
//         onClose={() => {
//           setIsInfoPanelOpen(false);
//           setSelectedCode(null);
//         }}
//         isDarkMode={isDarkMode}
//         code={selectedCode || undefined}
//       />
//       <CodeSlider
//         isOpen={isCodeSliderOpen}
//         onClose={() => {
//           setIsCodeSliderOpen(false);
//           setSelectedCodeBlock(null);
//         }}
//         code={selectedCodeBlock?.content || ''}
//         language={selectedCodeBlock?.language || 'plaintext'}
//         isDarkMode={isDarkMode}
//       />
//       <SlidingAuthForm
//         isOpen={isLoginModalOpen}
//         onClose={() => setIsLoginModalOpen(false)}
//         isLogin={isLogin}
//         onToggleMode={toggleAuthMode}
//         onSubmit={handleAuthSubmit}
//         loading={loading}
//         error={formError}
//         success={formSuccess}
//         isDarkMode={isDarkMode}
//       />
//       <DeleteConfirmationPopup
//         isOpen={deleteConfirmation.isOpen}
//         onClose={() => setDeleteConfirmation(prev => ({ ...prev, isOpen: false }))}
//         onConfirm={handleConfirmDelete}
//         isDarkMode={isDarkMode}
//         itemType={deleteConfirmation.itemType}
//       />
//       <ProjectListPopup
//         isOpen={isProjectListOpen}
//         onClose={() => setIsProjectListOpen(false)}
//         projects={projects}
//         onProjectSelect={(project) => {
//           setSelectedProject(project);
//           setIsProjectListOpen(false);
//         }}
//         onChatSelect={(chat) => {
//           handleChatSelect(chat);
//           setIsProjectListOpen(false);
//         }}
//         onDeleteProject={handleDeleteProject}
//         onDeleteProjectChat={handleDeleteProjectChat}
//         onEditProject={handleProjectNameEdit}
//         onEditProjectStart={handleProjectNameEditStart}
//         onNewProjectChat={(projectId) => {
//           handleNewProjectChat(projectId);
//           setIsProjectListOpen(false); // Close the popup after creating new chat
//         }}
//         isDarkMode={isDarkMode}
//       />
//       <div id="dropdown-root" className="fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;









// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';
// import ActionCapsules from './components/ActionCapsules';
// import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';
// import ModelSelector from './components/ModelSelector';
// import { Brain, MessageSquare, Bot, Sparkles, Code, Settings, Cpu, GlobeIcon } from "lucide-react";
// import ProjectListPopup from './components/ProjectListPopup';
// import ImagePreview from './components/ImagePreview';

// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// // Update the Chat interface to include project association
// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string; // Add this to track which project the chat belongs to
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// // Update Project interface
// interface Project {
//   id: string;
//   name: string;
//   createdAt: Date;
//   chats: Chat[];
//   isEditing?: boolean;
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   //const [selectedModel, setSelectedModel] = useState(models[0]);
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{
//     name: string;
//     email: string;
//   } | null>(null);
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');
//   const [isShowingStarredChats, setIsShowingStarredChats] = useState(true);
//   const [showAllStarredChats, setShowAllStarredChats] = useState(false);
//   const [isNewChatStarted, setIsNewChatStarted] = useState(false);
//   const modelButtonRef = useRef<HTMLButtonElement>(null);
//   const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
//   const [isShowingProjects, setIsShowingProjects] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isProjectListOpen, setIsProjectListOpen] = useState(false);


//   // Add new states
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isProjectChatListOpen, setIsProjectChatListOpen] = useState(false);
//   // Add new state for collapsed projects
//   const [collapsedProjects, setCollapsedProjects] = useState<{ [key: string]: boolean }>({});
//   // Add new states for delete confirmation
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{
//     isOpen: boolean;
//     itemId: string;
//     itemType: 'chat' | 'project';
//     projectId?: string;
//   }>({
//     isOpen: false,
//     itemId: '',
//     itemType: 'chat',
//   });

//   const models = [
//     { id: "gpt4", name: "GPT-4", icon: <Brain size={ 18} /> },
//   { id: "claude", name: "Claude 3", icon: <MessageSquare size={ 18 } /> },
// { id: "nextchat", name: "NextChat", icon: <Bot size={ 18 } /> },
// { id: "gemini", name: "Gemini", icon: <Sparkles size={ 18 } /> },
// { id: "llama3", name: "LLaMA 3", icon: <Code size={ 18 } /> },
// { id: "mistral", name: "Mistral", icon: <Settings size={ 18 } /> },
// { id: "palm2", name: "PaLM 2", icon: <Cpu size={ 18 } /> }, 
//   ];

// const toggleDarkMode = () => {
//   setIsDarkMode(prev => !prev);
// };

// const handleNewChat = () => {
//   // Create a new chat object
//   const newChat: Chat = {
//     id: Date.now().toString(),
//     title: 'New Chat',
//     createdAt: new Date(),
//     messages: [],
//     isEditing: false
//   };

//   // Add the new chat to the chats array
//   setChats(prev => [newChat, ...prev]);

//   // Reset all chat-related states
//   setCurrentChat(newChat);
//   setMessages([]);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(true);
//   setActiveChat(newChat.id);
//   setHasMessages(false);

//   // Clear any active states
//   setActiveFilePreview(null);
//   setIsGenerating(false);
//   setIsMicActive(false);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update handleChatSelect to handle initial message
// const handleChatSelect = (chat: Chat) => {
//   if (currentChat?.id === chat.id) return;

//   setCurrentChat(chat);
//   setMessages(chat.messages);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(false); // Reset new chat state

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Add chat title editing functionality
// const handleChatTitleEdit = (chatId: string, newTitle: string) => {
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       const updatedChat = { ...chat, title: newTitle, isEditing: false };
//       if (currentChat?.id === chatId) {
//         setCurrentChat(updatedChat);
//       }
//       return updatedChat;
//     }
//     return chat;
//   }));
// };

// const handleChatTitleEditStart = (chatId: string) => {
//   setChats(prev => prev.map(chat => ({
//     ...chat,
//     isEditing: chat.id === chatId
//   })));
// };

// const handleHomeClick = (e: React.MouseEvent) => {
//   e.preventDefault();
//   setShowGreeting(true);
//   setIsChatActive(false);
//   setMessages([]);
//   setActiveChat(null);
//   setIsNewChatStarted(false);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update delete handlers to show confirmation first
// const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: chatId,
//     itemType: 'chat'
//   });
// };

// const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: projectId,
//     itemType: 'project'
//   });
// };

// const handleDeleteProjectChat = (projectId: string, chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: chatId,
//     projectId: projectId,
//     itemType: 'chat'
//   });
// };

// const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       return { ...chat, isStarred: !chat.isStarred };
//     }
//     return chat;
//   }));
// };

// useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };
//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, []);

// useEffect(() => {
//   if (messagesEndRef.current) {
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   }
// }, [messages]);

// useEffect(() => {
//   if (chartRef.current && activeTab === 'analysis') {
//     const chart = echarts.init(chartRef.current);
//     const option = {
//       animation: false,
//       title: {
//         text: 'Message Analysis',
//         textStyle: { color: '#e5e7eb' }
//       },
//       tooltip: {
//         trigger: 'axis'
//       },
//       xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         axisLabel: { color: '#e5e7eb' }
//       },
//       yAxis: {
//         type: 'value',
//         axisLabel: { color: '#e5e7eb' }
//       },
//       series: [{
//         data: [120, 200, 150, 80, 70, 110, 130],
//         type: 'line',
//         smooth: true,
//         color: '#818cf8'
//       }]
//     };
//     chart.setOption(option);
//   }
// }, [activeTab]);

// useEffect(() => {
//   if (!isSidebarOpen && !isHovered) {
//     setIsSearchActive(false);
//   }
// }, [isSidebarOpen, isHovered]);

// const resetTextAreaHeight = () => {
//   const textarea = document.querySelector('textarea');
//   if (textarea) {
//     textarea.style.height = '56px';
//   }
// };

// const [isTransitioning, setIsTransitioning] = useState(false);

// // Update the handleSendMessage function
// const handleSendMessage = async () => {
//   if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;

//   setHasMessages(true);

//   if (isMicActive) {
//     setIsMicActive(false);
//   }

//   setIsCleanView(true);

//   let chatToUse = currentChat;

//   if (!chatToUse) {
//     // Create new chat with temporary title
//     chatToUse = {
//       id: Date.now().toString(),
//       title: 'New Chat', // We'll update this after sending the first message
//       createdAt: new Date(),
//       messages: []
//     };
//     setCurrentChat(chatToUse);
//     setChats(prev => [chatToUse, ...prev]);
//   }

//   setShowGreeting(false);
//   setIsChatActive(true);

//   const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//   const newMessage: Message = {
//     id: messageId,
//     content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//     type: 'user',
//     timestamp: new Date(),
//     status: 'sending',
//     file: activeFilePreview || undefined
//   };

//   try {
//     const updatedChat = {
//       ...chatToUse,
//       messages: [...chatToUse.messages, newMessage]
//     };

//     // Update chat title if this is the first message
//     if (updatedChat.messages.length === 1) {
//       // Truncate long messages and clean up multiline content
//       const cleanContent = inputText
//         .split('\n')[0] // Take only the first line
//         .trim()
//         .substring(0, 30); // Take first 30 characters

//       const newTitle = cleanContent + (cleanContent.length >= 30 ? '...' : '');
//       updatedChat.title = newTitle;
//     }

//     if (chatToUse.projectId) {
//       setProjects(prev => prev.map(project => {
//         if (project.id === chatToUse.projectId) {
//           return {
//             ...project,
//             chats: project.chats.map(chat =>
//               chat.id === chatToUse.id ? updatedChat : chat
//             )
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Update the chat in the main chats array
//       setChats(prev => prev.map(chat =>
//         chat.id === chatToUse.id ? updatedChat : chat
//       ));
//     }

//     setCurrentChat(updatedChat);
//     setMessages(updatedChat.messages);
//     setInputText('');
//     resetTextAreaHeight();
//     setIsGenerating(true);

//     // Add this helper function to detect image URLs in the response
//     const isImageUrl = (text: string) => {
//       return text.match(/https?:\/\/res\.cloudinary\.com\/[^\s]+\.(jpg|jpeg|png|gif)/i);
//     };

//     // Call the updated API with chat ID and username
//     const aiResponseText = await generateResponse(
//       inputText,
//       chatToUse.id,
//       userProfile?.name || 'user'
//     );

//     const sentMessage = { ...newMessage, status: 'sent' };

//     // Check if the response contains an image URL
//     const imageMatch = isImageUrl(aiResponseText);

//     let aiResponse: Message;
//     if (imageMatch) {
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: '',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent',
//         file: {
//           name: 'generated-image.png',
//           type: 'image/png',
//           url: imageMatch[0] // Use the matched URL
//         }
//       };
//     } else {
//       // Regular text response
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponseText,
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };
//     }

//     const finalChat = {
//       ...updatedChat,
//       messages: [
//         ...updatedChat.messages.map(msg =>
//           msg.id === newMessage.id ? sentMessage : msg
//         ),
//         aiResponse
//       ]
//     };

//     setChats(prev => prev.map(c =>
//       c.id === finalChat.id ? finalChat : c
//     ));
//     setCurrentChat(finalChat);
//     setMessages(finalChat.messages);
//     setActiveFilePreview(null);

//   } catch (error) {
//     console.error('Failed to send message:', error);
//     const errorMessage = { ...newMessage, status: 'error' };

//     const errorChat = {
//       ...currentChat,
//       messages: currentChat?.messages.map(msg =>
//         msg.id === newMessage.id ? errorMessage : msg
//       ) || []
//     };

//     setChats(prev => prev.map(c =>
//       c.id === currentChat?.id ? errorChat : c
//     ));
//     setCurrentChat(errorChat);
//     setMessages(errorChat.messages);
//   } finally {
//     setIsGenerating(false);
//   }
// };

// const renderMessageStatus = (status: Message['status']) => {
//   switch (status) {
//     case 'sending':
//       return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2" > </i>;
//     case 'sent':
//       return <i className="fas fa-check text-green-500 ml-2" > </i>;
//     case 'error':
//       return <i className="fas fa-exclamation-circle text-red-500 ml-2" > </i>;
//     default:
//       return null;
//   }
// };

// const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(true);
// };

// const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
// };

// const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
//   const files = e.dataTransfer.files;
//   handleFiles(files);
// };

// const handleFiles = (files: FileList) => {
//   Array.from(files).forEach(file => {
//     const fileUrl = URL.createObjectURL(file);
//     const filePreview = {
//       name: file.name,
//       type: file.type,
//       url: fileUrl
//     };
//     setActiveFilePreview(filePreview);

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: `Attached: ${file.name}`,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sent',
//       file: filePreview
//     };

//     if (currentChat) {
//       const updatedChat = {
//         ...currentChat,
//         messages: [...currentChat.messages, newMessage]
//       };

//       setChats(prev => prev.map(chat =>
//         chat.id === currentChat.id ? updatedChat : chat
//       ));
//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//     }
//   });

//   setIsUploadModalOpen(false);
// };

// const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.files) {
//     handleFiles(e.target.files);
//   }
// };

// const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
//   setLoading(true);
//   setFormError('');
//   setFormSuccess('');

//   try {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     if (isLogin) {
//       setFormSuccess('Successfully logged in!');
//       handleAuthSuccess({
//         name: data.email.split('@')[0],
//         email: data.email
//       });
//     } else {
//       setFormSuccess('Account created successfully!');
//       handleSignupSuccess({
//         name: data.name || data.email.split('@')[0],
//         email: data.email
//       });
//     }

//   } catch (error) {
//     setFormError('Authentication failed. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };

// // Add this new function to toggle between login and signup
// const toggleAuthMode = () => {
//   setIsLogin(!isLogin);
//   setFormError('');
//   setFormSuccess('');
// };

// const handleIntroductionComplete = (name: string) => {
//   setUserName(name);
//   setShowIntroduction(false);
//   setShowGreeting(false);
// };

// const handleSignupSuccess = (userData: { name: string; email: string }) => {
//   handleAuthSuccess(userData);
//   setShowIntroduction(true);
// };

// const handleAuthSuccess = (userData: { name: string; email: string }) => {
//   setIsAuthenticated(true);
//   setUserProfile(userData);
//   setIsLoginModalOpen(false);
//   setChats([]);
//   setMessages([]);
//   setCurrentChat(null);
//   setShowGreeting(true);
// };

// const handleLogout = () => {
//   setIsAuthenticated(false);
//   setUserProfile(null);
//   setChats([]);
//   setMessages([]);
//   setCurrentChat(null);
//   setShowGreeting(true);
//   setIsChatActive(false);
//   setActiveChat(null);
//   setStarredChats([]);
// };

// const Greeting = React.memo(() => {
//   const [displayText, setDisplayText] = useState('');
//   const hour = new Date().getHours();
//   const greetingText = hour >= 0 && hour < 12
//     ? 'Good morning'
//     : hour >= 12 && hour < 16
//       ? 'Good afternoon'
//       : 'Good evening';

//   useEffect(() => {
//     if (!hasGreetingPlayed) {
//       // Only add comma if there's a username
//       const fullText = userProfile?.name
//         ? `${greetingText}, ${userProfile.name}`
//         : greetingText;

//       let timeouts: NodeJS.Timeout[] = [];

//       [...fullText].forEach((char, index) => {
//         const timeout = setTimeout(() => {
//           setDisplayText(prev => prev + char);
//           if (index === fullText.length - 1) {
//             setHasGreetingPlayed(true);
//           }
//         }, 100 * index);
//         timeouts.push(timeout);
//       });

//       return () => timeouts.forEach(clearTimeout);
//     } else {
//       // Only add comma if there's a username
//       const fullText = userProfile?.name
//         ? `${greetingText}, ${userProfile.name}`
//         : greetingText;
//       setDisplayText(fullText);
//     }
//   }, [greetingText, userProfile?.name]);

//   return (
//     <h1 className= "text-4xl font-light text-center" >
//     { displayText }
//     </h1>
//     );
//   });

// const handleVoiceTranscript = (text: string) => {
//   setInputText(text);
// };

// const handleVoiceStateChange = (isActive: boolean) => {
//   setIsMicActive(isActive);
// };

// const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//   setSelectedLanguage(language);

//   if (currentChat && currentChat.messages.length > 0) {
//     try {
//       setIsGenerating(true);

//       const translatedMessages = await Promise.all(
//         currentChat.messages.map(async (msg) => {
//           const translatedContent = await translateText(msg.content, language.name);
//           return {
//             ...msg,
//             content: translatedContent
//           };
//         })
//       );

//       const updatedChat = {
//         ...currentChat,
//         messages: translatedMessages
//       };

//       setChats(prev => prev.map(chat =>
//         chat.id === currentChat.id ? updatedChat : chat
//       ));
//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//     } catch (error) {
//       console.error('Translation failed:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   }
// };

// const parseMessageContent = (content: string) => {
//   const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//   const parts = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = codeBlockRegex.exec(content)) !== null) {
//     if (match.index > lastIndex) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex, match.index)
//       });
//     }

//     parts.push({
//       type: 'code',
//       language: match[1] || 'plaintext',
//       content: match[2].trim()
//     });

//     lastIndex = match.index + match[0].length;
//   }


//   if (lastIndex < content.length) {
//     parts.push({
//       type: 'text',
//       content: content.slice(lastIndex)
//     });
//   }

//   return parts.length > 0 ? parts : [{ type: 'text', content }];
// };

// const handleCodeClick = (content: string, language: string) => {
//   setSelectedCode({ content, language });
//   setIsInfoPanelOpen(true);
// };

// const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   const textarea = e.target;
//   const value = textarea.value;

//   if (!value.trim()) {
//     textarea.style.height = '56px';
//   } else {
//     textarea.style.height = 'inherit';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//   }

//   setInputText(value);
// };

// const handleCodeBlockClick = (content: string, language: string) => {
//   setSelectedCodeBlock({
//     content: content.trim(),
//     language: language || 'plaintext'
//   });
//   setIsCodeSliderOpen(true);
// };

// const handleModelSelect = (modelName: string) => {
//   setSelectedModel(modelName);
//   setIsModelDropdownOpen(false);
// };

// const ModelDropdown = ({ onSelect }: { onSelect: (model: string) => void }) => {
//   return (
//     <div 
//         className= {`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-n z-[9999] ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
//       }`
// }
//       >
// {
//   models.map((model) => (
//     <button
//             key= { model.id }
//             onClick = {() => onSelect(model.name)}
// className = {`w-full flex items-center px-4 py-3 text-left ${isDarkMode
//     ? 'hover:bg-gray-600 text-gray-200'
//     : 'hover:bg-gray-50 text-gray-700'
//   } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}
//           >
//   <i className={
//     `fas ${model.icon} mr-3 ${selectedModel === model.name ? 'text-blue-500' : 'text-gray-400'
//     }`
// }> </i>
//   < span > { model.name } </span>
//   </button>
//         ))}
// </div>
//     );
//   };

// const handleActionCapsuleClick = (action: string, suggestion?: string) => {
//   let promptText = '';

//   if (suggestion) {
//     // If a suggestion was clicked, use it directly
//     switch (action) {
//       case 'explain':
//         promptText = `${suggestion}: `;
//         break;
//       case 'summarize':
//         promptText = `${suggestion} for: `;
//         break;
//       case 'translate':
//         promptText = `${suggestion}: `;
//         break;
//       case 'improve':
//         promptText = `${suggestion}: `;
//         break;
//       case 'code':
//         promptText = `${suggestion}: `;
//         break;
//     }
//   } else {
//     // Default prompts when capsule is clicked
//     switch (action) {
//       case 'explain':
//         promptText = 'Please explain this in detail: ';
//         break;
//       case 'summarize':
//         promptText = 'Please provide a summary of: ';
//         break;
//       case 'translate':
//         promptText = 'Please translate this to English: ';
//         break;
//       case 'improve':
//         promptText = 'Please improve the writing of this text: ';
//         break;
//       case 'code':
//         promptText = 'Please generate code for: ';
//         break;
//     }
//   }
//   setInputText(promptText);
// };

// // Update the handlers for toggling sections
// const handleToggleStarredChats = () => {
//   if (!isShowingStarredChats) {
//     setIsShowingChats(false); // Hide recent chats when showing starred
//   }
//   setIsShowingStarredChats(!isShowingStarredChats);
// };

// const handleToggleRecentChats = () => {
//   if (!isShowingChats) {
//     setIsShowingStarredChats(false); // Hide starred chats when showing recent
//   }
//   setIsShowingChats(!isShowingChats);
// };

// // Add new handler for project click
// const handleProjectClick = (project: Project) => {
//   setSelectedProject(project);
//   setIsProjectChatListOpen(true);
// };

// // Modify handleAddProject to include name editing
// const handleAddProject = () => {
//   const newProject: Project = {
//     id: `proj_${Date.now()}`,
//     name: `New Project`,
//     createdAt: new Date(),
//     chats: [],
//     isEditing: true // Start in editing mode
//   };
//   setProjects(prev => [newProject, ...prev]);
// };

// // Add new handlers for project management
// const handleProjectNameEdit = (projectId: string, newName: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         name: newName,
//         isEditing: false
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectNameEditStart = (projectId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return { ...project, isEditing: true };
//     }
//     return { ...project, isEditing: false };
//   }));
// };

// // Update handleNewProjectChat
// const handleNewProjectChat = (projectId: string) => {
//   const newChat: Chat = {
//     id: Date.now().toString(),
//     title: 'New Chat', // This will be updated with first message
//     createdAt: new Date(),
//     messages: [],
//     projectId: projectId,
//     isEditing: false // Don't start in editing mode since title will update automatically
//   };

//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: [newChat, ...project.chats]
//       };
//     }
//     return project;
//   }));

//   setCurrentChat(newChat);
//   setMessages([]);
//   setIsNewChatStarted(true);
//   setShowGreeting(false);
//   setIsChatActive(true);
// };

// // Add project chat management functions
// const handleProjectChatTitleEdit = (projectId: string, chatId: string, newTitle: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => {
//           if (chat.id === chatId) {
//             const updatedChat = { ...chat, title: newTitle, isEditing: false };
//             if (currentChat?.id === chatId) {
//               setCurrentChat(updatedChat);
//             }
//             return updatedChat;
//           }
//           return chat;
//         })
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectChatTitleEditStart = (projectId: string, chatId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => ({
//           ...chat,
//           isEditing: chat.id === chatId
//         }))
//       };
//     }
//     return project;
//   }));
// };

// // Add handler for toggling project collapse
// const handleProjectCollapse = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setCollapsedProjects(prev => ({
//     ...prev,
//     [projectId]: !prev[projectId]
//   }));
// };

// // Add new handler for project deletion
// const handleConfirmDelete = () => {
//   const { itemId, itemType, projectId } = deleteConfirmation;

//   if (itemType === 'project') {
//     // Handle project deletion
//     if (currentChat?.projectId === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//     setProjects(prev => prev.filter(project => project.id !== itemId));
//   } else {
//     // Handle chat deletion
//     if (projectId) {
//       // Delete project chat
//       setProjects(prev => prev.map(project => {
//         if (project.id === projectId) {
//           return {
//             ...project,
//             chats: project.chats.filter(chat => chat.id !== itemId)
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Delete regular chat
//       setChats(prev => prev.filter(chat => chat.id !== itemId));
//     }

//     if (currentChat?.id === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   }

//   setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
// };

// return (
//   <div className= {`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//     <div className={
//       `flex h-screen overflow-hidden ${isDarkMode
//         ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
//         : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//       }`
// }>
//   {/* Fixed brand text container */ }
//   < div className = {`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//     }`}>
//       <span 
//             onClick={ handleHomeClick }  // Add this line
// className = "text-3xl font-medium cursor-pointer bg-clip-text text-transparent hover:opacity-80 transition-opacity" // Add hover effect
// style = {{
//   background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//     WebkitBackgroundClip: 'text',
//       textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//         WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//           letterSpacing: '0.5px'
// }}
//           >
//   Hind AI
//     </span>
//     </div>

// {/* Sidebar */ }
// <div 
//           className={
//   `${isSidebarOpen ? 'w-72' : 'w-16'
//   } fixed md:relative h-full transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//   } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`
// }
//         >
//   {/* Top section - only toggle button */ }
//   < div className = "flex items-center p-4" >
//     <button 
//               onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
// className = "text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//   >
//   <i className={ `fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}` }> </i>
//     </button>
//     </div>

// {/* Main content with icons-only when collapsed */ }
// <nav className="flex-1 px-2" >
//   <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
// onClick = { handleNewChat }
//   >
//   <i className="fa-solid fa-plus w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       New Chat
//         </span>
//         </button>

// {/* Search section */ }
// <div className="px-2 mb-4" >
//   {
//     isSidebarOpen?(
//                 <div className = "relative" >
//         <input
//                     type="search"
//       placeholder = "Search conversations..."
//                     className = {`w-full pl-9 pr-4 py-2 ${isDarkMode
//           ? 'bg-gray-700 text-gray-200 placeholder-gray-400'
//           : 'bg-gray-100 text-gray-800'
//         } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//   />
//   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" > </i>
//     </div>
//               ) : (
//   <button
//                   onClick= {() => setIsSidebarOpen(true)}
// className = {`w-full p-2 rounded-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
//   }`}
//                 >
//   <i className="fa-solid fa-magnifying-glass" title = "Search" > </i>
//     </button>
//               )}
// </div>

// {/* Projects Section */ }
// <div className="mb-2 pl-4" > {/* Increased pl-2 to pl-4 */ }
//   < div className = {`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//     <div className="flex items-center flex-1" >
//       <i 
//                     className="fa-solid fa-folder text-blue-400 w-8"
// title = "Projects"
// onClick = {() => setIsProjectListOpen(true)}
// style = {{ cursor: 'pointer' }}
//                   > </i>
// {
//   isSidebarOpen && (
//     <div className="flex items-center flex-1" >
//       <span 
//                         className="text-sm font-medium ml-1"
//   onClick = {() => setIsProjectListOpen(true)
// }
// style = {{ cursor: 'pointer' }}
//                       >
//   Projects
//   </span>
//   < button
// onClick = { handleAddProject }
// className = {`ml-4 p-2 rounded-lg transition-colors ${  // Increased ml-3 to ml-4 and p-1.5 to p-2
//   isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//   }`}
//                       >
//   <i className="fa-solid fa-plus text-xs" > </i>
//     </button>
//     </div>
//                   )}
// </div>
//   </div>
// {
//   isSidebarOpen && projects.length > 0 && (
//     <div className="space-y-1 ml-3" > {/* Increased ml-2 to ml-3 */ }
//   {
//     projects.map(project => (
//       <div
//                       key= { project.id }
//                       className = {`group px-2 py-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//         }`}
//                     >
//     <div className="flex items-center justify-between" >
//       <div className="flex items-center flex-1 min-w-0" >
//         <div className="flex items-center" >
//           <button
//                               onClick={ (e) => handleProjectCollapse(project.id, e) }
//   className = {`mr-1 p-1 rounded-lg transition-transform duration-200 ${  // Added mr-1 for right margin
//     isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//     }`
// }
// style = {{ width: '20px' }}  // Fixed width for consistent spacing
//                             >
//   <i className={
//     `fas fa-chevron-right text-xs text-gray-400 transform transition-transform duration-200 ${!collapsedProjects[project.id] ? 'rotate-90' : ''
//     }`
// }> </i>
//   </button>
//   < i className = "fa-regular fa-folder-open w-8 text-blue-400 ml-1" > </i>  {/ * Added ml - 1 */}
// </div>
// {
//   project.isEditing ? (
//     <input
//                               type= "text"
//                               defaultValue = { project.name }
//   autoFocus
//   onBlur = {(e) => handleProjectNameEdit(project.id, e.target.value)
// }
// onKeyDown = {(e) => {
//   if (e.key === 'Enter') {
//     handleProjectNameEdit(project.id, e.currentTarget.value);
//   }
// }}
// className = {`text-sm px-2 py-1 rounded flex-1 mr-2 ${isDarkMode
//     ? 'bg-gray-600 text-gray-200'
//     : 'bg-gray-100 text-gray-800'
//   }`}
//                             />
//                           ) : (
//   <span 
//                               className= "text-sm truncate flex-1"
// onDoubleClick = {() => handleProjectNameEditStart(project.id)}
//                             >
//   { project.name }
//   </span>
//                           )}
// </div>
//   < div className = "flex items-center space-x-2 opacity-0 group-hover:opacity-100" >
//     <button
//                             onClick={ () => handleNewProjectChat(project.id) }
// className = {`p-1 rounded-full ${isDarkMode
//     ? 'text-gray-400 hover:text-blue-400'
//     : 'text-gray-500 hover:text-blue-500'
//   }`}
//                           >
//   <i className="fas fa-plus-circle" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteProject(project.id, e)}
// className = {`p-1 rounded-full ${isDarkMode
//     ? 'text-gray-400 hover:text-red-400'
//     : 'text-gray-500 hover:text-red-500'
//   }`}
//                           >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </div>
// {/* Project Chats */ }
// {
//   project.chats.length > 0 && !collapsedProjects[project.id] && (
//     <div className="ml-8 mt-2 space-y-1" >
//     {
//       project.chats.map(chat => (
//         <div
//                               key= { chat.id }
//                               onClick = {() => handleChatSelect(chat)}
//   className = {`group flex items-center justify-between px-2 py-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
//     }`
// }
//                             >
//   <div className="flex items-center space-x-2 flex-1 min-w-0" >
//     <i className="fas fa-comment-alt text-xs text-gray-400" > </i>
// {
//   chat.isEditing ? (
//     <input
//                                     type= "text"
//                                     defaultValue = { chat.title }
//   autoFocus
//   onClick = { e => e.stopPropagation() }
//   onBlur = {(e) => handleProjectChatTitleEdit(project.id, chat.id, e.target.value)
// }
// onKeyDown = {(e) => {
//   if (e.key === 'Enter') {
//     handleProjectChatTitleEdit(project.id, chat.id, e.currentTarget.value);
//   }
// }}
// className = {`text-sm px-2 py-1 rounded flex-1 ${isDarkMode
//     ? 'bg-gray-700 text-gray-200'
//     : 'bg-gray-100 text-gray-800'
//   }`}
//                                   />
//                                 ) : (
//   <span 
//                                     className= "text-sm truncate"
// onDoubleClick = {(e) => {
//   e.stopPropagation();
//   handleProjectChatTitleEditStart(project.id, chat.id);
// }}
//                                   >
//   { chat.title }
//   </span>
//                                 )}
// </div>
//   < div className = "flex items-center space-x-1 opacity-0 group-hover:opacity-100" >
//     <button
//                                   onClick={
//   (e) => {
//     e.stopPropagation();
//     handleProjectChatTitleEditStart(project.id, chat.id);
//   }
// }
// className = {`p-1 rounded-full ${isDarkMode
//     ? 'text-gray-400 hover:text-blue-400'
//     : 'text-gray-500 hover:text-blue-500'
//   }`}
//                                 >
//   <i className="fas fa-edit text-xs" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteProjectChat(project.id, chat.id, e)}
// className = {`p-1 rounded-full ${isDarkMode
//     ? 'text-gray-400 hover:text-red-400'
//     : 'text-gray-500 hover:text-red-500'
//   }`}
//                                 >
//   <i className="fas fa-trash text-xs" > </i>
//     </button>
//     </div>
//     </div>
//                           ))}
// </div>
//                       )}
// </div>
//                   ))}
// </div>
//               )}
// </div>

// {/* Starred Chats Section */ }
// <div className="mb-4" >
//   <div className={ `flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}` }>
//     <button
//                   onClick={
//   () => {
//     if (!isSidebarOpen) {
//       setChatListInitialTab('starred');
//       setIsChatListOpen(true);
//     }
//   }
// }
// className = "relative"
//   >
//   <i className="fa-solid fa-star text-yellow-500 w-8" title = "Starred chats" > </i>
//     </button>
// { isSidebarOpen && <span className="text-sm font-medium" > Starred Chats </span> }
// </div>
//   < div className = "space-y-1" >
//   {
//     chats
//                   .filter(chat => chat.isStarred)
//       .map((chat) => (
//         <div
//                       key= {`starred_${chat.id}`}
// className = {`group flex items-center p-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//   }`}
// onClick = {() => handleChatSelect(chat)}
//                     >
//   <i className="fas fa-comment-alt w-8 text-yellow-500/80" > </i>
// {
//   isSidebarOpen && (
//     <>
//     <span className="ml-2 truncate flex-1" > { chat.title } </span>
//       < button
//   onClick = {(e) => handleStarChat(chat.id, e)
// }
// className = "ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//   >
//   <i className="fas fa-star text-yellow-500" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = {`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-red-400'
//     : 'text-gray-500 hover:text-red-500'
//   }`}
//                           >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </>
//                       )}
// </div>
//                   ))}
// </div>
//   </div>

// {/* All Chats Section */ }
// <div className={ `flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}` }>
//   <button
//                 onClick={
//   () => {
//     if (!isSidebarOpen) {
//       setChatListInitialTab('all');
//       setIsChatListOpen(true);
//     }
//   }
// }
// className = "relative"
//   >
//   <i className="fa-solid fa-comments w-8"title = "All Chats" > </i>
//     </button>
// { isSidebarOpen && <span className="text-sm font-medium" > All Chats </span> }
// </div>

// {/* Chat list section */ }
// <div className="space-y-1" >
// {
//   chats.filter(chat => !chat.isStarred).map((chat) => (
//     <div
//                   key= {`all_${chat.id}`}
// className = {`group flex items-center p-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//   }`}
// onClick = {() => handleChatSelect(chat)}
//                 >
//   <i className="fa-regular fa-comment w-8" > </i>
// {
//   isSidebarOpen && (
//     <>
//     {
//       chat.isEditing ? (
//         <input
//                           type= "text"
//                           defaultValue={ chat.title }
//                           autoFocus
//                           onClick={ e => e.stopPropagation() }
//                           onBlur={(e) => handleChatTitleEdit(chat.id, e.target.value)
//     }
//                           onKeyDown = {(e) => {
//     if (e.key === 'Enter') {
//       handleChatTitleEdit(chat.id, e.currentTarget.value);
//     }
//   }
// }
// className = {`text-sm px-2 py-1 rounded flex-1 mr-2 ${isDarkMode
//     ? 'bg-gray-600 text-gray-200'
//     : 'bg-gray-100 text-gray-800'
//   }`}
//                         />
//                       ) : (
//   <span 
//                           className= "ml-2 truncate flex-1"
// onDoubleClick = {(e) => {
//   e.stopPropagation();
//   handleChatTitleEditStart(chat.id);
// }}
//                         >
//   { chat.title }
//   </span>
//                       )}
// <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100" >
//   <button
//                           onClick={
//   (e) => {
//     e.stopPropagation();
//     handleChatTitleEditStart(chat.id);
//   }
// }
// className = {`p-1 rounded-full transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-blue-400'
//     : 'text-gray-500 hover:text-blue-500'
//   }`}
//                         >
//   <i className="fas fa-edit" > </i>
//     </button>
//     < button
// onClick = {(e) => handleStarChat(chat.id, e)}
// className = {`p-1 rounded-full transition-colors ${chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//   }`}
//                         >
//   <i className="fas fa-star" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = "p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//   >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </>
//                   )}
// </div>
//               ))}
// </div>
//   </nav>

// {/* Auth section at bottom */ }
// <div className="mt-auto p-2 border-t border-gray-700/50" >
// {
//   isAuthenticated?(
//               <div className = "space-y-1" >
//       <div className="flex items-center p-2 rounded-lg">
//   <i className="fa-solid fa-user w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       { userProfile?.name }
//       </span>
//       </div>
//       < button
// onClick = { handleLogout }
// className = "w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//   >
//   <i className="fa-solid fa-right-from-bracket w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       Logout
//       </span>
//       </button>
//       </div>
//             ) : (
//   <div className= "space-y-1" >
//   <button className="w-full flex items-center p-2" onClick = {() => setIsLoginModalOpen(true)}>
//     <i className="fa-solid fa-right-to-bracket w-8" > </i>
//       < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//         Login
//         </span>
//         </button>
//         < button
// className = "w-full flex items-center p-2 text-indigo-500"
// onClick = {() => {
//   setIsLogin(false);
//   setIsLoginModalOpen(true);
// }}
//                 >
//   <i className="fa-solid fa-user-plus w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       Sign Up
//         </span>
//         </button>
//         </div>
//             )}

// <button 
//               onClick={ toggleDarkMode }
// className = "w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//   >
//   <i className={ `fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8` }> </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       { isDarkMode? 'Light Mode': 'Dark Mode' }
//       </span>
//       </button>
//       </div>
//       </div>

//       < div className = "flex-1 flex flex-col relative pt-16 pl-16" >
//         <div className={
//           `flex-1 overflow-y-auto transition-all duration-300 ${isCodeSliderOpen ? 'lg:pr-[50%]' : ''
//           }`
// }>
//   {/* Main chat section that shifts left when slider opens */ }
//   < div className = {`
//               w-full transition-all duration-300 
//               ${isCodeSliderOpen
//       ? 'lg:max-w-full lg:pr-60' // Add right padding when slider is open
//       : 'max-w-3xl mx-auto'
//     }
//               relative flex flex-col h-full pb-[170px] // Add these styles
//             `}>
//   {/* Chat content */ }
//   < div className = {`w-full ${!isCodeSliderOpen ? 'max-w-3xl mx-auto' : ''} ${hasMessages || isNewChatStarted ? 'flex-1' : ''
//     }`}>
//       { showGreeting && !hasMessages && !isNewChatStarted ? (
//         <div className= "flex justify-center items-center min-h-[200px]" >
//         <Greeting />
//     </div>
//                 ) : (
//   <div className= "flex-1 flex flex-col justify-end" >
//   <div className="flex-1 space-y-4 py-4 px-4 mb-40" >
//   {
//     messages.map((message, index) => (
//       <div
//                           key= {`${message.id}_${index}`}
// className = {`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
// style = {{
//   animationDelay: `${index * 100}ms`,
//                           }}
//                         >
//   <div
//                             className={
//   `max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${message.type === 'user'
//     ? isDarkMode
//       ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//       : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//     : isDarkMode
//       ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//       : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//   }`
// }
// style = {{
//   backdropFilter: 'blur(8px)',
//                             }}
//                           >
//   <div className="flex items-center justify-between mb-1" >
//     <div className="flex items-center" >
//       <i className={ `fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2` }> </i>
//         < span className = "text-sm opacity-75" >
//           { new Date(message.timestamp).toLocaleTimeString() }
//           </span>
//           </div>
// { renderMessageStatus(message.status) }
// </div>

// {
//   message.file && (
//     <div className="mb-2" >
//       {
//         message.file.type.startsWith('image/') ? (
//           <ImagePreview 
//                                     imageUrl= { message.file.url }
//                                     isDarkMode={ isDarkMode }
//                                     fileName={ message.file.name }
//         />
//                                 ) : message.file.type === 'application/pdf' ? (
//           <div className= "flex items-center space-x-2 bg-black/20 rounded-lg p-3" >
//           <i className="fas fa-file-pdf text-2xl text-red-400"> </i>
//             < div className="flex-1 min-w-0" >
//             <div className="truncate"> { message.file.name } </div>
//               < div className="text-sm opacity-75" > PDF Document</ div >
//       </div>
//       < a
//   href = { message.file.url }
//   target = "_blank"
//   rel = "noopener noreferrer"
//   className = "p-2 hover:bg-white/10 rounded-full transition-colors"
//     >
//     <i className="fas fa-external-link-alt" > </i>
//       </a>
//       </div>
//                                 ) : (
//     <div className= "flex items-center space-x-2 bg-black/20 rounded-lg p-3" >
//     <i className="fas fa-file text-2xl text-blue-400" > </i>
//       < div className = "flex-1 min-w-0" >
//         <div className="truncate" > { message.file.name } </div>
//           < div className = "text-sm opacity-75" > Document </div>
//             </div>
//             < a
//   href = { message.file.url }
//   target = "_blank"
//   rel = "noopener noreferrer"
//   className = "p-2 hover:bg-white/10 rounded-full transition-colors"
//     >
//     <i className="fas fa-download" > </i>
//       </a>
//       </div>
//                                 )
// }
// </div>
//                             )}

// <div className="space-y-4" >
// {
//   parseMessageContent(message.content).map((part, index) => (
//     part.type === 'code' ? (
//       <div 
//                                     key= { index }
//                                     onClick = {() => handleCodeBlockClick(part.content, part.language)}
// className = {`cursor-pointer group rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//   }`}
//                                   >
//   <div className={
//     `flex items-center justify-between px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//     }`
// }>
//   <div className="flex items-center space-x-2" >
//     <i className="fas fa-code" > </i>
//       < span className = {`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
//         }`}>
//           { part.language }
//           </span>
//           </div>
//           < div className = {`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               <i className="fas fa-expand-alt" > </i>
//                 </div>
//                 </div>
//                 < div className = "p-4 max-h-60 overflow-hidden relative" >
//                   <pre className="overflow-x-auto" >
//                     <code className={
//                       `language-${part.language} ${isDarkMode ? 'text-gray-300' : 'text-gray-800'
//                       }`
// }>
//   { part.content }
//   </code>
//   </pre>
//   < div className = {`absolute bottom-0 inset-x-0 h-8 ${isDarkMode
//       ? 'bg-gradient-to-t from-gray-800'
//       : 'bg-gradient-to-t from-gray-50'
//     }`}> </div>
//       </div>
//       </div>
//                                 ) : (
//   <p key= { index } className = "text-base leading-relaxed whitespace-pre-wrap" >
//     { part.content }
//     </p>
//                                 )
//                               ))}
// </div>
//   </div>
//   </div>
//                       ))}
// <div ref={ messagesEndRef } />
//   </div>
//   </div>
//                 )}

// {/* Chat input section */ }
// <div className={
//   `
//                                     ${hasMessages || isNewChatStarted
//     ? 'fixed bottom-6 lg:left-16 transition-all duration-300'
//     : 'sticky bottom-6'
//   } w-full px-4
//                                     ${isCodeSliderOpen
//     ? 'lg:left-16 lg:w-[100%] lg:translate-x-0' // Reduced left margin
//     : 'mx-auto'
//   }
//                                   `}>
//   <div className={
//     `
//                                       max-w-4xl
//                                       ${showGreeting
//       ? 'mx-auto'
//       : isCodeSliderOpen
//         ? 'lg:ml-0' // Remove margin when slider is open
//         : 'mx-auto'
//     }
//                                     `}>
//   <div className={
//     `relative rounded-[20px] shadow-lg chat-glow transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'
//     }`
// }>
//   { activeFilePreview && (
//     <div className={
//       `w-full px-4 py-3 ${isDarkMode
//         ? 'bg-gray-700/30'
//         : 'bg-gray-50/50'
//       }`
// }>
//   <div className="flex items-center justify-between" >
//     <div className="flex items-center space-x-3" >
//       <i className={
//         `fas ${activeFilePreview.type.startsWith('image/')
//           ? 'fa-image text-green-400'
//           : activeFilePreview.type === 'application/pdf'
//             ? 'fa-file-pdf text-red-400'
//             : 'fa-file text-blue-400'
//         } text-lg`
// }> </i>
//   < div className = "flex flex-col" >
//     <span className="text-sm font-medium truncate max-w-[200px]" >
//       { activeFilePreview.name }
//       </span>
//       < span className = {`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//         Ready to send
//           </span>
//           </div>
//           </div>
//           < button
// onClick = {() => setActiveFilePreview(null)}
// className = {`p-1.5 rounded-full transition-colors ${isDarkMode
//     ? 'hover:bg-gray-600 text-gray-400'
//     : 'hover:bg-gray-200 text-gray-500'
//   }`}
//                             >
//   <i className="fas fa-times" > </i>
//     </button>
//     </div>
//     </div>
//                       )}

// {
//   messages.length > 0 && messages[messages.length - 1].file && (
//     <div className={
//       `w-full px-4 py-2 ${isDarkMode
//         ? 'bg-gray-700/30'
//         : 'bg-gray-50/50'
//       }`
//   }>
//     <div className="flex items-center justify-between" >
//       <div className="flex items-center space-x-2" >
//         <i className={
//           `fas ${messages[messages.length - 1].file?.type.startsWith('image/')
//             ? 'fa-image text-green-400'
//             : messages[messages.length - 1].file?.type === 'application/pdf'
//               ? 'fa-file-pdf text-red-400'
//               : 'fa-file text-blue-400'
//           }`
//   }> </i>
//     < span className = "text-sm truncate max-w-[200px]" >
//       { messages[messages.length - 1].file?.name }
//       </span>
//       </div>
//       < div className = "flex items-center space-x-2" >
//         <span className={ `text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}` }>
//           File attached
//             </span>
//             < i className = "fas fa-check text-green-400" > </i>
//               </div>
//               </div>
//               </div>
//                       )
// }

// <div className="relative flex flex-col" >
//   <div className="min-h-[56px] max-h-[200px] overflow-hidden" >
//     <textarea
//                             className={
//   `w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${isDarkMode
//     ? 'bg-gray-800 text-gray-200 placeholder-gray-400'
//     : 'bg-white text-gray-800 placeholder-gray-500'
//   }`
// }
// value = { inputText }
// onChange = { handleTextAreaResize }
// placeholder = {`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
// onKeyDown = {(e) => {
//   if (e.key === 'Enter' && !e.shiftKey) {
//     e.preventDefault();
//     if (activeFilePreview || inputText.trim()) {
//       handleSendMessage();
//     }
//   }
// }}
// style = {{
//   minHeight: '56px',
//     maxHeight: '200px'
// }}
//                           />
//   </div>

//   < div className = {`flex items-center justify-between p-4 rounded-b-[20px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'
//     }`}>
//       <div className="flex items-center space-x-2" >
//         <div className="flex items-center space-x-2" >
//           {/* Model container */ }
//           < ModelSelector isDarkMode = { isDarkMode } onModelChange = { setSelectedModel } models = { models } />

//             {/* Language container */ }
//             < div className = "relative inline-block" >
//               <LanguageSelector
//                                      isDarkMode={ isDarkMode }
// onLanguageChange = { handleLanguageChange }
// selectedLanguage = { selectedLanguage }
// className = "z-[9999]"
// dropdownPosition = "absolute"
//   />
//   </div>

// {/* Search button */ }
// <button
//                                      className="flex items-center space-x-2  hover:text-gray-700"
// title = "Search the web"
//   >
//   <GlobeIcon className="w-5 h-5" /> {/* Replace with actual icon */ }
//     < span > Search </span>
//     </button>
//     </div>

//     </div>

//     < div className = "flex items-center space-x-2" >
//       <button
//                               className={
//   `p-2 rounded-full transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-blue-400'
//     : 'text-gray-400 hover:text-indigo-600'
//   }`
// }
// onClick = {() => setIsUploadModalOpen(true)}
//                             >
//   <i className="fas fa-paperclip" > </i>
//     </button>

//     < button
// className = {`p-2 rounded-full transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-blue-400'
//     : 'text-gray-400 hover:text-indigo-600'
//   }`}
// onClick = {() => setIsMicActive(!isMicActive)}
//                             >
//   <i className={ `fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}` }> </i>
//     </button>

//     < button
// className = {`rounded-full p-2.5 transition-colors ${isDarkMode
//     ? 'bg-blue-600 hover:bg-blue-700'
//     : 'bg-indigo-600 hover:bg-indigo-700'
//   } text-white`}
// onClick = { handleSendMessage }
//   >
//   <i className="fas fa-paper-plane" > </i>
//     </button>
//     </div>
//     </div>
//     </div>
//     </div>
// {
//   !hasMessages && !isNewChatStarted && (
//     <ActionCapsules 
//                         isDarkMode={ isDarkMode }
//   onActionClick = { handleActionCapsuleClick }
//     />
//                     )
// }
// {
//   !hasMessages && !isNewChatStarted && (
//     <div className="mt-4" >
//       <div className="grid grid-cols-2 gap-4" >
//         {/* Starred Chats Section */ }
//         < div >
//         <div className="flex items-center justify-between mb-3" >
//           <div className="flex items-center" >
//             <i className="fas fa-star mr-2 text-yellow-500" > </i>
//               < span className = {`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`
// }>
//   Starred chats
//     </span>
//     </div>
//     < div className = "flex items-center space-x-2" >
//       <button
//                                   className={
//   `px-2 py-1 text-xs rounded-full transition-colors ${isDarkMode
//     ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
//     : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//   }`
// }
// onClick = { handleToggleStarredChats }
//   >
//   { isShowingStarredChats? 'Hide': 'Show' }
//   </button>
// {
//   isShowingStarredChats && chats.filter(chat => chat.isStarred).length > 3 && (
//     <button
//                                     onClick={
//     () => {
//       setChatListInitialTab('starred');
//       setIsChatListOpen(true);
//     }
//   }
//   className = {`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//     }`
// }
//                                   >
//   View all
//     </button>
//                                 )}
// </div>
//   </div>

//   < div className = {`transition-all duration-300 ${isShowingStarredChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//     }`}>
//       { isShowingStarredChats && (
//         <div className={
//           `${isDarkMode
//             ? 'bg-gray-800/50 shadow-gray-900/20'
//             : 'bg-white/50 shadow-sm'
//           } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`
// }>
// {
//   chats.filter(chat => chat.isStarred).length > 0 ? (
//     <ul className= "space-y-1.5" >
//     {
//       chats
//                                         .filter(chat => chat.isStarred)
//         .slice(0, showAllStarredChats ? undefined : 3)
//         .map(chat => (
//           <li
//                                             key= {`starred_${chat.id}`}
//                                             className={`group ${isDarkMode
//       ? 'hover:bg-gray-700/50 hover:border-gray-600'
//       : 'hover:bg-gray-50 hover:border-gray-100'
//     } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`
// }
// onClick = {() => handleChatSelect(chat)}
//                                           >
//   <div className="flex items-center space-x-2 min-w-0" >
//     <i className="fas fa-comment-alt text-gray-400 flex-shrink-0" > </i>
//       < span className = "truncate" > { chat.title } </span>
//         </div>
//         < div className = "flex items-center space-x-2" >
//           <i className="fas fa-star text-yellow-500 flex-shrink-0" > </i>
//             < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = {`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-red-400'
//     : 'text-gray-500 hover:text-red-500'
//   }`}
//                                               >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </li>
//                                         ))}
// </ul>
//                                   ) : (
//   <p className= {`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//     No starred chats yet
//       </p>
//                                   )}
// </div>
//                               )}
// </div>
//   </div>

// {/* Recent Chats Section */ }
// <div>
//   <div className="flex items-center justify-between mb-3" >
//     <div className="flex items-center" >
//       <i className="fas fa-history mr-2 text-gray-400" > </i>
//         < span className = {`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//           Recent chats
//             </span>
//             </div>
//             < div className = "flex items-center space-x-2" >
//               <button
//                                   className={
//   `px-2 py-1 text-xs rounded-full transition-colors ${isDarkMode
//     ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
//     : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//   }`
// }
// onClick = { handleToggleRecentChats }
//   >
//   { isShowingChats? 'Hide': 'Show' }
//   </button>
// {
//   isShowingChats && chats.length > 3 && (
//     <button
//                                     onClick={
//     () => {
//       setChatListInitialTab('all');
//       setIsChatListOpen(true);
//     }
//   }
//   className = {`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//     }`
// }
//                                   >
//   View all
//     </button>
//                                 )}
// </div>
//   </div>

//   < div className = {`transition-all duration-300 ${isShowingChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//     }`}>
//       { isShowingChats && (
//         <div className={
//           `${isDarkMode
//             ? 'bg-gray-800/50 shadow-gray-900/20'
//             : 'bg-white/50 shadow-sm'
//           } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`
// }>
// {
//   chats.length > 0 ? (
//     <ul className= "space-y-1.5" >
//     {
//       chats
//                                         .slice(0, showAllChats ? undefined : 3)
//         .map(chat => (
//           <li
//                                             key= {`recent_${chat.id}`}
//                                             className={`group ${isDarkMode
//       ? 'hover:bg-gray-700/50 hover:border-gray-600'
//       : 'hover:bg-gray-50 hover:border-gray-100'
//     } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`
// }
// onClick = {() => handleChatSelect(chat)}
//                                           >
//   <div className="flex items-center space-x-2 min-w-0" >
//     <i className="fas fa-comment-alt text-gray-400 flex-shrink-0" > </i>
//       < span className = "truncate" > { chat.title } </span>
//         </div>
//         < div className = "flex items-center space-x-2" >
//           <button
//                                                 onClick={ (e) => handleStarChat(chat.id, e) }
// className = {`flex-shrink-0 transition-colors ${chat.isStarred
//     ? 'text-yellow-500'
//     : 'text-gray-400 hover:text-yellow-500'
//   }`}
//                                               >
//   <i className="fas fa-star" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = {`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-red-400'
//     : 'text-gray-500 hover:text-red-500'
//   }`}
//                                               >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </li>
//                                         ))}
// </ul>
//                                   ) : (
//   <p className= {`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//     No recent chats available
//       </p>
//                                   )}
// </div>
//                               )}
// </div>
//   </div>
//   </div>
//   </div>
//                     )}
// </div>
//   </div>
//   </div>

// {/* Only show additional components when no messages */ }
// {
//   !hasMessages && (
//     <div className="max-w-[850px] mx-auto mt-6" >
//       { activeTab === 'analysis' && (
//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6" >
//           <h3 className="text-xl font-medium mb-4" > Conversation Analytics </h3>
//             < div ref = { chartRef } style = {{ height: '300px' }
// }> </div>
//   </div>
//                   )}


// </div>
//               )}
// </div>
//   </div>
//   </div>
//   </div>
//   < ChatListPopup
// isOpen = { isChatListOpen }
// onClose = {() => setIsChatListOpen(false)}
// chats = { chats }
// onChatSelect = { handleChatSelect }
// onStarChat = { handleStarChat }
// onDeleteChat = { handleDeleteChat }
// isDarkMode = { isDarkMode }
// initialTab = { chatListInitialTab }
//   />
//   <VoiceInput
//         isActive={ isMicActive }
// onTranscript = { handleVoiceTranscript }
// onStateChange = { handleVoiceStateChange }
// isDarkMode = { isDarkMode }
//   />
//   <InfoPanel
//         isOpen={ isInfoPanelOpen }
// onClose = {() => {
//   setIsInfoPanelOpen(false);
//   setSelectedCode(null);
// }}
// isDarkMode = { isDarkMode }
// code = { selectedCode || undefined}
//       />
//   < CodeSlider
// isOpen = { isCodeSliderOpen }
// onClose = {() => {
//   setIsCodeSliderOpen(false);
//   setSelectedCodeBlock(null);
// }}
// code = { selectedCodeBlock?.content || ''}
// language = { selectedCodeBlock?.language || 'plaintext'}
// isDarkMode = { isDarkMode }
//   />
//   <SlidingAuthForm
//         isOpen={ isLoginModalOpen }
// onClose = {() => setIsLoginModalOpen(false)}
// isLogin = { isLogin }
// onToggleMode = { toggleAuthMode }
// onSubmit = { handleAuthSubmit }
// loading = { loading }
// error = { formError }
// success = { formSuccess }
// isDarkMode = { isDarkMode }
//   />
//   <DeleteConfirmationPopup
//         isOpen={ deleteConfirmation.isOpen }
// onClose = {() => setDeleteConfirmation(prev => ({ ...prev, isOpen: false }))}
// onConfirm = { handleConfirmDelete }
// isDarkMode = { isDarkMode }
// itemType = { deleteConfirmation.itemType }
//   />
//   <ProjectListPopup
//         isOpen={ isProjectListOpen }
// onClose = {() => setIsProjectListOpen(false)}
// projects = { projects }
// onProjectSelect = {(project) => {
//   setSelectedProject(project);
//   setIsProjectListOpen(false);
// }}
// onChatSelect = {(chat) => {
//   handleChatSelect(chat);
//   setIsProjectListOpen(false);
// }}
// onDeleteProject = { handleDeleteProject }
// onDeleteProjectChat = { handleDeleteProjectChat }
// onEditProject = { handleProjectNameEdit }
// onEditProjectStart = { handleProjectNameEditStart }
// onNewProjectChat = {(projectId) => {
//   handleNewProjectChat(projectId);
//   setIsProjectListOpen(false); // Close the popup after creating new chat
// }}
// isDarkMode = { isDarkMode }
//   />
//   <div id="dropdown-root" className = "fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;





// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';
// import ActionCapsules from './components/ActionCapsules';
// import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';
// import ModelSelector from './components/ModelSelector';
// import { Brain, MessageSquare, Bot, Sparkles, Code, Settings, Cpu, GlobeIcon } from "lucide-react";
// import ProjectListPopup from './components/ProjectListPopup';
// import ImagePreview from './components/ImagePreview';
// import LoadingDots from './components/LoadingDots';
// import { getChatHistory } from './services/api';
// import { fetchUserChats } from './services/api';




// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// // Update the Chat interface to include project association
// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string; // Add this to track which project the chat belongs to
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// // Update Project interface
// interface Project {
//   id: string;
//   name: string;
//   createdAt: Date;
//   chats: Chat[];
//   isEditing?: boolean;
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   //const [selectedModel, setSelectedModel] = useState(models[0]);
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{ name: string } | null>(
//     () => JSON.parse(localStorage.getItem('sessionData') || 'null')
//   );
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');
//   const [isShowingStarredChats, setIsShowingStarredChats] = useState(true);
//   const [showAllStarredChats, setShowAllStarredChats] = useState(false);
//   const [isNewChatStarted, setIsNewChatStarted] = useState(false);
//   const modelButtonRef = useRef<HTMLButtonElement>(null);
//   const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
//   const [isShowingProjects, setIsShowingProjects] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isProjectListOpen, setIsProjectListOpen] = useState(false);
//   const [isSearchEnabled, setIsSearchEnabled] = useState(false);
//   const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false);



//   // Add new states
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isProjectChatListOpen, setIsProjectChatListOpen] = useState(false);
//   // Add new state for collapsed projects
//   const [collapsedProjects, setCollapsedProjects] = useState<{ [key: string]: boolean }>({});
//   // Add new states for delete confirmation
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{
//     isOpen: boolean;
//     itemId: string;
//     itemType: 'chat' | 'project';
//     projectId?: string;
//   }>({
//     isOpen: false,
//     itemId: '',
//     itemType: 'chat',
//   });

//   const models = [
//     { id: "gpt4", name: "GPT-4", icon: <Brain size={ 18} /> },
//   { id: "claude", name: "Claude 3", icon: <MessageSquare size={ 18 } /> },
// { id: "nextchat", name: "NextChat", icon: <Bot size={ 18 } /> },
// { id: "gemini", name: "Gemini", icon: <Sparkles size={ 18 } /> },
// { id: "llama3", name: "LLaMA 3", icon: <Code size={ 18 } /> },
// { id: "mistral", name: "Mistral", icon: <Settings size={ 18 } /> },
// { id: "palm2", name: "PaLM 2", icon: <Cpu size={ 18 } /> }, 
//   ];

// const toggleDarkMode = () => {
//   setIsDarkMode(prev => !prev);
// };

// const loadChatHistory = async (email: string, chatId?: string) => {
//   try {
//     setIsLoadingHistory(true);
//     const history = await getChatHistory(email, chatId);
    
//     if (history && Array.isArray(history.messages)) {
//       const formattedMessages: Message[] = history.messages.map((msg: any) => ({
//         id: msg.id || `msg_${Date.now()}_${Math.random()}`,
//         content: msg.content,
//         type: msg.role === 'assistant' ? 'bot' : 'user',
//         timestamp: new Date(msg.timestamp),
//         status: 'sent'
//       }));
      
//       // Update current chat with the loaded messages
//       if (chatId) {
//         setCurrentChat(prev => prev ? {
//           ...prev,
//           messages: formattedMessages
//         } : null);
//       }
      
//       setChatHistory(formattedMessages);
//     }
//   } catch (error) {
//     console.error('Error loading chat history:', error);
//     // Show error message to user
//     setErrorMessage('Failed to load chat history');
//   } finally {
//     setIsLoadingHistory(false);
//   }
// };

// interface Chat {
//   id: string; // Make id required
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string;
// }

// const handleNewChat = () => {
//   const newChat: Chat = {
//     id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Ensure unique ID
//     title: 'New Chat',
//     createdAt: new Date(),
//     messages: [],
//     isEditing: false
//   };

//   // Add the new chat to the chats array
//   setChats(prev => [newChat, ...prev]);

//   // Reset all chat-related states
//   setCurrentChat(newChat);
//   setMessages([]);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(true);
//   setActiveChat(newChat.id);
//   setHasMessages(false);

//   // Clear any active states
//   setActiveFilePreview(null);
//   setIsGenerating(false);
//   setIsMicActive(false);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update handleChatSelect to handle initial message
// const handleChatSelect = (chat: Chat) => {
//   if (currentChat?.id === chat.id) return;

//   setCurrentChat(chat);
//   setMessages(chat.messages);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(false); // Reset new chat state

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// const handleSearchToggle = () => {
//   setIsSearchEnabled((prev) => !prev);
// };


// // Add chat title editing functionality
// const handleChatTitleEdit = (chatId: string, newTitle: string) => {
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       const updatedChat = { ...chat, title: newTitle, isEditing: false };
//       if (currentChat?.id === chatId) {
//         setCurrentChat(updatedChat);
//       }
//       return updatedChat;
//     }
//     return chat;
//   }));
// };

// const handleChatTitleEditStart = (chatId: string) => {
//   setChats(prev => prev.map(chat => ({
//     ...chat,
//     isEditing: chat.id === chatId
//   })));
// };

// const handleHomeClick = (e: React.MouseEvent) => {
//   e.preventDefault();
//   setShowGreeting(true);
//   setIsChatActive(false);
//   setMessages([]);
//   setActiveChat(null);
//   setIsNewChatStarted(false);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update delete handlers to show confirmation first
// const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: chatId,
//     itemType: 'chat'
//   });
// };

// const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: projectId,
//     itemType: 'project'
//   });
// };

// const handleDeleteProjectChat = (projectId: string, chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: chatId,
//     projectId: projectId,
//     itemType: 'chat'
//   });
// };

// const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       return { ...chat, isStarred: !chat.isStarred };
//     }
//     return chat;
//   }));
// };

// useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };
//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, []);

// useEffect(() => {
//   if (messagesEndRef.current) {
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   }
// }, [messages]);

// useEffect(() => {
//   if (chartRef.current && activeTab === 'analysis') {
//     const chart = echarts.init(chartRef.current);
//     const option = {
//       animation: false,
//       title: {
//         text: 'Message Analysis',
//         textStyle: { color: '#e5e7eb' }
//       },
//       tooltip: {
//         trigger: 'axis'
//       },
//       xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         axisLabel: { color: '#e5e7eb' }
//       },
//       yAxis: {
//         type: 'value',
//         axisLabel: { color: '#e5e7eb' }
//       },
//       series: [{
//         data: [120, 200, 150, 80, 70, 110, 130],
//         type: 'line',
//         smooth: true,
//         color: '#818cf8'
//       }]
//     };
//     chart.setOption(option);
//   }
// }, [activeTab]);

// useEffect(() => {
//   if (!isSidebarOpen && !isHovered) {
//     setIsSearchActive(false);
//   }
// }, [isSidebarOpen, isHovered]);

// const resetTextAreaHeight = () => {
//   const textarea = document.querySelector('textarea');
//   if (textarea) {
//     textarea.style.height = '56px';
//   }
// };

// const [isTransitioning, setIsTransitioning] = useState(false);

// // Update the handleSendMessage function
// const handleSendMessage = async () => {
//   if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;

//   setHasMessages(true);

//   if (isMicActive) {
//     setIsMicActive(false);
//   }

//   setIsCleanView(true);

//   let chatToUse = currentChat;

//   if (!chatToUse) {
//     // Create new chat with temporary title
//     chatToUse = {
//       id: Date.now().toString(),
//       title: 'New Chat', // We'll update this after sending the first message
//       createdAt: new Date(),
//       messages: []
//     };
//     setCurrentChat(chatToUse);
//     setChats(prev => [chatToUse, ...prev]);
//   }

//   setShowGreeting(false);
//   setIsChatActive(true);

//   const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//   const newMessage: Message = {
//     id: messageId,
//     content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//     type: 'user',
//     timestamp: new Date(),
//     status: 'sending',
//     file: activeFilePreview || undefined
//   };



//   try {
//     const updatedChat = {
//       ...chatToUse,
//       messages: [...chatToUse.messages, newMessage]
//     };

//     // Update chat title if this is the first message
//     if (updatedChat.messages.length === 1) {
//       // Truncate long messages and clean up multiline content
//       const cleanContent = inputText
//         .split('\n')[0] // Take only the first line
//         .trim()
//         .substring(0, 30); // Take first 30 characters

//       const newTitle = cleanContent + (cleanContent.length >= 30 ? '...' : '');
//       updatedChat.title = newTitle;
//     }

//     if (chatToUse.projectId) {
//       setProjects(prev => prev.map(project => {
//         if (project.id === chatToUse.projectId) {
//           return {
//             ...project,
//             chats: project.chats.map(chat =>
//               chat.id === chatToUse.id ? updatedChat : chat
//             )
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Update the chat in the main chats array
//       setChats(prev => prev.map(chat =>
//         chat.id === chatToUse.id ? updatedChat : chat
//       ));
//     }

//     setCurrentChat(updatedChat);
//     setMessages(updatedChat.messages);
//     setInputText('');
//     resetTextAreaHeight();
//     setIsGenerating(true);

//     // Add this helper function to detect image URLs in the response
//     const isImageUrl = (text: string) => {
//       return text.match(/https?:\/\/res\.cloudinary\.com\/[^\s]+\.(jpg|jpeg|png|gif)/i);
//     };

//     // Call the updated API with chat ID and username
//     const aiResponseText = await generateResponse(inputText, chatToUse.id, userProfile?.name || 'user', isSearchEnabled);


//     const sentMessage = { ...newMessage, status: 'sent' };

//     // Check if the response contains an image URL
//     const imageMatch = isImageUrl(aiResponseText);

//     let aiResponse: Message;
//     if (imageMatch) {
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: '',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent',
//         file: {
//           name: 'generated-image.png',
//           type: 'image/png',
//           url: imageMatch[0] // Use the matched URL
//         }
//       };
//     } else {
//       // Regular text response
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponseText,
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };
//     }

//     const finalChat = {
//       ...updatedChat,
//       messages: [
//         ...updatedChat.messages.map(msg =>
//           msg.id === newMessage.id ? sentMessage : msg
//         ),
//         aiResponse
//       ]
//     };

//     setChats(prev => prev.map(c =>
//       c.id === finalChat.id ? finalChat : c
//     ));
//     setCurrentChat(finalChat);
//     setMessages(finalChat.messages);
//     setActiveFilePreview(null);

//   } catch (error) {
//     console.error('Failed to send message:', error);
//     const errorMessage = { ...newMessage, status: 'error' };

//     const errorChat = {
//       ...currentChat,
//       messages: currentChat?.messages.map(msg =>
//         msg.id === newMessage.id ? errorMessage : msg
//       ) || []
//     };

//     setChats(prev => prev.map(c =>
//       c.id === currentChat?.id ? errorChat : c
//     ));
//     setCurrentChat(errorChat);
//     setMessages(errorChat.messages);
//   } finally {
//     setIsGenerating(false);
//   }
// };

// const renderMessageStatus = (status: Message['status']) => {
//   switch (status) {
//     case 'sending':
//       return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2" > </i>;
//     case 'sent':
//       return <i className="fas fa-check text-green-500 ml-2" > </i>;
//     case 'error':
//       return <i className="fas fa-exclamation-circle text-red-500 ml-2" > </i>;
//     default:
//       return null;
//   }
// };

// const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(true);
// };

// const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
// };

// const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
//   const files = e.dataTransfer.files;
//   handleFiles(files);
// };

// const handleFiles = (files: FileList) => {
//   Array.from(files).forEach(file => {
//     const fileUrl = URL.createObjectURL(file);
//     const filePreview = {
//       name: file.name,
//       type: file.type,
//       url: fileUrl
//     };
//     setActiveFilePreview(filePreview);

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: `Attached: ${file.name}`,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sent',
//       file: filePreview
//     };

//     if (currentChat) {
//       const updatedChat = {
//         ...currentChat,
//         messages: [...currentChat.messages, newMessage]
//       };

//       setChats(prev => prev.map(chat =>
//         chat.id === currentChat.id ? updatedChat : chat
//       ));
//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//     }
//   });

//   setIsUploadModalOpen(false);
// };

// const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.files) {
//     handleFiles(e.target.files);
//   }
// };

// useEffect(() => {
//   const storedUser = localStorage.getItem('user');
//   const authStatus = localStorage.getItem('isAuthenticated');

//   if (storedUser && authStatus === 'true') {
//     setUserProfile(JSON.parse(storedUser));
//     setIsAuthenticated(true);
//   }
// }, []);

// const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
//   setLoading(true);
//   setFormError('');
//   setFormSuccess('');

//   try {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     const userData = {
//       name: data.name || data.email.split('@')[0],
//       email: data.email
//     };

//     if (isLogin) {
//       setFormSuccess('Successfully logged in!');
//       handleAuthSuccess(userData);
//     } else {
//       setFormSuccess('Account created successfully!');
//       handleSignupSuccess(userData);
//     }

//     // ✅ Store in localStorage
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('isAuthenticated', 'true');

//     // ✅ Immediately update global state
//     setUserProfile(userData);  // Ensures UI update
//     setIsAuthenticated(true);  // Forces re-render

//   } catch (error) {
//     setFormError('Authentication failed. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };
// // Add this new function to toggle between login and signup
// const toggleAuthMode = () => {
//   setIsLogin(!isLogin);
//   setFormError('');
//   setFormSuccess('');
// };

// const handleIntroductionComplete = (name: string) => {
//   setUserName(name);
//   setShowIntroduction(false);
//   setShowGreeting(false);
// };

// const handleSignupSuccess = (userData: { name: string; email: string }) => {
//   handleAuthSuccess(userData);
//   setShowIntroduction(true);
// };

// const handleAuthSuccess = (userData: { name: string; email: string }) => {
//   setIsAuthenticated(true);
//   setUserProfile(userData);
//   setIsLoginModalOpen(false);
//   setChats([]);
//   setMessages([]);
//   setCurrentChat(null);
//   setShowGreeting(true);
// };

// const handleLogout = () => {
//   // Remove stored user session data
//   localStorage.removeItem("sessionData");
//   localStorage.removeItem("user");
//   localStorage.removeItem("isAuthenticated");

//   // Update state to reflect logout
//   setUserProfile({ name: "" });
//   setIsAuthenticated(false);

//   // Redirect or refresh to reflect logout
//   window.location.reload();
// };

// useEffect(() => {
//   const sessionData = localStorage.getItem("sessionData");
//   if (sessionData) {
//     const parsedData = JSON.parse(sessionData);
//     setIsAuthenticated(true);
//     setUserProfile({
//       name: parsedData.username,
//       email: parsedData.username || 'user@example.com'
//     });
//   }
// }, []);
// // Update useEffect for fetching chats in App.tsx
// // Update useEffect for fetching chats
// // Update useEffect for fetching chats
// useEffect(() => {
//   if (userProfile?.email) {
//     fetchUserChats(userProfile.email)
//       .then((response) => {
//         // Check if response has the expected structure
//         if (response && response.chats && Array.isArray(response.chats)) {
//           // Transform the API response into the expected Chat format
//           const formattedChats: Chat[] = response.chats.map(chatData => ({
//             id: chatData.chat_id,
//             title: chatData.first_message || 'New Chat', // Use first message as title, fallback to 'New Chat'
//             createdAt: new Date(chatData.timestamp),
//             messages: [{
//               id: `msg_${Date.now()}_${Math.random()}`,
//               content: chatData.first_message,
//               type: 'user',
//               timestamp: new Date(chatData.timestamp),
//               status: 'sent'
//             }],
//             isStarred: false,
//             isEditing: false
//           }));

//           // Sort chats by timestamp, most recent first
//           formattedChats.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
          
//           setChats(formattedChats);
//         } else {
//           console.error('Invalid chat data format:', response);
//           setChats([]);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching chats:', error);
//         setChats([]);
//       });
//   }
// }, [userProfile]);

// // Remove the import for getChatHistory since we're not using it anymore
// // import { getChatHistory } from './services/api';

// const Greeting = React.memo(() => {
//   const [displayText, setDisplayText] = useState('');
//   const hour = new Date().getHours();
//   const greetingText = hour >= 0 && hour < 12
//     ? 'Good morning'
//     : hour >= 12 && hour < 16
//       ? 'Good afternoon'
//       : 'Good evening';

//   useEffect(() => {
//     if (!hasGreetingPlayed) {
//       // Only add comma if there's a username
//       const fullText = userProfile?.name
//         ? `${greetingText}, ${userProfile.name}`
//         : greetingText;

//       let timeouts: NodeJS.Timeout[] = [];

//       [...fullText].forEach((char, index) => {
//         const timeout = setTimeout(() => {
//           setDisplayText(prev => prev + char);
//           if (index === fullText.length - 1) {
//             setHasGreetingPlayed(true);
//           }
//         }, 100 * index);
//         timeouts.push(timeout);
//       });

//       return () => timeouts.forEach(clearTimeout);
//     } else {
//       // Only add comma if there's a username
//       const fullText = userProfile?.name
//         ? `${greetingText}, ${userProfile.name}`
//         : greetingText;
//       setDisplayText(fullText);
//     }
//   }, [greetingText, userProfile?.name]);

//   return (
//     <h1 className= "text-4xl font-light text-center" >
//     { displayText }
//     </h1>
//     );
//   });

// const handleVoiceTranscript = (text: string) => {
//   setInputText(text);
// };

// const handleVoiceStateChange = (isActive: boolean) => {
//   setIsMicActive(isActive);
// };

// const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//   setSelectedLanguage(language);

//   if (currentChat && currentChat.messages.length > 0) {
//     try {
//       setIsGenerating(true);

//       const translatedMessages = await Promise.all(
//         currentChat.messages.map(async (msg) => {
//           const translatedContent = await translateText(msg.content, language.name);
//           return {
//             ...msg,
//             content: translatedContent
//           };
//         })
//       );

//       const updatedChat = {
//         ...currentChat,
//         messages: translatedMessages
//       };

//       setChats(prev => prev.map(chat =>
//         chat.id === currentChat.id ? updatedChat : chat
//       ));
//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//     } catch (error) {
//       console.error('Translation failed:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   }
// };

// const parseMessageContent = (content: string) => {
//   const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//   const parts = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = codeBlockRegex.exec(content)) !== null) {
//     if (match.index > lastIndex) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex, match.index)
//       });
//     }

//     parts.push({
//       type: 'code',
//       language: match[1] || 'plaintext',
//       content: match[2].trim()
//     });

//     lastIndex = match.index + match[0].length;
//   }


//   if (lastIndex < content.length) {
//     parts.push({
//       type: 'text',
//       content: content.slice(lastIndex)
//     });
//   }

//   return parts.length > 0 ? parts : [{ type: 'text', content }];
// };

// const handleCodeClick = (content: string, language: string) => {
//   setSelectedCode({ content, language });
//   setIsInfoPanelOpen(true);
// };

// const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   const textarea = e.target;
//   const value = textarea.value;

//   if (!value.trim()) {
//     textarea.style.height = '56px';
//   } else {
//     textarea.style.height = 'inherit';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//   }

//   setInputText(value);
// };

// const handleCodeBlockClick = (content: string, language: string) => {
//   setSelectedCodeBlock({
//     content: content.trim(),
//     language: language || 'plaintext'
//   });
//   setIsCodeSliderOpen(true);
// };

// const handleModelSelect = (modelName: string) => {
//   setSelectedModel(modelName);
//   setIsModelDropdownOpen(false);
// };

// const ModelDropdown = ({ onSelect }: { onSelect: (model: string) => void }) => {
//   return (
//     <div 
//         className= {`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-n z-[9999] ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
//       }`
// }
//       >
// {
//   models.map((model) => (
//     <button
//             key= { model.id }
//             onClick = {() => onSelect(model.name)}
// className = {`w-full flex items-center px-4 py-3 text-left ${isDarkMode
//   ? 'hover:bg-gray-600 text-gray-200'
//   : 'hover:bg-gray-50 text-gray-700'
//   } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}
//           >
//   <i className={
//   `fas ${model.icon} mr-3 ${selectedModel === model.name ? 'text-blue-500' : 'text-gray-400'
//     }`
// }> </i>
//   < span > { model.name } </span>
//   </button>
//         ))}
// </div>
//     );
//   };

// const handleActionCapsuleClick = (action: string, suggestion?: string) => {
//   let promptText = '';

//   if (suggestion) {
//     // If a suggestion was clicked, use it directly
//     switch (action) {
//       case 'explain':
//         promptText = `${suggestion}: `;
//         break;
//       case 'summarize':
//         promptText = `${suggestion} for: `;
//         break;
//       case 'translate':
//         promptText = `${suggestion}: `;
//         break;
//       case 'improve':
//         promptText = `${suggestion}: `;
//         break;
//       case 'code':
//         promptText = `${suggestion}: `;
//         break;
//     }
//   } else {
//     // Default prompts when capsule is clicked
//     switch (action) {
//       case 'explain':
//         promptText = 'Please explain this in detail: ';
//         break;
//       case 'summarize':
//         promptText = 'Please provide a summary of: ';
//         break;
//       case 'translate':
//         promptText = 'Please translate this to English: ';
//         break;
//       case 'improve':
//         promptText = 'Please improve the writing of this text: ';
//         break;
//       case 'code':
//         promptText = 'Please generate code for: ';
//         break;
//     }
//   }
//   setInputText(promptText);
// };

// // Update the handlers for toggling sections
// const handleToggleStarredChats = () => {
//   if (!isShowingStarredChats) {
//     setIsShowingChats(false); // Hide recent chats when showing starred
//   }
//   setIsShowingStarredChats(!isShowingStarredChats);
// };

// const handleToggleRecentChats = () => {
//   if (!isShowingChats) {
//     setIsShowingStarredChats(false); // Hide starred chats when showing recent
//   }
//   setIsShowingChats(!isShowingChats);
// };

// // Add new handler for project click
// const handleProjectClick = (project: Project) => {
//   setSelectedProject(project);
//   setIsProjectChatListOpen(true);
// };

// // Modify handleAddProject to include name editing
// const handleAddProject = () => {
//   const newProject: Project = {
//     id: `proj_${Date.now()}`,
//     name: `New Project`,
//     createdAt: new Date(),
//     chats: [],
//     isEditing: true // Start in editing mode
//   };
//   setProjects(prev => [newProject, ...prev]);
// };

// // Add new handlers for project management
// const handleProjectNameEdit = (projectId: string, newName: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         name: newName,
//         isEditing: false
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectNameEditStart = (projectId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return { ...project, isEditing: true };
//     }
//     return { ...project, isEditing: false };
//   }));
// };

// // Update handleNewProjectChat
// const handleNewProjectChat = (projectId: string) => {
//   const newChat: Chat = {
//     id: Date.now().toString(),
//     title: 'New Chat', // This will be updated with first message
//     createdAt: new Date(),
//     messages: [],
//     projectId: projectId,
//     isEditing: false // Don't start in editing mode since title will update automatically
//   };

//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: [newChat, ...project.chats]
//       };
//     }
//     return project;
//   }));

//   setCurrentChat(newChat);
//   setMessages([]);
//   setIsNewChatStarted(true);
//   setShowGreeting(false);
//   setIsChatActive(true);
// };

// // Add project chat management functions
// const handleProjectChatTitleEdit = (projectId: string, chatId: string, newTitle: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => {
//           if (chat.id === chatId) {
//             const updatedChat = { ...chat, title: newTitle, isEditing: false };
//             if (currentChat?.id === chatId) {
//               setCurrentChat(updatedChat);
//             }
//             return updatedChat;
//           }
//           return chat;
//         })
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectChatTitleEditStart = (projectId: string, chatId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => ({
//           ...chat,
//           isEditing: chat.id === chatId
//         }))
//       };
//     }
//     return project;
//   }));
// };

// // Add handler for toggling project collapse
// const handleProjectCollapse = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setCollapsedProjects(prev => ({
//     ...prev,
//     [projectId]: !prev[projectId]
//   }));
// };

// // Add new handler for project deletion
// const handleConfirmDelete = () => {
//   const { itemId, itemType, projectId } = deleteConfirmation;

//   if (itemType === 'project') {
//     // Handle project deletion
//     if (currentChat?.projectId === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//     setProjects(prev => prev.filter(project => project.id !== itemId));
//   } else {
//     // Handle chat deletion
//     if (projectId) {
//       // Delete project chat
//       setProjects(prev => prev.map(project => {
//         if (project.id === projectId) {
//           return {
//             ...project,
//             chats: project.chats.filter(chat => chat.id !== itemId)
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Delete regular chat
//       setChats(prev => prev.filter(chat => chat.id !== itemId));
//     }

//     if (currentChat?.id === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   }

//   setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
// };

// return (
//   <div className= {`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//     <div className={
//   `flex h-screen overflow-hidden ${isDarkMode
//     ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
//     : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//     }`
// }>
//   {/* Fixed brand text container */ }
//   < div className = {`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//     }`}>
//       <span 
//             onClick={ handleHomeClick }  // Add this line
// className = "text-3xl font-medium cursor-pointer bg-clip-text text-transparent hover:opacity-80 transition-opacity" // Add hover effect
// style = {{
//   background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//     WebkitBackgroundClip: 'text',
//       textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//         WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//           letterSpacing: '0.5px'
// }}
//           >
//   Hind AI
//     </span>
//     </div>

// {/* Sidebar */ }
// <div 
//           className={
//   `${isSidebarOpen ? 'w-72' : 'w-16'
//     } fixed md:relative h-full transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//     } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`
// }
//         >
//   {/* Top section - only toggle button */ }
//   < div className = "flex items-center p-4" >
//     <button 
//               onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
// className = "text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//   >
//   <i className={ `fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}` }> </i>
//     </button>
//     </div>

// {/* Main content with icons-only when collapsed */ }
// <nav className="flex-1 px-2" >
//   <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
// onClick = { handleNewChat }
//   >
//   <i className="fa-solid fa-plus w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       New Chat
//         </span>
//         </button>

// {/* Search section */ }
// <div className="px-2 mb-4" >
//   {
//     isSidebarOpen?(
//                 <div className = "relative" >
//         <input
//                     type="search"
//       placeholder = "Search conversations..."
//                     className = {`w-full pl-9 pr-4 py-2 ${isDarkMode
//         ? 'bg-gray-700 text-gray-200 placeholder-gray-400'
//         : 'bg-gray-100 text-gray-800'
//         } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//   />
//   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" > </i>
//     </div>
//               ) : (
//   <button
//                   onClick= {() => setIsSidebarOpen(true)}
// className = {`w-full p-2 rounded-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
//   }`}
//                 >
//   <i className="fa-solid fa-magnifying-glass" title = "Search" > </i>
//     </button>
//               )}
// </div>

// {/* Projects Section */ }
// <div className="mb-2 pl-4" > {/* Increased pl-2 to pl-4 */ }
//   < div className = {`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//     <div className="flex items-center flex-1" >
//       <i 
//                     className="fa-solid fa-folder text-blue-400 w-8"
// title = "Projects"
// onClick = {() => setIsProjectListOpen(true)}
// style = {{ cursor: 'pointer' }}
//                   > </i>
// {
//   isSidebarOpen && (
//     <div className="flex items-center flex-1" >
//       <span 
//                         className="text-sm font-medium ml-1"
//   onClick = {() => setIsProjectListOpen(true)
// }
// style = {{ cursor: 'pointer' }}
//                       >
//   Projects
//   </span>
//   < button
// onClick = { handleAddProject }
// className = {`ml-4 p-2 rounded-lg transition-colors ${  // Increased ml-3 to ml-4 and p-1.5 to p-2
//   isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//   }`}
//                       >
//   <i className="fa-solid fa-plus text-xs" > </i>
//     </button>
//     </div>
//                   )}
// </div>
//   </div>
// {
//   isSidebarOpen && projects.length > 0 && (
//     <div className="space-y-1 ml-3" > {/* Increased ml-2 to ml-3 */ }
//   {
//     projects.map(project => (
//       <div
//                       key= { project.id }
//                       className = {`group px-2 py-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//         }`}
//                     >
//     <div className="flex items-center justify-between" >
//       <div className="flex items-center flex-1 min-w-0" >
//         <div className="flex items-center" >
//           <button
//                               onClick={ (e) => handleProjectCollapse(project.id, e) }
//   className = {`mr-1 p-1 rounded-lg transition-transform duration-200 ${  // Added mr-1 for right margin
//     isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//     }`
// }
// style = {{ width: '20px' }}  // Fixed width for consistent spacing
//                             >
//   <i className={
//   `fas fa-chevron-right text-xs text-gray-400 transform transition-transform duration-200 ${!collapsedProjects[project.id] ? 'rotate-90' : ''
//     }`
// }> </i>
//   </button>
//   < i className = "fa-regular fa-folder-open w-8 text-blue-400 ml-1" > </i>  {/ * Added ml - 1 */}
// </div>
// {
//   project.isEditing ? (
//     <input
//                               type= "text"
//                               defaultValue = { project.name }
//   autoFocus
//   onBlur = {(e) => handleProjectNameEdit(project.id, e.target.value)
// }
// onKeyDown = {(e) => {
//   if (e.key === 'Enter') {
//     handleProjectNameEdit(project.id, e.currentTarget.value);
//   }
// }}
// className = {`text-sm px-2 py-1 rounded flex-1 mr-2 ${isDarkMode
//   ? 'bg-gray-600 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                             />
//                           ) : (
//   <span 
//                               className= "text-sm truncate flex-1"
// onDoubleClick = {() => handleProjectNameEditStart(project.id)}
//                             >
//   { project.name }
//   </span>
//                           )}
// </div>
//   < div className = "flex items-center space-x-2 opacity-0 group-hover:opacity-100" >
//     <button
//                             onClick={ () => handleNewProjectChat(project.id) }
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                           >
//   <i className="fas fa-plus-circle" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteProject(project.id, e)}
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                           >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </div>
// {/* Project Chats */ }
// {
//   project.chats.length > 0 && !collapsedProjects[project.id] && (
//     <div className="ml-8 mt-2 space-y-1" >
//     {
//       project.chats.map((chat, index) => (
//         <div
//                               key= { chat.id }
//                               onClick = {() => handleChatSelect(chat)}
//   className = {`group flex items-center justify-between px-2 py-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
//     }`
// }
//                             >
//   <div className="flex items-center space-x-2 flex-1 min-w-0" >
//     <i className="fas fa-comment-alt text-xs text-gray-400" > </i>
// {
//   chat.isEditing ? (
//     <input
//                                     type= "text"
//                                     defaultValue = { chat.title }
//   autoFocus
//   onClick = { e => e.stopPropagation() }
//   onBlur = {(e) => handleProjectChatTitleEdit(project.id, chat.id, e.target.value)
// }
// onKeyDown = {(e) => {
//   if (e.key === 'Enter') {
//     handleProjectChatTitleEdit(project.id, chat.id, e.currentTarget.value);
//   }
// }}
// className = {`text-sm px-2 py-1 rounded flex-1 ${isDarkMode
//   ? 'bg-gray-700 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                                   />
//                                 ) : (
//   <span 
//                                     className= "text-sm truncate"
// onDoubleClick = {(e) => {
//   e.stopPropagation();
//   handleProjectChatTitleEditStart(project.id, chat.id);
// }}
//                                   >
//   { chat.title }
//   </span>
//                                 )}
// </div>
//   < div className = "flex items-center space-x-1 opacity-0 group-hover:opacity-100" >
//     <button
//                                   onClick={
//   (e) => {
//     e.stopPropagation();
//     handleProjectChatTitleEditStart(project.id, chat.id);
//   }
// }
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                                 >
//   <i className="fas fa-edit text-xs" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteProjectChat(project.id, chat.id, e)}
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                                 >
//   <i className="fas fa-trash text-xs" > </i>
//     </button>
//     </div>
//     </div>
//                           ))}
// </div>
//                       )}
// </div>
//                   ))}
// </div>
//               )}
// </div>

// {/* Starred Chats Section */ }
// <div className="mb-4" >
//   <div className={ `flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}` }>
//     <button
//                   onClick={
//   () => {
//     if (!isSidebarOpen) {
//       setChatListInitialTab('starred');
//       setIsChatListOpen(true);
//     }
//   }
// }
// className = "relative"
//   >
//   <i className="fa-solid fa-star text-yellow-500 w-8" title = "Starred chats" > </i>
//     </button>
// { isSidebarOpen && <span className="text-sm font-medium" > Starred Chats </span> }
// </div>
//   < div className = "space-y-1" >
//   {
//     chats
//                   .filter(chat => chat.isStarred)
//       .map((chat) => (
//         <div
//                       key= {`starred_${chat.id}`}
// className = {`group flex items-center p-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//   }`}
// onClick = {() => handleChatSelect(chat)}
//                     >
//   <i className="fas fa-comment-alt w-8 text-yellow-500/80" > </i>
// {
//   isSidebarOpen && (
//     <>
//     <span className="ml-2 truncate flex-1" > { chat.title } </span>
//       < button
//   onClick = {(e) => handleStarChat(chat.id, e)
// }
// className = "ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//   >
//   <i className="fas fa-star text-yellow-500" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = {`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                           >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </>
//                       )}
// </div>
//                   ))}
// </div>
//   </div>

// {/* All Chats Section */ }
// <div className={ `flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}` }>
//   <button
//                 onClick={
//   () => {
//     if (!isSidebarOpen) {
//       setChatListInitialTab('all');
//       setIsChatListOpen(true);
//     }
//   }
// }
// className = "relative"
//   >
//   <i className="fa-solid fa-comments w-8"title = "All Chats" > </i>
//     </button>
// { isSidebarOpen && <span className="text-sm font-medium" > All Chats </span> }
// </div>

// {/* Chat list section */ }
// <div className="space-y-1" >
// {
//   chats.filter(chat => !chat.isStarred).map((chat, index) => (
//     <div
//     key= { chat.id || `all_${index}` } // Use index as fallback if chat.id is undefined
//     className = {`group flex items-center p-2 rounded-lg cursor-pointer`}
// onClick = {() => handleChatSelect(chat)}
//   >
//   <i className="fa-regular fa-comment w-8" > </i>
// {
//   isSidebarOpen && (
//     <>
//     {
//       chat.isEditing ? (
//         <input
//                           type= "text"
//                           defaultValue={ chat.title }
//                           autoFocus
//                           onClick={ e => e.stopPropagation() }
//                           onBlur={(e) => handleChatTitleEdit(chat.id, e.target.value)
//     }
//                           onKeyDown = {(e) => {
//     if (e.key === 'Enter') {
//       handleChatTitleEdit(chat.id, e.currentTarget.value);
//     }
//   }
// }
// className = {`text-sm px-2 py-1 rounded flex-1 mr-2 ${isDarkMode
//   ? 'bg-gray-600 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                         />
//                       ) : (
//   <span 
//                           className= "ml-2 truncate flex-1"
// onDoubleClick = {(e) => {
//   e.stopPropagation();
//   handleChatTitleEditStart(chat.id);
// }}
//                         >
//   { chat.title }
//   </span>
//                       )}
// <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100" >
//   <button
//                           onClick={
//   (e) => {
//     e.stopPropagation();
//     handleChatTitleEditStart(chat.id);
//   }
// }
// className = {`p-1 rounded-full transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                         >
//   <i className="fas fa-edit" > </i>
//     </button>
//     < button
// onClick = {(e) => handleStarChat(chat.id, e)}
// className = {`p-1 rounded-full transition-colors ${chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//   }`}
//                         >
//   <i className="fas fa-star" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = "p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//   >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </>
//                   )}
// </div>
//               ))}
// </div>
//   </nav>

// {/* Auth section at bottom */ }
// <div className="mt-auto p-2 border-t border-gray-700/50" >
// {
//   isAuthenticated?(
//               <div className = "space-y-1" >
//       <div className="flex items-center p-2 rounded-lg">
//   <i className="fa-solid fa-user w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       { userProfile?.name }
//       </span>
//       </div>
//       < button
// onClick = { handleLogout }
// className = "w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//   >
//   <i className="fa-solid fa-right-from-bracket w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       Logout
//       </span>
//       </button>
//       </div>
//             ) : (
//   <div className= "space-y-1" >
//   <button className="w-full flex items-center p-2" onClick = {() => setIsLoginModalOpen(true)}>
//     <i className="fa-solid fa-right-to-bracket w-8" > </i>
//       < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//         Login
//         </span>
//         </button>
//         < button
// className = "w-full flex items-center p-2 text-indigo-500"
// onClick = {() => {
//   setIsLogin(false);

//   setTimeout(() => setIsLoginModalOpen(true), 50);
// }}
//                 >
//   <i className="fa-solid fa-user-plus w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       Sign Up
//         </span>
//         </button>
//         </div>
//             )}

// <button 
//               onClick={ toggleDarkMode }
// className = "w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//   >
//   <i className={ `fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8` }> </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       { isDarkMode? 'Light Mode': 'Dark Mode' }
//       </span>
//       </button>
//       </div>
//       </div>

//       < div className = "flex-1 flex flex-col relative pt-16 pl-16" >
//         <div className={
//   `flex-1 overflow-y-auto transition-all duration-300 ${isCodeSliderOpen ? 'lg:pr-[50%]' : ''
//     }`
// }>
//   {/* Main chat section that shifts left when slider opens */ }
//   < div className = {`
//               w-full transition-all duration-300 
//               ${isCodeSliderOpen
//       ? 'lg:max-w-full lg:pr-60' // Add right padding when slider is open
//       : 'max-w-3xl mx-auto'
//     }
//               relative flex flex-col h-full pb-[170px] // Add these styles
//             `}>
//   {/* Chat content */ }
//   < div className = {`w-full ${!isCodeSliderOpen ? 'max-w-3xl mx-auto' : ''} ${hasMessages || isNewChatStarted ? 'flex-1' : ''
//     }`}>
//       { showGreeting && !hasMessages && !isNewChatStarted ? (
//         <div className= "flex justify-center items-center min-h-[200px]" >
//         <Greeting />
//     </div>
//                 ) : (
//   <div className= "flex-1 flex flex-col justify-end" >
//   <div className="flex-1 space-y-4 py-4 px-4 mb-40" >

//   {
//     messages.map((message, index) => (
//       <div
//       key= {`${message.id}_${index}`}
// className = {`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
// style = {{ animationDelay: `${index * 100}ms` }}
//     >



//   <div
//                             className={
//   `max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${message.type === 'user'
//     ? isDarkMode
//       ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//       : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//     : isDarkMode
//       ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//       : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//     }`
// }
// style = {{
//   backdropFilter: 'blur(8px)',
//                             }}
//                           >
//   <div className="flex items-center justify-between mb-1" >
//     <div className="flex items-center" >
//       <i className={ `fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2` }> </i>
//         < span className = "text-sm opacity-75" >
//           { new Date(message.timestamp).toLocaleTimeString() }
//           </span>
//           </div>
// { renderMessageStatus(message.status) }
// </div>


// {
//   message.file && (
//     <div className="mb-2" >
//       {
//         message.file.type.startsWith('image/') ? (
//           <ImagePreview 
//                                     imageUrl= { message.file.url }
//                                     isDarkMode={ isDarkMode }
//                                     fileName={ message.file.name }
//         />
//                                 ) : message.file.type === 'application/pdf' ? (
//           <div className= "flex items-center space-x-2 bg-black/20 rounded-lg p-3" >
//           <i className="fas fa-file-pdf text-2xl text-red-400"> </i>
//             < div className="flex-1 min-w-0" >
//             <div className="truncate"> { message.file.name } </div>
//               < div className="text-sm opacity-75" > PDF Document</ div >
//       </div>
//       < a
//   href = { message.file.url }
//   target = "_blank"
//   rel = "noopener noreferrer"
//   className = "p-2 hover:bg-white/10 rounded-full transition-colors"
//     >
//     <i className="fas fa-external-link-alt" > </i>
//       </a>
//       </div>
//                                 ) : (
//     <div className= "flex items-center space-x-2 bg-black/20 rounded-lg p-3" >
//     <i className="fas fa-file text-2xl text-blue-400" > </i>
//       < div className = "flex-1 min-w-0" >
//         <div className="truncate" > { message.file.name } </div>
//           < div className = "text-sm opacity-75" > Document </div>
//             </div>
//             < a
//   href = { message.file.url }
//   target = "_blank"
//   rel = "noopener noreferrer"
//   className = "p-2 hover:bg-white/10 rounded-full transition-colors"
//     >
//     <i className="fas fa-download" > </i>
//       </a>
//       </div>
//                                 )
// }
// </div>
//                             )}



// <div className="space-y-4" >
// {
//   parseMessageContent(message.content).map((part, index) => (
//     part.type === 'code' ? (
//       <div 
//                                     key= { index }
//                                     onClick = {() => handleCodeBlockClick(part.content, part.language)}
// className = {`cursor-pointer group rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//   }`}
//                                   >
//   <div className={
//   `flex items-center justify-between px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//     }`
// }>
//   <div className="flex items-center space-x-2" >
//     <i className="fas fa-code" > </i>
//       < span className = {`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
//         }`}>
//           { part.language }
//           </span>
//           </div>
//           < div className = {`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               <i className="fas fa-expand-alt" > </i>
//                 </div>
//                 </div>
//                 < div className = "p-4 max-h-60 overflow-hidden relative" >
//                   <pre className="overflow-x-auto" >
//                     <code className={
//   `language-${part.language} ${isDarkMode ? 'text-gray-300' : 'text-gray-800'
//     }`
// }>

//   { part.content }
//   </code>
//   </pre>
//   < div className = {`absolute bottom-0 inset-x-0 h-8 ${isDarkMode
//     ? 'bg-gradient-to-t from-gray-800'
//     : 'bg-gradient-to-t from-gray-50'
//     }`}> </div>
//       </div>
//       </div>
//                                 ) : (
//   <p key= { index } className = "text-base leading-relaxed whitespace-pre-wrap" >
//     { part.content }
//     </p>
//                                 )
//                               ))}
// </div>
//   </div>
//   </div>
//                       ))}
// {
//   isGenerating && (
//     <div className="flex justify-start items-center " >
//       <div className="max-w-[80%] rounded-[20px] p-2 " >
//         <LoadingDots isDarkMode={ isDarkMode } />
//           </div>
//           </div>
//                       )
// }
// <div ref={ messagesEndRef } />
//   </div>
//   </div>  
//                 )}



// {/* Chat input section */ }
// <div className={
//   `
//                                     ${hasMessages || isNewChatStarted
//       ? 'fixed bottom-6 lg:left-16 transition-all duration-300'
//       : 'sticky bottom-6'
//     } w-full px-4
//                                     ${isCodeSliderOpen
//       ? 'lg:left-30 lg:w-[36%] lg:translate-x-0' // Reduced left margin
//       : 'mx-auto'
//     }
//                                   `}>
//   <div className={
//   `
//                                       max-w-4xl
//                                       ${showGreeting
//       ? 'mx-auto'
//       : isCodeSliderOpen
//         ? 'lg:ml-0' // Remove margin when slider is open
//         : 'mx-auto'
//     }
//                                     `}>
//   <div className={
//   `relative rounded-[20px] shadow-lg chat-glow transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'
//     }`
// }>
//   { activeFilePreview && (
//     <div className={
//   `w-full px-4 py-3 ${isDarkMode
//     ? 'bg-gray-700/30'
//     : 'bg-gray-50/50'
//     }`
// }>
//   <div className="flex items-center justify-between" >
//     <div className="flex items-center space-x-3" >
//       <i className={
//   `fas ${activeFilePreview.type.startsWith('image/')
//     ? 'fa-image text-green-400'
//     : activeFilePreview.type === 'application/pdf'
//       ? 'fa-file-pdf text-red-400'
//       : 'fa-file text-blue-400'
//     } text-lg`
// }> </i>
//   < div className = "flex flex-col" >
//     <span className="text-sm font-medium truncate max-w-[200px]" >
//       { activeFilePreview.name }
//       </span>
//       < span className = {`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//         Ready to send
//           </span>
//           </div>
//           </div>
//           < button
// onClick = {() => setActiveFilePreview(null)}
// className = {`p-1.5 rounded-full transition-colors ${isDarkMode
//   ? 'hover:bg-gray-600 text-gray-400'
//   : 'hover:bg-gray-200 text-gray-500'
//   }`}
//                             >
//   <i className="fas fa-times" > </i>
//     </button>
//     </div>
//     </div>
//                       )}

// {
//   messages.length > 0 && messages[messages.length - 1].file && (
//     <div className={
//     `w-full px-4 py-2 ${isDarkMode
//       ? 'bg-gray-700/30'
//       : 'bg-gray-50/50'
//       }`
//   }>
//     <div className="flex items-center justify-between" >
//       <div className="flex items-center space-x-2" >
//         <i className={
//     `fas ${messages[messages.length - 1].file?.type.startsWith('image/')
//       ? 'fa-image text-green-400'
//       : messages[messages.length - 1].file?.type === 'application/pdf'
//         ? 'fa-file-pdf text-red-400'
//         : 'fa-file text-blue-400'
//       }`
//   }> </i>
//     < span className = "text-sm truncate max-w-[200px]" >
//       { messages[messages.length - 1].file?.name }
//       </span>
//       </div>
//       < div className = "flex items-center space-x-2" >
//         <span className={ `text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}` }>
//           File attached
//             </span>
//             < i className = "fas fa-check text-green-400" > </i>
//               </div>
//               </div>
//               </div>
//                       )
// }

// <div className="relative flex flex-col" >
//   <div className="min-h-[56px] max-h-[200px] overflow-hidden" >
//     <textarea
//                             className={
//   `w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${isDarkMode
//     ? 'bg-gray-800 text-gray-200 placeholder-gray-400'
//     : 'bg-white text-gray-800 placeholder-gray-500'
//     }`
// }
// value = { inputText }
// onChange = { handleTextAreaResize }
// placeholder = {`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
// onKeyDown = {(e) => {
//   if (e.key === 'Enter' && !e.shiftKey) {
//     e.preventDefault();
//     if (activeFilePreview || inputText.trim()) {
//       handleSendMessage();
//     }
//   }
// }}
// style = {{
//   minHeight: '56px',
//     maxHeight: '200px'
// }}
//                           />
//   </div>

//   < div className = {`flex items-center justify-between p-4 rounded-b-[20px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'
//     }`}>
//       <div className="flex items-center space-x-2" >
//         <div className="flex items-center space-x-2" >
//           {/* Model container */ }
//           < ModelSelector isDarkMode = { isDarkMode } onModelChange = { setSelectedModel } models = { models } />

//             {/* Language container */ }
//             < div className = "relative inline-block" >
//               <LanguageSelector
//                                      isDarkMode={ isDarkMode }
// onLanguageChange = { handleLanguageChange }
// selectedLanguage = { selectedLanguage }
// className = "z-[9999]"
// dropdownPosition = "absolute"
//   />
//   </div>

// {/* Search button */ }
// <button
//   className={ `flex items-center space-x-2 ${isSearchEnabled ? 'text-blue-500' : 'hover:text-gray-700'}` }
// title = "Search the web"
// onClick = { handleSearchToggle }
//   >
//   <GlobeIcon className="w-5 h-5" />
//     <span>{ isSearchEnabled? ' Search': 'Search' } </span>
//     </button>

//     </div>

//     </div>

//     < div className = "flex items-center space-x-2" >
//       <button
//                               className={
//   `p-2 rounded-full transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-blue-400'
//     : 'text-gray-400 hover:text-indigo-600'
//     }`
// }
// onClick = {() => setIsUploadModalOpen(true)}
//                             >
//   <i className="fas fa-paperclip" > </i>
//     </button>

//     < button
// className = {`p-2 rounded-full transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-400 hover:text-indigo-600'
//   }`}
// onClick = {() => setIsMicActive(!isMicActive)}
//                             >
//   <i className={ `fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}` }> </i>
//     </button>

//     < button
// className = {`rounded-full p-2.5 transition-colors ${isDarkMode
//   ? 'bg-blue-600 hover:bg-blue-700'
//   : 'bg-indigo-600 hover:bg-indigo-700'
//   } text-white`}
// onClick = { handleSendMessage }
//   >
//   <i className="fas fa-paper-plane" > </i>
//     </button>
//     </div>
//     </div>
//     </div>
//     </div>
// {
//   !hasMessages && !isNewChatStarted && (
//     <ActionCapsules 
//                         isDarkMode={ isDarkMode }
//   onActionClick = { handleActionCapsuleClick }
//     />
//                     )
// }
// {
//   !hasMessages && !isNewChatStarted && (
//     <div className="mt-4" >
//       <div className="grid grid-cols-2 gap-4" >
//         {/* Starred Chats Section */ }
//         < div >
//         <div className="flex items-center justify-between mb-3" >
//           <div className="flex items-center" >
//             <i className="fas fa-star mr-2 text-yellow-500" > </i>
//               < span className = {`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`
// }>
//   Starred chats
//     </span>
//     </div>
//     < div className = "flex items-center space-x-2" >
//       <button
//                                   className={
//   `px-2 py-1 text-xs rounded-full transition-colors ${isDarkMode
//     ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
//     : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//     }`
// }
// onClick = { handleToggleStarredChats }
//   >
//   { isShowingStarredChats? 'Hide': 'Show' }
//   </button>
// {
//   isShowingStarredChats && chats.filter(chat => chat.isStarred).length > 3 && (
//     <button
//                                     onClick={
//     () => {
//       setChatListInitialTab('starred');
//       setIsChatListOpen(true);
//     }
//   }
//   className = {`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//     }`
// }
//                                   >
//   View all
//     </button>
//                                 )}
// </div>
//   </div>

//   < div className = {`transition-all duration-300 ${isShowingStarredChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//     }`}>
//       { isShowingStarredChats && (
//         <div className={
//   `${isDarkMode
//     ? 'bg-gray-800/50 shadow-gray-900/20'
//     : 'bg-white/50 shadow-sm'
//     } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`
// }>
// {
//   chats.filter(chat => chat.isStarred).length > 0 ? (
//     <ul className= "space-y-1.5" >
//     {
//       chats
//                                         .filter(chat => chat.isStarred)
//         .slice(0, showAllStarredChats ? undefined : 3)
//         .map(chat => (
//           <li
//                                             key= {`starred_${chat.id}`}
//                                             className={`group ${isDarkMode
//     ? 'hover:bg-gray-700/50 hover:border-gray-600'
//     : 'hover:bg-gray-50 hover:border-gray-100'
//     } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`
// }
// onClick = {() => handleChatSelect(chat)}
//                                           >
//   <div className="flex items-center space-x-2 min-w-0" >
//     <i className="fas fa-comment-alt text-gray-400 flex-shrink-0" > </i>
//       < span className = "truncate" > { chat.title } </span>
//         </div>
//         < div className = "flex items-center space-x-2" >
//           <i className="fas fa-star text-yellow-500 flex-shrink-0" > </i>
//             < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = {`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                                               >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </li>
//                                         ))}
// </ul>
//                                   ) : (
//   <p className= {`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//     No starred chats yet
//       </p>
//                                   )}
// </div>
//                               )}
// </div>
//   </div>

// {/* Recent Chats Section */ }
// <div>
//   <div className="flex items-center justify-between mb-3" >
//     <div className="flex items-center" >
//       <i className="fas fa-history mr-2 text-gray-400" > </i>
//         < span className = {`font-medium ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`}>
//           Recent chats
//             </span>
//             </div>
//             < div className = "flex items-center space-x-2" >
//               <button
//                                   className={
//   `px-2 py-1 text-xs rounded-full transition-colors ${isDarkMode
//     ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
//     : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
//     }`
// }
// onClick = { handleToggleRecentChats }
//   >
//   { isShowingChats? 'Hide': 'Show' }
//   </button>
// {
//   isShowingChats && chats.length > 3 && (
//     <button
//                                     onClick={
//     () => {
//       setChatListInitialTab('all');
//       setIsChatListOpen(true);
//     }
//   }
//   className = {`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
//     }`
// }
//                                   >
//   View all
//     </button>
//                                 )}
// </div>
//   </div>

//   < div className = {`transition-all duration-300 ${isShowingChats ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'
//     }`}>
//       { isShowingChats && (
//         <div className={
//   `${isDarkMode
//     ? 'bg-gray-800/50 shadow-gray-900/20'
//     : 'bg-white/50 shadow-sm'
//     } rounded-xl p-3 backdrop-blur-sm transition-all duration-300`
// }>
// {
//   chats.length > 0 ? (
//     <ul className= "space-y-1.5" >
//     {
//       chats
//       .slice(0, showAllChats ? undefined : 3)
//       .map((chat, index) => (
//         <li
//           key={chat.id ? `recent_${chat.id}` : `recent_fallback_${index}`} // Add fallback using index
//           className={`group ${isDarkMode
//     ? 'hover:bg-gray-700/50 hover:border-gray-600'
//     : 'hover:bg-gray-50 hover:border-gray-100'
//     } border border-transparent rounded-lg p-2 cursor-pointer flex items-center justify-between transition-all duration-200`
// }
// onClick = {() => handleChatSelect(chat)}
//                                           >
//   <div className="flex items-center space-x-2 min-w-0" >
//     <i className="fas fa-comment-alt text-gray-400 flex-shrink-0" > </i>
//       < span className = "truncate" > { chat.title } </span>
//         </div>
//         < div className = "flex items-center space-x-2" >
//           <button
//                                                 onClick={ (e) => handleStarChat(chat.id, e) }
// className = {`flex-shrink-0 transition-colors ${chat.isStarred
//   ? 'text-yellow-500'
//   : 'text-gray-400 hover:text-yellow-500'
//   }`}
//                                               >
//   <i className="fas fa-star" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = {`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                                               >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </li>
//                                         ))}
// </ul>
//                                   ) : (
//   <p className= {`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center py-2`}>
//     No recent chats available
//       </p>
//                                   )}
// </div>
//                               )}
// </div>
//   </div>
//   </div>
//   </div>
// )}
// </div>
//   </div>
//   </div>
// {
//   !hasMessages && (
//     <div className="max-w-[850px] mx-auto mt-6" >
//       { activeTab === 'analysis' && (
//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6" >
//           <h3 className="text-xl font-medium mb-4" > Conversation Analytics </h3>
//             < div ref = { chartRef } style = {{ height: '300px' }
// }> </div>
//   </div>
//                   )}


// </div>
//               )}
// </div>
//   </div>
//   </div>
//   </div>
//   < ChatListPopup
// isOpen = { isChatListOpen }
// onClose = {() => setIsChatListOpen(false)}
// chats = { chats }
// onChatSelect = { handleChatSelect }
// onStarChat = { handleStarChat }
// onDeleteChat = { handleDeleteChat }
// isDarkMode = { isDarkMode }
// initialTab = { chatListInitialTab }
//   />
//   <VoiceInput
//         isActive={ isMicActive }
// onTranscript = { handleVoiceTranscript }
// onStateChange = { handleVoiceStateChange }
// isDarkMode = { isDarkMode }
//   />
//   <InfoPanel
//         isOpen={ isInfoPanelOpen }
// onClose = {() => {
//   setIsInfoPanelOpen(false);
//   setSelectedCode(null);
// }}
// isDarkMode = { isDarkMode }
// code = { selectedCode || undefined}
//       />
//   < CodeSlider
// isOpen = { isCodeSliderOpen }
// onClose = {() => {
//   setIsCodeSliderOpen(false);
//   setSelectedCodeBlock(null);
// }}
// code = { selectedCodeBlock?.content || ''}
// language = { selectedCodeBlock?.language || 'plaintext'}
// isDarkMode = { isDarkMode }
//   />
//   <SlidingAuthForm
//         isOpen={ isLoginModalOpen }
// onClose = {() => setIsLoginModalOpen(false)}
// isLogin = { isLogin }
// setIsLogin = { setIsLogin }
// onToggleMode = { toggleAuthMode }
// onSubmit = { handleAuthSubmit }
// loading = { loading }
// error = { formError }
// success = { formSuccess }
// isDarkMode = { isDarkMode }
// setUserProfile = { setUserProfile }
// setIsAuthenticated = { setIsAuthenticated }
//   />
//   <DeleteConfirmationPopup
//         isOpen={ deleteConfirmation.isOpen }
// onClose = {() => setDeleteConfirmation(prev => ({ ...prev, isOpen: false }))}
// onConfirm = { handleConfirmDelete }
// isDarkMode = { isDarkMode }
// itemType = { deleteConfirmation.itemType }
//   />
//   <ProjectListPopup
//         isOpen={ isProjectListOpen }
// onClose = {() => setIsProjectListOpen(false)}
// projects = { projects }
// onProjectSelect = {(project) => {
//   setSelectedProject(project);
//   setIsProjectListOpen(false);
// }}
// onChatSelect = {(chat) => {
//   handleChatSelect(chat);
//   setIsProjectListOpen(false);
// }}
// onDeleteProject = { handleDeleteProject }
// onDeleteProjectChat = { handleDeleteProjectChat }
// onEditProject = { handleProjectNameEdit }
// onEditProjectStart = { handleProjectNameEditStart }
// onNewProjectChat = {(projectId) => {
//   handleNewProjectChat(projectId);
//   setIsProjectListOpen(false); // Close the popup after creating new chat
// }}
// isDarkMode = { isDarkMode }
//   />
//   <div id="dropdown-root" className = "fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;






// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';
// import ActionCapsules from './components/ActionCapsules';
// import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';
// import ModelSelector from './components/ModelSelector';
// import { Brain, MessageSquare, Bot, Sparkles, Code, Settings, Cpu, GlobeIcon } from "lucide-react";
// import ProjectListPopup from './components/ProjectListPopup';
// import ImagePreview from './components/ImagePreview';
// import LoadingDots from './components/LoadingDots';
// import { getChatHistory } from './services/api';
// import { fetchUserChats } from './services/api';
// import ChatTabs from './components/ChatTabs';




// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// // Update the Chat interface to include project association
// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string; // Add this to track which project the chat belongs to
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// // Update Project interface
// interface Project {
//   id: string;
//   name: string;
//   createdAt: Date;
//   chats: Chat[];
//   isEditing?: boolean;
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   //const [selectedModel, setSelectedModel] = useState(models[0]);
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{ name: string } | null>(
//     () => JSON.parse(localStorage.getItem('sessionData') || 'null')
//   );
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');
//   const [isShowingStarredChats, setIsShowingStarredChats] = useState(true);
//   const [showAllStarredChats, setShowAllStarredChats] = useState(false);
//   const [isNewChatStarted, setIsNewChatStarted] = useState(false);
//   const modelButtonRef = useRef<HTMLButtonElement>(null);
//   const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
//   const [isShowingProjects, setIsShowingProjects] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isProjectListOpen, setIsProjectListOpen] = useState(false);
//   const [isSearchEnabled, setIsSearchEnabled] = useState(false);
//   const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false);



//   // Add new states
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isProjectChatListOpen, setIsProjectChatListOpen] = useState(false);
//   // Add new state for collapsed projects
//   const [collapsedProjects, setCollapsedProjects] = useState<{ [key: string]: boolean }>({});
//   // Add new states for delete confirmation
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{
//     isOpen: boolean;
//     itemId: string;
//     itemType: 'chat' | 'project';
//     projectId?: string;
//   }>({
//     isOpen: false,
//     itemId: '',
//     itemType: 'chat',
//   });

//   const models = [
//     { id: "gpt4", name: "GPT-4", icon: <Brain size={ 18} /> },
//   { id: "claude", name: "Claude 3", icon: <MessageSquare size={ 18 } /> },
// { id: "nextchat", name: "NextChat", icon: <Bot size={ 18 } /> },
// { id: "gemini", name: "Gemini", icon: <Sparkles size={ 18 } /> },
// { id: "llama3", name: "LLaMA 3", icon: <Code size={ 18 } /> },
// { id: "mistral", name: "Mistral", icon: <Settings size={ 18 } /> },
// { id: "palm2", name: "PaLM 2", icon: <Cpu size={ 18 } /> }, 
//   ];

// const toggleDarkMode = () => {
//   setIsDarkMode(prev => !prev);
// };

// const loadChatHistory = async (username: string, chatId: string) => {
//   try {
//     setIsLoadingHistory(true);
//     const history = await getChatHistory(username, chatId);
//     console.log("Chat history fetched:", history);

//     if (history && Array.isArray(history.messages)) {
//       const formattedMessages: Message[] = history.messages.map((msg: any) => ({
//         id: msg.id || `msg_${Date.now()}_${Math.random()}`,
//         content: msg.content,
//         type: msg.role === 'assistant' ? 'bot' : 'user',
//         timestamp: new Date(msg.timestamp),
//         status: 'sent'
//       }));

//       // Ensure chat messages are properly updated
//       setChatHistory(formattedMessages);
//       setMessages(formattedMessages); // ✅ Update the state that renders messages

//       if (chatId) {
//         setCurrentChat(prev => prev ? { ...prev, messages: formattedMessages } : null);
//       }
//     }
//   } catch (error) {
//     console.error("Error loading chat history:", error);
//   } finally {
//     setIsLoadingHistory(false);
//   }
// };



// interface Chat {
//   id: string; // Make id required
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string;
// }

// const handleNewChat = () => {
//   const newChat: Chat = {
//     id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Ensure unique ID
//     title: 'New Chat',
//     createdAt: new Date(),
//     messages: [],
//     isEditing: false
//   };

//   // Add the new chat to the chats array
//   setChats(prev => [newChat, ...prev]);

//   // Reset all chat-related states
//   setCurrentChat(newChat);
//   setMessages([]);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(true);
//   setActiveChat(newChat.id);
//   setHasMessages(false);

//   // Clear any active states
//   setActiveFilePreview(null);
//   setIsGenerating(false);
//   setIsMicActive(false);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update handleChatSelect to handle initial message
// const handleChatSelect = async (chat: Chat) => {
//   if (currentChat?.id === chat.id) return;

//   setCurrentChat(chat);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(true);

//   if (userProfile?.name) {
//     await loadChatHistory(userProfile.name, chat.id);
//   }

//   setMessages(chatHistory);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }

// };




// console.log('Chat history loaded:', chatHistory);


// const handleSearchToggle = () => {
//   setIsSearchEnabled((prev) => !prev);
// };


// // Add chat title editing functionality
// const handleChatTitleEdit = (chatId: string, newTitle: string) => {
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       const updatedChat = { ...chat, title: newTitle, isEditing: false };
//       if (currentChat?.id === chatId) {
//         setCurrentChat(updatedChat);
//       }
//       return updatedChat;
//     }
//     return chat;
//   }));
// };

// const handleChatTitleEditStart = (chatId: string) => {
//   setChats(prev => prev.map(chat => ({
//     ...chat,
//     isEditing: chat.id === chatId
//   })));
// };

// const handleHomeClick = (e: React.MouseEvent) => {
//   e.preventDefault();
//   setShowGreeting(true);
//   setIsChatActive(false);
//   setMessages([]);
//   setActiveChat(null);
//   setIsNewChatStarted(false);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update delete handlers to show confirmation first
// const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: chatId,
//     itemType: 'chat'
//   });
// };

// const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: projectId,
//     itemType: 'project'
//   });
// };

// const handleDeleteProjectChat = (projectId: string, chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: chatId,
//     projectId: projectId,
//     itemType: 'chat'
//   });
// };

// const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       return { ...chat, isStarred: !chat.isStarred };
//     }
//     return chat;
//   }));
// };

// useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };
//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, []);

// useEffect(() => {
//   if (messagesEndRef.current) {
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   }
// }, [messages]);

// useEffect(() => {
//   if (chartRef.current && activeTab === 'analysis') {
//     const chart = echarts.init(chartRef.current);
//     const option = {
//       animation: false,
//       title: {
//         text: 'Message Analysis',
//         textStyle: { color: '#e5e7eb' }
//       },
//       tooltip: {
//         trigger: 'axis'
//       },
//       xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         axisLabel: { color: '#e5e7eb' }
//       },
//       yAxis: {
//         type: 'value',
//         axisLabel: { color: '#e5e7eb' }
//       },
//       series: [{
//         data: [120, 200, 150, 80, 70, 110, 130],
//         type: 'line',
//         smooth: true,
//         color: '#818cf8'
//       }]
//     };
//     chart.setOption(option);
//   }
// }, [activeTab]);

// useEffect(() => {
//   if (!isSidebarOpen && !isHovered) {
//     setIsSearchActive(false);
//   }
// }, [isSidebarOpen, isHovered]);

// const resetTextAreaHeight = () => {
//   const textarea = document.querySelector('textarea');
//   if (textarea) {
//     textarea.style.height = '56px';
//   }
// };

// const [isTransitioning, setIsTransitioning] = useState(false);

// // Update the handleSendMessage function
// const handleSendMessage = async () => {
//   if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;

//   setHasMessages(true);

//   if (isMicActive) {
//     setIsMicActive(false);
//   }

//   setIsCleanView(true);

//   let chatToUse = currentChat;

//   if (!chatToUse) {
//     // Create new chat with temporary title
//     chatToUse = {
//       id: Date.now().toString(),
//       title: 'New Chat', // We'll update this after sending the first message
//       createdAt: new Date(),
//       messages: []
//     };
//     setCurrentChat(chatToUse);
//     setChats(prev => [chatToUse, ...prev]);
//   }

//   setShowGreeting(false);
//   setIsChatActive(true);

//   const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//   const newMessage: Message = {
//     id: messageId,
//     content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//     type: 'user',
//     timestamp: new Date(),
//     status: 'sending',
//     file: activeFilePreview || undefined
//   };



//   try {
//     const updatedChat = {
//       ...chatToUse,
//       messages: [...chatToUse.messages, newMessage]
//     };

//     // Update chat title if this is the first message
//     if (updatedChat.messages.length === 1) {
//       // Truncate long messages and clean up multiline content
//       const cleanContent = inputText
//         .split('\n')[0] // Take only the first line
//         .trim()
//         .substring(0, 30); // Take first 30 characters

//       const newTitle = cleanContent + (cleanContent.length >= 30 ? '...' : '');
//       updatedChat.title = newTitle;
//     }

//     if (chatToUse.projectId) {
//       setProjects(prev => prev.map(project => {
//         if (project.id === chatToUse.projectId) {
//           return {
//             ...project,
//             chats: project.chats.map(chat =>
//               chat.id === chatToUse.id ? updatedChat : chat
//             )
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Update the chat in the main chats array
//       setChats(prev => prev.map(chat =>
//         chat.id === chatToUse.id ? updatedChat : chat
//       ));
//     }

//     setCurrentChat(updatedChat);
//     setMessages(updatedChat.messages);
//     setInputText('');
//     resetTextAreaHeight();
//     setIsGenerating(true);

//     // Add this helper function to detect image URLs in the response
//     const isImageUrl = (text: string) => {
//       return text.match(/https?:\/\/res\.cloudinary\.com\/[^\s]+\.(jpg|jpeg|png|gif)/i);
//     };

//     // Call the updated API with chat ID and username
//     const aiResponseText = await generateResponse(inputText, chatToUse.id, userProfile?.name || 'user', isSearchEnabled);


//     const sentMessage = { ...newMessage, status: 'sent' };

//     // Check if the response contains an image URL
//     const imageMatch = isImageUrl(aiResponseText);

//     let aiResponse: Message;
//     if (imageMatch) {
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: '',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent',
//         file: {
//           name: 'generated-image.png',
//           type: 'image/png',
//           url: imageMatch[0] // Use the matched URL
//         }
//       };
//     } else {
//       // Regular text response
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponseText,
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };
//     }

//     const finalChat = {
//       ...updatedChat,
//       messages: [
//         ...updatedChat.messages.map(msg =>
//           msg.id === newMessage.id ? sentMessage : msg
//         ),
//         aiResponse
//       ]
//     };

//     setChats(prev => prev.map(c =>
//       c.id === finalChat.id ? finalChat : c
//     ));
//     setCurrentChat(finalChat);
//     setMessages(finalChat.messages);
//     setActiveFilePreview(null);

//   } catch (error) {
//     console.error('Failed to send message:', error);
//     const errorMessage = { ...newMessage, status: 'error' };

//     const errorChat = {
//       ...currentChat,
//       messages: currentChat?.messages.map(msg =>
//         msg.id === newMessage.id ? errorMessage : msg
//       ) || []
//     };

//     setChats(prev => prev.map(c =>
//       c.id === currentChat?.id ? errorChat : c
//     ));
//     setCurrentChat(errorChat);
//     setMessages(errorChat.messages);
//   } finally {
//     setIsGenerating(false);
//   }
// };

// const renderMessageStatus = (status: Message['status']) => {
//   switch (status) {
//     case 'sending':
//       return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2" > </i>;
//     case 'sent':
//       return <i className="fas fa-check text-green-500 ml-2" > </i>;
//     case 'error':
//       return <i className="fas fa-exclamation-circle text-red-500 ml-2" > </i>;
//     default:
//       return null;
//   }
// };

// const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(true);
// };

// const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
// };

// const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
//   const files = e.dataTransfer.files;
//   handleFiles(files);
// };

// const handleFiles = (files: FileList) => {
//   Array.from(files).forEach(file => {
//     const fileUrl = URL.createObjectURL(file);
//     const filePreview = {
//       name: file.name,
//       type: file.type,
//       url: fileUrl
//     };
//     setActiveFilePreview(filePreview);

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: `Attached: ${file.name}`,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sent',
//       file: filePreview
//     };

//     if (currentChat) {
//       const updatedChat = {
//         ...currentChat,
//         messages: [...currentChat.messages, newMessage]
//       };

//       setChats(prev => prev.map(chat =>
//         chat.id === currentChat.id ? updatedChat : chat
//       ));
//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//     }
//   });

//   setIsUploadModalOpen(false);
// };

// const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.files) {
//     handleFiles(e.target.files);
//   }
// };

// useEffect(() => {
//   const storedUser = localStorage.getItem('user');
//   const authStatus = localStorage.getItem('isAuthenticated');

//   if (storedUser && authStatus === 'true') {
//     setUserProfile(JSON.parse(storedUser));
//     setIsAuthenticated(true);
//   }
// }, []);

// const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
//   setLoading(true);
//   setFormError('');
//   setFormSuccess('');

//   try {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     const userData = {
//       name: data.name || data.email.split('@')[0],
//       email: data.email
//     };

//     if (isLogin) {
//       setFormSuccess('Successfully logged in!');
//       handleAuthSuccess(userData);
//     } else {
//       setFormSuccess('Account created successfully!');
//       handleSignupSuccess(userData);
//     }

//     // ✅ Store in localStorage
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('isAuthenticated', 'true');

//     // ✅ Immediately update global state
//     setUserProfile(userData);  // Ensures UI update
//     setIsAuthenticated(true);  // Forces re-render

//   } catch (error) {
//     setFormError('Authentication failed. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };
// // Add this new function to toggle between login and signup
// const toggleAuthMode = () => {
//   setIsLogin(!isLogin);
//   setFormError('');
//   setFormSuccess('');
// };

// const handleIntroductionComplete = (name: string) => {
//   setUserName(name);
//   setShowIntroduction(false);
//   setShowGreeting(false);
// };

// const handleSignupSuccess = (userData: { name: string; email: string }) => {
//   handleAuthSuccess(userData);
//   setShowIntroduction(true);
// };

// const handleAuthSuccess = (userData: { name: string; email: string }) => {
//   setIsAuthenticated(true);
//   setUserProfile(userData);
//   setIsLoginModalOpen(false);
//   setChats([]);
//   setMessages([]);
//   setCurrentChat(null);
//   setShowGreeting(true);
// };

// const handleLogout = () => {
//   // Remove stored user session data
//   localStorage.removeItem("sessionData");
//   localStorage.removeItem("user");
//   localStorage.removeItem("isAuthenticated");

//   // Update state to reflect logout
//   setUserProfile({ name: "" });
//   setIsAuthenticated(false);

//   // Redirect or refresh to reflect logout
//   window.location.reload();
// };

// useEffect(() => {
//   const sessionData = localStorage.getItem("sessionData");
//   if (sessionData) {
//     const parsedData = JSON.parse(sessionData);
//     setIsAuthenticated(true);
//     setUserProfile({
//       name: parsedData.username,
//       email: parsedData.username || 'user@example.com'
//     });
//   }
// }, []);
// // Update useEffect for fetching chats in App.tsx
// // Update useEffect for fetching chats
// // Update useEffect for fetching chats
// useEffect(() => {
//   if (userProfile?.name) {
//     fetchUserChats(userProfile.name)
//       .then((response) => {
//         if (response && response.chats && Array.isArray(response.chats)) {
//           const formattedChats: Chat[] = response.chats.map(chatData => ({
//             id: chatData.chat_id,
//             title: chatData.first_message || 'New Chat',
//             createdAt: new Date(chatData.timestamp),
//             messages: [{
//               id: `msg_${Date.now()}_${Math.random()}`,
//               content: chatData.first_message,
//               type: 'user',
//               timestamp: new Date(chatData.timestamp),
//               status: 'sent'
//             }],
//             isStarred: false,
//             isEditing: false
//           }));

//           formattedChats.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
//           setChats(formattedChats);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching chats:', error);
//         setChats([]);
//       });
//   }
// }, [userProfile]);
// // Remove the import for getChatHistory since we're not using it anymore
// // import { getChatHistory } from './services/api';

// const Greeting = React.memo(() => {
//   const [displayText, setDisplayText] = useState('');
//   const hour = new Date().getHours();
//   const greetingText = hour >= 0 && hour < 12
//     ? 'Good morning'
//     : hour >= 12 && hour < 16
//       ? 'Good afternoon'
//       : 'Good evening';

//   useEffect(() => {
//     if (!hasGreetingPlayed) {
//       // Only add comma if there's a username
//       const fullText = userProfile?.name
//         ? `${greetingText}, ${userProfile.name}`
//         : greetingText;

//       let timeouts: NodeJS.Timeout[] = [];

//       [...fullText].forEach((char, index) => {
//         const timeout = setTimeout(() => {
//           setDisplayText(prev => prev + char);
//           if (index === fullText.length - 1) {
//             setHasGreetingPlayed(true);
//           }
//         }, 100 * index);
//         timeouts.push(timeout);
//       });

//       return () => timeouts.forEach(clearTimeout);
//     } else {
//       // Only add comma if there's a username
//       const fullText = userProfile?.name
//         ? `${greetingText}, ${userProfile.name}`
//         : greetingText;
//       setDisplayText(fullText);
//     }
//   }, [greetingText, userProfile?.name]);

//   return (
//     <h1 className= "text-4xl font-light text-center" >
//     { displayText }
//     </h1>
//     );
//   });

// const handleVoiceTranscript = (text: string) => {
//   setInputText(text);
// };

// const handleVoiceStateChange = (isActive: boolean) => {
//   setIsMicActive(isActive);
// };

// const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//   setSelectedLanguage(language);

//   if (currentChat && currentChat.messages.length > 0) {
//     try {
//       setIsGenerating(true);

//       const translatedMessages = await Promise.all(
//         currentChat.messages.map(async (msg) => {
//           const translatedContent = await translateText(msg.content, language.name);
//           return {
//             ...msg,
//             content: translatedContent
//           };
//         })
//       );

//       const updatedChat = {
//         ...currentChat,
//         messages: translatedMessages
//       };

//       setChats(prev => prev.map(chat =>
//         chat.id === currentChat.id ? updatedChat : chat
//       ));
//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//     } catch (error) {
//       console.error('Translation failed:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   }
// };

// const parseMessageContent = (content: string) => {
//   const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//   const parts = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = codeBlockRegex.exec(content)) !== null) {
//     if (match.index > lastIndex) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex, match.index)
//       });
//     }

//     parts.push({
//       type: 'code',
//       language: match[1] || 'plaintext',
//       content: match[2].trim()
//     });

//     lastIndex = match.index + match[0].length;
//   }


//   if (lastIndex < content.length) {
//     parts.push({
//       type: 'text',
//       content: content.slice(lastIndex)
//     });
//   }

//   return parts.length > 0 ? parts : [{ type: 'text', content }];
// };

// const handleCodeClick = (content: string, language: string) => {
//   setSelectedCode({ content, language });
//   setIsInfoPanelOpen(true);
// };

// const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   const textarea = e.target;
//   const value = textarea.value;

//   if (!value.trim()) {
//     textarea.style.height = '56px';
//   } else {
//     textarea.style.height = 'inherit';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//   }

//   setInputText(value);
// };

// const handleCodeBlockClick = (content: string, language: string) => {
//   setSelectedCodeBlock({
//     content: content.trim(),
//     language: language || 'plaintext'
//   });
//   setIsCodeSliderOpen(true);
// };

// const handleModelSelect = (modelName: string) => {
//   setSelectedModel(modelName);
//   setIsModelDropdownOpen(false);
// };

// const ModelDropdown = ({ onSelect }: { onSelect: (model: string) => void }) => {
//   return (
//     <div 
//         className= {`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-n z-[9999] ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
//       }`
// }
//       >
// {
//   models.map((model) => (
//     <button
//             key= { model.id }
//             onClick = {() => onSelect(model.name)}
// className = {`w-full flex items-center px-4 py-3 text-left ${isDarkMode
//   ? 'hover:bg-gray-600 text-gray-200'
//   : 'hover:bg-gray-50 text-gray-700'
//   } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}
//           >
//   <i className={
//   `fas ${model.icon} mr-3 ${selectedModel === model.name ? 'text-blue-500' : 'text-gray-400'
//     }`
// }> </i>
//   < span > { model.name } </span>
//   </button>
//         ))}
// </div>
//     );
//   };

// const handleActionCapsuleClick = (action: string, suggestion?: string) => {
//   let promptText = '';

//   if (suggestion) {
//     // If a suggestion was clicked, use it directly
//     switch (action) {
//       case 'explain':
//         promptText = `${suggestion}: `;
//         break;
//       case 'summarize':
//         promptText = `${suggestion} for: `;
//         break;
//       case 'translate':
//         promptText = `${suggestion}: `;
//         break;
//       case 'improve':
//         promptText = `${suggestion}: `;
//         break;
//       case 'code':
//         promptText = `${suggestion}: `;
//         break;
//     }
//   } else {
//     // Default prompts when capsule is clicked
//     switch (action) {
//       case 'explain':
//         promptText = 'Please explain this in detail: ';
//         break;
//       case 'summarize':
//         promptText = 'Please provide a summary of: ';
//         break;
//       case 'translate':
//         promptText = 'Please translate this to English: ';
//         break;
//       case 'improve':
//         promptText = 'Please improve the writing of this text: ';
//         break;
//       case 'code':
//         promptText = 'Please generate code for: ';
//         break;
//     }
//   }
//   setInputText(promptText);
// };

// // Update the handlers for toggling sections
// const handleToggleStarredChats = () => {
//   if (!isShowingStarredChats) {
//     setIsShowingChats(false); // Hide recent chats when showing starred
//   }
//   setIsShowingStarredChats(!isShowingStarredChats);
// };

// const handleToggleRecentChats = () => {
//   if (!isShowingChats) {
//     setIsShowingStarredChats(false); // Hide starred chats when showing recent
//   }
//   setIsShowingChats(!isShowingChats);
// };

// // Add new handler for project click
// const handleProjectClick = (project: Project) => {
//   setSelectedProject(project);
//   setIsProjectChatListOpen(true);
// };

// // Modify handleAddProject to include name editing
// const handleAddProject = () => {
//   const newProject: Project = {
//     id: `proj_${Date.now()}`,
//     name: `New Project`,
//     createdAt: new Date(),
//     chats: [],
//     isEditing: true // Start in editing mode
//   };
//   setProjects(prev => [newProject, ...prev]);
// };

// // Add new handlers for project management
// const handleProjectNameEdit = (projectId: string, newName: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         name: newName,
//         isEditing: false
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectNameEditStart = (projectId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return { ...project, isEditing: true };
//     }
//     return { ...project, isEditing: false };
//   }));
// };

// // Update handleNewProjectChat
// const handleNewProjectChat = (projectId: string) => {
//   const newChat: Chat = {
//     id: Date.now().toString(),
//     title: 'New Chat', // This will be updated with first message
//     createdAt: new Date(),
//     messages: [],
//     projectId: projectId,
//     isEditing: false // Don't start in editing mode since title will update automatically
//   };

//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: [newChat, ...project.chats]
//       };
//     }
//     return project;
//   }));

//   setCurrentChat(newChat);
//   setMessages([]);
//   setIsNewChatStarted(true);
//   setShowGreeting(false);
//   setIsChatActive(true);
// };

// // Add project chat management functions
// const handleProjectChatTitleEdit = (projectId: string, chatId: string, newTitle: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => {
//           if (chat.id === chatId) {
//             const updatedChat = { ...chat, title: newTitle, isEditing: false };
//             if (currentChat?.id === chatId) {
//               setCurrentChat(updatedChat);
//             }
//             return updatedChat;
//           }
//           return chat;
//         })
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectChatTitleEditStart = (projectId: string, chatId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => ({
//           ...chat,
//           isEditing: chat.id === chatId
//         }))
//       };
//     }
//     return project;
//   }));
// };

// // Add handler for toggling project collapse
// const handleProjectCollapse = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setCollapsedProjects(prev => ({
//     ...prev,
//     [projectId]: !prev[projectId]
//   }));
// };

// // Add new handler for project deletion
// const handleConfirmDelete = () => {
//   const { itemId, itemType, projectId } = deleteConfirmation;

//   if (itemType === 'project') {
//     // Handle project deletion
//     if (currentChat?.projectId === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//     setProjects(prev => prev.filter(project => project.id !== itemId));
//   } else {
//     // Handle chat deletion
//     if (projectId) {
//       // Delete project chat
//       setProjects(prev => prev.map(project => {
//         if (project.id === projectId) {
//           return {
//             ...project,
//             chats: project.chats.filter(chat => chat.id !== itemId)
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Delete regular chat
//       setChats(prev => prev.filter(chat => chat.id !== itemId));
//     }

//     if (currentChat?.id === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   }

//   setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
// };

// return (
//   <div className= {`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//     <div className={
//   `flex h-screen overflow-hidden ${isDarkMode
//     ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
//     : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//     }`
// }>
//   {/* Fixed brand text container */ }
//   < div className = {`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//     }`}>
//       <span 
//             onClick={ handleHomeClick }  // Add this line
// className = "text-3xl font-medium cursor-pointer bg-clip-text text-transparent hover:opacity-80 transition-opacity" // Add hover effect
// style = {{
//   background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//     WebkitBackgroundClip: 'text',
//       textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//         WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//           letterSpacing: '0.5px'
// }}
//           >
//   Hind AI
//     </span>
//     </div>

// {/* Sidebar */ }
// <div 
//           className={
//   `${isSidebarOpen ? 'w-72' : 'w-16'
//     } fixed md:relative h-full transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//     } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`
// }
//         >
//   {/* Top section - only toggle button */ }
//   < div className = "flex items-center p-4" >
//     <button 
//               onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
// className = "text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//   >
//   <i className={ `fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}` }> </i>
//     </button>
//     </div>

// {/* Main content with icons-only when collapsed */ }
// <nav className="flex-1 px-2" >
//   <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
// onClick = { handleNewChat }
//   >
//   <i className="fa-solid fa-plus w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       New Chat
//         </span>
//         </button>

// {/* Search section */ }
// <div className="px mb-4" >
//   {
//     isSidebarOpen?(
//                 <div className = "relative" >
//         <input
//                     type="search"
//       placeholder = "Search conversations..."
//                     className = {`w-full pl-9 pr-4 py-2 ${isDarkMode
//         ? 'bg-gray-700 text-gray-200 placeholder-gray-400'
//         : 'bg-gray-100 text-gray-800'
//         } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//   />
//   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" > </i>
//     </div>
//               ) : (
//   <button
//                   onClick= {() => setIsSidebarOpen(true)}
// className = {`w-full p-2 rounded-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
//   }`}
//                 >
//   <i className="fa-solid fa-magnifying-glass" title = "Search" > </i>
//     </button>
//               )}
// </div>

// {/* Projects Section */ }
// <div className="mb-2 pl-4" > {/* Increased pl-2 to pl-4 */ }
//   < div className = {`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//     <div className="flex items-center flex-1" >
//       <i 
//                     className="fa-solid fa-folder text-blue-400 w-8"
// title = "Projects"
// onClick = {() => setIsProjectListOpen(true)}
// style = {{ cursor: 'pointer' }}
//                   > </i>
// {
//   isSidebarOpen && (
//     <div className="flex items-center flex-1" >
//       <span 
//                         className="text-sm font-medium ml-1"
//   onClick = {() => setIsProjectListOpen(true)
// }
// style = {{ cursor: 'pointer' }}
//                       >
//   Projects
//   </span>
//   < button
// onClick = { handleAddProject }
// className = {`ml-4 p-2 rounded-lg transition-colors ${  // Increased ml-3 to ml-4 and p-1.5 to p-2
//   isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//   }`}
//                       >
//   <i className="fa-solid fa-plus text-xs" > </i>
//     </button>
//     </div>
//                   )}
// </div>
//   </div>
// {
//   isSidebarOpen && projects.length > 0 && (
//     <div className="space-y-1 ml-3" > {/* Increased ml-2 to ml-3 */ }
//   {
//     projects.map(project => (
//       <div
//                       key= { project.id }
//                       className = {`group px-2 py-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//         }`}
//                     >
//     <div className="flex items-center justify-between" >
//       <div className="flex items-center flex-1 min-w-0" >
//         <div className="flex items-center" >
//           <button
//                               onClick={ (e) => handleProjectCollapse(project.id, e) }
//   className = {`mr-1 p-1 rounded-lg transition-transform duration-200 ${  // Added mr-1 for right margin
//     isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//     }`
// }
// style = {{ width: '20px' }}  // Fixed width for consistent spacing
//                             >
//   <i className={
//   `fas fa-chevron-right text-xs text-gray-400 transform transition-transform duration-200 ${!collapsedProjects[project.id] ? 'rotate-90' : ''
//     }`
// }> </i>
//   </button>
//   < i className = "fa-regular fa-folder-open w-8 text-blue-400 ml-1" > </i>  {/ * Added ml - 1 */}
// </div>
// {
//   project.isEditing ? (
//     <input
//                               type= "text"
//                               defaultValue = { project.name }
//   autoFocus
//   onBlur = {(e) => handleProjectNameEdit(project.id, e.target.value)
// }
// onKeyDown = {(e) => {
//   if (e.key === 'Enter') {
//     handleProjectNameEdit(project.id, e.currentTarget.value);
//   }
// }}
// className = {`text-sm px-2 py-1 rounded flex-1 mr-2 ${isDarkMode
//   ? 'bg-gray-600 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                             />
//                           ) : (
//   <span 
//                               className= "text-sm truncate flex-1"
// onDoubleClick = {() => handleProjectNameEditStart(project.id)}
//                             >
//   { project.name }
//   </span>
//                           )}
// </div>
//   < div className = "flex items-center space-x-2 opacity-0 group-hover:opacity-100" >
//     <button
//                             onClick={ () => handleNewProjectChat(project.id) }
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                           >
//   <i className="fas fa-plus-circle" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteProject(project.id, e)}
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                           >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </div>
// {/* Project Chats */ }
// {
//   project.chats.length > 0 && !collapsedProjects[project.id] && (
//     <div className="ml-8 mt-2 space-y-1" >
//     {
//       project.chats.map((chat, index) => (
//         <div
//                               key= { chat.id }
//                               onClick = {() => handleChatSelect(chat)}
//   className = {`group flex items-center justify-between px-2 py-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
//     }`
// }
//                             >
//   <div className="flex items-center space-x-2 flex-1 min-w-0" >
//     <i className="fas fa-comment-alt text-xs text-gray-400" > </i>
// {
//   chat.isEditing ? (
//     <input
//                                     type= "text"
//                                     defaultValue = { chat.title }
//   autoFocus
//   onClick = { e => e.stopPropagation() }
//   onBlur = {(e) => handleProjectChatTitleEdit(project.id, chat.id, e.target.value)
// }
// onKeyDown = {(e) => {
//   if (e.key === 'Enter') {
//     handleProjectChatTitleEdit(project.id, chat.id, e.currentTarget.value);
//   }
// }}
// className = {`text-sm px-2 py-1 rounded flex-1 ${isDarkMode
//   ? 'bg-gray-700 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                                   />
//                                 ) : (
//   <span 
//                                     className= "text-sm truncate"
// onDoubleClick = {(e) => {
//   e.stopPropagation();
//   handleProjectChatTitleEditStart(project.id, chat.id);
// }}
//                                   >
//   { chat.title }
//   </span>
//                                 )}
// </div>
//   < div className = "flex items-center space-x-1 opacity-0 group-hover:opacity-100" >
//     <button
//                                   onClick={
//   (e) => {
//     e.stopPropagation();
//     handleProjectChatTitleEditStart(project.id, chat.id);
//   }
// }
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                                 >
//   <i className="fas fa-edit text-xs" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteProjectChat(project.id, chat.id, e)}
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                                 >
//   <i className="fas fa-trash text-xs" > </i>
//     </button>
//     </div>
//     </div>
//                           ))}
// </div>
//                       )}
// </div>
//                   ))}
// </div>
//               )}
// </div>

// {/* Starred Chats Section */ }
// <div className="mb-4" >
//   <div className={ `flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}` }>
//     <button
//                   onClick={
//   () => {
//     if (!isSidebarOpen) {
//       setChatListInitialTab('starred');
//       setIsChatListOpen(true);
//     }
//   }
// }
// className = "relative"
//   >
//   <i className="fa-solid fa-star text-yellow-500 w-8" title = "Starred chats" > </i>
//     </button>
// { isSidebarOpen && <span className="text-sm font-medium" > Starred Chats </span> }
// </div>
//   < div className = "space-y-1" >
//   {
//     chats
//                   .filter(chat => chat.isStarred)
//       .map((chat) => (
//         <div
//                       key= {`starred_${chat.id}`}
// className = {`group flex items-center p-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//   }`}
// onClick = {() => handleChatSelect(chat)}
//                     >
//   <i className="fas fa-comment-alt w-8 text-yellow-500/80" > </i>
// {
//   isSidebarOpen && (
//     <>
//     <span className="ml-2 truncate flex-1" > { chat.title } </span>
//       < button
//   onClick = {(e) => handleStarChat(chat.id, e)
// }
// className = "ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//   >
//   <i className="fas fa-star text-yellow-500" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = {`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                           >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </>
//                       )}
// </div>
//                   ))}
// </div>
//   </div>

// {/* All Chats Section */ }
// <div className={ `flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}` }>
//   <button
//                 onClick={
//   () => {
//     if (!isSidebarOpen) {
//       setChatListInitialTab('all');
//       setIsChatListOpen(true);
//     }
//   }
// }
// className = "relative"
//   >
//   <i className="fa-solid fa-comments w-8"title = "All Chats" > </i>
//     </button>
// { isSidebarOpen && <span className="text-sm font-medium" > All Chats </span> }
// </div>

// {/* Chat list section */ }
// <div className="space-y-1" >
// {
//   chats.filter(chat => !chat.isStarred).map((chat, index) => (
//     <div
//     key= { chat.id || `all_${index}` } // Use index as fallback if chat.id is undefined
//     className = {`group flex items-center p-2 rounded-lg cursor-pointer`}
// onClick = {() => handleChatSelect(chat)}
//   >
//   <i className="fa-regular fa-comment w-8" > </i>
// {
//   isSidebarOpen && (
//     <>
//     {
//       chat.isEditing ? (
//         <input
//                           type= "text"
//                           defaultValue={ chat.title }
//                           autoFocus
//                           onClick={ e => e.stopPropagation() }
//                           onBlur={(e) => handleChatTitleEdit(chat.id, e.target.value)
//     }
//                           onKeyDown = {(e) => {
//     if (e.key === 'Enter') {
//       handleChatTitleEdit(chat.id, e.currentTarget.value);
//     }
//   }
// }
// className = {`text-sm px-2 py-1 rounded flex-1 mr-2 ${isDarkMode
//   ? 'bg-gray-600 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                         />
//                       ) : (
//   <span 
//                           className= "ml-2 truncate flex-1"
// onDoubleClick = {(e) => {
//   e.stopPropagation();
//   handleChatTitleEditStart(chat.id);
// }}
//                         >
//   { chat.title }
//   </span>
//                       )}
// <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100" >
//   <button
//                           onClick={
//   (e) => {
//     e.stopPropagation();
//     handleChatTitleEditStart(chat.id);
//   }
// }
// className = {`p-1 rounded-full transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                         >
//   <i className="fas fa-edit" > </i>
//     </button>
//     < button
// onClick = {(e) => handleStarChat(chat.id, e)}
// className = {`p-1 rounded-full transition-colors ${chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//   }`}
//                         >
//   <i className="fas fa-star" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = "p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//   >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </>
//                   )}
// </div>
//               ))}
// </div>
//   </nav>

// {/* Auth section at bottom */ }
// <div className="mt-auto p-2 border-t border-gray-700/50" >
// {
//   isAuthenticated?(
//               <div className = "space-y-1" >
//       <div className="flex items-center p-2 rounded-lg">
//   <i className="fa-solid fa-user w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       { userProfile?.name }
//       </span>
//       </div>
//       < button
// onClick = { handleLogout }
// className = "w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//   >
//   <i className="fa-solid fa-right-from-bracket w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       Logout
//       </span>
//       </button>
//       </div>
//             ) : (
//   <div className= "space-y-1" >
//   <button className="w-full flex items-center p-2" onClick = {() => setIsLoginModalOpen(true)}>
//     <i className="fa-solid fa-right-to-bracket w-8" > </i>
//       < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//         Login
//         </span>
//         </button>
//         < button
// className = "w-full flex items-center p-2 text-indigo-500"
// onClick = {() => {
//   setIsLogin(false);

//   setTimeout(() => setIsLoginModalOpen(true), 50);
// }}
//                 >
//   <i className="fa-solid fa-user-plus w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       Sign Up
//         </span>
//         </button>
//         </div>
//             )}

// <button 
//               onClick={ toggleDarkMode }
// className = "w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//   >
//   <i className={ `fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8` }> </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       { isDarkMode? 'Light Mode': 'Dark Mode' }
//       </span>
//       </button>
//       </div>
//       </div>

//       < div className = "flex-1 flex flex-col relative pt-16 pl-16" >
//         <div className={
//   `flex-1 overflow-y-auto transition-all duration-300 ${isCodeSliderOpen ? 'lg:pr-[50%]' : ''
//     }`
// }>
//   {/* Main chat section that shifts left when slider opens */ }
//   < div className = {`
//               w-full transition-all duration-300 
//               ${isCodeSliderOpen
//       ? 'lg:max-w-full lg:pr-60' // Add right padding when slider is open
//       : 'max-w-3xl mx-auto'
//     }
//               relative flex flex-col h-full pb-[170px] // Add these styles
//             `}>
//   {/* Chat content */ }
//   < div className = {`w-full ${!isCodeSliderOpen ? 'max-w-3xl mx-auto' : ''} ${hasMessages || isNewChatStarted ? 'flex-1' : ''
//     }`}>
//       { showGreeting && !hasMessages && !isNewChatStarted ? (
//         <div className= "flex justify-center items-center min-h-[200px]" >
//         <Greeting />
//     </div>
//                 ) : (
//   <div className= "flex-1 flex flex-col justify-end" >
//   <div className="flex-1 space-y-4 py-4 px-4 mb-40" >

//   {
//     messages.map((message, index) => (
//       <div
//       key= {`${message.id}_${index}`}
// className = {`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
// style = {{ animationDelay: `${index * 100}ms` }}
//     >



//   <div
//                             className={
//   `max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${message.type === 'user'
//     ? isDarkMode
//       ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//       : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//     : isDarkMode
//       ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//       : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//     }`
// }
// style = {{
//   backdropFilter: 'blur(8px)',
//                             }}
//                           >
//   <div className="flex items-center justify-between mb-1" >
//     <div className="flex items-center" >
//       <i className={ `fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2` }> </i>
//         < span className = "text-sm opacity-75" >
//           { new Date(message.timestamp).toLocaleTimeString() }
//           </span>
//           </div>
// { renderMessageStatus(message.status) }
// </div>


// {
//   message.file && (
//     <div className="mb-2" >
//       {
//         message.file.type.startsWith('image/') ? (
//           <ImagePreview 
//                                     imageUrl= { message.file.url }
//                                     isDarkMode={ isDarkMode }
//                                     fileName={ message.file.name }
//         />
//                                 ) : message.file.type === 'application/pdf' ? (
//           <div className= "flex items-center space-x-2 bg-black/20 rounded-lg p-3" >
//           <i className="fas fa-file-pdf text-2xl text-red-400"> </i>
//             < div className="flex-1 min-w-0" >
//             <div className="truncate"> { message.file.name } </div>
//               < div className="text-sm opacity-75" > PDF Document</ div >
//       </div>
//       < a
//   href = { message.file.url }
//   target = "_blank"
//   rel = "noopener noreferrer"
//   className = "p-2 hover:bg-white/10 rounded-full transition-colors"
//     >
//     <i className="fas fa-external-link-alt" > </i>
//       </a>
//       </div>
//                                 ) : (
//     <div className= "flex items-center space-x-2 bg-black/20 rounded-lg p-3" >
//     <i className="fas fa-file text-2xl text-blue-400" > </i>
//       < div className = "flex-1 min-w-0" >
//         <div className="truncate" > { message.file.name } </div>
//           < div className = "text-sm opacity-75" > Document </div>
//             </div>
//             < a
//   href = { message.file.url }
//   target = "_blank"
//   rel = "noopener noreferrer"
//   className = "p-2 hover:bg-white/10 rounded-full transition-colors"
//     >
//     <i className="fas fa-download" > </i>
//       </a>
//       </div>
//                                 )
// }
// </div>
//                             )}



// <div className="space-y-4" >
// {
//   parseMessageContent(message.content).map((part, index) => (
//     part.type === 'code' ? (
//       <div 
//                                     key= { index }
//                                     onClick = {() => handleCodeBlockClick(part.content, part.language)}
// className = {`cursor-pointer group rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//   }`}
//                                   >
//   <div className={
//   `flex items-center justify-between px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//     }`
// }>
//   <div className="flex items-center space-x-2" >
//     <i className="fas fa-code" > </i>
//       < span className = {`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
//         }`}>
//           { part.language }
//           </span>
//           </div>
//           < div className = {`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               <i className="fas fa-expand-alt" > </i>
//                 </div>
//                 </div>
//                 < div className = "p-4 max-h-60 overflow-hidden relative" >
//                   <pre className="overflow-x-auto" >
//                     <code className={
//   `language-${part.language} ${isDarkMode ? 'text-gray-300' : 'text-gray-800'
//     }`
// }>

//   { part.content }
//   </code>
//   </pre>
//   < div className = {`absolute bottom-0 inset-x-0 h-8 ${isDarkMode
//     ? 'bg-gradient-to-t from-gray-800'
//     : 'bg-gradient-to-t from-gray-50'
//     }`}> </div>
//       </div>
//       </div>
//                                 ) : (
//   <p key= { index } className = "text-base leading-relaxed whitespace-pre-wrap" >
//     { part.content }
//     </p>
//                                 )
//                               ))}
// </div>
//   </div>
//   </div>
//                       ))}
// {
//   isGenerating && (
//     <div className="flex justify-start items-center " >
//       <div className="max-w-[80%] rounded-[20px] p-2 " >
//         <LoadingDots isDarkMode={ isDarkMode } />
//           </div>
//           </div>
//                       )
// }
// <div ref={ messagesEndRef } />
//   </div>
//   </div>  
//                 )}



// {/* Chat input section */ }
// <div className={
//   `
//                                     ${hasMessages || isNewChatStarted
//       ? 'fixed bottom-6 lg:left-16 transition-all duration-300'
//       : 'sticky bottom-6'
//     } w-full px-4
//                                     ${isCodeSliderOpen
//       ? 'lg:left-30 lg:w-[36%] lg:translate-x-0' // Reduced left margin
//       : 'mx-auto'
//     }
//                                   `}>
//   <div className={
//   `
//                                       max-w-4xl
//                                       ${showGreeting
//       ? 'mx-auto'
//       : isCodeSliderOpen
//         ? 'lg:ml-0' // Remove margin when slider is open
//         : 'mx-auto'
//     }
//                                     `}>
//   <div className={
//   `relative rounded-[20px] shadow-lg chat-glow transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'
//     }`
// }>
//   { activeFilePreview && (
//     <div className={
//   `w-full px-4 py-3 ${isDarkMode
//     ? 'bg-gray-700/30'
//     : 'bg-gray-50/50'
//     }`
// }>
//   <div className="flex items-center justify-between" >
//     <div className="flex items-center space-x-3" >
//       <i className={
//   `fas ${activeFilePreview.type.startsWith('image/')
//     ? 'fa-image text-green-400'
//     : activeFilePreview.type === 'application/pdf'
//       ? 'fa-file-pdf text-red-400'
//       : 'fa-file text-blue-400'
//     } text-lg`
// }> </i>
//   < div className = "flex flex-col" >
//     <span className="text-sm font-medium truncate max-w-[200px]" >
//       { activeFilePreview.name }
//       </span>
//       < span className = {`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//         Ready to send
//           </span>
//           </div>
//           </div>
//           < button
// onClick = {() => setActiveFilePreview(null)}
// className = {`p-1.5 rounded-full transition-colors ${isDarkMode
//   ? 'hover:bg-gray-600 text-gray-400'
//   : 'hover:bg-gray-200 text-gray-500'
//   }`}
//                             >
//   <i className="fas fa-times" > </i>
//     </button>
//     </div>
//     </div>
//                       )}

// {
//   messages.length > 0 && messages[messages.length - 1].file && (
//     <div className={
//     `w-full px-4 py-2 ${isDarkMode
//       ? 'bg-gray-700/30'
//       : 'bg-gray-50/50'
//       }`
//   }>
//     <div className="flex items-center justify-between" >
//       <div className="flex items-center space-x-2" >
//         <i className={
//     `fas ${messages[messages.length - 1].file?.type.startsWith('image/')
//       ? 'fa-image text-green-400'
//       : messages[messages.length - 1].file?.type === 'application/pdf'
//         ? 'fa-file-pdf text-red-400'
//         : 'fa-file text-blue-400'
//       }`
//   }> </i>
//     < span className = "text-sm truncate max-w-[200px]" >
//       { messages[messages.length - 1].file?.name }
//       </span>
//       </div>
//       < div className = "flex items-center space-x-2" >
//         <span className={ `text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}` }>
//           File attached
//             </span>
//             < i className = "fas fa-check text-green-400" > </i>
//               </div>
//               </div>
//               </div>
//                       )
// }

// <div className="relative flex flex-col" >
//   <div className="min-h-[56px] max-h-[200px] overflow-hidden" >
//     <textarea
//                             className={
//   `w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${isDarkMode
//     ? 'bg-gray-800 text-gray-200 placeholder-gray-400'
//     : 'bg-white text-gray-800 placeholder-gray-500'
//     }`
// }
// value = { inputText }
// onChange = { handleTextAreaResize }
// placeholder = {`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
// onKeyDown = {(e) => {
//   if (e.key === 'Enter' && !e.shiftKey) {
//     e.preventDefault();
//     if (activeFilePreview || inputText.trim()) {
//       handleSendMessage();
//     }
//   }
// }}
// style = {{
//   minHeight: '56px',
//     maxHeight: '200px'
// }}
//                           />
//   </div>

//   < div className = {`flex items-center justify-between p-4 rounded-b-[20px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'
//     }`}>
//       <div className="flex items-center space-x-2" >
//         <div className="flex items-center space-x-2" >
//           {/* Model container */ }
//           < ModelSelector isDarkMode = { isDarkMode } onModelChange = { setSelectedModel } models = { models } />

//             {/* Language container */ }
//             < div className = "relative inline-block" >
//               <LanguageSelector
//                                      isDarkMode={ isDarkMode }
// onLanguageChange = { handleLanguageChange }
// selectedLanguage = { selectedLanguage }
// className = "z-[9999]"
// dropdownPosition = "absolute"
//   />
//   </div>

// {/* Search button */ }
// <button
//   className={ `flex items-center space-x-2 ${isSearchEnabled ? 'text-blue-500' : 'hover:text-gray-700'}` }
// title = "Search the web"
// onClick = { handleSearchToggle }
//   >
//   <GlobeIcon className="w-5 h-5" />
//     <span>{ isSearchEnabled? ' Search': 'Search' } </span>
//     </button>

//     </div>

//     </div>

//     < div className = "flex items-center space-x-2" >
//       <button
//                               className={
//   `p-2 rounded-full transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-blue-400'
//     : 'text-gray-400 hover:text-indigo-600'
//     }`
// }
// onClick = {() => setIsUploadModalOpen(true)}
//                             >
//   <i className="fas fa-paperclip" > </i>
//     </button>

//     < button
// className = {`p-2 rounded-full transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-400 hover:text-indigo-600'
//   }`}
// onClick = {() => setIsMicActive(!isMicActive)}
//                             >
//   <i className={ `fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}` }> </i>
//     </button>

//     < button
// className = {`rounded-full p-2.5 transition-colors ${isDarkMode
//   ? 'bg-blue-600 hover:bg-blue-700'
//   : 'bg-indigo-600 hover:bg-indigo-700'
//   } text-white`}
// onClick = { handleSendMessage }
//   >
//   <i className="fas fa-paper-plane" > </i>
//     </button>
//     </div>
//     </div>
//     </div>
//     </div>
// {
//   !hasMessages && !isNewChatStarted && (
//     <ActionCapsules 
//                         isDarkMode={ isDarkMode }
//   onActionClick = { handleActionCapsuleClick }
//     />
//                     )
// }
// <ChatTabs chats={chats} handleChatSelect={handleChatSelect} isDarkMode={isDarkMode} />
// </div>
//   </div>
//   </div>
// {
//   !hasMessages && (
//     <div className="max-w-[850px] mx-auto mt-6" >
//       { activeTab === 'analysis' && (
//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6" >
//           <h3 className="text-xl font-medium mb-4" > Conversation Analytics </h3>
//             < div ref = { chartRef } style = {{ height: '300px' }
// }> </div>
//   </div>
//                   )}


// </div>
//               )}
// </div>
//   </div>
//   </div>
//   </div>
//   < ChatListPopup
// isOpen = { isChatListOpen }
// onClose = {() => setIsChatListOpen(false)}
// chats = { chats }
// onChatSelect = { handleChatSelect }
// onStarChat = { handleStarChat }
// onDeleteChat = { handleDeleteChat }
// isDarkMode = { isDarkMode }
// initialTab = { chatListInitialTab }
//   />
//   <VoiceInput
//         isActive={ isMicActive }
// onTranscript = { handleVoiceTranscript }
// onStateChange = { handleVoiceStateChange }
// isDarkMode = { isDarkMode }
//   />
//   <InfoPanel
//         isOpen={ isInfoPanelOpen }
// onClose = {() => {
//   setIsInfoPanelOpen(false);
//   setSelectedCode(null);
// }}
// isDarkMode = { isDarkMode }
// code = { selectedCode || undefined}
//       />
//   < CodeSlider
// isOpen = { isCodeSliderOpen }
// onClose = {() => {
//   setIsCodeSliderOpen(false);
//   setSelectedCodeBlock(null);
// }}
// code = { selectedCodeBlock?.content || ''}
// language = { selectedCodeBlock?.language || 'plaintext'}
// isDarkMode = { isDarkMode }
//   />
//   <SlidingAuthForm
//         isOpen={ isLoginModalOpen }
// onClose = {() => setIsLoginModalOpen(false)}
// isLogin = { isLogin }
// setIsLogin = { setIsLogin }
// onToggleMode = { toggleAuthMode }
// onSubmit = { handleAuthSubmit }
// loading = { loading }
// error = { formError }
// success = { formSuccess }
// isDarkMode = { isDarkMode }
// setUserProfile = { setUserProfile }
// setIsAuthenticated = { setIsAuthenticated }
//   />
//   <DeleteConfirmationPopup
//         isOpen={ deleteConfirmation.isOpen }
// onClose = {() => setDeleteConfirmation(prev => ({ ...prev, isOpen: false }))}
// onConfirm = { handleConfirmDelete }
// isDarkMode = { isDarkMode }
// itemType = { deleteConfirmation.itemType }
//   />
//   <ProjectListPopup
//         isOpen={ isProjectListOpen }
// onClose = {() => setIsProjectListOpen(false)}
// projects = { projects }
// onProjectSelect = {(project) => {
//   setSelectedProject(project);
//   setIsProjectListOpen(false);
// }}
// onChatSelect = {(chat) => {
//   handleChatSelect(chat);
//   setIsProjectListOpen(false);
// }}
// onDeleteProject = { handleDeleteProject }
// onDeleteProjectChat = { handleDeleteProjectChat }
// onEditProject = { handleProjectNameEdit }
// onEditProjectStart = { handleProjectNameEditStart }
// onNewProjectChat = {(projectId) => {
//   handleNewProjectChat(projectId);
//   setIsProjectListOpen(false); // Close the popup after creating new chat
// }}
// isDarkMode = { isDarkMode }
//   />
//   <div id="dropdown-root" className = "fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;








// import React, { useState, useRef, useEffect, DragEvent } from 'react';
// import * as echarts from 'echarts';
// import './index.css';
// import SlidingAuthForm from './components/SlidingAuthForm';
// import AuthPage from './pages/AuthPage';
// import Introduction from './pages/Introduction';
// import VoiceInput from './components/VoiceInput';
// import LanguageSelector from './components/LanguageSelector';
// import { CodeBlock } from './components/CodeBlock';
// import InfoPanel from './components/InfoPanel';
// import { generateResponse, translateText } from './services/api';
// import CodeSlider from './components/CodeSlider';
// import ChatListPopup from './components/ChatListPopup';
// import ActionCapsules from './components/ActionCapsules';
// import DeleteConfirmationPopup from './components/DeleteConfirmationPopup';
// import ModelSelector from './components/ModelSelector';
// import { Brain, MessageSquare, Bot, Sparkles, Code, Settings, Cpu, GlobeIcon } from "lucide-react";
// import ProjectListPopup from './components/ProjectListPopup';
// import ImagePreview from './components/ImagePreview';
// import LoadingDots from './components/LoadingDots';
// import { getChatHistory } from './services/api';
// import { fetchUserChats } from './services/api';
// import ChatTabs from './components/ChatTabs';




// interface Message {
//   id: string;
//   content: string;
//   type: 'user' | 'assistant';
//   timestamp: Date;
//   status: 'sending' | 'sent' | 'error';
//   file?: {
//     name: string;
//     type: string;
//     url: string;
//   };
// }

// // Update the Chat interface to include project association
// interface Chat {
//   id: string;
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string; // Add this to track which project the chat belongs to
// }

// interface CodeBlock {
//   content: string;
//   language: string;
// }

// interface FilePreview {
//   name: string;
//   type: string;
//   url: string;
// }

// // Update Project interface
// interface Project {
//   id: string;
//   name: string;
//   createdAt: Date;
//   chats: Chat[];
//   isEditing?: boolean;
// }

// const App: React.FC = () => {
//   const [inputText, setInputText] = useState('');
//   const [isShowingChats, setIsShowingChats] = useState(true);
//   const [showAllChats, setShowAllChats] = useState(false);
//   const [showAnalysisTool, setShowAnalysisTool] = useState(true);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [isMicActive, setIsMicActive] = useState(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const chartRef = useRef<HTMLDivElement>(null);
//   const [activeTab, setActiveTab] = useState('chat');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [showGreeting, setShowGreeting] = useState(true);
//   const [isChatActive, setIsChatActive] = useState(false);
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [activeChat, setActiveChat] = useState<string | null>(null);
//   const [chats, setChats] = useState<Chat[]>([]);
//   const [currentChat, setCurrentChat] = useState<Chat | null>(null);
//   const [starredChats, setStarredChats] = useState<Chat[]>([]);
//   const [selectedModel, setSelectedModel] = useState('GPT-4');
//   //const [selectedModel, setSelectedModel] = useState(models[0]);
//   const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState('');
//   const [formSuccess, setFormSuccess] = useState('');
//   const [showIntroduction, setShowIntroduction] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [userProfile, setUserProfile] = useState<{ name: string } | null>(
//     () => JSON.parse(localStorage.getItem('sessionData') || 'null')
//   );
//   const [selectedLanguage, setSelectedLanguage] = useState({
//     code: 'eng_Latn',
//     name: 'English',
//     nativeName: 'English'
//   });
//   const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
//   const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
//   const [selectedCode, setSelectedCode] = useState<{ content: string; language: string } | null>(null);
//   const [isCodeSliderOpen, setIsCodeSliderOpen] = useState(false);
//   const [selectedCodeBlock, setSelectedCodeBlock] = useState<CodeBlock | null>(null);
//   const [activeFilePreview, setActiveFilePreview] = useState<FilePreview | null>(null);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isSearchActive, setIsSearchActive] = useState(false);
//   const [isCleanView, setIsCleanView] = useState(false);
//   const [hasMessages, setHasMessages] = useState(false);
//   const [activeUploadTab, setActiveUploadTab] = useState('computer');
//   const [isChatListOpen, setIsChatListOpen] = useState(false);
//   const [chatListInitialTab, setChatListInitialTab] = useState<'starred' | 'all'>('all');
//   const [isShowingStarredChats, setIsShowingStarredChats] = useState(true);
//   const [showAllStarredChats, setShowAllStarredChats] = useState(false);
//   const [isNewChatStarted, setIsNewChatStarted] = useState(false);
//   const modelButtonRef = useRef<HTMLButtonElement>(null);
//   const [hasGreetingPlayed, setHasGreetingPlayed] = useState(false);
//   const [isShowingProjects, setIsShowingProjects] = useState(true);
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [isProjectListOpen, setIsProjectListOpen] = useState(false);
//   const [isSearchEnabled, setIsSearchEnabled] = useState(false);
//   const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [isLoadingHistory, setIsLoadingHistory] = useState(false);



//   // Add new states
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [isProjectChatListOpen, setIsProjectChatListOpen] = useState(false);
//   // Add new state for collapsed projects
//   const [collapsedProjects, setCollapsedProjects] = useState<{ [key: string]: boolean }>({});
//   // Add new states for delete confirmation
//   const [deleteConfirmation, setDeleteConfirmation] = useState<{
//     isOpen: boolean;
//     itemId: string;
//     itemType: 'chat' | 'project';
//     projectId?: string;
//   }>({
//     isOpen: false,
//     itemId: '',
//     itemType: 'chat',
//   });

//   const models = [
//     { id: "gpt4", name: "GPT-4", icon: <Brain size={ 18} /> },
//   { id: "claude", name: "Claude 3", icon: <MessageSquare size={ 18 } /> },
// { id: "nextchat", name: "NextChat", icon: <Bot size={ 18 } /> },
// { id: "gemini", name: "Gemini", icon: <Sparkles size={ 18 } /> },
// { id: "llama3", name: "LLaMA 3", icon: <Code size={ 18 } /> },
// { id: "mistral", name: "Mistral", icon: <Settings size={ 18 } /> },
// { id: "palm2", name: "PaLM 2", icon: <Cpu size={ 18 } /> }, 
//   ];

// const toggleDarkMode = () => {
//   setIsDarkMode(prev => !prev);
// };

// const loadChatHistory = async (username: string, chatId: string) => {
//   try {
//     setIsLoadingHistory(true);
//     const history = await getChatHistory(username, chatId);
//     console.log("Chat history fetched:", history);

//     if (history && Array.isArray(history.messages)) {
//       const formattedMessages: Message[] = history.messages.map((msg: any) => ({
//         id: msg.id || `msg_${Date.now()}_${Math.random()}`,
//         content: msg.content,
//         type: msg.role === 'assistant' ? 'assistant' : 'user', // Fixed the type here
//         timestamp: new Date(msg.timestamp),
//         status: 'sent'
//       }));

//       setMessages(formattedMessages); // ✅ Set the messages directly without chatHistory
//       setHasMessages(formattedMessages.length > 0); // ✅ Ensure hasMessages is updated
//     }
//   } catch (error) {
//     console.error("Error loading chat history:", error);
//   } finally {
//     setIsLoadingHistory(false);
//   }
// };





// interface Chat {
//   id: string; // Make id required
//   title: string;
//   createdAt: Date;
//   messages: Message[];
//   isStarred?: boolean;
//   isEditing?: boolean;
//   projectId?: string;
// }

// const handleNewChat = () => {
//   const newChat: Chat = {
//     id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Ensure unique ID
//     title: 'New Chat',
//     createdAt: new Date(),
//     messages: [],
//     isEditing: false
//   };

//   // Add the new chat to the chats array
//   setChats(prev => [newChat, ...prev]);

//   // Reset all chat-related states
//   setCurrentChat(newChat);
//   setMessages([]);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(true);
//   setActiveChat(newChat.id);
//   setHasMessages(false);

//   // Clear any active states
//   setActiveFilePreview(null);
//   setIsGenerating(false);
//   setIsMicActive(false);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update handleChatSelect to handle initial message
// const handleChatSelect = async (chat: Chat) => {
//   if (currentChat?.id === chat.id) return;

//   setCurrentChat(chat);
//   setShowGreeting(false);
//   setIsChatActive(true);
//   setIsNewChatStarted(true);

//   if (userProfile?.name) {
//     await loadChatHistory(userProfile.name, chat.id); // Wait for chat history to load
//   }

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }

//   setHasMessages(true); // Ensure the UI updates
//   setIsChatListOpen(false);
// };





// console.log('Chat history loaded:', chatHistory);


// const handleSearchToggle = () => {
//   setIsSearchEnabled((prev) => !prev);
// };


// // Add chat title editing functionality
// const handleChatTitleEdit = (chatId: string, newTitle: string) => {
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       const updatedChat = { ...chat, title: newTitle, isEditing: false };
//       if (currentChat?.id === chatId) {
//         setCurrentChat(updatedChat);
//       }
//       return updatedChat;
//     }
//     return chat;
//   }));
// };

// const handleChatTitleEditStart = (chatId: string) => {
//   setChats(prev => prev.map(chat => ({
//     ...chat,
//     isEditing: chat.id === chatId
//   })));
// };

// const handleHomeClick = (e: React.MouseEvent) => {
//   e.preventDefault();
//   setShowGreeting(true);
//   setIsChatActive(false);
//   setMessages([]);
//   setActiveChat(null);
//   setIsNewChatStarted(false);

//   if (window.innerWidth < 768) {
//     setIsSidebarOpen(false);
//   }
// };

// // Update delete handlers to show confirmation first
// const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: chatId,
//     itemType: 'chat'
//   });
// };

// const handleDeleteProject = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: projectId,
//     itemType: 'project'
//   });
// };

// const handleDeleteProjectChat = (projectId: string, chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setDeleteConfirmation({
//     isOpen: true,
//     itemId: chatId,
//     projectId: projectId,
//     itemType: 'chat'
//   });
// };

// const handleStarChat = (chatId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setChats(prev => prev.map(chat => {
//     if (chat.id === chatId) {
//       return { ...chat, isStarred: !chat.isStarred };
//     }
//     return chat;
//   }));
// };

// useEffect(() => {
//   const handleResize = () => {
//     if (window.innerWidth < 768) {
//       setIsSidebarOpen(false);
//     }
//   };
//   window.addEventListener('resize', handleResize);
//   return () => window.removeEventListener('resize', handleResize);
// }, []);

// useEffect(() => {
//   if (messagesEndRef.current) {
//     messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//   }
// }, [messages]);

// useEffect(() => {
//   if (chartRef.current && activeTab === 'analysis') {
//     const chart = echarts.init(chartRef.current);
//     const option = {
//       animation: false,
//       title: {
//         text: 'Message Analysis',
//         textStyle: { color: '#e5e7eb' }
//       },
//       tooltip: {
//         trigger: 'axis'
//       },
//       xAxis: {
//         type: 'category',
//         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//         axisLabel: { color: '#e5e7eb' }
//       },
//       yAxis: {
//         type: 'value',
//         axisLabel: { color: '#e5e7eb' }
//       },
//       series: [{
//         data: [120, 200, 150, 80, 70, 110, 130],
//         type: 'line',
//         smooth: true,
//         color: '#818cf8'
//       }]
//     };
//     chart.setOption(option);
//   }
// }, [activeTab]);

// useEffect(() => {
//   if (!isSidebarOpen && !isHovered) {
//     setIsSearchActive(false);
//   }
// }, [isSidebarOpen, isHovered]);

// const resetTextAreaHeight = () => {
//   const textarea = document.querySelector('textarea');
//   if (textarea) {
//     textarea.style.height = '56px';
//   }
// };

// const [isTransitioning, setIsTransitioning] = useState(false);

// // Update the handleSendMessage function
// const handleSendMessage = async () => {
//   if ((!inputText.trim() && !activeFilePreview) || isGenerating) return;

//   setHasMessages(true);

//   if (isMicActive) {
//     setIsMicActive(false);
//   }

//   setIsCleanView(true);

//   let chatToUse = currentChat;

//   if (!chatToUse) {
//     // Create new chat with temporary title
//     chatToUse = {
//       id: Date.now().toString(),
//       title: 'New Chat', // We'll update this after sending the first message
//       createdAt: new Date(),
//       messages: []
//     };
//     setCurrentChat(chatToUse);
//     setChats(prev => [chatToUse, ...prev]);
//   }

//   setShowGreeting(false);
//   setIsChatActive(true);

//   const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

//   const newMessage: Message = {
//     id: messageId,
//     content: inputText || (activeFilePreview ? `Sent: ${activeFilePreview.name}` : ''),
//     type: 'user',
//     timestamp: new Date(),
//     status: 'sending',
//     file: activeFilePreview || undefined
//   };



//   try {
//     const updatedChat = {
//       ...chatToUse,
//       messages: [...chatToUse.messages, newMessage]
//     };

//     // Update chat title if this is the first message
//     if (updatedChat.messages.length === 1) {
//       // Truncate long messages and clean up multiline content
//       const cleanContent = inputText
//         .split('\n')[0] // Take only the first line
//         .trim()
//         .substring(0, 30); // Take first 30 characters

//       const newTitle = cleanContent + (cleanContent.length >= 30 ? '...' : '');
//       updatedChat.title = newTitle;
//     }

//     if (chatToUse.projectId) {
//       setProjects(prev => prev.map(project => {
//         if (project.id === chatToUse.projectId) {
//           return {
//             ...project,
//             chats: project.chats.map(chat =>
//               chat.id === chatToUse.id ? updatedChat : chat
//             )
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Update the chat in the main chats array
//       setChats(prev => prev.map(chat =>
//         chat.id === chatToUse.id ? updatedChat : chat
//       ));
//     }

//     setCurrentChat(updatedChat);
//     setMessages(updatedChat.messages);
//     setInputText('');
//     resetTextAreaHeight();
//     setIsGenerating(true);

//     // Add this helper function to detect image URLs in the response
//     const isImageUrl = (text: string) => {
//       return text.match(/https?:\/\/res\.cloudinary\.com\/[^\s]+\.(jpg|jpeg|png|gif)/i);
//     };

//     // Call the updated API with chat ID and username
//     const aiResponseText = await generateResponse(inputText, chatToUse.id, userProfile?.name || 'user', isSearchEnabled);


//     const sentMessage = { ...newMessage, status: 'sent' };

//     // Check if the response contains an image URL
//     const imageMatch = isImageUrl(aiResponseText);

//     let aiResponse: Message;
//     if (imageMatch) {
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: '',
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent',
//         file: {
//           name: 'generated-image.png',
//           type: 'image/png',
//           url: imageMatch[0] // Use the matched URL
//         }
//       };
//     } else {
//       // Regular text response
//       aiResponse = {
//         id: (Date.now() + 1).toString(),
//         content: aiResponseText,
//         type: 'assistant',
//         timestamp: new Date(),
//         status: 'sent'
//       };
//     }

//     const finalChat = {
//       ...updatedChat,
//       messages: [
//         ...updatedChat.messages.map(msg =>
//           msg.id === newMessage.id ? sentMessage : msg
//         ),
//         aiResponse
//       ]
//     };

//     setChats(prev => prev.map(c =>
//       c.id === finalChat.id ? finalChat : c
//     ));
//     setCurrentChat(finalChat);
//     setMessages(finalChat.messages);
//     setActiveFilePreview(null);

//   } catch (error) {
//     console.error('Failed to send message:', error);
//     const errorMessage = { ...newMessage, status: 'error' };

//     const errorChat = {
//       ...currentChat,
//       messages: currentChat?.messages.map(msg =>
//         msg.id === newMessage.id ? errorMessage : msg
//       ) || []
//     };

//     setChats(prev => prev.map(c =>
//       c.id === currentChat?.id ? errorChat : c
//     ));
//     setCurrentChat(errorChat);
//     setMessages(errorChat.messages);
//   } finally {
//     setIsGenerating(false);
//   }
// };

// const renderMessageStatus = (status: Message['status']) => {
//   switch (status) {
//     case 'sending':
//       return <i className="fas fa-circle-notch fa-spin text-gray-400 ml-2" > </i>;
//     case 'sent':
//       return <i className="fas fa-check text-green-500 ml-2" > </i>;
//     case 'error':
//       return <i className="fas fa-exclamation-circle text-red-500 ml-2" > </i>;
//     default:
//       return null;
//   }
// };

// const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(true);
// };

// const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
// };

// const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//   e.preventDefault();
//   setIsDragging(false);
//   const files = e.dataTransfer.files;
//   handleFiles(files);
// };

// const handleFiles = (files: FileList) => {
//   Array.from(files).forEach(file => {
//     const fileUrl = URL.createObjectURL(file);
//     const filePreview = {
//       name: file.name,
//       type: file.type,
//       url: fileUrl
//     };
//     setActiveFilePreview(filePreview);

//     const newMessage: Message = {
//       id: Date.now().toString(),
//       content: `Attached: ${file.name}`,
//       type: 'user',
//       timestamp: new Date(),
//       status: 'sent',
//       file: filePreview
//     };

//     if (currentChat) {
//       const updatedChat = {
//         ...currentChat,
//         messages: [...currentChat.messages, newMessage]
//       };

//       setChats(prev => prev.map(chat =>
//         chat.id === currentChat.id ? updatedChat : chat
//       ));
//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//     }
//   });

//   setIsUploadModalOpen(false);
// };

// const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//   if (e.target.files) {
//     handleFiles(e.target.files);
//   }
// };

// useEffect(() => {
//   const storedUser = localStorage.getItem('user');
//   const authStatus = localStorage.getItem('isAuthenticated');

//   if (storedUser && authStatus === 'true') {
//     setUserProfile(JSON.parse(storedUser));
//     setIsAuthenticated(true);
//   }
// }, []);

// const handleAuthSubmit = async (data: { email: string; password: string; name?: string }) => {
//   setLoading(true);
//   setFormError('');
//   setFormSuccess('');

//   try {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 1500));

//     const userData = {
//       name: data.name || data.email.split('@')[0],
//       email: data.email
//     };

//     if (isLogin) {
//       setFormSuccess('Successfully logged in!');
//       handleAuthSuccess(userData);
//     } else {
//       setFormSuccess('Account created successfully!');
//       handleSignupSuccess(userData);
//     }

//     // ✅ Store in localStorage
//     localStorage.setItem('user', JSON.stringify(userData));
//     localStorage.setItem('isAuthenticated', 'true');

//     // ✅ Immediately update global state
//     setUserProfile(userData);  // Ensures UI update
//     setIsAuthenticated(true);  // Forces re-render

//   } catch (error) {
//     setFormError('Authentication failed. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };
// // Add this new function to toggle between login and signup
// const toggleAuthMode = () => {
//   setIsLogin(!isLogin);
//   setFormError('');
//   setFormSuccess('');
// };

// const handleIntroductionComplete = (name: string) => {
//   setUserName(name);
//   setShowIntroduction(false);
//   setShowGreeting(false);
// };

// const handleSignupSuccess = (userData: { name: string; email: string }) => {
//   handleAuthSuccess(userData);
//   setShowIntroduction(true);
// };

// const handleAuthSuccess = (userData: { name: string; email: string }) => {
//   setIsAuthenticated(true);
//   setUserProfile(userData);
//   setIsLoginModalOpen(false);
//   setChats([]);
//   setMessages([]);
//   setCurrentChat(null);
//   setShowGreeting(true);
// };

// const handleLogout = () => {
//   // Remove stored user session data
//   localStorage.removeItem("sessionData");
//   localStorage.removeItem("user");
//   localStorage.removeItem("isAuthenticated");

//   // Update state to reflect logout
//   setUserProfile({ name: "" });
//   setIsAuthenticated(false);

//   // Redirect or refresh to reflect logout
//   window.location.reload();
// };

// useEffect(() => {
//   const sessionData = localStorage.getItem("sessionData");
//   if (sessionData) {
//     const parsedData = JSON.parse(sessionData);
//     setIsAuthenticated(true);
//     setUserProfile({
//       name: parsedData.username,
//       email: parsedData.username || 'user@example.com'
//     });
//   }
// }, []);
// // Update useEffect for fetching chats in App.tsx
// // Update useEffect for fetching chats
// // Update useEffect for fetching chats
// useEffect(() => {
//   if (userProfile?.name) {
//     fetchUserChats(userProfile.name)
//       .then((response) => {
//         if (response && response.chats && Array.isArray(response.chats)) {
//           const formattedChats: Chat[] = response.chats.map(chatData => ({
//             id: chatData.chat_id,
//             title: chatData.first_message || 'New Chat',
//             createdAt: new Date(chatData.timestamp),
//             messages: [{
//               id: `msg_${Date.now()}_${Math.random()}`,
//               content: chatData.first_message,
//               type: 'user',
//               timestamp: new Date(chatData.timestamp),
//               status: 'sent'
//             }],
//             isStarred: false,
//             isEditing: false
//           }));

//           formattedChats.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
//           setChats(formattedChats);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching chats:', error);
//         setChats([]);
//       });
//   }
// }, [userProfile]);

// // Remove the import for getChatHistory since we're not using it anymore
// // import { getChatHistory } from './services/api';

// const Greeting = React.memo(() => {
//   const [displayText, setDisplayText] = useState('');
//   const hour = new Date().getHours();
//   const greetingText = hour >= 0 && hour < 12
//     ? 'Good morning'
//     : hour >= 12 && hour < 16
//       ? 'Good afternoon'
//       : 'Good evening';

//   useEffect(() => {
//     if (!hasGreetingPlayed) {
//       // Only add comma if there's a username
//       const fullText = userProfile?.name
//         ? `${greetingText}, ${userProfile.name}`
//         : greetingText;

//       let timeouts: NodeJS.Timeout[] = [];

//       [...fullText].forEach((char, index) => {
//         const timeout = setTimeout(() => {
//           setDisplayText(prev => prev + char);
//           if (index === fullText.length - 1) {
//             setHasGreetingPlayed(true);
//           }
//         }, 100 * index);
//         timeouts.push(timeout);
//       });

//       return () => timeouts.forEach(clearTimeout);
//     } else {
//       // Only add comma if there's a username
//       const fullText = userProfile?.name
//         ? `${greetingText}, ${userProfile.name}`
//         : greetingText;
//       setDisplayText(fullText);
//     }
//   }, [greetingText, userProfile?.name]);

//   return (
//     <h1 className= "text-4xl font-light text-center" >
//     { displayText }
//     </h1>
//     );
//   });

// const handleVoiceTranscript = (text: string) => {
//   setInputText(text);
// };

// const handleVoiceStateChange = (isActive: boolean) => {
//   setIsMicActive(isActive);
// };

// const handleLanguageChange = async (language: { code: string; name: string; nativeName: string }) => {
//   setSelectedLanguage(language);

//   if (currentChat && currentChat.messages.length > 0) {
//     try {
//       setIsGenerating(true);

//       const translatedMessages = await Promise.all(
//         currentChat.messages.map(async (msg) => {
//           const translatedContent = await translateText(msg.content, language.name);
//           return {
//             ...msg,
//             content: translatedContent
//           };
//         })
//       );

//       const updatedChat = {
//         ...currentChat,
//         messages: translatedMessages
//       };

//       setChats(prev => prev.map(chat =>
//         chat.id === currentChat.id ? updatedChat : chat
//       ));
//       setCurrentChat(updatedChat);
//       setMessages(updatedChat.messages);
//     } catch (error) {
//       console.error('Translation failed:', error);
//     } finally {
//       setIsGenerating(false);
//     }
//   }
// };

// const parseMessageContent = (content: string) => {
//   const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
//   const parts = [];
//   let lastIndex = 0;
//   let match;

//   while ((match = codeBlockRegex.exec(content)) !== null) {
//     if (match.index > lastIndex) {
//       parts.push({
//         type: 'text',
//         content: content.slice(lastIndex, match.index)
//       });
//     }

//     parts.push({
//       type: 'code',
//       language: match[1] || 'plaintext',
//       content: match[2].trim()
//     });

//     lastIndex = match.index + match[0].length;
//   }


//   if (lastIndex < content.length) {
//     parts.push({
//       type: 'text',
//       content: content.slice(lastIndex)
//     });
//   }

//   return parts.length > 0 ? parts : [{ type: 'text', content }];
// };

// const handleCodeClick = (content: string, language: string) => {
//   setSelectedCode({ content, language });
//   setIsInfoPanelOpen(true);
// };

// const handleTextAreaResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//   const textarea = e.target;
//   const value = textarea.value;

//   if (!value.trim()) {
//     textarea.style.height = '56px';
//   } else {
//     textarea.style.height = 'inherit';
//     textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
//   }

//   setInputText(value);
// };

// const handleCodeBlockClick = (content: string, language: string) => {
//   setSelectedCodeBlock({
//     content: content.trim(),
//     language: language || 'plaintext'
//   });
//   setIsCodeSliderOpen(true);
// };

// const handleModelSelect = (modelName: string) => {
//   setSelectedModel(modelName);
//   setIsModelDropdownOpen(false);
// };

// const ModelDropdown = ({ onSelect }: { onSelect: (model: string) => void }) => {
//   return (
//     <div 
//         className= {`absolute top-full left-0 mt-2 w-48 rounded-lg shadow-lg overflow-n z-[9999] ${isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-200'
//       }`
// }
//       >
// {
//   models.map((model) => (
//     <button
//             key= { model.id }
//             onClick = {() => onSelect(model.name)}
// className = {`w-full flex items-center px-4 py-3 text-left ${isDarkMode
//   ? 'hover:bg-gray-600 text-gray-200'
//   : 'hover:bg-gray-50 text-gray-700'
//   } ${selectedModel === model.name ? (isDarkMode ? 'bg-gray-600' : 'bg-gray-50') : ''}`}
//           >
//   <i className={
//   `fas ${model.icon} mr-3 ${selectedModel === model.name ? 'text-blue-500' : 'text-gray-400'
//     }`
// }> </i>
//   < span > { model.name } </span>
//   </button>
//         ))}
// </div>
//     );
//   };

// const handleActionCapsuleClick = (action: string, suggestion?: string) => {
//   let promptText = '';

//   if (suggestion) {
//     // If a suggestion was clicked, use it directly
//     switch (action) {
//       case 'explain':
//         promptText = `${suggestion}: `;
//         break;
//       case 'summarize':
//         promptText = `${suggestion} for: `;
//         break;
//       case 'translate':
//         promptText = `${suggestion}: `;
//         break;
//       case 'improve':
//         promptText = `${suggestion}: `;
//         break;
//       case 'code':
//         promptText = `${suggestion}: `;
//         break;
//     }
//   } else {
//     // Default prompts when capsule is clicked
//     switch (action) {
//       case 'explain':
//         promptText = 'Please explain this in detail: ';
//         break;
//       case 'summarize':
//         promptText = 'Please provide a summary of: ';
//         break;
//       case 'translate':
//         promptText = 'Please translate this to English: ';
//         break;
//       case 'improve':
//         promptText = 'Please improve the writing of this text: ';
//         break;
//       case 'code':
//         promptText = 'Please generate code for: ';
//         break;
//     }
//   }
//   setInputText(promptText);
// };

// // Update the handlers for toggling sections
// const handleToggleStarredChats = () => {
//   if (!isShowingStarredChats) {
//     setIsShowingChats(false); // Hide recent chats when showing starred
//   }
//   setIsShowingStarredChats(!isShowingStarredChats);
// };

// const handleToggleRecentChats = () => {
//   if (!isShowingChats) {
//     setIsShowingStarredChats(false); // Hide starred chats when showing recent
//   }
//   setIsShowingChats(!isShowingChats);
// };

// // Add new handler for project click
// const handleProjectClick = (project: Project) => {
//   setSelectedProject(project);
//   setIsProjectChatListOpen(true);
// };

// // Modify handleAddProject to include name editing
// const handleAddProject = () => {
//   const newProject: Project = {
//     id: `proj_${Date.now()}`,
//     name: `New Project`,
//     createdAt: new Date(),
//     chats: [],
//     isEditing: true // Start in editing mode
//   };
//   setProjects(prev => [newProject, ...prev]);
// };

// // Add new handlers for project management
// const handleProjectNameEdit = (projectId: string, newName: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         name: newName,
//         isEditing: false
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectNameEditStart = (projectId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return { ...project, isEditing: true };
//     }
//     return { ...project, isEditing: false };
//   }));
// };

// // Update handleNewProjectChat
// const handleNewProjectChat = (projectId: string) => {
//   const newChat: Chat = {
//     id: Date.now().toString(),
//     title: 'New Chat', // This will be updated with first message
//     createdAt: new Date(),
//     messages: [],
//     projectId: projectId,
//     isEditing: false // Don't start in editing mode since title will update automatically
//   };

//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: [newChat, ...project.chats]
//       };
//     }
//     return project;
//   }));

//   setCurrentChat(newChat);
//   setMessages([]);
//   setIsNewChatStarted(true);
//   setShowGreeting(false);
//   setIsChatActive(true);
// };

// // Add project chat management functions
// const handleProjectChatTitleEdit = (projectId: string, chatId: string, newTitle: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => {
//           if (chat.id === chatId) {
//             const updatedChat = { ...chat, title: newTitle, isEditing: false };
//             if (currentChat?.id === chatId) {
//               setCurrentChat(updatedChat);
//             }
//             return updatedChat;
//           }
//           return chat;
//         })
//       };
//     }
//     return project;
//   }));
// };

// const handleProjectChatTitleEditStart = (projectId: string, chatId: string) => {
//   setProjects(prev => prev.map(project => {
//     if (project.id === projectId) {
//       return {
//         ...project,
//         chats: project.chats.map(chat => ({
//           ...chat,
//           isEditing: chat.id === chatId
//         }))
//       };
//     }
//     return project;
//   }));
// };

// // Add handler for toggling project collapse
// const handleProjectCollapse = (projectId: string, e: React.MouseEvent) => {
//   e.stopPropagation();
//   setCollapsedProjects(prev => ({
//     ...prev,
//     [projectId]: !prev[projectId]
//   }));
// };

// // Add new handler for project deletion
// const handleConfirmDelete = () => {
//   const { itemId, itemType, projectId } = deleteConfirmation;

//   if (itemType === 'project') {
//     // Handle project deletion
//     if (currentChat?.projectId === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//     setProjects(prev => prev.filter(project => project.id !== itemId));
//   } else {
//     // Handle chat deletion
//     if (projectId) {
//       // Delete project chat
//       setProjects(prev => prev.map(project => {
//         if (project.id === projectId) {
//           return {
//             ...project,
//             chats: project.chats.filter(chat => chat.id !== itemId)
//           };
//         }
//         return project;
//       }));
//     } else {
//       // Delete regular chat
//       setChats(prev => prev.filter(chat => chat.id !== itemId));
//     }

//     if (currentChat?.id === itemId) {
//       setCurrentChat(null);
//       setMessages([]);
//       setShowGreeting(true);
//       setIsChatActive(false);
//     }
//   }

//   setDeleteConfirmation(prev => ({ ...prev, isOpen: false }));
// };

// return (
//   <div className= {`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
//     <div className={
//   `flex h-screen overflow-hidden ${isDarkMode
//     ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100'
//     : 'bg-gradient-to-br from-white via-gray-100 to-blue-50 text-gray-800'
//     }`
// }>
//   {/* Fixed brand text container */ }
//   < div className = {`fixed top-0 left-16 h-16 flex items-center px-4 z-50 transition-all duration-300 ${isSidebarOpen ? 'translate-x-56' : 'translate-x-0'
//     }`}>
//       <span 
//             onClick={ handleHomeClick }  // Add this line
// className = "text-3xl font-medium cursor-pointer bg-clip-text text-transparent hover:opacity-80 transition-opacity" // Add hover effect
// style = {{
//   background: 'linear-gradient(135deg, #FF9933 25%, rgba(255,255,255,0.8) 50%, #138808 75%)',
//     WebkitBackgroundClip: 'text',
//       textShadow: isDarkMode ? '0 2px 4px rgba(0,0,0,0.3)' : '0 1px 2px rgba(0,0,0,0.1)',
//         WebkitTextStroke: isDarkMode ? '0.7px rgba(255,255,255,0.1)' : 'none',
//           letterSpacing: '0.5px'
// }}
//           >
//   Hind AI
//     </span>
//     </div>

// {/* Sidebar */ }
// <div 
//           className={
//   `${isSidebarOpen ? 'w-72' : 'w-16'
//     } fixed md:relative h-full transition-all duration-300 ease-in-out ${isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
//     } backdrop-blur-sm flex flex-col shadow-lg overflow-y-auto z-40`
// }
//         >
//   {/* Top section - only toggle button */ }
//   < div className = "flex items-center p-4" >
//     <button 
//               onClick={ () => setIsSidebarOpen(!isSidebarOpen) }
// className = "text-gray-400 hover:text-gray-600 w-8 flex-shrink-0"
//   >
//   <i className={ `fas ${isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'}` }> </i>
//     </button>
//     </div>

// {/* Main content with icons-only when collapsed */ }
// <nav className="flex-1 px-2" >
//   <button 
//               className="w-full flex items-center p-2 mb-2 rounded-lg"
// onClick = { handleNewChat }
//   >
//   <i className="fa-solid fa-plus w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       New Chat
//         </span>
//         </button>

// {/* Search section */ }
// <div className="px mb-4" >
//   {
//     isSidebarOpen?(
//                 <div className = "relative" >
//         <input
//                     type="search"
//       placeholder = "Search conversations..."
//                     className = {`w-full pl-9 pr-4 py-2 ${isDarkMode
//         ? 'bg-gray-700 text-gray-200 placeholder-gray-400'
//         : 'bg-gray-100 text-gray-800'
//         } outline-none rounded-lg focus:ring-2 focus:ring-blue-400 ring-offset-0`}
//   />
//   <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" > </i>
//     </div>
//               ) : (
//   <button
//                   onClick= {() => setIsSidebarOpen(true)}
// className = {`w-full p-2 rounded-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
//   }`}
//                 >
//   <i className="fa-solid fa-magnifying-glass" title = "Search" > </i>
//     </button>
//               )}
// </div>

// {/* Projects Section */ }
// <div className="mb-2 pl-4" > {/* Increased pl-2 to pl-4 */ }
//   < div className = {`flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}`}>
//     <div className="flex items-center flex-1" >
//       <i 
//                     className="fa-solid fa-folder text-blue-400 w-8"
// title = "Projects"
// onClick = {() => setIsProjectListOpen(true)}
// style = {{ cursor: 'pointer' }}
//                   > </i>
// {
//   isSidebarOpen && (
//     <div className="flex items-center flex-1" >
//       <span 
//                         className="text-sm font-medium ml-1"
//   onClick = {() => setIsProjectListOpen(true)
// }
// style = {{ cursor: 'pointer' }}
//                       >
//   Projects
//   </span>
//   < button
// onClick = { handleAddProject }
// className = {`ml-4 p-2 rounded-lg transition-colors ${  // Increased ml-3 to ml-4 and p-1.5 to p-2
//   isDarkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
//   }`}
//                       >
//   <i className="fa-solid fa-plus text-xs" > </i>
//     </button>
//     </div>
//                   )}
// </div>
//   </div>
// {
//   isSidebarOpen && projects.length > 0 && (
//     <div className="space-y-1 ml-3" > {/* Increased ml-2 to ml-3 */ }
//   {
//     projects.map(project => (
//       <div
//                       key= { project.id }
//                       className = {`group px-2 py-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//         }`}
//                     >
//     <div className="flex items-center justify-between" >
//       <div className="flex items-center flex-1 min-w-0" >
//         <div className="flex items-center" >
//           <button
//                               onClick={ (e) => handleProjectCollapse(project.id, e) }
//   className = {`mr-1 p-1 rounded-lg transition-transform duration-200 ${  // Added mr-1 for right margin
//     isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//     }`
// }
// style = {{ width: '20px' }}  // Fixed width for consistent spacing
//                             >
//   <i className={
//   `fas fa-chevron-right text-xs text-gray-400 transform transition-transform duration-200 ${!collapsedProjects[project.id] ? 'rotate-90' : ''
//     }`
// }> </i>
//   </button>
//   < i className = "fa-regular fa-folder-open w-8 text-blue-400 ml-1" > </i>  {/ * Added ml - 1 */}
// </div>
// {
//   project.isEditing ? (
//     <input
//                               type= "text"
//                               defaultValue = { project.name }
//   autoFocus
//   onBlur = {(e) => handleProjectNameEdit(project.id, e.target.value)
// }
// onKeyDown = {(e) => {
//   if (e.key === 'Enter') {
//     handleProjectNameEdit(project.id, e.currentTarget.value);
//   }
// }}
// className = {`text-sm px-2 py-1 rounded flex-1 mr-2 ${isDarkMode
//   ? 'bg-gray-600 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                             />
//                           ) : (
//   <span 
//                               className= "text-sm truncate flex-1"
// onDoubleClick = {() => handleProjectNameEditStart(project.id)}
//                             >
//   { project.name }
//   </span>
//                           )}
// </div>
//   < div className = "flex items-center space-x-2 opacity-0 group-hover:opacity-100" >
//     <button
//                             onClick={ () => handleNewProjectChat(project.id) }
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                           >
//   <i className="fas fa-plus-circle" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteProject(project.id, e)}
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                           >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </div>
// {/* Project Chats */ }
// {
//   project.chats.length > 0 && !collapsedProjects[project.id] && (
//     <div className="ml-8 mt-2 space-y-1" >
//     {
//       project.chats.map((chat, index) => (
//         <div
//                               key= { chat.id }
//                               onClick = {() => handleChatSelect(chat)}
//   className = {`group flex items-center justify-between px-2 py-1 rounded ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
//     }`
// }
//                             >
//   <div className="flex items-center space-x-2 flex-1 min-w-0" >
//     <i className="fas fa-comment-alt text-xs text-gray-400" > </i>
// {
//   chat.isEditing ? (
//     <input
//                                     type= "text"
//                                     defaultValue = { chat.title }
//   autoFocus
//   onClick = { e => e.stopPropagation() }
//   onBlur = {(e) => handleProjectChatTitleEdit(project.id, chat.id, e.target.value)
// }
// onKeyDown = {(e) => {
//   if (e.key === 'Enter') {
//     handleProjectChatTitleEdit(project.id, chat.id, e.currentTarget.value);
//   }
// }}
// className = {`text-sm px-2 py-1 rounded flex-1 ${isDarkMode
//   ? 'bg-gray-700 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                                   />
//                                 ) : (
//   <span 
//                                     className= "text-sm truncate"
// onDoubleClick = {(e) => {
//   e.stopPropagation();
//   handleProjectChatTitleEditStart(project.id, chat.id);
// }}
//                                   >
//   { chat.title }
//   </span>
//                                 )}
// </div>
//   < div className = "flex items-center space-x-1 opacity-0 group-hover:opacity-100" >
//     <button
//                                   onClick={
//   (e) => {
//     e.stopPropagation();
//     handleProjectChatTitleEditStart(project.id, chat.id);
//   }
// }
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                                 >
//   <i className="fas fa-edit text-xs" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteProjectChat(project.id, chat.id, e)}
// className = {`p-1 rounded-full ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                                 >
//   <i className="fas fa-trash text-xs" > </i>
//     </button>
//     </div>
//     </div>
//                           ))}
// </div>
//                       )}
// </div>
//                   ))}
// </div>
//               )}
// </div>

// {/* Starred Chats Section */ }
// <div className="mb-4" >
//   <div className={ `flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}` }>
//     <button
//                   onClick={
//   () => {
//     if (!isSidebarOpen) {
//       setChatListInitialTab('starred');
//       setIsChatListOpen(true);
//     }
//   }
// }
// className = "relative"
//   >
//   <i className="fa-solid fa-star text-yellow-500 w-8" title = "Starred chats" > </i>
//     </button>
// { isSidebarOpen && <span className="text-sm font-medium" > Starred Chats </span> }
// </div>
//   < div className = "space-y-1" >
//   {
//     chats
//                   .filter(chat => chat.isStarred)
//       .map((chat) => (
//         <div
//                       key= {`starred_${chat.id}`}
// className = {`group flex items-center p-2 rounded-lg cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
//   }`}
// onClick = {() => handleChatSelect(chat)}
//                     >
//   <i className="fas fa-comment-alt w-8 text-yellow-500/80" > </i>
// {
//   isSidebarOpen && (
//     <>
//     <span className="ml-2 truncate flex-1" > { chat.title } </span>
//       < button
//   onClick = {(e) => handleStarChat(chat.id, e)
// }
// className = "ml-auto p-1 opacity-0 group-hover:opacity-100 rounded-full transition-all"
//   >
//   <i className="fas fa-star text-yellow-500" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = {`p-1 rounded-full opacity-0 group-hover:opacity-100 transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-red-400'
//   : 'text-gray-500 hover:text-red-500'
//   }`}
//                           >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </>
//                       )}
// </div>
//                   ))}
// </div>
//   </div>

// {/* All Chats Section */ }
// <div className={ `flex items-center px-2 py-2 ${!isSidebarOpen ? 'justify-center' : ''}` }>
//   <button
//                 onClick={
//   () => {
//     if (!isSidebarOpen) {
//       setChatListInitialTab('all');
//       setIsChatListOpen(true);
//     }
//   }
// }
// className = "relative"
//   >
//   <i className="fa-solid fa-comments w-8"title = "All Chats" > </i>
//     </button>
// { isSidebarOpen && <span className="text-sm font-medium" > All Chats </span> }
// </div>

// {/* Chat list section */ }
// <div className="space-y-1" >
// {
//   chats.filter(chat => !chat.isStarred).map((chat, index) => (
//     <div
//     key= { chat.id || `all_${index}` } // Use index as fallback if chat.id is undefined
//     className = {`group flex items-center p-2 rounded-lg cursor-pointer`}
// onClick = {() => handleChatSelect(chat)}
//   >
//   <i className="fa-regular fa-comment w-8" > </i>
// {
//   isSidebarOpen && (
//     <>
//     {
//       chat.isEditing ? (
//         <input
//                           type= "text"
//                           defaultValue={ chat.title }
//                           autoFocus
//                           onClick={ e => e.stopPropagation() }
//                           onBlur={(e) => handleChatTitleEdit(chat.id, e.target.value)
//     }
//                           onKeyDown = {(e) => {
//     if (e.key === 'Enter') {
//       handleChatTitleEdit(chat.id, e.currentTarget.value);
//     }
//   }
// }
// className = {`text-sm px-2 py-1 rounded flex-1 mr-2 ${isDarkMode
//   ? 'bg-gray-600 text-gray-200'
//   : 'bg-gray-100 text-gray-800'
//   }`}
//                         />
//                       ) : (
//   <span 
//                           className= "ml-2 truncate flex-1"
// onDoubleClick = {(e) => {
//   e.stopPropagation();
//   handleChatTitleEditStart(chat.id);
// }}
//                         >
//   { chat.title }
//   </span>
//                       )}
// <div className="ml-auto flex items-center space-x-1 opacity-0 group-hover:opacity-100" >
//   <button
//                           onClick={
//   (e) => {
//     e.stopPropagation();
//     handleChatTitleEditStart(chat.id);
//   }
// }
// className = {`p-1 rounded-full transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-500 hover:text-blue-500'
//   }`}
//                         >
//   <i className="fas fa-edit" > </i>
//     </button>
//     < button
// onClick = {(e) => handleStarChat(chat.id, e)}
// className = {`p-1 rounded-full transition-colors ${chat.isStarred ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
//   }`}
//                         >
//   <i className="fas fa-star" > </i>
//     </button>
//     < button
// onClick = {(e) => handleDeleteChat(chat.id, e)}
// className = "p-1 rounded-full text-gray-400 hover:text-red-500 transition-colors"
//   >
//   <i className="fas fa-trash" > </i>
//     </button>
//     </div>
//     </>
//                   )}
// </div>
//               ))}
// </div>
//   </nav>

// {/* Auth section at bottom */ }
// <div className="mt-auto p-2 border-t border-gray-700/50" >
// {
//   isAuthenticated?(
//               <div className = "space-y-1" >
//       <div className="flex items-center p-2 rounded-lg">
//   <i className="fa-solid fa-user w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       { userProfile?.name }
//       </span>
//       </div>
//       < button
// onClick = { handleLogout }
// className = "w-full flex items-center p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
//   >
//   <i className="fa-solid fa-right-from-bracket w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       Logout
//       </span>
//       </button>
//       </div>
//             ) : (
//   <div className= "space-y-1" >
//   <button className="w-full flex items-center p-2" onClick = {() => setIsLoginModalOpen(true)}>
//     <i className="fa-solid fa-right-to-bracket w-8" > </i>
//       < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//         Login
//         </span>
//         </button>
//         < button
// className = "w-full flex items-center p-2 text-indigo-500"
// onClick = {() => {
//   setIsLogin(false);

//   setTimeout(() => setIsLoginModalOpen(true), 50);
// }}
//                 >
//   <i className="fa-solid fa-user-plus w-8" > </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       Sign Up
//         </span>
//         </button>
//         </div>
//             )}

// <button 
//               onClick={ toggleDarkMode }
// className = "w-full flex items-center p-2 mt-2 rounded-lg hover:bg-gray-700/20"
//   >
//   <i className={ `fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} w-8` }> </i>
//     < span className = {`${!isSidebarOpen ? 'hidden' : 'block'} ml-2`}>
//       { isDarkMode? 'Light Mode': 'Dark Mode' }
//       </span>
//       </button>
//       </div>
//       </div>

//       < div className = "flex-1 flex flex-col relative pt-16 pl-16" >
//         <div className={
//   `flex-1 overflow-y-auto transition-all duration-300 ${isCodeSliderOpen ? 'lg:pr-[50%]' : ''
//     }`
// }>
//   {/* Main chat section that shifts left when slider opens */ }
//   < div className = {`
//               w-full transition-all duration-300 
//               ${isCodeSliderOpen
//       ? 'lg:max-w-full lg:pr-60' // Add right padding when slider is open
//       : 'max-w-3xl mx-auto'
//     }
//               relative flex flex-col h-full pb-[170px] // Add these styles
//             `}>
//   {/* Chat content */ }
//   < div className = {`w-full ${!isCodeSliderOpen ? 'max-w-3xl mx-auto' : ''} ${hasMessages || isNewChatStarted ? 'flex-1' : ''
//     }`}>
//       { showGreeting && !hasMessages && !isNewChatStarted ? (
//         <div className= "flex justify-center items-center min-h-[200px]" >
//         <Greeting />
//     </div>
//                 ) : (
//   <div className= "flex-1 flex flex-col justify-end" >
//   <div className="flex-1 space-y-4 py-4 px-4 mb-40" >

//   {
//     messages.map((message, index) => (
//       <div
//       key= {`${message.id}_${index}`}
// className = {`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-slideInFromTop`}
// style = {{ animationDelay: `${index * 100}ms` }}
//     >



//   <div
//                             className={
//   `max-w-[80%] rounded-[20px] p-4 message-bubble cursor-pointer hover:opacity-95 transition-all duration-300 ${message.type === 'user'
//     ? isDarkMode
//       ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/10 rounded-br-md'
//       : 'bg-indigo-500 text-white shadow-md hover:shadow-lg rounded-br-md'
//     : isDarkMode
//       ? 'bg-gray-800 text-gray-100 shadow-lg shadow-gray-900/10 rounded-bl-md'
//       : 'bg-white text-gray-800 border border-gray-100 shadow-md hover:shadow-lg rounded-bl-md'
//     }`
// }
// style = {{
//   backdropFilter: 'blur(8px)',
//                             }}
//                           >
//   <div className="flex items-center justify-between mb-1" >
//     <div className="flex items-center" >
//       <i className={ `fas ${message.type === 'user' ? 'fa-user' : 'fa-robot'} mr-2` }> </i>
//         < span className = "text-sm opacity-75" >
//           { new Date(message.timestamp).toLocaleTimeString() }
//           </span>
//           </div>
// { renderMessageStatus(message.status) }
// </div>


// {
//   message.file && (
//     <div className="mb-2" >
//       {
//         message.file.type.startsWith('image/') ? (
//           <ImagePreview 
//                                     imageUrl= { message.file.url }
//                                     isDarkMode={ isDarkMode }
//                                     fileName={ message.file.name }
//         />
//                                 ) : message.file.type === 'application/pdf' ? (
//           <div className= "flex items-center space-x-2 bg-black/20 rounded-lg p-3" >
//           <i className="fas fa-file-pdf text-2xl text-red-400"> </i>
//             < div className="flex-1 min-w-0" >
//             <div className="truncate"> { message.file.name } </div>
//               < div className="text-sm opacity-75" > PDF Document</ div >
//       </div>
//       < a
//   href = { message.file.url }
//   target = "_blank"
//   rel = "noopener noreferrer"
//   className = "p-2 hover:bg-white/10 rounded-full transition-colors"
//     >
//     <i className="fas fa-external-link-alt" > </i>
//       </a>
//       </div>
//                                 ) : (
//     <div className= "flex items-center space-x-2 bg-black/20 rounded-lg p-3" >
//     <i className="fas fa-file text-2xl text-blue-400" > </i>
//       < div className = "flex-1 min-w-0" >
//         <div className="truncate" > { message.file.name } </div>
//           < div className = "text-sm opacity-75" > Document </div>
//             </div>
//             < a
//   href = { message.file.url }
//   target = "_blank"
//   rel = "noopener noreferrer"
//   className = "p-2 hover:bg-white/10 rounded-full transition-colors"
//     >
//     <i className="fas fa-download" > </i>
//       </a>
//       </div>
//                                 )
// }
// </div>
//                             )}



// <div className="space-y-4" >
// {
//   parseMessageContent(message.content).map((part, index) => (
//     part.type === 'code' ? (
//       <div 
//                                     key= { index }
//                                     onClick = {() => handleCodeBlockClick(part.content, part.language)}
// className = {`cursor-pointer group rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
//   }`}
//                                   >
//   <div className={
//   `flex items-center justify-between px-4 py-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
//     }`
// }>
//   <div className="flex items-center space-x-2" >
//     <i className="fas fa-code" > </i>
//       < span className = {`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'
//         }`}>
//           { part.language }
//           </span>
//           </div>
//           < div className = {`opacity-0 group-hover:opacity-100 transition-opacity ${isDarkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               <i className="fas fa-expand-alt" > </i>
//                 </div>
//                 </div>
//                 < div className = "p-4 max-h-60 overflow-hidden relative" >
//                   <pre className="overflow-x-auto" >
//                     <code className={
//   `language-${part.language} ${isDarkMode ? 'text-gray-300' : 'text-gray-800'
//     }`
// }>

//   { part.content }
//   </code>
//   </pre>
//   < div className = {`absolute bottom-0 inset-x-0 h-8 ${isDarkMode
//     ? 'bg-gradient-to-t from-gray-800'
//     : 'bg-gradient-to-t from-gray-50'
//     }`}> </div>
//       </div>
//       </div>
//                                 ) : (
//   <p key= { index } className = "text-base leading-relaxed whitespace-pre-wrap" >
//     { part.content }
//     </p>
//                                 )
//                               ))}
// </div>
//   </div>
//   </div>
//                       ))}
// {
//   isGenerating && (
//     <div className="flex justify-start items-center " >
//       <div className="max-w-[80%] rounded-[20px] p-2 " >
//         <LoadingDots isDarkMode={ isDarkMode } />
//           </div>
//           </div>
//                       )
// }
// <div ref={ messagesEndRef } />
//   </div>
//   </div>  
//                 )}



// {/* Chat input section */ }
// <div className={
//   `
//                                     ${hasMessages || isNewChatStarted
//       ? 'fixed bottom-6 lg:left-16 transition-all duration-300'
//       : 'sticky bottom-6'
//     } w-full px-4
//                                     ${isCodeSliderOpen
//       ? 'lg:left-30 lg:w-[36%] lg:translate-x-0' // Reduced left margin
//       : 'mx-auto'
//     }
//                                   `}>
//   <div className={
//   `
//                                       max-w-4xl
//                                       ${showGreeting
//       ? 'mx-auto'
//       : isCodeSliderOpen
//         ? 'lg:ml-0' // Remove margin when slider is open
//         : 'mx-auto'
//     }
//                                     `}>
//   <div className={
//   `relative rounded-[20px] shadow-lg chat-glow transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white'
//     }`
// }>
//   { activeFilePreview && (
//     <div className={
//   `w-full px-4 py-3 ${isDarkMode
//     ? 'bg-gray-700/30'
//     : 'bg-gray-50/50'
//     }`
// }>
//   <div className="flex items-center justify-between" >
//     <div className="flex items-center space-x-3" >
//       <i className={
//   `fas ${activeFilePreview.type.startsWith('image/')
//     ? 'fa-image text-green-400'
//     : activeFilePreview.type === 'application/pdf'
//       ? 'fa-file-pdf text-red-400'
//       : 'fa-file text-blue-400'
//     } text-lg`
// }> </i>
//   < div className = "flex flex-col" >
//     <span className="text-sm font-medium truncate max-w-[200px]" >
//       { activeFilePreview.name }
//       </span>
//       < span className = {`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//         Ready to send
//           </span>
//           </div>
//           </div>
//           < button
// onClick = {() => setActiveFilePreview(null)}
// className = {`p-1.5 rounded-full transition-colors ${isDarkMode
//   ? 'hover:bg-gray-600 text-gray-400'
//   : 'hover:bg-gray-200 text-gray-500'
//   }`}
//                             >
//   <i className="fas fa-times" > </i>
//     </button>
//     </div>
//     </div>
//                       )}

// {
//   messages.length > 0 && messages[messages.length - 1].file && (
//     <div className={
//     `w-full px-4 py-2 ${isDarkMode
//       ? 'bg-gray-700/30'
//       : 'bg-gray-50/50'
//       }`
//   }>
//     <div className="flex items-center justify-between" >
//       <div className="flex items-center space-x-2" >
//         <i className={
//     `fas ${messages[messages.length - 1].file?.type.startsWith('image/')
//       ? 'fa-image text-green-400'
//       : messages[messages.length - 1].file?.type === 'application/pdf'
//         ? 'fa-file-pdf text-red-400'
//         : 'fa-file text-blue-400'
//       }`
//   }> </i>
//     < span className = "text-sm truncate max-w-[200px]" >
//       { messages[messages.length - 1].file?.name }
//       </span>
//       </div>
//       < div className = "flex items-center space-x-2" >
//         <span className={ `text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}` }>
//           File attached
//             </span>
//             < i className = "fas fa-check text-green-400" > </i>
//               </div>
//               </div>
//               </div>
//                       )
// }

// <div className="relative flex flex-col" >
//   <div className="min-h-[56px] max-h-[200px] overflow-hidden" >
//     <textarea
//                             className={
//   `w-full rounded-[20px] outline-none resize-none p-4 h-14 transition-colors ${isDarkMode
//     ? 'bg-gray-800 text-gray-200 placeholder-gray-400'
//     : 'bg-white text-gray-800 placeholder-gray-500'
//     }`
// }
// value = { inputText }
// onChange = { handleTextAreaResize }
// placeholder = {`${activeFilePreview ? 'Press Enter to send file' : `Message ${selectedModel}...`}`}
// onKeyDown = {(e) => {
//   if (e.key === 'Enter' && !e.shiftKey) {
//     e.preventDefault();
//     if (activeFilePreview || inputText.trim()) {
//       handleSendMessage();
//     }
//   }
// }}
// style = {{
//   minHeight: '56px',
//     maxHeight: '200px'
// }}
//                           />
//   </div>

//   < div className = {`flex items-center justify-between p-4 rounded-b-[20px] ${isDarkMode ? 'bg-gray-800' : 'bg-white'
//     }`}>
//       <div className="flex items-center space-x-2" >
//         <div className="flex items-center space-x-2" >
//           {/* Model container */ }
//           < ModelSelector isDarkMode = { isDarkMode } onModelChange = { setSelectedModel } models = { models } />

//             {/* Language container */ }
//             < div className = "relative inline-block" >
//               <LanguageSelector
//                                      isDarkMode={ isDarkMode }
// onLanguageChange = { handleLanguageChange }
// selectedLanguage = { selectedLanguage }
// className = "z-[9999]"
// dropdownPosition = "absolute"
//   />
//   </div>

// {/* Search button */ }
// <button
//   className={ `flex items-center space-x-2 ${isSearchEnabled ? 'text-blue-500' : 'hover:text-gray-700'}` }
// title = "Search the web"
// onClick = { handleSearchToggle }
//   >
//   <GlobeIcon className="w-5 h-5" />
//     <span>{ isSearchEnabled? ' Search': 'Search' } </span>
//     </button>

//     </div>

//     </div>

//     < div className = "flex items-center space-x-2" >
//       <button
//                               className={
//   `p-2 rounded-full transition-colors ${isDarkMode
//     ? 'text-gray-400 hover:text-blue-400'
//     : 'text-gray-400 hover:text-indigo-600'
//     }`
// }
// onClick = {() => setIsUploadModalOpen(true)}
//                             >
//   <i className="fas fa-paperclip" > </i>
//     </button>

//     < button
// className = {`p-2 rounded-full transition-colors ${isDarkMode
//   ? 'text-gray-400 hover:text-blue-400'
//   : 'text-gray-400 hover:text-indigo-600'
//   }`}
// onClick = {() => setIsMicActive(!isMicActive)}
//                             >
//   <i className={ `fas ${isMicActive ? 'fa-microphone' : 'fa-microphone-slash'}` }> </i>
//     </button>

//     < button
// className = {`rounded-full p-2.5 transition-colors ${isDarkMode
//   ? 'bg-blue-600 hover:bg-blue-700'
//   : 'bg-indigo-600 hover:bg-indigo-700'
//   } text-white`}
// onClick = { handleSendMessage }
//   >
//   <i className="fas fa-paper-plane" > </i>
//     </button>
//     </div>
//     </div>
//     </div>
//     </div>
// {
//   !hasMessages && !isNewChatStarted && (
//     <ActionCapsules 
//                         isDarkMode={ isDarkMode }
//   onActionClick = { handleActionCapsuleClick }
//     />
//                     )
// }
// </div>
//   </div>
//   </div>
// {
//   !hasMessages && (
//     <div className="max-w-[850px] mx-auto mt-6" >
//       { activeTab === 'analysis' && (
//         <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6" >
//           <h3 className="text-xl font-medium mb-4" > Conversation Analytics </h3>
//             < div ref = { chartRef } style = {{ height: '300px' }
// }> </div>
//   </div>
//                   )}


// </div>
//               )}
// </div>
//   </div>
//   </div>
//   </div>
//   < ChatListPopup
// isOpen = { isChatListOpen }
// onClose = {() => setIsChatListOpen(false)}
// chats = { chats }
// onChatSelect = { handleChatSelect }
// onStarChat = { handleStarChat }
// onDeleteChat = { handleDeleteChat }
// isDarkMode = { isDarkMode }
// initialTab = { chatListInitialTab }
//   />
//   <VoiceInput
//         isActive={ isMicActive }
// onTranscript = { handleVoiceTranscript }
// onStateChange = { handleVoiceStateChange }
// isDarkMode = { isDarkMode }
//   />
//   <InfoPanel
//         isOpen={ isInfoPanelOpen }
// onClose = {() => {
//   setIsInfoPanelOpen(false);
//   setSelectedCode(null);
// }}
// isDarkMode = { isDarkMode }
// code = { selectedCode || undefined}
//       />
//   < CodeSlider
// isOpen = { isCodeSliderOpen }
// onClose = {() => {
//   setIsCodeSliderOpen(false);
//   setSelectedCodeBlock(null);
// }}
// code = { selectedCodeBlock?.content || ''}
// language = { selectedCodeBlock?.language || 'plaintext'}
// isDarkMode = { isDarkMode }
//   />
//   <SlidingAuthForm
//         isOpen={ isLoginModalOpen }
// onClose = {() => setIsLoginModalOpen(false)}
// isLogin = { isLogin }
// setIsLogin = { setIsLogin }
// onToggleMode = { toggleAuthMode }
// onSubmit = { handleAuthSubmit }
// loading = { loading }
// error = { formError }
// success = { formSuccess }
// isDarkMode = { isDarkMode }
// setUserProfile = { setUserProfile }
// setIsAuthenticated = { setIsAuthenticated }
//   />
//   <DeleteConfirmationPopup
//         isOpen={ deleteConfirmation.isOpen }
// onClose = {() => setDeleteConfirmation(prev => ({ ...prev, isOpen: false }))}
// onConfirm = { handleConfirmDelete }
// isDarkMode = { isDarkMode }
// itemType = { deleteConfirmation.itemType }
//   />
//   <ProjectListPopup
//         isOpen={ isProjectListOpen }
// onClose = {() => setIsProjectListOpen(false)}
// projects = { projects }
// onProjectSelect = {(project) => {
//   setSelectedProject(project);
//   setIsProjectListOpen(false);
// }}
// onChatSelect = {(chat) => {
//   handleChatSelect(chat);
//   setIsProjectListOpen(false);
// }}
// onDeleteProject = { handleDeleteProject }
// onDeleteProjectChat = { handleDeleteProjectChat }
// onEditProject = { handleProjectNameEdit }
// onEditProjectStart = { handleProjectNameEditStart }
// onNewProjectChat = {(projectId) => {
//   handleNewProjectChat(projectId);
//   setIsProjectListOpen(false); // Close the popup after creating new chat
// }}
// isDarkMode = { isDarkMode }
//   />
//   <div id="dropdown-root" className = "fixed inset-0 pointer-events-none z-[9999]" />
//     </div>
//   );
// };

// export default App;