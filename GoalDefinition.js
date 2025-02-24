function GoalDefinition({ onComplete }) {
    const [goals, setGoals] = React.useState({
        primary: '',
        timeline: '',
        specific: [],
        motivation: '',
        milestones: []
    });

    const goalTypes = [
        { id: 'career', label: 'Career Transition', icon: 'fas fa-briefcase' },
        { id: 'skill', label: 'Skill Development', icon: 'fas fa-graduation-cap' },
        { id: 'project', label: 'Project Completion', icon: 'fas fa-tasks' },
        { id: 'certification', label: 'Certification', icon: 'fas fa-certificate' }
    ];

    const timelineOptions = [
        { value: '1-month', label: '1 Month' },
        { value: '3-months', label: '3 Months' },
        { value: '6-months', label: '6 Months' },
        { value: '1-year', label: '1 Year' }
    ];

    const handleSpecificGoalAdd = () => {
        try {
            const goal = document.getElementById('specific-goal-input').value;
            if (goal) {
                setGoals(prev => ({
                    ...prev,
                    specific: [...prev.specific, goal]
                }));
                document.getElementById('specific-goal-input').value = '';
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleMilestoneAdd = () => {
        try {
            const milestone = document.getElementById('milestone-input').value;
            if (milestone) {
                setGoals(prev => ({
                    ...prev,
                    milestones: [...prev.milestones, milestone]
                }));
                document.getElementById('milestone-input').value = '';
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if (!goals.primary || !goals.timeline || goals.specific.length === 0) {
                throw new Error('Please fill in all required fields');
            }
            onComplete({ goals });
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="onboarding-step" data-name="goal-definition">
            <h2 className="step-title">Define Your Learning Goals</h2>
            <p className="step-description">
                Let's set clear, achievable goals for your learning journey using the SMART framework 
                (Specific, Measurable, Achievable, Relevant, Time-bound).
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">What type of goal are you pursuing?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {goalTypes.map(type => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setGoals(prev => ({ ...prev, primary: type.id }))}
                                className={`p-4 rounded-lg border text-center ${
                                    goals.primary === type.id
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200'
                                }`}
                                data-name={`goal-type-${type.id}`}
                            >
                                <i className={`${type.icon} text-2xl mb-2 ${
                                    goals.primary === type.id
                                        ? 'text-indigo-600'
                                        : 'text-gray-400'
                                }`}></i>
                                <div className="text-sm">{type.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Timeline</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {timelineOptions.map(option => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => setGoals(prev => ({ ...prev, timeline: option.value }))}
                                className={`p-3 rounded-lg border ${
                                    goals.timeline === option.value
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200'
                                }`}
                                data-name={`timeline-${option.value}`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Specific Goals</label>
                    <div className="space-y-4">
                        <div className="flex space-x-2">
                            <input
                                id="specific-goal-input"
                                type="text"
                                className="form-input flex-1"
                                placeholder="Enter a specific goal (e.g., 'Build a web application')"
                                data-name="specific-goal-input"
                            />
                            <button
                                type="button"
                                onClick={handleSpecificGoalAdd}
                                className="btn-secondary"
                                data-name="add-goal-button"
                            >
                                Add Goal
                            </button>
                        </div>
                        {goals.specific.length > 0 && (
                            <div className="space-y-2">
                                {goals.specific.map((goal, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center bg-gray-50 p-3 rounded-lg"
                                    >
                                        <i className="fas fa-bullseye text-indigo-600 mr-2"></i>
                                        <span>{goal}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Milestones</label>
                    <div className="space-y-4">
                        <div className="flex space-x-2">
                            <input
                                id="milestone-input"
                                type="text"
                                className="form-input flex-1"
                                placeholder="Add key milestones to track progress"
                                data-name="milestone-input"
                            />
                            <button
                                type="button"
                                onClick={handleMilestoneAdd}
                                className="btn-secondary"
                                data-name="add-milestone-button"
                            >
                                Add
                            </button>
                        </div>
                        {goals.milestones.length > 0 && (
                            <div className="space-y-2">
                                {goals.milestones.map((milestone, index) => (
                                    <div 
                                        key={index}
                                        className="flex items-center bg-gray-50 p-3 rounded-lg"
                                    >
                                        <i className="fas fa-flag text-indigo-600 mr-2"></i>
                                        <span>{milestone}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">What motivates you to achieve these goals?</label>
                    <textarea
                        className="form-input h-24"
                        value={goals.motivation}
                        onChange={(e) => setGoals(prev => ({
                            ...prev,
                            motivation: e.target.value
                        }))}
                        placeholder="Understanding your motivation helps us provide better support and encouragement"
                        data-name="motivation-input"
                    ></textarea>
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
