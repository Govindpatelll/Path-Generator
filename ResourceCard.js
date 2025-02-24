function ResourceCard({ resource, onSave }) {
    const [isSaved, setIsSaved] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleSave = () => {
        try {
            setIsSaved(true);
            onSave(resource);
            // Show success notification
            setTimeout(() => setIsSaved(false), 2000);
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div 
            className="resource-card hover-lift dark-mode-transition fade-in"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            data-name="resource-card"
        >
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {resource.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>
                            <i className="far fa-clock mr-1"></i>
                            {resource.duration}
                        </span>
                        <span>
                            <i className="far fa-building mr-1"></i>
                            {resource.provider}
                        </span>
                        {resource.price && (
                            <span>
                                <i className="fas fa-tag mr-1"></i>
                                {resource.price}
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={handleSave}
                        className={`p-2 rounded-full transition-all click-effect ${
                            isSaved 
                                ? 'text-green-500 bg-green-50 dark:bg-green-900'
                                : 'text-gray-400 hover:text-indigo-600'
                        }`}
                        data-name="save-resource-button"
                    >
                        <i className={`fas ${isSaved ? 'fa-check' : 'fa-bookmark'}`}></i>
                    </button>
                    <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary click-effect"
                        data-name="view-resource-button"
                    >
                        <i className="fas fa-external-link-alt mr-2"></i>
                        View Resource
                    </a>
                </div>
            </div>
            
            {isHovered && resource.keyTakeaways && (
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg slide-in">
                    <h4 className="text-sm font-semibold mb-2">Key Takeaways:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                        {resource.keyTakeaways.map((takeaway, index) => (
                            <li key={index}>{takeaway}</li>
                        ))}
                    </ul>
                </div>
            )}

            {resource.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {resource.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-xs rounded-full bg-indigo-50 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
