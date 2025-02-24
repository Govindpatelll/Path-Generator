function AiTutor() {
    const [messages, setMessages] = React.useState([]);
    const [input, setInput] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);
    const messagesEndRef = React.useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (!input.trim()) return;

            const userMessage = { role: 'user', content: input };
            setMessages(prev => [...prev, userMessage]);
            setInput('');
            setIsTyping(true);

            const systemPrompt = `You are an expert AI tutor. Answer the following question clearly and concisely, providing examples where appropriate:`;
            const response = await invokeAIAgent(systemPrompt, input);

            setMessages(prev => [...prev, { role: 'assistant', content: response }]);
        } catch (error) {
            reportError(error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.'
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="widget h-[500px] flex flex-col" data-name="ai-tutor">
            <div className="widget-header">
                <h3 className="text-lg font-semibold">AI Tutor</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-lg p-3 ${
                                message.role === 'user'
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-700'
                            }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                            <span className="animate-pulse">Typing...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t dark:border-gray-700">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="form-input flex-1"
                        data-name="tutor-input"
                    />
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isTyping}
                        data-name="tutor-submit"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </form>
        </div>
    );
}
