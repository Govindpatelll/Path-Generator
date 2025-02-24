function LearningPath({ path, onUpdateProgress }) {
    if (!path?.modules?.length) {
        return (
            <div className="learning-path text-center py-8" data-name="learning-path-empty">
                <i className="fas fa-book-reader text-4xl text-gray-400 mb-4"></i>
                <p className="text-gray-600">No learning path available. Please complete the onboarding process.</p>
            </div>
        );
    }

    return (
        <div className="learning-path" data-name="learning-path">
            <h2 className="text-2xl font-semibold mb-6">Your Learning Path</h2>
            {path.modules.map((module, moduleIndex) => (
                <div 
                    key={moduleIndex} 
                    className="mb-8 fade-in"
                    style={{ animationDelay: `${moduleIndex * 0.1}s` }}
                >
                    <div className="flex items-center mb-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                            module.completed
                                ? 'bg-green-500 text-white'
                                : 'bg-indigo-600 text-white'
                        }`}>
                            {moduleIndex + 1}
                        </div>
                        <h3 className="text-xl font-semibold ml-3">{module.title}</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{module.description}</p>
                    <div className="space-y-4">
                        {module.resources.map((resource, resourceIndex) => (
                            <ResourceCard 
                                key={resourceIndex}
                                resource={resource}
                                onComplete={() => onUpdateProgress(moduleIndex, resourceIndex)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
