function TimeCommitment({ onComplete }) {
    const [commitment, setCommitment] = React.useState({
        hoursPerWeek: 5,
        preferredTimes: [],
        deadline: ''
    });

    const timeSlots = [
        { id: 'morning', label: 'Morning (6AM-12PM)', icon: 'fas fa-sun' },
        { id: 'afternoon', label: 'Afternoon (12PM-5PM)', icon: 'fas fa-cloud-sun' },
        { id: 'evening', label: 'Evening (5PM-10PM)', icon: 'fas fa-moon' },
        { id: 'night', label: 'Night (10PM-6AM)', icon: 'fas fa-star' }
    ];

    const handleTimeSlotToggle = (slotId) => {
        try {
            setCommitment(prev => ({
                ...prev,
                preferredTimes: prev.preferredTimes.includes(slotId)
                    ? prev.preferredTimes.filter(id => id !== slotId)
                    : [...prev.preferredTimes, slotId]
            }));
        } catch (error) {
            reportError(error);
        }
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            onComplete({ timeCommitment: commitment });
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="onboarding-step" data-name="time-commitment">
            <h2 className="step-title">Time Commitment</h2>
            <p className="step-description">
                Let us know your availability so we can create a realistic learning schedule.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Hours per Week</label>
                    <div className="flex items-center">
                        <input
                            type="range"
                            min="1"
                            max="40"
                            value={commitment.hoursPerWeek}
                            onChange={(e) => setCommitment(prev => ({
                                ...prev,
                                hoursPerWeek: parseInt(e.target.value)
                            }))}
                            className="flex-1 mr-4"
                            data-name="hours-range"
                        />
                        <span className="font-semibold">{commitment.hoursPerWeek}h</span>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Preferred Learning Times</label>
                    <div className="grid grid-cols-2 gap-4">
                        {timeSlots.map(slot => (
                            <button
                                key={slot.id}
                                type="button"
                                onClick={() => handleTimeSlotToggle(slot.id)}
                                className={`p-4 rounded-lg border ${
                                    commitment.preferredTimes.includes(slot.id)
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200'
                                }`}
                                data-name={`time-slot-${slot.id}`}
                            >
                                <i className={`${slot.icon} text-xl mb-2 ${
                                    commitment.preferredTimes.includes(slot.id)
                                        ? 'text-indigo-600'
                                        : 'text-gray-400'
                                }`}></i>
                                <div className="text-sm">{slot.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Target Completion Date (Optional)</label>
                    <input
                        type="date"
                        className="form-input"
                        value={commitment.deadline}
                        onChange={(e) => setCommitment(prev => ({
                            ...prev,
                            deadline: e.target.value
                        }))}
                        min={new Date().toISOString().split('T')[0]}
                        data-name="deadline-input"
                    />
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
