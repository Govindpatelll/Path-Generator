function ResourceCard({ resource }) {
    const [isCompleted, setIsCompleted] = React.useState(resource.completed || false);

    const handleToggleComplete = () => {
        try {
            setIsCompleted(!isCompleted);
            // Here you would typically update the backend
        } catch (error) {
            reportError(error);
        }
    };

    return (
        <div className="resource-card" data-name="resource-card">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-3">{resource.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>
                            <i className="far fa-clock mr-1"></i>
                            {resource.duration}
                        </span>
                        <span>
                            <i className="far fa-bookmark mr-1"></i>
                            {resource.type}
                        </span>
                        <span>
                            <i className="far fa-building mr-1"></i>
                            {resource.provider}
                        </span>
                    </div>
                </div>
                <button 
                    onClick={handleToggleComplete}
                    className={`p-2 rounded-full ${isCompleted ? 'text-green-500' : 'text-gray-400'}`}
                    data-name="resource-complete-button"
                >
                    <i className={`fas fa-check-circle text-xl`}></i>
                </button>
            </div>
            <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                    {resource.tags.map((tag, index) => (
                        <span 
                            key={index}
                            className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-primary"
                    data-name="resource-start-button"
                >
                    <i className="fas fa-external-link-alt mr-2"></i>
                    Start Learning
                </a>
            </div>
        </div>
    );
}
