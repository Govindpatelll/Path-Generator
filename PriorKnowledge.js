function PriorKnowledge({ onComplete }) {
    const [knowledge, setKnowledge] = React.useState({
        skills: {},
        experience: '',
        certifications: [],
        selfAssessment: {}
    });

    const skillLevels = [
        { id: 'novice', label: 'Novice', description: 'Little to no experience' },
        { id: 'beginner', label: 'Beginner', description: 'Basic understanding' },
        { id: 'intermediate', label: 'Intermediate', description: 'Practical application' },
        { id: 'advanced', label: 'Advanced', description: 'Deep understanding' },
        { id: 'expert', label: 'Expert', description: 'Comprehensive mastery' }
    ];

    const commonSkills = [
        'Python',
        'JavaScript',
        'Data Analysis',
        'Machine Learning',
        'Web Development'
    ];

    const handleSkillLevelChange = (skill, level) => {
        try {
            setKnowledge(prev => ({
                ...prev,
                skills: {
                    ...prev.skills,
                    [skill]: level
                }
            }));
        } catch (error) {
            reportError(error);
        }
    };

    const handleCertificationAdd = () => {
        try {
            const certification = document.getElementById('certification-input').value;
            if (certification) {
                setKnowledge(prev => ({
                    ...prev,
                    certifications: [...prev.certifications, certification]
                }));
                document.getElementById('certification-input').value = '';
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            onComplete({ priorKnowledge: knowledge });
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="onboarding-step" data-name="prior-knowledge">
            <h2 className="step-title">Prior Knowledge Assessment</h2>
            <p className="step-description">
                Tell us about your existing skills and experience so we can customize your learning path.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Skill Assessment</label>
                    <div className="space-y-4">
                        {commonSkills.map(skill => (
                            <div key={skill} className="border rounded-lg p-4" data-name={`skill-${skill.toLowerCase()}`}>
                                <label className="font-medium mb-2 block">{skill}</label>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                    {skillLevels.map(level => (
                                        <button
                                            key={level.id}
                                            type="button"
                                            onClick={() => handleSkillLevelChange(skill, level.id)}
                                            className={`p-2 rounded text-sm ${
                                                knowledge.skills[skill] === level.id
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            {level.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Years of Experience</label>
                    <select
                        className="form-input"
                        value={knowledge.experience}
                        onChange={(e) => setKnowledge(prev => ({
                            ...prev,
                            experience: e.target.value
                        }))}
                        data-name="experience-select"
                    >
                        <option value="">Select experience</option>
                        <option value="0-1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5+">5+ years</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Certifications (Optional)</label>
                    <div className="flex space-x-2">
                        <input
                            id="certification-input"
                            type="text"
                            className="form-input flex-1"
                            placeholder="Enter certification name"
                            data-name="certification-input"
                        />
                        <button
                            type="button"
                            onClick={handleCertificationAdd}
                            className="btn-secondary"
                            data-name="add-certification-button"
                        >
                            Add
                        </button>
                    </div>
                    {knowledge.certifications.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {knowledge.certifications.map((cert, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                                >
                                    {cert}
                                </span>
                            ))}
                        </div>
                    )}
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
