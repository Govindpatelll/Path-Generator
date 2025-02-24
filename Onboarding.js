function Onboarding({ onComplete }) {
    const [step, setStep] = React.useState(1);
    const [profile, setProfile] = React.useState({
        skills: [],
        goals: {},
        priorKnowledge: {},
        learningStyle: {},
        timeCommitment: {},
        resourcePreferences: {}
    });

    const handleStepComplete = (stepData) => {
        try {
            const updatedProfile = { ...profile, ...stepData };
            setProfile(updatedProfile);
            
            if (step < 6) {
                setStep(step + 1);
            } else {
                // Validate profile before completing
                if (validateProfile(updatedProfile)) {
                    onComplete(updatedProfile);
                } else {
                    throw new Error('Please complete all required fields');
                }
            }
        } catch (error) {
            reportError(error);
            alert(error.message);
        }
    };

    return (
        <div className="onboarding-container" data-name="onboarding">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold">Create Your Learning Path</h1>
                        <div className="text-sm text-gray-500">Step {step} of 6</div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                        <div 
                            className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(step / 6) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {step === 1 && <SkillSelection onComplete={handleStepComplete} />}
                {step === 2 && <GoalDefinition onComplete={handleStepComplete} />}
                {step === 3 && <PriorKnowledge onComplete={handleStepComplete} />}
                {step === 4 && <LearningStyle onComplete={handleStepComplete} />}
                {step === 5 && <TimeCommitment onComplete={handleStepComplete} />}
                {step === 6 && <ResourcePreference onComplete={handleStepComplete} />}

                <div className="flex justify-between mt-6" data-name="onboarding-navigation">
                    {step > 1 && (
                        <button 
                            className="btn-secondary"
                            onClick={() => setStep(step - 1)}
                            data-name="onboarding-back-button"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Back
                        </button>
                    )}
                    <div className="flex-1"></div>
                    <div className="text-sm text-gray-500">
                        {step < 6 ? 'Fill in the details to continue' : 'Complete your profile to start learning'}
                    </div>
                </div>
            </div>
        </div>
    );
}
