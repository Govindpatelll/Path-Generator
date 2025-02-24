function ResourceLibrary() {
    const [savedResources, setSavedResources] = React.useState(() => {
        const saved = localStorage.getItem('savedResources');
        return saved ? JSON.parse(saved) : [];
    });

    const [filter, setFilter] = React.useState('all');

    const handleSaveResource = (resource) => {
        try {
            const newResources = [...savedResources, { ...resource, savedAt: new Date().toISOString() }];
            setSavedResources(newResources);
            localStorage.setItem('savedResources', JSON.stringify(newResources));
        } catch (error) {
            reportError(error);
        }
    };

    const handleRemoveResource = (resourceId) => {
        try {
            const newResources = savedResources.filter(r => r.id !== resourceId);
            setSavedResources(newResources);
            localStorage.setItem('savedResources', JSON.stringify(newResources));
        } catch (error) {
            reportError(error);
        }
    };

    const filteredResources = React.useMemo(() => {
        if (filter === 'all') return savedResources;
        return savedResources.filter(r => r.type === filter);
    }, [savedResources, filter]);

    return (
        <div className="widget" data-name="resource-library">
            <div className="widget-header">
                <h3 className="text-lg font-semibold">Personal Library</h3>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="form-input"
                    data-name="library-filter"
                >
                    <option value="all">All Resources</option>
                    <option value="course">Courses</option>
                    <option value="blog">Blog Posts</option>
                    <option value="video">Videos</option>
                </select>
            </div>
            <div className="space-y-4 p-4">
                {filteredResources.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400">
                        No saved resources yet
                    </div>
                ) : (
                    filteredResources.map((resource, index) => (
                        <div
                            key={index}
                            className="border dark:border-gray-700 rounded-lg p-4"
                            data-name="saved-resource"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-medium">{resource.title}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {resource.description}
                                    </p>
                                    <div className="mt-2 text-sm">
                                        <span className="text-indigo-600 dark:text-indigo-400">
                                            {resource.type}
                                        </span>
                                        <span className="mx-2">•</span>
                                        <span className="text-gray-500">
                                            Saved {new Date(resource.savedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveResource(resource.id)}
                                    className="text-red-500 hover:text-red-600"
                                    data-name="remove-resource"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
