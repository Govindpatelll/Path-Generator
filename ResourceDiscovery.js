function ResourceDiscovery({ userProfile }) {
    const [searchParams, setSearchParams] = React.useState({
        skill: userProfile?.skills?.[0] || '',
        goal: userProfile?.goals?.primary || '',
        priorKnowledge: userProfile?.priorKnowledge || '',
        resourceTypes: ['course', 'blog', 'youtube'],
        keywords: [],
        maxResults: 10,
        language: 'en',
        priceRange: '',
        duration: ''
    });

    const [results, setResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [savedSearches, setSavedSearches] = React.useState(() => {
        try {
            const saved = localStorage.getItem('savedSearches');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });
    const [keyword, setKeyword] = React.useState('');

    React.useEffect(() => {
        // Initial search with user's primary skill
        if (searchParams.skill) {
            handleSearch();
        }
    }, []);

    const handleSearch = async () => {
        try {
            setLoading(true);
            setError(null);
            const resources = await discoverResources(searchParams);
            setResults(resources);
        } catch (error) {
            setError(error.message);
            reportError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveSearch = () => {
        try {
            const newSearches = [...savedSearches, searchParams];
            setSavedSearches(newSearches);
            localStorage.setItem('savedSearches', JSON.stringify(newSearches));
        } catch (error) {
            reportError(error);
        }
    };

    const handleAddKeyword = () => {
        try {
            if (keyword && !searchParams.keywords.includes(keyword)) {
                setSearchParams(prev => ({
                    ...prev,
                    keywords: [...prev.keywords, keyword]
                }));
                setKeyword('');
            }
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="widget" data-name="resource-discovery">
            <div className="widget-header">
                <h3 className="text-lg font-semibold">Resource Discovery</h3>
            </div>
            <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-group">
                        <label className="form-label">Skill</label>
                        <input
                            type="text"
                            className="form-input"
                            value={searchParams.skill}
                            onChange={(e) => setSearchParams(prev => ({
                                ...prev,
                                skill: e.target.value
                            }))}
                            placeholder="e.g., Python, Machine Learning"
                            data-name="skill-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Goal</label>
                        <input
                            type="text"
                            className="form-input"
                            value={searchParams.goal}
                            onChange={(e) => setSearchParams(prev => ({
                                ...prev,
                                goal: e.target.value
                            }))}
                            placeholder="e.g., Build a web app"
                            data-name="goal-input"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Keywords</label>
                    <div className="flex space-x-2">
                        <input
                            type="text"
                            className="form-input flex-1"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Add keywords"
                            data-name="keyword-input"
                        />
                        <button
                            type="button"
                            onClick={handleAddKeyword}
                            className="btn-secondary"
                            data-name="add-keyword-button"
                        >
                            Add
                        </button>
                    </div>
                    {searchParams.keywords.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {searchParams.keywords.map((kw, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
                                >
                                    {kw}
                                    <button
                                        type="button"
                                        onClick={() => setSearchParams(prev => ({
                                            ...prev,
                                            keywords: prev.keywords.filter((_, i) => i !== index)
                                        }))}
                                        className="ml-1 text-indigo-600 hover:text-indigo-800"
                                    >
                                        <i className="fas fa-times"></i>
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="form-group">
                        <label className="form-label">Resource Types</label>
                        <select
                            multiple
                            className="form-input"
                            value={searchParams.resourceTypes}
                            onChange={(e) => setSearchParams(prev => ({
                                ...prev,
                                resourceTypes: Array.from(e.target.selectedOptions, option => option.value)
                            }))}
                            data-name="resource-types-select"
                        >
                            <option value="course">Courses</option>
                            <option value="blog">Blog Posts</option>
                            <option value="youtube">YouTube Videos</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price Range</label>
                        <select
                            className="form-input"
                            value={searchParams.priceRange}
                            onChange={(e) => setSearchParams(prev => ({
                                ...prev,
                                priceRange: e.target.value
                            }))}
                            data-name="price-range-select"
                        >
                            <option value="">Any Price</option>
                            <option value="free">Free</option>
                            <option value="paid">Paid</option>
                            <option value="under-50">Under $50</option>
                            <option value="50-100">$50-$100</option>
                            <option value="over-100">Over $100</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Duration</label>
                        <select
                            className="form-input"
                            value={searchParams.duration}
                            onChange={(e) => setSearchParams(prev => ({
                                ...prev,
                                duration: e.target.value
                            }))}
                            data-name="duration-select"
                        >
                            <option value="">Any Duration</option>
                            <option value="under-1h">Under 1 hour</option>
                            <option value="1-5h">1-5 hours</option>
                            <option value="over-5h">Over 5 hours</option>
                        </select>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={handleSearch}
                        className="btn-primary flex-1"
                        disabled={loading}
                        data-name="search-button"
                    >
                        {loading ? (
                            <i className="fas fa-spinner fa-spin mr-2"></i>
                        ) : (
                            <i className="fas fa-search mr-2"></i>
                        )}
                        Search Resources
                    </button>
                    <button
                        onClick={handleSaveSearch}
                        className="btn-secondary"
                        data-name="save-search-button"
                    >
                        <i className="fas fa-bookmark mr-2"></i>
                        Save Search
                    </button>
                </div>

                {error && (
                    <div className="text-red-600 p-4 rounded bg-red-50" data-name="error-message">
                        <i className="fas fa-exclamation-circle mr-2"></i>
                        {error}
                    </div>
                )}

                {results.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <h4 className="text-lg font-semibold">Search Results</h4>
                        {results.map((resource, index) => (
                            <ResourceCard 
                                key={index}
                                resource={resource}
                                onSave={() => {
                                    // Add to personal library
                                }}
                            />
                        ))}
                    </div>
                )}

                {savedSearches.length > 0 && (
                    <div className="mt-6">
                        <h4 className="text-lg font-semibold mb-3">Saved Searches</h4>
                        <div className="space-y-2">
                            {savedSearches.map((search, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSearchParams(search)}
                                    className="w-full text-left p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    <i className="fas fa-history mr-2"></i>
                                    {search.skill} - {search.goal}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
