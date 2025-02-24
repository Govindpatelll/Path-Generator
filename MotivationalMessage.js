function MotivationalMessage({ userProfile, progress }) {
    const [message, setMessage] = React.useState('');

    React.useEffect(() => {
        const generateMessage = async () => {
            try {
                const systemPrompt = `Generate a personalized motivational message for a learner with the following profile and progress:
                    Profile: ${JSON.stringify(userProfile)}
                    Progress: ${JSON.stringify(progress)}
                    Keep the message concise, encouraging, and specific to their learning journey.`;
                
                const userPrompt = "Generate a motivational message";
                const response = await invokeAIAgent(systemPrompt, userPrompt);
                setMessage(response);
            } catch (error) {
                reportError(error);
                setMessage("Keep up the great work! You're making progress towards your goals.");
            }
        };

        generateMessage();
    }, [userProfile, progress]);

    return (
        <div className="widget" data-name="motivational-message">
            <div className="widget-header">
                <h3 className="text-lg font-semibold">Daily Motivation</h3>
            </div>
            <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg">
                <i className="fas fa-quote-left text-2xl opacity-50 mb-2"></i>
                <p className="text-lg font-medium">{message}</p>
            </div>
        </div>
    );
}
