function LearningStyle({ onComplete }) {
    const [style, setStyle] = React.useState({
        vark: {
            visual: false,
            auditory: false,
            reading: false,
            kinesthetic: false
        },
        pacePreference: 'moderate',
        practiceFrequency: 'daily'
    });

    const learningStyles = [
        {
            id: 'visual',
            label: 'Visual',
            description: 'Learn best through diagrams, charts, and visual aids',
            icon: 'fas fa-eye'
        },
        {
            id: 'auditory',
            label: 'Auditory',
            description: 'Learn best through listening and discussion',
            icon: 'fas fa-headphones'
        },
        {
            id: 'reading',
            label: 'Reading/Writing',
            description: 'Learn best through reading and taking notes',
            icon: 'fas fa-book-open'
        },
        {
            id: 'kinesthetic',
            label: 'Kinesthetic',
            description: 'Learn best through hands-on practice',
            icon: 'fas fa-hand-paper'
        }
    ];

    const handleStyleToggle = (styleId) => {
        try {
            setStyle(prev => ({
                ...prev,
                vark: {
                    ...prev.vark,
                    [styleId]: !prev.vark[styleId]
                }
            }));
        } catch (error) {
            reportError(error);
        }
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            onComplete({ learningStyle: style });
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="onboarding-step" data-name="learning-style">
            <h2 className="step-title">Learning Style Preferences</h2>
            <p className="step-description">
                Help us understand how you learn best so we can recommend the most effective resources.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">How do you prefer to learn?</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {learningStyles.map(ls => (
                            <button
                                key={ls.id}
                                type="button"
                                onClick={() => handleStyleToggle(ls.id)}
                                className={`p-4 rounded-lg border text-left ${
                                    style.vark[ls.id]
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200'
                                }`}
                                data-name={`style-${ls.id}`}
                            >
                                <div className="flex items-center mb-2">
                                    <i className={`${ls.icon} text-xl ${
                                        style.vark[ls.id]
                                            ? 'text-indigo-600'
                                            : 'text-gray-400'
                                    } mr-2`}></i>
                                    <span className="font-semibold">{ls.label}</span>
                                </div>
                                <p className="text-sm text-gray-600">{ls.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Preferred Learning Pace</label>
                    <select
                        className="form-input"
                        value={style.pacePreference}
                        onChange={(e) => setStyle(prev => ({
                            ...prev,
                            pacePreference: e.target.value
                        }))}
                        data-name="pace-select"
                    >
                        <option value="slow">Slow and Thorough</option>
                        <option value="moderate">Moderate Pace</option>
                        <option value="fast">Fast-Paced</option>
                        <option value="variable">Variable/Flexible</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Practice Frequency</label>
                    <select
                        className="form-input"
                        value={style.practiceFrequency}
                        onChange={(e) => setStyle(prev => ({
                            ...prev,
                            practiceFrequency: e.target.value
                        }))}
                        data-name="frequency-select"
                    >
                        <option value="daily">Daily Practice</option>
                        <option value="several">Several Times per Week</option>
                        <option value="weekly">Weekly Practice</option>
                        <option value="biweekly">Bi-weekly Practice</option>
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="btn-primary w-full"
                    data-name="submit-button"
                >
                    Continue
                </button>
            </form>
        </div>
    );
}
