function ResourcePreference({ onComplete }) {
    const [preferences, setPreferences] = React.useState({
        formats: [],
        platforms: [],
        priceRange: 'free',
        language: 'english'
    });

    const formats = [
        { id: 'video', label: 'Video Courses', icon: 'fas fa-video' },
        { id: 'article', label: 'Articles', icon: 'fas fa-file-alt' },
        { id: 'interactive', label: 'Interactive Tutorials', icon: 'fas fa-laptop-code' },
        { id: 'book', label: 'Books', icon: 'fas fa-book' },
        { id: 'podcast', label: 'Podcasts', icon: 'fas fa-podcast' }
    ];

    const platforms = [
        { id: 'coursera', label: 'Coursera' },
        { id: 'udemy', label: 'Udemy' },
        { id: 'youtube', label: 'YouTube' },
        { id: 'edx', label: 'edX' },
        { id: 'github', label: 'GitHub' }
    ];

    const handleFormatToggle = (formatId) => {
        try {
            setPreferences(prev => ({
                ...prev,
                formats: prev.formats.includes(formatId)
                    ? prev.formats.filter(id => id !== formatId)
                    : [...prev.formats, formatId]
            }));
        } catch (error) {
            reportError(error);
        }
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            onComplete({ resourcePreferences: preferences });
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="onboarding-step" data-name="resource-preference">
            <h2 className="step-title">Resource Preferences</h2>
            <p className="step-description">
                Select your preferred learning formats and platforms to help us curate the best resources for you.
            </p>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Preferred Formats</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {formats.map(format => (
                            <button
                                key={format.id}
                                type="button"
                                onClick={() => handleFormatToggle(format.id)}
                                className={`p-4 rounded-lg border ${
                                    preferences.formats.includes(format.id)
                                        ? 'border-indigo-600 bg-indigo-50'
                                        : 'border-gray-200'
                                }`}
                                data-name={`format-${format.id}`}
                            >
                                <i className={`${format.icon} text-xl mb-2 ${
                                    preferences.formats.includes(format.id)
                                        ? 'text-indigo-600'
                                        : 'text-gray-400'
                                }`}></i>
                                <div className="text-sm">{format.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Price Range</label>
                    <select
                        className="form-input"
                        value={preferences.priceRange}
                        onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            priceRange: e.target.value
                        }))}
                        data-name="price-range-select"
                    >
                        <option value="free">Free Resources Only</option>
                        <option value="low">Low Cost ($1-$30)</option>
                        <option value="medium">Medium Cost ($31-$100)</option>
                        <option value="high">High Cost ($100+)</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="form-label">Preferred Language</label>
                    <select
                        className="form-input"
                        value={preferences.language}
                        onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            language: e.target.value
                        }))}
                        data-name="language-select"
                    >
                        <option value="english">English</option>
                        <option value="spanish">Spanish</option>
                        <option value="french">French</option>
                        <option value="german">German</option>
                        <option value="chinese">Chinese</option>
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
