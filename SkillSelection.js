function SkillSelection({ onComplete }) {
    const [selectedSkills, setSelectedSkills] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [customSkill, setCustomSkill] = React.useState('');

    const skillCategories = [
        {
            name: 'Programming',
            skills: [
                { id: 'python', name: 'Python', icon: 'fab fa-python' },
                { id: 'javascript', name: 'JavaScript', icon: 'fab fa-js' },
                { id: 'react', name: 'React', icon: 'fab fa-react' },
                { id: 'nodejs', name: 'Node.js', icon: 'fab fa-node' },
                { id: 'java', name: 'Java', icon: 'fab fa-java' }
            ]
        },
        {
            name: 'Data Science',
            skills: [
                { id: 'machine-learning', name: 'Machine Learning', icon: 'fas fa-brain' },
                { id: 'data-analysis', name: 'Data Analysis', icon: 'fas fa-chart-bar' },
                { id: 'statistics', name: 'Statistics', icon: 'fas fa-calculator' },
                { id: 'data-visualization', name: 'Data Visualization', icon: 'fas fa-chart-line' },
                { id: 'sql', name: 'SQL', icon: 'fas fa-database' }
            ]
        },
        {
            name: 'Design',
            skills: [
                { id: 'ui-design', name: 'UI Design', icon: 'fas fa-pencil-ruler' },
                { id: 'ux-design', name: 'UX Design', icon: 'fas fa-users' },
                { id: 'graphic-design', name: 'Graphic Design', icon: 'fas fa-palette' },
                { id: 'web-design', name: 'Web Design', icon: 'fas fa-desktop' },
                { id: 'figma', name: 'Figma', icon: 'fab fa-figma' }
            ]
        }
    ];

    const handleSkillToggle = (skillId) => {
        try {
            setSelectedSkills(prev => 
                prev.includes(skillId)
                    ? prev.filter(id => id !== skillId)
                    : [...prev, skillId]
            );
        } catch (error) {
            reportError(error);
        }
    };

    const handleCustomSkillAdd = () => {
        try {
            if (customSkill.trim()) {
                const newSkillId = `custom-${customSkill.toLowerCase().replace(/\s+/g, '-')}`;
                if (!selectedSkills.includes(newSkillId)) {
                    setSelectedSkills(prev => [...prev, newSkillId]);
                }
                setCustomSkill('');
            }
        } catch (error) {
            reportError(error);
        }
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            if (selectedSkills.length === 0) {
                throw new Error('Please select at least one skill');
            }
            onComplete({ skills: selectedSkills });
        } catch (error) {
            reportError(error);
        }
    };

    const filteredCategories = skillCategories.map(category => ({
        ...category,
        skills: category.skills.filter(skill =>
            skill.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.skills.length > 0);

    return (
        <div className="onboarding-step" data-name="skill-selection">
            <h2 className="step-title">Select Skills to Learn</h2>
            <p className="step-description">
                Choose the skills you want to develop. You can select multiple skills across different categories.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="flex space-x-2 mb-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Search skills..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                data-name="skill-search"
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    className="form-input flex-1"
                                    placeholder="Add custom skill..."
                                    value={customSkill}
                                    onChange={(e) => setCustomSkill(e.target.value)}
                                    data-name="custom-skill-input"
                                />
                                <button
                                    type="button"
                                    onClick={handleCustomSkillAdd}
                                    className="btn-secondary"
                                    data-name="add-custom-skill-button"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>

                    {filteredCategories.map(category => (
                        <div key={category.name} className="mb-6" data-name={`category-${category.name.toLowerCase()}`}>
                            <h3 className="text-lg font-semibold mb-3">{category.name}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {category.skills.map(skill => (
                                    <button
                                        key={skill.id}
                                        type="button"
                                        onClick={() => handleSkillToggle(skill.id)}
                                        className={`p-4 rounded-lg border text-left ${
                                            selectedSkills.includes(skill.id)
                                                ? 'border-indigo-600 bg-indigo-50'
                                                : 'border-gray-200'
                                        }`}
                                        data-name={`skill-${skill.id}`}
                                    >
                                        <div className="flex items-center">
                                            <i className={`${skill.icon} text-xl ${
                                                selectedSkills.includes(skill.id)
                                                    ? 'text-indigo-600'
                                                    : 'text-gray-400'
                                            } mr-3`}></i>
                                            <span className="font-medium">{skill.name}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {selectedSkills.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Skills:</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedSkills.map(skillId => {
                                const skill = skillCategories
                                    .flatMap(cat => cat.skills)
                                    .find(s => s.id === skillId);
                                const name = skill ? skill.name : skillId.replace('custom-', '').replace(/-/g, ' ');
                                return (
                                    <span
                                        key={skillId}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                                    >
                                        {name}
                                        <button
                                            type="button"
                                            onClick={() => handleSkillToggle(skillId)}
                                            className="ml-2 text-indigo-600 hover:text-indigo-800"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                )}

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
