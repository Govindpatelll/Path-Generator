function LearningStreak() {
    const [streak, setStreak] = React.useState(() => {
        const saved = localStorage.getItem('learningStreak');
        return saved ? JSON.parse(saved) : {
            current: 0,
            longest: 0,
            lastActivity: null
        };
    });

    React.useEffect(() => {
        // Check if streak needs to be reset (more than 1 day since last activity)
        const now = new Date();
        const lastActivity = streak.lastActivity ? new Date(streak.lastActivity) : null;
        
        if (lastActivity && (now - lastActivity) > (24 * 60 * 60 * 1000)) {
            setStreak(prev => ({
                current: 0,
                longest: prev.longest,
                lastActivity: now.toISOString()
            }));
        }
    }, []);

    const updateStreak = () => {
        try {
            const now = new Date();
            setStreak(prev => {
                const newStreak = {
                    current: prev.current + 1,
                    longest: Math.max(prev.longest, prev.current + 1),
                    lastActivity: now.toISOString()
                };
                localStorage.setItem('learningStreak', JSON.stringify(newStreak));
                return newStreak;
            });
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="widget" data-name="learning-streak">
            <div className="widget-header">
                <h3 className="text-lg font-semibold">Learning Streak</h3>
            </div>
            <div className="text-center p-4">
                <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                    {streak.current}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    Days in a row
                </div>
                <div className="mt-4 text-sm">
                    Longest streak: {streak.longest} days
                </div>
                <div className="mt-4 flex justify-center space-x-1">
                    {[...Array(7)].map((_, i) => (
                        <div
                            key={i}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                i < (streak.current % 7)
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                        >
                            <i className="fas fa-star text-xs"></i>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
