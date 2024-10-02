"use client";

import React, { useState } from 'react';
import { Textarea, Button } from 'flowbite-react';
import ReactMarkdown from 'react-markdown';

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [input, setInput] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const sendMessage = (e: FormEvent) => {
        e.preventDefault();
        const message = {
            parts: input,
            role: 'user',
            time: new Date().toLocaleTimeString()
        }
        let history: any[] = [...messages];
        history.push(message);
        setMessages(history);
        setInput('');
        handleScroll();
        let payload = {
            message: input
        }

        payload.history = history.map((message) => ({ parts: message.parts, role: message.role }));

        setIsTyping(true);
        fetch(`${process.env.NEXT_PUBLIC_CHAT_API_URL}/chat/ask/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            history.push({ parts: data.response, role: 'model', time: new Date().toLocaleTimeString() });
            setMessages([...history]);
            handleScroll();
        })
        .finally(() => {
            setIsTyping(false);
        });
    };

    const handleScroll = () => {
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
    };

    return (
        <div className="flex flex-row justify-between p-4 h-full bg-gradient-to-b from-blue-50 to-transparent">
            <div className="w-1/2 p-4">
                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Better Data</span><br/> Scalable AI.
                </h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.
                </p>
            </div>
            <div className="w-1/2 p-4">
                <div className="flex flex-col justify-end rounded-lg border border-gray-300 h-full w-full bg-gray-50 p-4">
                    <div className="h-full overflow-y-auto" id="chat-container">
                        {messages.map((message, index) => (
                            <div className={`flex mt-4 items-start gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`} key={index}>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{message.role === 'user' ? 'You' : 'AI'}</span>
                                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{message.time}</span>
                                    </div>
                                    <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl text-black rounded-es-xl dark:bg-gray-700 mb-4">
                                        <ReactMarkdown>{message.parts}</ReactMarkdown> {/* Render Markdown content */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && <p className="mb-4 text-sm font-normal text-gray-500 dark:text-gray-400 italic">AI is typing...</p>}
                    </div>
                    <div>
                        <Textarea id="message" placeholder="Enter message here..." value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className='focus:border-blue-700 focus:ring-blue-500' required rows={4} />
                        <Button onClick={sendMessage} color="blue" className="w-full mt-2">Send</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;